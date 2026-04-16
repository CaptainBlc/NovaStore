// ============================================================
// NOVASTORE VERITABANI DEMO - Node.js / SQLite
// Hazirlayan : Batuhan Tasdemir | Nisan 2026
// Aciklama   : T-SQL sorgularinin SQLite karsiligi
// Calistir   : node novastore_demo.js
// ============================================================

const Database = require('better-sqlite3');

// Bellek ici veritabani - hizli ve kurulum gerektirmez
const db = new Database(':memory:');

// Konsol renk kodlari
const C = {
  reset:  '\x1b[0m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  red:    '\x1b[31m',
  white:  '\x1b[97m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
};

function baslik(metin) {
  const cizgi = '='.repeat(64);
  console.log(`\n${C.cyan}${C.bold}${cizgi}${C.reset}`);
  console.log(`${C.cyan}${C.bold}  ${metin}${C.reset}`);
  console.log(`${C.cyan}${cizgi}${C.reset}\n`);
}

function altBaslik(metin) {
  console.log(`\n${C.yellow}${C.bold}--- ${metin} ---${C.reset}`);
}

function tablo(satirlar, basliklar) {
  if (!satirlar || satirlar.length === 0) {
    console.log(`${C.dim}  (veri yok)${C.reset}`);
    return;
  }
  const keys = basliklar || Object.keys(satirlar[0]);
  const genislikler = keys.map(k =>
    Math.max(k.length, ...satirlar.map(r => String(r[k] ?? '').length))
  );

  // Baslik
  const baslikSatiri = keys.map((k, i) => k.padEnd(genislikler[i])).join(' | ');
  const ayirici = genislikler.map(g => '-'.repeat(g)).join('-+-');
  console.log(`  ${C.bold}${baslikSatiri}${C.reset}`);
  console.log(`  ${ayirici}`);

  // Satirlar
  satirlar.forEach(r => {
    const satir = keys.map((k, i) => String(r[k] ?? '').padEnd(genislikler[i])).join(' | ');
    console.log(`  ${satir}`);
  });
  console.log(`\n  ${C.green}${satirlar.length} satir${C.reset}`);
}

// ================================================================
// VERITABANI KURULUMU
// ================================================================
baslik('NovaStore Veritabani Kuruluyor...');

db.exec(`
  CREATE TABLE Categories (
    CategoryID   INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryName TEXT NOT NULL,
    Description  TEXT,
    CreatedAt    TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE Products (
    ProductID   INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryID  INTEGER NOT NULL,
    ProductName TEXT NOT NULL,
    Description TEXT,
    Price       REAL NOT NULL CHECK(Price >= 0),
    Stock       INTEGER NOT NULL DEFAULT 0,
    IsActive    INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
  );

  CREATE TABLE Customers (
    CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName  TEXT NOT NULL,
    LastName   TEXT NOT NULL,
    Email      TEXT NOT NULL UNIQUE,
    Phone      TEXT,
    City       TEXT,
    CreatedAt  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE Orders (
    OrderID     INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerID  INTEGER NOT NULL,
    OrderDate   TEXT NOT NULL DEFAULT (datetime('now')),
    TotalAmount REAL NOT NULL DEFAULT 0,
    Status      TEXT NOT NULL DEFAULT 'Beklemede',
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
  );

  CREATE TABLE OrderDetails (
    DetailID  INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID   INTEGER NOT NULL,
    ProductID INTEGER NOT NULL,
    Quantity  INTEGER NOT NULL CHECK(Quantity > 0),
    UnitPrice REAL NOT NULL,
    Discount  REAL NOT NULL DEFAULT 0,
    FOREIGN KEY (OrderID)   REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
  );
`);

console.log(`${C.green}✓ 5 tablo olusturuldu: Categories, Products, Customers, Orders, OrderDetails${C.reset}`);

// ================================================================
// VERI EKLEME
// ================================================================
db.exec(`
  INSERT INTO Categories (CategoryName, Description) VALUES
    ('Elektronik',      'Telefon, bilgisayar, aksesuar'),
    ('Giyim',           'Erkek, kadin ve cocuk giyim'),
    ('Ev ve Yasam',     'Mobilya, mutfak, dekorasyon'),
    ('Spor',            'Spor ekipmanlari ve outdoor'),
    ('Kitap',           'Kitaplar ve kirtasiye');

  INSERT INTO Products (CategoryID, ProductName, Price, Stock) VALUES
    (1, 'Samsung Galaxy S24',     24999, 45),
    (1, 'Apple iPhone 15',        39999, 30),
    (1, 'Logitech MX Master 3',    2899, 120),
    (1, 'Sony WH-1000XM5',         7499, 60),
    (1, 'Apple MacBook Air M2',   49999, 20),
    (2, 'Nike Air Max 270',        3299, 85),
    (2, 'Adidas Essentials Hoodie',1299, 150),
    (2, 'Levis 501 Original',      1899, 95),
    (3, 'Philips Air Fryer XXL',   4199, 40),
    (3, 'IKEA KALLAX Raf',         2499, 25),
    (4, 'Decathlon Yoga Mati',      349, 200),
    (4, 'Wilson Pro Staff Raketi', 5999, 15),
    (5, 'Atomik Aliskanliklar',     179, 300),
    (5, 'Moleskine Defter A5',      349, 180),
    (1, 'Xiaomi Redmi Note 13',    8999, 70);

  INSERT INTO Customers (FirstName, LastName, Email, City) VALUES
    ('Ahmet',  'Yilmaz', 'ahmet@mail.com',  'Istanbul'),
    ('Zeynep', 'Kaya',   'zeynep@mail.com', 'Ankara'),
    ('Mehmet', 'Demir',  'mehmet@mail.com', 'Izmir'),
    ('Ayse',   'Celik',  'ayse@mail.com',   'Antalya'),
    ('Emre',   'Sahin',  'emre@mail.com',   'Bursa'),
    ('Fatma',  'Arslan', 'fatma@mail.com',  'Adana'),
    ('Can',    'Ozturk', 'can@mail.com',    'Konya'),
    ('Merve',  'Dogan',  'merve@mail.com',  'Samsun');

  INSERT INTO Orders (CustomerID, OrderDate, TotalAmount, Status) VALUES
    (1, '2026-01-05', 27898, 'Teslim Edildi'),
    (2, '2026-01-12',  3299, 'Teslim Edildi'),
    (3, '2026-01-20',  7499, 'Teslim Edildi'),
    (4, '2026-02-03',  5998, 'Teslim Edildi'),
    (5, '2026-02-14', 49999, 'Teslim Edildi'),
    (1, '2026-02-28',  4548, 'Kargoda'),
    (6, '2026-03-05',  8999, 'Onaylandi'),
    (7, '2026-03-10',  2199, 'Beklemede'),
    (2, '2026-03-15', 24999, 'Onaylandi'),
    (3, '2026-04-01', 39999, 'Onaylandi'),
    (4, '2026-04-10', 24999, 'Kargoda'),
    (5, '2026-04-12',  2898, 'Beklemede');

  INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice, Discount) VALUES
    (1,1,1,24999,0),(1,3,1,2899,0),
    (2,6,1,3299,0),
    (3,4,1,7499,0),
    (4,6,1,3299,0),(4,8,1,1899,10),(4,7,1,1299,0),
    (5,5,1,49999,0),
    (6,7,2,1299,0),(6,14,2,349,0),
    (7,15,1,8999,0),
    (8,8,1,1899,0),(8,7,1,1299,0),
    (9,1,1,24999,0),
    (10,2,1,39999,0),
    (11,1,1,24999,0),
    (12,3,1,2899,0),(12,14,1,349,0);
`);

console.log(`${C.green}✓ Ornek veriler eklendi: 5 kategori, 15 urun, 8 musteri, 12 siparis${C.reset}`);

// ================================================================
// SORGU 1: Tablo kayit sayilari
// ================================================================
baslik('SORGU 1 - Tablo Ozeti');
const tablolar = ['Categories','Products','Customers','Orders','OrderDetails'];
const sayimlar = tablolar.map(t => ({
  Tablo: t,
  KayitSayisi: db.prepare(`SELECT COUNT(*) as n FROM ${t}`).get().n
}));
tablo(sayimlar);

// ================================================================
// SORGU 2: Kategori bazli urun dagilimi (GROUP BY)
// ================================================================
baslik('SORGU 2 - Kategori Bazli Urun Dagilimi (GROUP BY)');
const kat = db.prepare(`
  SELECT
    c.CategoryName AS Kategori,
    COUNT(p.ProductID) AS UrunSayisi,
    CAST(AVG(p.Price) AS INTEGER) AS OrtalamaFiyat,
    MIN(p.Price) AS MinFiyat,
    MAX(p.Price) AS MaxFiyat,
    SUM(p.Stock) AS ToplamStok
  FROM Categories c
  LEFT JOIN Products p ON c.CategoryID = p.CategoryID
  GROUP BY c.CategoryName
  ORDER BY OrtalamaFiyat DESC
`).all();
tablo(kat);

// ================================================================
// SORGU 3: En cok harcayan musteriler TOP 5 (JOIN + GROUP BY)
// ================================================================
baslik('SORGU 3 - En Cok Harcayan Musteriler TOP 5');
const musteriler = db.prepare(`
  SELECT
    c.CustomerID AS MusteriID,
    c.FirstName || ' ' || c.LastName AS MusteriAdi,
    c.City AS Sehir,
    COUNT(DISTINCT o.OrderID) AS SiparisSayisi,
    SUM(o.TotalAmount) AS ToplamHarcama
  FROM Customers c
  JOIN Orders o ON c.CustomerID = o.CustomerID
  GROUP BY c.CustomerID, c.FirstName, c.LastName, c.City
  ORDER BY ToplamHarcama DESC
  LIMIT 5
`).all();
tablo(musteriler);

// ================================================================
// SORGU 4: En cok satan urunler (JOIN + GROUP BY + SUM)
// ================================================================
baslik('SORGU 4 - En Cok Satan Urunler');
const urunler = db.prepare(`
  SELECT
    p.ProductID AS UrunID,
    p.ProductName AS UrunAdi,
    cat.CategoryName AS Kategori,
    SUM(od.Quantity) AS ToplamSatis,
    COUNT(DISTINCT od.OrderID) AS SiparisAdedi,
    CAST(SUM(od.Quantity * od.UnitPrice) AS INTEGER) AS ToplamGelir
  FROM Products p
  JOIN Categories cat ON p.CategoryID = cat.CategoryID
  JOIN OrderDetails od ON p.ProductID = od.ProductID
  GROUP BY p.ProductID, p.ProductName, cat.CategoryName
  ORDER BY ToplamSatis DESC
  LIMIT 10
`).all();
tablo(urunler);

// ================================================================
// SORGU 5: Aylik siparis ve ciro raporu
// ================================================================
baslik('SORGU 5 - Aylik Siparis ve Ciro Raporu');
const aylik = db.prepare(`
  SELECT
    strftime('%Y', o.OrderDate) AS Yil,
    strftime('%m', o.OrderDate) AS Ay,
    COUNT(DISTINCT o.OrderID)   AS SiparisSayisi,
    COUNT(DISTINCT o.CustomerID) AS BenzersizMusteri,
    CAST(SUM(od.Quantity * od.UnitPrice * (1.0 - od.Discount/100)) AS INTEGER) AS NetCiro
  FROM Orders o
  JOIN OrderDetails od ON o.OrderID = od.OrderID
  GROUP BY Yil, Ay
  ORDER BY Yil, Ay
`).all();
tablo(aylik);

// ================================================================
// SORGU 6: Sehir bazli dagilim
// ================================================================
baslik('SORGU 6 - Sehir Bazli Musteri ve Siparis');
const sehir = db.prepare(`
  SELECT
    c.City AS Sehir,
    COUNT(DISTINCT c.CustomerID) AS MusteriSayisi,
    COUNT(DISTINCT o.OrderID)    AS ToplamSiparis,
    CAST(SUM(o.TotalAmount) AS INTEGER) AS ToplamCiro
  FROM Customers c
  LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
  GROUP BY c.City
  ORDER BY ToplamCiro DESC
`).all();
tablo(sehir);

// ================================================================
// SORGU 7: Stok alarmi - Kritik ve tukenen urunler
// ================================================================
baslik('SORGU 7 - Stok Alarmi (Stok < 50)');
const stok = db.prepare(`
  SELECT
    p.ProductID,
    p.ProductName AS UrunAdi,
    cat.CategoryName AS Kategori,
    p.Stock AS MevcutStok,
    CASE
      WHEN p.Stock = 0  THEN 'TUKENDI'
      WHEN p.Stock < 20 THEN 'KRITIK'
      WHEN p.Stock < 50 THEN 'DUSUK'
      ELSE 'YETERLI'
    END AS StokDurumu
  FROM Products p
  JOIN Categories cat ON p.CategoryID = cat.CategoryID
  WHERE p.Stock < 50
  ORDER BY p.Stock ASC
`).all();
tablo(stok);

// ================================================================
// SORGU 8: VIEW simülasyonu - Siparis ozeti
// ================================================================
baslik('SORGU 8 - vw_SiparisOzet (View Simulasyonu)');
const view = db.prepare(`
  SELECT
    o.OrderID AS SiparisNo,
    o.OrderDate AS SiparisTarihi,
    c.FirstName || ' ' || c.LastName AS MusteriAdSoyad,
    c.City AS Sehir,
    COUNT(od.DetailID) AS UrunCesidi,
    SUM(od.Quantity) AS ToplamAdet,
    CAST(SUM(od.Quantity * od.UnitPrice * (1.0-od.Discount/100)) AS INTEGER) AS NetTutar,
    o.Status AS SiparisDurumu
  FROM Orders o
  JOIN Customers c ON o.CustomerID = c.CustomerID
  JOIN OrderDetails od ON o.OrderID = od.OrderID
  GROUP BY o.OrderID
  ORDER BY o.OrderDate DESC
`).all();
tablo(view);

// ================================================================
// SORGU 9: Bekleyen ve onaylanan siparisler
// ================================================================
baslik('SORGU 9 - Aktif Siparisler (Bekleyen + Onaylanan)');
const aktif = db.prepare(`
  SELECT
    o.OrderID AS SiparisNo,
    c.FirstName || ' ' || c.LastName AS Musteri,
    c.City,
    o.OrderDate,
    o.TotalAmount AS Tutar,
    o.Status AS Durum
  FROM Orders o
  JOIN Customers c ON o.CustomerID = c.CustomerID
  WHERE o.Status IN ('Beklemede','Onaylandi')
  ORDER BY o.OrderDate DESC
`).all();
tablo(aktif);

// Sonuc
baslik('NOVASTORE VERITABANI DEMO TAMAMLANDI');
console.log(`${C.green}${C.bold}✓ Tum sorgular basariyla calistirildi!${C.reset}`);
console.log(`${C.white}  Hazirlayan: Batuhan Tasdemir${C.reset}`);
console.log(`${C.white}  Proje    : NovaStore Staj Bitirme Projesi${C.reset}`);
console.log(`${C.white}  Tarih    : Nisan 2026${C.reset}\n`);

db.close();
