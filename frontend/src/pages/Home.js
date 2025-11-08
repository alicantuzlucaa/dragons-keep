import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="header">
        <h1>Dragon's Keep</h1>
        <p>Ejderha Diyarına Hoş Geldiniz</p>
      </header>
      
      <div className="menu-grid">
        <div className="menu-card" onClick={() => navigate('/characters')}>
          <div className="menu-icon">
            <i className="fas fa-user"></i>
          </div>
          <h3>Karakterler</h3>
          <p>Karakterini seç ve maceraya başla</p>
        </div>
        
        <div className="menu-card">
          <div className="menu-icon">
            <i className="fas fa-dragon"></i>
          </div>
          <h3>Maceralar</h3>
          <p>Yeni maceralara atıl</p>
        </div>
        
        <div className="menu-card">
          <div className="menu-icon">
            <i className="fas fa-trophy"></i>
          </div>
          <h3>Başarımlar</h3>
          <p>Kazanılan başarıları görüntüle</p>
        </div>
        
        <div className="menu-card">
          <div className="menu-icon">
            <i className="fas fa-cog"></i>
          </div>
          <h3>Ayarlar</h3>
          <p>Oyun ayarlarını düzenle</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
