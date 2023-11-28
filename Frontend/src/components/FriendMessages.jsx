import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './style/Messages.css'


function FriendMessages() {

    const {state} = useLocation();
    const {username, friendID} = state;
    const navigate = useNavigate();

    const [messages, setMessages] = useState([[]]);

    const[content, setContent] = useState('');

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

    const getMessages = async () =>
    {
        
      try{ 
        var res = [];
        const response = await axios.get(`http://localhost:8081/getmessage/friend/${friendID}`);
        const userData = response.data;

        for(let i = 0; i < userData.length; i++) {
          res.push([userData[i].sender_id, userData[i].content, userData[i].time_sent]);
        }
        setMessages(res);
      }
      catch(error) {
        console.error('Error fetching messages:', error);
      }
    };

    const sendMessage = async () =>
    {
        console.log(content);
        await axios.post('http://localhost:8081/sendmessage/friend', {"id": username, "content": content, "friendID": friendID});
        await getMessages();
        setContent('');
    }

    useEffect(() => {getMessages()}, []);

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

        <h2>Messages</h2><br></br>
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
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button className="buttons" onClick = {sendMessage}>
            Send
          </button>
        </div>
               
      </ul>
      
        <br></br>
        {/* <button onClick = {() => navigate('/home', {state: {username: username}})}>Return Home</button> */}
    </div>
  )
}

export default FriendMessages