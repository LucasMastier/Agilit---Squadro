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
    console.log(client.id+' is connected');
    client.emit('message', 'Hi, you are connected');
    

    //Création de partie
    client.on('createRoom', createRoom);
    //Rejoindre une partie
    client.on('joinRoom', handleJoinRoom);
    //Gameplay
    client.on("movePieceRed", movePieceRed);
    client.on("movePieceYellow", movePieceYellow);
    //Deconnexion
    client.on('disconnect', disconnected);

    function disconnected(){
        io.to(client.code).emit("disconnected");
    }
        

    function movePieceRed(piece, gameCode){
        //On recupère les sockets id
        console.log("Entrée dans movePieceRed");
        const clients = io.sockets.adapter.rooms.get(gameCode);

        //On parcourt les clients par leur socket id
        for (const clientId of clients ) {

            const clientSocket = io.sockets.sockets.get(clientId);

            if(clientSocket.team == "jaune"){
                clientSocket.emit('moveRedPieceRequest', piece);
                console.log("Envoi de la requete moveRedPieceRequest a "+clientSocket.id);
            }      
       }
    }

    function movePieceYellow(piece, gameCode){
        //On recupère les sockets id
        console.log("Entrée dans movePieceRed");
        const clients = io.sockets.adapter.rooms.get(gameCode);

        //On parcourt les clients par leur socket id
        for (const clientId of clients ) {
            
            const clientSocket = io.sockets.sockets.get(clientId);

            if(clientSocket.team == "rouge"){
                clientSocket.emit('moveYellowPieceRequest', piece);
                console.log("Envoi de la requete moveRedPieceRequest a "+clientSocket.id);
            }      
       }
    }

    function createRoom(code, team){
        let roomName = code;
        clientRooms[client.id] = roomName;
        
        
        console.log(roomName);
        console.log(client.id);
        
        client.join(roomName);
        console.log("L'hote a crée la partie "+code);
        client.team = team;

        
        
        
        client.emit('gameName', code);

        io.to(code).emit("testRoom", code);
        console.log(client.id+" est team "+client.team);
        client.code = code;
    }

    function generateTurn(){
        return Math.floor(Math.random()*2);
    }

    function handleJoinRoom(gameCode){
        console.log("Un client essaie de rejoindre la room "+gameCode);
        
        const clients = io.sockets.adapter.rooms.get(gameCode);
        var nbClients = null;
        if(clients){
            nbClients = clients.size;
        }
        
        console.log(clients);
        console.log("Il y a "+nbClients+" clients dans la partie");


        if(nbClients == null){
            client.emit('unknownGame');
            console.log("Un joueur essaie de rejoindre une partie vide");
            return;
        }
        
        if(!(nbClients == null)){
            
            if(nbClients > 1){
                client.emit('tooManyPlayers');
                console.log("Un joueur essaie de rejoindre une partie pleine");
                return;
            }
    
            
    
    
            //On définit la team du joueur qui rejoint en fonction de la team du joueur deja présent
            for (const clientId of clients ) {
                
                const clientSocket = io.sockets.sockets.get(clientId);
    
                if(clientSocket.team === "rouge"){
                    console.log(clientSocket.id+" est team "+clientSocket.team);
                    client.team = "jaune";
                    console.log("Le premier joueur est rouge donc on met le deuxieme joueur jaune ")
                } else if(clientSocket.team === "jaune"){
                    client.team = "rouge";
                }
           }
           console.log(client.team);
           
           clientRooms[client.id] = gameCode;
           console.log("Un joueur a rejoint la partie "+gameCode+" !");
           client.join(gameCode);
           
    
           io.to(gameCode).emit("testRoom", "test");
    
            
            client.emit('playerTeam', client.team);
            client.emit('gameName', gameCode);
            client.emit('displayGame');
            io.to(gameCode).emit("handleTurnInit", generateTurn());
    
            io.to(gameCode).emit("initGame");
            client.code = gameCode;
        }

        
        
    }
    /**
     * Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs
     */
    client.on('chat-message', function (message) {
        console.log('message : ' + message.text);
        io.to(client.code).emit('chat-message', message);

    });


});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(3000, () => {
    console.log('RPS started on 3000');
});






