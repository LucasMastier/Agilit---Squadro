var pr1 = document.getElementById('piece_red1');
var pr2 = document.getElementById('piece_red2');
var pr3 = document.getElementById('piece_red3');
var pr4 = document.getElementById('piece_red4');
var pr5 = document.getElementById('piece_red5');

var py1 = document.getElementById('piece_yellow1');
var py2 = document.getElementById('piece_yellow2');
var py3 = document.getElementById('piece_yellow3');
var py4 = document.getElementById('piece_yellow4');
var py5 = document.getElementById('piece_yellow5');

var t=0;
var l=0;
$(function()
{
    /* TEST POUR LE CHANGEMENT D IMAGE DE PIECE SUR LE RETOUR */
    $('#piece_red1').click(function(){
        if(t==0){
            t=75;
            $(this).animate({'top' : t+'px'}, {duration : 400});
            $(this).css({top:'auto'});
            return;
        }
        if(t==543){
            t+=77;
            $(this).animate({'top' : t+'px'}, {duration : 400});
            $(this).css({top:'auto'});
            pr1.style.backgroundPositionX="-33px";
        }
        if(t>=75 && t<543){
            t+=117;
            $(this).animate({'top' : t+'px'}, {duration : 400});
            $(this).css({top:'auto'});
        }
    });
    $('#piece_yellow1').click(function(){
        if(l==0){
            l=75;
            $(this).animate({'left' : l+'px'}, {duration : 400});
            $(this).css({left:'auto'});
            return;
        }
        if(l==543){
            l+=77;
            $(this).animate({'left' : l+'px'}, {duration : 400});
            $(this).css({left:'auto'});
            py1.style.backgroundPosition="112px 280px";
        }
        if(l>=75 && l<543){
            l+=117;
            $(this).animate({'left' : l+'px'}, {duration : 400});
            $(this).css({left:'auto'});
        }
    });
});


/* PIECES ROUGE
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
