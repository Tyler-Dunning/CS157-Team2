import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './style/Home.css';
import './style/Table.css';

function Home() {
    
  
    const navigate = useNavigate();

    const {state} = useLocation();
    const {username} = state;

    const[friends, setFriends] = useState([]);
    //const[friendIDs, setFriendIDs] = useState([]);
    
    const messageFriend = (e) => {
      
      navigate("/friendMessages", { state: { username: username, friendID: e } });
    }

    const acceptRequest = async (e) => {
      await axios.put(`http://localhost:8081/acceptFriend/${e}/${username}`);
      getFriends();
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

    const getFriends = async () =>
    {
      try{ 
        var res = [];
        const response = await axios.get(`http://localhost:8081/friends/${username}`);
        const userData = response.data;
        
        const response2 = await axios.get(`http://localhost:8081/friends2/${username}`);
        const userData2 = response2.data;
        
        let i = 0;
        for(i; i < userData.length; i++) {
          if(userData[i].pending != 0){
            res.push([userData[i].user2, userData[i].friendship_id, userData[i].pending]);
          }
        }
        for(let c = i; c < userData2.length + i; c++)
        {
          res.push([userData2[c - i].user1, userData2[c - i].friendship_id, userData2[c - i].pending]);
        }
        console.log(res);
        setFriends(res);
      }
      catch(error) {
        console.error('Error fetching password:', error);
      }
    } 
    useEffect(() => {getFriends()}, []);

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
    <h2 className="header">Welcome {username}</h2>
    
    <ul className="friends">
      <h4>Friend List</h4>
      {friends.map((item, index) => (
        <li key={index}>
          {item[0]}
          {item[2] != 0 && <button className="buttons" onClick={() => messageFriend(item[1])}>
            Message
          </button> }
          {item[2] == 0 && <button className="buttons" onClick={() => acceptRequest(item[0])}>
            Accept Friend Request
          </button> }
        </li>
      ))}
    </ul>
  </div>

    
  )
}

export default Home