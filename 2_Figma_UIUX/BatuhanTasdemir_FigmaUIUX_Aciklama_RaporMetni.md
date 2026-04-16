# Batuhan Taşdemir – NovaStore | Figma UI/UX Açıklama Raporu (Word Metni)
**Tarih:** Nisan 2026  
**Platform:** Mobil (iOS & Android)  
**Ekranlar:** Login / Home / Detail  

---

## 1) Proje Tanımı
Bu çalışma, Figma UI/UX & Web Tasarımı eğitimi bitirme projesi kapsamında hazırlanmış mobil arayüz tasarımıdır. Projede “NovaStore” isimli e‑ticaret konsepti seçilerek kullanıcı akışı bulunan üç ekranlık (Giriş, Ana Sayfa, Detay) bir arayüz üretilmiştir. Tasarımın temel amacı yalnızca estetik ekranlar oluşturmak değil; Figma’da öğrenilen **Grid**, **Auto Layout**, **Component** ve **Variant** gibi özellikleri kullanarak sürdürülebilir ve geliştirilebilir bir tasarım sistemi kurmaktır.

Kullanıcı akışı şu şekilde kurgulanmıştır:
**Login → Home → Detail → (Back) Home**.  
Login ekranından kullanıcı “Giriş Yap” ile ana sayfaya geçer, Home ekranında ürün kartına tıklayarak Detay ekranına gider, Detay ekranından geri butonu ile Home’a döner.

---

## 2) Tasarımın Amacı
NovaStore arayüzü; kullanıcıların ürünleri hızlı keşfedebilmesi, arayüzde yönünü kaybetmeden kategori ve arama ile filtreleyebilmesi ve ürün detayında satın alma kararını destekleyecek bilgi hiyerarşisini açıkça görebilmesi hedefiyle tasarlanmıştır.

Bu doğrultuda:
- **Giriş ekranı**: Minimum alanla hızlı giriş / misafir devam et seçenekleri sunar (friction azaltma).
- **Ana sayfa**: Arama + kategori filtreleri + ürün grid yapısı ile keşfi hızlandırır.
- **Detay**: Büyük görsel + fiyat/puan/stok + açıklama/özellikler gibi içerikleri bölümleyerek karar sürecini destekler; “Sepete Ekle” aksiyonu alt alanda sürekli erişilebilir tutulur.

---

## 3) Renk Seçimi
Tasarımda sınırlı sayıda renk kullanılarak hiyerarşik bir sistem kurulmuştur ve **60‑30‑10** yaklaşımı uygulanmıştır:
- **%60 – Arka plan / yüzey:** `#F5F7FA` (açık gri‑beyaz)
- **%30 – Birincil kurumsal renk:** `#1A237E` (koyu lacivert)
- **%10 – Vurgu/CTA rengi:** `#FF6D00` (turuncu)

**Gerekçe:** Lacivert; güven, kurumsallık ve yüksek okunabilirlik sağlar. Turuncu vurgu rengi ise fiyat, indirim ve CTA (Sepete Ekle/Giriş Yap) gibi kritik noktalarda kullanıcı dikkatini eyleme yönlendirmek için kullanılmıştır.

Destekleyici semantik renkler:
- **Başarı / stok durumu:** `#34C759`
- **Hata / uyarı:** `#FF3B30`
- **Ana metin:** `#1C1C1E`
- **İkincil metin / placeholder:** `#8E8E93`

---

## 4) Tipografi
**Typeface:** Poppins (Google Fonts)  
**Gerekçe:** Modern, geometrik ve mobil ekranda okunabilir bir font ailesidir; Türkçe karakter desteği güçlüdür. Ekranlar arası tutarlılık için sınırlı boyut/weight seti kullanılmıştır.

