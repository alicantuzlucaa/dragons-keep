# 🚀 DEPLOY ADIMLARI - Dragon's Keep

## ✅ Git Hazır! Şimdi GitHub'a Yükle

### 1️⃣ GitHub'da Repository Oluştur

1. **GitHub'a git**: https://github.com
2. **Sign in** yap (hesabın yoksa oluştur)
3. **Sağ üst** → **+** → **New repository**
4. **Repository name**: `dragons-keep`
5. **Description**: `Dragon's Keep - RPG Game & Screen Share`
6. **Public** seç (ücretsiz deploy için)
7. **Create repository** tıkla

### 2️⃣ GitHub'a Push Et

Terminal'de şu komutları çalıştır:

```bash
# GitHub repository URL'ini ekle (kendi username'inle değiştir!)
git remote add origin https://github.com/KULLANICI_ADINIZ/dragons-keep.git

# Branch'i main yap
git branch -M main

# GitHub'a push et
git push -u origin main
```

**ÖNEMLİ**: `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın!

### 3️⃣ Render.com'da Deploy

1. **Render'a git**: https://render.com
2. **Get Started for Free** tıkla
3. **Sign Up with GitHub** tıkla
4. GitHub hesabınla giriş yap
5. **Dashboard** → **New +** → **Web Service**
6. **Connect Repository** → `dragons-keep` seç
7. **Ayarlar:**
   ```
   Name: dragons-keep
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```
8. **Create Web Service** tıkla

### 4️⃣ Deploy Tamamlandı! 🎉

Deploy bitince URL'iniz:
```
https://dragons-keep.onrender.com
```

veya

```
https://dragons-keep-XXXX.onrender.com
```

## 🔄 Otomatik Güncelleme

Artık her değişiklikte otomatik deploy olur:

```bash
# Kod değiştir
# Sonra:

git add .
git commit -m "Yeni özellik eklendi"
git push

# Render otomatik deploy eder!
```

## 📊 Monitoring

Render Dashboard'da:
- **Logs** → Canlı loglar
- **Events** → Deploy geçmişi
- **Metrics** → CPU/RAM kullanımı

## ⚠️ Önemli Notlar

### Free Tier Özellikleri:
- ✅ 750 saat/ay ücretsiz
- ⚠️ 15 dakika inaktivite sonrası uyur
- ⚠️ İlk istek 30-60 saniye sürebilir (uyanma)
- ✅ SSL sertifikası otomatik
- ✅ GitHub otomatik deploy

### Uyuma Problemi Çözümü:

**UptimeRobot** kullan (ücretsiz):
1. https://uptimerobot.com
2. Sign up
3. Add Monitor
4. URL: `https://dragons-keep.onrender.com`
5. Interval: 5 dakika
6. ✅ Artık hiç uyumaz!

## 🎯 Alternatif: Railway.app

Eğer Render çalışmazsa:

1. https://railway.app
2. **Login with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. `dragons-keep` seç
5. **Deploy**

Railway otomatik algılar, hiç ayar gerekmez!

## 🆘 Sorun Giderme

### Deploy Hatası?

Render Logs'a bak:
```
Dashboard → Service → Logs
```

### Port Hatası?

`server.js` kontrol et:
```javascript
const PORT = process.env.PORT || 3000;
```

### Build Hatası?

`package.json` kontrol et:
```json
"scripts": {
  "start": "node server.js"
}
```

## 📱 Mobil Erişim

Deploy sonrası URL'i telefondan da açabilirsiniz!

## 🔗 Faydalı Linkler

- **Render**: https://render.com
- **Railway**: https://railway.app
- **GitHub**: https://github.com
- **UptimeRobot**: https://uptimerobot.com

---

## 📝 Özet

1. ✅ Git hazır
2. ⏳ GitHub'a push et
3. ⏳ Render'da deploy et
4. 🎉 Canlı!

**Şimdi GitHub'a push et ve Render'da deploy et!**

---

**🎮 Dragon's Keep artık dünyaya açık! 🎉**
