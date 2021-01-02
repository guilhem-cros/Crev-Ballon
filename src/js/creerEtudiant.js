const Etudiant = require('../js/etudiant.js'); // <--- Classe Etudiant
var musique = new Audio('../../sons/musiqueMenu.mp3'); // https://www.youtube.com/watch?v=xN2TVpsIo34&list=WL&index=3
var son = true;
const {ipcRenderer} = require("electron"); //permet la communication entre processus
var fs = require("fs"); //<--- FileSystem commande
var data = fs.readFileSync('stockage/listeEtudiant.json');  //lecture du fichier de stockage et enregistrement de son contenu (chaine de caractere) dans data
var listEtudiant = JSON.parse(data); //traduction en js de data
var nom = document.getElementById("nom");
var prenom = document.getElementById("prenom");
var button = document.getElementById("creer");
var etudiant;



jouerMusiqueMenu();

function jouerMusiqueMenu(){ //gestion du son de l'appli
ipcRenderer.send('SON'); //envoie du message vers le main

ipcRenderer.on('SON-OFF',function(event){ // si reception de ce message (envoyé pas le main)
  console.log('OFFmenu');
  son = false;
  musique.pause();
});

ipcRenderer.on('SON-ON',function(event){ //si reception de ce message 
  console.log('ONmenu');
  son = true;
  musique.play();
});

    
ipcRenderer.send('ask-Musique');
ipcRenderer.on("musique",function(event,args){
    musique.currentTime = args;
});
}

button.addEventListener('click',function(event){
    if (nom.value.length >= 2 && prenom.value.length >= 2 && nom.value.length <=10 && prenom.value.length <=10){ //les noms et prenoms rentrés doivent faire entre 2 et 10 caractères
    etudiant = new Etudiant(nom.value,prenom.value);
    listEtudiant.push(etudiant);
    data = JSON.stringify(listEtudiant);
    fs.writeFile('stockage/listeEtudiant.json',data, function (err) { //ecriture de la nouvelle liste de joueur (avec le nouveau) dans le fichier de stockage s'il n'y a pas d'erreurs
        if (err) 
            return console.log(err);
        console.log('Ok');
    });
    ipcRenderer.send('Selectionner');
}
else {
    alert("Veuillez remplir les champs (entre 2 et 10 caractères pas champs)");
}
})

document.getElementById('backBtn').addEventListener("click",function(){ //si appuie sur retour
    if (son){
        ipcRenderer.send("SON-ON");
    }
    else{
        ipcRenderer.send("SON-OFF");
    }
    ipcRenderer.send("setMusique",musique.currentTime);
    ipcRenderer.send("retour-menu"); //envoie du message vers le main afin d'activer la fonction liée
});
