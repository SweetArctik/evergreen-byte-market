
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { CreditCard } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { checkoutFormSchema, CheckoutFormValues } from '@/types/checkout';
import EmptyCartMessage from '@/components/checkout/EmptyCartMessage';
import OrderSummary from '@/components/checkout/OrderSummary';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: user ? `${user.firstName} ${user.lastName}` : '',
      email: user ? user.email : '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardName: '',
      expDate: '',
      cvv: ''
    }
  });

  const onSubmit = (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add products to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        id: `ORD-${Date.now()}`,
        items: items,
        total: getTotalPrice(),
        shippingDetails: {
          fullName: data.fullName,
          email: data.email,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        },
        paymentMethod: "Credit Card",
        status: "Processing" as const,
        date: new Date().toISOString(),
        userId: user?.id
      };
      
      addOrder(orderData);
      clearCart();
      
      toast({
        title: "Order Placed Successfully",
        description: `Your order #${orderData.id} has been placed successfully.`
      });
      
      navigate('/purchase-history');
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-16">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg p-6 mb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <ShippingForm form={form} />
                  
                  <div className="pt-6 border-t border-forestGreen/20">
                    <PaymentForm form={form} />
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-forestGreen hover:bg-darkGreen text-white w-full md:w-auto"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order'}
                      {isProcessing ? null : <CreditCard className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
