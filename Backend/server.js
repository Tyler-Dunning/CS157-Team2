const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pickupfinder",
    port: 3306,
    options: {
        trustedConnection: true
    }
})

db.getConnection(function(err){
    if(err) console.log(err);
    else console.log("connected");
})

app.get("/courts", (req, res) => {
    const sql = "SELECT * FROM courts";
    db.query(sql, (err, data) => {
        if(err) console.log(err);
        return res.json(data);
    })
});

app.get("/groups", (req, res) => {
    const sql = "SELECT * FROM playergroups";
    db.query(sql, (err, data) => {
        if(err) console.log(err);
        return res.json(data);
    })
})

app.get("/events", (req, res) => {
    const sql = "SELECT * FROM playerevents";
    db.query(sql, (err, data) => {
        if(err) console.log(err);
        return res.json(data);
    })
})

app.get("/courtName/:id", (req,res) => {
    const id = req.params.id;
    db.query("SELECT court_name FROM courts WHERE court_id = ?", id, (err,data) => {
        if(err) console.log(err);
        return res.json(data);
    })
})

app.get("/groupActivity/:groupID", (req, res) => {
    const groupID = req.params.groupID;    
    db.query("SELECT activity_name, activity_desc, location FROM groupactivities WHERE group_id = ?", groupID, (err, data) => {
        if(err) console.log(err);
        return res.json(data);
    })
})

app.get("/usersOnCourt/:court", (req, res) => {
    const court = req.params.court;
    db.query("SELECT user_id FROM useroncourt WHERE court_id = ?", court, (err,data) => {
        if(err) console.log(err);
        res.send(data);
    });
});

app.get("/usersInGroup/:group", (req, res) => {
    const group = req.params.group;
    db.query("SELECT user_id FROM useringroup WHERE group_id = ?", group, (err,data) => {
        if(err) console.log(err);
        res.send(data);
    });
});

app.get("/teamsInEvent/:eventID" , (req, res) => {
    const eventID = req.params.eventID;
    db.query("SELECT t.event_id,t.team_id,t.captain_name,u.user_id FROM teams t NATURAL JOIN userOnTeam u WHERE t.team_id = u.team_id AND t.event_id = ? ORDER BY t.team_id, u.user_id;", eventID, (err, data) => {
        if(err) console.log(err);
        const teams = {};

        data.forEach(item => {
            if (!teams[item.team_id]) {
                teams[item.team_id] = {
                    event_id: item.event_id,
                    team_id: item.team_id,
                    team_captain: item.captain_name,
                    members: []
                };
            }
            teams[item.team_id].members.push(item.user_id);
        });
        res.send(teams);
    });
})


