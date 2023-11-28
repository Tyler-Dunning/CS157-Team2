import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errMessage, setError] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const uploadUser = async () => {
    if(username == "" || password == "" || confirm == "" || password != confirm)
    {
        setError("Invalid inputs");
        return null;
    }
    const userExists = await axios.get(`http://localhost:8081/users/${username}`);
    const userExistsData = userExists.data;
    if(userExistsData.length > 0)
    {
        setError("User Already Exists");
        return null;
    }
    const result = await axios.post('http://localhost:8081/users/post', {"id": username, "password": password});
    console.log(result);
    navigate('/login');
  };




  return (
    <div>
      <div className="topnav">
        <a><img
          src="./logo.jpg"
          alt="Logo"
          //onClick={() => navigate('/home', {state: {username: username}})} // Navigate to the main page on logo click
          className="logo"
        /></a>
      </div>
      <div className="backArrowBar">
        <a className="backArrow" onClick={() => window.history.back()}>
          <img
            src="./back-arrow.png" 
            alt="Back"
            className="backArrow"
          />
        </a>
      </div>
      <div className="pageContainer">
        <div className="loginContainer">
          <h3>Create Account</h3>
        <input
          className="inputField"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className="inputField"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePassword}
        />
        <input
          className="inputField"
          type="password"
          placeholder="Verify password"
          value={confirm}
          onChange={handleConfirm}
        />
        <button className="buttons" onClick = {uploadUser}>Create Account</button>
        <p class = "error">{errMessage}</p>
      </div>
      </div>
    </div>
  );
}

export default CreateAccount;
