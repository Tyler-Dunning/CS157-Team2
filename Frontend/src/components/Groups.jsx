import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

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
        <h1>Groups</h1>
        <button onClick ={createGroup}>Create Group</button>
        <ul className='groupList'>
        {groups.map((item, index) => (
          <li key={index}>
            {item[0]} : {item[1]}
            <button onClick = {() => {goToGroup(item[0], item[1])}}>View This Group</button>
            </li>
        ))}        
        <br></br>
        <button onClick = {returnToHome}>Return Home</button>
      </ul>
    </div>
  )
}

export default Groups