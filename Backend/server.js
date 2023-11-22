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


app.get('/friends/:id', (req,res) => {
    const id = req.params.id;
    db.query("SELECT user2, friendship_id FROM friends WHERE user1 = ?", id, (err,data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

app.get('/friends2/:id', (req,res) => {
    const id = req.params.id;
    db.query("SELECT user1, friendship_id FROM friends WHERE user2 = ?", id, (err,data) => {
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
