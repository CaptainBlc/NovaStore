# NovaStore - Flutter Mini Katalog Uygulamasi
**Hazirlayan:** Batuhan Tasdemir  
**Proje:** Staj Bitirme - Flutter Modulu  
**Tarih:** Nisan 2026

---

## Uygulama Hakkinda

NovaStore, bir e-ticaret platformunun mobil arayuzunu sergileyen Flutter ile gelistirilmis mini katalog uygulamasidir.

## Ekranlar

| Ekran | Aciklama |
|-------|----------|
| **Login Screen** | E-posta/sifre dogrulama, animasyonlu giris, misafir modu |
| **Home Screen** | GridView urun listesi, kategori filtreleme, ozel teklifler baneri, arama |
| **Detail Screen** | Urun detay, adet secimi, aciklama/ozellik/yorum sekmeleri, sepete ekle |

## Teknik Detaylar

- **Dil:** Dart / Flutter 3.x
- **Mimari:** Stateful Widget + FutureBuilder
- **Veri:** JSON simulasyonu (`products_data.dart` - gercek uygulamada REST API)
- **Urun listesi:** `SliverGrid` (GridView) ve `SliverList` (ListView) destegi
- **Sayfa gecisi:** `Navigator.push` + `PageRouteBuilder` (ozel animasyon)
- **Tema:** `ThemeData` ile merkezi renk yonetimi (60-30-10 kurali)
- **Fontlar:** Google Fonts - Poppins

## Kurulum

```bash
# Flutter SDK kurulu olmalidir (flutter.dev)
flutter pub get
flutter run
```

## Klasor Yapisi

```
lib/
├── main.dart                   # Uygulama giris noktasi
├── theme/
│   └── app_theme.dart          # Renk paleti ve tema tanimlari
├── models/
│   └── product.dart            # Product ve Category veri modelleri
├── data/
│   └── products_data.dart      # JSON veri simulasyonu
├── screens/
│   ├── login_screen.dart       # Giris ekrani
│   ├── home_screen.dart        # Ana sayfa (katalog)
│   └── detail_screen.dart      # Urun detay ekrani
└── widgets/
    └── product_card.dart       # Tekrar kullanilabilir urun karti
```

## Renk Paleti (60-30-10 Kurali)

| Rol | Renk | Hex | Kullanim |
|-----|------|-----|----------|
| %60 Birincil | Acik gri | `#F5F7FA` | Arka plan |
| %30 Ikincil | Lacivert | `#1A237E` | AppBar, buton, header |
| %10 Vurgu | Turuncu | `#FF6D00` | Fiyat, CTA, indirim badge |
