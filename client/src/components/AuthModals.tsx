import { useState } from "react";
import RegistrationModal from "./RegistrationModal";
import LoginModal from "./LoginModal";
import { Button } from "@/components/ui/button";

export function AuthModals() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Switch between modals
  const openRegistration = () => {
    setIsLoginOpen(false);
    setIsRegistrationOpen(true);
  };
  
  const openLogin = () => {
    setIsRegistrationOpen(false);
    setIsLoginOpen(true);
  };
  
  return (
    <>
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegistrationOpen} 
        onOpenChange={setIsRegistrationOpen}
        onSwitchToLogin={openLogin}
      />
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onSwitchToRegister={openRegistration}
      />
      
      {/* For testing - will be removed in actual implementation */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <Button onClick={openRegistration} variant="outline">
          Test Registration
        </Button>
        <Button onClick={openLogin} variant="outline">
          Test Login
        </Button>
      </div>
    </>
  );
}

export default AuthModals;