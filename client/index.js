var list_game=[];
var btn_create = document.getElementById("btn_create");
const socket = io('http://localhost:3000');
let playerTeam;

socket.on('init', handleInit);
socket.on('playerNumber', handlePlayerNumber);
socket.on('unknownGame', handleUnknownGame);
socket.on('tooManyPlayers', handleFullGame);
socket.on('testRoom', testRoom);

function testRoom(code){
    console.log("Un joueur est connecté a la room "+code);
}


function handleInit(){

}

function handleUnknownGame(){
    alert("La partie n'existe pas");
}

function handleFullGame(){
    alert("La partie est déjà complète");
}

function reset(){
    playerTeam = null;
}


function handlePlayerNumber(team){
    playerTeam = team;
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
    console.log(team);
    list_game.push(code);
    document.getElementById("main_menu").style.display="none";
    document.getElementById("multiplayer-game").style.display="block";
    //le mettre sur une partie ou en attente 
    socket.emit('createRoom', code, team);
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
    /* Verifie le code entre par l'user si le code existe ou pas 
    */
   /*
    let found=false;
    list_game.forEach(element => {
        if(element==document.getElementById("code").value){
            //l'envoyer sur la partie correspondante
            console.log(document.getElementById("code").value);
            finded=true;
            var code = document.getElementById("code").value;
            socket.emit('joinRoom', code);
        }
    });
    if(!found)
        document.getElementById("erreur_code").style.visibility="visible";
    */
    var code = document.getElementById("code").value;
    socket.emit('joinRoom', code);
}




//gestion de la musique
var audio = document.getElementById('playeraudio');
var playpausebutton = document.getElementById('playpausebutton');
var countplay=0;
    //play , pause la musique
function playpause(){
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
    //mute , unmute la musique
var countmute=0;
var currentvolume=0;
var muteunmutebutton = document.getElementById('muteunmutebutton');
function muteunmute(){
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
    //gérer le volume

var volumeslider=document.getElementById('volumeslider');
volumeslider.addEventListener('mousemove', setvolume);

function setvolume(){
    if(countmute==0){
        audio.volume= volumeslider.value / 1000;
    }
}


// Variable globale
var valuePositions=[0,75,192,309,426,543,620];
var redScore=[];
var vainqueur="";
var yellowScore=[];
var turnCounter=-1;






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
    yellow1.getElement().style.pointerEvents= "none";
    yellow2.getElement().style.pointerEvents= "none";
    yellow3.getElement().style.pointerEvents= "none";
    yellow4.getElement().style.pointerEvents= "none";
    yellow5.getElement().style.pointerEvents= "none";
    
    red1.getElement().style.pointerEvents= "auto";
    red2.getElement().style.pointerEvents= "auto";
    red3.getElement().style.pointerEvents= "auto";
    red4.getElement().style.pointerEvents= "auto";
    red5.getElement().style.pointerEvents= "auto";

}

function Yellowturn(){
    /*  Indique que c'est au tour des jaunes et met à jour 
        le plateau pour que seules les pieces jaunes puissent bouger
    */
    let turn=`C'est au tour des <span id='yellow_player_title'>jaunes</span> !`;
    elementShown("entete",turn);
    red1.getElement().style.pointerEvents= "none";
    red2.getElement().style.pointerEvents= "none";
    red3.getElement().style.pointerEvents= "none";
    red4.getElement().style.pointerEvents= "none";
    red5.getElement().style.pointerEvents= "none";

    yellow1.getElement().style.pointerEvents= "auto";
    yellow2.getElement().style.pointerEvents= "auto";
    yellow3.getElement().style.pointerEvents= "auto";
    yellow4.getElement().style.pointerEvents= "auto";
    yellow5.getElement().style.pointerEvents= "auto";
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
    changeTurn(p);
    redUpdate();
    yellowUpdate();
    game();
}

function changeTurn(p){
    if(turnCounter%2==1 && p.getColor()=="yellow"){
        turnCounter++;
        yellow1.getElement().style.pointerEvents= "none";
        yellow2.getElement().style.pointerEvents= "none";
        yellow3.getElement().style.pointerEvents= "none";
        yellow4.getElement().style.pointerEvents= "none";
        yellow5.getElement().style.pointerEvents= "none";
        red1.getElement().style.pointerEvents= "auto";
        red2.getElement().style.pointerEvents= "auto";
        red3.getElement().style.pointerEvents= "auto";
        red4.getElement().style.pointerEvents= "auto";
        red5.getElement().style.pointerEvents= "auto";
    }
    if(turnCounter%2==0 && p.getColor()=="red"){
        turnCounter++;
        red1.getElement().style.pointerEvents= "none";
        red2.getElement().style.pointerEvents= "none";
        red3.getElement().style.pointerEvents= "none";
        red4.getElement().style.pointerEvents= "none";
        red5.getElement().style.pointerEvents= "none";
        yellow1.getElement().style.pointerEvents= "auto";
        yellow2.getElement().style.pointerEvents= "auto";
        yellow3.getElement().style.pointerEvents= "auto";
        yellow4.getElement().style.pointerEvents= "auto";
        yellow5.getElement().style.pointerEvents= "auto";
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
    turnCounter=Math.floor(Math.random()*2);
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

// Deroulement du jeu (main)
function game(){
    if(turnCounter==-1){
        initializeBoard();
        initTabBoard();
    }
    console.table(tab_board); // Pour les tests a enlever plus tard
    if(turnCounter%2==0){
        Redturn();
        redPlay();
    }
    if(turnCounter%2==1){
        Yellowturn();
        yellowPlay();
    }

    if(redScore.length==4 || yellowScore.length==4){
        if(redScore.length==4){vainqueur="ROUGES";}
        else{vainqueur="JAUNES";}
        gameOver();
        turnCounter=-1;
    }
}

game();

