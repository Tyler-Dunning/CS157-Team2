import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function Courts() {

    const {state} = useLocation();
    const {username} = state;
    const navigate = useNavigate();

    const[courts, setCourts] = useState([]);

    const returnToHome = () => {
        navigate('/home', {state: {username: username}});
    }

    const getCourts = async () => {
        try{ 
            var res = [];
            const response = await axios.get(`http://localhost:8081/courts/`);
            const userData = response.data;
    
            for(let i = 0; i < userData.length; i++) {
              res.push([userData[i].court_id, userData[i].court_name, userData[i].address, userData[i].court_condition, userData[i].num_hoops, userData[i].hours_of_operation]);
            }
            setCourts(res);
          }
          catch(error) {
            console.error('Error fetching courts:', error);
          }
    }
    const viewCourt = (e, f) => {
      
        navigate("/courtView", { state: { username: username, courtID: e, courtName: f} });
      }

    useEffect(() => {getCourts()}, []);

  return (
    <div>
        <h2>Courts</h2>
        <ul className='courtList'>
        {courts.map((item, index) => (
          <li key={index}>
            {item[1]} : {item[2]} : {item[3]}: {item[4]}: {item[5]}<button onClick = {() => {viewCourt(item[0], item[1])}}>Join this Court</button><br></br>
            
            </li>
        ))}        
      </ul>
      <br></br>
      <button onClick = {returnToHome}>Return Home</button>
    </div>
  )
}

export default Courts