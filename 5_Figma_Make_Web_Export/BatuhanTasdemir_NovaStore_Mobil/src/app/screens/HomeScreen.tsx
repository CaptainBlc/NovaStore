import { useState } from "react";
import { ShoppingBag, ShoppingCart, Bell, Search, X, Home, Heart, User, Package } from "lucide-react";
import { useNavigate } from "react-router";
import { CategoryChip } from "../components/CategoryChip";
import { ProductCard } from "../components/ProductCard";
import { products, categories } from "../data/products";

export default function HomeScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "Tümü" || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleCartClick = () => {
    console.log("Cart clicked - navigating to cart");
  };

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Mobile Container */}
      <div className="max-w-[393px] mx-auto bg-[#F5F7FA]">
        {/* Status Bar */}
        <div className="h-10 bg-[#1A237E]" />

        {/* AppBar */}
        <div className="h-14 bg-[#1A237E] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-lg">NovaStore</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleCartClick} className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6D00] rounded-full text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </button>
            <button onClick={handleNotificationClick}>
              <Bell className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="h-12 bg-white rounded-xl border-2 border-gray-200 px-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-sm text-[#1C1C1E] placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Banner */}
        <div className="px-4 mb-4">
          <div className="h-[150px] bg-gradient-to-r from-[#1A237E] to-[#303F9F] rounded-[18px] p-5 flex items-center justify-between overflow-hidden relative">
            <div className="flex-1 z-10">
              <div className="inline-block bg-[#FF6D00] text-white text-[10px] font-bold px-2 py-1 rounded mb-2">
                ÖZEL TEKLİF
              </div>
              <h3 className="text-white font-bold text-lg mb-1">
                Premium Kulaklık
              </h3>
              <p className="text-[#FF6D00] font-bold text-xl">₺1,299</p>
            </div>
            <div className="w-32 h-32 absolute -right-4 opacity-50">
              <div className="w-full h-full bg-white/10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-[393px] mx-auto h-20 px-4 flex items-center justify-around">
            <button
              onClick={() => setActiveTab("home")}
              className="flex flex-col items-center gap-1"
            >
              <div className={`p-2 rounded-2xl ${activeTab === "home" ? "bg-[#1A237E]/15" : ""}`}>
                <Home className={`w-6 h-6 ${activeTab === "home" ? "text-[#1A237E]" : "text-gray-400"}`} />
              </div>
              <span className={`text-[10px] ${activeTab === "home" ? "text-[#1A237E] font-semibold" : "text-gray-400"}`}>
                Ana Sayfa
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("favorites")}
              className="flex flex-col items-center gap-1"
            >
              <div className={`p-2 rounded-2xl ${activeTab === "favorites" ? "bg-[#1A237E]/15" : ""}`}>
                <Heart className={`w-6 h-6 ${activeTab === "favorites" ? "text-[#1A237E]" : "text-gray-400"}`} />
              </div>
              <span className={`text-[10px] ${activeTab === "favorites" ? "text-[#1A237E] font-semibold" : "text-gray-400"}`}>
                Favoriler
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("orders")}
              className="flex flex-col items-center gap-1"
            >
              <div className={`p-2 rounded-2xl ${activeTab === "orders" ? "bg-[#1A237E]/15" : ""}`}>
                <Package className={`w-6 h-6 ${activeTab === "orders" ? "text-[#1A237E]" : "text-gray-400"}`} />
              </div>
              <span className={`text-[10px] ${activeTab === "orders" ? "text-[#1A237E] font-semibold" : "text-gray-400"}`}>
                Siparişler
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center gap-1"
            >
              <div className={`p-2 rounded-2xl ${activeTab === "profile" ? "bg-[#1A237E]/15" : ""}`}>
                <User className={`w-6 h-6 ${activeTab === "profile" ? "text-[#1A237E]" : "text-gray-400"}`} />
              </div>
              <span className={`text-[10px] ${activeTab === "profile" ? "text-[#1A237E] font-semibold" : "text-gray-400"}`}>
                Profil
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}