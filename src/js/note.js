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
var cons = document.getElementById("consignes");
var superLeg = document.getElementById("sup");
var encouragementLeg = document.getElementById("enc");
var lienmenu = document.getElementById("lienmenu");
var finalPic = document.getElementById("imageFinale");
var titre = document.getElementById("title");
var body = document.getElementById("note");



superNote.addEventListener("click",function(event){
    note = 1;
    suivant.style.display = "block";
    superNote.style.backgroundColor = "#001AE3";
    encouragementNote.style.backgroundColor="#54A7FD";
});

encouragementNote.addEventListener("click",function(event){
    note = 2;
    suivant.style.display = "block";
    encouragementNote.style.backgroundColor="#001AE3";
    superNote.style.backgroundColor="#54A7FD";
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
        finalPic.setAttribute("src","../../media/felicitation.png");
        
    }
    else {
        finalPic.setAttribute("src","../../media/encouragement.png");
    }
    finalPic.style.display="block";
    body.style.margin = "0";
    superNote.style.display = "none";
    encouragementNote.style.display = "none";
    cons.style.display="none";
    superLeg.style.display="none";
    encouragementLeg.style.display="none";
    lienmenu.style.display = "block";
    suivant.style.display = "none";
    titre.style.display="none";
});




function compare(a, b) {
    const etudiantA = a.nom.toUpperCase();
    const etudiantB = b.nom.toUpperCase();
    return etudiantA.localeCompare(etudiantB);
  }



