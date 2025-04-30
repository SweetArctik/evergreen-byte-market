
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, ChevronRight } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

const PurchaseHistoryPage = () => {
  const { orders } = useOrders();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Filter orders to show only the current user's orders
  const userOrders = isAuthenticated ? orders.filter(order => order.userId === user?.id) : [];

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16">
          <h1 className="text-3xl font-bold text-white mb-8">Purchase History</h1>
          
          <div className="text-center py-16 bg-darkCharcoal border border-forestGreen/20 rounded-lg">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">No Purchase History</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't made any purchases yet. Browse our products and place your first order!
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
        <h1 className="text-3xl font-bold text-white mb-8">Purchase History</h1>
        
        <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-gray-400 mb-4">
              Your recent orders are displayed below. Click on an order to view more details.
            </p>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-forestGreen/5">
                    <TableHead className="text-forestGreen">Order ID</TableHead>
                    <TableHead className="text-forestGreen">Date</TableHead>
                    <TableHead className="text-forestGreen">Total</TableHead>
                    <TableHead className="text-forestGreen">Status</TableHead>
                    <TableHead className="text-forestGreen">Items</TableHead>
                    <TableHead className="text-forestGreen text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-forestGreen/5 border-t border-forestGreen/10">
                      <TableCell className="font-medium text-white">{order.id}</TableCell>
                      <TableCell className="text-gray-300">{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-gray-300">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Processing' ? 'bg-yellow-900/20 text-yellow-500' : 
                          order.status === 'Shipped' ? 'bg-blue-900/20 text-blue-400' : 
                          order.status === 'Delivered' ? 'bg-green-900/20 text-green-500' : 
                          'bg-red-900/20 text-red-500'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-forestGreen hover:text-lightGreen hover:bg-transparent"
                        >
                          View Details <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
