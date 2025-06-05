
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClaimReport from "./pages/ClaimReport";
import VoiceClaimReport from "./pages/VoiceClaimReport";
import ClaimAnalysisStep from "./pages/claim-steps/ClaimAnalysisStep";
import ClaimPreviewStep from "./pages/claim-steps/ClaimPreviewStep";
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
          <Route path="/claim-report" element={<ClaimReport />} />
          <Route path="/voice-claim" element={<VoiceClaimReport />} />
          <Route path="/claim-report/analysis" element={<ClaimAnalysisStep />} />
          <Route path="/claim-report/preview" element={<ClaimPreviewStep />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
