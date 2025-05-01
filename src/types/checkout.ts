
import * as z from "zod";

export const checkoutFormSchema = z.object({
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

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
