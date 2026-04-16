import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/product.dart';
import '../theme/app_theme.dart';

class DetailScreen extends StatefulWidget {
  final Product product;

  const DetailScreen({super.key, required this.product});

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  int  _quantity   = 1;
  bool _isFavorite = false;
  int  _selectedTab = 0; // 0=Aciklama, 1=Ozellikler, 2=Yorumlar

  @override
  Widget build(BuildContext context) {
    final p = widget.product;

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: CustomScrollView(
        slivers: [
          // Buyuk gorsel + AppBar
          _buildSliverAppBar(p),
          // Icerik
          SliverToBoxAdapter(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildProductInfo(p),
                _buildTabBar(),
                _buildTabContent(p),
                _buildRelatedSection(),
                const SizedBox(height: 100),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: _buildBottomBar(p),
    );
  }

  SliverAppBar _buildSliverAppBar(Product p) {
    return SliverAppBar(
      expandedHeight: 320,
      pinned: true,
      backgroundColor: AppTheme.primary,
      leading: IconButton(
        icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
        onPressed: () => Navigator.pop(context),
      ),
      actions: [
        IconButton(
          icon: Icon(
            _isFavorite ? Icons.favorite : Icons.favorite_border,
            color: _isFavorite ? Colors.red : Colors.white,
          ),
          onPressed: () => setState(() => _isFavorite = !_isFavorite),
        ),
        IconButton(
          icon: const Icon(Icons.share_outlined, color: Colors.white),
          onPressed: () {},
        ),
      ],
      flexibleSpace: FlexibleSpaceBar(
        background: Stack(
          fit: StackFit.expand,
          children: [
            Image.network(
              p.imageUrl,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                color: Colors.grey.shade200,
                child: const Icon(Icons.image_not_supported,
                    size: 80, color: Colors.grey),
              ),
            ),
            // Gradient overlay
            Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.transparent,
                    Colors.black26,
                  ],
                ),
              ),
            ),
            // Indirim badge
            if (p.oldPrice != null)
              Positioned(
                bottom: 16,
                left: 16,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.accent,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '%${p.discountPercent.toStringAsFixed(0)} INDIRIM',
                    style: GoogleFonts.poppins(
                      color: Colors.white,
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildProductInfo(Product p) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Urun adi
          Text(
            p.name,
            style: GoogleFonts.poppins(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: AppTheme.textDark,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 12),
          // Puan + Stok
          Row(
            children: [
              Row(
                children: List.generate(
                  5,
                  (i) => Icon(
                    i < p.rating.floor()
                        ? Icons.star_rounded
                        : (i < p.rating
                            ? Icons.star_half_rounded
                            : Icons.star_outline_rounded),
                    color: Colors.amber,
                    size: 20,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '${p.rating} (${p.reviewCount} yorum)',
                style: GoogleFonts.poppins(
                    fontSize: 13, color: AppTheme.textLight),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(
                    horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: p.isInStock
                      ? AppTheme.success.withOpacity(0.15)
                      : AppTheme.error.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  p.isInStock ? 'Stokta Var' : 'Stokta Yok',
                  style: GoogleFonts.poppins(
                    color: p.isInStock
                        ? AppTheme.success
                        : AppTheme.error,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(),
          const SizedBox(height: 16),
          // Fiyat + Adet
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    p.formattedPrice,
                    style: GoogleFonts.poppins(
                      fontSize: 26,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.accent,
                    ),
                  ),
                  if (p.oldPrice != null)
                    Text(
                      p.formattedOldPrice,
                      style: GoogleFonts.poppins(
                        fontSize: 14,
                        color: AppTheme.textLight,
                        decoration: TextDecoration.lineThrough,
                      ),
                    ),
                ],
              ),
              // Adet secici
              Row(
                children: [
                  _QuantityButton(
                    icon: Icons.remove,
                    onTap: _quantity > 1
                        ? () => setState(() => _quantity--)
                        : null,
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      '$_quantity',
                      style: GoogleFonts.poppins(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.textDark,
                      ),
                    ),
                  ),
                  _QuantityButton(
                    icon: Icons.add,
                    onTap: _quantity < p.stock
                        ? () => setState(() => _quantity++)
                        : null,
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    const tabs = ['Aciklama', 'Ozellikler', 'Yorumlar'];
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: List.generate(
          tabs.length,
          (i) => Expanded(
            child: GestureDetector(
              onTap: () => setState(() => _selectedTab = i),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(
                      color: _selectedTab == i
                          ? AppTheme.accent
                          : Colors.transparent,
                      width: 2.5,
                    ),
                  ),
                ),
                child: Text(
                  tabs[i],
                  textAlign: TextAlign.center,
                  style: GoogleFonts.poppins(
                    color: _selectedTab == i
                        ? AppTheme.accent
                        : AppTheme.textLight,
                    fontWeight: _selectedTab == i
                        ? FontWeight.w600
                        : FontWeight.w400,
                    fontSize: 14,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTabContent(Product p) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        child: _selectedTab == 0
            ? _descriptionTab(p)
            : _selectedTab == 1
                ? _specsTab(p)
                : _reviewsTab(p),
      ),
    );
  }

  Widget _descriptionTab(Product p) {
    return Text(
      p.description,
      key: const ValueKey(0),
      style: GoogleFonts.poppins(
        fontSize: 14,
        color: AppTheme.textDark,
        height: 1.7,
      ),
    );
  }

  Widget _specsTab(Product p) {
    final specs = {
      'Urun ID'       : '#${p.id}',
      'Stok'          : '${p.stock} adet',
      'Degerlendirme' : '${p.rating}/5.0',
      'Yorum Sayisi'  : '${p.reviewCount}',
      'Durum'         : p.isInStock ? 'Satista' : 'Stok Yok',
    };

    return Column(
      key: const ValueKey(1),
      children: specs.entries.map((e) {
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: AppTheme.surface,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(e.key,
                  style: GoogleFonts.poppins(
                      color: AppTheme.textLight, fontSize: 13)),
              Text(e.value,
                  style: GoogleFonts.poppins(
                      color: AppTheme.textDark,
                      fontWeight: FontWeight.w600,
                      fontSize: 13)),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _reviewsTab(Product p) {
    final reviews = [
      ('Ahmet Y.',  5, 'Harika bir urun, kesinlikle tavsiye ederim!'),
      ('Zeynep K.', 4, 'Beklentilerimi karsiladi, kaliteli.'),
      ('Mehmet D.', 5, 'Fiyat/performans acidan mukemmel.'),
    ];

    return Column(
      key: const ValueKey(2),
      children: reviews.map((r) {
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.surface,
            borderRadius: BorderRadius.circular(14),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: 18,
                    backgroundColor: AppTheme.primary.withOpacity(0.15),
                    child: Text(r.$1[0],
                        style: GoogleFonts.poppins(
                            color: AppTheme.primary,
                            fontWeight: FontWeight.w700)),
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(r.$1,
                          style: GoogleFonts.poppins(
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                              color: AppTheme.textDark)),
                      Row(
                        children: List.generate(
                          5,
                          (i) => Icon(
                            i < r.$2
                                ? Icons.star_rounded
                                : Icons.star_outline_rounded,
                            color: Colors.amber,
                            size: 14,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(r.$3,
                  style: GoogleFonts.poppins(
                      color: AppTheme.textDark, fontSize: 13, height: 1.5)),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildRelatedSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Benzer Urunler',
              style: GoogleFonts.poppins(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textDark)),
          const SizedBox(height: 12),
          SizedBox(
            height: 70,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: 4,
              itemBuilder: (_, i) => Container(
                width: 70,
                margin: const EdgeInsets.only(right: 10),
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: const Icon(Icons.image_outlined,
                    color: AppTheme.textLight),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomBar(Product p) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 20,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Row(
        children: [
          // Fiyat ozet
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Toplam',
                  style: GoogleFonts.poppins(
                      fontSize: 12, color: AppTheme.textLight)),
              Text(
                '${(p.price * _quantity).toStringAsFixed(2).replaceAll('.', ',')} TL',
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.accent,
                ),
              ),
            ],
          ),
          const SizedBox(width: 16),
          // Sepete ekle
          Expanded(
            child: ElevatedButton.icon(
              onPressed: p.isInStock
                  ? () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                              '$_quantity adet ${p.name} sepete eklendi'),
                          backgroundColor: AppTheme.success,
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    }
                  : null,
              icon: const Icon(Icons.shopping_cart_outlined),
              label: const Text('Sepete Ekle'),
            ),
          ),
        ],
      ),
    );
  }
}

class _QuantityButton extends StatelessWidget {
  final IconData  icon;
  final VoidCallback? onTap;

  const _QuantityButton({required this.icon, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: onTap != null
              ? AppTheme.primary.withOpacity(0.1)
              : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: onTap != null
                ? AppTheme.primary.withOpacity(0.3)
                : Colors.grey.shade200,
          ),
        ),
        child: Icon(icon,
            color: onTap != null ? AppTheme.primary : AppTheme.textLight,
            size: 18),
      ),
    );
  }
}
