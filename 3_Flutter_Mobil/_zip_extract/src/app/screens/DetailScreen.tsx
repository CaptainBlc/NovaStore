import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Heart, Share2, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { TabItem } from "../components/TabItem";
import { products } from "../data/products";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function DetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Ürün bulunamadı</div>;
  }

  const totalPrice = product.price * quantity;

  const handleShare = () => {
    console.log("Share product:", product.name);
    // Could implement Web Share API here
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch((error) => console.log("Error sharing:", error));
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity}x ${product.name} to cart`);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Mobile Container */}
      <div className="max-w-[393px] mx-auto bg-[#F5F7FA] relative">
        {/* Large Image Header */}
        <div className="relative h-80 bg-gray-100">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
          
          {/* Top Actions */}
          <button
            onClick={() => navigate("/home")}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-[#1C1C1E]" />
          </button>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
            <button onClick={handleShare} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute bottom-4 left-4 bg-[#FF6D00] text-white px-3 py-1.5 rounded-full text-sm font-bold">
              {product.discount}
            </div>
          )}
        </div>

        {/* Product Info Card */}
        <div className="bg-white rounded-t-[20px] shadow-lg -mt-4 relative z-10 p-6 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-[#1C1C1E] mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-[#1C1C1E]">
                  {product.rating}
                </span>
                <span className="text-sm text-gray-400">
                  ({product.reviews} değerlendirme)
                </span>
              </div>
              <div className="px-3 py-1 bg-green-50 text-[#34C759] text-xs font-semibold rounded-full">
                Stokta: {product.stock}
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#FF6D00] font-bold text-2xl">
                ₺{product.price.toLocaleString()}
              </div>
              {product.originalPrice && (
                <div className="text-gray-400 text-sm line-through">
                  ₺{product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"
              >
                <Minus className="w-4 h-4 text-[#1C1C1E]" />
              </button>
              <span className="text-base font-semibold text-[#1C1C1E] w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#1C1C1E]" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="bg-white px-6 flex gap-4 border-b border-gray-200">
          <TabItem
            label="Açıklama"
            isActive={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          />
          <TabItem
            label="Özellikler"
            isActive={activeTab === "features"}
            onClick={() => setActiveTab("features")}
          />
          <TabItem
            label="Yorumlar"
            isActive={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white px-6 py-6 min-h-[300px] mb-24">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
          
          {activeTab === "features" && (
            <div className="space-y-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF6D00] rounded-full mt-2" />
                  <p className="text-sm text-gray-600 flex-1">{feature}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "reviews" && (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Henüz değerlendirme bulunmuyor
              </p>
            </div>
          )}
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.08)] z-50">
          <div className="max-w-[393px] mx-auto px-6 py-4 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Toplam</p>
              <p className="text-[#FF6D00] font-bold text-xl">
                ₺{totalPrice.toLocaleString()}
              </p>
            </div>
            <button onClick={handleAddToCart} className="flex-1 h-12 bg-[#FF6D00] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#FF8A33] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}