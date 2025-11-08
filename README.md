# Dragon's Keep - Ekran Paylaşım ve Sohbet Uygulaması

Bu uygulama, kullanıcıların ekran paylaşımı yapabileceği ve gerçek zamanlı olarak sohbet edebileceği bir platformdur.

## Özellikler

- Gerçek zamanlı ekran paylaşımı
- Sesli ve yazılı sohbet
- Çoklu kullanıcı desteği
- Katılımcı yönetimi
- Mikrofon ve kamera kontrolleri
- Oda tabanlı bağlantı

## Kurulum

1. Öncelikle Node.js'in yüklü olduğundan emin olun: [Node.js İndir](https://nodejs.org/)

2. Proje bağımlılıklarını yükleyin:
   ```bash
   npm install
   ```

3. Sunucuyu başlatın:
   ```bash
   npm start
   ```
   Veya geliştirme modunda çalıştırmak için:
   ```bash
   npm run dev
   ```

4. Tarayıcınızı açın ve şu adrese gidin:
   ```
   http://localhost:3000
   ```

## Kullanım

1. **Yeni Oda Oluşturma:**
   - Ana sayfadan "Ekran Paylaşımı" butonuna tıklayın
   - Kullanıcı adınızı girin ve "Yeni Oda Oluştur" butonuna basın
   - Size verilen oda kodunu diğer katılımcılarla paylaşın

2. **Odaya Katılma:**
   - Ana sayfadan "Ekran Paylaşımı" butonuna tıklayın
   - Oda kodunu ve kullanıcı adınızı girin
   - "Odaya Katıl" butonuna basın

3. **Ekran Paylaşımı:**
   - Ekran paylaşımı yapmak için ekran paylaşım butonuna tıklayın
   - Paylaşmak istediğiniz ekranı veya pencereyi seçin
   - Paylaşımı durdurmak için tekrar aynı butona tıklayın

4. **Sohbet:**
   - Alt kısımdaki metin kutusuna mesajınızı yazın
   - Enter tuşuna basarak veya gönder butonuna tıklayarak mesajınızı gönderin

## Geliştirme

- **Bağımlılıklar:**
  - Express.js - Sunucu tarafı
  - Socket.IO - Gerçek zamanlı iletişim
  - Simple-Peer - WebRTC bağlantıları
  - UUID - Benzersiz kimlik oluşturma

- **Geliştirme sunucusu:**
  ```bash
  npm run dev
  ```
  Bu komut, değişikliklerin otomatik olarak yüklenmesini sağlayan nodemon ile sunucuyu başlatır.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
