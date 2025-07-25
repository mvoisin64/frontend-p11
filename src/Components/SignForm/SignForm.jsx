import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './SignForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/userslice';



const SignForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email: username, //l'API attend "email", pas "username"
        password: password,
      });
      const token = response.data.body.token;

      // 🔐 Stockage conditionnel
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      dispatch(setToken(token)); // Mets à jour Redux

      // ✅ Redirection vers la page user
      navigate('/user');

    } catch (error) {
      alert('Identifiants invalides ou utilisateur introuvable.');
      console.error('Erreur de connexion :', error);

    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>

  );
};

export default SignForm;