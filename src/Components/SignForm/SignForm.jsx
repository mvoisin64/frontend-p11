import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 
import './SignForm.css'



const SignForm = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email: username, // 👈 l'API attend "email", pas "username"
        password: password,
      });
  
      const token = response.data.body.token;
  
      // Sauvegarde le token (localStorage ou Redux selon ton projet)
      localStorage.setItem('token', token);
  
      // Redirection vers /user si le login a réussi
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
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
            
    );
};

export default SignForm;