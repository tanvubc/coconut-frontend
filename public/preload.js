const { RGBA } = require('custom-electron-titlebar');
const {Menu,MenuItem} = require('electron').remote;
const customTitlebar = require('custom-electron-titlebar');
window.ipcRenderer = require('electron').ipcRenderer;
const { ipcRenderer, app } = require('electron')
window.addEventListener('DOMContentLoaded', () => {
   let aa= new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#1C212E'),
        shadow:true,
        overflow:'hidden',
        icon:'./logo192.png',
        itemBackgroundColor:customTitlebar.Color.LIGHTGREY,
        
    });
    
    const menu = new Menu();
    menu.append(new MenuItem({
        label: 'Pages',
        submenu: [
            {
                label: 'Home',
                click: () => {
                   
                    ipcRenderer.send('navigate','/')
                    //this.webContents.send('message','navigate to home')
                }
            },
            {
                label: 'Login',
                click: () =>  ipcRenderer.send('navigate','/login')
            },
            {
                label: 'Report',
                click: () =>  ipcRenderer.send('navigate','/report')
            },
            {
                label: 'User',
                click: () =>  ipcRenderer.send('navigate','/user')
            },
            {
                type: 'separator'
            }
        ]
    }));

    menu.append(new MenuItem({
        label: 'Setting',
        submenu: [
            {
                label: 'Discovery server',
                click: () => {
                   
                   ipcRenderer.send('show-discovery','something') 
                    //this.webContents.send('message','navigate to home')
                }
            },
            {
                label: 'Subitem with submenu',
                submenu: [
                    {
                        label: 'Submenu &item 1',
                        accelerator: 'Ctrl+T'
                    }
                ]
            }
        ]
    }));
    menu.append(new MenuItem({
        label: 'Development',
        submenu: [
            {
                label: 'Toggle Dev Tool',
                click: () => {
                   
                   ipcRenderer.send('toggle-dev','something') 
                    //this.webContents.send('message','navigate to home')
                }
            },
            {
                label: ' Check for update version ' +require('electron').remote.app.getVersion(),
                click: () => {
                    ipcRenderer.send('check-update','something') 
                 }
            }
        ]
    }));
   // Menu.setApplicationMenu(menu)
   ipcRenderer.on('update-message',(event,data)=>{
       aa.updateTitle(data)
   })
    aa.updateMenu(menu)
    // ...
})