
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VoiceClaimDrawer from "./components/VoiceClaimDrawer";
import ClaimAnalysisStep from "./pages/claim-steps/ClaimAnalysisStep";
import ClaimPreviewStep from "./pages/claim-steps/ClaimPreviewStep";
import ClaimSuccessStep from "./pages/claim-steps/ClaimSuccessStep";
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
          <Route path="/voice-claim" element={<VoiceClaimDrawer />} />
          <Route path="/claim-report/analysis" element={<ClaimAnalysisStep />} />
          <Route path="/claim-report/preview" element={<ClaimPreviewStep />} />
          <Route path="/claim-report/success" element={<ClaimSuccessStep />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
