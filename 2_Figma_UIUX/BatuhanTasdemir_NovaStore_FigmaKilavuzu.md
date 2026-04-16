# NovaStore Figma Tasarimi - Adim Adim Kilavuz
**Hazirlayan:** Batuhan Tasdemir | Nisan 2026

Bu belge, Figma'da NovaStore mobil tasarimini nasil olusturacaginizi adim adim gosterir.

---

## Adim 1: Yeni Figma Projesi Ac

1. figma.com'a giris yap
2. **New Design File** tiklayarak yeni dosya ac
3. Dosya adini `BatuhanTasdemir_NovaStore_Mobil` yap

---

## Adim 2: Renk Stillerini Tanimla (Design System)

Sag panel > **Local Styles > +** ile su renkleri ekle:

| Stil Adi | Hex |
|----------|-----|
| `Primary/800` | `#1A237E` |
| `Primary/600` | `#303F9F` |
| `Accent/500` | `#FF6D00` |
| `Background` | `#F5F7FA` |
| `Surface` | `#FFFFFF` |
| `Text/Dark` | `#1C1C1E` |
| `Text/Light` | `#8E8E93` |
| `Success` | `#34C759` |
| `Error` | `#FF3B30` |

---

## Adim 3: Frame Olustur (Mobile Frame)

1. **F** tusuna bas > Frame seceneklerinden **iPhone 14 Pro (393 x 852)** sec
2. 3 frame olustur ve isimlendir:
   - `01_LoginScreen`
   - `02_HomeScreen`
   - `03_DetailScreen`
3. Her frame'in dolgu rengini `Background (#F5F7FA)` yap

---

## Adim 4: Login Ekrani

### AppBar yerine Gradient Arka Plan
1. Frame'i sec > Fill > "+" ile gradient ekle
2. Ust: `#1A237E`, Alt: `#283593`, dikey (270 derece)

### Logo Blogu
1. Rectangle: 90x90, radius: 24, fill: beyaz, shadow: 0/8/20 siyah %20
2. Icerine ikon: `shopping_bag` (Figma Community'den Material Icons)
3. Ikon rengi: `#FF6D00`
4. Altina Text: "NovaStore", Poppins Bold 32, beyaz
5. Altina Text: "Alisveriste yeni bir boyut", Poppins Regular 14, beyaz %70

### Form Karti
1. Rectangle: 337x420, radius: 24, fill: beyaz, shadow: 0/10/30 siyah %12
2. Auto Layout yap (Vertical, spacing: 16, padding: 28)
3. Icerik:
   - Text: "Giris Yap", Poppins Bold 22
   - Text: "Hesabiniza erisim saglayin", Poppins 13, gri
   - InputField component x2 (Email, Sifre)
   - Button: "Giris Yap" (Primary variant)
   - Divider + "veya" text
   - Button: "Misafir Olarak Devam Et" (Secondary variant)
4. Altta: "Hesabiniz yok mu? Uye Ol" text linki

### InputField Component Olustur
1. Rectangle: Full width, height: 52, radius: 12, stroke: gri
2. Sol ikon, Label text, Placeholder text
3. Component yap (Ctrl/Cmd + Alt + K)
4. Variant ekle: Default / Focus / Error / Disabled

---

## Adim 5: Home Ekrani

### Status Bar (40dp)
Sistem saatini gosteren ust bar - iPhone safe area

### AppBar (56dp)
1. Rectangle: tam genislik, 56dp yukseklik, fill: `#1A237E`
2. Sol: Logo + "NovaStore" text (beyaz)
3. Sag: Cart ikon (badge ile) + Notification ikon

### Search Bar
1. Rectangle: tam genislik -32dp, yukseklik: 48, radius: 12, fill: beyaz, stroke: gri
2. Sol: Arama ikonu, Sag: X butonu (conditional)

### Featured Banner (Yatay Scroll)
1. Frame: 280x150, radius: 18, fill: gradient lacivert
2. Sag: Urun gorseli (masked, overflow hidden)
3. Sol: "OZEL TEKLIF" badge (turuncu) + Urun adi + Fiyat

### Kategori Chips
1. Her chip: Auto Layout, padding: 8/16, radius: 24
2. Secili: Lacivert dolgu + beyaz text
3. Secilmemis: Beyaz dolgu + gri border + gri text
4. **Component Set** olustur: CategoryChip / Selected-Unselected variant

### ProductCard Component
1. Frame: 168x280, radius: 16, fill: beyaz, shadow
2. Gorsel alani: 168x140, overflow hidden
3. Favicon overlay: 32x32 circle, beyaz, sag ust (absolute)
4. Badge: sol ust absolute, turuncu, Poppins Bold 11
5. Alt bilgi: Auto Layout Vertical
   - Urun adi: Bold 13, 2 satir max
   - Yildiz + puan + yorum
   - Fiyat (turuncu) + Sepet butonu (lacivert)
6. **Component** yap ve 2 varyant ekle: Normal / Favorited

### Grid Layout
1. 2 sutun, 14dp aralik, 16dp kenar boslugu
2. Auto Layout ile ustuste ProductCard instancelari yerlestir

### Bottom Navigation
1. Rectangle: tam genislik, 80dp, beyaz, ust shadow
2. 4 ikon + label, esit aralik (spaceBetween)
3. Secili sekme: ikon mavi + indicator lozenge (lacivert %15)

---

## Adim 6: Detail Ekrani

### Buyuk Gorsel Header (320dp)
1. Frame: tam genislik, 320dp, image fill (urun gorseli)
2. Uzerine gradient overlay: seffaf → siyah %30, alt kisim
3. Geri oku (sol ust) + Kalp ikonu + Paylas (sag ust)
4. Sol alt: Indirim badge (turuncu pill)

### Urun Bilgi Karti
1. Beyaz kart, radius: 20, shadow
2. Baslik: Bold 20
3. Yildiz satiri + Stok badge
4. Divider
5. Fiyat satiri (turuncu) + Adet secici (- / sayi / +)

### Tab Bar
1. 3 esit genislik bolum: Aciklama / Ozellikler / Yorumlar
2. Aktif: Turuncu alt cizgi (2.5dp) + Turuncu text
3. Pasif: Gri text, cizgi yok
4. Component: TabItem / Active-Inactive variant

### Sticky Bottom Bar
1. Rectangle: tam genislik, beyaz, ust shadow
2. Sol: "Toplam" label + Hesapli fiyat
3. Sag: "Sepete Ekle" turuncu buton (Expanded)

---

## Adim 7: Prototype Baglantilari

1. **Prototype** sekmesine gec
2. Login -> Home: "Giris Yap" butonundan navigate, Fade, 500ms
3. Home -> Detail: ProductCard'a tiklaninca navigate, Slide Up, 300ms
4. Detail -> Home: Geri butonundan navigate, Slide Down, 250ms
5. **Preview** (Ctrl+Alt+Enter) ile simule et

---

## Adim 8: Export

1. Her frame'i sec > **Export** panel
2. Format: PDF (tum ekranlar tek dosya)
3. Dosya adi: `BatuhanTasdemir_NovaStore_Ekranlar.pdf`
4. Ayrica her ekrani 2x PNG olarak export et (ekran goruntuleri klasorune)

---

*Hazirlayan: Batuhan Tasdemir | NovaStore Staj Projesi | Nisan 2026*
