
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { OrdersProvider } from "@/hooks/useOrders";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Pages
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";
import MyAccountPage from "./pages/MyAccountPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:category" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
                  <Route path="/account" element={<MyAccountPage />} />
                  <Route path="/orders" element={<MyOrdersPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </TooltipProvider>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
