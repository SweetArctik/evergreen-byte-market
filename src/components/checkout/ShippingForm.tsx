
import React from 'react';
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CheckoutFormValues } from '@/types/checkout';

interface ShippingFormProps {
  form: ReturnType<typeof useForm<CheckoutFormValues>>;
}

const ShippingForm = ({ form }: ShippingFormProps) => {
  return (
    <>
      <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
      
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
    </>
  );
};

export default ShippingForm;
