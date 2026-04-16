class Category {
  final int id;
  final String name;
  final String icon;

  const Category({required this.id, required this.name, required this.icon});
}

class Product {
  final int id;
  final int categoryId;
  final String name;
  final String description;
  final double price;
  final double? oldPrice;
  final int stock;
  final double rating;
  final int reviewCount;
  final String imageUrl;
  final bool isFavorite;
  final bool isFeatured;

  const Product({
    required this.id,
    required this.categoryId,
    required this.name,
    required this.description,
    required this.price,
    this.oldPrice,
    required this.stock,
    required this.rating,
    required this.reviewCount,
    required this.imageUrl,
    this.isFavorite = false,
    this.isFeatured = false,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id:          json['id']          as int,
      categoryId:  json['categoryId']  as int,
      name:        json['name']        as String,
      description: json['description'] as String,
      price:       (json['price'] as num).toDouble(),
      oldPrice:    json['oldPrice'] != null ? (json['oldPrice'] as num).toDouble() : null,
      stock:       json['stock']       as int,
      rating:      (json['rating'] as num).toDouble(),
      reviewCount: json['reviewCount'] as int,
      imageUrl:    json['imageUrl']    as String,
      isFeatured:  json['isFeatured']  as bool? ?? false,
    );
  }

  bool get isInStock => stock > 0;

  double get discountPercent =>
      oldPrice != null ? ((oldPrice! - price) / oldPrice! * 100) : 0;

  String get formattedPrice =>
      '${price.toStringAsFixed(2).replaceAll('.', ',')} TL';

  String get formattedOldPrice => oldPrice != null
      ? '${oldPrice!.toStringAsFixed(2).replaceAll('.', ',')} TL'
      : '';
}
