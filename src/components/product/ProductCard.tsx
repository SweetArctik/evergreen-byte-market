
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const calculateDiscount = () => {
    if (!product.originalPrice) return null;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return discount > 0 ? discount : null;
  };

  const discountPercentage = calculateDiscount();

  return (
    <div className="product-card group animate-fade-in">
      {/* Product Image with Discount Badge */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {discountPercentage && (
          <div className="absolute top-3 left-3 bg-forestGreen text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
        
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-lightGreen text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-semibold mb-1 group-hover:text-forestGreen transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-400">
            {product.brand}
          </div>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1 text-gray-300">{product.rating}</span>
            <span className="text-xs ml-1 text-gray-400">({product.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <span className="text-white font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            size="icon"
            variant="ghost"
            className="bg-forestGreen/10 hover:bg-forestGreen/20 text-forestGreen rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => addItem(product)}
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
