import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef } from "react";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Tower visualization with hover effects */}
            <div className="w-full h-96 relative">
              {/* Base foundation */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[10%] bg-[#a78bfa] rounded-full shadow-md"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Tower layers */}
              <motion.div 
                className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[50%] h-[20%] bg-gradient-to-t from-[#10b981] to-[#34d399] rounded-xl shadow-md"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.div 
                className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2 w-[45%] h-[20%] bg-gradient-to-t from-[#f97316] to-[#fb923c] rounded-xl shadow-md"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.div 
                className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2 w-[40%] h-[20%] bg-gradient-to-t from-[#3b82f6] to-[#60a5fa] rounded-xl shadow-md"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.div 
                className="absolute bottom-[70%] left-1/2 transform -translate-x-1/2 w-[35%] h-[20%] bg-gradient-to-t from-[#7c3aed] to-[#a78bfa] rounded-xl shadow-md"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-[15%] left-[30%] w-3 h-3 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
              />
              
              <motion.div 
                className="absolute top-[40%] right-[25%] w-3 h-3 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: "loop" }}
              />
              
              <motion.div 
                className="absolute top-[65%] left-[40%] w-3 h-3 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "loop" }}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#1e293b] mb-4">A New Way to Understand Yourself</h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto mb-4">
              The Personality Mosaic Assessment uses a visual building metaphor to help you understand your 
              personality in a more intuitive, engaging way than traditional personality tests.
            </p>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              By constructing your personality tower through four interactive phases, you'll discover 
              insights about your core motivations, adaptive strategies, and growth opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons text-2xl">visibility</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-3 text-center">Visual Understanding</h3>
              <p className="text-[#64748b] text-center">
                See your personality represented as a colorful tower, making abstract concepts tangible and easier to understand.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons text-2xl">psychology</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-3 text-center">Personalized Insights</h3>
              <p className="text-[#64748b] text-center">
                Receive detailed insights about your personality type, motivations, and behavioral patterns based on established psychology.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="h-16 w-16 bg-[#ede9fe] text-[#7c3aed] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons text-2xl">trending_up</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-3 text-center">Growth-Oriented Framework</h3>
              <p className="text-[#64748b] text-center">
                Discover pathways for personal development based on your unique personality structure and patterns.
              </p>
            </div>
          </div>
          
          {/* Supporting imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f8fafc] rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video flex items-center justify-center p-6">
                <div className="w-40 h-64 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#a78bfa] rounded-full"></div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-28 h-14 bg-[#10b981] rounded-lg"></div>
                  <div className="absolute bottom-22 left-1/2 transform -translate-x-1/2 w-24 h-14 bg-[#f97316] rounded-lg"></div>
                  <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 w-20 h-14 bg-[#3b82f6] rounded-lg"></div>
                  <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 w-16 h-14 bg-[#7c3aed] rounded-lg"></div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <p className="text-center text-sm text-[#64748b]">Example: Analytical Achiever Tower</p>
              </div>
            </div>
            
            <div className="bg-[#f8fafc] rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video flex items-center justify-center p-6">
                <div className="w-40 h-64 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#a78bfa] rounded-full"></div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-28 h-14 bg-[#f97316] rounded-lg"></div>
                  <div className="absolute bottom-22 left-1/2 transform -translate-x-1/2 w-24 h-14 bg-[#10b981] rounded-lg"></div>
                  <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 w-20 h-14 bg-[#7c3aed] rounded-lg"></div>
                  <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 w-16 h-14 bg-[#3b82f6] rounded-lg"></div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <p className="text-center text-sm text-[#64748b]">Example: Empathetic Supporter Tower</p>
              </div>
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
                    <span className="material-icons text-[#7c3aed] text-2xl">home</span>
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
                    <span className="material-icons text-[#7c3aed] text-2xl">view_in_ar</span>
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
                    <span className="material-icons text-[#7c3aed] text-2xl">palette</span>
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
                    <span className="material-icons text-[#7c3aed] text-2xl">dashboard_customize</span>
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
      
      {/* Preview/Example Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#1e293b] mb-4">See What You'll Discover</h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              Your completed personality tower reveals insights about your personality type, operating states, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
                    <p className="font-medium text-[#1e293b] mb-1">Type 3 - The Achiever</p>
                    <p className="text-sm text-[#64748b]">Driven, image-conscious, and adaptive to success standards</p>
                  </div>
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <p className="font-medium text-[#1e293b] mb-1">Wing 4 Influence</p>
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
                  <p className="text-sm font-medium text-[#7c3aed]">9 Core Personality Types</p>
                </div>
                <div className="bg-[#ede9fe] rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-[#7c3aed]">Wing Variations</p>
                </div>
                <div className="bg-[#ede9fe] rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-[#7c3aed]">Operating States</p>
                </div>
                <div className="bg-[#ede9fe] rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-[#7c3aed]">Instinctual Variants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#1e293b] mb-4">What Others Have Discovered</h2>
            <p className="text-lg text-[#64748b] max-w-3xl mx-auto">
              Hear from people who have gained insights from their personality towers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <span className="material-icons text-[#7c3aed] text-sm mr-1">psychology</span>
                <p className="text-xs text-[#7c3aed]">Type 3 Tower with 4 Wing</p>
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
                <span className="material-icons text-[#7c3aed] text-sm mr-1">psychology</span>
                <p className="text-xs text-[#7c3aed]">Type 5 Tower with 6 Wing</p>
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
                <span className="material-icons text-[#7c3aed] text-sm mr-1">psychology</span>
                <p className="text-xs text-[#7c3aed]">Type 2 Tower with 1 Wing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final Call-to-Action Section */}
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
      
      {/* Footer */}
      <footer className="py-12 bg-[#4c1d95] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and copyright */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                  <span className="material-icons text-[#7c3aed]">psychology</span>
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
              
              {/* Social Media */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <span className="material-icons text-sm">facebook</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <span className="material-icons text-sm">twitter</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <span className="material-icons text-sm">instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;