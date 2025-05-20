import { useRef, useEffect } from "react";
import { 
  Eye, 
  Brain, 
  TrendingUp, 
  Layers, 
  Palette, 
  Settings,
  ChevronRight
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
      
      {/* 2.1. Introduction Section with white background */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-on-scroll">
            {/* 2.2. Section header */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-inter text-[#1e293b] mb-6">
              A New Way to Understand Yourself
            </h2>
            
            {/* 2.3. Explanatory paragraphs */}
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-base md:text-lg text-[#64748b]">
                The Personality Mosaic Assessment uses a visual building metaphor to help you understand your 
                personality in a more intuitive, engaging way than traditional personality tests.
              </p>
              <p className="text-base md:text-lg text-[#64748b]">
                By building your unique tower through four phases of assessment, you'll discover your core personality 
                type, dominant states, and key personality subtypes that influence your daily interactions and decisions.
              </p>
              <p className="text-base md:text-lg text-[#64748b]">
                Unlike text-heavy assessments, this visual approach creates a memorable representation of your personality 
                that helps you identify patterns and opportunities for growth.
              </p>
            </div>
          </div>
          
          {/* 2.4. Implement 3-column benefits layout with icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-on-scroll">
            {/* 2.4.1. Visual Understanding column */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-4">Visual Understanding</h3>
              <p className="text-[#64748b]">
                See your personality represented as a colorful tower, making abstract concepts tangible and easier to understand.
              </p>
            </div>
            
            {/* 2.4.2. Personalized Insights column */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-4">Personalized Insights</h3>
              <p className="text-[#64748b]">
                Receive detailed insights about your personality type, motivations, and behavioral patterns based on established psychology.
              </p>
            </div>
            
            {/* 2.4.3. Growth-Oriented Framework column */}
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
          
          {/* 2.5. Add supporting imagery showing example personality towers */}
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
      
      {/* 3.1. How It Works Section - light gray background */}
      <section ref={howItWorksRef} className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-on-scroll">
            {/* 3.2. Section header */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-inter text-[#1e293b] mb-6">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-[#64748b] max-w-3xl mx-auto">
              Our assessment guides you through four interactive phases to build your personalized tower in just 5-7 minutes.
            </p>
          </div>
          
          {/* 3.6. Horizontal timeline on desktop, vertical on mobile */}
          <div className="hidden md:block relative mb-16 animate-on-scroll">
            {/* Timeline connector - horizontal line connecting all steps */}
            <div className="absolute top-24 left-0 w-full h-1 bg-[#e2e8f0]"></div>
            
            {/* 3.3. 4-step process visualization - desktop */}
            <div className="grid grid-cols-4 gap-6 relative">
              {/* 3.3.1. Step 1: Foundation Stones */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10 shadow-md">
                  <span className="font-bold">1</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 h-full w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-3 h-24 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#ede9fe] rounded-lg flex items-center justify-center">
                      <Settings className="text-[#7c3aed] w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Select Your Foundation Stones</h3>
                  <p className="text-sm text-[#64748b]">
                    Choose foundation stones that represent your core values and natural tendencies.
                  </p>
                </div>
              </div>
              
              {/* 3.3.2. Step 2: Building Blocks */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10 shadow-md">
                  <span className="font-bold">2</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 h-full w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
              
              {/* 3.3.3. Step 3: Color Palette */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10 shadow-md">
                  <span className="font-bold">3</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 h-full w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
              
              {/* 3.3.4. Step 4: Detail Elements */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 z-10 shadow-md">
                  <span className="font-bold">4</span>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 h-full w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-3 h-24 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#ede9fe] rounded-lg flex items-center justify-center">
                      <Eye className="text-[#7c3aed] w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Place Your Detail Elements</h3>
                  <p className="text-sm text-[#64748b]">
                    Add final details to show where you focus your energy and attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile/vertical timeline view */}
          <div className="md:hidden space-y-8 animate-on-scroll">
            {/* 3.3.1. Step 1: Foundation Stones - Mobile */}
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
                    <Settings className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Select Your Foundation Stones</h3>
                <p className="text-sm text-[#64748b]">
                  Choose foundation stones that represent your core values and natural tendencies.
                </p>
              </div>
            </div>
            
            {/* 3.3.2. Step 2: Building Blocks - Mobile */}
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
            
            {/* 3.3.3. Step 3: Color Palette - Mobile */}
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
            
            {/* 3.3.4. Step 4: Detail Elements - Mobile */}
            <div className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <div className="mb-3 h-24 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#ede9fe] rounded-lg flex items-center justify-center">
                    <Eye className="text-[#7c3aed] w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Place Your Detail Elements</h3>
                <p className="text-sm text-[#64748b]">
                  Add final details to show where you focus your energy and attention.
                </p>
              </div>
            </div>
          </div>
          
          {/* 3.4 & 3.5. Time indicator and CTA button */}
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
              Start Building Now
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}