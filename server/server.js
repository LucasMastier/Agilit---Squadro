/*const io = require('socket.io')();

io.on('connection', client => {
    client.emit('init', { data: 'hello world' });
});


io.listen(3000);
*/

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const clientPath = __dirname+'/../client';

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

const clientRooms = {};



io.on('connection', client => {
    console.log('Someone connected');
    client.emit('message', 'Hi, you are connected');

    //Création de partie
    client.on('createRoom', createRoom);

    function createRoom(code){
        clientRooms[client.id] = code;
        
        client.join(roomName);
        client.number = 1;
        client.emit('playerNumber',1);
    }


});




server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(3000, () => {
    console.log('RPS started on 3000');
});






