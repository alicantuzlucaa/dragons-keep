import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CharacterSelection.css';

const CharacterSelection = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('/api/characters');
        setCharacters(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Karakterler yüklenirken hata oluştu:', err);
        setError('Karakterler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleSelectCharacter = async (character) => {
    try {
      await axios.post('/api/characters/select', { characterId: character.id });
      setSelectedCharacter(character.id);
      // Seçilen karakteri kaydetmek için gerekli işlemler buraya eklenecek
    } catch (err) {
      console.error('Karakter seçilirken hata oluştu:', err);
    }
  };

  if (isLoading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="character-selection">
      <header className="header">
        <h1>Karakter Seçimi</h1>
        <p>Macerana başlamak için bir karakter seç</p>
      </header>

      <div className="characters-grid">
        {characters.map((character) => (
          <div 
            key={character.id}
            className={`character-card ${selectedCharacter === character.id ? 'selected' : ''}`}
            onClick={() => handleSelectCharacter(character)}
          >
            <div 
              className="character-image" 
              style={{ backgroundImage: `url(${character.image})` }}
            >
              {!character.image && <div className="image-placeholder">{character.name}</div>}
            </div>
            <div className="selected-indicator">
              <i className="fas fa-check"></i>
            </div>
            <div className="character-info">
              <h2>{character.name}</h2>
              <p className="character-class">{character.class}</p>
              <button 
                className="select-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCharacter(character);
                }}
              >
                Seç
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        <i className="fas fa-arrow-left"></i> Geri Dön
      </button>
    </div>
  );
};

export default CharacterSelection;
