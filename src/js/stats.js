const Etudiant = require('../js/etudiant.js'); // <--- Classe Etudiant
const {ipcRenderer} = require("electron");
var fs = require("fs"); //<--- FileSystem commande
var data = fs.readFileSync('stockage/listeEtudiant.json'); 
var listEtudiant = JSON.parse(data);
var liste = document.getElementById("listEtudiant");
var chaine = "";
for(etudiant of listEtudiant){
    chaine = chaine + "<li>" + etudiant.nom + " " + etudiant.prenom + " " + etudiant.listNotes +  "</li>";
}

liste.innerHTML = chaine;

document.getElementById('backBtn').addEventListener("click",function(){
    ipcRenderer.send("retour-menu");
});