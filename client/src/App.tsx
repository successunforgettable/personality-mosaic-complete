import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Assessment from "@/pages/Assessment";
import FixedSignUp from "@/pages/FixedSignUp";
import DirectLoginForm from "@/pages/DirectLoginForm";
import UserProfile from "@/pages/UserProfile";
import ResultsCompare from "@/pages/ResultsCompare";
import SignUp from "@/pages/FixedSignUp"; // Alias for backward compatibility
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AssessmentProvider } from "./context/AssessmentContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthModals from "@/components/AuthModals";
import PersonalitySystemValidator from "./test/runValidation";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();
  
  // Determine if we should hide header/footer (for login/signup pages)
  const hideHeaderFooter = ["/login", "/signup"].includes(location);
  // For 404 page, we want to show the header/footer
  const is404Page = !["/", "/assessment", "/signup", "/login", "/test/validation"].some(path => 
    location === path || location.startsWith(path + "/")
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className={`flex-grow ${hideHeaderFooter ? "" : "mt-16"}`}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/assessment">
            <ProtectedRoute allowGuest={true}>
              <Assessment />
            </ProtectedRoute>
          </Route>
          <Route path="/signup" component={FixedSignUp} />
          <Route path="/login" component={DirectLoginForm} />
          <Route path="/profile">
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          </Route>
          <Route path="/results/compare">
            <ProtectedRoute>
              <ResultsCompare />
            </ProtectedRoute>
          </Route>
          <Route path="/test/validation" component={PersonalitySystemValidator} />
          <Route path="/:rest*" component={NotFound} />
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
        <AuthProvider>
          <AssessmentProvider>
            <Toaster />
            <Router />
            <AuthModals />
          </AssessmentProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
