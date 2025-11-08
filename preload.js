const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getSetting: (key) => ipcRenderer.invoke('get-setting', key),
  setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value),
  
  // Dragon's Keep specific APIs
  navigateToHome: () => ipcRenderer.send('navigate-to-home'),
  navigateToCharacters: () => ipcRenderer.send('navigate-to-characters'),
  navigateToScreenShare: () => ipcRenderer.send('navigate-to-screen-share'),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  
  // Game specific features
  saveGameData: (data) => ipcRenderer.invoke('save-game-data', data),
  loadGameData: () => ipcRenderer.invoke('load-game-data'),
  
  // Screen sharing events
  onScreenShareStart: (callback) => ipcRenderer.on('screen-share-start', callback),
  onScreenShareStop: (callback) => ipcRenderer.on('screen-share-stop', callback),
  
  // Character events
  onCharacterSelect: (callback) => ipcRenderer.on('character-select', callback),
  onCharacterUpdate: (callback) => ipcRenderer.on('character-update', callback)
});

// Add Dragon's Keep branding to console
console.log(`
🐉 Dragon's Keep - Windows Gaming Application
⚔️  Version: 1.0.0
🏰 Ready for adventure!
`);

// Add custom styling for Windows
document.addEventListener('DOMContentLoaded', () => {
  // Add Windows-specific classes
  document.body.classList.add('electron-app', 'windows-app');
  
  // Add custom title bar styling if needed
  const titleBar = document.createElement('div');
  titleBar.className = 'custom-title-bar';
  titleBar.style.display = 'none'; // Hidden by default, can be enabled later
  document.body.prepend(titleBar);
  
  // Add keyboard shortcuts info
  const shortcutsInfo = {
    'Ctrl+H': 'Home',
    'Ctrl+C': 'Characters', 
    'Ctrl+S': 'Screen Share',
    'F11': 'Fullscreen',
    'Ctrl+R': 'Reload',
    'F12': 'Developer Tools'
  };
  
  window.dragonsKeepShortcuts = shortcutsInfo;
});
