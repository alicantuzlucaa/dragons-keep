# 🚀 Dragon's Keep - Deployment Guide

## Render.com'a Deploy Etme (ÜCRETSİZ)

### 1️⃣ GitHub'a Yükle

```bash
# Git başlat (eğer yoksa)
git init

# Dosyaları ekle
git add .

# Commit yap
git commit -m "Initial commit - Dragon's Keep"

# GitHub'a push et
git remote add origin https://github.com/KULLANICI_ADINIZ/dragons-keep.git
git branch -M main
git push -u origin main
```

### 2️⃣ Render.com'da Deploy

1. **Render.com'a Git**: https://render.com
2. **Sign Up** - GitHub ile giriş yap
3. **New +** → **Web Service**
4. **Connect Repository** - dragons-keep seç
5. **Ayarlar:**
   - Name: `dragons-keep`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: **Free**
6. **Create Web Service** tıkla

### 3️⃣ Otomatik Deploy

✅ GitHub'a her push yaptığınızda otomatik deploy olur!

```bash
# Değişiklik yap
git add .
git commit -m "Update"
git push

# Render otomatik deploy eder!
```

### 4️⃣ URL'niz

Deploy sonrası URL:
```
https://dragons-keep.onrender.com
```

### 🎮 Alternatif Platformlar

#### Railway.app
1. https://railway.app
2. GitHub ile giriş
3. New Project → Deploy from GitHub
4. Repository seç → Deploy

#### Fly.io
```bash
# Fly CLI kur
npm install -g flyctl

# Giriş yap
flyctl auth login

# Deploy et
flyctl launch
flyctl deploy
```

### ⚙️ Environment Variables (Gerekirse)

Render Dashboard → Environment:
```
NODE_ENV=production
PORT=3000
```

### 🔄 Güncelleme

```bash
git add .
git commit -m "Yeni özellik eklendi"
git push
```

✅ Otomatik deploy başlar!

### 📊 Monitoring

Render Dashboard'da:
- Logs
- Metrics
- Deploy History

### 🆓 Ücretsiz Limitler

**Render Free Tier:**
- 750 saat/ay
- Auto-sleep (15 dakika inaktivite)
- 512 MB RAM
- Shared CPU

**Railway Free Tier:**
- $5 kredi/ay
- 500 saat
- 512 MB RAM

**Fly.io Free Tier:**
- 3 VM
- 256 MB RAM
- 160 GB bandwidth

### 🎯 Tavsiye

**Render.com** kullanın çünkü:
- ✅ En kolay
- ✅ Socket.IO desteği
- ✅ SSL otomatik
- ✅ GitHub otomatik deploy
- ✅ Tamamen ücretsiz

### 🔗 Faydalı Linkler

- Render: https://render.com
- Railway: https://railway.app
- Fly.io: https://fly.io
- GitHub: https://github.com

---

**🎉 Deploy tamamlandı! Projeniz artık canlı! 🎮**
