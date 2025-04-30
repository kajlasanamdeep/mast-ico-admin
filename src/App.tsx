
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/sidebar/SidebarContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import TokenManagement from "./pages/TokenManagement";
import InvestorManagement from "./pages/InvestorManagement";
import IcoSettings from "./pages/IcoSettings";
import TransactionHistory from "./pages/TransactionHistory";
import SecuritySettings from "./pages/SecuritySettings";
import CampaignManagement from "./pages/CampaignManagement";
import Notifications from "./pages/Notifications";
import KycManagement from "./pages/KycManagement";
import LegalCompliance from "./pages/LegalCompliance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="token-management" element={<TokenManagement />} />
              <Route path="investor-management" element={<InvestorManagement />} />
              <Route path="ico-settings" element={<IcoSettings />} />
              <Route path="transaction-history" element={<TransactionHistory />} />
              <Route path="security-settings" element={<SecuritySettings />} />
              <Route path="campaign-management" element={<CampaignManagement />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="kyc-management" element={<KycManagement />} />
              <Route path="legal-compliance" element={<LegalCompliance />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
