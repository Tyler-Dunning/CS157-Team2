import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function GroupActivity() {
    const {state} = useLocation();
    const {username, groupID} = state;
    const navigate = useNavigate();
    const[groupActivities, setGroupActivity] = useState([]);

    const returnToViewGroups = () => {
        navigate('/viewGroup', {state: {username: username, groupID: groupID}});
    }
    const goToCreateActivity = () => {
        navigate('/createActivity', {state: {username: username, groupID: groupID}});
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
    const getActivitiesInGroup = async () => {
        try {
            var res = [];
            const response = await axios.get(`http://localhost:8081/groupActivity/${groupID}`);
            const activityData = response.data;
    
            for (let i = 0; i < activityData.length; i++) {
                res.push([activityData[i].activity_name, activityData[i].activity_desc, activityData[i].location]);
            }
            setGroupActivity(res);
        } catch (error) {
            console.error('Error fetching group activities:', error);
        }
    }
    
    useEffect(() => {
        getActivitiesInGroup();
    }, []);

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
        <h1>{groupID} Group Activities</h1>
        <div className="tableContainer">
            <table className='table'>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {groupActivities.map((item, index) => (
                    <tr key={index}>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
                
        <br></br>         
        <button className="buttons" onClick = {goToCreateActivity}>Create Activity</button>
        {/* <button onClick = {returnToViewGroups}>Return to ViewGroup</button> */}
        
        </div>
  
    )
}      
export default GroupActivity   
