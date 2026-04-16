# NovaStore Mobil Uygulama Tasarimi - Karar Raporu
**Hazirlayan :** Batuhan Tasdemir  
**Proje       :** NovaStore E-Ticaret Platformu  
**Modül       :** Figma UI/UX Tasarimi  
**Tarih       :** Nisan 2026  
**Platform    :** iOS & Android (Mobil)  
**Arac        :** Figma  

---

## 1. Proje Ozeti

NovaStore, gunluk alisveris ihtiyaclarini karsilayan bir e-ticaret platformudur. Bu rapor, uygulamanin uc temel ekraniyla (Login, Home, Detail) ilgili tasarim kararlarini, kullanilan Figma tekniklerini ve kullanici deneyimi gerekceleri aciklamaktadir.

---

## 2. Renk Paleti - 60-30-10 Kurali

Tasarimda altin oran olarak kabul edilen renk hiyerarsisi uygulanmistir:

| Oran | Rol           | Renk Adi       | Hex Kodu  | Kullanim Alani |
|------|---------------|----------------|-----------|----------------|
| %60  | Birincil      | Acik Gri-Beyaz | `#F5F7FA` | Arka plan, kart ici, sayfa zemini |
| %30  | Ikincil       | Koyu Lacivert  | `#1A237E` | AppBar, navigasyon cubugu, basliklar, buton arkalari |
| %10  | Vurgu (Accent)| Yanmis Turuncu | `#FF6D00` | Fiyat etiketi, CTA butonu, indirim rozeti, favori ikonu |

**Karar Gerekce:** Lacivert renk; guven, kurumsal kimlik ve okunabilirlik saglar. Turuncu ise dikkat cekici ve eylem tetikleyici bir ton olarak fiyat ve buton gibi kritik noktalar icin tercih edilmistir.

**Ek Renkler:**

| Renk | Hex | Kullanim |
|------|-----|----------|
| Basari Yesili | `#34C759` | Stok durumu, onay bildirimleri |
| Hata Kirmizisi | `#FF3B30` | Stok bitti, hata mesajlari |
| Koyu Metin | `#1C1C1E` | Ana metin |
| Acik Metin | `#8E8E93` | Yardimci metin, placeholder |

---

## 3. Tipografi

**Font Ailesi:** Poppins (Google Fonts)

**Karar Gerekce:** Poppins, geometrik yapisiyla hem modern hem de okunabilir bir his verir. Turkce karakter destegi tam olup mobil ekranlarda dahi rahat okunur.

| Stil        | Agirlik   | Boyut    | Kullanim |
|-------------|-----------|----------|----------|
| H1 - Baslik | Bold 700  | 24-32sp  | Ekran basliklarinda |
| H2 - Alt    | SemiBold 600 | 18-20sp | Kart basliklarinda |
| Body        | Regular 400 | 14sp   | Aciklama metinlerinde |
| Caption     | Medium 500 | 11-12sp | Puan, stok, tarih |
| Button      | SemiBold 600 | 16sp  | Aksiyon butonlarinda |

---

## 4. Ekran Tasarimlari

### 4.1 Login Ekrani

**Amac:** Kullanicinin uygulamaya guvenli giris yapmasini saglamak.

**Tasarim Kararlari:**

