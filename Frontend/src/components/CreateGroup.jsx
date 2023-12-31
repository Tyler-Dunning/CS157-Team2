import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function CreateGroup() {
    const {state} = useLocation();
    const {username} = state;

    const[nameField, setNameField] = useState('');
    const[descField, setDescField] = useState('');

    const[errMessage, setErr] = useState('');


    const navigate = useNavigate();

    const openCourts = () => {
      
      navigate("/courts", { state: { username: username} });
    }

    const openGroups = () => {
      
      navigate("/groups", { state: { username: username} });
    }

    const openEvents = () => {
      navigate("/events",  { state: { username: username} });
    }
    const logout = () => {
      navigate("/login");
    }


    const submitGroup = async () => {

        const response = await axios.get(`http://localhost:8081/groups`);
        const userData = response.data;
        for(let i = 0; i < userData.length; i++) {
            if(userData[i].group_id == nameField){
                console.log("Group Already Exists");
                setErr("There is already a group with that name");
                return;
            }
        }
        await axios.post('http://localhost:8081/createGroup', {"id": nameField, "desc": descField});
        navigate('/groups', {state: {username: username}});
        
    }

  return (
    <div>
      <div className="topnav">
        <a><img
          src="./logo.jpg" 
          alt="Logo"
          onClick={() => navigate('/home', {state: {username: username}})} 
          className="logo"
        /></a>
        <a className="menu-button" onClick={openCourts}>Join a Court</a>
        <a className="menu-button" onClick={openGroups}>Groups</a>
        <a className="menu-button" onClick={openEvents}>Events</a>
        <a className="logout" onClick={logout}>Logout</a>
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

        <h1>Create a Group</h1>

        <h3>Enter Group Name</h3>
        <input
        type="text"
        placeholder="Enter Group Name"
        value={nameField}
        onChange={e => setNameField(e.target.value)}
      />
      <h3>Enter a Description For Your Group</h3>
      <input
        type="text"
        placeholder="Enter Description"
        value={descField}
        onChange={e => setDescField(e.target.value)}
      />
      <br></br>
      <div className="buttonMargin">
        <button className="buttons" onClick ={submitGroup}>Create New Group</button>
      </div>
      <br></br>
      <p className = 'error'> {errMessage}</p>
    </div>
  )
}

export default CreateGroup