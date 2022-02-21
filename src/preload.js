import { contextBridge } from 'electron'
import { Titlebar, Color } from 'custom-electron-titlebar'
import log from 'electron-log'
import si from 'systeminformation'
import { exec } from 'child_process'


contextBridge.exposeInMainWorld('si', si)
contextBridge.exposeInMainWorld('log', log)


exec('NET SESSION', function(err,so,se) {
  console.log(se.length === 0 ? "admin" : "not admin");
});

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implemenation
  window.titlebar = new Titlebar({
    backgroundColor: Color.fromHex('#2f3241'),
    icon: '/icon.png',
  });
});