# 🐉 Dragon's Keep - Windows Gaming Application

## Windows Kurulum ve Çalıştırma Rehberi

### 📋 Sistem Gereksinimleri
- **İşletim Sistemi:** Windows 10/11 (64-bit)
- **RAM:** Minimum 4GB, Önerilen 8GB
- **Disk Alanı:** 500MB boş alan
- **Node.js:** v16.0.0 veya üzeri

### 🚀 Hızlı Başlangıç

#### 1. Kolay Kurulum (Önerilen)
```bash
# Çift tıklayarak çalıştırın:
start-windows.bat
```

#### 2. Manuel Kurulum
```bash
# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm start
```

#### 3. Windows Uygulaması Olarak Build Etme
```bash
# Build scriptini çalıştırın:
build-windows.bat

# Veya manuel olarak:
npm run build-win
```

### 🎮 Özellikler

#### 🏰 Ana Özellikler
- **Medieval Fantasy Teması:** Ejder ve şövalye temalı arayüz
- **Ekran Paylaşımı:** WebRTC tabanlı gerçek zamanlı ekran paylaşımı
- **Karakter Sistemi:** 6 farklı karakter seçeneği
- **Gerçek Zamanlı Chat:** Socket.IO ile anlık mesajlaşma
- **Windows Entegrasyonu:** Native Windows uygulaması

#### ⚔️ Oyun Özellikleri
- Karakter seçimi ve özelleştirme
- Oda tabanlı multiplayer sistem
- Sesli ve görüntülü iletişim
- Tam ekran oyun modu

### 🎯 Kullanım

#### Ana Menü Navigasyonu
- **Ctrl+H:** Ana Sayfa
- **Ctrl+C:** Karakterler
- **Ctrl+S:** Ekran Paylaşımı
- **F11:** Tam Ekran
- **F12:** Geliştirici Araçları

#### Ekran Paylaşımı
1. "Ekran Paylaşımı" menüsüne gidin
2. "Yeni Oda Oluştur" veya mevcut oda kodunu girin
3. Ekranınızı paylaşmaya başlayın
4. Diğer oyuncularla chat yapın

#### Karakter Sistemi
1. "Karakterler" menüsüne gidin
2. 6 farklı karakter arasından seçim yapın
3. Karakteriniz otomatik olarak kaydedilir

### 🛠️ Geliştirici Bilgileri

#### Teknoloji Stack
- **Frontend:** React 18, React Router
- **Backend:** Node.js, Express.js
- **Gerçek Zamanlı:** Socket.IO
- **WebRTC:** Simple-Peer
- **Desktop:** Electron
- **Build:** Electron Builder

#### Proje Yapısı
```
Dragon's Keep/
├── main.js              # Electron ana process
├── preload.js           # Electron preload script
├── server.js            # Backend server
├── index.html           # Ana giriş sayfası
├── home.html            # Ana oyun sayfası
├── characters.html      # Karakter seçimi
├── screen-share.html    # Ekran paylaşımı
├── frontend/            # React uygulaması
├── assets/              # Görseller ve iconlar
└── dist/                # Build çıktıları
```

#### Development Mode
```bash
# Geliştirme modunda çalıştırma
npm run dev

# Server'ı ayrı çalıştırma
npm run server
```

### 🔧 Sorun Giderme

#### Yaygın Sorunlar

**Uygulama açılmıyor:**
- Node.js'in yüklü olduğundan emin olun
- `npm install` komutunu çalıştırın
- Windows Defender'ı kontrol edin

**Ekran paylaşımı çalışmıyor:**
- Tarayıcı izinlerini kontrol edin
- Firewall ayarlarını kontrol edin
- Port 3000'in açık olduğundan emin olun

**Build hatası alıyorum:**
- `npm cache clean --force` çalıştırın
- `node_modules` klasörünü silin ve `npm install` yapın

### 📞 Destek

Sorun yaşıyorsanız:
1. README dosyasını kontrol edin
2. GitHub Issues'da arama yapın
3. Yeni issue oluşturun

### 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**🐉 Dragon's Keep - Windows Gaming Experience 🏰**
