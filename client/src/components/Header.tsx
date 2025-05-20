import { useLocation } from "wouter";
import { useState } from "react";
import { Brain, Menu, X, LogIn, UserPlus, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [_, navigate] = useLocation();
  
  // Toast notification
  const { toast } = useToast();
  
  // Use our authentication context
  const { user, isAuthenticated, isGuest, logout } = useAuth();
  
  // Handle logout
  const handleLogout = () => {
    userMenuOpen && setUserMenuOpen(false);
    mobileMenuOpen && setMobileMenuOpen(false);
    
    if (isGuest) {
      // Handle guest logout
      navigate("/");
    } else {
      // Handle authenticated user logout
      logout();
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-white">
            <Brain className="h-6 w-6" />
          </div>
          <h1 className="ml-3 text-xl font-semibold text-[#1e293b]">Personality Mosaic</h1>
          
          {/* Show login status */}
          {(isAuthenticated || isGuest) && (
            <div className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
              {isAuthenticated ? 'Logged In' : 'Guest Mode'}
            </div>
          )}
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div 
            className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b] cursor-pointer" 
            onClick={() => {
              // Navigate to home page first
              navigate("/");
              // Then scroll to the How It Works section after a small delay
              setTimeout(() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            How It Works
          </div>
          <div 
            className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b] cursor-pointer"
            onClick={() => navigate("/")}
          >
            About
          </div>
          
          {(isAuthenticated || isGuest) ? (
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b]"
              >
                <User className="w-4 h-4 mr-1" />
                <span>{isGuest ? "Guest" : "My Account"}</span>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {!isGuest && (
                    <>
                      <div 
                        className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "Profile",
                            description: "Profile section coming soon! Complete an assessment to see your results.",
                            className: "font-inter",
                          });
                          setUserMenuOpen(false);
                        }}
                      >
                        My Profile
                      </div>
                      <div 
                        className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "Results",
                            description: "Take an assessment first to see your results!",
                            className: "font-inter",
                          });
                          setUserMenuOpen(false);
                        }}
                      >
                        My Results
                      </div>
                    </>
                  )}
                  {isGuest && (
                    <div 
                      className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                      onClick={() => {
                        navigate("/signup");
                        setUserMenuOpen(false);
                      }}
                    >
                      Create Account
                    </div>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isGuest ? "Exit Guest Mode" : "Sign Out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div 
                className="px-4 py-2 text-sm text-[#7c3aed] hover:text-[#6d28d9] flex items-center cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign In
              </div>
              <div 
                className="px-4 py-2 bg-[#7c3aed] text-white rounded-md text-sm font-medium hover:bg-[#6d28d9] transition-all flex items-center cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Sign Up
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-[#64748b]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-gray-100 mt-4">
          <div 
            className="block px-4 py-2 text-[#64748b] cursor-pointer"
            onClick={() => {
              // Navigate to home page first
              navigate("/");
              // Close the mobile menu
              setMobileMenuOpen(false);
              // Then scroll to the How It Works section after a small delay
              setTimeout(() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            How It Works
          </div>
          <div 
            className="block px-4 py-2 text-[#64748b] cursor-pointer"
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
          >
            About
          </div>
          
          {(isAuthenticated || isGuest) ? (
            <>
              {!isGuest && (
                <>
                  <div 
                    className="block px-4 py-2 text-[#64748b] cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Profile",
                        description: "Profile section coming soon! Complete an assessment to see your results.",
                        className: "font-inter",
                      });
                      setMobileMenuOpen(false);
                    }}
                  >
                    My Profile
                  </div>
                  <div 
                    className="block px-4 py-2 text-[#64748b] cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Results",
                        description: "Take an assessment first to see your results!",
                        className: "font-inter",
                      });
                      setMobileMenuOpen(false);
                    }}
                  >
                    My Results
                  </div>
                </>
              )}
              {isGuest && (
                <div 
                  className="block px-4 py-2 text-[#64748b] cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                    setMobileMenuOpen(false);
                  }}
                >
                  Create Account
                </div>
              )}
              <button 
                className="block w-full text-left px-4 py-2 text-[#64748b] flex items-center"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isGuest ? "Exit Guest Mode" : "Sign Out"}
              </button>
            </>
          ) : (
            <div className="mt-2 px-4 flex flex-col space-y-2">
              <div 
                className="px-4 py-2 text-[#7c3aed] border border-[#7c3aed] rounded-md text-center cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </div>
              <div 
                className="px-4 py-2 bg-[#7c3aed] text-white rounded-md text-center cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;