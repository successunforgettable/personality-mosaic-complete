import { useLocation } from "wouter";
import { useState } from "react";
import { Brain, Menu, X, LogIn, UserPlus, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import InfoModal from "./InfoModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [_, navigate] = useLocation();
  
  // Modal state for info messages
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    message: ""
  });
  
  // Use our authentication context
  const { user, isAuthenticated, isGuest, logout } = useAuth();
  
  // Handle logout
  const handleLogout = () => {
    userMenuOpen && setUserMenuOpen(false);
    mobileMenuOpen && setMobileMenuOpen(false);
    
    if (isGuest) {
      // Handle guest logout
      logout();
      navigate("/");
    } else {
      // Handle regular user logout
      logout();
      navigate("/");
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
              <Brain className="h-8 w-8 text-[#7c3aed]" />
              <span className="ml-2 text-xl font-semibold text-[#1e293b]">Personality Mosaic</span>
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
                              setInfoModal({
                                isOpen: true,
                                title: "Profile",
                                message: "Profile section coming soon! Complete an assessment to see your results."
                              });
                              setUserMenuOpen(false);
                            }}
                          >
                            My Profile
                          </div>
                          <div 
                            className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                            onClick={() => {
                              setInfoModal({
                                isOpen: true,
                                title: "Results",
                                message: "Take an assessment first to see your results!"
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
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <div 
                    className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b] cursor-pointer flex items-center"
                    onClick={() => navigate("/login")}
                  >
                    <LogIn className="w-4 h-4 mr-1" />
                    Sign In
                  </div>
                  <div 
                    className="bg-[#7c3aed] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#6d28d9] cursor-pointer flex items-center"
                    onClick={() => navigate("/signup")}
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Sign Up
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="p-2 rounded-md text-[#64748b] hover:text-[#1e293b] focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
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
                        setInfoModal({
                          isOpen: true,
                          title: "Profile",
                          message: "Profile section coming soon! Complete an assessment to see your results."
                        });
                        setMobileMenuOpen(false);
                      }}
                    >
                      My Profile
                    </div>
                    <div 
                      className="block px-4 py-2 text-[#64748b] cursor-pointer"
                      onClick={() => {
                        setInfoModal({
                          isOpen: true,
                          title: "Results",
                          message: "Take an assessment first to see your results!"
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
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <div 
                  className="block px-4 py-2 text-[#64748b] cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </div>
                <div 
                  className="block px-4 py-2 text-[#64748b] cursor-pointer"
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

      {/* Info Modal with consistent styling */}
      <InfoModal 
        title={infoModal.title}
        message={infoModal.message}
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
};

export default Header;