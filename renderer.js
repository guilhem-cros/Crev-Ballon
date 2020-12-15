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

var listeImage = ['./media/balloon.png','./media/balloon (2).png','./media/balloon (3).png','./media/balloon (4).png','./media/balloon (5).png','./media/balloon (6).png'];
var tableauBallon = new Array();

const speed = canvas.width/350;
let nbBallon = 0;
let nbBallonMax = 6;
let jeuEnCours = false;
let click = false;
let largeurBallon = canvas.height/7;
let hauteurBallon = largeurBallon *1.25;
let isClicking = true;
let mx=0;
let my=0;
let sens =['1','-1'];




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
        

    }
    avance(){
        this.x = this.x+(this.pasx)*speed;
        this.y = this.y+(this.pasy)*speed;
    }
   
}




const render = () => {
    ctx.drawImage(bkg,0,0,canvas.width,canvas.height);   
    if (jeuEnCours){

        if(nbBallon<nbBallonMax){

            setTimeout(ajoutBallon,3000);
            nbBallon = nbBallon+1;
        }
        
        tableauBallon.forEach(element => {
            
            if(element['x']>(canvas.width-largeurBallon) | element['x']<0){
                element['pasx'] = element['pasx'] * (-1);
                
            }
            if(element['y']>(canvas.height-hauteurBallon)| element['y']<0){
                element['pasy'] = element['pasy'] * (-1);
            }

            

            
                if(element['x']<mx && mx<(element['x']+largeurBallon)){
                    if(element['y']<my && my<(element['y']+hauteurBallon)){
                        var pos = tableauBallon.indexOf(element);

                        disparitionBallon(pos);
                    }
                }


            //quand deux ballon se touche
            /*tableauBallon.forEach(element2 => {
                if (((element['x']-element2['x'])<largeurBallon/2)&&(element['y']-element2['y'])<hauteurBallon/2){
                    element['pasx']=element['pasx']*(-1);
                    element['pasx']=element['pasx']*(-1);
                }
        
            });
            */


            element.avance();
            ctx.drawImage(element['image'],element['x'],element['y'],largeurBallon,hauteurBallon);
            
            
        });
        
    }else{
        ctx.drawImage(bkg,0,0,canvas.width,canvas.height);
        ctx.strokeText('cliquez pour jouer',canvas.width/2,canvas.height/2);
        ctx.textAlign = 'center';
        ctx.font = "48px balqis";
    }
    window.requestAnimationFrame(render);
}
img.onload = render;

function contact(ball){
    tableauBallon.forEach(element => {
        if (((ball['x']-element['x'])<largeurBallon)&&(ball['y']-element['y'])<hauteurBallon){
            ball['pasX']=element['pasX']*(-1);
            ball['pasY']=element['pasY']*(-1);
        }

});
}

document.addEventListener('click',() => jeuEnCours = true);


/*

document.addEventListener("mousemove", logKey);

function logKey(e) {
    mx = e.clientX;
    my = e.clientY;
    
  }
 */ 


 

  
  
  

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

