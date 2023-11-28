import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import './style/Login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [inputPass, setInput] = useState('');
  const [errMessage, setError] = useState('');

  const navigate = useNavigate();
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const fetchPassword = async () => {
    try{ 
      const response = await axios.get(`http://localhost:8081/users/${username}`);
      const userData = response.data;
      if (userData.length > 0) {
        // Assuming response contains an array with a single object { password: 'user_password' }
        return(userData[0].password);
      }
      return null;
    }
    catch(error) {
      console.error('Error fetching password:', error);
    }
  };

  const checkPass = async () => {

    const val = await fetchPassword();
    
    console.log(username + " " + val + " " + inputPass)
    if(username != "" && val == inputPass)
    {
      navigate("/home", { state: { username: username } });
    }
    else{
      setError("Incorrect username or password");
    }
  }

  const goToCreate = () =>
  {
    navigate("/createAccount");
  }

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
    <div className="pageContainer">
      <div className="loginContainer">
      <h2>Login / Sign up</h2>
      <input className="inputField"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input className="inputField"
        type="password"
        placeholder="Enter password"
        value={inputPass}
        onChange={handleInput}
      />
      <button className="buttons" onClick={checkPass}>Login</button>
      <p class = "error">{errMessage}</p>
      
      <button className="buttons" onClick={goToCreate}>Create Account</button>
      </div>
    </div>
    
      
    </div>
  );
}

export default Login;