Kullanım seti (özet):
- **Başlık (H1/H2):** 22–32sp, Bold/SemiBold (ekran ve kart başlıkları)
- **Body:** 14sp, Regular (açıklama metinleri)
- **Caption:** 11–12sp, Medium (puan, stok, yardımcı metin)
- **Button:** 16sp, SemiBold (aksiyon butonları)

---

## 5) Genel Tasarım Yaklaşımı
Tasarım yaklaşımı; **grid tabanlı hizalama**, **tutarlı boşluk sistemi** ve **tekrar eden bileşenlerin component olarak kurgulanması** üzerine kuruludur.

### 5.1 Grid, hizalama ve spacing
Yerleşimde “ölçüye dayalı” tutarlılık hedeflenmiştir:
- Kenar boşlukları ve aralıklar düzenli bir sistemle yönetilmiştir (ör. 4/8/12/16dp gibi katmanlı spacing).
- Serbest hizalama yerine grid ve kılavuzlar kullanılarak elemanlar aynı eksenlerde toplanmıştır.

### 5.2 Ekran bazlı kararlar (kısa)
- **Login:** Gradient arka plan + tek odak (form kartı). “Misafir devam et” ile kullanıcıya hızlı giriş alternatifi.
- **Home:** AppBar altında arama alanı, ardından banner ve kategori chip’leri ile keşif; ürünler 2 sütunlu grid ile taranabilirlik sağlar.
- **Detail:** Büyük görsel header ile ürün vurgusu; fiyat/puan/stok aynı blokta; içerik sekmelerle bölünür; “Sepete Ekle” alt bar’da sabit.

---

## 6) Figma Özelliklerinin Kullanım Amacı
Bu bölümde Figma’nın proje için kritik özellikleri ne amaçla kullanıldığıyla özetlenmiştir.

### 6.1 Auto Layout
**Amaç:** Tasarımın esnek/ölçeklenebilir olması, içerik uzadığında bozulmaması ve tekrar kullanılabilir bloklar üretmek.

Kullanım örnekleri:
- Form kartı içinde elemanların dikey istiflenmesi (başlık, açıklama, inputlar, butonlar).
- Ürün kartı içeriğinde metin ve aksiyon alanlarının düzenli hizalanması.
- Kategori chip’lerinde padding/spacing’in otomatik yönetilmesi.
- Tab bar gibi eşit dağılım gereken satırlarda tutarlı genişlik paylaşımı.

### 6.2 Component
**Amaç:** Tekrarlanan UI parçalarını standartlaştırmak, ekranlar arası tutarlılığı korumak, tasarım değişikliklerini tek noktadan yönetmek.

Component örnekleri:
- **InputField** (email/şifre alanları)
- **Button** (Primary/Secondary stiller)
- **ProductCard** (ürün kartı)
- **CategoryChip** (kategori filtreleri)
- **TabItem** (detay ekranı sekmeleri)

### 6.3 Variant
**Amaç:** Aynı component’in farklı durumlarını tek bir component set içinde yönetmek; etkileşim/durum tasarımlarını hızlıca üretmek.

Variant örnekleri:
- Button: Primary / Secondary / Disabled (gerekli durumlar)
- InputField: Default / Focus / Error / Disabled
- CategoryChip: Selected / Unselected
- ProductCard: Normal / Favorited

### 6.4 Prototype (akış)
**Amaç:** Kullanıcı akışını doğrulamak ve ekran geçişlerini anlaşılır kılmak.
- Login → Home
- Home → Detail
- Detail → Home (geri)

---

## Sonuç
NovaStore mobil arayüz tasarımı; üç ekranlık akış üzerinde, grid ve spacing kurallarına bağlı kalarak; Auto Layout ile esnek, Component/Variant yaklaşımıyla sürdürülebilir bir tasarım sistemi kurmayı hedeflemiştir. Böylece proje, yönergede istenen Figma özelliklerinin pratik kullanımını gösteren, düzenli ve geliştirilebilir bir UI/UX çıktısı sunmaktadır.

