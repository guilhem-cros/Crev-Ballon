	const electron = require("electron");
  const ipcRenderer = electron.ipcRenderer;


  	//quitter l'appli
  	document.getElementById("quitBtn").addEventListener("click",function(){
    	ipcRenderer.send("quit");
	})
    
   var showCredits = function(){
     document.getElementById("theHead").style.display = "none";
     document.getElementById("creditBtn").style.display = "none";
     document.getElementById("statistiqueBtn").style.display = "none";
     document.getElementById("newGame").style.display = "none";
     document.getElementById("credits").style.display = "block";
     document.getElementById("optionBtn").style.display = "none";
     document.getElementById("backBtn").style.display = "block";
     document.getElementById("quitBtn").style.display = "none";
   };

   var showStatistique = function(){
    document.getElementById("theHead").style.display = "none";
     document.getElementById("creditBtn").style.display = "none";
     document.getElementById("statistiqueBtn").style.display = "none";
     document.getElementById("newGame").style.display = "none";
     document.getElementById("optionBtn").style.display = "none";
     document.getElementById("backBtn").style.display = "block";
     document.getElementById("quitBtn").style.display = "none";
     document.getElementById("musicBtn").style.display = "none";
     
   }

  var showOption = function(){
    document.getElementById("theHead").style.display = "none";
     document.getElementById("creditBtn").style.display = "none";
     document.getElementById("statistiqueBtn").style.display = "none";
     document.getElementById("newGame").style.display = "none";
     document.getElementById("optionBtn").style.display = "none";
     document.getElementById("backBtn").style.display = "block";
     document.getElementById("quitBtn").style.display = "block";
     document.getElementById("musicBtn").style.display = "block";


     
    }
    
  var goBack = function(){
    document.getElementById("backBtn").style.display = "none";
    document.getElementById("credits").style.display = "none";
    document.getElementById("theHead").style.display = "block";
    document.getElementById("newGame").style.display = "block";
    document.getElementById("statistiqueBtn").style.display = "block";
    document.getElementById("creditBtn").style.display = "block";
    document.getElementById("optionBtn").style.display = "block";
    document.getElementById("quitBtn").style.display = "block";
    document.getElementById("musicBtn").style.display = "none";

  }