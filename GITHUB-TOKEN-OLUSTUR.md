# 🔑 GitHub Personal Access Token Oluşturma

## ⚠️ Sorun: Permission Denied

GitHub artık şifre ile push kabul etmiyor. **Personal Access Token** gerekli.

## 📝 Token Oluşturma Adımları

### 1️⃣ GitHub'da Token Oluştur

1. **GitHub'a git**: https://github.com
2. **Sağ üst** → Profil fotoğrafı → **Settings**
3. **Sol menü** → En altta **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**
6. **Note**: `Dragons Keep Deploy`
7. **Expiration**: `No expiration` (veya 90 days)
8. **Select scopes** - Şunları işaretle:
   - ✅ **repo** (tüm alt seçenekler)
   - ✅ **workflow**
9. **Generate token** tıkla
10. ⚠️ **Token'ı KOPYALA** - Bir daha göremezsiniz!

### 2️⃣ Token ile Push Et

Token kopyaladıktan sonra:

```bash
# Eski remote'u sil
git remote remove origin

# Yeni remote ekle (TOKEN yerine kopyaladığın token'ı yapıştır)
git remote add origin https://TOKEN@github.com/alicantuzlucaa/dragons-keep.git

# Push et
git push -u origin main
```

**VEYA** daha kolay yol:

```bash
# Push ederken kullanıcı adı ve şifre sorar
git push -u origin main

# Username: alicantuzlucaa
# Password: [TOKEN'I YAPIŞTIR - şifre değil!]
```

### 3️⃣ Token'ı Kaydet (Windows)

Windows Credential Manager otomatik kaydeder, bir daha sormaz.

## 🚀 Alternatif: GitHub Desktop

Daha kolay yol:

1. **GitHub Desktop** indir: https://desktop.github.com
2. **Kur ve GitHub hesabınla giriş yap**
3. **File** → **Add Local Repository**
4. `C:\Users\Alican\Desktop\Alican` seç
5. **Publish repository** tıkla
6. ✅ Otomatik push eder!

## 📱 Alternatif: GitHub CLI

```bash
# GitHub CLI kur
winget install GitHub.cli

# Giriş yap
gh auth login

# Push et
git push -u origin main
```

## ⚡ En Hızlı Çözüm

### GitHub Desktop Kullan (Tavsiye!)

1. https://desktop.github.com → İndir
2. Kur
3. GitHub hesabınla giriş yap
4. **Add Local Repository** → Proje klasörünü seç
5. **Publish repository** tıkla
6. ✅ Bitti!

Artık her değişiklikte:
- GitHub Desktop açılır
- Değişiklikleri gösterir
- **Commit** ve **Push** butonlarına tıklarsınız

## 🔐 Token Örneği

Token şöyle görünür:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Bu token'ı şifre yerine kullanın!

---

**🎯 Tavsiye: GitHub Desktop kullanın, en kolay yol!**
