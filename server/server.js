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
        
        
        console.log(roomName);
        console.log(client.id);
        
        client.join(roomName);
        console.log("L'hote a crée la partie "+clientRooms[client.id]);
        client.team = team;
        client.emit('playerNumber', 1);
        client.emit('init',1);

        io.to(code).emit("testRoom", code);
    }

    function handleJoinRoom(gameCode){
        console.log("Un client essaie de rejoindre la room "+gameCode);
        client.join(gameCode);
        const clients = io.sockets.adapter.rooms.get(gameCode);
        const nbClients = clients.size;
        console.log(clients);
        console.log(nbClients);
        let allUsers;

        if(clients){
            allUsers = clients.sockets;
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






