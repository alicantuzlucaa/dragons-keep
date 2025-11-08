import React from 'react';
import { Link } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import './Home.css';

const Home = () => {
  const { selectedCharacter } = useCharacter();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Dragon's Keep'e Hoş Geldiniz</h1>
            <p>Efsanevi maceralara atılın, güçlü düşmanlarla savaşın ve efsanevi hazineleri keşfedin.</p>
            
            <div className="cta-buttons">
              {selectedCharacter ? (
                <Link to="/characters" className="btn btn-primary">
                  Maceraya Devam Et
                </Link>
              ) : (
                <Link to="/characters" className="btn btn-primary">
                  Karakter Seç
                </Link>
              )}
              <Link to="/about" className="btn btn-secondary">
                Hikayeyi Keşfet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Neden Bizi Seçmelisiniz?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-dragon"></i>
              </div>
              <h3>Efsanevi Yaratıklar</h3>
              <p>Eşsiz yeteneklere sahip güçlü yaratıklarla karşılaşın ve onlarla savaşın.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-swords"></i>
              </div>
              <h3>Stratejik Savaş Sistemi</h3>
              <p>Beceri ve stratejinizi kullanarak düşmanlarınızı alt edin.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Çok Oyunculu</h3>
              <p>Arkadaşlarınızla birlikte maceraya atılın ve güçlerinizi birleştirin.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
