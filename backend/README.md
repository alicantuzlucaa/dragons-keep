# Dragon's Keep - Backend

## Kurulum

1. Gerekli paketleri yükleyin:
```bash
npm install
```

2. Sunucuyu başlatın:
```bash
# Geliştirme modu
npm run dev

# Production modu
npm start
```

## API Endpoints

### Karakterler
- `GET /api/characters` - Tüm karakterleri listeler
- `GET /api/characters/:id` - Tek bir karakter detayını getirir
- `POST /api/characters/select` - Karakter seçimini kaydeder

## Geliştirme

- Port: 5000 (`.env` dosyasından değiştirilebilir)
- Geliştirme sırasında `npm run dev` kullanın (otomatik yenileme için)

## Üretim

- `NODE_ENV=production` olarak ayarlayın
- `npm start` ile uygulamayı başlatın
