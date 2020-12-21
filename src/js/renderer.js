
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




//<a href='https://fr.freepik.com/vecteurs/fond'>Fond vecteur créé par articular - fr.freepik.com</a>
var listeImage = ['../../media/balloon.png','../../media/balloon (2).png','../../media/balloon (3).png','../../media/balloon (4).png','../../media/balloon (5).png','../../media/balloon (6).png'];//https://pixabay.com/fr/vectors/ballon-couleur-anniversaire-2514738/

var CouleurActuel = 0;
var tableauBallon = new Array();

var speed = canvas.width/600;
const speedMax = canvas.width/550;
let i = 0;
let nbBallon = 0;
let nbBallonMax = 7;
let jeuEnCours = false;
let isClicking = true;


//dimension des ballons à dessiner dans le canvas
let largeurBallon = (canvas.height+canvas.width)/17;
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
    avance(){
        //prochaine coordonne
        this.x = this.x+(this.pasx)*speed;
        this.y = this.y+(this.pasy)*speed;
        //si la prochaine coordonne depasse le canva, alors changement de direction
        if(this.x>(canvas.width-largeurBallon) || this.x<0){
            this.pasx = this.pasx * (-1);       
        }
        if(this.y<(-hauteurBallon)){
            this.sortie = true;
        }

        //cas ou le ballon est cliqué
        if(this.x<mx && mx<(this.x+largeurBallon)){
            if(this.y<my && my<(this.y+hauteurBallon)){
                this.click = true;
            }
        }
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

function setBackground(){
    if (speed<speedMax){
        ctx.fillStyle = "#00a3d8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }else{  
        i=i+1;
        var gradient = ctx.createLinearGradient(0,i,0,0);
        gradient.addColorStop(0,"#00a3d8");
        gradient.addColorStop(0.30,"#7c80b0");
        gradient.addColorStop(0.4,"#00090c");
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);
                     
    }        
}

document.addEventListener('click',() => jeuEnCours = true);

const render = () => {
    setBackground();
     
    if (jeuEnCours){
        if (speed<speedMax){
            speed =speed*1.0001;
        }
        if(nbBallon<nbBallonMax){
            ajoutBallon();
            nbBallon = nbBallon+1;
        } 
        tableauBallon.forEach(element => {
            if (element['click']==true||element['sortie']==true){
                var pos = tableauBallon.indexOf(element);
                disparitionBallon(pos);
            }  
            element.avance();
            ctx.drawImage(element['image'],element['x'],element['y'],largeurBallon,hauteurBallon); 
        });
        

    }else{
        ctx.fillStyle = "#00a3d8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeText('Cliquer pour jouer',canvas.width/2,canvas.height/2);
        ctx.textAlign = 'center';
        ctx.font = "48px arial";
    }
    window.requestAnimationFrame(render);
}
window.onload = render;


