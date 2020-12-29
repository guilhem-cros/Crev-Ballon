const Etudiant = require('../js/etudiant.js'); // <--- Classe Etudiant
const {ipcRenderer} = require("electron");
var fs = require("fs"); //<--- FileSystem commande
var data = fs.readFileSync('stockage/listeEtudiant.json'); //lecture du fichier de stockage et enregistrement des données dans data
var listEtudiant = JSON.parse(data); //traduction des données en js (chaine de carac -> js)
var liste = document.getElementById("listEtudiant");
var chaine = "";
for(etudiant of listEtudiant){ //pour tous les joueurs enregistrés : on affiche leurs données
    chaine = chaine + "<div class=\"eleve\">" + etudiant.nom + " " + etudiant.prenom + " <div class=\"notes\">" + etudiant.listNotes +  "</div></div>";
}

liste.innerHTML = chaine;

document.getElementById('backBtn').addEventListener("click",function(){ //si appuie sur retour
    ipcRenderer.send("retour-menu"); //envoie du message vers le main afin d'activer la fonction liée
});