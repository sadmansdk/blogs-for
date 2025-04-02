import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import CategoryPosts from "@/pages/CategoryPosts";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen cursor-pointer flex flex-col">
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Index />
                  </Layout>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <Layout>
                    <BlogPost />
                  </Layout>
                }
              />
              <Route
                path="/categories/:category"
                element={
                  <Layout>
                    <CategoryPosts />
                  </Layout>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                }
              />
            </Routes>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
