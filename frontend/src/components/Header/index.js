import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import './Header.css';

const Header = () => {
  const { selectedCharacter } = useCharacter();
  const location = useLocation();
  const navigate = useNavigate();

  const handleScreenShareClick = (e) => {
    e.preventDefault();
    navigate('/screen-share');
  };

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Dragon's Keep</h1>
          </Link>
          
          <nav className="main-nav">
            <ul>
              <li className={location.pathname === '/' ? 'active' : ''}>
                <Link to="/">Ana Sayfa</Link>
              </li>
              <li className={location.pathname === '/characters' ? 'active' : ''}>
                <Link to="/characters">Karakterler</Link>
              </li>
              <li className={location.pathname === '/screen-share' ? 'active' : ''}>
                <a href="/screen-share" onClick={handleScreenShareClick}>
                  Ekran Paylaşımı
                </a>
              </li>
              {selectedCharacter && (
                <li className="selected-character">
                  <span className="character-badge">
                    <img 
                      src={selectedCharacter.image} 
                      alt={selectedCharacter.name} 
                      className="character-avatar"
                    />
                    <span className="character-name">{selectedCharacter.name}</span>
                  </span>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
