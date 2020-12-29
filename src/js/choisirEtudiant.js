const {ipcRenderer} = require("electron");

document.getElementById('backBtn').addEventListener("click",function(){ //si appuie sur le bouton retour -> retour au menu principal
    ipcRenderer.send("retour-menu"); //envoie d'un message vers le main (il  est reçu pas l'ipcMain)
});