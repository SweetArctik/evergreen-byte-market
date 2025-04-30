
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products, getProductsByCategory } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, FilterX, Search } from 'lucide-react';

const ProductsPage = () => {
  const { category } = useParams<{ category?: string }>();
  
  const [filters, setFilters] = useState({
    search: '',
    brands: [] as string[],
    priceRange: [0, 1000] as [number, number],
    sort: 'featured'
  });
  
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  // Get initial products based on category or all products
  const initialProducts = category 
    ? getProductsByCategory(category) 
    : products;
  
  // Get all available brands for filtering
  const allBrands = Array.from(new Set(initialProducts.map(p => p.brand)));
  
  // Filter products based on current filters
  const filteredProducts = initialProducts.filter(product => {
    // Search filter
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    
    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(filters.sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      default: // featured
        return b.isFeatured ? 1 : -1;
    }
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({ 
      ...prev, 
      priceRange: [value[0], value[1]] as [number, number]
    }));
  };
  
  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sort: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      search: '',
      brands: [],
      priceRange: [0, 1000],
      sort: 'featured'
    });
  };
  
  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };
  
  // Get page title based on category
  const getPageTitle = () => {
    if (!category) return 'All Products';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container-custom py-10">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{getPageTitle()}</h1>
            <p className="text-gray-400">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          
          <div className="flex mt-4 md:mt-0">
            <Button
              variant="outline"
              className="mr-2 border-forestGreen/30 text-forestGreen"
              onClick={toggleFilters}
            >
              {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            <Select onValueChange={handleSortChange} value={filters.sort}>
              <SelectTrigger className="w-[180px] bg-charcoal border-forestGreen/30">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {isFiltersVisible && (
            <div className="w-full lg:w-64 flex-shrink-0 glass-card p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Filters</h2>
                <Button 
                  variant="ghost" 
                  onClick={resetFilters}
                  className="text-forestGreen hover:text-lightGreen hover:bg-transparent p-0"
                >
                  <FilterX size={16} className="mr-1" /> Reset
                </Button>
              </div>
              
              {/* Search Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Search</h3>
                <div className="relative">
                  <Input
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="bg-charcoal border-forestGreen/30 pr-8"
                  />
                  <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Brands</h3>
                <div className="space-y-2">
                  {allBrands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox 
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                        className="border-forestGreen/50 data-[state=checked]:bg-forestGreen data-[state=checked]:border-forestGreen"
                      />
                      <label 
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm text-gray-300 cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-grow">
            {sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Products Found</h3>
                <p className="text-gray-400">
                  Try adjusting your filters or search criteria.
                </p>
                <Button variant="outline" onClick={resetFilters} className="mt-4 border-forestGreen text-forestGreen">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
