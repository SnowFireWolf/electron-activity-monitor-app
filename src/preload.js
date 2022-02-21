import path from 'path'
import electron from 'electron'
import { Titlebar, Color } from 'custom-electron-titlebar'


const { remote, shell, ipcRenderer } = electron



window.shell = shell
window.ipcRenderer = ipcRenderer



window.addEventListener('DOMContentLoaded', () => {
  // Title bar implemenation
  new Titlebar({
    backgroundColor: Color.fromHex('#2f3241'),
    icon: '/icon.png',
  });
});