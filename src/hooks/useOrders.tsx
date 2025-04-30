
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

export interface OrderItem extends Product {
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
  date: string;
  userId?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Failed to parse orders from localStorage:', error);
        localStorage.removeItem('orders');
      }
    }
  }, []);

  // Update localStorage when orders change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(currentOrders => [order, ...currentOrders]);
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrder,
      getOrderById
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
