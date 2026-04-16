## NovaStore – Flutter Mobil Uygulama Raporu
**Hazırlayan:** Batuhan Taşdemir  
**Tarih:** Nisan 2026  
**Teknoloji:** Flutter (Dart)

---

## 1) Proje Tanımı ve Amaç
Bu modül, NovaStore mobil arayüzünü Flutter ile “mini katalog uygulaması” olarak hayata geçirmek amacıyla geliştirilmiştir. Hedef; temel mobil geliştirme yapı taşlarını (widget yapısı, sayfa geçişleri, listeleme, veri modeli, tema yönetimi) gerçek bir e‑ticaret senaryosu üzerinde uygulamaktır.

---

## 2) Ekranlar ve Kullanıcı Akışı
Uygulama üç ana ekrandan oluşur:
- **Login Screen**: E‑posta/şifre girişi ve misafir modu ile ana ekrana geçiş.
- **Home Screen**: Ürünlerin grid yapıda listelenmesi, kategori filtreleme ve arama.
- **Detail Screen**: Ürün detayları, adet seçimi, sekmeli içerik (açıklama/özellik/yorum) ve sepete ekleme aksiyonu.

Kullanıcı akışı:
- Login → Home → Detail → Home (geri dönüş)

---

## 3) Teknik Mimari
Kapsam eğitim hedefi olduğu için sade bir mimari tercih edilmiştir:
- **Widget yaklaşımı**: Stateful/Stateless yapıların dengeli kullanımı
- **Veri**: `products_data.dart` içinde JSON benzeri veri simülasyonu (gerçek uygulamada REST API’ye taşınabilir)
- **Listeleme**: GridView/SliverGrid ile ürün kartları; ihtiyaç halinde list görünümü
- **Navigasyon**: `Navigator.push` ile sayfa geçişleri; özel animasyon için `PageRouteBuilder`
- **Tema**: `ThemeData` ile merkezi renk/typography yönetimi

---

## 4) Tasarım Sistemi (UI Kararları)
Figma UI/UX tasarımındaki dil korunacak şekilde aşağıdaki prensipler uygulanmıştır:
- **60‑30‑10 renk kuralı**: Arka plan `#F5F7FA`, birincil `#1A237E`, vurgu `#FF6D00`
- **Okunabilir tipografi**: Poppins fontu (mobil ekranlara uygun)
- **Tekrar eden bileşenler**: Ürün kartı gibi yapılar widget olarak ayrıştırılmıştır

---

## 5) Klasör Yapısı (Özet)
`3_Flutter_Mobil/novastore_app` altında:
- `lib/main.dart`: giriş noktası
- `lib/theme/app_theme.dart`: tema
- `lib/models/product.dart`: model
- `lib/data/products_data.dart`: veri simülasyonu
- `lib/screens/*`: ekranlar (login/home/detail)
- `lib/widgets/product_card.dart`: tekrar kullanılabilir kart bileşeni

---

## 6) Kurulum ve Çalıştırma
Proje dizininde:
- `flutter pub get`
- `flutter run`

---

## 7) Sonuç
Bu modül ile NovaStore konsepti mobil tarafta Flutter ile uygulanmış; veri modeli, listeleme, sayfa geçişleri ve tema yönetimi gibi temel konular bütüncül şekilde bir uygulama üzerinde pekiştirilmiştir.

