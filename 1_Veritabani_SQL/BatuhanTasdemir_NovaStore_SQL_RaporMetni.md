## NovaStore – Veritabanı ve SQL Raporu
**Hazırlayan:** Batuhan Taşdemir  
**Tarih:** Nisan 2026  
**Platform:** Microsoft SQL Server (T‑SQL)

---

## 1) Proje Tanımı ve Amaç
Bu modül, NovaStore e‑ticaret senaryosu için ilişkisel bir veritabanı tasarlamak ve yönetim için gerekli raporları SQL sorguları ile üretebilmek amacıyla hazırlanmıştır. Çalışma; tablo tasarımı (DDL), örnek veri girişi (DML), analiz raporları (DQL) ve tekrar kullanılabilir görünüm (VIEW) bileşenlerini içermektedir.

---

## 2) Veritabanı Tasarımı (DDL)
Veritabanı adı: **NovaStore**

Oluşturulan tablolar ve ilişkiler:
- **Categories**: Kategori bilgileri (PK: CategoryID)
- **Products**: Ürünler (PK: ProductID, FK: CategoryID → Categories)
- **Customers**: Müşteriler (PK: CustomerID, Email alanı UNIQUE)
- **Orders**: Siparişler (PK: OrderID, FK: CustomerID → Customers, Status CHECK)
- **OrderDetails**: Sipariş detayları (PK: DetailID, FK: OrderID → Orders, FK: ProductID → Products)

Tasarım kararları:
- Veri bütünlüğü için **PRIMARY KEY / FOREIGN KEY** ilişkileri kullanılmıştır.
- Negatif değerleri önlemek için fiyat/stok gibi alanlarda **CHECK** kısıtları eklenmiştir.
- Sipariş durumları için **CHECK (Status IN …)** ile kontrollü değer seti tanımlanmıştır.
- Sık sorgulanan alanlar için indeksler eklenmiştir (CategoryID, CustomerID, OrderDate vb.).

---

## 3) Örnek Veri Girişi (DML)
Sistemi test edebilmek için aşağıdaki örnek veriler eklenmiştir:
- Kategoriler (Elektronik, Giyim, Ev ve Yaşam, Spor ve Outdoor, Kitap ve Kırtasiye)
- Ürünler (kategori bazlı birden çok ürün; fiyat, stok ve görsel yolu alanları)
- Müşteriler (farklı şehirlerden örnek müşteri kayıtları)
- Siparişler ve sipariş detayları (farklı tarihler/durumlar; Quantity/Discount dahil)

---

## 4) View (Görünüm)
Tekrarlı uzun JOIN sorgularını azaltmak amacıyla aşağıdaki view oluşturulmuştur:
- **vw_SiparisOzet**: Sipariş No, Tarih, Müşteri, Şehir, Ürün Çeşidi, Toplam Adet, Net Tutar, Durum gibi alanları tek bir raporda birleştirir.

---

## 5) Analiz Sorguları (DQL)
Hazırlanan raporlar:
- Kategori bazlı ürün sayısı ve fiyat istatistikleri (COUNT/AVG/MIN/MAX/SUM)
- En çok sipariş veren müşteriler (TOP 5, JOIN + GROUP BY)
- En çok satan ürünler (TOP 10, satış adedi ve gelir)
- Aylık sipariş ve ciro raporu (DATEPART / DATENAME)
- Şehir bazlı müşteri ve ciro dağılımı
- Stok alarmı (50 altı stoklar için durum sınıflaması)
- View üzerinden bekleyen/onaylanan sipariş listesi
- Müşteri bazlı sipariş geçmişi (JOIN zinciri)

---

## 6) Çalıştırma Adımları
Dosya: `1_Veritabani_SQL/BatuhanTasdemir_NovaStore_Veritabani.sql`

- SQL Server Management Studio (SSMS) açılır.
- Script çalıştırılır (DB oluşturma → tablolar → örnek veriler → view → rapor sorguları).
- Son bölümdeki kontrol sorguları ile tablo kayıt sayıları doğrulanır.

---

## 7) Sonuç
Bu modül ile NovaStore senaryosu için ilişkisel veritabanı şeması kurulmuş, test verileri eklenmiş ve yönetim raporları için çeşitli SQL analizleri hazırlanmıştır. View kullanımı ile raporlama sorguları sadeleştirilmiş; kısıtlar ve indekslerle veri bütünlüğü ve performans desteklenmiştir.

