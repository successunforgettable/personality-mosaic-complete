import { useLocation } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [_, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the email to your backend
    setSubscribed(true);
    setEmail("");
  };
  
  return (
    // 7.1. Create dark purple background footer
    <footer className="bg-[#4c1d95] text-gray-200 py-12 px-4 sm:px-6 mt-0">
      <div className="max-w-7xl mx-auto">
        {/* 7.6. Multi-column layout for desktop, stacked for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 7.2. Logo and copyright column */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#c4b5fd] flex items-center justify-center text-white shadow-md">
                <span className="font-bold text-lg">PM</span>
              </div>
              <h2 className="ml-3 text-xl font-semibold text-white">Personality Mosaic</h2>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Discover your unique personality through our interactive tower-based assessment system.
            </p>
            {/* Copyright information */}
            <p className="text-xs text-gray-400 pt-4">
              © {new Date().getFullYear()} Personality Mosaic<br />
              All rights reserved.
            </p>
          </div>
          
          {/* 7.3. Navigation links - split into 2 columns for better organization */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Navigation</h3>
            <ul className="space-y-3 text-sm">
              {/* 7.3.1. About */}
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/about")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/about")}
                >
                  About
                </div>
              </li>
              {/* 7.3.5. FAQ */}
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/faq")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/faq")}
                >
                  FAQ
                </div>
              </li>
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/blog")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/blog")}
                >
                  Blog
                </div>
              </li>
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/types")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/types")}
                >
                  Personality Types
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              {/* 7.3.2. Privacy Policy */}
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/privacy")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/privacy")}
                >
                  Privacy Policy
                </div>
              </li>
              {/* 7.3.3. Terms of Service */}
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/terms")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/terms")}
                >
                  Terms of Service
                </div>
              </li>
              {/* 7.3.4. Contact */}
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/contact")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/contact")}
                >
                  Contact
                </div>
              </li>
              <li>
                <div 
                  className="hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline"
                  onClick={() => navigate("/cookies")}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/cookies")}
                >
                  Cookie Policy
                </div>
              </li>
            </ul>
          </div>
          
          {/* 7.5. Email signup field */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for personality insights and updates.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-md overflow-hidden border border-[#8b5cf6]">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className="flex-grow bg-[#5b21b6] text-white placeholder:text-gray-400 px-4 py-2 text-sm focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address for newsletter"
                  />
                  <button 
                    type="submit"
                    className="bg-[#8b5cf6] px-3 flex items-center justify-center hover:bg-[#7c3aed] transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="bg-[#5b21b6] p-3 rounded-md text-sm text-white flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Thanks! We'll send updates to your inbox.
              </div>
            )}
          </div>
        </div>
        
        {/* Social media and bottom section */}
        <div className="border-t border-[#6d28d9] mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* 7.4. Social media icons with hover states */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
              aria-label="Visit our Facebook page"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
              aria-label="Visit our Twitter page"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
              aria-label="Visit our Instagram page"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-xs text-gray-400 text-center md:text-right">
            Personality Mosaic is designed to provide insights for personal growth and development.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
