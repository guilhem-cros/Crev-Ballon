// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = './media/balloon (6).png'; //https://pixabay.com/fr/vectors/ballon-couleur-anniversaire-2514738/

const bkg = new Image();
bkg.src = './media/background.jpg'; //https://pxhere.com/fr/photo/1416279

var listeImage = ['./media/balloon.png','./media/balloon (2).png','./media/balloon (3).png','./media/balloon (4).png','./media/balloon (5).png','./media/balloon (6).png'];//https://pixabay.com/fr/vectors/ballon-couleur-anniversaire-2514738/
var tableauBallon = new Array();

const speed = canvas.width/300;
let nbBallon = 0;
let nbBallonMax = 6;
let jeuEnCours = false;
let isClicking = true;

//dimension des ballons à dessiner dans le canvas
let largeurBallon = canvas.height/8;
let hauteurBallon = largeurBallon *1.25;

let mx=0;//coordonne x du clic
let my=0;//coordonne y du clic

let sens =['1','-1'];


/*
à chaque fois qu'un ballon est crée (sans paramêtres), une image de notre liste d'image ainsi que des coordonne et une direction lui sont attribué aléatoirement.
*/

class ballon{
    constructor(){
        this.image = new Image();
        this.image.src = listeImage[getRandomInt(6)];
        this.x = getRandomInt(canvas.width-largeurBallon);
        this.y = getRandomInt(canvas.height-hauteurBallon);      
        do {
            this.pasx = Math.random();
            this.pasy = Math.random();
          } while (this.pasx==0||this.pasy==0||(this.pasx+this.pasy)<1);
        this.pasx = this.pasx * sens[getRandomInt(2)];
        this.pasy = this.pasy * sens[getRandomInt(2)];
        this.click = false;
    }
    avance(){
        //prochaine coordonne
        this.x = this.x+(this.pasx)*speed;
        this.y = this.y+(this.pasy)*speed;

        //si la prochaine coordonne depasse le canva, alors changement de direction
        if(this.x>(canvas.width-largeurBallon) || this.x<0){
            this.pasx = this.pasx * (-1);       
        }
        if(this.y>(canvas.height-hauteurBallon)|| this.y<0){
            this.pasy = this.pasy * (-1);
        }

        //cas ou le ballon est cliqué
        if(this.x<mx && mx<(this.x+largeurBallon)){
            if(this.y<my && my<(this.y+hauteurBallon)){
                this.click = true;
            }
        }
    }
     
}

document.addEventListener('mousedown', e => {
    isClicking = true;
    mx = e.clientX;
    my = e.clientY;
});
  
document.addEventListener('mouseup', e => {
    if (isClicking === true) {
      setTimeout(finClick,10);
    }
});  

document.addEventListener('click',() => jeuEnCours = true);

function finClick(){
    mx = 0;
    my = 0;
    isClicking = false;
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

const render = () => {
    ctx.drawImage(bkg,0,0,canvas.width,canvas.height);   
    if (jeuEnCours){
        if(nbBallon<nbBallonMax){
            setTimeout(ajoutBallon,3000);
            nbBallon = nbBallon+1;
        } 
        tableauBallon.forEach(element => {
            if (element['click']==true){
                var pos = tableauBallon.indexOf(element);
                disparitionBallon(pos);
            }
            
            element.avance();
            ctx.drawImage(element['image'],element['x'],element['y'],largeurBallon,hauteurBallon);           
        });
        

    }else{
        ctx.drawImage(bkg,0,0,canvas.width,canvas.height);
        ctx.strokeText('Cliquer pour jouer',canvas.width/2,canvas.height/2);
        ctx.textAlign = 'center';
        ctx.font = "48px arial";
    }
    window.requestAnimationFrame(render);
}
img.onload = render;










 

  
  
  

  

