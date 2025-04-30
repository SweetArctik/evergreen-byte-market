
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, ShoppingCart, Star, ChevronLeft } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : undefined;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} size={16} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-10">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link to="/" className="text-gray-400 hover:text-forestGreen">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/products" className="text-gray-400 hover:text-forestGreen">Products</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link 
            to={`/products/${product.category}`} 
            className="text-gray-400 hover:text-forestGreen"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-forestGreen">{product.name}</span>
        </div>
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 pl-0 text-forestGreen hover:text-lightGreen hover:bg-transparent"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Product Image */}
          <div className="bg-gradient-to-b from-darkCharcoal to-charcoal rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square p-8"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              {product.isNew && (
                <span className="inline-block bg-lightGreen text-white text-xs font-bold px-3 py-1 rounded mr-2">
                  NEW
                </span>
              )}
              {product.discount && product.discount > 0 && (
                <span className="inline-block bg-forestGreen text-white text-xs font-bold px-3 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-300">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-lg ml-3">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="text-gray-300 mb-6">{product.description}</div>
            
            <div className="flex flex-col md:flex-row items-start mb-6">
              <div className="text-sm text-gray-300 font-medium mb-2 md:mr-10 md:pt-2">
                <span className="block mb-1">Brand:</span>
                <span className="block mb-1">Category:</span>
                <span className="block">Availability:</span>
              </div>
              <div className="text-sm text-white mb-2 md:pt-2">
                <span className="block mb-1">{product.brand}</span>
                <span className="block mb-1 capitalize">{product.category}</span>
                <span className={`block ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.stock > 0 
                    ? `In Stock (${product.stock} available)` 
                    : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex border border-forestGreen/30 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none text-forestGreen hover:text-white"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center bg-transparent text-white border-x border-forestGreen/30"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-none text-forestGreen hover:text-white"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              {/* Add to Cart Button */}
              <Button
                className="bg-forestGreen hover:bg-darkGreen text-white px-10 flex-grow md:flex-grow-0"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
            
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs Section */}
        <Tabs defaultValue="specs" className="mb-16">
          <TabsList className="bg-darkCharcoal">
            {product.specs && <TabsTrigger value="specs">Specifications</TabsTrigger>}
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          {product.specs && (
            <TabsContent value="specs" className="bg-darkCharcoal p-6 rounded-md mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-forestGreen/10">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="reviews" className="bg-darkCharcoal p-6 rounded-md mt-2">
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-white font-medium">
                {product.rating} out of 5
              </span>
            </div>
            
            <p className="text-gray-300 mb-4">
              Based on {product.reviewCount} reviews
            </p>
            
            <div className="border-t border-forestGreen/10 pt-6 mt-6">
              <p className="text-gray-300">
                Customer reviews will be displayed here. This is a demo product without actual reviews.
              </p>
              <Button className="mt-4 bg-forestGreen hover:bg-darkGreen text-white">
                Write a Review
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="bg-darkCharcoal p-6 rounded-md mt-2">
            <h3 className="font-semibold text-white mb-3">Shipping Policy</h3>
            <p className="text-gray-300 mb-4">
              We offer fast and reliable shipping for all our products. Standard shipping typically takes 3-5 business days.
            </p>
            
            <h3 className="font-semibold text-white mb-3 mt-6">Return Policy</h3>
            <p className="text-gray-300 mb-4">
              If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund.
            </p>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
