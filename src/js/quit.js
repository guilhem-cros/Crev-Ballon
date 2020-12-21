const {ipcRenderer} = require('electron');

document.getElementById('exit').addEventListener('click', () => {
    ipcRenderer.send('close-app')
});