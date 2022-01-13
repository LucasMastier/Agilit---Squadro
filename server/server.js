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
    //Rejoindre une partie
    client.on('joinRoom', handleJoinRoom);

    function createRoom(code, team){
        let roomName = code;
        clientRooms[client.id] = roomName;
        client.emit('gameCode',roomName);
        console.log(roomName);
        
        client.join(roomName);
        client.team = team;
        client.emit('playerNumber', 1);
        client.emit('init',1);
    }

    function handleJoinRoom(gameCode){
        const room = io.sockets.adapter.rooms[gameCode];
        let allUsers;
        if(room){
            allUsers = room.sockets;
            console.log(allUsers);
        }

        let numClients = 0;
        if(allUsers) {
            numClients = Objects.keys(allUsers).length;
            console.log("Un joueur essaie de rejoindre une partie existante");
        }

        if(numClients === 0){
            client.emit('unknownGame');
            console.log("Un joueur essaie de rejoindre une partie vide");
            return;
        } else if(numClients > 1){
            client.emit('tooManyPlayers');
            console.log("Un joueur essaie de rejoindre une partie pleine");
            return;
        }

        clientRooms[client.id] = gameCode;
        client.join(gameCode);
        
        client.number = 2;
        client.emit('playerNumber', 2);
        console.log("Un joueur a rejoint la partie "+gameCode+" !");
        
    }


});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(3000, () => {
    console.log('RPS started on 3000');
});






