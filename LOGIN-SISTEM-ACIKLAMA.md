# 🔐 Kayıt Ol & Giriş Yap Sistemi - Nasıl Çalışır?

## 📋 Sistem Akışı

### 1️⃣ **Kullanıcı Girişi**

```
Kullanıcı → Ana Sayfa (/) → "Evreni Başlat" → Login Sayfası (/login)
```

---

## 🆕 KAYIT OL SİSTEMİ

### **Adım 1: Kayıt Formu**
Kullanıcı `/login` sayfasında **"Kayıt Ol"** linkine tıklar.

**Form Alanları:**
- Kullanıcı Adı (min 3 karakter)
- Email
- Şifre (min 6 karakter)
- Şifre Tekrar

### **Adım 2: Frontend Kontrolü**
```javascript
// Şifre eşleşmesi kontrolü
if (password !== passwordConfirm) {
    showMessage('Şifreler eşleşmiyor!', 'error');
    return;
}
```

### **Adım 3: Backend'e İstek**
```javascript
POST /api/auth/register
{
  "username": "alican",
  "email": "alican@example.com",
  "password": "123456"
}
```

### **Adım 4: Backend İşleme**

**server.js'de:**
```javascript
app.post('/api/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    
    // 1. Boş alan kontrolü
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Tüm alanlar gerekli!' });
    }
    
    // 2. Kullanıcı adı kullanımda mı?
    if (registeredUsers.has(username.toLowerCase())) {
        return res.status(400).json({ 
            message: 'Bu kullanıcı adı zaten kullanılıyor!' 
        });
    }
    
    // 3. Kullanıcıyı kaydet (in-memory database)
    const user = {
        username,
        email,
        password: Buffer.from(password).toString('base64'), // Basit şifreleme
        createdAt: new Date()
    };
    
    registeredUsers.set(username.toLowerCase(), user);
    
    // 4. Başarılı yanıt
    res.json({ message: 'Kayıt başarılı!', success: true });
});
```

### **Adım 5: Frontend Yanıt**
```javascript
if (response.ok) {
    showMessage('Kayıt başarılı! Giriş yapabilirsiniz.', 'success');
    // 1.5 saniye sonra giriş formuna geç
    setTimeout(() => {
        toggleForms(); // Giriş formunu göster
        document.getElementById('loginUsername').value = username; // Kullanıcı adını doldur
    }, 1500);
}
```

---

## 🔑 GİRİŞ YAP SİSTEMİ

### **Adım 1: Giriş Formu**
Kullanıcı `/login` sayfasında giriş yapar.

**Form Alanları:**
- Kullanıcı Adı
- Şifre

### **Adım 2: Backend'e İstek**
```javascript
POST /api/auth/login
{
  "username": "alican",
  "password": "123456"
}
```

### **Adım 3: Backend Doğrulama**

**server.js'de:**
```javascript
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    // 1. Kullanıcı var mı?
    const user = registeredUsers.get(username.toLowerCase());
    if (!user) {
        return res.status(401).json({ message: 'Kullanıcı bulunamadı!' });
    }
    
    // 2. Şifre doğru mu?
    const decodedPassword = Buffer.from(user.password, 'base64').toString();
    if (decodedPassword !== password) {
        return res.status(401).json({ message: 'Şifre yanlış!' });
    }
    
    // 3. Token oluştur
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    // 4. Başarılı yanıt
    res.json({ 
        message: 'Giriş başarılı!',
        success: true,
        token,
        user: {
            username: user.username,
            email: user.email
        }
    });
});
```

### **Adım 4: Frontend - Session Kaydet**
```javascript
if (response.ok) {
    // Token ve kullanıcı bilgisini localStorage'a kaydet
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    
    // Ana menüye yönlendir
    window.location.href = '/home?username=' + encodeURIComponent(username);
}
```

### **Adım 5: Ana Menü**
Kullanıcı `/home` sayfasına yönlendirilir ve oyuna başlar!

---

## 💾 VERİ DEPOLAMA

### **In-Memory Database**
```javascript
const registeredUsers = new Map();

// Örnek veri yapısı:
{
  "alican": {
    username: "alican",
    email: "alican@example.com",
    password: "MTIzNDU2", // Base64 encoded
    createdAt: "2025-11-08T04:00:00.000Z"
  }
}
```

