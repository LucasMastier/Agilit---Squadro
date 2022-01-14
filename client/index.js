// Variable globale
var valuePositions=[0,75,192,309,426,543,620];
var redScore=[];
var vainqueur="";
var yellowScore=[];
var turnCounter;

var list_game=[];
var btn_create = document.getElementById("btn_create");
const socket = io('http://localhost:3000');
//Equipe du joueur
let playerTeam;
//Nom de la partie dans lequel le joueur est présent
let gameCode;
var playerTeamChat = document.createElement("span");

class Pieces{ 
    constructor(num,pos,color,pt_mvt){
        this.num=num;
        this.pos=pos;
        this.Wayback=false;
        this.color=color;
        this.pt_mvt=pt_mvt;
    }
    getColor(){
        return this.color;
    }
    isOnWayback(){
        return this.Wayback;
    }
    onWayback(){
        this.Wayback=true;
        if(this.pt_mvt==1){
            this.pt_mvt=3;
            return;
        }
        if(this.pt_mvt==3){
            this.pt_mvt=1;
            return;
        }
    }
    getPt_mvt(){
        return this.pt_mvt;
    }
    setPos(pos){
        this.pos=pos;
    }
    getPos(){
        return this.pos;
    }
    getValuePos(){
        return valuePositions[this.pos];
    }
    getNum(){
        return this.num;
    }
    getElement(){
        return document.getElementById('piece_'+this.getColor()+this.getNum());
    }
    reset(){
        this.Wayback=false;
        this.pos=0;
    }
}

// Objets
let red1=new Pieces(1,0,'red',1);
let red2=new Pieces(2,0,'red',3);
let red3=new Pieces(3,0,'red',2);
let red4=new Pieces(4,0,'red',3);
let red5=new Pieces(5,0,'red',1);

let yellow1=new Pieces(1,0,'yellow',3);
let yellow2=new Pieces(2,0,'yellow',1);
let yellow3=new Pieces(3,0,'yellow',2);
let yellow4=new Pieces(4,0,'yellow',1);
let yellow5=new Pieces(5,0,'yellow',3);

//Script principal

var tab_board=[
    [0,1,1,1,1,1,0],
    [1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],

];





// Class




//Server


socket.on('playerTeam', handlePlayerTeam);
socket.on('unknownGame', handleUnknownGame);
socket.on('tooManyPlayers', handleFullGame);
socket.on('testRoom', testRoom);
socket.on('initGame', initGame);
socket.on('displayGame', displayGame);
socket.on('gameName', handleGameName);
socket.on('handleTurnInit',handleTurnInit);
socket.on('incrementTurnCounter', handleTurnCounter);
socket.on('disconnected', handleDisconnect);

function handleDisconnect(){
    vainqueur = playerTeam;
    gameOver();
}


function handleTurnCounter(){
    turnCounter++;
}

function handleTurnInit(turn){
    turnCounter = turn;
    
    if(turnCounter%2 == 0){
        if(playerTeam === "jaune"){
            waitingRed();
        } else {
            Redturn();
        }
    } else if(turnCounter %2 == 1){
        if(playerTeam === "rouge"){
            waitingYellow();
        } else {
            Yellowturn();
        }
    }
}

function handleGameName(code){
    //Récupère le code de la partie actuelle et la stocke dans gameCode
    gameCode = code;
}

function initGame(){
    //Permet de lancer la partie (on initialise le plateau et on lance le tour)
    game();
    initPieces(playerTeam);
}

function testRoom(code){
    //debug
    console.log("Un joueur est connecté a la room "+code);
}

function displayGame(){
    //Permet de passer du menu principal au plateau de jeu (la partie multijoueur se déroule sur la même
    //page que l'index afin de garder la même socket)
    document.getElementById("main_menu").style.display="none";
    document.getElementById("multiplayer-game").style.display="block";
    document.getElementById("playeraudiomenu").pause();
    var messageTeam = "Joueur "+playerTeam+" a rejoint la partie !"
    $('#messages2').append($('<li>').text(messageTeam));
}

