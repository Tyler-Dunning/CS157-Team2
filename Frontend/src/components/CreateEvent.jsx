import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


function CreateGroup() {
    const {state} = useLocation();
    const {username} = state;

    const[nameField, setNameField] = useState('');
    const[descField, setDescField] = useState('');
    const[dateField, setDateField] = useState(new Date());
    const[timeField, setTimeField] = useState('5:00');
    const[courtField, setCourtField] = useState('Basketball Court 1');
    const[maxTeamsField, setMaxTeamsField] = useState('');
    const[teamSizeField, setTeamSizeField] = useState('');
    const[allCourts, setAllCourts] = useState([]);

    const[errMessage, setErr] = useState('');


    const navigate = useNavigate();

    const returnToEvents = () => {
        navigate('/events', {state: {username: username}});
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

    const getCourts = async () => {
      try{
        const response = await axios.get(`http://localhost:8081/courts/`);
        setAllCourts(response.data);
    }
      catch(error) {
          console.error('Error fetching events:', error);
      }
    }



    const submitEvent = async () => {
      if(nameField != '' && teamSizeField != '' && maxTeamsField != ''){
        const d = dateField.getFullYear() + "-" + dateField.getMonth() + "-" + dateField.getDay() + " " + timeField;

          await axios.post('http://localhost:8081/createEvent', {"name": nameField, "desc": descField, "court": courtField, 
          "date": d, "maxTeams": maxTeamsField, "teamSize": teamSizeField, });
          
          navigate('/events', {state: {username: username}});
      }
      else{
        setErr("Please submit valid fields");
      }
    }

    useEffect(() => {getCourts()}, []);

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
      <h1>Create an Event</h1>

      <h3>Event Name</h3>
      <input
      type="text"
      placeholder="Enter Event Name"
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
        <DatePicker selected={dateField} onChange={(e) => setDateField(e)} />
      <h3>Start Time</h3>
      <TimePicker onChange={setTimeField} value={timeField} />
      <h3>Select Court</h3>
      <select value ={courtField} onChange={(e) => setCourtField(e.target.value)}>
        {allCourts.map((item,index) => (<option value={item.court_id}>{item.court_name}</option>))}
      </select>
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
      <div className="buttonMargin">
        <button className="buttons" onClick ={submitEvent}>Create New Event</button><br></br>
      </div>
      {/* <button onClick={returnToEvents}>Return To Events</button> */}
      <p className = 'error'> {errMessage}</p>
    </div>
  )
}

export default CreateGroup