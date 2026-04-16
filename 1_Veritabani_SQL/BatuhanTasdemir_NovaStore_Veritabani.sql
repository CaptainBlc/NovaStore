-- ============================================================
-- NOVASTORE E-TICARET VERITABANI
-- Hazirlayan : Batuhan Tasdemir
-- Tarih      : Nisan 2026
-- Platform   : Microsoft SQL Server (T-SQL)
-- ============================================================

-- Veritabani olusturma
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'NovaStore')
BEGIN
    CREATE DATABASE NovaStore;
END
GO

USE NovaStore;
GO

-- ============================================================
-- TABLOLARI TEMIZLE (varsa)
-- ============================================================
IF OBJECT_ID('dbo.OrderDetails', 'U') IS NOT NULL DROP TABLE dbo.OrderDetails;
IF OBJECT_ID('dbo.Orders',       'U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.Products',     'U') IS NOT NULL DROP TABLE dbo.Products;
IF OBJECT_ID('dbo.Categories',   'U') IS NOT NULL DROP TABLE dbo.Categories;
IF OBJECT_ID('dbo.Customers',    'U') IS NOT NULL DROP TABLE dbo.Customers;
GO

-- ============================================================
-- 1. TABLO: Categories (Kategoriler)
-- ============================================================
CREATE TABLE Categories (
    CategoryID   INT           IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    Description  NVARCHAR(255) NULL,
    CreatedAt    DATETIME      DEFAULT GETDATE()
);
GO

