/*
PIECES ROUGE
0-75-192-309-426-543-620 valeurs de top 
+75 puis +117 et le dernier +77 pour les déplacements
=========
background position :
    - aller -93px -206px
    - retour -33px -206px

PIECES JAUNE
0-75-192-309-426-543-620 valeurs de left
+75 puis +117 et le dernier +77 pour les déplacements
=========
background position :
    - aller 111px 208px;
    - retour 112px 280px;
*/
// Variable globale
var valuePositions=[0,75,192,309,426,543,620];
var redScore=[];
var yellowScore=[];
var turnCounter=-1;

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


// Fonction 
function elementShown(id, text){
    /*  fonction intermediaire qui permet de changer le texte d'un id */
    let elem=document.getElementById(id);
    elem.innerHTML=text;
}

function Redturn(t){
    /*  Indique que c'est au tour des rouges et met à jour 
        le plateau pour que seules les pieces rouges puissent bouger
    */
    let turn=`C'est au tour des rouges !`;
    elementShown("entete",turn);

}

function Yellowturn(t){
    /*  Indique que c'est au tour des jaunes et met à jour 
        le plateau pour que seules les pieces jaunes puissent bouger
    */
    let turn=`C'est au tour des jaunes !`;
    elementShown("entete",turn);
}

function gameOver(){
    /*  Indique la fin de partie */
    elementShown("entete",'Partie terminée !');

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
            elementShown("red",redScore.length + "/4");
        }
    }
    if(p.getColor()=="yellow" && p.isOnWayback() && p.getPos()==0){
        yellowScore.forEach(function(item){
            if(item.getNum()==p.getNum())
                bool=0;
        })
        if(bool)
            yellowScore.push(p);
            elementShown("yellow",yellowScore.length + "/4");
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
        setTimeout(function(){p.getElement().style.opacity = "0.3";},400);
    }
}

function movePieces(p){
    /*  permet le mouvement des pieces */
    let pm=p.getPt_mvt();
    p.getElement().onclick=function(){
        while(pm>0){
            if(p.getPos()==5 && pm>0 && !p.isOnWayback()){
                returnPieces(p);
                break;
            }
            if(p.getPos()>=0 && pm>0){
                if(p.isOnWayback()){
                    if(p.getPos()==0){
                        break;
                    }
                    p.setPos(p.getPos()-1);
                }else{
                    p.setPos(p.getPos()+1);
                }
                pm--;
            }
        }
        animatePieces(p);
        changeTurn(p);
        redUpdate();
        yellowUpdate();
        game();
    }
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

// Deroulement du jeu (main)
function game(){
    if(turnCounter==-1){
        initializeBoard();
    }
    if(turnCounter%2==0){
        Redturn();
        redPlay();
    }
    if(turnCounter%2==1){
        Yellowturn();
        yellowPlay();
    }

    if(redScore.length==4 || yellowScore.length==4){
        gameOver();
        turnCounter=-1;
    }
}

game();
