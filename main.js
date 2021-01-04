// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
var son = true;
var idEleve;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
       nodeIntegration: true
    }
  })
  mainWindow.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  //récupère l'info si musique ou pas
  ipcMain.on('SON-ON',function(event){
    son = true;
  });

  ipcMain.on('SON-OFF',function(event){
    son = false;
  });

  //quand on start le jeu, on demande l'info au main s'il y a le son ou pas
  ipcMain.on('SON',function(event){
    if (son){
      event.sender.send('SON-ON');
    }
    else {
      event.sender.send('SON-OFF');
    }
  })


  ipcMain.on("jouer",function(event){
    mainWindow.loadFile('src/html/game.html'); //affiche le jeu
  })

  ipcMain.on("note",function(){
    mainWindow.loadFile("./src/html/note.html");//pour noter
  })

  //envoi l'id du joueur choisi 
  ipcMain.on("ask-id",function(event){
    event.sender.send("id",idEleve);
  })
  
  //recupère l'id de l'élève choisi
  ipcMain.on("idEleve",function(event,args){
    idEleve = args[0];
  })


  ipcMain.on('retour-menu',function(){
    mainWindow.loadFile('index.html');//la fenetre devient index.html
  })
  // Open the DevTools.
   mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// pour quitter l'appli (suite)
ipcMain.on("quit",function(){
  app.quit();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