function handleUnknownGame(){
    //Affiche une erreur si la partie recherchée n'existe pas
    document.getElementById("erreur_codePleine").style.visibility = "hidden";
    document.getElementById("erreur_codeExiste").style.visibility = "visible";
}

function handleFullGame(){
    //Affiche une erreur si la partie est complète
    document.getElementById("erreur_codeExiste").style.visibility = "hidden";
    document.getElementById("erreur_codePleine").style.visibility = "visible";
}

function reset(){
    //Reset l'attribut playerTeam du joueur
    playerTeam = null;
}


function handlePlayerTeam(team){
    //Affiche une erreur si 
    playerTeam = team;
    console.log("dans handlePlayerTeam "+playerTeam);

    playerTeamChat.innerHTML = ""+strUcFirst(playerTeam);
    playerTeamChat.style.color = "red";
}



//Requetes de mouvements de pieces

//On initialise les objets pieces afin de placer des evenements au click
//On utilisera ces evenements pour envoyer une requete au serveur afin de
//transmettre a l'autre joueur les coups du joueur actuel
let r1 = document.getElementById("piece_red1");
let r2 = document.getElementById("piece_red2");
let r3 = document.getElementById("piece_red3");
let r4 = document.getElementById("piece_red4");
let r5 = document.getElementById("piece_red5");

let y1 = document.getElementById("piece_yellow1");
let y2 = document.getElementById("piece_yellow2");
let y3 = document.getElementById("piece_yellow3");
let y4 = document.getElementById("piece_yellow4");
let y5 = document.getElementById("piece_yellow5");


let red_pieces = [red1,red2,red3,red4,red5];
let yellow_pieces = [yellow1,yellow2,yellow3,yellow4,yellow5];


socket.on('moveRedPieceRequest', handleMoveRed);
socket.on('moveYellowPieceRequest', handleMoveYellow);

function handleMoveRed(piece){
    //Effectue la mouvement de la pièce en fonction de la requête du serveur
    piecePlayed(red_pieces[piece]);
    Yellowturn();
    yellowPlay();
    incrementTurnCounter();
    console.log("Requete moveRedPieceRequest recue "+red_pieces[piece]);
    console.log(turnCounter);

    if(redScore.length==4 || yellowScore.length==4){
        if(redScore.length==4){vainqueur="ROUGES";}
        else{vainqueur="JAUNES";}
        gameOver();
        turnCounter=-1;
    }
}

function handleMoveYellow(piece){
    piecePlayed(yellow_pieces[piece]);
    Redturn();
    redPlay();
    incrementTurnCounter();
    console.log("Requete moveRedPieceRequest recue "+yellow_pieces[piece]);
    console.log(turnCounter);

    if(redScore.length==4 || yellowScore.length==4){
        if(redScore.length==4){vainqueur="ROUGES";}
        else{vainqueur="JAUNES";}
        gameOver();
        turnCounter=-1;
    }
}

function incrementTurnCounter(){
    turnCounter++;
    socket.emit('handleIncrementTurnCounter');
}


