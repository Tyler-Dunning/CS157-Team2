import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './style/Home.css';


function Home() {
    
  
    const navigate = useNavigate();

    const {state} = useLocation();
    const {username} = state;

    const[friends, setFriends] = useState([]);
    const[friendIDs, setFriendIDs] = useState([]);
    
    const messageFriend = (e) => {
      
      navigate("/friendMessages", { state: { username: username, friendID: friendIDs[e] } });
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

    const getFriends = async () =>
    {
      console.log("opened");
      try{ 
        var res = [];
        var IDs = [];
        const response = await axios.get(`http://localhost:8081/friends/${username}`);
        const userData = response.data;
        
        const response2 = await axios.get(`http://localhost:8081/friends2/${username}`);
        const userData2 = response2.data;
        
        let i = 0;
        for(i; i < userData.length; i++) {
          res[i] = (userData[i].user2);
          IDs[i] = userData[i].friendship_id;
        }
        for(let c = 0; c < userData2.length; c++)
        {
          res[i + c] = (userData2[c].user1);
          IDs[i + c] = userData2[c].friendship_id;
        }
        console.log(res);
        console.log(IDs);
        setFriends(res);
        setFriendIDs(IDs);
      }
      catch(error) {
        console.error('Error fetching password:', error);
      }
    }

    useEffect(() => {getFriends()}, []);

  return (
    
    <div> 
        <h2 className = "header">Welcome {username}</h2><br></br>
        
        <button className = "mainButtons" onClick={openCourts}>Join a Court</button><br></br>
        <button className = "mainButtons" onClick = {openGroups}>Groups</button><br></br>
        <button className = "mainButtons" onClick={openEvents}>Events</button><br></br>
        

      <ul className = "friends">
        {friends.map((item, index) => (
          <li key={index}>
            {item}
            <button className = "friendButtons" onClick={() => messageFriend(index)}>Message</button>
          </li>
        ))}        
      </ul>
    </div>

    
  )
}

export default Home