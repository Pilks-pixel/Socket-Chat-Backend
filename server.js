const app = require("express")();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
app.use(cors());
app.use(bodyParser.json());
// const server = require("http").createServer(app); 

// const io = require("socket.io")(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//     },
// });

require('dotenv').config()

// Socket connection
/*
/io.on('connection', socket => {
    console.log(`Hello user connected ${socket.id}`) // runs when client first connects

    
    socket.on("join_room", (data) => {
        socket.join(data.roomNum);
        socket.to(data.roomNum).emit("user_join_message", data);
        console.log(`user ${socket.id} has joined ${data}`);
    });

    // socket.on("show_writing", (data) => {
    //     socket.to(data.message.roomNum).emit("making_message", data)
    // });

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.roomNum).emit("recieve_message", data)
    });

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log(`Good Bye`, socket.id);
        io.emit("disconnect_message", ` has left`);
    });
});
*/
// API handling

app.get('/', (req,res) => {
    res.status(200).send('Hello World')
})

const registerRouting = require('./routes/userRoutes')
app.use('/api/auth/register', registerRouting)


// DB connection 

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('DB connection ');
}).catch((err) => {
    console.log(err.message);
});
   
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Express is running on port ${port}`))

