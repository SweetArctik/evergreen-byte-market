
import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Homepage = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-charcoal to-darkCharcoal overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-forestGreen/20 to-transparent" />
          <img 
            src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover object-center opacity-20"
          />
        </div>
        <div className="container-custom h-full flex flex-col justify-center items-start relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
            Build Your <span className="text-forestGreen">Dream PC</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-xl mb-8 animate-slide-up">
            Premium components for your next custom build. From processors to memory, we've got you covered with the best tech.
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up">
            <Link to="/products">
              <Button size="lg" className="bg-forestGreen hover:bg-darkGreen text-white">
                Shop All Components
              </Button>
            </Link>
            <Link to="/products/processors">
              <Button variant="outline" size="lg" className="border-forestGreen text-forestGreen hover:bg-forestGreen hover:text-white">
                View Processors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-darkCharcoal">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Processors', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', link: '/products/processors' },
              { name: 'Memory', image: 'https://images.unsplash.com/photo-1562976540-9a0111c27b72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', link: '/products/memory' },
              { name: 'Storage', image: 'https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', link: '/products/storage' },
              { name: 'Graphics Cards', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', link: '/products/graphics-cards' }
            ].map((category, index) => (
              <Link to={category.link} key={index} className="group block">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent z-10" />
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-4 z-20">
                    <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                    <span className="inline-flex items-center text-forestGreen group-hover:text-lightGreen text-sm font-medium transition-colors">
                      Shop now <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-charcoal">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <Link to="/products" className="text-forestGreen hover:text-lightGreen flex items-center">
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* New Arrivals Section */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-darkCharcoal">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">New Arrivals</h2>
              <Link to="/products/new" className="text-forestGreen hover:text-lightGreen flex items-center">
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <ProductGrid products={newProducts} />
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 bg-charcoal">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Why Choose PCTechHub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality Components',
                description: 'We source only the highest quality PC components from trusted manufacturers.',
                icon: '🔍'
              },
              {
                title: 'Expert Support',
                description: 'Our team of tech experts is available to help you with your build questions.',
                icon: '👨‍💻'
              },
              {
                title: 'Fast Shipping',
                description: 'Quick delivery on all orders, with free shipping options available.',
                icon: '🚚'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-forestGreen/10">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest deals, new arrivals, and tech tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-charcoal border border-forestGreen/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-forestGreen"
              />
              <Button type="submit" className="bg-forestGreen hover:bg-darkGreen text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