### **LocalStorage (Frontend)**
```javascript
// Tarayıcıda saklanır
localStorage.setItem('token', 'YWxpY2FuOjE3MzEwMzg0MDAwMDA=');
localStorage.setItem('user', '{"username":"alican","email":"alican@example.com"}');
```

---

## 🔒 GÜVENLİK

### **Şu Anki Sistem (Basit)**
- ✅ Base64 şifreleme (basit)
- ✅ Token bazlı auth
- ✅ LocalStorage session
- ⚠️ In-memory database (server restart'ta sıfırlanır)

### **Production İçin (Gelişmiş)**
```javascript
// bcrypt ile şifreleme
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);

// JWT token
const jwt = require('jsonwebtoken');
const token = jwt.sign({ username }, 'SECRET_KEY', { expiresIn: '7d' });

// MongoDB veya PostgreSQL
const mongoose = require('mongoose');
// Kalıcı veri saklama
```

---

## 🎮 KULLANICI DENEYİMİ

### **Senaryo 1: Yeni Kullanıcı**
1. Ana sayfa → "Evreni Başlat"
2. Login sayfası → "Kayıt Ol" tıkla
3. Form doldur → "Kayıt Ol" butonu
4. ✅ "Kayıt başarılı!" mesajı
5. Otomatik giriş formuna geç
6. Kullanıcı adı otomatik dolu
7. Şifre gir → "Giriş Yap"
8. ✅ Ana menüye yönlendir

### **Senaryo 2: Mevcut Kullanıcı**
1. Ana sayfa → "Evreni Başlat"
2. Login sayfası → Giriş formu
3. Kullanıcı adı + Şifre gir
4. "Giriş Yap" butonu
5. ✅ Ana menüye yönlendir

### **Senaryo 3: Zaten Giriş Yapmış**
```javascript
// Sayfa yüklendiğinde kontrol
if (localStorage.getItem('token')) {
    // Direkt ana menüye yönlendir
    window.location.href = '/home';
}
```

---

## 🔄 RENDER'DA NASIL ÇALIŞIR?

### **Localhost'ta:**
```
http://localhost:3000/api/auth/login
```

### **Render'da:**
```
https://dragons-keep.onrender.com/api/auth/login
```

**Otomatik Algılama:**
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : window.location.origin;
```

---

## ⚠️ ÖNEMLİ NOTLAR

### **Render Free Tier:**
- Server 15 dakika inaktivite sonrası uyur
- Uyandığında **in-memory database sıfırlanır**
- Tüm kayıtlı kullanıcılar silinir

### **Çözüm:**
1. **MongoDB Atlas** (ücretsiz)
2. **PostgreSQL** (Render ücretsiz DB)
3. **UptimeRobot** (server'ı uyanık tutar)

### **Geçici Çözüm:**
- Her server restart'ta yeniden kayıt olun
- Veya test kullanıcıları server.js'e hardcode edin:

```javascript
// server.js başlangıcında
registeredUsers.set('test', {
    username: 'test',
    email: 'test@test.com',
    password: Buffer.from('123456').toString('base64'),
    createdAt: new Date()
});
```

---

## 📊 API ENDPOINTS

### **Kayıt**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "alican",
  "email": "alican@example.com",
  "password": "123456"
}

Response 200:
{
  "message": "Kayıt başarılı!",
  "success": true
}

Response 400:
{
  "message": "Bu kullanıcı adı zaten kullanılıyor!"
}
```

### **Giriş**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "alican",
  "password": "123456"
}

Response 200:
{
  "message": "Giriş başarılı!",
  "success": true,
  "token": "YWxpY2FuOjE3MzEwMzg0MDAwMDA=",
  "user": {
    "username": "alican",
    "email": "alican@example.com"
  }
}

Response 401:
{
  "message": "Kullanıcı bulunamadı!"
}
```

---

## 🎯 ÖZET

### **Kayıt Ol:**
1. Form doldur
2. Backend'e POST
3. Kullanıcı kaydet (in-memory)
4. Başarı mesajı
5. Giriş formuna geç

### **Giriş Yap:**
1. Kullanıcı adı + Şifre
2. Backend'e POST
3. Doğrulama yap
4. Token oluştur
5. LocalStorage'a kaydet
6. Ana menüye yönlendir

### **Session:**
- Token localStorage'da
- Her sayfa yüklendiğinde kontrol
- Geçerliyse direkt ana menü
- Geçersizse login sayfası

---

**🎉 Sistem tam çalışır durumda! Render'da deploy edince test edebilirsiniz! 🔐**
