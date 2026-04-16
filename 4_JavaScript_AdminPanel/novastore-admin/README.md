# NovaStore Admin Paneli - React
**Hazirlayan:** Batuhan Tasdemir  
**Proje:** Staj Bitirme - JavaScript Modulu  
**Tarih:** Nisan 2026

---

## Uygulama Hakkinda

NovaStore Admin Paneli, e-ticaret platformunun yonetim arayuzudur. Urun ekleme, duzenleme, silme ve listeleme (CRUD) islemlerinin yani sira siparis ve musteri yonetimini saglar.

## Ozellikler

- **Dashboard:** Istatistik kartlari, bar/pie grafikleri, envanter raporu
- **Urun Listesi:** Arama, kategori/durum filtresi, siralamali tablo, durum toggle
- **Urun Ekle:** Form dogrulama, gorsel onizleme, anlik ekleme
- **Urun Duzenle:** Modal uzerinden inline duzenleme
- **Urun Sil:** Onay dialogu ile guvenli silme
- **Siparisler:** Siparis listesi ve durum renk kodlamasi
- **Musteriler:** Musteri listesi ve harcama ozeti

## Kurulum

```bash
cd novastore-admin
npm install
npm start
```

Tarayici otomatik olarak http://localhost:3000 adresini acar.

## Production Build

```bash
npm run build
# build/ klasoru Netlify'a yuklenebilir
```

## Teknik Stack

| Teknoloji | Kullanim |
|-----------|---------|
| React 18 | UI Framework |
| React Router v6 | Sayfa yonlendirme |
| Context API + useReducer | Global state (CRUD) |
| Tailwind CSS v3 | Stil |
| Recharts | Bar + Pie grafikleri |
| react-hot-toast | Bildirim sistemi |

## Klasor Yapisi

```
src/
├── index.js              # Giris noktasi
├── index.css             # Tailwind + global stiller
├── App.jsx               # Router ve layout
├── context/
│   └── ProductContext.jsx # CRUD state yonetimi
├── components/
│   ├── Sidebar.jsx       # Sol navigasyon
│   ├── StatCard.jsx      # Dashboard istatistik karti
│   └── ProductModal.jsx  # Ekle/Duzenle modal
└── pages/
    ├── Dashboard.jsx     # Ana sayfa / grafikler
    ├── Products.jsx      # Urun listesi (CRUD)
    ├── AddProduct.jsx    # Yeni urun ekleme formu
    ├── Orders.jsx        # Siparis listesi
    └── Customers.jsx     # Musteri listesi
```
