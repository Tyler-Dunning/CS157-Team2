import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function CreateGroup() {
    const {state} = useLocation();
    const {username} = state;

    const[nameField, setNameField] = useState('');
    const[descField, setDescField] = useState('');
    const[dateField, setDateField] = useState('');
    const[courtField, setCourtField] = useState('');
    const[maxTeamsField, setMaxTeamsField] = useState('');
    const[teamSizeField, setTeamSizeField] = useState('');


    const[errMessage, setErr] = useState('');


    const navigate = useNavigate();

    const returnToEvents = () => {
        navigate('/events', {state: {username: username}});
    }

    const submitEvent = async () => {
        await axios.post('http://localhost:8081/createEvent', {"name": nameField, "desc": descField, "court": courtField, 
        "date": dateField, "maxTeams": maxTeamsField, "teamSize": teamSizeField, });
        
         navigate('/events', {state: {username: username}});
        
    }

  return (
    <div>
        <h1>Create a Group</h1>

        <h3>Event Name</h3>
        <input
        type="text"
        placeholder="Enter Group Name"
        value={nameField}
        onChange={e => setNameField(e.target.value)}
      />
      <h3>Description</h3>
      <input
        type="text"
        placeholder="Enter Description"
        value={descField}
        onChange={e => setDescField(e.target.value)}
      />
      <h3>Date</h3>
      <input
        type="text"
        placeholder="Enter Date"
        value={dateField}
        onChange={e => setDateField(e.target.value)}
      />
      <h3>Court ID</h3>
      <input
        type="text"
        placeholder="Enter Court ID"
        value={courtField}
        onChange={e => setCourtField(e.target.value)}
      />
    <h3>Max Teams</h3>
    <input
        type="text"
        placeholder="Enter Max Teams"
        value={maxTeamsField}
        onChange={e => setMaxTeamsField(e.target.value)}
    />
    <h3>Team Size</h3>
    <input
        type="text"
        placeholder="Enter Team Size"
        value={teamSizeField}
        onChange={e => setTeamSizeField(e.target.value)}
    />
      <br></br>
      <button onClick ={submitEvent}>Create New Event</button><br></br>
      <button onClick={returnToEvents}>Return To Events</button>
      <p className = 'error'> {errMessage}</p>
    </div>
  )
}

export default CreateGroup