export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  badge?: string;
  discount?: string;
  description: string;
  stock: number;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Kablosuz Kulaklık",
    price: 1299,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1578517581165-61ec5ab27a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc3NjI3NzE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 1234,
    category: "Elektronik",
    badge: "ÇOK SATAN",
    discount: "-28%",
    description: "Aktif gürültü önleme özelliği ile kristal netliğinde ses kalitesi. 30 saate kadar kesintisiz müzik keyfi.",
    stock: 45,
    features: [
      "Aktif gürültü önleme (ANC)",
      "30 saat pil ömrü",
      "Bluetooth 5.3",
      "Hızlı şarj desteği",
      "Premium deri yastıklar"
    ]
  },
  {
    id: 2,
    name: "Akıllı Telefon Pro",
    price: 24999,
    image: "https://images.unsplash.com/photo-1729514552992-91c78b07a88a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwcHJvZHVjdCUyMHdoaXRlfGVufDF8fHx8MTc3NjMzNDE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 3456,
    category: "Telefon",
    badge: "YENİ",
    description: "Gelişmiş kamera sistemi ve yıldırım hızında performans. 6.7 inç OLED ekran.",
    stock: 23,
    features: [
      "6.7\" OLED Ekran",
      "128GB Depolama",
      "48MP Ana Kamera",
      "5000mAh Batarya",
      "5G Desteği"
    ]
  },
  {
    id: 3,
    name: "Akıllı Saat Ultra",
    price: 3499,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1633339257099-3697720c2c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzYyNDU4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 892,
    category: "Aksesuar",
    discount: "-19%",
    description: "Sağlık takibi ve fitness özellikleriyle donatılmış akıllı saat. Su geçirmez tasarım.",
    stock: 67,
    features: [
      "Kalp ritmi takibi",
      "GPS entegrasyonu",
      "Su geçirmez (5ATM)",
      "7 gün pil ömrü",
      "100+ spor modu"
    ]
  },
  {
    id: 4,
    name: "Ultra İnce Dizüstü",
    price: 18999,
    image: "https://images.unsplash.com/photo-1736616967588-d81fcd6f4d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2MjU5OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviews: 567,
    category: "Bilgisayar",
    description: "Profesyonel iş gücü için tasarlanmış ultra ince ve hafif dizüstü bilgisayar.",
    stock: 12,
    features: [
      "Intel Core i7 işlemci",
      "16GB RAM",
      "512GB SSD",
      "14\" Full HD ekran",
      "10 saat pil ömrü"
    ]
  },
  {
    id: 5,
    name: "Profesyonel Fotoğraf Makinesi",
    price: 12499,
    originalPrice: 14999,
    image: "https://images.unsplash.com/photo-1632222623518-bbbd5f1f2489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc2MzM0MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 1789,
    category: "Kamera",
    badge: "ÖNERİLEN",
    discount: "-17%",
    description: "24.2MP sensör ve 4K video kaydı. Profesyonel fotoğrafçılar için ideal.",
    stock: 8,
    features: [
      "24.2MP CMOS Sensör",
      "4K Video Kaydı",
      "WiFi & Bluetooth",
      "Hızlı otofokus",
      "Çift hafıza kartı yuvası"
    ]
  },
  {
    id: 6,
    name: "Premium Tablet Pro",
    price: 8999,
    image: "https://images.unsplash.com/photo-1714071803623-9594e3b77862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBwcm9kdWN0fGVufDF8fHx8MTc3NjMzNDE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviews: 654,
    category: "Tablet",
    description: "İş ve eğlence için mükemmel. Kalem desteği ile yaratıcılığınızı ortaya çıkarın.",
    stock: 34,
    features: [
      "11\" Retina Ekran",
      "256GB Depolama",
      "Apple Pencil desteği",
      "Stereo hoparlörler",
      "Face ID"
    ]
  }
];

export const categories = [
  "Tümü",
  "Elektronik",
  "Telefon",
  "Bilgisayar",
  "Aksesuar",
  "Kamera",
  "Tablet"
];
