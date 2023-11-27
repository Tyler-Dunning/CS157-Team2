import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './style/Table.css';

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

    useEffect(() => {getEvents()}, []);

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
      <div className="tableContainer">
        <h2>Events</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Team Size</th>
              <th>Max Teams</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.event_name}</td>
                <td>{event.event_desc}</td>
                <td>{event.team_size}</td>
                <td>{event.max_teams}</td>
                <td>
                  <button className = "buttons" onClick={() => goToEvent(event)}>View This Event</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button className = "buttons" onClick={createEvent}>Create Event</button>
      </div>
    </div>
  )
}

export default Groups