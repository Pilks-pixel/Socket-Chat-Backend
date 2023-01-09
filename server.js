"use strict";
const app = require("express")();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

// Server

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Express is running on port ${port}`));


const io = require("socket.io")(server, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://pilks-pixel-chat.netlify.app",
        credentials: true
    },
});


// Socket connection
global.onlineUsers = new Map(); 

io.on('connection', socket => {
    console.log(`Hello user connected ${socket.id}`) // runs when client first connects
    console.log(onlineUsers.size)
    for (const i of onlineUsers.entries()) {
        console.log(i)
    }
    

    global.chatSocket = socket;

    socket.on('add_user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });


    socket.on("send_message", (data) => {
        console.log(data)
        const user = onlineUsers.get(data.to);
        const userId = data.from;
        console.log(user)
        if (user) {
            console.log(socket.id);
            onlineUsers.set(userId, socket.id);
            socket.to(user).emit("recieve_message", data);
        } 
    });

    socket.on("remove_user", (userId) => {
        onlineUsers.delete(userId);
        console.log(onlineUsers.size)
    });

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log(`connection severed`, socket.id);
    });
});


// API handling

app.get('/', (req,res) => {
    res.status(200).send('Hello World')
})

const userRouting = require('./routes/userRoutes');
app.use('/api/auth/', userRouting);

const messageRouting = require('./routes/messageRoutes');
app.use('/api/messages/', messageRouting);



// DB connection 

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('DB connection');
}).catch((err) => {
    console.log(err.message);
});
   

