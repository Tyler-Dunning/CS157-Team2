import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './style/Table.css';


function Groups() {
    const {state} = useLocation();
    const {username} = state;

    const[groups, setGroups] = useState([]);

    const navigate = useNavigate();

    const createGroup = () => {
        navigate('/createGroup', {state: {username: username}});
    }

    const returnToHome = () => {
        navigate('/home', {state: {username: username}});
    }
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

    const getGroups = async () => {
        try{
            var res = [];
            const response = await axios.get(`http://localhost:8081/groups`);
            const userData = response.data;

            for(let i = 0; i < userData.length; i++) {
                res.push([userData[i].group_id, userData[i].group_desc]);
            }
            setGroups(res);
      }
      catch(error) {
        console.error('Error fetching courts:', error);
      }
    }

    const goToGroup = (e, f) => {
        navigate('/viewGroup', {state: {username: username, groupID: e, groupDesc: f}});
    }

    useEffect(() => {getGroups()}, []);

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
        <h2>Groups</h2>
        <div className="tableContainer">
        <table className='table'>
          <thead>
            <tr>
              <th>Group ID</th>
              <th>Group Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>
                  <button className = "buttons" onClick={() => goToGroup(item[0], item[1])}>View This Group</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button className = "buttons" onClick ={createGroup}>Create Group</button>
      </div>
    </div>
  )
}

export default Groups