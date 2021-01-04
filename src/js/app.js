const Etudiant = require('./src/js/etudiant.js'); // <--- Classe Etudiant
const {BrowserWindow, ipcRenderer} = require('electron');
var app = document.getElementById('app');

var fs = require("fs"); //<--- FileSystem commande

const musique = new Audio('./sons/musiqueMenu.mp3'); // https://www.youtube.com/watch?v=xN2TVpsIo34&list=WL&index=3
var son = true;

function jouerMusiqueMenu(){ //gestion du son de l'appli
    ipcRenderer.send('SON'); //envoie du message vers le main

    ipcRenderer.on('SON-OFF',function(event){ // si reception de ce message (envoyé par le main)
        console.log('OFFmenu');
        son = false;
        musique.pause();
    });

    ipcRenderer.on('SON-ON',function(event){ //si reception de ce message 
        console.log('ONmenu');
        son = true;
        musique.play();
    });

    ipcRenderer.send('ask-Musique');
    ipcRenderer.on("musique",function(event,args){
        musique.currentTime = args;
    });

    //Quand la musique est terminée, elle se relance
    musique.addEventListener('ended',function(){
        musique.play();
    });
}


function loadPage(page, jsLoad = false, cssLoad = false) {
    var jsFile = (typeof jsLoad === 'string') ? jsLoad : page;
    var cssFile = (typeof cssLoad === 'string') ? cssLoad : page;

    fetch('./src/html/' + page + '.html')
    .then(data => data.text())
    .then(html => app.innerHTML = html)
    .then(function() {
        if (jsLoad){
            var pageScript = document.createElement("script");
            pageScript.setAttribute("type","text/javascript");
            pageScript.setAttribute("src", './src/js/' + jsFile + '.js');
            app.appendChild(pageScript);
        }
        if (cssLoad){
            var pageStyle = document.createElement("link");
            pageStyle.setAttribute("rel", "stylesheet");
            pageStyle.setAttribute("type", "text/css");
            pageStyle.setAttribute("href", './src/css/' + cssFile + '.css');
            app.appendChild(pageStyle);
        }
    });
}


loadPage('home', true, 'index');

jouerMusiqueMenu();