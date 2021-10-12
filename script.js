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

var valuePositions=[0,75,192,309,426,543,620];
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
        }
        if(this.pt_mvt==3){
            this.pt_mvt=1;
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
function movePieces(p){
    let pm=p.getPt_mvt();
    p.getElement().onclick=function(){
        while(pm>0){
            if(p.getPos()==5 && pm>0 && !p.isOnWayback()){
                p.setPos(6);
                p.onWayback();
                if(p.getColor()=='red'){
                    p.getElement().style.backgroundPositionX="-33px";
                }
                if(p.getColor()=='yellow'){
                    p.getElement().style.backgroundPosition="112px 280px";
                }
                break;
            }
            if(p.getPos()>=0 && pm>0){
                if(p.isOnWayback()){
                    p.setPos(p.getPos()-1);
                }else{
                    p.setPos(p.getPos()+1);
                }
                pm--;
            }
        }
        if(p.getColor()=='red'){
            $(p.getElement()).animate({'top' : p.getValuePos()+'px'}, {duration : 400});
            $(p.getElement()).css({top:'auto'});
        }
        if(p.getColor()=='yellow'){
            $(p.getElement()).animate({'left' : p.getValuePos()+'px'}, {duration : 400});
            $(p.getElement()).css({left:'auto'}); 
        }
        game();
    }
}

// Deroulement du jeu (main)
function game(){
    movePieces(red1);
    movePieces(red2);
    movePieces(red3);
    movePieces(red4);
    movePieces(red5);

    movePieces(yellow1);
    movePieces(yellow2);
    movePieces(yellow3);
    movePieces(yellow4);
    movePieces(yellow5);
}
game();

