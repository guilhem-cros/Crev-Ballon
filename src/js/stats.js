const Etudiant = require('../js/etudiant.js'); // <--- Classe Etudiant
var musique = new Audio('../../sons/musiqueMenu.mp3'); // https://www.youtube.com/watch?v=xN2TVpsIo34&list=WL&index=3
const {ipcRenderer} = require("electron");
var fs = require("fs"); //<--- FileSystem commande
var data = fs.readFileSync('stockage/listeEtudiant.json'); //lecture du fichier de stockage et enregistrement des données dans data
var listEtudiant;
var liste = document.getElementById("listEtudiant");
var idEleve;
var son = true;
var boutonSupp = document.getElementById("supprimer");
var boutonSuppAll = document.getElementById("supprimerAll");
var ouiBtn = document.getElementById("oui");
var annulerBtn = document.getElementById("annuler");
var sectionReponse = document.getElementById("rep");



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
            chaine = chaine +  "<img src=\"../../media/note" + etudiant.listNotes[note] + ".png\" height=\"50px\" width=\"50px\"></img>";
        }
        chaine = chaine + "</div>" + "</div>";
        i++;
    }

    liste.innerHTML = chaine;

    document.querySelectorAll('.eleve').forEach(eleve => { // <--- pour afficher la selection du joueur
        eleve.addEventListener('click', event => {
                boutonSupp.style.display = "block";
                eleve.style.backgroundColor = "red";
                idEleve = eleve.id;
                document.querySelectorAll('.eleve').forEach(eleveautre => {
                    if (eleve != eleveautre){
                    eleveautre.style.backgroundColor = "orange";
                }
                });
            });
        });


    if(listEtudiant.length == 0){ // <--- Ne pas afficher le bouton supprimerAll si il n'y a pas de joueur dans la BDD
        boutonSuppAll.style.display = "none";
    }

        


}




        //supprimer eleve
boutonSupp.addEventListener("click",function(event){
    listEtudiant.splice(idEleve, 1);
    data = JSON.stringify(listEtudiant);
    fs.writeFile('stockage/listeEtudiant.json',data, function (err) { 
    if (err) 
        return console.log(err);
    console.log('Ok');
});
    actualiser();
        boutonSupp.style.display = "none";
})

    //supprimer tous les eleves
boutonSuppAll.addEventListener("click",function(event){
    boutonSuppAll.style.display = "none";
    sectionReponse.style.display = "block";

    ouiBtn.addEventListener("click",function(event){
        listEtudiant = [];
        data = JSON.stringify(listEtudiant);
        fs.writeFile('stockage/listeEtudiant.json',data, function (err) { 
        if (err) 
            return console.log(err);
        console.log('Ok');
    });
        actualiser();
        boutonSuppAll.style.display = "none";
        sectionReponse.style.display = "none";
    });

    annulerBtn.addEventListener("click",function(event){
        boutonSuppAll.style.display = "block";
        sectionReponse.style.display = "none";
    });


    });

    document.getElementById('backBtn').addEventListener("click",function(){ //si appuie sur retour
        if (son){
            ipcRenderer.send("SON-ON");
        }
        else{
            ipcRenderer.send("SON-OFF");
        }
        ipcRenderer.send("retour-menu"); //envoie du message vers le main afin d'activer la fonction liée
    });


function compare(a, b) {
    const etudiantA = a.nom.toUpperCase();
    const etudiantB = b.nom.toUpperCase();
    return etudiantA.localeCompare(etudiantB);
  }