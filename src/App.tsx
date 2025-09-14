
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ExploreAgents from "./pages/ExploreAgents";
import Dashboard from "./pages/Dashboard";
import AgentDetail from "./pages/AgentDetail";
import UploadAgent from "./pages/UploadAgent";
import About from "./pages/About";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import WalletConnectModal from "./components/WalletConnectModal";
import TransactionPreviewModal from "./components/TransactionPreviewModal";
import Wallet from "./pages/Wallet";
import DemoAgent from "./pages/DemoAgent";
import AgentLicensing from "./pages/AgentLicensing";
import Tokenomics from "./pages/Tokenomics";
import Settings from "./pages/Settings";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Marketplace from "./pages/Marketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/explore" element={<ExploreAgents />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/agent/:id" element={<AgentDetail />} />
            <Route path="/upload" element={
              <ProtectedRoute>
                <UploadAgent />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/wallet" element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            } />
            <Route path="/demo" element={<DemoAgent />} />
            <Route path="/licensing" element={<AgentLicensing />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={<Payment />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