//Envoi de mouvement de pièces ROUGES
r1.addEventListener("click", function(){ 
    socket.emit("movePieceRed", 0, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingYellow();
    console.log(turnCounter);
 });

r2.addEventListener("click", function(){ 
    socket.emit("movePieceRed", 1, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingYellow();
    console.log(turnCounter);
});

r3.addEventListener("click", function(){ 
    socket.emit("movePieceRed", 2, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingYellow();
 });

r4.addEventListener("click", function(){ 
    socket.emit("movePieceRed", 3, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingYellow();
});

r5.addEventListener("click", function(){ 
    socket.emit("movePieceRed", 4, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingYellow();
 });


 //Envoi de mouvements de pieces JAUNES
 y1.addEventListener("click", function(){ 
    socket.emit("movePieceYellow", 0, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingRed();
    console.log(turnCounter);
 });

y2.addEventListener("click", function(){ 
    socket.emit("movePieceYellow", 1, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingRed();
});

y3.addEventListener("click", function(){ 
    socket.emit("movePieceYellow", 2, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingRed();
 });

y4.addEventListener("click", function(){ 
    socket.emit("movePieceYellow", 3, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingRed();
});

y5.addEventListener("click", function(){ 
    socket.emit("movePieceYellow", 4, gameCode);
    console.log("Envoi de la requete de mouvement au serveur");
    incrementTurnCounter();
    waitingRed();
 });



 function piecePlayed(p){
    /*  piece jouer par un joueur permet de passer l'info a l'autre joueur 
        pour actualiser son plateau 
    */
    let pm=p.getPt_mvt();
    while(pm>0){
        if(p.getPos()==5 && pm>0 && !p.isOnWayback()){
            returnPieces(p);
            if(p.getColor()=="red"){
                tab_board[p.getPos()-1][p.getNum()]=0;
                tab_board[p.getPos()][p.getNum()]=1;
            }
            if(p.getColor()=="yellow"){
                tab_board[p.getNum()][p.getPos()-1]=0;
                tab_board[p.getNum()][p.getPos()]=1;
            }
            break;
        }
        if(p.getPos()>=0 && pm>0){
            if(!p.isOnWayback() || p.getPos()!=0)
            if(checkCollision(p))
                pm=2;
            if(p.isOnWayback()){
                if(p.getPos()==0)
                    break;
                p.setPos(p.getPos()-1);
            }else{
                p.setPos(p.getPos()+1);
            }
            pm--;
            updateTabBoard(p,true);
        }
    }
    animatePieces(p);
    //changeTurn(p);
    redUpdate();
    yellowUpdate();
    game();
}






function popupJoin(){
    /* fonction qui affiche le menu join 
    */
    
    document.getElementById("join_container").style.display="flex";
    document.getElementById("btn_join").addEventListener('click',function() { verify_code();});
}
function popupCreate(){
    /* fonction qui affiche le menu de creation */
    var code=makeid();
    document.getElementById("code_generated").innerHTML="Code de la partie : "+code;
    document.getElementById("create_container").style.display="flex";
    document.getElementById("btn_create").addEventListener('click',function(){ createRoom(code);});
}
function createRoom(code){
    /* creation de la partie */
    var team=document.querySelector('input[name="r"]:checked').value;
    playerTeam = team;
    console.log(team);
    list_game.push(code);
    document.getElementById("main_menu").style.display="none";
    document.getElementById("multiplayer-game").style.display="block";
    document.getElementById("playeraudiomenu").pause();
    //le mettre sur une partie ou en attente 
    socket.emit('createRoom', code, team);
    waiting();
    $('#messages2').append($('<li>').text("Joueur "+playerTeam+" a rejoint la partie !"));
}

function makeid() {
    /* Genere un code aleatoire de longueur 4 en lettres et chiffre */
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 4; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   list_game.forEach(element => {
       if(result==element){
           return makeid();
       }
   });
   return result;
}
//console.log(makeid());
function verify_code(){
    // Verifie le code entre par l'user si le code existe ou pas 
    var code = document.getElementById("code").value;
    socket.emit('joinRoom', code);
}




//gestion de la musique
var audio = document.getElementById('playeraudio');
var audiomenu = document.getElementById('playeraudiomenu');
var playpausebutton = document.getElementById('playpausebutton');
var playpausebuttonmenu = document.getElementById('playpausebuttonmenu');
var countplay=0;
var countplaymenu=0;
    //play , pause la musique
function playpause(){
    //gere la musique en jeu
    if(countplay==0){
        playpausebutton.style.backgroundImage="url(audio/pause.png)";
        audio.play();
        countplay=1;
    }else{
        playpausebutton.style.backgroundImage="url(audio/play.png)";
        audio.pause();
        countplay=0;
    }
}
function playpausemenu(){
    //gere la musique dans le menu
    if(countplaymenu==0){
        playpausebuttonmenu.style.backgroundImage="url(audio/pause.png)";
        audiomenu.play();
        countplaymenu=1;
    }else{
        playpausebuttonmenu.style.backgroundImage="url(audio/play.png)";
        audiomenu.pause();
        countplaymenu=0;
    }
}
    //mute , unmute la musique
var countmute=0;
var countmutemenu=0;
var currentvolume=0;
var muteunmutebutton = document.getElementById('muteunmutebutton');
var muteunmutebuttonmenu = document.getElementById('muteunmutebuttonmenu');
function muteunmute(){
    //gere la musique en jeu
    if(countmute==0){
        muteunmutebutton.style.backgroundImage="url(audio/mute.png)";
        audio.volume = 0;
        countmute=1;
    }else{
        muteunmutebutton.style.backgroundImage="url(audio/son.png)";
        audio.volume=volumeslider.value / 1000;
        countmute=0;
    }
}
function muteunmutemenu(){
    //gere la musique dans le menu
    if(countmutemenu==0){
        muteunmutebuttonmenu.style.backgroundImage="url(audio/mute.png)";
        audiomenu.volume = 0;
        countmutemenu=1;
    }else{
        muteunmutebuttonmenu.style.backgroundImage="url(audio/son.png)";
        audiomenu.volume=volumeslidermenu.value / 1000;
        countmutemenu=0;
    }
}
    //gérer le volume

var volumeslider=document.getElementById('volumeslider');
var volumeslidermenu=document.getElementById('volumeslidermenu');
volumeslider.addEventListener('mousemove', setvolume);
volumeslidermenu.addEventListener('mousemove', setvolumemenu);

function setvolume(){
    //gere le volume en jeu
    if(countmute==0){
        audio.volume= volumeslider.value / 1000;
    }
}
function setvolumemenu(){
    //gere la musique dans le menu
    if(countmutemenu==0){
        audiomenu.volume= volumeslidermenu.value / 1000;
    }
}












// Audio animation (a faire)


// Fonction 
function elementShown(id, text){
    /*  fonction intermediaire qui permet de changer le texte d'un id */
    let elem=document.getElementById(id);
    elem.innerHTML=text;
}
function Redturn(){
    /*  Indique que c'est au tour des rouges et met à jour 
        le plateau pour que seules les pieces rouges puissent bouger
    */
    let turn=`C'est au tour des  <span id='red_player_title'>rouges</span> !`;
    elementShown("entete",turn);
    
    red1.getElement().style.pointerEvents= "auto";
    red2.getElement().style.pointerEvents= "auto";
    red3.getElement().style.pointerEvents= "auto";
    red4.getElement().style.pointerEvents= "auto";
    red5.getElement().style.pointerEvents= "auto";
    console.log("REDTURN");
}

function Yellowturn(){
    /*  Indique que c'est au tour des jaunes et met à jour 
        le plateau pour que seules les pieces jaunes puissent bouger
    */
    let turn=`C'est au tour des <span id='yellow_player_title'>jaunes</span> !`;
    elementShown("entete",turn);

    yellow1.getElement().style.pointerEvents= "auto";
    yellow2.getElement().style.pointerEvents= "auto";
    yellow3.getElement().style.pointerEvents= "auto";
    yellow4.getElement().style.pointerEvents= "auto";
    yellow5.getElement().style.pointerEvents= "auto";
    console.log("YELLOWTURN");
}

function gameOver(){
    /*  Indique la fin de partie */
    elementShown("entete",'Partie terminée ! Victoire des '+vainqueur);
    document.getElementById("boardfin").style.display="flex";
    $(document.getElementsByClassName("boardfin")).fadeIn(1500);
    red1.getElement().style.pointerEvents= "none";
    red2.getElement().style.pointerEvents= "none";
    red3.getElement().style.pointerEvents= "none";
    red4.getElement().style.pointerEvents= "none";
    red5.getElement().style.pointerEvents= "none";
    
    yellow1.getElement().style.pointerEvents= "none";
    yellow2.getElement().style.pointerEvents= "none";
    yellow3.getElement().style.pointerEvents= "none";
    yellow4.getElement().style.pointerEvents= "none";
    yellow5.getElement().style.pointerEvents= "none";
}

function displayWinner(winner){
    elementShown("entete",'Partie terminée ! Victoire des '+winner);
}

function scoreUpdate(p){
    /*  Met à jour le score de chaque joueur, on les mettent dans une liste
        pour eviter qu'une piece soit compté plusieurs fois dans le scoring 
    */
    let bool=1;
    if(p.getColor()=="red" && p.isOnWayback() && p.getPos()==0){
        redScore.forEach(function(item){
            if(item.getNum()==p.getNum())
                bool=0;
        })
        if(bool){
            redScore.push(p);
            document.getElementById('red'+redScore.length).style.backgroundColor = '#ff4d4d';
        }
        
    }
    if(p.getColor()=="yellow" && p.isOnWayback() && p.getPos()==0){
        yellowScore.forEach(function(item){
            if(item.getNum()==p.getNum())
                bool=0;
        })
        if(bool){
            yellowScore.push(p);
            document.getElementById('yellow'+yellowScore.length).style.backgroundColor = '#fbc531';
        }
        
    }
}

function returnPieces(p){
    /*  fonction intermediaire de movePieces qui retourne la piece 
        lorsque celle-ci a fait l'aller
    */
    p.setPos(6);
    p.onWayback();
    if(p.getColor()=='red'){
        setTimeout(function(){p.getElement().style.backgroundPositionX="-33px";},400);
    }
    if(p.getColor()=='yellow'){
        setTimeout(function(){p.getElement().style.backgroundPosition="112px 280px";},400);
    }
}

function animatePieces(p){
    /*  fonction intermediaire de movePieces qui permet l'animation des pieces 
    */
    if(p.getColor()=='red'){
        $(p.getElement()).animate({'top' : p.getValuePos()+'px'}, {duration : 400});
        $(p.getElement()).css({top:'auto'});
    }
    if(p.getColor()=='yellow'){
        $(p.getElement()).animate({'left' : p.getValuePos()+'px'}, {duration : 400});
        $(p.getElement()).css({left:'auto'});
    }
    if(p.getPos()==0 && p.isOnWayback()){
        //setTimeout(function(){p.getElement().style.opacity = "0.3";},400);
        $(p.getElement()).fadeOut("slow");
    }
}

function movePieces(p){
    /*  permet le mouvement des pieces */
    let pm=p.getPt_mvt();
    p.getElement().onclick=function(){
        while(pm>0){
            if(p.getPos()==5 && pm>0 && !p.isOnWayback()){
                returnPieces(p);
                if(p.getColor()=="red"){
                    tab_board[p.getPos()-1][p.getNum()]=0;
                    tab_board[p.getPos()][p.getNum()]=1;
                }
                if(p.getColor()=="yellow"){
                    tab_board[p.getNum()][p.getPos()-1]=0;
                    tab_board[p.getNum()][p.getPos()]=1;
                }
                break;
            }
            if(p.getPos()>=0 && pm>0){
                if(!p.isOnWayback() || p.getPos()!=0)
                if(checkCollision(p))
                    pm=2;
                if(p.isOnWayback()){
                    if(p.getPos()==0)
                        break;
                    p.setPos(p.getPos()-1);
                }else{
                    p.setPos(p.getPos()+1);
                }
                pm--;
                updateTabBoard(p,true);
            }
        }
        animatePieces(p);
        changeTurn(p);
        redUpdate();
        yellowUpdate();
        game();
    }
}

function piecePlayed(p){
    /*  piece jouer par un joueur permet de passer l'info a l'autre joueur 
        pour actualiser son plateau 
    */
    let pm=p.getPt_mvt();
    while(pm>0){
        if(p.getPos()==5 && pm>0 && !p.isOnWayback()){
            returnPieces(p);
            if(p.getColor()=="red"){
                tab_board[p.getPos()-1][p.getNum()]=0;
                tab_board[p.getPos()][p.getNum()]=1;
            }
            if(p.getColor()=="yellow"){
                tab_board[p.getNum()][p.getPos()-1]=0;
                tab_board[p.getNum()][p.getPos()]=1;
            }
            break;
        }
        if(p.getPos()>=0 && pm>0){
            if(!p.isOnWayback() || p.getPos()!=0)
            if(checkCollision(p))
                pm=2;
            if(p.isOnWayback()){
                if(p.getPos()==0)
                    break;
                p.setPos(p.getPos()-1);
            }else{
                p.setPos(p.getPos()+1);
            }
            pm--;
            updateTabBoard(p,true);
        }
    }
    animatePieces(p);
    //changeTurn(p);
    redUpdate();
    yellowUpdate();
    game();
}

function changeTurn(p){
    /*  changement de tour, on bloque les pieces qui ne sont normalement pas jouables
    */
    if(turnCounter%2==1 && p.getColor()=="yellow"){
        console.log("WaitingRed");
        turnCounter++;
        waitingRed();
    }
    if(turnCounter%2==0 && p.getColor()=="red"){
        console.log("WaitingYellow");
        turnCounter++;
        waitingYellow();
    }
}

function redUpdate(){
    /*  Fait la mise a jour des informations du joueur rouge  
    */
    scoreUpdate(red1);
    scoreUpdate(red2);
    scoreUpdate(red3);
    scoreUpdate(red4);
    scoreUpdate(red5);
}

function yellowUpdate(){
    /*  Fait la mise a jour des informations du joueur jaune
    */
    scoreUpdate(yellow1);
    scoreUpdate(yellow2);
    scoreUpdate(yellow3);
    scoreUpdate(yellow4);
    scoreUpdate(yellow5);
}

function redPlay(){
    /*  Pieces jouable pour le joueur rouge */
    movePieces(red1);
    movePieces(red2);
    movePieces(red3);
    movePieces(red4);
    movePieces(red5);
}

function yellowPlay(){
    /*  Pieces jouable par le joueur jaune */
    movePieces(yellow1);
    movePieces(yellow2);
    movePieces(yellow3);
    movePieces(yellow4);
    movePieces(yellow5);
}



function initializeBoard(){
    /*  initialise le plateau en mettant remettant les pieces a leur point de depart
    */
    red1.reset();
    red2.reset();
    red3.reset();
    red4.reset();
    red5.reset();
    yellow1.reset();
    yellow2.reset();
    yellow3.reset();
    yellow4.reset();
    yellow5.reset();
    game();
}

function initTabBoard(){
    /* Initialise le tableau a 2dimension qui represente le tableau 
    */
    for(let i=0;i<7;i++){
        for(let j=0;j<7;j++){
            tab_board[i][j]=0;
            if(i==0 && (j>=1 && j<=5))
                tab_board[i][j]=1;
            if(j==0 && (i>=1 && i<=5))
                tab_board[i][j]=1;
        }
    }
}

function checkCollision(p){
    /*  check a chaque pas de la pieces s'il y a une collision a la case suivante
        si c'est le cas il renvoie true et renvoie la piece a sa case initial ou checkpoint
        sinon on renvoie false 
    */
    if(p.getColor()=="red"){
        if(!p.isOnWayback() && tab_board[p.getPos()+1][p.getNum()]==1){
            if(p.getPos()+1==1) returnCheckpoint(yellow1);
            if(p.getPos()+1==2) returnCheckpoint(yellow2);
            if(p.getPos()+1==3) returnCheckpoint(yellow3);
            if(p.getPos()+1==4) returnCheckpoint(yellow4);
            if(p.getPos()+1==5) returnCheckpoint(yellow5);
            return true;
        }
        if(p.getPos!=0)
        if(p.isOnWayback() && tab_board[p.getPos()-1][p.getNum()]==1){
            if(p.getPos()-1==1) returnCheckpoint(yellow1);
            if(p.getPos()-1==2) returnCheckpoint(yellow2);
            if(p.getPos()-1==3) returnCheckpoint(yellow3);
            if(p.getPos()-1==4) returnCheckpoint(yellow4);
            if(p.getPos()-1==5) returnCheckpoint(yellow5);
            return true;
        }
    }
    if(p.getColor()=="yellow"){
        if(!p.isOnWayback() && tab_board[p.getNum()][p.getPos()+1]==1){
            if(p.getPos()+1==1) returnCheckpoint(red1);
            if(p.getPos()+1==2) returnCheckpoint(red2);
            if(p.getPos()+1==3) returnCheckpoint(red3);
            if(p.getPos()+1==4) returnCheckpoint(red4);
            if(p.getPos()+1==5) returnCheckpoint(red5);
            return true;
        }
        if(p.isOnWayback() && tab_board[p.getNum()][p.getPos()-1]==1){
            if(p.getPos()-1==1) returnCheckpoint(red1);
            if(p.getPos()-1==2) returnCheckpoint(red2);
            if(p.getPos()-1==3) returnCheckpoint(red3);
            if(p.getPos()-1==4) returnCheckpoint(red4);
            if(p.getPos()-1==5) returnCheckpoint(red5);
            return true;
        }
    }
    return false;
}

function returnCheckpoint(p){
    /*  remet la piece a son point de checkpoint suite a une collision
        et met a jour le tableau representant le plateau
    */
    updateTabBoard(p,false);
    if(p.isOnWayback()){
        p.setPos(6);
    }else{
        p.setPos(0);
    }
    animatePieces(p);
}

function updateTabBoard(p, b){
    /*  met a jour le tableau a 2 dimensions du plateau 
        le boolean b permet de savoir si c'est un update suite a une collision
        ou a un simple mouvement sans collision
    */
    if(!b){
        if(p.getColor()=="red" && p.isOnWayback()){
            tab_board[p.getPos()][p.getNum()]=0;
            tab_board[6][p.getNum()]=1
        }
        if(p.getColor()=="red" && !p.isOnWayback()){
            tab_board[p.getPos()][p.getNum()]=0;
            tab_board[0][p.getNum()]=1;

        }
        if(p.getColor()=="yellow" && p.isOnWayback()){
            tab_board[p.getNum()][p.getPos()]=0;
            tab_board[p.getNum()][6]=1;
        }
        if(p.getColor()=="yellow" && !p.isOnWayback()){
            tab_board[p.getNum()][p.getPos()]=0;
            tab_board[p.getNum()][0]=1;
        }
    }
    if(b){
        if(p.getColor()=="red" && p.isOnWayback()){
            tab_board[p.getPos()+1][p.getNum()]=0;
            tab_board[p.getPos()][p.getNum()]=1;
        }
        if(p.getColor()=="red" && !p.isOnWayback()){
            tab_board[p.getPos()-1][p.getNum()]=0;
            tab_board[p.getPos()][p.getNum()]=1;
        }
        if(p.getColor()=="yellow" && p.isOnWayback()){
            tab_board[p.getNum()][p.getPos()+1]=0;
            tab_board[p.getNum()][p.getPos()]=1;
        }
        if(p.getColor()=="yellow" && !p.isOnWayback()){
            tab_board[p.getNum()][p.getPos()-1]=0;
            tab_board[p.getNum()][p.getPos()]=1;
        }
    }
}

function waiting(){
    /*  fonction qui interdit l'interaction avec le plateau en attendant
        que la room se remplisse
    */
    elementShown("entete","En attente d'un joueur !");
    red1.getElement().style.pointerEvents= "none";
    red2.getElement().style.pointerEvents= "none";
    red3.getElement().style.pointerEvents= "none";
    red4.getElement().style.pointerEvents= "none";
    red5.getElement().style.pointerEvents= "none";
    
    yellow1.getElement().style.pointerEvents= "none";
    yellow2.getElement().style.pointerEvents= "none";
    yellow3.getElement().style.pointerEvents= "none";
    yellow4.getElement().style.pointerEvents= "none";
    yellow5.getElement().style.pointerEvents= "none";
}
function initPieces(team){
    /* fonction init qui interdit au joueur de touché aux autres pieces que les siennes
    */
    if(team=="rouge"){
        yellow1.getElement().style.pointerEvents= "none";
        yellow2.getElement().style.pointerEvents= "none";
        yellow3.getElement().style.pointerEvents= "none";
        yellow4.getElement().style.pointerEvents= "none";
        yellow5.getElement().style.pointerEvents= "none";
    }
    if(team=="jaune"){
        red1.getElement().style.pointerEvents= "none";
        red2.getElement().style.pointerEvents= "none";
        red3.getElement().style.pointerEvents= "none";
        red4.getElement().style.pointerEvents= "none";
        red5.getElement().style.pointerEvents= "none";
    }
}
function waitingRed(){
    /*  fonction qui bloque toutes les pieces cote joueur jaune 
        en attendant que le joueur rouge ait joué
    */
    let turn=`C'est au tour des  <span id='red_player_title'>rouges</span> !`;
    elementShown("entete",turn);
    yellow1.getElement().style.pointerEvents= "none";
    yellow2.getElement().style.pointerEvents= "none";
    yellow3.getElement().style.pointerEvents= "none";
    yellow4.getElement().style.pointerEvents= "none";
    yellow5.getElement().style.pointerEvents= "none";
    console.log("WAITINGRED");
}

function waitingYellow(){
    /*  fonction qui bloque toutes les pieces cote joueur rouge
        en attendant que le joueur jaune ait joué
    */
    let turn=`C'est au tour des <span id='yellow_player_title'>jaunes</span> !`;
    elementShown("entete",turn);

    red1.getElement().style.pointerEvents= "none";
    red2.getElement().style.pointerEvents= "none";
    red3.getElement().style.pointerEvents= "none";
    red4.getElement().style.pointerEvents= "none";
    red5.getElement().style.pointerEvents= "none";
    console.log("WAITINGYELLOW");
}
// Deroulement du jeu (main)
function game(){
    console.log(playerTeam);
    if(turnCounter==-1){
        initializeBoard();
        initTabBoard();
    }
    
    console.table(tab_board); // Pour les tests a enlever plus tard
    if(turnCounter%2==0 && playerTeam === "rouge"){
        
        Redturn();
        redPlay();
        console.log("game redturn");
    }
    if(turnCounter%2==1 && playerTeam === "jaune"){
        
        Yellowturn();
        yellowPlay();
        console.log("game yellowturn");
        
    }

    if(redScore.length==4 || yellowScore.length==4){
        if(redScore.length==4){vainqueur="ROUGES";}
        else{vainqueur="JAUNES";}
        gameOver();
        turnCounter=-1;
    }
}

function waitingBis(playerTeam){
    if(playerTeam == "jaune"){
        let turn=`C'est au tour des <span id='yellow_player_title'>jaunes</span> !`;
        elementShown("entete",turn);
    
        red1.getElement().style.pointerEvents= "none";
        red2.getElement().style.pointerEvents= "none";
        red3.getElement().style.pointerEvents= "none";
        red4.getElement().style.pointerEvents= "none";
        red5.getElement().style.pointerEvents= "none";
        console.log("WAITINGYELLOW");
    } else {
        let turn=`C'est au tour des  <span id='red_player_title'>rouges</span> !`;
        elementShown("entete",turn);
        yellow1.getElement().style.pointerEvents= "none";
        yellow2.getElement().style.pointerEvents= "none";
        yellow3.getElement().style.pointerEvents= "none";
        yellow4.getElement().style.pointerEvents= "none";
        yellow5.getElement().style.pointerEvents= "none";
        console.log("WAITINGRED");
    }
        
}


//Chat
function strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}



$('form').submit(function(e) {
    e.preventDefault(); // On évite le recharchement de la page lors de la validation du formulaire
    // On crée notre objet JSON correspondant à notre message
    if(!onlySpaces($('#m').val())){
        var message = {
            text : strUcFirst(playerTeam)+" : "+$('#m').val()
        }
        $('#m').val(''); // On vide le champ texte
        if (message.text.trim().length !== 0) { // Gestion message vide
            socket.emit('chat-message', message);
        }
        $('#chat input').focus(); // Focus sur le champ du message
    }
    
});

socket.on('chat-message', function (message) {
    console.log(message);
    $('#messages2').append($('<li>').text(message.text));
});


function onlySpaces(str) {
    return str.trim().length === 0;
  }

