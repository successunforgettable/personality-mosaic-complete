import { useLocation } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const [_, navigate] = useLocation();
  
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-white">
                <span className="font-bold">PM</span>
              </div>
              <h2 className="ml-3 text-xl font-semibold text-white">Personality Mosaic</h2>
            </div>
            <p className="text-sm text-gray-400">
              Discover your unique personality through our interactive assessment and visualization system.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/blog")}>Blog</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/research")}>Research</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/types")}>Personality Types</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/guides")}>Development Guides</div></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/about")}>About Us</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/contact")}>Contact</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/careers")}>Careers</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/press")}>Press Kit</div></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/privacy")}>Privacy Policy</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/terms")}>Terms of Service</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/cookies")}>Cookie Policy</div></li>
              <li><div className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate("/gdpr")}>GDPR Compliance</div></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Personality Mosaic. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Facebook className="h-5 w-5" />
            </div>
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Twitter className="h-5 w-5" />
            </div>
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Instagram className="h-5 w-5" />
            </div>
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Youtube className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
