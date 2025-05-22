import React from 'react';
import './User.css'
import AccountCard from '../../Components/AccountCard/AccountCard';
import { useSelector } from 'react-redux';





const User = () => {

  const userState = useSelector((store) => store.user )
  console.log("test" , userState)

    return (
        <div className="main bg-dark ">
      <div className="headername">
        <h1 id='welcomename'>Welcome back<br />Tony Jarvis!</h1>
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