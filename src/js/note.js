const Etudiant = require('../js/etudiant.js'); // <--- Classe Etudiant
const {ipcRenderer} = require("electron");
var fs = require("fs"); //<--- FileSystem commande
const { listenerCount } = require('process');
var data = fs.readFileSync('stockage/listeEtudiant.json'); //lecture du fichier de stockage et enregistrement des données dans data
var listEtudiant;
var idEleve;
var suivant = document.getElementById("nextBtn");
var note;
var superNote = document.getElementById("super");
var encouragementNote = document.getElementById("encouragement");
var lienmenu = document.getElementById("lienmenu");


superNote.addEventListener("click",function(event){
    note = 1;
    suivant.style.display = "block";
});

encouragementNote.addEventListener("click",function(event){
    note = 2;
    suivant.style.display = "block";
});

ipcRenderer.send("ask-id");

ipcRenderer.on("id",function(event,args){
    idEleve = args[0];
})

suivant.addEventListener("click",function(event){
    listEtudiant = JSON.parse(data);
    listEtudiant.sort(compare);
    if (listEtudiant[idEleve].listNotes.length < 3){
        listEtudiant[idEleve].listNotes.push(note);
    }
    else {
        listEtudiant[idEleve].listNotes.shift();
        listEtudiant[idEleve].listNotes.push(note);
    }
    data = JSON.stringify(listEtudiant);
    fs.writeFile('stockage/listeEtudiant.json',data, function (err) { 
        if (err) 
            return console.log(err);
        console.log('Ok');
    });

    if (note == 1){
        superNote.style.height = "500px";
        superNote.style.width = "auto";
        encouragementNote.style.display = "none";
    }
    else {
        encouragementNote.style.height = "500px";
        encouragementNote.style.width = "auto";
        superNote.style.display = "none"
    }
    lienmenu.style.display = "block";
    suivant.style.display = "none";
});


function compare(a, b) {
    const etudiantA = a.nom.toUpperCase();
    const etudiantB = b.nom.toUpperCase();
    return etudiantA.localeCompare(etudiantB);
  }



