const express = require('express');
const path = require('path');
const app = express();
//creating a http server
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

//import socket io and it will take http server object as an argument
const io = require('socket.io')(http, {
    cors: {origin: "*"} //allowing any url to access the backend url
});

//server setup
app.use(express.static(__dirname + '/../app'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+"/index.html"));
  });

//create an event to listen for a 'connection'(event name) from a client in the front end
//with a callback to the socket
io.on('connection', (socket) => {
    console.log('an user connected');

    //on the socket we can listen to any custom event we want, in this case we call it the 'message' event
    socket.on('message', (message) => {//listening to incoming messages
        console.log(message); 
        //first para will be the event name, second will be the text we want to broadcast
        io.emit('message', `${socket.id.substr(0,2)} said ${message}`) //sending the message to the client side
    });
});

//tell server to listen to port 8080
http.listen(8080, () => console.log('listening on port 8080'));

