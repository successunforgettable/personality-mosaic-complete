import { Link } from "wouter";
import { useRef, useEffect } from "react";
import { 
  Eye, 
  Brain, 
  TrendingUp, 
  Home as HomeIcon, 
  Layers, 
  Palette, 
  Settings,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";

export default function Home() {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to How It Works section
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="font-sans">
      {/* 1.1. Hero Section - full-width with 85vh height on desktop */}
      <section className="h-auto lg:h-[85vh] w-full relative overflow-hidden flex items-center">
        {/* 1.2. Subtle gradient animation background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f1f5f9] to-[#ede9fe] bg-[length:200%_200%] animate-gradient-slow">
          {/* Decorative background shapes */}
          <div className="absolute top-[10%] left-[5%] w-40 h-40 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>
          <div className="absolute top-[60%] right-[5%] w-60 h-60 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
          <div className="absolute top-[30%] left-[60%] w-32 h-32 rounded-full bg-teal-200 opacity-25 blur-3xl"></div>
        </div>
        
        {/* 1.3. Split layout with content left, visualization right */}
        {/* 1.9. Ensure responsive behavior with breakpoints */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center py-16 md:py-20 lg:py-0 relative z-10">
          <div className="animate-on-scroll">
            {/* 1.4. Add headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-[#1e293b] mb-6">
              Discover Your <span className="text-[#7c3aed]">Personality Tower</span>
            </h1>
            
            {/* 1.5. Add subheadline */}
            <p className="text-base md:text-lg lg:text-xl text-[#64748b] mb-10 font-inter font-normal">
              Build a visual representation of your unique personality in just 5 minutes
            </p>
            
            {/* 1.7 & 1.8. Primary and secondary CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div 
                className="px-8 py-4 bg-[#7c3aed] text-white rounded-lg font-medium shadow-md hover:bg-[#6d28d9] hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
                onClick={() => window.location.href = "/signup"}
              >
                Begin Your Tower
              </div>
              <button 
                onClick={scrollToHowItWorks}
                className="px-8 py-4 text-[#7c3aed] bg-white border border-[#7c3aed] rounded-lg font-medium hover:bg-[#f5f3ff] hover:shadow-md transition-all duration-200 text-center"
              >
                Learn how it works
              </button>
            </div>
          </div>
          
          {/* 1.6. 3D interactive tower visualization - visible on tablet and larger screens */}
          <div className="relative hidden md:block animate-on-scroll">
            <div className="w-full h-[400px] relative perspective-1000">
              {/* Base foundation with interactive hover effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[10%] bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer" title="Foundation"></div>
              
              {/* Tower layers with enhanced hover effects and labels */}
              <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[50%] h-[20%] bg-gradient-to-t from-[#10b981] to-[#34d399] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.05] hover:rotate-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer" title="Very Good State">
                <span className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center text-white font-medium text-sm transition-opacity duration-300">Very Good</span>
              </div>
              
              <div className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2 w-[45%] h-[20%] bg-gradient-to-t from-[#f97316] to-[#fb923c] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.05] hover:-rotate-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer" title="Average State">
                <span className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center text-white font-medium text-sm transition-opacity duration-300">Average</span>
              </div>
              
              <div className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2 w-[40%] h-[20%] bg-gradient-to-t from-[#3b82f6] to-[#60a5fa] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.05] hover:rotate-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer" title="Good State">
                <span className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center text-white font-medium text-sm transition-opacity duration-300">Good</span>
              </div>
              
              <div className="absolute bottom-[70%] left-1/2 transform -translate-x-1/2 w-[35%] h-[20%] bg-gradient-to-t from-[#7c3aed] to-[#a78bfa] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.05] hover:-rotate-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer" title="Below Average State">
                <span className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center text-white font-medium text-sm transition-opacity duration-300">Below Average</span>
              </div>
              
              {/* Tower top with enhanced effect */}
              <div className="absolute bottom-[90%] left-1/2 transform -translate-x-1/2 w-[25%] h-[10%] bg-gradient-to-t from-[#ec4899] to-[#f472b6] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.1] hover:rotate-2 hover:-translate-y-2 transition-all duration-300 cursor-pointer" title="Destructive State">
                <span className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center text-white font-medium text-xs transition-opacity duration-300">Destructive</span>
              </div>
              
              {/* Interactive decorative elements with enhanced animations */}
              <div className="absolute top-[15%] left-[30%] w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-[40%] right-[25%] w-3 h-3 bg-white rounded-full animate-pulse-slow"></div>
              <div className="absolute top-[65%] left-[40%] w-3 h-3 bg-white rounded-full animate-pulse-fast"></div>
              <div className="absolute top-[25%] right-[35%] w-2 h-2 bg-yellow-200 rounded-full animate-float"></div>
              <div className="absolute top-[55%] left-[25%] w-2 h-2 bg-blue-200 rounded-full animate-float-slow"></div>
              
              {/* Label for the tower */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-sm text-[#64748b]">Interactive Tower Visualization</p>
              </div>
              
              {/* Subtle shadow effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[70%] h-4 bg-black/10 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-[#7c3aed] opacity-5 rounded-full"></div>
        <div className="absolute bottom-[15%] right-[10%] w-40 h-40 bg-[#a78bfa] opacity-5 rounded-full"></div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1e293b] mb-6">A New Way to Understand Yourself</h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto mb-6">
              The Personality Mosaic Assessment uses a visual building metaphor to help you understand your 
              personality in a more intuitive, engaging way than traditional personality tests.
            </p>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              By constructing your personality tower through four interactive phases, you'll discover 
              insights about your core motivations, adaptive strategies, and growth opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-on-scroll">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-4">Visual Understanding</h3>
              <p className="text-[#64748b]">
                See your personality represented as a colorful tower, making abstract concepts tangible and easier to understand.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-4">Personalized Insights</h3>
              <p className="text-[#64748b]">
                Receive detailed insights about your personality type, motivations, and behavioral patterns based on established psychology.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-4">Growth-Oriented Framework</h3>
              <p className="text-[#64748b]">
                Discover pathways for personal development based on your unique personality structure and patterns.
              </p>
            </div>
          </div>
          
          {/* Supporting imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-on-scroll">
            <div className="bg-[#f8fafc] rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video flex items-center justify-center p-8">
                <div className="w-48 h-64 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-[#a78bfa] rounded-full"></div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-[#10b981] rounded-lg"></div>
                  <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-[#f97316] rounded-lg"></div>
                  <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-[#3b82f6] rounded-lg"></div>
                  <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-[#7c3aed] rounded-lg"></div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <p className="text-center text-sm text-[#64748b]">Example: Analytical Achiever Tower</p>
              </div>
            </div>
            
            <div className="bg-[#f8fafc] rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video flex items-center justify-center p-8">
                <div className="w-48 h-64 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-[#a78bfa] rounded-full"></div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-[#f97316] rounded-lg"></div>
                  <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-[#10b981] rounded-lg"></div>
                  <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-[#7c3aed] rounded-lg"></div>
                  <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-[#3b82f6] rounded-lg"></div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <p className="text-center text-sm text-[#64748b]">Example: Empathetic Supporter Tower</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1e293b] mb-6">How It Works</h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              Our assessment guides you through four interactive phases to build your personalized tower in just 5-7 minutes.
            </p>
          </div>
          
          {/* Desktop timeline */}
          <div className="hidden md:block relative mb-16 animate-on-scroll">
            {/* Timeline connector */}
            <div className="absolute top-24 left-0 w-full h-1 bg-[#e2e8f0]"></div>
            
            <div className="grid grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10">
                  <span className="font-bold text-xl">1</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full w-full">
                  <div className="mb-6 h-40 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#ede9fe] rounded-lg flex items-center justify-center shadow-inner">
                      <HomeIcon className="text-[#7c3aed] w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Select Your Foundation Stones</h3>
                  <p className="text-sm text-[#64748b]">
                    Choose foundation stones that represent your core values and personality baselines.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10">
                  <span className="font-bold text-xl">2</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full w-full">
                  <div className="mb-6 h-40 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#ede9fe] rounded-lg flex items-center justify-center shadow-inner">
                      <Layers className="text-[#7c3aed] w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Add Your Building Blocks</h3>
                  <p className="text-sm text-[#64748b]">
                    Select building blocks that shape your decision-making and interaction style.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10">
                  <span className="font-bold text-xl">3</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full w-full">
                  <div className="mb-6 h-40 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#ede9fe] rounded-lg flex items-center justify-center shadow-inner">
                      <Palette className="text-[#7c3aed] w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Choose Your Color Palette</h3>
                  <p className="text-sm text-[#64748b]">
                    Color your tower to show how much time you spend in different psychological states.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10">
                  <span className="font-bold text-xl">4</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-full w-full">
                  <div className="mb-6 h-40 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#ede9fe] rounded-lg flex items-center justify-center shadow-inner">
                      <Settings className="text-[#7c3aed] w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Place Your Detail Elements</h3>
                  <p className="text-sm text-[#64748b]">
                    Add final details to show where you focus your energy and attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile vertical timeline */}
          <div className="md:hidden space-y-8 animate-on-scroll">
            {/* Step 1 */}
            <div className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <div className="w-1 h-full bg-[#e2e8f0] mx-auto mt-2"></div>
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <div className="mb-3 h-24 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#ede9fe] rounded-lg flex items-center justify-center">
                    <HomeIcon className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Select Your Foundation Stones</h3>
                <p className="text-sm text-[#64748b]">
                  Choose foundation stones that represent your core values and personality baselines.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <div className="w-1 h-full bg-[#e2e8f0] mx-auto mt-2"></div>
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <div className="mb-3 h-24 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#ede9fe] rounded-lg flex items-center justify-center">
                    <Layers className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Add Your Building Blocks</h3>
                <p className="text-sm text-[#64748b]">
                  Select building blocks that shape your decision-making and interaction style.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <div className="w-1 h-full bg-[#e2e8f0] mx-auto mt-2"></div>
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <div className="mb-3 h-24 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#ede9fe] rounded-lg flex items-center justify-center">
                    <Palette className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Choose Your Color Palette</h3>
                <p className="text-sm text-[#64748b]">
                  Color your tower to show how much time you spend in different psychological states.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <div className="mb-3 h-24 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#ede9fe] rounded-lg flex items-center justify-center">
                    <Settings className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Place Your Detail Elements</h3>
                <p className="text-sm text-[#64748b]">
                  Add final details to show where you focus your energy and attention.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 animate-on-scroll">
            <p className="text-[#64748b] mb-6">
              <span className="inline-flex items-center bg-[#ede9fe] text-[#7c3aed] px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-4 h-4 mr-1">⏱️</span>
                Complete in 5-7 minutes
              </span>
            </p>
            <div 
              className="inline-block px-8 py-4 bg-[#7c3aed] text-white rounded-lg font-medium shadow-md hover:bg-[#6d28d9] hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
              onClick={() => window.location.href = "/signup"}
            >
              Sign Up to Start Building
            </div>
            <p className="mt-3 text-sm text-[#64748b]">Account required to access the assessment</p>
          </div>
        </div>
      </section>
      
      {/* Preview/Example Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1e293b] mb-6">See What You'll Discover</h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              Your completed personality tower reveals insights about your personality type, operating states, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-on-scroll">
            {/* Visualization side */}
            <div className="bg-[#f8fafc] rounded-xl p-8 flex justify-center">
              <div className="w-64 h-80 relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-[#a78bfa] rounded-full"></div>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-40 h-16 rounded-lg bg-[#10b981]"></div>
                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-36 h-16 rounded-lg bg-[#f97316]"></div>
                <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 w-32 h-16 rounded-lg bg-[#3b82f6]"></div>
                <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 w-28 h-16 rounded-lg bg-[#7c3aed]"></div>
              </div>
            </div>
            
            {/* Sample insights side */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1e293b] mb-4">Your Personality Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <p className="font-medium text-[#1e293b] mb-1">The Achiever</p>
                    <p className="text-sm text-[#64748b]">Driven, image-conscious, and adaptive to success standards</p>
                  </div>
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <p className="font-medium text-[#1e293b] mb-1">Influence</p>
                    <p className="text-sm text-[#64748b]">Adds creativity and emotional awareness to your achievement drive</p>
                  </div>
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <p className="font-medium text-[#1e293b] mb-1">Primary State: Good</p>
                    <p className="text-sm text-[#64748b]">You're often self-aware and making progress on personal growth</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#ede9fe] rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-[#7c3aed]">Your Personality Type</p>
                </div>
                <div className="bg-[#ede9fe] rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-[#7c3aed]">Influence</p>
                </div>
                <div className="bg-[#ede9fe] rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-[#7c3aed]">Operating States</p>
                </div>
                <div className="bg-[#ede9fe] rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-[#7c3aed]">Subtypes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1e293b] mb-6">What Others Have Discovered</h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              Hear from people who have gained insights from their personality towers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#ede9fe] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#7c3aed] font-bold">JM</span>
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Jamie M.</p>
                  <p className="text-xs text-[#64748b]">Marketing Director</p>
                </div>
              </div>
              <p className="text-[#64748b] mb-4">
                "Seeing my personality as a tower helped me understand my natural tendencies in a way that other assessments never could. The visual approach made everything click."
              </p>
              <div className="flex items-center">
                <Brain className="text-[#7c3aed] w-4 h-4 mr-1" />
                <p className="text-xs text-[#7c3aed]">The Achiever</p>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#ede9fe] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#7c3aed] font-bold">AR</span>
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Alex R.</p>
                  <p className="text-xs text-[#64748b]">Software Engineer</p>
                </div>
              </div>
              <p className="text-[#64748b] mb-4">
                "The detail element placement helped me recognize why I prioritize certain things over others. I've gained a new perspective on my work relationships."
              </p>
              <div className="flex items-center">
                <Brain className="text-[#7c3aed] w-4 h-4 mr-1" />
                <p className="text-xs text-[#7c3aed]">The Investigator</p>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#ede9fe] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#7c3aed] font-bold">TK</span>
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Taylor K.</p>
                  <p className="text-xs text-[#64748b]">Healthcare Professional</p>
                </div>
              </div>
              <p className="text-[#64748b] mb-4">
                "Understanding my color palette distribution was eye-opening. I now recognize when I'm shifting into less healthy states and have tools to rebalance."
              </p>
              <div className="flex items-center">
                <Brain className="text-[#7c3aed] w-4 h-4 mr-1" />
                <p className="text-xs text-[#7c3aed]">The Helper</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Personality Tower?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands who have gained transformative insights</p>
          <div 
            className="inline-block px-8 py-4 bg-white text-[#7c3aed] rounded-lg font-medium shadow-md hover:bg-opacity-95 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-center text-lg cursor-pointer"
            onClick={() => window.location.href = "/signup"}
          >
            Sign Up For Assessment
          </div>
          <p className="mt-4 opacity-80 text-sm">Just 5 minutes • Create an account to save your results</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-[#4c1d95] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and copyright */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                  <Brain className="text-[#7c3aed] w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl">Personality Mosaic</h3>
              </div>
              <p className="text-sm opacity-80">© 2025 Personality Mosaic</p>
              <p className="text-sm opacity-80">All rights reserved</p>
            </div>
            
            {/* Navigation Links */}
            <div className="col-span-1">
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Our Approach</a></li>
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Research</a></li>
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Team</a></li>
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">FAQs</a></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a></li>
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Cookies</a></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Contact Us</a></li>
                <li><a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Support</a></li>
              </ul>
              
              {/* Email Signup */}
              <div className="mt-4">
                <h4 className="font-semibold mb-3 text-sm">Sign up for updates</h4>
                <div className="flex space-x-1">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-l-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <button className="bg-white text-[#4c1d95] px-3 py-2 rounded-r-md text-sm font-medium hover:bg-opacity-90 transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}