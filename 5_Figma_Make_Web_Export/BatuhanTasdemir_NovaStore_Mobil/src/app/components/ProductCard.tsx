import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router";
import type { Product } from "../data/products";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Added ${product.name} to cart`);
    // Add to cart logic
  };

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/detail/${product.id}`)}
    >
      <div className="relative h-[140px] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
        {product.badge && (
          <div className="absolute top-2 left-2 bg-[#FF6D00] text-white px-2 py-1 rounded-md text-[11px] font-semibold">
            {product.badge}
          </div>
        )}
      </div>
      
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-[13px] text-[#1C1C1E] line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#FF6D00] font-bold text-base">
              ₺{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-gray-400 text-xs line-through">
                ₺{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 bg-[#1A237E] rounded-lg flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}