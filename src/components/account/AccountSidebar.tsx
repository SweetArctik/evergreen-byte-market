
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { User, ShieldCheck, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AccountSidebarProps {
  activeTab?: 'account' | 'orders';
}

const AccountSidebar = ({ activeTab = 'account' }: AccountSidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-forestGreen/20">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-forestGreen/20 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-forestGreen" />
          </div>
          <div>
            <h3 className="font-medium text-white">{user.firstName} {user.lastName}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <nav className="space-y-2">
          <Link 
            to="/account" 
            className={`flex items-center gap-2 p-3 rounded-lg ${
              activeTab === 'account'
                ? 'bg-forestGreen/10 text-forestGreen'
                : 'text-gray-400 hover:bg-forestGreen/5 hover:text-forestGreen'
            } transition-colors`}
          >
            <User className="h-5 w-5" />
            <span>Account Details</span>
          </Link>
          <Link 
            to="/orders" 
            className={`flex items-center gap-2 p-3 rounded-lg ${
              activeTab === 'orders'
                ? 'bg-forestGreen/10 text-forestGreen'
                : 'text-gray-400 hover:bg-forestGreen/5 hover:text-forestGreen'
            } transition-colors`}
          >
            <ShieldCheck className="h-5 w-5" />
            <span>My Orders</span>
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t border-forestGreen/20">
        <Button 
          onClick={logout} 
          variant="outline" 
          className="w-full border-forestGreen/20 text-red-400 hover:text-red-300 hover:bg-red-900/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default AccountSidebar;
