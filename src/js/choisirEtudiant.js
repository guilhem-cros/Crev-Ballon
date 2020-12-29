const {ipcRenderer} = require("electron");

document.getElementById('backBtn').addEventListener("click",function(){
    ipcRenderer.send("retour-menu");
});