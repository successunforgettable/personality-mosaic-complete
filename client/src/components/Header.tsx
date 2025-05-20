import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Brain, Menu, X, LogIn, UserPlus, User, Settings, LogOut } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [_, navigate] = useLocation();
  
  // Check if user is logged in by looking in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const isAdmin = userData?.isAdmin || false;
  
  // Load user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("personality_mosaic_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("personality_mosaic_user");
    setIsLoggedIn(false);
    setUserData(null);
    setUserMenuOpen(false);
    
    // Redirect to home
    navigate("/");
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
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div 
            className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b] cursor-pointer" 
            onClick={() => navigate("/#how-it-works")}
          >
            How It Works
          </div>
          <div 
            className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b] cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </div>
          
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b]"
              >
                <User className="w-4 h-4 mr-1" />
                <span>My Account</span>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div 
                    className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </div>
                  <div 
                    className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                    onClick={() => navigate("/results")}
                  >
                    My Results
                  </div>
                  {isAdmin && (
                    <div 
                      className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                      onClick={() => navigate("/admin")}
                    >
                      <Settings className="w-4 h-4 inline mr-1" />
                      Admin Dashboard
                    </div>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc]">
                    Sign Out
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
              navigate("/#how-it-works");
              setMobileMenuOpen(false);
            }}
          >
            How It Works
          </div>
          <div 
            className="block px-4 py-2 text-[#64748b] cursor-pointer"
            onClick={() => {
              navigate("/about");
              setMobileMenuOpen(false);
            }}
          >
            About
          </div>
          
          {isLoggedIn ? (
            <>
              <div 
                className="block px-4 py-2 text-[#64748b] cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
              >
                My Profile
              </div>
              <div 
                className="block px-4 py-2 text-[#64748b] cursor-pointer"
                onClick={() => {
                  navigate("/results");
                  setMobileMenuOpen(false);
                }}
              >
                My Results
              </div>
              {isAdmin && (
                <div 
                  className="block px-4 py-2 text-[#64748b] cursor-pointer"
                  onClick={() => {
                    navigate("/admin");
                    setMobileMenuOpen(false);
                  }}
                >
                  Admin Dashboard
                </div>
              )}
              <button className="block w-full text-left px-4 py-2 text-[#64748b]">
                Sign Out
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
