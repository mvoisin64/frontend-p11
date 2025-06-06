import React from 'react';
import './User.css'
import { useEffect } from 'react';
import AccountCard from '../../Components/AccountCard/AccountCard';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo, setToken } from '../../redux/userslice';
import axios from 'axios';
import { useState } from 'react';

const User = () => {
  const dispatch = useDispatch();

  // 🆕 Charge le token au montage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      dispatch(setToken(savedToken));
    }
  }, [dispatch]);

  

  const { token, firstName, lastName, isLoggedIn, userName } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(userName); // prérempli avec le userName actuel

  console.log("userName :", userName);

  console.log("Token récupéré depuis Redux :", token);

 

  // 🔁 Fait la requête uniquement si token est présent
  useEffect(() => {
    const fetchUserProfile = async () => {

      try {
        const response = await axios.get(
          'http://localhost:3001/api/v1/user/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { firstName, lastName, userName } = response.data.body;

        dispatch(setUserInfo({ firstName, lastName, userName }));

      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token, dispatch]);

  

  useEffect(() => {
    setNewUserName(userName);
  }, [userName]);




  return (
    <div className="main bg-dark ">
      {!isEditing && (
        <div className="headername">
          <h1 id='welcomename'>Welcome back,<br />{firstName} {lastName}</h1>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        </div>
      )}

      {isEditing && (
        <div className="edit-form">
          <h2>Edit User Info</h2>

          <div className="edit-inputs">
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="User name"
            />
            <input type="text" value={firstName} readOnly />
            <input type="text" value={lastName} readOnly />
          </div>

          <div className="edit-buttons">
            <button onClick={async () => {
              try {
                const response = await axios.put(
                  'http://localhost:3001/api/v1/user/profile',
                  {
                    userName: newUserName
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  }
                );

                // Mise à jour du store Redux avec la réponse du serveur
                dispatch(setUserInfo({
                  firstName,
                  lastName,
                  userName: response.data.body.userName
                }));

                console.log("UserName mis à jour :", response.data.body.userName);
                setIsEditing(false);

              } catch (error) {
                console.error("Erreur lors de la mise à jour du userName :", error);
                alert("Une erreur est survenue.");
              }
            }}>
              Save
            </button>

            <button onClick={() => {
              setNewUserName(userName); // remet l'ancien nom si on annule
              setIsEditing(false);
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}






      <h2 className="sr-only">Accounts</h2>
      <div className='accountcarcontainer'>
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
          showButton={true}
        />


        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          showButton={true}
        />


        <AccountCard
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
          showButton={true}
        />

      </div>
    </div>

  );
};

export default User;