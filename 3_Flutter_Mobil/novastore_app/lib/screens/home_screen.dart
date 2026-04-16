import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../models/product.dart';
import '../data/products_data.dart';
import '../widgets/product_card.dart';
import 'detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int    _selectedCategoryId = 0;
  int    _selectedNavIndex   = 0;
  bool   _isGridView         = true;
  String _searchQuery        = '';

  late Future<List<Product>> _productsFuture;
  late Future<List<Product>> _featuredFuture;

  final _searchCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _productsFuture = ProductsData.fetchProducts();
    _featuredFuture = ProductsData.fetchFeatured();
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  void _onCategoryTap(int id) {
    setState(() {
      _selectedCategoryId = id;
      _productsFuture     = ProductsData.fetchByCategory(id);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: _buildAppBar(),
      body: RefreshIndicator(
        color: AppTheme.accent,
        onRefresh: () async {
          setState(() {
            _productsFuture = ProductsData.fetchByCategory(_selectedCategoryId);
          });
        },
        child: CustomScrollView(
          slivers: [
            // Arama
            SliverToBoxAdapter(child: _buildSearchBar()),
            // Ozel Teklifler Banner
            SliverToBoxAdapter(child: _buildFeaturedBanner()),
            // Kategoriler
            SliverToBoxAdapter(child: _buildCategories()),
            // Urun listesi baslik
            SliverToBoxAdapter(child: _buildProductsHeader()),
            // Urun Izgara
            _buildProductsGrid(),
          ],
        ),
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(
      title: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.shopping_bag_rounded, color: AppTheme.accent),
          const SizedBox(width: 8),
          Text('NovaStore',
              style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w700, color: Colors.white)),
        ],
      ),
      actions: [
        Stack(
          alignment: Alignment.center,
          children: [
            IconButton(
              icon: const Icon(Icons.shopping_cart_outlined, color: Colors.white),
              onPressed: () {},
            ),
            Positioned(
              top: 8,
              right: 8,
              child: Container(
                width: 16,
                height: 16,
                decoration: const BoxDecoration(
                  color: AppTheme.accent,
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text('3',
                      style: GoogleFonts.poppins(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.w700)),
                ),
              ),
            ),
          ],
        ),
        IconButton(
          icon: const Icon(Icons.notifications_outlined, color: Colors.white),
          onPressed: () {},
        ),
      ],
    );
  }

  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: TextField(
        controller: _searchCtrl,
        onChanged: (v) => setState(() => _searchQuery = v.toLowerCase()),
        decoration: InputDecoration(
          hintText: 'Urun, kategori ara...',
          hintStyle: GoogleFonts.poppins(color: AppTheme.textLight),
          prefixIcon:
              const Icon(Icons.search, color: AppTheme.primary),
          suffixIcon: _searchQuery.isNotEmpty
              ? IconButton(
                  icon: const Icon(Icons.clear, color: AppTheme.textLight),
                  onPressed: () {
                    _searchCtrl.clear();
                    setState(() => _searchQuery = '');
                  },
                )
              : null,
        ),
      ),
    );
  }

  Widget _buildFeaturedBanner() {
    return FutureBuilder<List<Product>>(
      future: _featuredFuture,
      builder: (context, snapshot) {
        if (!snapshot.hasData) return const SizedBox(height: 8);
        final featured = snapshot.data!;

        return SizedBox(
          height: 170,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            itemCount: featured.length,
            itemBuilder: (_, i) {
              final p = featured[i];
              return GestureDetector(
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (_) => DetailScreen(product: p)),
                ),
                child: Container(
                  width: 280,
                  margin: const EdgeInsets.only(right: 12),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(18),
                    gradient: const LinearGradient(
                      colors: [AppTheme.primary, Color(0xFF3949AB)],
                    ),
                  ),
                  child: Stack(
                    children: [
                      Positioned(
                        right: 0,
                        top: 0,
                        bottom: 0,
                        child: ClipRRect(
                          borderRadius: const BorderRadius.horizontal(
                              right: Radius.circular(18)),
                          child: Image.network(
                            p.imageUrl,
                            width: 140,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) =>
                                const SizedBox(width: 140),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(18),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: AppTheme.accent,
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text('OZEL TEKLIF',
                                  style: GoogleFonts.poppins(
                                      color: Colors.white,
                                      fontSize: 10,
                                      fontWeight: FontWeight.w700)),
                            ),
                            const SizedBox(height: 8),
                            SizedBox(
                              width: 140,
                              child: Text(p.name,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: GoogleFonts.poppins(
                                      color: Colors.white,
                                      fontSize: 15,
                                      fontWeight: FontWeight.w700)),
                            ),
                            const SizedBox(height: 6),
                            Text(p.formattedPrice,
                                style: GoogleFonts.poppins(
                                    color: AppTheme.accent,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w800)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        );
      },
    );
  }

  Widget _buildCategories() {
    return SizedBox(
      height: 60,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: ProductsData.categories.length,
        itemBuilder: (_, i) {
          final cat      = ProductsData.categories[i];
          final selected = cat.id == _selectedCategoryId;
          return GestureDetector(
            onTap: () => _onCategoryTap(cat.id),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              margin: const EdgeInsets.only(right: 10),
              padding:
                  const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: selected ? AppTheme.primary : AppTheme.surface,
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  if (selected)
                    BoxShadow(
                      color: AppTheme.primary.withOpacity(0.3),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                ],
                border: Border.all(
                  color: selected
                      ? AppTheme.primary
                      : Colors.grey.shade200,
                ),
              ),
              child: Text(
                cat.name,
                style: GoogleFonts.poppins(
                  color: selected ? Colors.white : AppTheme.textLight,
                  fontWeight:
                      selected ? FontWeight.w600 : FontWeight.w400,
                  fontSize: 13,
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildProductsHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Urunler',
            style: GoogleFonts.poppins(
                fontSize: 17,
                fontWeight: FontWeight.w700,
                color: AppTheme.textDark),
          ),
          IconButton(
            icon: Icon(
              _isGridView
                  ? Icons.view_list_outlined
                  : Icons.grid_view_outlined,
              color: AppTheme.primary,
            ),
            onPressed: () => setState(() => _isGridView = !_isGridView),
          ),
        ],
      ),
    );
  }

  Widget _buildProductsGrid() {
    return FutureBuilder<List<Product>>(
      future: _productsFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const SliverFillRemaining(
            child: Center(
              child: CircularProgressIndicator(color: AppTheme.primary),
            ),
          );
        }
        if (snapshot.hasError) {
          return SliverFillRemaining(
            child: Center(
              child: Text('Hata: ${snapshot.error}',
                  style: GoogleFonts.poppins(color: AppTheme.error)),
            ),
          );
        }

        var products = snapshot.data ?? [];

        // Arama filtresi
        if (_searchQuery.isNotEmpty) {
          products = products
              .where((p) => p.name.toLowerCase().contains(_searchQuery))
              .toList();
        }

        if (products.isEmpty) {
          return SliverFillRemaining(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.search_off,
                      size: 60, color: AppTheme.textLight),
                  const SizedBox(height: 12),
                  Text('Urun bulunamadi',
                      style: GoogleFonts.poppins(
                          color: AppTheme.textLight, fontSize: 16)),
                ],
              ),
            ),
          );
        }

        if (_isGridView) {
          return SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
            sliver: SliverGrid(
              delegate: SliverChildBuilderDelegate(
                (_, i) => ProductCard(product: products[i]),
                childCount: products.length,
              ),
              gridDelegate:
                  const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 14,
                crossAxisSpacing: 14,
                childAspectRatio: 0.64,
              ),
            ),
          );
        } else {
          return SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (_, i) => Padding(
                  padding: const EdgeInsets.only(bottom: 14),
                  child: ProductCard(
                      product: products[i], isGridView: false),
                ),
                childCount: products.length,
              ),
            ),
          );
        }
      },
    );
  }

  Widget _buildBottomNav() {
    return NavigationBar(
      selectedIndex: _selectedNavIndex,
      onDestinationSelected: (i) =>
          setState(() => _selectedNavIndex = i),
      backgroundColor: Colors.white,
      indicatorColor: AppTheme.primary.withOpacity(0.15),
      destinations: const [
        NavigationDestination(
          icon: Icon(Icons.home_outlined),
          selectedIcon: Icon(Icons.home, color: AppTheme.primary),
          label: 'Ana Sayfa',
        ),
        NavigationDestination(
          icon: Icon(Icons.category_outlined),
          selectedIcon: Icon(Icons.category, color: AppTheme.primary),
          label: 'Kategoriler',
        ),
        NavigationDestination(
          icon: Icon(Icons.favorite_outline),
          selectedIcon: Icon(Icons.favorite, color: AppTheme.primary),
          label: 'Favoriler',
        ),
        NavigationDestination(
          icon: Icon(Icons.person_outline),
          selectedIcon: Icon(Icons.person, color: AppTheme.primary),
          label: 'Profilim',
        ),
      ],
    );
  }
}

