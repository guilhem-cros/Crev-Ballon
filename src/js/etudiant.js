var listNotes;

class Etudiant {
    constructor(nom,prenom){
        this.nom = nom;
        this.prenom = prenom;
        this.listNotes = new Array();
    }

    noter(note){
        if (listNotes.length < 3){ 
            listNotes.push(note); //si l'eleve a moins de 3 note enregistrée : on ajoute note à la liste de note
        }
        else {
            listNotes.shift();
            listNotes.push(note); //sinon on retire la note la plus ancienne de la liste et on ajoute la nouvelle
        }
    }
}


module.exports = Etudiant