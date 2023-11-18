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

app.post('/users/post/', (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const password = req.body.password;
    db.query("INSERT INTO users(user_id, password) VALUES(?, ?)", [id, password] , (err,data) =>  {
        if(err) console.log(err);
        res.send(data);
    });
});

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

app.listen(8081, () => {
    console.log("listening");
})
