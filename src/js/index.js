  const {BrowserWindow, ipcRenderer} = require('electron')
  var musique = new Audio('./sons/musiqueMenu.mp3'); // https://www.youtube.com/watch?v=xN2TVpsIo34&list=WL&index=3
  var son = true;

  	//quitter l'appli
  	document.getElementById("quitBtn").addEventListener("click",function(){
      ipcRenderer.send("quit");
  });

  jouerMusiqueMenu();

  function jouerMusiqueMenu(){ //gestion du son de l'appli
  ipcRenderer.send('SON'); //envoie du message vers le main
  
  ipcRenderer.on('SON-OFF',function(event){ // si reception de ce message (envoyé pas le main)
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
  }

  document.getElementById("statistiqueBtn").addEventListener("click",function(event){
    if (son){
      ipcRenderer.send("SON-ON");
  }
  else{
      ipcRenderer.send("SON-OFF");
  }
    ipcRenderer.send("setMusique",musique.currentTime);
  });

  document.getElementById("newGame").addEventListener("click",function(event){
    if (son){
      ipcRenderer.send("SON-ON");
  }
  else{
      ipcRenderer.send("SON-OFF");
  }
    ipcRenderer.send("setMusique",musique.currentTime);
  });

  document.getElementById('creditBtn').addEventListener("click",function(){ //si appuie sur le bouton crédits
    document.getElementById("theHead").style.display = "none";
    document.getElementById("creditBtn").style.display = "none";
    document.getElementById("statistiqueBtn").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("credits").style.display = "block";
    document.getElementById("optionBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "block";
    document.getElementById("quitBtn").style.display = "none";
  });

   document.getElementById('optionBtn').addEventListener("click",function(){ //si appuie sur le bouton "Options"
      document.getElementById("theHead").style.display = "none";
      document.getElementById("creditBtn").style.display = "none";
      document.getElementById("statistiqueBtn").style.display = "none";
      document.getElementById("newGame").style.display = "none";
      document.getElementById("optionBtn").style.display = "none";
      document.getElementById("backBtn").style.display = "block";
      document.getElementById("quitBtn").style.display = "block";
      document.getElementById("musicBtn").style.display = "block";
    });
    
    document.getElementById('backBtn').addEventListener("click",function(){ //si appuie sur le bouton "Retour"
      document.getElementById("backBtn").style.display = "none";
      document.getElementById("credits").style.display = "none";
      document.getElementById("theHead").style.display = "block";
      document.getElementById("newGame").style.display = "block";
      document.getElementById("statistiqueBtn").style.display = "block";
      document.getElementById("creditBtn").style.display = "block";
      document.getElementById("optionBtn").style.display = "block";
      document.getElementById("quitBtn").style.display = "block";
      document.getElementById("musicBtn").style.display = "none";
  });

    //Enlever ou remettre la musique  
    document.getElementById("musicBtn").addEventListener("click",function(){
      if (son){
        musique.pause();
        ipcRenderer.send('SON-OFF');
      }
      else {
        musique.play();
        ipcRenderer.send('SON-ON');
      }
      son = !son;
      console.log(musique.currentTime);
    });

    //Quand la musique est terminée, elle se relance
    musique.addEventListener('ended',function(){
      musique.play();
    });
