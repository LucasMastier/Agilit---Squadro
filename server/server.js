//
//Nous avons choisi de laisser les console.log afin de faciliter la compréhension du code uniquement coté serveur (dans la console dans laquelle est lancé le serveur)
//

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const clientPath = __dirname+'/../client';

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);
const serverPort = 3000;


io.on('connection', client => {
    console.log(client.id+' est connecté');
    
    //Gestion des requêtes du client

    //Création de partie
    client.on('createRoom', createRoom);
    //Rejoindre une partie
    client.on('joinRoom', handleJoinRoom);
    //Gameplay
    client.on("movePieceRed", movePieceRed);
    client.on("movePieceYellow", movePieceYellow);
    //Deconnexion
    client.on('disconnect', disconnected);

    //Fonctions executées à la reception des requêtes

    function disconnected(){
        //Prévient le joueur restant dans la partie lorsque l'autre joueur se deconnecte de la partie (ferme l'onglet ou retourne au menu principal)
        io.to(client.code).emit("disconnected");
    }
        

    function movePieceRed(piece, gameCode){
        //Cette fonction permet de prévenir le joueur jaune qu'une pièce rouge à été jouée

        console.log("Entrée dans movePieceRed");

        //On recupère les sockets id
        const clients = io.sockets.adapter.rooms.get(gameCode);

        //On parcourt les clients par leur socket id
        for (const clientId of clients ) {

            const clientSocket = io.sockets.sockets.get(clientId);
            //On cherche le client correspondant au joueur jaune
            if(clientSocket.team == "jaune"){
                clientSocket.emit('moveRedPieceRequest', piece);
                console.log("Envoi de la requete moveRedPieceRequest a "+clientSocket.id);
            }      
       }
    }

    function movePieceYellow(piece, gameCode){
        //Cette fonction permet de prévenir le joueur jaune qu'une pièce rouge à été jouée

        console.log("Entrée dans movePieceYellow");

        //On recupère les sockets id
        

        //On recupère les sockets id
        const clients = io.sockets.adapter.rooms.get(gameCode);

        //On parcourt les clients par leur socket id
        for (const clientId of clients ) {
            
            const clientSocket = io.sockets.sockets.get(clientId);
            //On cherche le client correspondant au joueur rouge
            if(clientSocket.team == "rouge"){
                clientSocket.emit('moveYellowPieceRequest', piece);
                console.log("Envoi de la requete moveRedPieceRequest a "+clientSocket.id);
            }      
       }
    }

    function createRoom(code, team){
        //Fonction permettant la création de room (on enregistre aussi la team choisie par le joueur au moment de la création de partie)

        let roomName = code;
        
        client.join(roomName);
        console.log("L'hote a crée la partie "+code);
        client.team = team;
        
        client.emit('gameName', code);

        console.log(client.id+" est team "+client.team);
        client.code = code;
    }

    function generateTurn(){
        //Permet de générer un nombre aléatoire afin de définir quel joueur commence
        return Math.floor(Math.random()*2);
    }

    function handleJoinRoom(gameCode){
        //Fonction permettant à un client de rejoindre une partie

        console.log("Un client essaie de rejoindre la room "+gameCode);
        
        const clients = io.sockets.adapter.rooms.get(gameCode);
        var nbClients = null;
        if(clients){
            nbClients = clients.size;
        }
        
        console.log(clients);
        console.log("Il y a "+nbClients+" clients dans la partie");


        if(nbClients == null){
            //Dans ce cas la la partie n'existe pas
            client.emit('unknownGame');
            console.log(client.id+" essaie de rejoindre une partie vide");
            return;
        }
        
        if(!(nbClients == null)){
            
            if(nbClients > 1){
                //La partie existe mais est deja pleine
                client.emit('tooManyPlayers');
                console.log(client.id+" essaie de rejoindre une partie pleine");
                return;
            }
    
            
    
    
            //On définit la team du joueur qui rejoint en fonction de la team du joueur deja présent
            for (const clientId of clients ) {
                
                const clientSocket = io.sockets.sockets.get(clientId);
    
                if(clientSocket.team === "rouge"){

                    console.log(clientSocket.id+" est team "+clientSocket.team);
                    client.team = "jaune";
                    console.log("Le premier joueur est rouge donc on met le deuxieme joueur jaune ");

                } else if(clientSocket.team === "jaune"){

                    client.team = "rouge";
                    console.log("Le premier joueur est jaune donc on met le deuxieme joueur rouge ");

                }
           }
           
           //On ajoute le joueur à la partie
           client.join(gameCode);
           console.log(client.id+" a rejoint la partie "+gameCode+" !");
    
            //On envoie au client son équipe
            client.emit('playerTeam', client.team);

            //On envoie au client le nom de sa partie
            client.emit('gameName', gameCode);

            //On affiche le plateau de jeu
            client.emit('displayGame');

             //On initialise le premier tour
            io.to(gameCode).emit("handleTurnInit", generateTurn());

            //On lance la partie
            io.to(gameCode).emit("initGame");

            //On attache le code de sa partie au client
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

server.listen(serverPort, () => {
    console.log('Server en écoute sur le port : '+serverPort);
});






