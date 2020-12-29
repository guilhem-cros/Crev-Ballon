var listNotes;

class Etudiant {
    constructor(nom,prenom){
        this.nom = nom;
        this.prenom = prenom;
        this.listNotes = new Array();
    }

    noter(note){
        if (listNotes.length < 3){
            listNotes.push(note);
        }
        else {
            listNotes.shift();
            listNotes.push(note);
        }
    }

    getNom(){
        return this.nom;
    }

    getPrenom(){
        return this.Prenom;
    }

    getListeNotes(){
        return this.listeNotes;
    }
}


module.exports = Etudiant