# Agilité---Squadro
Squadro est un jeu de société en 1 contre 1, les règles sont affichées dans rules.html

Langages et librairies utilisés pour réaliser ce projet:
HTML, CSS, JavaScript, nodejs, socket.io

Contributeurs au projet : 
Mike CHEN, Mounir LASSAL, Akaren LETCHUMIKANTHAN, Lucas MASTIER

Comment lancer l'application :

1. Lancer le serveur 
Pour cela il faut se placer dans le dossier server et effectuer l'une des commandes suivantes :

npx nodemon server.js
ou
node server

La première commande est préférable à la deuxième afin de relancer le serveur à chaque changement au script server.js.

Le serveur est par défaut en écoute sur le port 3000, il est possible de changer ce port, s'il est déjà occupé, par le port de votre choix
en changeant la variable serverPort dans server.js (dossier server).

Il faudra donc également changer le port de connexion du client via la variable clientPort dans index.js (dossier client).

Une fois que le serveur est lancé, le message "Serveur en écoute sur le port : 3000" devrait apparaitre dans la console.

2. Lancer localhost:3000 (ou autre port si changé) dans le navigateur

Si l'étape précédente s'est bien déroulée, il ne vous reste plus qu'à chercher dans votre navigateur : "localhost:3000".

Si tout se passe bien, vous arriverez sur le menu principal et un message "[id du client] est connecté" s'affichera sur la console.

Vous êtes fin prêt !

Bon jeu !


