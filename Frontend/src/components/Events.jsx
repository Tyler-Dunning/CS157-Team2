import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function Groups() {
    const {state} = useLocation();
    const {username} = state;

    const navigate = useNavigate();

    const returnToHome = () => {
        navigate('/home', {state: {username: username}});
    }

    const[events, setEvents] = useState([]);

    const createEvent = () => {
        navigate('/createEvent', {state: {username: username}});
    }

    const getEvents = async () => {
        try{
            const response = await axios.get(`http://localhost:8081/events`);
            setEvents(response.data);
        }
        catch(error) {
            console.error('Error fetching events:', error);
        }
    }

    const goToEvent = (eventObj) => {
        navigate('/viewEvent', {state: {username: username, event: eventObj}});
    }

    useEffect(() => {getEvents()}, []);

  return (
    <div>
        <h1>Events</h1>
        <ul className='eventList'>
        {events.map((event, index) => (
          <li key={index}>
            <div>{event.event_name}</div>
            <div>{event.event_desc} </div>
            <div>Team Size: {event.team_size} </div>
            <div>Max Teams: {event.max_teams}</div>
            <button onClick = {() => {goToEvent(event)}}>View This Event</button>
            </li>
        ))}        
        <br></br>
        <button onClick ={createEvent}>Create Event</button>
        <button onClick = {returnToHome}>Return Home</button>
      </ul>
    </div>
  )
}

export default Groups