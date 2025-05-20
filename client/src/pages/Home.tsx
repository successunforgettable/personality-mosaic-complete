import { useRef, useEffect, useState } from "react";
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
  const towerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 5, y: 5 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
  // Function to scroll to How It Works section
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle mouse/touch interaction for tower rotation
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartPosition({ x: clientX, y: clientY });
  };
  
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = (clientX - startPosition.x) / 5;
    const deltaY = (clientY - startPosition.y) / 10;
    
    setRotation(prev => ({
      y: prev.y + deltaX,
      x: Math.max(Math.min(prev.x - deltaY, 20), -20) // Limit vertical rotation
    }));
    
    setStartPosition({ x: clientX, y: clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add event listeners for tower rotation
  useEffect(() => {
    if (towerRef.current) {
      const tower = towerRef.current;
      
      const handleMove = (e: MouseEvent | TouchEvent) => handleMouseMove(e);
      const handleUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleUp);
      };
    }
  }, [isDragging, startPosition]);
  
  // Apply subtle animation to tower when not being dragged
  useEffect(() => {
    if (!isDragging && towerRef.current) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.05
        }));
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isDragging]);

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
      
      {/* 4.1. Preview/Example Section - white background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-on-scroll">
            {/* 4.2. Section header */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-inter text-[#1e293b] mb-6">
              See What You'll Discover
            </h2>
            <p className="text-base md:text-lg text-[#64748b] max-w-3xl mx-auto">
              Your completed personality tower reveals insights about your personality type, operating states, and more.
            </p>
          </div>
          
          {/* 4.6. Split screen layout - visualization left, insights right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            {/* 4.3. Interactive preview of completed personality tower */}
            <div className="animate-on-scroll order-2 lg:order-1">
              <div className="bg-[#f8fafc] rounded-2xl p-6 lg:p-10 shadow-sm">
                <div className="relative h-[400px] w-full max-w-[350px] mx-auto cursor-grab active:cursor-grabbing">
                  {/* 4.3.1-4.3.3. Interactive 3D tower with rotation and hover states */}
                  <div 
                    className="absolute inset-0 w-full h-full perspective-1000" 
                    id="interactiveTower"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                  >
                    <div 
                      ref={towerRef}
                      className="relative w-full h-full transform-style-3d transition-transform duration-300"
                      style={{ 
                        transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Base foundation */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-10 bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] rounded-full shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer z-10" 
                        title="Foundation"
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Foundation:</strong> Your core personality type - The Achiever';
                        }}
                      >
                      </div>
                      
                      {/* Tower layers */}
                      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-56 h-24 bg-gradient-to-t from-[#22c55e] to-[#10b981] rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer z-20"
                        title="Very Good State (25%)" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Very Good State (25%):</strong> Your optimal functioning where you feel most productive and balanced';
                        }}
                      >
                      </div>
                      
                      <div className="absolute bottom-[110px] left-1/2 transform -translate-x-1/2 w-52 h-40 bg-gradient-to-t from-[#f59e0b] to-[#fbbf24] rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer z-30"
                        title="Average State (40%)" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Average State (40%):</strong> Your day-to-day functioning where you spend most of your time';
                        }}
                      >
                      </div>
                      
                      <div className="absolute bottom-[200px] left-1/2 transform -translate-x-1/2 w-48 h-28 bg-gradient-to-t from-[#3b82f6] to-[#60a5fa] rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer z-40"
                        title="Good State (20%)" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Good State (20%):</strong> Your focused, positive state where you experience flow and creativity';
                        }}
                      >
                      </div>
                      
                      <div className="absolute bottom-[272px] left-1/2 transform -translate-x-1/2 w-44 h-20 bg-gradient-to-t from-[#7c3aed] to-[#a78bfa] rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer z-50"
                        title="Below Average State (10%)" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Below Average State (10%):</strong> Your stressed state when facing challenges or constraints';
                        }}
                      >
                      </div>
                      
                      <div className="absolute bottom-[328px] left-1/2 transform -translate-x-1/2 w-36 h-16 bg-gradient-to-t from-[#ef4444] to-[#f87171] rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-300 cursor-pointer z-60"
                        title="Destructive State (5%)" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Destructive State (5%):</strong> Your unhealthy patterns that emerge when extremely stressed';
                        }}
                      >
                      </div>
                      
                      {/* Subtype indicators */}
                      <div className="absolute top-8 right-20 w-10 h-10 bg-[#eab308] rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 animate-float-slow cursor-pointer" 
                        title="Self-Preservation Subtype" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Self-Preservation Subtype:</strong> Focus on physical comfort, security, and health';
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">SP</span>
                      </div>
                      
                      <div className="absolute top-16 left-24 w-16 h-16 bg-[#ec4899] rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 animate-float cursor-pointer" 
                        title="One-to-One Subtype" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>One-to-One Subtype:</strong> Focus on intimate relationships and connecting deeply with individuals';
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">One-to-One</span>
                      </div>
                      
                      <div className="absolute top-28 right-24 w-12 h-12 bg-[#06b6d4] rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 animate-float-fast cursor-pointer" 
                        title="Social Subtype" 
                        onMouseEnter={() => {
                          document.getElementById('towerInfoBox')!.innerHTML = '<strong>Social Subtype:</strong> Focus on group dynamics, roles in community, and belonging';
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">SO</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mouse hover information box */}
                  <div id="towerInfoBox" className="absolute bottom-4 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 rounded-lg text-sm text-[#1e293b] border border-gray-100 shadow-sm transition-all duration-300">
                    <em>Hover over tower elements to see details</em>
                  </div>
                  
                  {/* Rotation hint */}
                  <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-sm text-xs text-[#64748b] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M15 15 L19 19 M11 13 A2 2 0 0 1 13 11 A2 2 0 0 1 15 13 A2 2 0 0 1 13 15 A2 2 0 0 1 11 13 Z M3 13 A10 10 0 0 1 13 3 A8 8 0 0 1 19 5 L21 3 M21 9 L21 3 L15 3" />
                    </svg>
                    Drag to rotate
                  </div>
                </div>
              </div>
            </div>
            
            {/* 4.4. Sample insights area with report excerpts */}
            <div className="animate-on-scroll order-1 lg:order-2">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-[#1e293b] mb-6">Your Personality Insights</h3>
                
                <div className="mb-6 p-5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <h4 className="text-lg font-medium text-[#1e293b] mb-2">The Achiever</h4>
                  <p className="text-[#64748b] mb-3">
                    You are ambitious, adaptable, and image-conscious. You excel at setting goals and inspiring others toward shared success while prioritizing recognition and accomplishment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-[#ede9fe] text-[#7c3aed] text-xs rounded-full">Goal-oriented</span>
                    <span className="px-2 py-1 bg-[#ede9fe] text-[#7c3aed] text-xs rounded-full">Adaptable</span>
                    <span className="px-2 py-1 bg-[#ede9fe] text-[#7c3aed] text-xs rounded-full">Driven</span>
                    <span className="px-2 py-1 bg-[#ede9fe] text-[#7c3aed] text-xs rounded-full">Image-conscious</span>
                  </div>
                </div>
                
                <div className="mb-6 p-5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <h4 className="text-lg font-medium text-[#1e293b] mb-2">Growth Opportunities</h4>
                  <p className="text-[#64748b] mb-3">
                    Your success-oriented mindset sometimes leads to prioritizing achievements over authentic self-expression. Developing deeper self-awareness can help you recognize when you're overidentifying with external validation.
                  </p>
                </div>
                
                <div className="mb-6 p-5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#ede9fe] flex items-center justify-center mr-3">
                      <span className="text-[#7c3aed] text-sm font-medium">40%</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-[#1e293b]">Average State</h4>
                      <p className="text-xs text-[#64748b]">Where you spend most of your time</p>
                    </div>
                  </div>
                  <p className="text-[#64748b]">
                    In your average state, you focus on efficiency and managing your image. You exhibit competence, versatility, and pragmatism while maintaining social connections.
                  </p>
                </div>
                
                {/* 4.5. Callout boxes for key features */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 4.5.1. "9 Core Personality Types" */}
                  <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <div className="text-2xl font-bold text-[#7c3aed] mb-1">9</div>
                    <div className="text-sm font-medium text-[#1e293b]">Core Personality Types</div>
                  </div>
                  
                  {/* 4.5.2. "Wing Variations" (with updated terminology to "Influence") */}
                  <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <div className="text-2xl font-bold text-[#7c3aed] mb-1">18</div>
                    <div className="text-sm font-medium text-[#1e293b]">Influence Variations</div>
                  </div>
                  
                  {/* 4.5.3. "Operating States" */}
                  <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <div className="text-2xl font-bold text-[#7c3aed] mb-1">5</div>
                    <div className="text-sm font-medium text-[#1e293b]">Operating States</div>
                  </div>
                  
                  {/* 4.5.4. "Instinctual Variants" (with updated terminology to "Subtypes") */}
                  <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <div className="text-2xl font-bold text-[#7c3aed] mb-1">3</div>
                    <div className="text-sm font-medium text-[#1e293b]">Subtypes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 5.1. Testimonials Section - light purple gradient background */}
      <section className="py-20 bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-on-scroll">
            {/* 5.2. Section header */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-inter text-[#1e293b] mb-6">
              What Others Have Discovered
            </h2>
            <p className="text-base md:text-lg text-[#64748b] max-w-3xl mx-auto">
              Hear from people who have already built their personality towers and applied their insights.
            </p>
          </div>
          
          {/* 5.4. Desktop grid layout for testimonials */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-on-scroll">
            {/* 5.3. Testimonial cards */}
            {/* 5.3.1. Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e2e8f0] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center mr-4">
                  <span className="text-[#7c3aed] font-bold">JM</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#1e293b]">James Morgan</h4>
                  <p className="text-sm text-[#64748b]">Product Manager</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="w-6 h-6 text-[#7c3aed] mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[#1e293b] italic">
                  "The visualizer made personality assessment engaging and easy to understand. Seeing my tower helped me recognize patterns in my behavior I hadn't noticed before."
                </p>
              </div>
              {/* 5.3.2. Personality type discovered */}
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <div className="w-full h-full relative">
                    <div className="absolute bottom-0 w-full h-1/5 bg-[#a78bfa] rounded-b-sm"></div>
                    <div className="absolute bottom-1/5 w-full h-1/5 bg-[#10b981] rounded-none"></div>
                    <div className="absolute bottom-2/5 w-full h-1/5 bg-[#f97316] rounded-none"></div>
                    <div className="absolute bottom-3/5 w-full h-1/5 bg-[#3b82f6] rounded-none"></div>
                    <div className="absolute bottom-4/5 w-full h-1/5 bg-[#7c3aed] rounded-t-sm"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#7c3aed]">The Peacemaker</span>
              </div>
            </div>
            
            {/* 5.3.1. Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e2e8f0] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center mr-4">
                  <span className="text-[#7c3aed] font-bold">SR</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#1e293b]">Sarah Reeves</h4>
                  <p className="text-sm text-[#64748b]">Teacher & Coach</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="w-6 h-6 text-[#7c3aed] mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[#1e293b] italic">
                  "I was surprised how accurately the assessment captured my personality. The breakdown of different states helped me understand when I'm at my best versus when I'm struggling."
                </p>
              </div>
              {/* 5.3.2. Personality type discovered */}
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <div className="w-full h-full relative">
                    <div className="absolute bottom-0 w-full h-1/5 bg-[#a78bfa] rounded-b-sm"></div>
                    <div className="absolute bottom-1/5 w-full h-1/5 bg-[#10b981] rounded-none"></div>
                    <div className="absolute bottom-2/5 w-full h-1/5 bg-[#f97316] rounded-none"></div>
                    <div className="absolute bottom-3/5 w-full h-1/5 bg-[#3b82f6] rounded-none"></div>
                    <div className="absolute bottom-4/5 w-full h-1/5 bg-[#7c3aed] rounded-t-sm"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#7c3aed]">The Helper</span>
              </div>
            </div>
            
            {/* 5.3.1. Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e2e8f0] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center mr-4">
                  <span className="text-[#7c3aed] font-bold">DT</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#1e293b]">David Torres</h4>
                  <p className="text-sm text-[#64748b]">Software Engineer</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="w-6 h-6 text-[#7c3aed] mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[#1e293b] italic">
                  "As someone who's taken many personality tests, this one stands out with its visual approach. The tower helped me understand my traits in relation to each other rather than as isolated characteristics."
                </p>
              </div>
              {/* 5.3.2. Personality type discovered */}
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <div className="w-full h-full relative">
                    <div className="absolute bottom-0 w-full h-1/5 bg-[#a78bfa] rounded-b-sm"></div>
                    <div className="absolute bottom-1/5 w-full h-1/5 bg-[#10b981] rounded-none"></div>
                    <div className="absolute bottom-2/5 w-full h-1/5 bg-[#f97316] rounded-none"></div>
                    <div className="absolute bottom-3/5 w-full h-1/5 bg-[#3b82f6] rounded-none"></div>
                    <div className="absolute bottom-4/5 w-full h-1/5 bg-[#7c3aed] rounded-t-sm"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#7c3aed]">The Investigator</span>
              </div>
            </div>
          </div>
          
          {/* 5.4 & 5.5. Mobile carousel with navigation dots */}
          <div className="md:hidden mb-12 animate-on-scroll">
            <div className="relative">
              {/* Current testimonial (mobile) */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e2e8f0] mb-4">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center mr-4">
                    <span className="text-[#7c3aed] font-bold">JM</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e293b]">James Morgan</h4>
                    <p className="text-sm text-[#64748b]">Product Manager</p>
                  </div>
                </div>
                <div className="mb-4">
                  <svg className="w-6 h-6 text-[#7c3aed] mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[#1e293b] italic">
                    "The visualizer made personality assessment engaging and easy to understand. Seeing my tower helped me recognize patterns in my behavior I hadn't noticed before."
                  </p>
                </div>
                {/* Personality type discovered */}
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2">
                    <div className="w-full h-full relative">
                      <div className="absolute bottom-0 w-full h-1/5 bg-[#a78bfa] rounded-b-sm"></div>
                      <div className="absolute bottom-1/5 w-full h-1/5 bg-[#10b981] rounded-none"></div>
                      <div className="absolute bottom-2/5 w-full h-1/5 bg-[#f97316] rounded-none"></div>
                      <div className="absolute bottom-3/5 w-full h-1/5 bg-[#3b82f6] rounded-none"></div>
                      <div className="absolute bottom-4/5 w-full h-1/5 bg-[#7c3aed] rounded-t-sm"></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#7c3aed]">The Peacemaker</span>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#7c3aed]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ddd6fe]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ddd6fe]"></div>
              </div>
              
              {/* Navigation arrows */}
              <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#7c3aed] border border-[#e2e8f0]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#7c3aed] border border-[#e2e8f0]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* 6.1-6.7. Final Call-to-Action Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center animate-on-scroll">
          {/* 6.2. Bold headline */}
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">Ready to Build Your Personality Tower?</h2>
          
          {/* 6.3. Subheadline */}
          <p className="text-lg md:text-xl opacity-90 mb-8 md:mb-10">Join thousands who have gained transformative insights</p>
          
          {/* 6.4. Large CTA button with hover animation */}
          <div 
            className="inline-block px-8 py-5 bg-white text-[#7c3aed] rounded-lg font-medium shadow-md hover:bg-opacity-95 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 text-center text-lg md:text-xl cursor-pointer"
            onClick={() => window.location.href = "/signup"}
          >
            Begin Free Assessment
          </div>
          
          {/* 6.5. Supporting text */}
          <p className="mt-5 opacity-80 text-sm md:text-base">Just 5 minutes • No sign-up required to start</p>
        </div>
      </section>
    </div>
  );
}