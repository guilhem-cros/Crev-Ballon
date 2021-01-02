const Etudiant = require('../js/etudiant.js'); // <--- Classe Etudiant
var musique = new Audio('../../sons/musiqueMenu.mp3'); // https://www.youtube.com/watch?v=xN2TVpsIo34&list=WL&index=3
var son = true;
const {ipcRenderer} = require("electron");
var fs = require("fs"); //<--- FileSystem commande
var data = fs.readFileSync('stockage/listeEtudiant.json'); //lecture du fichier de stockage et enregistrement des données dans data
var listEtudiant;
var liste = document.getElementById("listEtudiant");
var idEleve;
var boutonJouer = document.getElementById("jouer");



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

actualiser();
function actualiser(){
    var chaine = "";
    listEtudiant = JSON.parse(data); //traduction des données en js (chaine de carac -> js)
    listEtudiant.sort(compare);
    var i = 0;
    for(etudiant of listEtudiant){ //pour tous les joueurs enregistrés : on affiche leurs données
        chaine = chaine + "<div class=\"eleve\" id=\"" + i + "\">" + etudiant.nom + " " + etudiant.prenom + " <div class=\"notes\">";
        for(note in etudiant.listNotes){
            chaine = chaine +  "<img src=\"../../media/note" + etudiant.listNotes[note] + ".png\" height=\"40px\" width=\"40px\"></img>";
        }
        chaine = chaine + "</div>" + "</div>";
        i++;
    }

    liste.innerHTML = chaine;

    document.querySelectorAll('.eleve').forEach(eleve => { // <--- pour afficher la selection du joueur
        eleve.addEventListener('click', event => {
                boutonJouer.style.display = "block";
                eleve.style.backgroundColor = "red";
                idEleve = eleve.id;
                document.querySelectorAll('.eleve').forEach(eleveautre => {
                    if (eleve != eleveautre){
                    eleveautre.style.backgroundColor = "orange";
                }
                });
            });
        });
   
}

document.getElementById("creerBtn").addEventListener("click",function(event){
    if (son){
        ipcRenderer.send("SON-ON");
    }
    else{
        ipcRenderer.send("SON-OFF");
    }
    ipcRenderer.send("setMusique",musique.currentTime);
})

boutonJouer.addEventListener("click",function(event){
    if (son){
        ipcRenderer.send("SON-ON");
    }
    else{
        ipcRenderer.send("SON-OFF");
    }
    ipcRenderer.send("setMusique",musique.currentTime);
    ipcRenderer.send("idEleve",idEleve);
    ipcRenderer.send("jouer");
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


function compare(a, b) {
    const etudiantA = a.nom.toUpperCase();
    const etudiantB = b.nom.toUpperCase();
    return etudiantA.localeCompare(etudiantB);
  }