const express = require('express');
const app = express();
const socket = require('socket.io');

//used nodemon index to start server with nodemon

//when port number heard execute call back
const server = app.listen(3000,()=>{
        console.log('port 3000 active...');
});

//serving a static file with middle ware
app.use(express.static('public')); //looks in public folder for static file index.html and serves it as home page


//socket setup
var io = socket(server);


//listen for a connection 
io.on('connection', (socket)=>{

        console.log('made connection to socket...', socket.id);

        //receive the data from incoming client
        socket.on('chatmessage',(data)=>{

                console.log(data);
                
                //send data received out to all the other clients connected
                io.sockets.emit('chatmessage', data );
        })


        //receive data of whoever is typing from client
        socket.on('typing', (data)=>{

                //send data to all sockets except the origin socket
                socket.broadcast.emit('typing', data);
        })
})