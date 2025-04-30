
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "proc-amd-5600x",
    name: "AMD Ryzen 5 5600X",
    description: "6-core, 12-Thread Unlocked Desktop Processor with Wraith Stealth Cooler",
    price: 199.99,
    originalPrice: 299.99,
    category: "processors",
    subcategory: "desktop",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "AMD",
    rating: 4.8,
    reviewCount: 1243,
    stock: 25,
    features: [
      "6 cores and 12 processing threads",
      "4.6 GHz Max Boost",
      "35 MB of cache",
      "DDR4-3200 support",
      "For the advanced Socket AM4 platform"
    ],
    specs: {
      cores: 6,
      threads: 12,
      baseClock: 3.7,
      boostClock: 4.6,
      tdp: 65,
      socket: "AM4"
    },
    isNew: false,
    isFeatured: true,
    discount: 33
  },
  {
    id: "proc-intel-12600k",
    name: "Intel Core i5-12600K",
    description: "12th Gen Desktop Processor 10 Cores (6P+4E) with integrated graphics",
    price: 279.99,
    originalPrice: 319.99,
    category: "processors",
    subcategory: "desktop",
    imageUrl: "https://images.unsplash.com/photo-1555530134-3834018b3ef3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "Intel",
    rating: 4.7,
    reviewCount: 892,
    stock: 18,
    features: [
      "10 cores (6P+4E) and 16 threads",
      "P-core Max Turbo Frequency: 4.9 GHz",
      "E-core Max Turbo Frequency: 3.6 GHz",
      "20 MB Intel Smart Cache",
      "Integrated Intel UHD Graphics 770"
    ],
    specs: {
      cores: "10 (6P+4E)",
      threads: 16,
      baseClock: 3.7,
      boostClock: 4.9,
      tdp: 125,
      socket: "LGA1700"
    },
    isNew: true,
    isFeatured: true,
    discount: 13
  },
  {
    id: "ram-corsair-vengeance-32gb",
    name: "Corsair Vengeance RGB Pro 32GB",
    description: "DDR4 3600MHz C18 LED Desktop Memory - Black (2x16GB)",
    price: 129.99,
    originalPrice: 159.99,
    category: "memory",
    subcategory: "ddr4",
    imageUrl: "https://images.unsplash.com/photo-1562976540-9a0111c27b72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "Corsair",
    rating: 4.9,
    reviewCount: 2156,
    stock: 42,
    features: [
      "High performance DDR4 memory",
      "Dynamic multi-zone RGB lighting",
      "Custom high-performance PCB",
      "Tightly screened memory",
      "Maximum bandwidth and tight response times"
    ],
    specs: {
      capacity: "32GB (2x16GB)",
      speed: 3600,
      casLatency: 18,
      voltage: 1.35,
      heatspreader: "Aluminum"
    },
    isFeatured: true,
    discount: 19
  },
  {
    id: "ram-gskill-trident-16gb",
    name: "G.Skill Trident Z Neo 16GB",
    description: "DDR4 3600MHz C16 Desktop Memory - RGB (2x8GB)",
    price: 109.99,
    originalPrice: 124.99,
    category: "memory",
    subcategory: "ddr4",
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "G.Skill",
    rating: 4.7,
    reviewCount: 1532,
    stock: 31,
    features: [
      "Engineered for AMD Ryzen Series",
      "Trident Z Neo series DDR4 RGB memory",
      "16GB (2x8GB) dual channel kit",
      "3600MHz memory speed",
      "CL16-19-19-39 timings"
    ],
    specs: {
      capacity: "16GB (2x8GB)",
      speed: 3600,
      casLatency: 16,
      voltage: 1.35,
      heatspreader: "Aluminum with RGB"
    },
    discount: 12
  },
  {
    id: "ram-crucial-ballistix-32gb",
    name: "Crucial Ballistix RGB 32GB",
    description: "DDR4 3200MHz Desktop Gaming Memory Kit (2x16GB)",
    price: 119.99,
    originalPrice: 149.99,
    category: "memory",
    subcategory: "ddr4",
    imageUrl: "https://images.unsplash.com/photo-1563949797394-c74fc98be886?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "Crucial",
    rating: 4.6,
    reviewCount: 876,
    stock: 15,
    features: [
      "Ideal for gamers and performance enthusiasts",
      "RGB LEDs with 16 customizable light patterns",
      "XMP 2.0 support for automatic overclocking",
      "Modern aluminum heat spreader design",
      "Compatible with Intel and AMD platforms"
    ],
    specs: {
      capacity: "32GB (2x16GB)",
      speed: 3200,
      casLatency: 16,
      voltage: 1.35,
      heatspreader: "Anodized aluminum"
    },
    isNew: true,
    discount: 20
  },
  {
    id: "ram-kingston-fury-16gb",
    name: "Kingston FURY Beast 16GB",
    description: "DDR4 3200MHz Memory Kit (2x8GB)",
    price: 74.99,
    originalPrice: 89.99,
    category: "memory",
    subcategory: "ddr4",
    imageUrl: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "Kingston",
    rating: 4.5,
    reviewCount: 623,
    stock: 38,
    features: [
      "Cost-effective, high-performance DDR4 upgrade",
      "Intel XMP-ready profiles optimized for Intel chipsets",
      "Ready for AMD Ryzen",
      "Low-profile heat spreader design",
      "100% factory tested at speed"
    ],
    specs: {
      capacity: "16GB (2x8GB)",
      speed: 3200,
      casLatency: 16,
      voltage: 1.35,
      heatspreader: "Low-profile aluminum"
    },
    discount: 17
  },
  {
    id: "proc-amd-5950x",
    name: "AMD Ryzen 9 5950X",
    description: "16-core, 32-Thread Unlocked Desktop Processor",
    price: 549.99,
    originalPrice: 799.99,
    category: "processors",
    subcategory: "desktop",
    imageUrl: "https://images.unsplash.com/photo-1555618568-493728f3b096?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "AMD",
    rating: 4.9,
    reviewCount: 856,
    stock: 7,
    features: [
      "16 cores and 32 processing threads",
      "4.9 GHz Max Boost",
      "72 MB of cache",
      "DDR4-3200 support",
      "For the advanced Socket AM4 platform"
    ],
    specs: {
      cores: 16,
      threads: 32,
      baseClock: 3.4,
      boostClock: 4.9,
      tdp: 105,
      socket: "AM4"
    },
    isFeatured: true,
    discount: 31
  },
  {
    id: "proc-intel-12900k",
    name: "Intel Core i9-12900K",
    description: "12th Gen Desktop Processor 16 Cores (8P+8E) with integrated graphics",
    price: 589.99,
    originalPrice: 619.99,
    category: "processors",
    subcategory: "desktop",
    imageUrl: "https://images.unsplash.com/photo-1563952176084-cbd5780f7569?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    brand: "Intel",
    rating: 4.8,
    reviewCount: 742,
    stock: 12,
    features: [
      "16 cores (8P+8E) and 24 threads",
      "P-core Max Turbo Frequency: 5.2 GHz",
      "E-core Max Turbo Frequency: 3.9 GHz",
      "30 MB Intel Smart Cache",
      "Integrated Intel UHD Graphics 770"
    ],
    specs: {
      cores: "16 (8P+8E)",
      threads: 24,
      baseClock: 3.2,
      boostClock: 5.2,
      tdp: 125,
      socket: "LGA1700"
    },
    isNew: true,
    discount: 5
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getRelatedProducts = (id: string, count = 4): Product[] => {
  const currentProduct = getProductById(id);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.id !== id && product.category === currentProduct.category
    )
    .slice(0, count);
};
