import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function CreateActivity() {
    const {state} = useLocation();
    const {username, groupID} = state;
    const navigate = useNavigate();

    const[nameField, setNameField] = useState('');
    const[descField, setDescField] = useState('');
    const[locationField, setLocationField] = useState('');

    const submitActivity = async () => {
        await axios.post('http://localhost:8081/createActivity', {"name": nameField, "desc": descField, "location": locationField, "groupID": groupID});
        setNameField('');
        setDescField('');
        setLocationField('');
    }
    const returnToActivity = () => {
        navigate('/groupActivity', {state: {username: username, groupID: groupID}});
    }

    return (
        <div>
            <h1>{groupID}Create an Activity</h1>
    
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
            <h3>Enter a Location</h3>
            <input
                type="text"
                placeholder="Enter Location"
                value={locationField}
                onChange={e => setLocationField(e.target.value)}
            />
            <br></br>
            <button onClick ={submitActivity}>Create Activity</button><br></br>
            <button onClick = {returnToActivity}>Return to Activity</button>
        </div>
    )
}
export default CreateActivity   
