const Etudiant = require('../js/etudiant.js'); // <--- Classe Etudiant
const {ipcRenderer} = require("electron");
var fs = require("fs"); //<--- FileSystem commande
var data = fs.readFileSync('stockage/listeEtudiant.json'); 
var listEtudiant = JSON.parse(data);
var nom = document.getElementById("nom");
var prenom = document.getElementById("prenom");
var button = document.getElementById("creer");
var etudiant;


button.addEventListener('click',function(event){
    if (nom.value.length >= 2 && prenom.value.length >= 2 && nom.value.length <=10 && prenom.value.length <=10){
    etudiant = new Etudiant(nom.value,prenom.value);
    listEtudiant.push(etudiant);
    data = JSON.stringify(listEtudiant);
    fs.writeFile('stockage/listeEtudiant.json',data, function (err) {
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

document.getElementById('backBtn').addEventListener("click",function(){
    ipcRenderer.send("Selectionner");
});
