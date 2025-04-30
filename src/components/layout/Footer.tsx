
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-darkCharcoal border-t border-forestGreen/20 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-forestGreen rounded-md flex items-center justify-center">
                <span className="text-white font-bold">PC</span>
              </div>
              <span className="text-xl font-bold text-white">TechHub</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for high-quality PC components. Build your dream computer with us.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/processors" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  Processors
                </Link>
              </li>
              <li>
                <Link to="/products/memory" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  RAM Memory
                </Link>
              </li>
              <li>
                <Link to="/products/storage" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  Storage
                </Link>
              </li>
              <li>
                <Link to="/products/graphics-cards" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  Graphics Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-charcoal border border-forestGreen/20 text-sm rounded-l-md w-full px-4 py-2 text-white focus:outline-none focus:border-forestGreen"
              />
              <button type="submit" className="bg-forestGreen hover:bg-darkGreen text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-forestGreen/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PCTechHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-forestGreen text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