-- ============================================================
-- 2. TABLO: Products (Urunler)
-- ============================================================
CREATE TABLE Products (
    ProductID    INT            IDENTITY(1,1) PRIMARY KEY,
    CategoryID   INT            NOT NULL,
    ProductName  NVARCHAR(150)  NOT NULL,
    Description  NVARCHAR(500)  NULL,
    Price        DECIMAL(10,2)  NOT NULL CHECK (Price >= 0),
    Stock        INT            NOT NULL DEFAULT 0 CHECK (Stock >= 0),
    ImageURL     NVARCHAR(300)  NULL,
    IsActive     BIT            NOT NULL DEFAULT 1,
    CreatedAt    DATETIME       DEFAULT GETDATE(),

    CONSTRAINT FK_Products_Categories
        FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
GO

-- ============================================================
-- 3. TABLO: Customers (Musteriler)
-- ============================================================
CREATE TABLE Customers (
    CustomerID  INT           IDENTITY(1,1) PRIMARY KEY,
    FirstName   NVARCHAR(100) NOT NULL,
    LastName    NVARCHAR(100) NOT NULL,
    Email       NVARCHAR(200) NOT NULL UNIQUE,
    Phone       NVARCHAR(20)  NULL,
    Address     NVARCHAR(500) NULL,
    City        NVARCHAR(100) NULL,
    CreatedAt   DATETIME      DEFAULT GETDATE()
);
GO

-- ============================================================
-- 4. TABLO: Orders (Siparisler)
-- ============================================================
CREATE TABLE Orders (
    OrderID     INT            IDENTITY(1,1) PRIMARY KEY,
    CustomerID  INT            NOT NULL,
    OrderDate   DATETIME       NOT NULL DEFAULT GETDATE(),
    TotalAmount DECIMAL(10,2)  NOT NULL DEFAULT 0,
    Status      NVARCHAR(50)   NOT NULL DEFAULT 'Beklemede'
                               CHECK (Status IN ('Beklemede','Onaylandi','Kargoda','Teslim Edildi','Iptal')),
    ShipAddress NVARCHAR(500)  NULL,
    Notes       NVARCHAR(500)  NULL,

    CONSTRAINT FK_Orders_Customers
        FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
GO

-- ============================================================
-- 5. TABLO: OrderDetails (SiparisDdetaylari)
-- ============================================================
CREATE TABLE OrderDetails (
    DetailID   INT           IDENTITY(1,1) PRIMARY KEY,
    OrderID    INT           NOT NULL,
    ProductID  INT           NOT NULL,
    Quantity   INT           NOT NULL CHECK (Quantity > 0),
    UnitPrice  DECIMAL(10,2) NOT NULL CHECK (UnitPrice >= 0),
    Discount   DECIMAL(5,2)  NOT NULL DEFAULT 0 CHECK (Discount BETWEEN 0 AND 100),

    CONSTRAINT FK_OrderDetails_Orders
        FOREIGN KEY (OrderID)   REFERENCES Orders(OrderID),
    CONSTRAINT FK_OrderDetails_Products
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
GO

-- ============================================================
-- INDEKSLER (Performans icin)
-- ============================================================
CREATE INDEX IX_Products_CategoryID   ON Products(CategoryID);
CREATE INDEX IX_Orders_CustomerID     ON Orders(CustomerID);
CREATE INDEX IX_Orders_OrderDate      ON Orders(OrderDate);
CREATE INDEX IX_OrderDetails_OrderID  ON OrderDetails(OrderID);
CREATE INDEX IX_OrderDetails_ProductID ON OrderDetails(ProductID);
GO

-- ============================================================
-- ORNEK VERI: Categories
-- ============================================================
INSERT INTO Categories (CategoryName, Description) VALUES
('Elektronik',      'Telefon, bilgisayar, aksesuar ve daha fazlasi'),
('Giyim',           'Erkek, kadin ve cocuk giyim urunleri'),
('Ev ve Yasam',     'Mobilya, mutfak ve ev dekorasyon urunleri'),
('Spor ve Outdoor', 'Spor ekipmanlari ve outdoor malzemeleri'),
('Kitap ve Kirtasiye', 'Kitaplar, defterler ve ofis malzemeleri');
GO

-- ============================================================
-- ORNEK VERI: Products
-- ============================================================
INSERT INTO Products (CategoryID, ProductName, Description, Price, Stock, ImageURL) VALUES
(1, 'Samsung Galaxy S24',        'Android akilli telefon, 256GB',                24999.00, 45,  'images/samsung_s24.jpg'),
(1, 'Apple iPhone 15',           'iOS akilli telefon, 128GB, Siyah',             39999.00, 30,  'images/iphone15.jpg'),
(1, 'Logitech MX Master 3',      'Kablosuz ergonomik mouse',                      2899.00, 120, 'images/mx_master3.jpg'),
(1, 'Sony WH-1000XM5',           'Gurultu onleyici kablosuz kulaklik',            7499.00, 60,  'images/sony_xm5.jpg'),
(1, 'Apple MacBook Air M2',      '13 inc, 8GB RAM, 256GB SSD',                   49999.00, 20,  'images/macbook_air.jpg'),
(2, 'Nike Air Max 270',          'Erkek kosu ayakkabisi, Beyaz/Siyah',            3299.00, 85,  'images/nike_airmax.jpg'),
(2, 'Adidas Essentials Hoodie',  'Unisex kapsonlu sweatshirt',                    1299.00, 150, 'images/adidas_hoodie.jpg'),
(2, 'Levi s 501 Jean',           'Erkek klasik duz kesim kot pantolon',            1899.00, 95,  'images/levis_501.jpg'),
(3, 'Philips Air Fryer XXL',     '7.3L kapasiteli yag kullanmadan pisirme',       4199.00, 40,  'images/airfryer.jpg'),
(3, 'IKEA KALLAX Raf Unitesi',   '4 gozlu beyaz raf sistemi',                     2499.00, 25,  'images/kallax.jpg'),
(4, 'Decathlon Yoga Mati',       '6mm kalinlik, kaymaz yuzey',                     349.00, 200, 'images/yoga_mat.jpg'),
(4, 'Wilson Pro Staff Tenis Raketi', 'Karbon fiber, 97 kafa alani',               5999.00, 15,  'images/wilson_racket.jpg'),
(5, 'Atomik Aliskanliklar',       'James Clear, Kisisel Gelisim',                   179.00, 300, 'images/atomik_aliskanlik.jpg'),
(5, 'Moleskine Defter A5',        'Sert kapakli nokta desen, 240 sayfa',            349.00, 180, 'images/moleskine.jpg'),
(1, 'Xiaomi Redmi Note 13',       'Android, 128GB, Mavi',                          8999.00, 70,  'images/redmi_note13.jpg');
GO

-- ============================================================
-- ORNEK VERI: Customers
-- ============================================================
INSERT INTO Customers (FirstName, LastName, Email, Phone, Address, City) VALUES
('Ahmet',    'Yilmaz',    'ahmet.yilmaz@email.com',   '05321234567', 'Baglarbasi Mah. Ataturk Cad. No:12',  'Istanbul'),
('Zeynep',   'Kaya',      'zeynep.kaya@email.com',    '05339876543', 'Cankaya Mah. Izmir Cad. No:45',       'Ankara'),
('Mehmet',   'Demir',     'mehmet.demir@email.com',   '05445556677', 'Karsiyaka Mah. Birlik Sok. No:8',     'Izmir'),
('Ayse',     'Celik',     'ayse.celik@email.com',     '05551112233', 'Muratpasa Mah. Cumhuriyet Bul. No:3', 'Antalya'),
('Emre',     'Sahin',     'emre.sahin@email.com',     '05062223344', 'Nilufer Mah. Odunluk Cad. No:67',    'Bursa'),
('Fatma',    'Arslan',    'fatma.arslan@email.com',   '05324445566', 'Seyhan Mah. Turhan Cemal Sok. No:21', 'Adana'),
('Can',      'Ozturk',    'can.ozturk@email.com',     '05357778899', 'Selcuklu Mah. Mevlana Cad. No:5',    'Konya'),
('Merve',    'Dogan',     'merve.dogan@email.com',    '05469990011', 'Atakum Mah. Ondokuz Mayis Cad. No:14','Samsun'),
('Burak',    'Aydin',     'burak.aydin@email.com',    '05323334455', 'Yunusemre Mah. Izmir Yolu No:88',     'Manisa'),
('Selin',    'Ozkan',     'selin.ozkan@email.com',    '05446667788', 'Meram Mah. Konya Cad. No:33',         'Konya');
GO

-- ============================================================
-- ORNEK VERI: Orders
-- ============================================================
INSERT INTO Orders (CustomerID, OrderDate, TotalAmount, Status, ShipAddress) VALUES
(1,  '2026-01-05 10:30:00', 27898.00, 'Teslim Edildi', 'Baglarbasi Mah. Ataturk Cad. No:12, Istanbul'),
(2,  '2026-01-12 14:15:00',  3299.00, 'Teslim Edildi', 'Cankaya Mah. Izmir Cad. No:45, Ankara'),
(3,  '2026-01-20 09:45:00',  7499.00, 'Teslim Edildi', 'Karsiyaka Mah. Birlik Sok. No:8, Izmir'),
(4,  '2026-02-03 16:00:00',  5998.00, 'Teslim Edildi', 'Muratpasa Mah. Cumhuriyet Bul. No:3, Antalya'),
(5,  '2026-02-14 11:20:00', 49999.00, 'Teslim Edildi', 'Nilufer Mah. Odunluk Cad. No:67, Bursa'),
(1,  '2026-02-28 13:30:00',  4548.00, 'Kargoda',       'Baglarbasi Mah. Ataturk Cad. No:12, Istanbul'),
(6,  '2026-03-05 08:00:00',  8999.00, 'Onaylandi',     'Seyhan Mah. Turhan Cemal Sok. No:21, Adana'),
(7,  '2026-03-10 15:45:00',  2199.00, 'Beklemede',     'Selcuklu Mah. Mevlana Cad. No:5, Konya'),
(2,  '2026-03-15 12:00:00', 24999.00, 'Onaylandi',     'Cankaya Mah. Izmir Cad. No:45, Ankara'),
(8,  '2026-03-22 17:30:00',  1299.00, 'Beklemede',     'Atakum Mah. Ondokuz Mayis Cad. No:14, Samsun'),
(3,  '2026-04-01 10:00:00', 39999.00, 'Onaylandi',     'Karsiyaka Mah. Birlik Sok. No:8, Izmir'),
(9,  '2026-04-05 14:00:00',  3648.00, 'Beklemede',     'Yunusemre Mah. Izmir Yolu No:88, Manisa'),
(10, '2026-04-08 09:15:00',  7149.00, 'Beklemede',     'Meram Mah. Konya Cad. No:33, Konya'),
(4,  '2026-04-10 11:00:00', 24999.00, 'Kargoda',       'Muratpasa Mah. Cumhuriyet Bul. No:3, Antalya'),
(5,  '2026-04-12 16:30:00',  2898.00, 'Beklemede',     'Nilufer Mah. Odunluk Cad. No:67, Bursa');
GO

-- ============================================================
-- ORNEK VERI: OrderDetails
-- ============================================================
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice, Discount) VALUES
-- Siparis 1: Samsung + Logitech Mouse
(1,  1,  1, 24999.00, 0),
(1,  3,  1,  2899.00, 0),
-- Siparis 2: Nike Ayakkabi
(2,  6,  1,  3299.00, 0),
-- Siparis 3: Sony Kulaklik
(3,  4,  1,  7499.00, 0),
-- Siparis 4: Nike x2 + Levi's
(4,  6,  1,  3299.00, 0),
(4,  8,  1,  1899.00, 10),
(4,  7,  1,  1299.00, 0),
-- Siparis 5: MacBook
(5,  5,  1, 49999.00, 0),
-- Siparis 6: Adidas Hoodie x2 + Moleskine x2
(6,  7,  2,  1299.00, 0),
(6, 14,  2,   349.00, 0),
-- Siparis 7: Xiaomi
(7, 15,  1,  8999.00, 0),
-- Siparis 8: Levi's + Adidas
(8,  8,  1,  1899.00, 0),
(8,  7,  1,  1299.00, 0),
-- Siparis 9: Samsung
(9,  1,  1, 24999.00, 0),
-- Siparis 10: Adidas Hoodie
(10, 7,  1,  1299.00, 0),
-- Siparis 11: iPhone
(11, 2,  1, 39999.00, 0),
-- Siparis 12: Yoga Mati x3 + Moleskine
(12,11,  3,   349.00, 0),
(12,14,  2,   349.00, 0),
-- Siparis 13: Sony + Yoga Mati
(13, 4,  1,  7499.00, 5),
(13,11,  1,   349.00, 0),
-- Siparis 14: Samsung
(14, 1,  1, 24999.00, 0),
-- Siparis 15: Logitech + Moleskine
(15, 3,  1,  2899.00, 0),
(15,14,  1,   349.00, 0);
GO

-- ============================================================
-- VIEW: vw_SiparisOzet (Siparis Ozet Gorunumu)
-- ============================================================
IF OBJECT_ID('dbo.vw_SiparisOzet', 'V') IS NOT NULL
    DROP VIEW dbo.vw_SiparisOzet;
GO

CREATE VIEW vw_SiparisOzet AS
SELECT
    o.OrderID                                        AS SiparisNo,
    o.OrderDate                                      AS SiparisTarihi,
    c.CustomerID                                     AS MusteriID,
    c.FirstName + ' ' + c.LastName                  AS MusteriAdSoyad,
    c.City                                           AS Sehir,
    COUNT(od.DetailID)                               AS UrunCesidi,
    SUM(od.Quantity)                                 AS ToplamAdet,
    SUM(od.Quantity * od.UnitPrice * (1 - od.Discount/100)) AS NetTutar,
    o.Status                                         AS SiparisDurumu
FROM Orders o
JOIN Customers   c  ON o.CustomerID = c.CustomerID
JOIN OrderDetails od ON o.OrderID   = od.OrderID
GROUP BY
    o.OrderID, o.OrderDate,
    c.CustomerID, c.FirstName, c.LastName, c.City,
    o.Status;
GO

-- ============================================================
-- ANALIZ SORGULARI
-- ============================================================

-- ------------------------------------------------------------
-- SORGU 1: Kategori bazli urun sayisi ve ortalama fiyat
-- (GROUP BY + HAVING)
-- ------------------------------------------------------------
SELECT
    cat.CategoryName                    AS Kategori,
    COUNT(p.ProductID)                  AS UrunSayisi,
    CAST(AVG(p.Price) AS DECIMAL(10,2)) AS OrtalamaFiyat,
    MIN(p.Price)                        AS MinFiyat,
    MAX(p.Price)                        AS MaxFiyat,
    SUM(p.Stock)                        AS ToplamStok
FROM Categories cat
LEFT JOIN Products p ON cat.CategoryID = p.CategoryID
GROUP BY cat.CategoryName
HAVING COUNT(p.ProductID) > 0
ORDER BY OrtalamaFiyat DESC;
GO

-- ------------------------------------------------------------
-- SORGU 2: En cok siparis veren musteriler (TOP 5)
-- (JOIN + GROUP BY + ORDER BY)
-- ------------------------------------------------------------
SELECT TOP 5
    c.CustomerID                                    AS MusteriID,
    c.FirstName + ' ' + c.LastName                 AS MusteriAdi,
    c.City                                          AS Sehir,
    COUNT(DISTINCT o.OrderID)                       AS SiparisSayisi,
    SUM(o.TotalAmount)                              AS ToplamHarcama,
    CAST(AVG(o.TotalAmount) AS DECIMAL(10,2))       AS OrtalamaHarcama
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName, c.City
ORDER BY ToplamHarcama DESC;
GO

-- ------------------------------------------------------------
-- SORGU 3: En cok satan urunler (satis adedi bazli)
-- (JOIN + GROUP BY + ORDER BY)
-- ------------------------------------------------------------
SELECT TOP 10
    p.ProductID                                     AS UrunID,
    p.ProductName                                   AS UrunAdi,
    cat.CategoryName                                AS Kategori,
    p.Price                                         AS BirimFiyat,
    SUM(od.Quantity)                                AS ToplamSatisMiktari,
    SUM(od.Quantity * od.UnitPrice)                 AS ToplamSatisGeliri,
    COUNT(DISTINCT od.OrderID)                      AS SiparisAdedi
FROM Products p
JOIN Categories   cat ON p.CategoryID  = cat.CategoryID
JOIN OrderDetails od  ON p.ProductID   = od.ProductID
GROUP BY p.ProductID, p.ProductName, cat.CategoryName, p.Price
ORDER BY ToplamSatisMiktari DESC;
GO

-- ------------------------------------------------------------
-- SORGU 4: Aylik siparis ve ciro raporu
-- (GROUP BY + DATEPART)
-- ------------------------------------------------------------
SELECT
    DATEPART(YEAR,  o.OrderDate)                    AS Yil,
    DATEPART(MONTH, o.OrderDate)                    AS Ay,
    DATENAME(MONTH, o.OrderDate)                    AS AyAdi,
    COUNT(DISTINCT o.OrderID)                       AS SiparisSayisi,
    COUNT(DISTINCT o.CustomerID)                    AS BenzersizMusteri,
    SUM(od.Quantity * od.UnitPrice * (1-od.Discount/100)) AS NetCiro
FROM Orders o
JOIN OrderDetails od ON o.OrderID = od.OrderID
GROUP BY
    DATEPART(YEAR,  o.OrderDate),
    DATEPART(MONTH, o.OrderDate),
    DATENAME(MONTH, o.OrderDate)
ORDER BY Yil, Ay;
GO

-- ------------------------------------------------------------
-- SORGU 5: Sehir bazli musteri ve siparis dagilimi
-- (JOIN + GROUP BY)
-- ------------------------------------------------------------
SELECT
    c.City                                          AS Sehir,
    COUNT(DISTINCT c.CustomerID)                    AS MusteriSayisi,
    COUNT(DISTINCT o.OrderID)                       AS ToplamSiparis,
    SUM(od.Quantity * od.UnitPrice * (1-od.Discount/100)) AS ToplamCiro,
    CAST(AVG(o.TotalAmount) AS DECIMAL(10,2))       AS OrtalamaSepetuTutari
FROM Customers c
LEFT JOIN Orders      o  ON c.CustomerID = o.CustomerID
LEFT JOIN OrderDetails od ON o.OrderID   = od.OrderID
GROUP BY c.City
ORDER BY ToplamCiro DESC;
GO

-- ------------------------------------------------------------
-- SORGU 6: Stok alarmı - Stoku 50'nin altindaki urunler
-- ------------------------------------------------------------
SELECT
    p.ProductID,
    p.ProductName                                   AS UrunAdi,
    cat.CategoryName                                AS Kategori,
    p.Stock                                         AS MevcutStok,
    p.Price                                         AS Fiyat,
    CASE
        WHEN p.Stock = 0     THEN 'TUKENDI'
        WHEN p.Stock < 20    THEN 'KRITIK'
        WHEN p.Stock < 50    THEN 'DUSUK'
        ELSE                      'YETERLI'
    END                                             AS StokDurumu
FROM Products p
JOIN Categories cat ON p.CategoryID = cat.CategoryID
WHERE p.Stock < 50
ORDER BY p.Stock ASC;
GO

-- ------------------------------------------------------------
-- SORGU 7: vw_SiparisOzet view'ini kullan
-- Bekleyen ve onaylanan siparisleri listele
-- ------------------------------------------------------------
SELECT *
FROM vw_SiparisOzet
WHERE SiparisDurumu IN ('Beklemede', 'Onaylandi')
ORDER BY SiparisTarihi DESC;
GO

-- ------------------------------------------------------------
-- SORGU 8: Musterinin tum siparis gecmisi (INNER JOIN zinciri)
-- ------------------------------------------------------------
SELECT
    c.FirstName + ' ' + c.LastName                 AS Musteri,
    o.OrderID                                       AS SiparisNo,
    FORMAT(o.OrderDate, 'dd.MM.yyyy')               AS Tarih,
    p.ProductName                                   AS Urun,
    od.Quantity                                     AS Adet,
    od.UnitPrice                                    AS BirimFiyat,
    od.Discount                                     AS IndirimYuzde,
    od.Quantity * od.UnitPrice * (1-od.Discount/100) AS SatirToplam,
    o.Status                                        AS Durum
FROM Customers c
JOIN Orders       o  ON c.CustomerID = o.CustomerID
JOIN OrderDetails od ON o.OrderID    = od.OrderID
JOIN Products     p  ON od.ProductID = p.ProductID
ORDER BY c.LastName, o.OrderDate DESC;
GO

-- ============================================================
-- KONTROL SORGULARI (Veri dogrulamasi)
-- ============================================================
SELECT 'Categories'   AS Tablo, COUNT(*) AS KayitSayisi FROM Categories   UNION ALL
SELECT 'Products',              COUNT(*)                FROM Products      UNION ALL
SELECT 'Customers',             COUNT(*)                FROM Customers     UNION ALL
SELECT 'Orders',                COUNT(*)                FROM Orders        UNION ALL
SELECT 'OrderDetails',          COUNT(*)                FROM OrderDetails;
GO

PRINT '=== NovaStore Veritabani basariyla olusturuldu! ===';
PRINT 'Hazirlayan: Batuhan Tasdemir';
PRINT 'Tarih: ' + CONVERT(NVARCHAR, GETDATE(), 104);
GO
