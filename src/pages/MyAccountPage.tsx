
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import AccountSidebar from '@/components/account/AccountSidebar';

const MyAccountPage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast({
      title: "Account Updated",
      description: "Your account information has been updated successfully."
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">My Account</h1>
            <p className="text-gray-400">Please log in to view your account information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-1/3">
              <AccountSidebar activeTab="account" />
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <div className="bg-darkCharcoal border border-forestGreen/20 rounded-lg">
                <div className="p-6 border-b border-forestGreen/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Account Details</h2>
                    {!isEditing && (
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        variant="outline" 
                        className="border-forestGreen/20 text-forestGreen hover:text-lightGreen hover:bg-forestGreen/5"
                      >
                        Edit Details
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium text-gray-300 block">
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-charcoal border-forestGreen/30 focus:border-forestGreen"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium text-gray-300 block">
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-charcoal border-forestGreen/30 focus:border-forestGreen"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full bg-charcoal border-forestGreen/30 focus:border-forestGreen"
                        />
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                            className="mr-2"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-forestGreen hover:bg-darkGreen text-white">
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
