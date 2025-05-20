import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Home as HomeIcon, Layers, Palette, Settings, User } from "lucide-react";

const Home = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to How It Works section
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="min-h-[85vh] w-full bg-gradient-to-br from-[#f1f5f9] to-[#ede9fe] relative overflow-hidden flex items-center">
        <div className="max-w-6xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-6">
              Discover Your <span className="text-[#7c3aed]">Personality Tower</span>
            </h1>
            <p className="text-lg md:text-xl text-[#64748b] mb-10">
              Build a visual representation of your unique personality in just 5 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessment">
                <a className="px-8 py-4 bg-[#7c3aed] text-white rounded-lg font-medium shadow-md hover:bg-[#6d28d9] transition-all duration-200 text-center">
                  Begin Your Tower
                </a>
              </Link>
              <button 
                onClick={scrollToHowItWorks}
                className="px-8 py-4 text-[#7c3aed] bg-white border border-[#7c3aed] rounded-lg font-medium hover:bg-[#f5f3ff] transition-all duration-200 text-center"
              >
                Learn how it works
              </button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Tower visualization */}
            <div className="w-full h-96 relative">
              {/* Base foundation */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[10%] bg-[#a78bfa] rounded-full shadow-md"></div>
              
              {/* Tower layers */}
              <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[50%] h-[20%] bg-gradient-to-t from-[#10b981] to-[#34d399] rounded-xl shadow-md"></div>
              
              <div className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2 w-[45%] h-[20%] bg-gradient-to-t from-[#f97316] to-[#fb923c] rounded-xl shadow-md"></div>
              
              <div className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2 w-[40%] h-[20%] bg-gradient-to-t from-[#3b82f6] to-[#60a5fa] rounded-xl shadow-md"></div>
              
              <div className="absolute bottom-[70%] left-1/2 transform -translate-x-1/2 w-[35%] h-[20%] bg-gradient-to-t from-[#7c3aed] to-[#a78bfa] rounded-xl shadow-md"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section - Matching screenshot exactly */}
      <section ref={howItWorksRef} className="py-16 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-[#1e293b] mb-4">How It Works</h2>
            <p className="text-[#64748b] max-w-2xl mx-auto">
              Our assessment guides you through four interactive phases to build your personalized tower in just 5-7 minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">1</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#f5f3ff] rounded-lg flex items-center justify-center">
                    <HomeIcon className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Select Your Foundation Stones</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Choose foundation stones that represent your core values and personality baselines.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">2</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#f5f3ff] rounded-lg flex items-center justify-center">
                    <Layers className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Add Your Building Blocks</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Select building blocks that shape your decision-making and interaction style.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">3</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#f5f3ff] rounded-lg flex items-center justify-center">
                    <Palette className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Choose Your Color Palette</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Color your tower to show how much time you spend in different psychological states.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">4</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#f5f3ff] rounded-lg flex items-center justify-center">
                    <Settings className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Place Your Detail Elements</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Add final details to show where you focus your energy and attention.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/assessment">
              <a className="inline-block px-8 py-4 bg-[#7c3aed] text-white rounded-lg font-medium shadow-sm hover:bg-[#6d28d9] transition-all duration-200 text-center">
                Start Building Now
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Personality Tower?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands who have gained transformative insights</p>
          <Link href="/assessment">
            <a className="inline-block px-8 py-4 bg-white text-[#7c3aed] rounded-lg font-medium shadow-md hover:bg-opacity-95 transition-all duration-200 text-center text-lg">
              Begin Free Assessment
            </a>
          </Link>
          <p className="mt-4 opacity-80 text-sm">Just 5 minutes • No sign-up required to start</p>
        </div>
      </section>
    </div>
  );
};

export default Home;