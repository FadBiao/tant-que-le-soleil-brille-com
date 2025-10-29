import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Club from "./pages/Club";
import Podcasts from "./pages/Podcasts";
import TicketVerify from "./pages/TicketVerify";
import TicketSuccess from "./pages/TicketSuccess";
import AdminCheckin from "./pages/AdminCheckin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/club" element={<Club />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/ticket/verify" element={<TicketVerify />} />
          <Route path="/ticket/success" element={<TicketSuccess />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin/checkin" element={<AdminCheckin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
