
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, ChevronLeft, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16">
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-forestGreen hover:bg-darkGreen text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-16">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <Button 
            variant="ghost" 
            className="text-forestGreen hover:text-lightGreen hover:bg-transparent"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" /> Continue Shopping
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-b border-forestGreen/20 py-6 items-center"
              >
                {/* Product Image */}
                <div className="sm:col-span-1">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-24 object-cover object-center rounded"
                    />
                  </Link>
                </div>
                
                {/* Product Info */}
                <div className="sm:col-span-1">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-white font-medium mb-1 hover:text-forestGreen transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-2">{item.brand}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="sm:col-span-1">
                  <div className="flex items-center border border-forestGreen/30 rounded-md w-fit">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-r-none text-forestGreen hover:text-white"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-10 text-center text-white">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-l-none text-forestGreen hover:text-white"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                
                {/* Price & Remove */}
                <div className="sm:col-span-1 flex flex-col sm:items-end">
                  <span className="text-white font-bold mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-400 hover:bg-transparent p-0"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} className="mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal ({getTotalItems()} items)</span>
                  <span className="text-white">${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                
                <div className="border-t border-forestGreen/20 pt-4">
                  <div className="flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-forestGreen font-bold text-lg">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-forestGreen hover:bg-darkGreen text-white"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6">
                <h3 className="font-medium text-white mb-3">Accepted Payment Methods</h3>
                <div className="flex gap-2">
                  {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                    <div 
                      key={method} 
                      className="bg-charcoal border border-forestGreen/20 rounded px-2 py-1 text-xs text-gray-300"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
