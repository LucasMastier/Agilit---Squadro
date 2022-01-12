var list_game=["1234","azer"];

function popupJoin(){
    document.getElementById("join_container").style.display="flex";
    document.getElementById("popup_submit").addEventListener('click',verify_code);
}
function popupCreate(){
    var code=makeid();
    
}
function makeid() {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 4; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
//console.log(makeid());
function verify_code(){
    let finded=false;
    list_game.forEach(element => {
        if(element==document.getElementById("code").value){
            //l'envoyer sur la partie correspondante
            console.log(document.getElementById("code").value);
            finded=true;
        }
    });
    if(!finded)
        document.getElementById("erreur_code").style.visibility="visible";
}