// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering

// process.
const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var listeImage = ['../../media/balloon.png','../../media/balloon (2).png','../../media/balloon (3).png','../../media/balloon (4).png','../../media/balloon (5).png','../../media/balloon (6).png'];//https://pixabay.com/fr/vectors/ballon-couleur-anniversaire-2514738/
var menuPause = ['../../media/menu2.png','../../media/menu3.png','../../media/menu4.png'];
let indiceMenu = 0;
var CouleurActuel = 0;
var tableauBallon = new Array();
var speed = canvas.width/1000;
var speedMax = canvas.width/800;
let i = 0;
let nbBallon = 0;
let nbBallonMax = 7;
let jeuEnCours = true;
let boutonPause = new Image();
boutonPause.src = '../../media/boutonPause.png';
let boutonSon = new Image();
boutonSon.src = '../../media/soundOn.png';
let son = true;
let isClicking = true;
var musique = new Audio('../../sons/musiqueJeu.mp3'); // https://www.youtube.com/watch?v=n2oTA5JSk80&list=PLzCxunOM5WFLNCSF0UEHZqFJJlmdeL71S&index=5


//dimension des ballons à dessiner dans le canvas
var largeurBallon = (canvas.height+canvas.width)/12;
var hauteurBallon = largeurBallon *1.25;

let mx=0;//coordonne x du clic
let my=0;//coordonne y du clic

let sens =['1','-1'];

function finClick(){
    mx = 0;
    my = 0;
    isClicking = false;
  }

  //--------touch et mouse event-----------

document.addEventListener('touchstart', e => {
    isClicking = true;
    mx = e.touches[0].clientX;
    my = e.touches[0].clientY;
  });

document.addEventListener('touchend', e => {
    if (isClicking == true) {
        setTimeout(finClick,10);
    }
  });  

document.addEventListener('mousedown', e => {
    isClicking = true;
    mx = e.clientX;
    my = e.clientY;    
});

document.addEventListener('mouseup', e => {
    if (isClicking == true) {
      setTimeout(finClick,10);
    }
}); 
    ipcRenderer.send('SON');

    ipcRenderer.on('SON-ON',function(event){
        console.log("sonON");
        son = true; //le son passe en actif
        boutonSon.src = '../../media/soundOn.png';//l'icone devient l'icone de son actif
    });

    ipcRenderer.on('SON-OFF',function(event){
        console.log("sonOFF");
        son = false; //le son passe en non actif
        boutonSon.src = '../../media/soundOff.png'; //l'icone devient l'icone de son non-actif
    });

//------classe--------

/*
à chaque fois qu'un ballon est crée (sans paramêtres), une image de notre liste d'image ainsi que des coordonne et une direction lui sont attribué aléatoirement
Un ballon a des coordonnés où x correspond à l'absices et y correspond à l'ordonnés
l'attribut "pasy" correspond à un pas/deplacement vertical
l'attribut "pasx" correspond à un pas/deplacement horizontal
les attributs "click" et "sortie" permettent de connaître l'état du ballon (si il est sortie de l'écran ou cliquer par l'utilisateur)
*/

class ballon{
    constructor(){
        this.image = new Image();
        this.image.src = listeImage[getRandomInt(6)];
        this.x = getRandomInt(canvas.width-largeurBallon);
        this.y = canvas.height*(1+Math.random()/2);        
        do {
            this.pasy = Math.random();
            this.pasx = Math.random();
          } while (this.pasy<0.75||this.pasx<0.4);
        this.pasx = this.pasx * sens[getRandomInt(2)];
        this.pasy = this.pasy * sens[1];
        this.click = false;
        this.sortie = false;
    }



    update(){
        this.avance();
        this.setDirection();
        this.setSortie();
        this.eclaterBallon();
    }

    setDirection(){
        this.rebondMur();
        this.rebondBallon();
    }

    rebondMur(){
        if(this.x>(canvas.width-largeurBallon) || this.x<0){
            this.pasx = this.pasx * (-1);       
        }
    }

    rebondBallon(){
        var recopieTableau = tableauBallon.slice();
        recopieTableau.forEach(element2 => {
        if(element2!=this){
            if (difference(this.x,element2['x'])<largeurBallon/1.5){
                if(difference(this.y,element2['y'])<hauteurBallon/1.5){
                    if(element2['x']<this.x){
                            this.pasx = Math.abs(this.pasx)+ 0,1;
                               
                    }else{
                            this.pasx = Math.abs(this.pasx) * (-1) -0,1;
                        }                                                                                                               
                    }
                }
            }         
        });
    }
    setSortie(){
        if(this.y<(-hauteurBallon)){
            this.sortie = true;
        }
    }
    eclaterBallon(){
         if(this.x<mx && mx<(this.x+largeurBallon)){
            if(this.y<my && my<(this.y+hauteurBallon)){
                this.click = true;
                var bruitageBallon = new Audio('../../sons/eclatementBallon.wav');
                if(son){
                    bruitageBallon.play();
                }
            }
        }
    }

    avance(){
        this.x = this.x+(this.pasx)*speed;
        this.y = this.y+(this.pasy)*speed;
    }


}

//-----function et méthode-------

