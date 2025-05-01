
import React from 'react';
import { useCart } from '@/hooks/useCart';

const OrderSummary = () => {
  const { items, getTotalPrice } = useCart();
  const taxRate = 0.07;
  const taxAmount = getTotalPrice() * taxRate;
  const totalWithTax = getTotalPrice() + taxAmount;

  return (
    <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b border-forestGreen/10 pb-2">
            <div className="flex items-center">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div>
                <p className="text-white text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        
        <div className="border-t border-forestGreen/20 pt-4 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Shipping</span>
            <span className="text-white">$0.00</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Tax</span>
            <span className="text-white">${taxAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between font-bold mt-4 pt-4 border-t border-forestGreen/20">
            <span className="text-white">Total</span>
            <span className="text-forestGreen text-xl">
              ${totalWithTax.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
