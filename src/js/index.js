	const electron = require("electron");
  const ipcRenderer = electron.ipcRenderer;
  var musique = new Audio('./sons/musiqueMenu.mp3'); // https://www.youtube.com/watch?v=-pIC6z654ho

  	//quitter l'appli
  	document.getElementById("quitBtn").addEventListener("click",function(){
      ipcRenderer.send("quit");
	});
     //jouer musique
    musique.play();

  document.getElementById('creditBtn').addEventListener("click",function(){
    document.getElementById("theHead").style.display = "none";
    document.getElementById("creditBtn").style.display = "none";
    document.getElementById("statistiqueBtn").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("credits").style.display = "block";
    document.getElementById("optionBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "block";
    document.getElementById("quitBtn").style.display = "none";
  });
  

  document.getElementById('statistiqueBtn').addEventListener("click",function(){
    document.getElementById("theHead").style.display = "none";
     document.getElementById("creditBtn").style.display = "none";
     document.getElementById("statistiqueBtn").style.display = "none";
     document.getElementById("newGame").style.display = "none";
     document.getElementById("optionBtn").style.display = "none";
     document.getElementById("backBtn").style.display = "block";
     document.getElementById("quitBtn").style.display = "none";
     document.getElementById("musicBtn").style.display = "none";
   });

   document.getElementById('optionBtn').addEventListener("click",function(){
      document.getElementById("theHead").style.display = "none";
      document.getElementById("creditBtn").style.display = "none";
      document.getElementById("statistiqueBtn").style.display = "none";
      document.getElementById("newGame").style.display = "none";
      document.getElementById("optionBtn").style.display = "none";
      document.getElementById("backBtn").style.display = "block";
      document.getElementById("quitBtn").style.display = "block";
      document.getElementById("musicBtn").style.display = "block";
    });
    
    document.getElementById('backBtn').addEventListener("click",function(){
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


  /*function jouerMusiqueMenu(){
    var musiqueDejaJoue = false;
    musique.play();
    musique.on
      
    }, interval);
    musiqueDejaJoue = true;
   /* while (musiqueDejaJoue){
      setTimeout(175000,musique.play);
    }
    */
  