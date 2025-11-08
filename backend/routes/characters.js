const express = require('express');
const router = express.Router();

// Mock data - Replace with database in production
const characters = [
    { id: 1, name: 'Savaşçı', class: 'Yakın Dövüş Uzmanı', image: '/images/characters/1.png' },
    { id: 2, name: 'Büyücü', class: 'Büyü Ustası', image: '/images/characters/2.png' },
    { id: 3, name: 'Okçu', class: 'Uzun Menzilli Savaşçı', image: '/images/characters/3.png' },
    { id: 4, name: 'Şifacı', class: 'İyileştirme Uzmanı', image: '/images/characters/4.png' },
    { id: 5, name: 'Tank', class: 'Savunma Uzmanı', image: '/images/characters/5.png' }
];

// Get all characters
router.get('/', (req, res) => {
    try {
        res.json(characters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Get single character
router.get('/:id', (req, res) => {
    try {
        const character = characters.find(c => c.id === parseInt(req.params.id));
        if (!character) return res.status(404).json({ message: 'Karakter bulunamadı' });
        res.json(character);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Save selected character (for future use with user authentication)
router.post('/select', (req, res) => {
    try {
        // In a real app, save to database with user ID
        const { characterId } = req.body;
        const character = characters.find(c => c.id === parseInt(characterId));
        
        if (!character) {
            return res.status(404).json({ message: 'Karakter bulunamadı' });
        }
        
        // Return success response
        res.json({
            success: true,
            message: 'Karakter seçildi',
            character
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Karakter seçilirken hata oluştu' });
    }
});

module.exports = router;
