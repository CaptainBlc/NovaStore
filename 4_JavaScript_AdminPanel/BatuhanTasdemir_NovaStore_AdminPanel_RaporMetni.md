## NovaStore – JavaScript (React) Admin Panel Raporu
**Hazırlayan:** Batuhan Taşdemir  
**Tarih:** Nisan 2026  
**Teknoloji:** React + Tailwind CSS

---

## 1) Proje Tanımı ve Amaç
Bu modül, NovaStore e‑ticaret platformu için yönetim arayüzü (Admin Panel) geliştirmek amacıyla hazırlanmıştır. Amaç; modern JavaScript ekosistemi ile bir frontend projesi geliştirmek ve eğitim kapsamında beklenen temel işlemleri (Ekle/Listele/Güncelle/Sil) tek bir uygulamada uygulamaktır.

---

## 2) Modül Kapsamı (CRUD + Yönetim Sayfaları)
Uygulamada aşağıdaki ekranlar/özellikler bulunmaktadır:
- **Dashboard**: İstatistik kartları ve grafiklerle genel durum özeti
- **Ürün Yönetimi**:
  - Ürün listesi (arama, filtreleme, tablo)
  - Ürün ekleme (form + doğrulama + görsel önizleme)
  - Ürün düzenleme (modal üzerinden inline düzenleme)
  - Ürün silme (onay diyaloğu ile)
- **Siparişler**: Sipariş listesi ve durumların renk kodlaması
- **Müşteriler**: Müşteri listesi ve harcama özeti

---

## 3) Teknik Stack
- **React 18**: Arayüz geliştirme
- **React Router**: Sayfa yönlendirme
- **Context API**: Ürün CRUD state yönetimi
- **Tailwind CSS**: Stil ve layout
- **Recharts**: Grafik bileşenleri
- **react-hot-toast**: Bildirimler

---

## 4) Uygulama Mimarisi ve Klasör Yapısı
`4_JavaScript_AdminPanel/novastore-admin/src` altında:
- `App.jsx`: Router ve layout
- `context/ProductContext.jsx`: CRUD state yönetimi
- `components/*`: Sidebar, StatCard, ProductModal
- `pages/*`: Dashboard, Products, AddProduct, Orders, Customers

Bu yapı ile “Pages / Components / Context” ayrımı sağlanmış; tekrar eden UI parçaları bileşenleştirilmiş; veri yönetimi tek bir global context üzerinden yönetilmiştir.

---

## 5) Kurulum ve Çalıştırma
Proje dizininde:
- `npm install`
- `npm start`

Uygulama varsayılan olarak `http://localhost:3000` üzerinde çalışır.

Production build:
- `npm run build` (Netlify vb. ortamlara deploy edilebilir)

---

## 6) Teslim / Yayın Bilgisi
Bu rapor, projenin yerel çalıştırılabilir halini ve kaynak kodunu temel alır.
- **GitHub Repo**: (projeye eklenmediyse daha sonra eklenebilir)
- **Netlify URL**: (projeye eklenmediyse daha sonra eklenebilir)

---

## 7) Sonuç
NovaStore Admin Panel modülü ile React üzerinde CRUD işlemleri, sayfa yönlendirme, component tabanlı UI geliştirme ve temel state yönetimi pratik edilmiştir. Uygulama, eğitim yönergesindeki temel gereksinimleri kapsayacak şekilde kurgulanmıştır.

