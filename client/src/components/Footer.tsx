import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                <span className="material-icons">psychology</span>
              </div>
              <h2 className="ml-3 text-xl font-display font-semibold text-white">Personality Mosaic</h2>
            </div>
            <p className="text-sm text-gray-400">
              Discover your unique personality through our interactive assessment and visualization system.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog"><a className="hover:text-white transition-colors">Blog</a></Link></li>
              <li><Link href="/research"><a className="hover:text-white transition-colors">Research</a></Link></li>
              <li><Link href="/types"><a className="hover:text-white transition-colors">Personality Types</a></Link></li>
              <li><Link href="/guides"><a className="hover:text-white transition-colors">Development Guides</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about"><a className="hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-white transition-colors">Contact</a></Link></li>
              <li><Link href="/careers"><a className="hover:text-white transition-colors">Careers</a></Link></li>
              <li><Link href="/press"><a className="hover:text-white transition-colors">Press Kit</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy"><a className="hover:text-white transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="/terms"><a className="hover:text-white transition-colors">Terms of Service</a></Link></li>
              <li><Link href="/cookies"><a className="hover:text-white transition-colors">Cookie Policy</a></Link></li>
              <li><Link href="/gdpr"><a className="hover:text-white transition-colors">GDPR Compliance</a></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Personality Mosaic. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="material-icons">facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="material-icons">twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="material-icons">instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="material-icons">youtube_searched_for</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
