import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Dragon's Keep</h3>
            <p>Macera dolu bir dünyaya hoş geldiniz. Ejderha diyarında kendi hikayenizi yazın.</p>
          </div>
          
          <div className="footer-section">
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/characters">Karakterler</Link></li>
              <li><Link to="/about">Hakkımızda</Link></li>
              <li><Link to="/contact">İletişim</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>İletişim</h4>
            <p>Email: info@dragonskeep.com</p>
            <div className="social-links">
              <a href="#" aria-label="Discord"><i className="fab fa-discord"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dragon's Keep. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
