// JSON simulasyonu - Gercek uygulamada API'den gelir
// Batuhan Tasdemir - NovaStore Staj Projesi

import '../models/product.dart';

class ProductsData {
  static const List<Category> categories = [
    Category(id: 0,  name: 'Tumu',          icon: 'grid_view'),
    Category(id: 1,  name: 'Elektronik',    icon: 'devices'),
    Category(id: 2,  name: 'Giyim',         icon: 'checkroom'),
    Category(id: 3,  name: 'Ev ve Yasam',   icon: 'home'),
    Category(id: 4,  name: 'Spor',          icon: 'sports_basketball'),
    Category(id: 5,  name: 'Kitap',         icon: 'menu_book'),
  ];

  // JSON veri simulasyonu
  static final List<Map<String, dynamic>> _rawJson = [
    {
      'id': 1, 'categoryId': 1,
      'name': 'Samsung Galaxy S24',
      'description': 'Samsung Galaxy S24, yapay zeka destekli kamerasi, SnapDragon 8 Gen 3 islemiicisi ve 6.2 inc Dynamic AMOLED ekraniyla fotografcilik ve performansta yeni bir cag aciyor. 256GB depolama, 50MP ana kamera ve 25W hizli sarj destegi ile bir adim onde.',
      'price': 24999.0, 'oldPrice': 27999.0,
      'stock': 45, 'rating': 4.8, 'reviewCount': 312,
      'imageUrl': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      'isFeatured': true,
    },
    {
      'id': 2, 'categoryId': 1,
      'name': 'Apple iPhone 15',
      'description': 'iPhone 15, A16 Bionic cipi ve 48MP ana kamerasi ile mukemmel bir deneyim sunar. Dynamic Island ozelligi, USB-C portu ve Ceramic Shield on camla dayaniklilik ve yenilik bir arada. 128GB depolama kapasitesi.',
      'price': 39999.0, 'oldPrice': null,
      'stock': 30, 'rating': 4.9, 'reviewCount': 528,
      'imageUrl': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      'isFeatured': true,
    },
    {
      'id': 3, 'categoryId': 1,
      'name': 'Logitech MX Master 3',
      'description': 'Profesyonel is istasyonlari icin tasarlanan MX Master 3, yatay ve dikey kaydirma ozellikleri, 4000 DPI hassasiyet ve 70 gunluk pil omruyle uretkenliginizi en ust seviyeye cikarir.',
      'price': 2899.0, 'oldPrice': 3299.0,
      'stock': 120, 'rating': 4.7, 'reviewCount': 189,
      'imageUrl': 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      'isFeatured': false,
    },
    {
      'id': 4, 'categoryId': 1,
      'name': 'Sony WH-1000XM5',
      'description': 'Sektordeki en iyi gurultu onleme teknolojisiyle donatiilan WH-1000XM5, 30 saat pil omru, HD ses kalitesi ve konfor odakli tasarimiyla uzun yolculuklarin vazgecilmez arkadasi.',
      'price': 7499.0, 'oldPrice': 8999.0,
      'stock': 60, 'rating': 4.8, 'reviewCount': 274,
      'imageUrl': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
      'isFeatured': true,
    },
    {
      'id': 5, 'categoryId': 1,
      'name': 'Apple MacBook Air M2',
      'description': 'M2 cipi ile donandirilmis MacBook Air, fanless tasarimi sayesinde tamamen sessiz calisir. 13.6 inc Liquid Retina ekran, 18 saate kadar pil omru ve 8GB unified memory ile tasinabirlik ve guc bir arada.',
      'price': 49999.0, 'oldPrice': 54999.0,
      'stock': 20, 'rating': 4.9, 'reviewCount': 401,
      'imageUrl': 'https://images.unsplash.com/photo-1611186871525-09c285193b57?w=400',
      'isFeatured': true,
    },
    {
      'id': 6, 'categoryId': 2,
      'name': 'Nike Air Max 270',
      'description': 'Air Max 270, tarihin en buyuk Air birimiyle maksimum konfor saglar. Hafif tasarimi, trendi yakalayan siluetiyle hem sporda hem gunluk kullanim icin idealdir. Beyaz/Siyah renk secenegi.',
      'price': 3299.0, 'oldPrice': null,
      'stock': 85, 'rating': 4.6, 'reviewCount': 156,
      'imageUrl': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      'isFeatured': false,
    },
    {
      'id': 7, 'categoryId': 2,
      'name': 'Adidas Essentials Hoodie',
      'description': 'Yumusak ic fircali kumas, raglan kollar ve kanguru cebi ile gunluk kullanim icin tasarlanan bu unisex kapsonlu sweatshirt, konfor ve stili bir araya getirir. Makinada yikama uygundur.',
      'price': 1299.0, 'oldPrice': 1599.0,
      'stock': 150, 'rating': 4.4, 'reviewCount': 89,
      'imageUrl': 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400',
      'isFeatured': false,
    },
    {
      'id': 8, 'categoryId': 2,
      'name': "Levi's 501 Original Jean",
      'description': "Levis'in efsanevi 501 modeli, %100 pamuk denim dokuma ve klasik duz kesimle zamanin otesinde bir tasarim sunar. Yuksek bel kesimi ve 5 cep detayi ile her stile uyum saglar.",
      'price': 1899.0, 'oldPrice': null,
      'stock': 95, 'rating': 4.5, 'reviewCount': 203,
      'imageUrl': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      'isFeatured': false,
    },
    {
      'id': 9, 'categoryId': 3,
      'name': 'Philips Air Fryer XXL',
      'description': '7.3 litrelik kapasitesiyle 6 kisiye kadar yemek pisiren bu hava fritozi, %90a kadar daha az yag kullanarak gevrek ve lezzetli yemekler hazirlayabilmenizi saglar. Dishwasher-safe parcalar.',
      'price': 4199.0, 'oldPrice': 5499.0,
      'stock': 40, 'rating': 4.7, 'reviewCount': 318,
      'imageUrl': 'https://images.unsplash.com/photo-1648745597483-7abc8d4e1fb3?w=400',
      'isFeatured': false,
    },
    {
      'id': 10, 'categoryId': 3,
      'name': 'IKEA KALLAX Raf Unitesi',
      'description': 'Modern ve minimalist tasarimiyla evinizin her odasina uyum saglayan KALLAX, raf kutulanyla ozellestirilebilir. 4 gozlu beyaz model, kitap, dekorasyon ve depolama icin idealdir.',
      'price': 2499.0, 'oldPrice': null,
      'stock': 25, 'rating': 4.3, 'reviewCount': 142,
      'imageUrl': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      'isFeatured': false,
    },
    {
      'id': 11, 'categoryId': 4,
      'name': 'Decathlon Yoga Mati',
      'description': 'Ekstra kalinlikta (6mm) kaymaz yuzey kaplamasi ve tasimayi kolaylastiran omuz kayisi ile birlikte gelen bu mat, yoga, pilates ve yer egzersizleri icin uygundur. PVC iceriksi, cevreye duyarli uretim.',
      'price': 349.0, 'oldPrice': 499.0,
      'stock': 200, 'rating': 4.5, 'reviewCount': 267,
      'imageUrl': 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400',
      'isFeatured': false,
    },
    {
      'id': 12, 'categoryId': 4,
      'name': 'Wilson Pro Staff Tenis Raketi',
      'description': 'Roger Federer ile birlikte gelistirilen Pro Staff serisi, karbon fiber govdesi ve 97 kafa alaniyla hassasiyet ve guc dengesi arayan ileri duzey oyuncular icin uretilmistir. 305gr agirligi.',
      'price': 5999.0, 'oldPrice': null,
      'stock': 15, 'rating': 4.8, 'reviewCount': 94,
      'imageUrl': 'https://images.unsplash.com/photo-1545809074-59472b3f5ecc?w=400',
      'isFeatured': false,
    },
    {
      'id': 13, 'categoryId': 5,
      'name': 'Atomik Aliskanliklar',
      'description': "James Clear'in dunyada 15 milyonun uzerinde satan bestseller'i, kucuk degisikliklerin nasil buyuk sonuclar dogurdugunu bilimsel verilerle ve gercek hayattan orneklerle anlatir. Turkce ceviri.",
      'price': 179.0, 'oldPrice': 229.0,
      'stock': 300, 'rating': 4.9, 'reviewCount': 872,
      'imageUrl': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      'isFeatured': true,
    },
    {
      'id': 14, 'categoryId': 5,
      'name': 'Moleskine Classic Defter A5',
      'description': 'Nokta desen sayfalari, sert kapagi ve elastik kapanma bandi ile Moleskine Classic defter, not almaktan eskiz yapmaya kadar genis bir kullanim alani sunar. 240 sayfa, ivorysoft kagit.',
      'price': 349.0, 'oldPrice': null,
      'stock': 180, 'rating': 4.6, 'reviewCount': 153,
      'imageUrl': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      'isFeatured': false,
    },
    {
      'id': 15, 'categoryId': 1,
      'name': 'Xiaomi Redmi Note 13',
      'description': 'Redmi Note 13, 108MP kamera uclusu, AMOLED ekran ve 5000mAh pil kapasitesiyle butce dostu sekmentin en guclu akilli telefonlarindan biri. 128GB depolama, 33W hizli sarj destegi.',
      'price': 8999.0, 'oldPrice': 10999.0,
      'stock': 70, 'rating': 4.5, 'reviewCount': 231,
      'imageUrl': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
      'isFeatured': false,
    },
  ];

  // JSON'dan Product listesi uret (simule edilmis API cagri)
  static Future<List<Product>> fetchProducts() async {
    // Gercek API gecikmesini simule et
    await Future.delayed(const Duration(milliseconds: 800));
    return _rawJson.map((json) => Product.fromJson(json)).toList();
  }

  static Future<List<Product>> fetchByCategory(int categoryId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    if (categoryId == 0) return fetchProducts();
    return _rawJson
        .where((json) => json['categoryId'] == categoryId)
        .map((json) => Product.fromJson(json))
        .toList();
  }

  static Future<List<Product>> fetchFeatured() async {
    await Future.delayed(const Duration(milliseconds: 400));
    return _rawJson
        .where((json) => json['isFeatured'] == true)
        .map((json) => Product.fromJson(json))
        .toList();
  }
}
