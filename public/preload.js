const { RGBA } = require('custom-electron-titlebar');
const customTitlebar = require('custom-electron-titlebar');
window.ipcRenderer = require('electron').ipcRenderer;
window.addEventListener('DOMContentLoaded', () => {
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#1C212E'),
        shadow:true,
        overflow:'hidden',
        icon:'./logo192.png',
        itemBackgroundColor:customTitlebar.Color.LIGHTGREY
    });

    // ...
})