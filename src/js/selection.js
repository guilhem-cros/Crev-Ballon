var data = fs.readFileSync('./stockage/listeEtudiant.json'); //lecture du fichier de stockage et enregistrement des données dans data
console.log(data);
var listEtudiant;
var liste = document.getElementById("listEtudiant");
var idEleve;
var boutonJouer = document.getElementById("jouer");

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
actualiser();



boutonJouer.addEventListener("click",function(event){
    ipcRenderer.send("idEleve",idEleve);
    ipcRenderer.send("jouer");
})


document.getElementById('backBtn').addEventListener("click",function(){ //si appuie sur retour
   loadPage("home",true,"index");
});


function compare(a, b) {
    const etudiantA = a.nom.toUpperCase();
    const etudiantB = b.nom.toUpperCase();
    return etudiantA.localeCompare(etudiantB);
  }