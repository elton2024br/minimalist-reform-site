
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Import pages
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Depoimentos from "./pages/Depoimentos";
import Contato from "./pages/Contato";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Import admin pages
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminContent from "./pages/admin/AdminContent";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
import AdminDepoimentos from "./pages/admin/AdminDepoimentos";
import AdminContatos from "./pages/admin/AdminContatos";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Defined as a proper function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<ProjectDetail />} />
              <Route path="/depoimentos" element={<Depoimentos />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/sobre" element={<About />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="depoimentos" element={<AdminDepoimentos />} />
                <Route path="contatos" element={<AdminContatos />} />
              </Route>
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
