import React from 'react';
import './User.css'
import { useEffect } from 'react';
import AccountCard from '../../Components/AccountCard/AccountCard';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userslice';
import axios from 'axios';

const User = () => {

const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  console.log("test2," , token)
  const userState = useSelector((store) => store.user )
  console.log("test1" , userState)

  const { firstName, lastName } = useSelector((state) => state.user);

  console.log("Token envoyé dans l'en-tête :", token);
  
useEffect(() =>{
  const fetchUserProfile = async () => {

    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/user/profile',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { firstName, lastName } = response.data.body;

      dispatch(setUserInfo({ firstName, lastName }));

    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    }
  };

  if (token) {
    fetchUserProfile();
  }
}, [token, dispatch]);

    return (
        <div className="main bg-dark ">
      <div className="headername">
        <h1 id='welcomename'>Welcome back<br />{firstName} {lastName}</h1>
        <button className="edit-button">Edit Name</button>
      </div>

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