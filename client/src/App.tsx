import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Assessment from "@/pages/Assessment";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AssessmentProvider } from "./context/AssessmentContext";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/assessment" component={Assessment} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AssessmentProvider>
          <Router />
        </AssessmentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
