const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

async function createWindow() {
  const isDev = await import('electron-is-dev').then(module => module.default);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true,
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'build', 'index.html')}`;

  console.log(`Loading URL: ${startUrl}`); // Debugging log

  mainWindow.loadURL(startUrl).then(() => {
    console.log('URL loaded successfully');
  }).catch((err) => {
    console.error('Failed to load URL:', err);
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
