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
        <h1>{groupID}Group Activities</h1>
        <ul className='activityList'>
        {groupActivities.map((item, index) => (
            <li key={index}>
            {item[0]} : {item[1]} : {item[2]}
            </li>
        ))}        
        <br></br>         
        <button onClick = {goToCreateActivity}>Create Activity</button>
        <button onClick = {returnToViewGroups}>Return to ViewGroup</button>
        </ul>
        </div>
  
    )
}      
export default GroupActivity   