app.get('/friends/:id', (req,res) => {
    const id = req.params.id;
    db.query("SELECT * FROM friends WHERE user1 = ?", id, (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

app.get('/friends2/:id', (req,res) => {
    const id = req.params.id;
    db.query("SELECT * FROM friends WHERE user2 = ?", id, (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

app.get('/users/:id', (req,res) => {
    const id = req.params.id;
    db.query("SELECT password FROM users WHERE user_id = ?", id, (err, data) => {
        if(err) console.log(err);
        res.send(data);
    });
});

app.get('/getmessage/friend/:friendID', (req,res) => {
    const friendID = req.params.friendID;
    console.log(friendID);
    db.query("SELECT sender_id, content, time_sent FROM messages NATURAL JOIN messageinfriends WHERE friendship_id = ?", friendID, (err, data) =>
    {
        if(err) console.log(err);
        res.send(data);
    })
});

app.get('/getmessage/court/:courtID', (req,res) => {
    const friendID = req.params.courtID;
    console.log(friendID);
    db.query("SELECT sender_id, content, time_sent FROM messages NATURAL JOIN messageincourt WHERE court_id = ?", friendID, (err, data) =>
    {
        if(err) console.log(err);
        res.send(data);
    })
});

app.get('/getmessage/group/:groupID', (req,res) => {
    const groupID = req.params.groupID;
    db.query("SELECT sender_id, content, time_sent FROM messages NATURAL JOIN messageingroup WHERE group_id = ?", groupID, (err, data) =>
    {
        if(err) console.log(err);
        res.send(data);
    })
});

app.get('/teamMembers/:teamID/:eventID', (req, res) => {
    const teamID = req.body.teamID;
    const eventID = req.body.eventID;
    db.query("SELECT user_id FROM userOnTeam WHERE team_id = ? AND event_id = ?", [teamID, eventID], (err, data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

app.put('/acceptFriend/:friendID/:userID', (req,res) => {
    const friendID = req.params.friendID;
    const uID = req.params.userID;

    db.query("UPDATE friends SET pending = 1 WHERE user1 = ? AND user2 = ?", [friendID, uID], (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

app.post('/users/post/', (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const password = req.body.password;
    db.query("INSERT INTO users(user_id, password) VALUES(?, ?)", [id, password] , (err,data) =>  {
        if(err) console.log(err);
        res.send(data);
    });
});

app.post('/addfriend', (req, res) => {
    const user = req.body.user;
    const friend = req.body.friend;
    db.query("INSERT INTO friends(user1, user2) VALUES(?, ?)", [user, friend] , (err,data) =>  {
        if(err) console.log(err);
        res.send(data);
        console.log(data);
    });
})

app.post('/joinCourt/', (req, res) => {
    const user = req.body.user;
    const court = req.body.court;
    db.query("INSERT INTO useroncourt(user_id, court_id) VALUES(?, ?)", [user, court], (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
});

app.post('/joinGroup/', (req, res) => {
    const user = req.body.user;
    const group = req.body.group;
    db.query("INSERT INTO useringroup(user_id, group_id) VALUES(?, ?)", [user, group], (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
});

app.post('/createGroup', (req, res) => {
    const id = req.body.id;
    const desc = req.body.desc;
    db.query("INSERT INTO playergroups(group_id, group_desc) VALUES (?, ?)", [id, desc], (err,data) =>{
        if(err) console.log(err);
        res.send(data);
    })
})

app.post('/createTeam', (req, res) => {
    const user = req.body.user;
    const event = req.body.eventID;
    const name = req.body.name;
    // Insert into the 'teams' table
    db.query("INSERT INTO teams(team_id, event_id, captain_name) VALUES (?, ?, ?)", [name, event, user], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        // Get the last inserted id
        db.query("SELECT team_id FROM teams WHERE event_id = ? AND captain_name = ?", [event, user], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            const team_id = data[0].team_id;
            res.send({ team_id: team_id }); // Sending back the team_id as a response
        });
    });
});

app.post('/joinTeam', (req, res) => {
    const team = req.body.team;
    const user = req.body.user;
    const event = req.body.event;
    db.query("INSERT INTO userOnTeam(user_id, team_id, event_id) VALUES (?, ?, ?)", [user, team, event], (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

app.post('/createEvent', (req, res) => {
    const name = req.body.name;
    const court = req.body.court;
    const date = req.body.date;
    const maxTeams = req.body.maxTeams;
    const teamSize = req.body.teamSize;
    const desc = req.body.desc;

    db.query( "INSERT INTO playerEvents(event_name, court_id, event_date, max_teams, team_size, event_desc) VALUES (?, ?, ?, ?, ?, ?)", 
    [name, court, date, maxTeams, teamSize, desc], (err, data) => {
        if(err) console.log(err);
        res.send(data);
        console.log(data);
    })
})


app.post('/sendmessage/friend', (req, res) =>{
    console.log(req.body);
    const id = req.body.id;
    const content = req.body.content;
    const chat = req.body.friendID;
    db.query("INSERT INTO messages(sender_id, content) VALUES(?, ?)", [id, content] , (err,data) =>  {
        if(err) console.log(err);
        res.send(data);
        db.query("SELECT MAX(message_id) AS 'HIGH' FROM messages", (err, data) => {
            const mesID = data[0].HIGH;
            console.log(data[0].HIGH);
    
            db.query("INSERT INTO messageinfriends(message_id, friendship_id) VALUES(?, ?)", [mesID, chat] , (err,data) =>  {
                if(err) console.log(err);
            });
        });
    });
});

app.post('/createActivity', (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const location = req.body.location;
    const groupID = req.body.groupID;
    db.query("INSERT INTO groupActivities(activity_name, activity_desc, location, group_id) VALUES (?, ?, ?, ?)", [name, desc,location, groupID], (err,data) =>{
        if(err) console.log(err);
        res.send(data);
    })
})


app.post('/sendmessage/court', (req, res) =>{
    console.log(req.body);
    const id = req.body.id;
    const content = req.body.content;
    const chat = req.body.courtID;
    db.query("INSERT INTO messages(sender_id, content) VALUES(?, ?)", [id, content] , (err,data) =>  {
        if(err) console.log(err);
        res.send(data);
        db.query("SELECT MAX(message_id) AS 'HIGH' FROM messages", (err, data) => {
            const mesID = data[0].HIGH;
            console.log(data[0].HIGH);
    
            db.query("INSERT INTO messageincourt(message_id, court_id) VALUES(?, ?)", [mesID, chat] , (err,data) =>  {
                if(err) console.log(err);
            });
        });
    });
});

app.post('/sendmessage/group', (req, res) =>{
    console.log(req.body);
    const id = req.body.id;
    const content = req.body.content;
    const chat = req.body.groupID;
    db.query("INSERT INTO messages(sender_id, content) VALUES(?, ?)", [id, content] , (err,data) =>  {
        if(err) console.log(err);
        res.send(data);
        db.query("SELECT MAX(message_id) AS 'HIGH' FROM messages", (err, data) => {
            const mesID = data[0].HIGH;
            console.log(data[0].HIGH);
    
            db.query("INSERT INTO messageingroup(message_id, group_id) VALUES(?, ?)", [mesID, chat] , (err,data) =>  {
                if(err) console.log(err);
            });
        });
    });
});

app.delete('/removeUserFromCourt/:user', (req, res) => 
{
    const user = req.params.user;
    db.query("DELETE FROM useroncourt WHERE user_id = ?", user, (err, data) => {
        if (err) console.log(err);
        res.send(data);
    })
});

app.delete('/leaveTeam/:user/:event', (req,res) => {
    const user = req.params.user;
    const event = req.params.event;
    db.query("DELETE FROM useronteam WHERE user_id = ? AND event_id = ?", [user, event], (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

app.delete('/removeUserFromGroup/:user/:groupID', (req, res) => 
{
    const user = req.params.user;
    const group = req.params.groupID;
    db.query("DELETE FROM useringroup WHERE user_id = ? AND group_id = ?", [user, group], (err, data) => {
        if (err) console.log(err);
        res.send(data);
    })
});

app.listen(8081, () => {
    console.log("listening");
})
