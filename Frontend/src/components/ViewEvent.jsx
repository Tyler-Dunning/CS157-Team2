import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

function ViewGroup() {

    const {state} = useLocation();
    const {username, event} = state;
    const navigate = useNavigate();

    const[numTeams, setNumTeams] = useState(0);
    const[teams, setTeams] = useState([]);
    const [isUserInTeam, setIsUserInTeam] = useState(false);
    const [isUserCaptain, setIsUserCaptain] = useState(false);
    const[teamField, setTeamField] = useState('');
    const[courtName, setCourtName] = useState('');
    const[displayDate, setDisplayDate] = useState('');


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

    const getCourtName = async () => {
      try{
        const response = await axios.get(`http://localhost:8081/courtName/${event.court_id}`);
        const userData =  response.data;

        setCourtName(userData[0].court_name);
      }
      catch(error) {
          console.error('Error fetching events:', error);
      }
    }

    const createTeam = async () => {
        const response = await axios.post('http://localhost:8081/createTeam', {"user": username, "name": teamField, "eventID": event.event_id});
        console.log(response.data)
        await joinTeam(response.data.team_id);
        await getTeamsInEvent();
    }

    const joinTeam = async (teamID) => {
        await axios.post('http://localhost:8081/joinTeam', {"user": username, "team": teamID, "event": event.event_id});
        await getTeamsInEvent();
    }

    const changeDate = () => {
      var x = event.event_date;
      console.log(x);
      let modified = x.replace('T', ' at ').replace('Z', '').replace(':00.000', '');
      
      setDisplayDate(modified);
    }
    

    const getTeamsInEvent = async () => {
        try{ 
            const response = await axios.get(`http://localhost:8081/teamsInEvent/${event.event_id}`);
            const teamsArray = Object.values(response.data)
            setTeams(teamsArray);
            setNumTeams(teamsArray.length);
            // Check if the user is already in a team
            const userInTeam = teamsArray.some(team => team.members.includes(username));
            setIsUserInTeam(userInTeam);
            // Check if the user is a captain of any team
            const userIsCaptain = teamsArray.some(team => team.team_captain === username);
            setIsUserCaptain(userIsCaptain);
          }
          catch(error) {
            console.error('Error fetching groups:', error);
          }
    };

    const leaveTeam = async () => {
        console.log("started remove");
        await axios.delete(`http://localhost:8081/leaveTeam/${username}/${event.event_id}`);
        console.log("Deleted");
        await getTeamsInEvent();
    }

    useEffect(() => {getTeamsInEvent(), getCourtName(), changeDate()}, []);

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
        <h2>{event.event_name}</h2>
        <h3>{courtName}</h3>
        <h4>{displayDate}</h4>
        <h4>{event.event_desc}</h4>
        <h3>Max Teams: {event.max_teams}</h3>
        <h3>Team Size: {event.team_size}</h3>
        <h3>{numTeams} Current Teams in Event</h3>
        {teams.map(team => (
            <div key={team.team_id}>
                <h2>{team.team_id}</h2>
                <p>Captain: {team.team_captain}</p>
                Members:
                <ul>
                    {team.members.map(member => <li key={member}>{member}</li>)}
                </ul>
                {!isUserCaptain && !isUserInTeam && team.members.length < event.team_size && <button className = "buttons" onClick={() => joinTeam(team.team_id)}>Join Team</button>}
            </div>
        ))}

        {isUserInTeam && <button className = "buttons" onClick={() => leaveTeam()}>Leave Team</button>}
                
        {numTeams < event.max_teams && !isUserCaptain && !isUserInTeam && 
              <input
              type="text"
              placeholder="Enter Team Name"
              value={teamField}
              onChange={e => setTeamField(e.target.value)}
            />
        }
        {numTeams < event.max_teams && !isUserCaptain && !isUserInTeam && <button className = "buttons" onClick={createTeam}>Create Team</button>}
        {/* <button onClick = {returnToEvents}>Return to Events</button> */}
    </div>
  )
}

export default ViewGroup