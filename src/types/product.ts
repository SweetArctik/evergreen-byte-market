
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  imageUrl: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  features?: string[];
  specs?: {
    [key: string]: string | number;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}
