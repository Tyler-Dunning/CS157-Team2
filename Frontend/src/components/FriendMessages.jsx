import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './style/Messages.css'


function FriendMessages() {

    const {state} = useLocation();
    const {username, friendID} = state;

    const [messages, setMessages] = useState([[]]);

    const[content, setContent] = useState('');

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
        <h2>Messages</h2><br></br>


        <ul className='textbox'>
        {messages.map((item, index) => (
          <li key={index}>
            {item[0]} : {item[1]} <br></br>
            {item[2]}
            </li>
        ))}        
      </ul>
      <input
        type="text"
        placeholder="Enter message"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick = {sendMessage}>
            Send
        </button>
    </div>
  )
}

export default FriendMessages