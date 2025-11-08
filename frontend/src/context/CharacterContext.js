import React, { createContext, useContext, useState, useEffect } from 'react';

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: 'Savaşçı',
      class: 'Yakın Dövüş Uzmanı',
      image: '/images/characters/1.png'
    },
    {
      id: 2,
      name: 'Büyücü',
      class: 'Büyü Ustası',
      image: '/images/characters/2.png'
    },
    {
      id: 3,
      name: 'Okçu',
      class: 'Uzun Menzilli Savaşçı',
      image: '/images/characters/3.png'
    },
    {
      id: 4,
      name: 'Şifacı',
      class: 'İyileştirme Uzmanı',
      image: '/images/characters/4.png'
    },
    {
      id: 5,
      name: 'Tank',
      class: 'Savunma Uzmanı',
      image: '/images/characters/5.png'
    }
  ]);

  // Load selected character from localStorage on initial load
  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
      setSelectedCharacter(JSON.parse(savedCharacter));
    }
  }, []);

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
  };

  return (
    <CharacterContext.Provider value={{ characters, selectedCharacter, selectCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  return useContext(CharacterContext);
};

export default CharacterContext;
