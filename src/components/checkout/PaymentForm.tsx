
import React from 'react';
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CheckoutFormValues } from '@/types/checkout';

interface PaymentFormProps {
  form: ReturnType<typeof useForm<CheckoutFormValues>>;
}

const PaymentForm = ({ form }: PaymentFormProps) => {
  return (
    <>
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
    </>
  );
};

export default PaymentForm;
