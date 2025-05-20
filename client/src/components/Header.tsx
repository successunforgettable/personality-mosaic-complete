import { Link } from "wouter";
import { useState } from "react";
import { Brain, Menu, X, LogIn, UserPlus, User, Settings } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // This would typically come from an auth context
  const isLoggedIn = false;
  const isAdmin = false;

  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-white">
              <Brain className="h-6 w-6" />
            </div>
            <h1 className="ml-3 text-xl font-semibold text-[#1e293b]">Personality Mosaic</h1>
          </a>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/#how-it-works">
            <a className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b]">How It Works</a>
          </Link>
          <Link href="/about">
            <a className="px-3 py-2 text-sm text-[#64748b] hover:text-[#1e293b]">About</a>
          </Link>
          
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
                  <Link href="/profile">
                    <a className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc]">
                      My Profile
                    </a>
                  </Link>
                  <Link href="/results">
                    <a className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc]">
                      My Results
                    </a>
                  </Link>
                  {isAdmin && (
                    <Link href="/admin">
                      <a className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc]">
                        <Settings className="w-4 h-4 inline mr-1" />
                        Admin Dashboard
                      </a>
                    </Link>
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
              <Link href="/login">
                <a className="px-4 py-2 text-sm text-[#7c3aed] hover:text-[#6d28d9] flex items-center">
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </a>
              </Link>
              <Link href="/signup">
                <a className="px-4 py-2 bg-[#7c3aed] text-white rounded-md text-sm font-medium hover:bg-[#6d28d9] transition-all flex items-center">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Sign Up
                </a>
              </Link>
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
          <Link href="/#how-it-works">
            <a className="block px-4 py-2 text-[#64748b]">How It Works</a>
          </Link>
          <Link href="/about">
            <a className="block px-4 py-2 text-[#64748b]">About</a>
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/profile">
                <a className="block px-4 py-2 text-[#64748b]">My Profile</a>
              </Link>
              <Link href="/results">
                <a className="block px-4 py-2 text-[#64748b]">My Results</a>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                  <a className="block px-4 py-2 text-[#64748b]">Admin Dashboard</a>
                </Link>
              )}
              <button className="block w-full text-left px-4 py-2 text-[#64748b]">
                Sign Out
              </button>
            </>
          ) : (
            <div className="mt-2 px-4 flex flex-col space-y-2">
              <Link href="/login">
                <a className="px-4 py-2 text-[#7c3aed] border border-[#7c3aed] rounded-md text-center">
                  Sign In
                </a>
              </Link>
              <Link href="/signup">
                <a className="px-4 py-2 bg-[#7c3aed] text-white rounded-md text-center">
                  Sign Up
                </a>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
