import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Assessment from "@/pages/Assessment";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AssessmentProvider } from "./context/AssessmentContext";
import PersonalitySystemValidator from "./test/runValidation";
import { useEffect } from "react";

function Router() {
  const [location, setLocation] = useLocation();
  
  // Authentication guard for assessment page
  useEffect(() => {
    // In a real app, this would check for a valid session or token
    // For now, this is a simplified version that redirects to signup
    // if the user is not authenticated
    const isLoggedIn = false; // Replace with actual auth check
    if (location === "/assessment" && !isLoggedIn) {
      setLocation("/signup");
    }
  }, [location]);

  // Determine if we should hide header/footer (for login/signup pages)
  const hideHeaderFooter = ["/login", "/signup"].includes(location);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className={`flex-grow ${hideHeaderFooter ? "" : "mt-16"}`}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/assessment" component={Assessment} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/test/validation" component={PersonalitySystemValidator} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AssessmentProvider>
          <Toaster />
          <Router />
        </AssessmentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
