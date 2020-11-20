const electron = require('electron');
const { ipcMain } = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const dgram = require('dgram');
let mainWindow;
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
function createWindow() {
  
  mainWindow = new BrowserWindow({
    width: 900, height: 680,
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
    HOST='192.168.1.255'
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
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

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