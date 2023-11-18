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
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={handleUsernameChange}
      />
        <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePassword}
      />
        <input
        type="password"
        placeholder="Verify password"
        value={confirm}
        onChange={handleConfirm}
      />
      <button onClick = {uploadUser}>Create Account</button>
      <p class = "error">{errMessage}</p>
    </div>
  );
}

export default CreateAccount;