function enCours(boolean){
    //si bouton pause est cliqué
    if(canvas.width*0.92<mx && mx<canvas.width){ //le placement en largeur du "bouton" pause par rapport au canva
        if(my<canvas.width*0.07){ //le placement en hauteur de ce meme bouton
            return false;
        }
    }
    if(canvas.width/3<mx && mx<(canvas.width*2)/3){ //le placement en largeur du 'bouton' reprendre par rapport au canva
        if(canvas.height/4<my && my<(canvas.height/4+canvas.width/12)){ //le placement en hauteur de ce meme bouton
            return true;
        }
    }
    return boolean;
}

function actionMenue(){
    var menu = new Image();
    menu.src = menuPause[indiceMenu];
    ctx.drawImage(menu,canvas.width/3,canvas.height/4,canvas.width/3,canvas.width/3);
    if(canvas.width/3<mx && mx<(canvas.width*2)/3){
        if((canvas.height/4+canvas.width/12)<my && my<(canvas.height/4+canvas.width/6)){
            my=0;
            mx=0;
            changementIndice();
            setDifficulte();
        }
    }
    if(canvas.width/3<mx && mx<(canvas.width*2)/3){
        if((canvas.height/4+canvas.width/6)<my && my<(canvas.height/4+canvas.width/4)){
            if (son){
                ipcRenderer.send('SON-ON');
            }
            else {
                ipcRenderer.send('SON-OFF');
            }
            //envoie des informations pas rapport au son vers le main, afin de prendre en compte les changements dans le reste de l'appli
            document.location.href="../../index.html";
        }
    }
    if(canvas.width/3<mx && mx<(canvas.width*2)/3){
        if((canvas.height/4+canvas.width/4)<my && my<(canvas.height/4+canvas.width/3)){
            ipcRenderer.send("note");
            //document.location.href="./note.html";
            if (son){
                ipcRenderer.send('SON-ON');
            }
            else {
                ipcRenderer.send('SON-OFF');
            } 
            //envoie des informations pas rapport au son vers le main, afin de prendre en compte les changements dans le reste de l'appli
        }
    }
}

function changementIndice(){
    if (indiceMenu==2){
        indiceMenu=0;
    }else{
        indiceMenu=indiceMenu+1;
    }
}

function setDifficulte(){
    if (indiceMenu==0){
        speed = canvas.width/1000;
        speedMax = canvas.width/800;
        largeurBallon = (canvas.height+canvas.width)/12;
        hauteurBallon = largeurBallon *1.25;    
    }else if (indiceMenu==1){
        speed = canvas.width/800;
        speedMax = canvas.width/600;
         largeurBallon = (canvas.height+canvas.width)/14;
         hauteurBallon = largeurBallon *1.25;
    }else{
        speed = canvas.width/600;
        speedMax = canvas.width/400;
         largeurBallon = (canvas.height+canvas.width)/16;
         hauteurBallon = largeurBallon *1.25;
    }

}

function ajoutBallon(){
    var ball = new ballon();
    tableauBallon.push(ball);
}

function disparitionBallon(pos){
    tableauBallon.splice(pos,1);
    nbBallon=nbBallon-1;
}
  
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function difference(a,b){
    return Math.abs(a - b);
}

function setBackground(){
    ctx.fillStyle = "#00a3d8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setSound(){
    //si on clique sur l'icone son
    if(canvas.width*0.85<mx && mx<canvas.width*0.92){ //le placement en largeur de l'icone son sur le canva
        if(my<canvas.width*0.07){ //le placement en hauteur dde ce meme bouton
            if(son){ //si son actif
                son = false; //le son passe en non actif
                boutonSon.src = '../../media/soundOff.png'; //l'icone devient l'icone de son non-actif
            }
            else{ //sinon (son innactif)
                son = true; //le son passe en actif
                boutonSon.src = '../../media/soundOn.png';//l'icone devient l'icone de son actif
            }
        }
    }
    ctx.drawImage(boutonSon, canvas.width*0.85,canvas.width*0.001,canvas.width*0.068,canvas.width*0.068); //on affiche l'icone correspondant sur le canve
}


   //Quand la musique est terminée, elle se relance
    musique.addEventListener('ended',function(){
        musique.play();
    })


function jouerMusiqueJeu(){
    if (son){
        musique.play();
    }
    else {
        musique.pause();
    }
}


//------rendu visuelle-è------

const render = () => {
    jouerMusiqueJeu();
    setBackground();
        if (speed<speedMax){
            speed =speed*1.0001;
        }
        if(nbBallon<nbBallonMax){
            ajoutBallon();
            nbBallon = nbBallon+1;
        } 
        tableauBallon.forEach(element => {
            ctx.drawImage(element['image'],element['x'],element['y'],largeurBallon,hauteurBallon);
            if (element['click']==true||element['sortie']==true){
                var pos = tableauBallon.indexOf(element);
                disparitionBallon(pos);
            }  
            jeuEnCours = enCours(jeuEnCours);

            if (jeuEnCours){
                element.update();
                setSound();
                ctx.drawImage(boutonPause,canvas.width*0.92,0,canvas.width*0.08,canvas.width*0.07);   
            }else{             
                actionMenue();               
            }
            
        });
        
    window.requestAnimationFrame(render);
}
window.onload = render;


