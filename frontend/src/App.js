import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import './index.css';

// Pages
import Home from './pages/Home';
import Characters from './pages/Characters';
import ScreenShare from './pages/ScreenShare';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Screen Share Components
import ScreenShareRoom from '../screen-share.html';

function App() {
  useEffect(() => {
    // Add Electron-specific classes when running in Electron
    if (window.electronAPI) {
      document.body.classList.add('electron-app', 'windows-app');
      console.log('🐉 Dragon\'s Keep - Running in Electron');
    }
  }, []);

  return (
    <CharacterProvider>
      <Router>
        <div className="app dragon-keep-app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/screen-share" element={<ScreenShare />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CharacterProvider>
  );
}

export default App;