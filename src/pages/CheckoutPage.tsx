
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { CreditCard, Package } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';

const checkoutFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters' }),
  zipCode: z.string().min(5, { message: 'Zip code must be at least 5 characters' }),
  cardNumber: z.string().min(16, { message: 'Card number must be at least 16 characters' }),
  cardName: z.string().min(3, { message: 'Card name must be at least 3 characters' }),
  expDate: z.string().min(5, { message: 'Expiration date must be in MM/YY format' }),
  cvv: z.string().min(3, { message: 'CVV must be at least 3 digits' })
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

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
        status: "Processing" as const, // Fix: Use a specific literal type instead of string
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
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-16">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="bg-charcoal border-forestGreen/30 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="john.doe@example.com" 
                              {...field} 
                              className="bg-charcoal border-forestGreen/30 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123 Main St" 
                            {...field} 
                            className="bg-charcoal border-forestGreen/30 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">City</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="New York" 
                              {...field} 
                              className="bg-charcoal border-forestGreen/30 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">State</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="NY" 
                              {...field} 
                              className="bg-charcoal border-forestGreen/30 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Zip Code</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="10001" 
                              {...field} 
                              className="bg-charcoal border-forestGreen/30 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-6 border-t border-forestGreen/20">
                    <h2 className="text-xl font-bold text-white mb-6">Payment Information</h2>
                    
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Card Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="1234 5678 9012 3456" 
                              {...field} 
                              className="bg-charcoal border-forestGreen/30 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name on Card</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field} 
                                className="bg-charcoal border-forestGreen/30 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="expDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Expiration Date</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/YY" 
                                {...field} 
                                className="bg-charcoal border-forestGreen/30 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">CVV</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123" 
                                type="password"
                                {...field} 
                                className="bg-charcoal border-forestGreen/30 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                    <span className="text-white">${(getTotalPrice() * 0.07).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold mt-4 pt-4 border-t border-forestGreen/20">
                    <span className="text-white">Total</span>
                    <span className="text-forestGreen text-xl">
                      ${(getTotalPrice() + (getTotalPrice() * 0.07)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
