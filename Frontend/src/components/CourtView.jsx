import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function CourtView() {

    const {state} = useLocation();
    const {username, courtID, courtName} = state;
    const navigate = useNavigate();

    const[usersOnCourt, setUsers] = useState([]);
    const[numUsers, setNumUsers] = useState(0);
    const[curUserOnCourt, setCurUser] = useState(false);
    const[messageContent, setMessage] = useState("");
    const[messages, setMessages] = useState([]);
    const[friends, setFriends] = useState([]);

    const returnToCourts = () => {
        navigate('/courts', {state: {username: username}});
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

    const getUsersOnCourt = async () => {
        try{ 
            var res = [];
            const response = await axios.get(`http://localhost:8081/usersOnCourt/${courtID}`);
            const userData = response.data;
    
            for(let i = 0; i < userData.length; i++) {
                res[i] = userData[i].user_id;
                console.log(userData[i].user_id);
              }
            if(res.indexOf(username) == -1)
            {
                setCurUser(false);
            }
            else
            {
                setCurUser(true);
            }
            setUsers(res);
            setNumUsers(res.length);
          }
          catch(error) {
            console.error('Error fetching courts:', error);
          }
    };

    const getFriends = async() => {
        try{ 
          var res = [];
          const response = await axios.get(`http://localhost:8081/friends/${username}`);
          const userData = response.data;
          
          const response2 = await axios.get(`http://localhost:8081/friends2/${username}`);
          const userData2 = response2.data;
          
          let i = 0;
          for(i; i < userData.length; i++) {
            res[i] = (userData[i].user2);
          }
          for(let c = 0; c < userData2.length; c++)
          {
            res[i + c] = (userData2[c].user1);
          }
          setFriends(res);
        }
        catch(error) {
          console.error('Error fetching password:', error);
        }
    }

    const getMessages = async() => {
        try{ 
            var res = [];
            const response = await axios.get(`http://localhost:8081/getmessage/court/${courtID}`);
            const userData = response.data;
    
            for(let i = 0; i < userData.length; i++) {
              res.push([userData[i].sender_id, userData[i].content, userData[i].time_sent]);
            }
            setMessages(res);
          }
          catch(error) {
            console.error('Error fetching messages:', error);
          }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:8081/sendmessage/court', {"id": username, "content": messageContent, "courtID": courtID});
        await getMessages();
        setMessage('');
    }

    const addFriend = async (e) => {
        await axios.post('http://localhost:8081/addFriend', {"user": username, "friend": e});
        await getFriends();
    }

    const joinCourt = async () => {
        await axios.post('http://localhost:8081/joinCourt', {"user": username, "court": courtID});
        await getUsersOnCourt();
        await getNumUsers();
        console.log("joined");
        
    }

    const leaveCourt = async () => {
        await axios.delete(`http://localhost:8081/removeUserFromCourt/${username}`);
        await getUsersOnCourt();
        await getNumUsers();
    }



    useEffect(() => {getUsersOnCourt(); getMessages(), getFriends()}, []);

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
        <h2>{courtName}</h2>
        {curUserOnCourt && <button className="leaveButtons" onClick = {leaveCourt}>Leave This Court</button>}
        {!curUserOnCourt && <button className="buttons" onClick = {joinCourt}>Join This Court</button>}
        <div>
          <h3>{numUsers} Current Players</h3>
          <ul className='friendList'>
          {usersOnCourt.map((item, index) => (
            <li key={index}>
              {item} {(item != username && friends.indexOf(item) == -1) && <button className="buttons" onClick = {() => {addFriend(item)}}>Add Friend</button>}<br></br>

              </li>
          ))}        
          </ul>
        </div>
        
      
      <ul className='textbox'>
        {messages.map((item, index) => (
          <li key={index}>
            {item[0]} : {item[1]} <br></br>
            {item[2]}
            </li>
        ))}  
        
      <div className = "messageEnter">
        <input
        type="text"
        placeholder="Enter message"
        value={messageContent}
        onChange={e => setMessage(e.target.value)}
        />
        <button className="buttons" onClick = {sendMessage}>
            Send
        </button>
      </div>
            
      </ul>

    
        <br></br>
        {/* <button className="buttons" onClick = {returnToCourts}>Return to Courts</button> */}
    </div>
  )
}

export default CourtView