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
  });