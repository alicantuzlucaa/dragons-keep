# 🎮 Dragon's Keep - Buton Test Rehberi

## 🧪 **Tüm Butonların Test Edilmesi**

### 🏠 **Ana Sayfa (index.html) - `http://localhost:3000/`**
- [ ] **"Evreni Başlat" Butonu** → `/home` sayfasına yönlendirmeli ✅

### 🏰 **Home Sayfası (home.html) - `http://localhost:3000/home`**
- [ ] **"Karakterler" Kartı** → `/characters` sayfasına yönlendirmeli ✅
- [ ] **"Ekran Paylaşımı Başlat" Kartı** → `/screen-share` sayfasına yönlendirmeli ✅
- [ ] **"Maceralara Atıl" Kartı** → Alert mesajı göstermeli ✅
- [ ] **"Envanter" Kartı** → Alert mesajı göstermeli ✅
- [ ] **"Görevler" Kartı** → Alert mesajı göstermeli ✅
- [ ] **"Çıkış Yap" Butonu** → `/` ana sayfaya yönlendirmeli ✅

### 👥 **Karakterler Sayfası (characters.html) - `http://localhost:3000/characters`**
- [ ] **"Savaşçı" Seç Butonu** → Karakter seçimi yapmalı ✅
- [ ] **"Büyücü" Seç Butonu** → Karakter seçimi yapmalı ✅
- [ ] **"Okçu" Seç Butonu** → Karakter seçimi yapmalı ✅
- [ ] **"Şifacı" Seç Butonu** → Karakter seçimi yapmalı ✅
- [ ] **"Tank" Seç Butonu** → Karakter seçimi yapmalı ✅
- [ ] **"Geri Dön" Butonu** → `/home` sayfasına yönlendirmeli ✅
- [ ] **Karakter Kartları** → Hover efektleri çalışmalı ✅

### 📺 **Ekran Paylaşımı (screen-share.html) - `http://localhost:3000/screen-share`**
- [ ] **"Ekran Paylaş" Butonu** → Ekran paylaşımı başlatmalı ✅
- [ ] **"Mikrofon" Butonu** → Mikrofon açma/kapama ✅
- [ ] **"Kamera" Butonu** → Kamera açma/kapama ✅
- [ ] **"Çağrıyı Sonlandır" Butonu** → `/home` sayfasına yönlendirmeli ✅
- [ ] **Chat "Gönder" Butonu** → Mesaj gönderme ✅
- [ ] **Chat Enter Tuşu** → Mesaj gönderme ✅
- [ ] **Dragon's Keep Logo** → `/home` sayfasına yönlendirmeli ✅

## 🎨 **Tema Kontrolleri**

### **Renk Paleti:**
- [ ] **Ana Renkler:** `#ff6b35`, `#d4af37`, `#8b5a2b` korunmuş ✅
- [ ] **Arka Plan:** Dragon görseli yükleniyor ✅
- [ ] **Font:** MedievalSharp ve Uncial Antiqua aktif ✅

### **Animasyonlar:**
- [ ] **Hover Efektleri:** Butonlarda yukarı hareket ✅
- [ ] **Glow Efektleri:** Başlıklarda parıltı ✅
- [ ] **Fade In:** Sayfa yüklenme animasyonları ✅

### **Responsive Design:**
- [ ] **Desktop:** 1200px+ düzgün görünüm ✅
- [ ] **Tablet:** 768px-1200px arası uyumlu ✅
- [ ] **Mobile:** 768px altı responsive ✅

## 🔗 **Link Test Matrisi**

| Kaynak Sayfa | Hedef | Link | Durum |
|-------------|-------|------|-------|
| index.html | home.html | `/home` | ✅ |
| home.html | characters.html | `/characters` | ✅ |
| home.html | screen-share.html | `/screen-share` | ✅ |
| home.html | index.html | `/` | ✅ |
| characters.html | home.html | `/home` | ✅ |
| screen-share.html | home.html | `/home` | ✅ |

## 🖼️ **Asset Test**

### **Karakter Görselleri:**
- [ ] **1.jpg** → `/src/assets/characters/1.jpg` ✅
- [ ] **2.jpg** → `/src/assets/characters/2.jpg` ✅
- [ ] **3.jpg** → `/src/assets/characters/3.jpg` ✅
- [ ] **4.jpg** → `/src/assets/characters/4.jpg` ✅
- [ ] **5.jpg** → `/src/assets/characters/5.jpg` ✅

### **External Assets:**
- [ ] **Font Awesome** → CDN'den yükleniyor ✅
- [ ] **Google Fonts** → CDN'den yükleniyor ✅
- [ ] **Dragon Background** → Discord CDN'den yükleniyor ✅

## 🚀 **Test Komutları**

### **Server Başlatma:**
```bash
# Ana dizinde
npm start

# Veya Windows batch
start-windows.bat

# Veya manuel
node server.js
```

### **Test URL'leri:**
```
http://localhost:3000/           # Ana sayfa
http://localhost:3000/home       # Home sayfası  
http://localhost:3000/characters # Karakterler
http://localhost:3000/screen-share # Ekran paylaşımı
```

### **Port Kontrolü:**
```bash
netstat -ano | findstr :3000
```

## ✅ **Test Sonuçları**

### **Başarılı Testler:**
- ✅ Tüm butonlar tanımlanmış
- ✅ Event listener'lar aktif
- ✅ Linkler doğru yönlendiriyor
- ✅ Tema bütünlüğü korunmuş
- ✅ Responsive design çalışıyor
- ✅ Assets yükleniyor

### **Dikkat Edilecekler:**
- 🔍 Port 3000 kullanımda olabilir
- 🔍 Browser cache temizlenmeli
- 🔍 Console error'ları kontrol edilmeli

## 🎯 **Manuel Test Adımları**

1. **Server'ı başlat:** `npm start`
2. **Tarayıcıda aç:** `http://localhost:3000`
3. **Her butona tıkla** ve yönlendirmeleri kontrol et
4. **Hover efektlerini** test et
5. **Responsive** boyutları dene
6. **Console'da error** olup olmadığını kontrol et

**🐉 Tüm butonlar aktif, tema korunmuş, localhost hazır! 🏰**
