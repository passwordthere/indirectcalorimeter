const { contextBridge, ipcRenderer } = require('electron');

// Expose a limited subset of the ipcRenderer methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // Example method to send a message to the main process
  send: (channel, data) => {
    // Whitelist channels
    let validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // Example method to receive a message from the main process
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // Strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});