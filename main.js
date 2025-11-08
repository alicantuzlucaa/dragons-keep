const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const Store = require('electron-store');

// Initialize electron store for settings
const store = new Store();

// Keep a global reference of the window object
let mainWindow;
let serverProcess;

function createWindow() {
  // Create the browser window with Dragon's Keep theme
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    titleBarStyle: 'default',
    backgroundColor: '#000000',
    show: false,
    frame: true,
    resizable: true,
    maximizable: true,
    fullscreenable: true
  });

  // Set window title
  mainWindow.setTitle('Dragon\'s Keep - Gaming & Screen Share');

  // Start the backend server
  startServer();

  // Load the app after server starts
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3000/');
  }, 2000);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  // Create application menu
  createMenu();
}

function startServer() {
  // Start the Express server
  serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  serverProcess.on('error', (err) => {
    console.error('Failed to start server:', err);
  });
}

function createMenu() {
  const template = [
    {
      label: 'Dragon\'s Keep',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Dragon\'s Keep',
              message: 'Dragon\'s Keep v1.0.0',
              detail: 'Windows gaming and screen sharing application'
            });
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Game',
      submenu: [
        {
          label: 'Home',
          click: () => {
            mainWindow.loadFile('src/pages/home.html');
          }
        },
        {
          label: 'Characters',
          click: () => {
            mainWindow.loadFile('src/pages/characters.html');
          }
        },
        {
          label: 'Screen Share',
          click: () => {
            mainWindow.loadFile('src/pages/screen-share.html');
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});
