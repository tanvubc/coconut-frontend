const electron = require('electron');
const { ipcMain, Menu } = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const dgram = require('dgram');
const {autoUpdater} = require("electron-updater");
const PDFWindow = require('electron-pdf-window')
let mainWindow;
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');


function createWindow() {
  
  mainWindow = new BrowserWindow({
    width: 1600, height: 680,
    frame:false,
    titleBarStyle: 'hidden',
    webPreferences:{
      worldSafeExecuteJavaScript:true,
      webSecurity:false,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload:path.join(__dirname,'preload.js')
    },
  });
  
  

  ipcMain.on('refresh_list',(event,messageEvent)=>{
    HOST='192.168.0.12'
    PORT=11000
    const messagesocket = Buffer.from('Some bytes');
      const client = dgram.createSocket('udp4');
      client.on('listening', function () {
        var address = client.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
      });
      client.on('message', function (message, remote) {
        const serverlist= JSON.parse(message)
        console.log(remote.address + ':' + remote.port +' - ' + message);

        event.reply('refresh_list_reply',serverlist)

    });
      client.send(messagesocket, 0, messagesocket.length, PORT, HOST, function(err, bytes) {

        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
    
    });
       
       
  })
  mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  ipcMain.on('show-discovery',()=>{
    mainWindow.webContents.send('show-discovery','message')
  })
  ipcMain.on('toggle-dev',()=>{
    console.log('dev')
    mainWindow.webContents.openDevTools();
  });
  ipcMain.on('check-update',()=>{
    console.log('dev')
    autoUpdater.checkForUpdatesAndNotify()
  });
  mainWindow.on('closed', () => mainWindow = null);
  ipcMain.on('navigate',(event,message)=>{
    console.log(message)
    mainWindow.webContents.send('message',message)
  })
  ipcMain.on('openpdf',(event,message)=>{
    const win = new PDFWindow({
      width: 800,
      height: 600,
      title:message.title
    })
    win.menuBarVisible=false
    win.loadURL(message.url)

    
  })
}
//auto update

function sendStatusToWindow(text) {
  console.log(text)
  mainWindow.webContents.send('update-message', text);
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

//end of auto update
app.on('ready', ()=>{
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
  
}
);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});