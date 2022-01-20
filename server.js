const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const Port = process.env.PORT || 3000;

let connections = {};

server.listen(Port);
console.log('Server running');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    //connections.push(socket);
    //console.log("Connect : %s sockets sedang terhubung", connections.length);
    socket.on('new-user-joined',(username)=>{
        connections[socket.id]=username;
       io.emit ('user-connected',username);
        console.log(connections);
    })


    socket.on('disconnect',() =>{
        io.emit('user-disconnected', user=connections[socket.id]);
        delete  connections[socket.id]
        //connections.splice(connections.indexOf(socket),1);
        //console.log("Disconnect : %s sockets terputus", connections.length);
      
    });
    socket.on('message',(data)=>{
        socket.broadcast.emit("message",{user:data.user, message:data.message});
    })
    // socket.on('sendMessage',(msg)=>{
    //     console.log(msg);
    //     socket.broadcast.emit('sendToAll');
    // })
    // socket.on('chat message', (msg) => {
    //     io.emit('new message', msg);
        
    //     });


});
