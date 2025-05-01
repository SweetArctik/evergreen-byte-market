
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyCartMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-16">
        <div className="text-center py-16">
          <Package size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Nothing to Checkout</h1>
          <p className="text-gray-400 mb-8">
            Your cart is empty. Please add products before proceeding to checkout.
          </p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-forestGreen hover:bg-darkGreen text-white"
          >
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
