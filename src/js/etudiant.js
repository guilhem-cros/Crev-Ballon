var listNotes;

class Etudiant {
    constructor(nom,prenom){
        this.nom = nom;
        this.prenom = prenom;
        this.listNotes = new Array();
    }
}


module.exports = Etudiant