- **Arka plan:** Lacivert-koyu lacivert dikey gradient (`#1A237E → #283593`). Kullaniciya premium ve guvenilir bir his verir.
- **Logo:** Beyaz, 90x90dp yuvarlak koseli kart icinde turuncu alisveris cantasi ikonu. Marka kimligini ilk bakista olusturur.
- **Form karti:** Beyaz, 24dp kavisli, golge efektli karti. Altta "giris yap" ve "misafir devam et" secenekleri sunulur.
- **Sifre alani:** Goster/gizle toggle ikonu ile kullanici hatasini minimize eder.
- **Buton:** Tam genislikte, turuncu (#FF6D00), 14dp kavisli, Poppins SemiBold 600.
- **Misafir modu:** Outlined buton ile kullanici kaydolmadan kesfedebilir (friction azaltma).
- **Hata mesajlari:** Alana ozgu, satir altinda kirmizi metin. Toast yerine inline tercih edildi; kullanici hangi alani duzeltecegini anlar.

**Figma Teknikleri:**
- Auto Layout (form kartinin dikey istiflenmesi)
- Component: InputField (Label + TextField + Error State varyantlari)
- Variant: Button (Primary / Secondary / Disabled / Loading)
- Overlay gradient: Figma Fill ile coklu renk duragi

---

### 4.2 Home Ekrani (Ana Sayfa)

**Amac:** Kullanicinin urunleri kesfedebildigi, filtreleyebildigi ve sepete ekleyebildigi ana katalog ekrani.

**Tasarim Kararlari:**

**AppBar:**
- Sol: NovaStore logosu + ikon
- Sag: Sepet (badge ile adet) + Bildirim ikonu
- Lacivert zemin, elevation 0. Baslik Material 3 center-title kuralina uyar.

**Arama Cubugu:**
- AppBar altinda tam genislikte, beyaz arka plan, prefix arama ikonu, suffix temizle butonu.
- Her ekranda yeniden kesfedilen bir arama kutusundan kacmak icin AppBar'in hemen altina sabitlendi.

**Ozel Teklifler Baneri (Featured):**
- Yatay kayan banner. Lacivert gradient zemin + sag tarafta urun gorseli.
- Sol tarafta "OZEL TEKLIF" turuncu badge + urun adi + fiyat.
- Karar: Kullaniciyi urun detayina yonlendirirken gorsel cekim saglar.

**Kategori Filtreleri:**
- Yatay kaydirilan pill seklinde butonlar.
- Secili: Lacivert dolgu, beyaz metin, golge efekti.
- Secilmemis: Beyaz dolgu, gri kenar cizgisi, gri metin.

**Urun Izgarasi (GridView):**
- 2 sutunlu, childAspectRatio: 0.64.
- Her kart: Gorsel (140dp) + Favori butonu (sag ust, overlay) + Indirim badge (sol ust) + Urun adi + Puan + Fiyat + Sepete ekle butonu.
- ListView gecisi: Sag ust ikon ile liste/izgara arasi gecs saglanir.

**Bottom Navigation:**
- 4 sekme: Ana Sayfa / Kategoriler / Favoriler / Profilim
- Material 3 NavigationBar, indicator rengi lacivert %15 opacity.

**Figma Teknikleri:**
- Auto Layout: Kart icerigi dikey istifleme, buton satiri spaceBetween
- Component Set: ProductCard (Normal / Hovered / Favorited varyantlari)
- Variant: CategoryChip (Selected / Unselected)
- Overlay: Favori ikonu icin beyaz cembersel Container
- Instance Swap: Badge component (indirim/stok durumu)

---

### 4.3 Detail Ekrani (Urun Detay)

**Amac:** Kullanicinin urun hakkinda kapsamli bilgi alip satin alma kararini vermesini saglamak.

**Tasarim Kararlari:**

**SliverAppBar (Collapsible Header):**
- Genisletilmis: 320dp yukseklikte urun gorseli, alt kisimda siyah-seffaf gradient overlay.
- Daralinca: Lacivert AppBar, urun adi, geri ikon ve paylasim ikonu.
- Karar: Gosel on plana cikar, kullanici asagi kaydirdikca navigasyon gorunur olur.

**Urun Bilgi Karti:**
- Beyaz, 20dp kavisli, golge efektli.
- Urun adi (24sp Bold), yildiz puani + yorum sayisi + stok durumu.
- Divider alt kisimda fiyat + adet secici.
- Fiyat: 26sp, Poppins ExtraBold, turuncu.
- Eski fiyat: Ustunden cizili, gri, 14sp.
- Adet secici: -/+ buton + merkez sayi, lacivert ton, 36x36dp dokunma alani.

**Tab Bar (Aciklama / Ozellikler / Yorumlar):**
- Material Underline indicator, aktif tab turuncu alt cizgi + turuncu metin.
- AnimatedSwitcher ile sekme icerigi gecis animasyonu.

**Dip Bar (Sticky Bottom):**
- Beyaz zemin, ust golge.
- Sol: Toplam hesabli fiyat (adet x birim).
- Sag: Tam genislikte "Sepete Ekle" turuncu ElevatedButton.

**Figma Teknikleri:**
- Component: StarRating (1-5 yildiz, half-star destegi)
- Variant: StockBadge (InStock / OutOfStock / LowStock)
- Variant: QuantitySelector (Default / Min / Max disabled)
- Prototype: Sekme gecisi bilesenlerinde Overlay animasyonu
- Auto Layout: Tab bar esit genislik dagitimi

---

## 5. Komponent Mimarisi

```
NovaStore Design System
├── Foundations
│   ├── Colors          (Primary, Secondary, Accent, Semantic)
│   ├── Typography      (H1-H4, Body, Caption, Button)
│   └── Spacing         (4dp grid sistemi)
│
├── Atoms
│   ├── Button          (Primary / Secondary / Outlined / Danger)
│   ├── InputField      (Default / Error / Disabled / Focus)
│   ├── Badge           (Discount / Status / Count)
│   ├── StarRating      (1-5, half-star)
│   └── Avatar          (Circle, initials)
│
├── Molecules
│   ├── ProductCard     (Grid / List varyantlari)
│   ├── CategoryChip    (Selected / Unselected)
│   ├── SearchBar       (Empty / Typing / Results)
│   └── QuantitySelector
│
└── Organisms
    ├── AppBar          (Home / Detail / Login varyantlari)
    ├── BottomNav
    ├── FeaturedBanner
    └── ReviewItem
```

---

## 6. Navigasyon ve Gecis Animasyonlari

| Gecis | Kaynaktan | Hedefe | Animasyon |
|-------|-----------|--------|-----------|
| Giris | Login | Home | Fade (500ms) |
| Urun Detay | Home | Detail | Slide Up (300ms) |
| Geri | Detail | Home | Slide Down (250ms) |
| Tab Degisimi | Home Tab | Home Tab | Cross Fade (200ms) |
| Misafir Girisi | Login | Home | Fade (300ms) |

**Karar:** Slide animasyonlari platform konvansiyonlariyla uyumludur (iOS slide-from-right). Fade gecisi onboard/login ekranlarinda daha yumusak bir hosgeldin hissi verir.

---

## 7. Erisebilirlik (Accessibility) Kararlari

- **Kontrast Orani:** Lacivert (#1A237E) uzerine beyaz metin: 12.3:1 (WCAG AAA)
- **Kontrast Orani:** Turuncu (#FF6D00) uzerine beyaz metin: 3.2:1 (WCAG AA Normal)
- **Dokunma Alani:** Tum interaktif elemanlar minimum 44x44dp (Apple HIG & Material standardi)
- **Semantik:** Ikonlara content description/label eklenmistir
- **Boyut:** Metin min. 12sp, kritik metinler 14sp uzeri

---

## 8. Responsive Davranis

| Cihaz | Ekran Genisligi | GridView Sutun |
|-------|-----------------|----------------|
| Small Phone | 320dp | 2 sutun |
| Normal Phone | 360-414dp | 2 sutun |
| Large Phone | 428dp+ | 2 sutun |
| Tablet | 768dp+ | 3 sutun (gelecek surum) |

---

## 9. Figma Dosya Yapisi

```
NovaStore - Batuhan Tasdemir
├── 📐 Design System
│   ├── Colors & Styles
│   ├── Typography
│   └── Component Library
│
├── 📱 Mobile Screens
│   ├── 01 - Login Screen
│   ├── 02 - Home Screen
│   └── 03 - Product Detail
│
└── 📋 Prototype Flow
    └── Login → Home → Detail → Home
```

---

*Hazirlayan: Batuhan Tasdemir | Staj Bitirme Projesi | Nisan 2026*
