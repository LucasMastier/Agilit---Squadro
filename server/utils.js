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