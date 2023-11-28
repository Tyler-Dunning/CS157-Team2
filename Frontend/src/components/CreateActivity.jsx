import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function CreateActivity() {
    const {state} = useLocation();
    const {username, groupID, groupDesc} = state;
    const navigate = useNavigate();

    const[nameField, setNameField] = useState('');
    const[descField, setDescField] = useState('');
    const[courtField, setCourtField] = useState('Basketball Court 1');
    const[allCourts, setAllCourts] = useState([]);

    const submitActivity = async () => {
        await axios.post('http://localhost:8081/createActivity', {"name": nameField, "desc": descField, "location": courtField, "groupID": groupID});
        navigate('/groupActivity', {state: {username: username, groupID: groupID, groupDesc: groupDesc}});
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

    const returnToActivity = () => {
        navigate('/groupActivity', {state: {username: username, groupID: groupID}});
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
            <h1>{groupID} Create an Activity</h1>
            <h3>Enter Title</h3>
            <input
            type="text"
            placeholder="Enter Group Name"
            value={nameField}
            onChange={e => setNameField(e.target.value)}
            />
            <h3>Enter a Description</h3>
            <input
                type="text"
                placeholder="Enter Description"
                value={descField}
                onChange={e => setDescField(e.target.value)}
            />
            <h3>Select Court</h3>
            <select value ={courtField} onChange={(e) => setCourtField(e.target.value)}>
                {allCourts.map((item,index) => (<option value={item.court_name}>{item.court_name}</option>))}
            </select>
            <br></br>
            <div className="buttonMargin">
                <button className="buttons" onClick ={submitActivity}>Create Activity</button><br></br>
            </div>
            {/* <button onClick = {returnToActivity}>Return to Activity</button> */}
        </div>
    )
}
export default CreateActivity   
