
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, ChevronRight } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AccountSidebar from '@/components/account/AccountSidebar';

const MyOrdersPage = () => {
  const { orders } = useOrders();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Filter orders to show only the current user's orders
  const userOrders = isAuthenticated ? orders.filter(order => order.userId === user?.id) : [];
  
  // Get the selected order details
  const selectedOrder = selectedOrderId ? orders.find(order => order.id === selectedOrderId) : null;

  if (!user) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">My Orders</h1>
            <p className="text-gray-400">Please log in to view your orders.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-16">
        <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/3">
            <AccountSidebar activeTab="orders" />
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            {userOrders.length === 0 ? (
              <div className="text-center py-16 bg-darkCharcoal border border-forestGreen/20 rounded-lg">
                <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">No Orders Yet</h2>
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
            ) : (
              <>
                <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg overflow-hidden mb-6">
                  <div className="p-6 border-b border-forestGreen/20">
                    <h2 className="text-xl font-semibold text-white">Order History</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-forestGreen/5">
                          <TableHead className="text-forestGreen">Order ID</TableHead>
                          <TableHead className="text-forestGreen">Date</TableHead>
                          <TableHead className="text-forestGreen">Total</TableHead>
                          <TableHead className="text-forestGreen">Status</TableHead>
                          <TableHead className="text-forestGreen text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userOrders.map((order) => (
                          <TableRow 
                            key={order.id} 
                            className={`hover:bg-forestGreen/5 border-t border-forestGreen/10 ${
                              selectedOrderId === order.id ? 'bg-forestGreen/5' : ''
                            }`}
                          >
                            <TableCell className="font-medium text-white">{order.id.substring(0, 8)}...</TableCell>
                            <TableCell className="text-gray-300">{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-gray-300">${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`px-2 py-1 ${
                                order.status === 'Processing' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 
                                order.status === 'Shipped' ? 'border-blue-400 bg-blue-400/10 text-blue-400' : 
                                order.status === 'Delivered' ? 'border-green-500 bg-green-500/10 text-green-500' : 
                                'border-red-500 bg-red-500/10 text-red-500'
                              }`}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-forestGreen hover:text-lightGreen hover:bg-transparent"
                                onClick={() => setSelectedOrderId(selectedOrderId === order.id ? null : order.id)}
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
                
                {/* Order Details */}
                {selectedOrder && (
                  <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-forestGreen/20">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Order #{selectedOrder.id.substring(0, 8)}</h3>
                        <Badge variant="outline" className={`px-2 py-1 ${
                          selectedOrder.status === 'Processing' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 
                          selectedOrder.status === 'Shipped' ? 'border-blue-400 bg-blue-400/10 text-blue-400' : 
                          selectedOrder.status === 'Delivered' ? 'border-green-500 bg-green-500/10 text-green-500' : 
                          'border-red-500 bg-red-500/10 text-red-500'
                        }`}>
                          {selectedOrder.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Placed on {new Date(selectedOrder.date).toLocaleString()}</p>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-white font-medium mb-3">Items</h4>
                      <div className="space-y-4">
                        {selectedOrder.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between border-b border-forestGreen/10 pb-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-forestGreen/10 rounded flex items-center justify-center mr-4">
                                <Package className="h-6 w-6 text-forestGreen" />
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-forestGreen/10">
                        <h4 className="text-white font-medium mb-3">Shipping Details</h4>
                        <div className="bg-forestGreen/5 rounded-lg p-4">
                          <p className="text-white">{selectedOrder.shippingDetails.fullName}</p>
                          <p className="text-gray-400">{selectedOrder.shippingDetails.email}</p>
                          <p className="text-gray-400 mt-2">{selectedOrder.shippingDetails.address}</p>
                          <p className="text-gray-400">{selectedOrder.shippingDetails.city}, {selectedOrder.shippingDetails.state} {selectedOrder.shippingDetails.zipCode}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-forestGreen/10">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Subtotal:</span>
                          <span className="text-white">${selectedOrder.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Shipping:</span>
                          <span className="text-white">$0.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4">
                          <span className="text-white">Total:</span>
                          <span className="text-forestGreen">${selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
