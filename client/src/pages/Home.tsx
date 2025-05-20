import { Link } from "wouter";
import { motion } from "framer-motion";
import TowerVisualization from "@/components/TowerVisualization";
import React, { useState } from "react";

const Home = () => {
  // Demonstration state distribution - matches the screenshot
  const [stateDistribution, setStateDistribution] = useState({
    veryGood: 0,  
    good: 30,     // Green 30%
    average: 0,
    belowAverage: 70, // Below Average 70% (orange)
    destructive: 0
  });
  
  // Handle slider change for demonstration
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setStateDistribution({
      veryGood: 0,
      good: value,
      average: 0,
      belowAverage: 100 - value,
      destructive: 0
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Discover Your <span className="text-primary">Personality</span> Mosaic
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore your unique personality through our interactive, visually engaging assessment. Build your personality tower and gain meaningful insights about yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/assessment">
              <a className="px-8 py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all text-center">
                Begin Assessment
              </a>
            </Link>
            <Link href="/about">
              <a className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all text-center">
                Learn More
              </a>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Demo Color Palette Section */}
          <div className="w-full bg-gray-50 rounded-2xl overflow-hidden shadow-lg p-6">
            <div className="flex flex-col space-y-6">
              {/* State Distribution Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-green-600 font-medium">Good 30%</span>
                  <span className="text-orange-600 font-medium">Below Average 70%</span>
                </div>
                
                <div className="relative h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-full overflow-hidden">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-6 h-6 bg-white rounded-full shadow-md absolute" style={{ left: `30%`, transform: 'translateX(-50%)' }}>
                      <div className="w-2 h-2 bg-gray-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={stateDistribution.good}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                </div>
                
                <p className="text-sm text-gray-500 mt-2">Adjust the slider to show how much time you spend in each state</p>
              </div>
              
              {/* Distribution Bar */}
              <div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Distribution</span>
                  <span className="text-sm font-medium text-primary-600">100%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="flex h-full">
                    <div className="bg-green-500 h-full" style={{ width: `${stateDistribution.good}%` }}></div>
                    <div className="bg-orange-500 h-full" style={{ width: `${stateDistribution.belowAverage}%` }}></div>
                  </div>
                </div>
              </div>
              
              {/* Tower Visualization */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-center mb-2">Your Colorful Tower</h3>
                <p className="text-sm text-gray-600 text-center mb-4">See how your state distribution affects your tower's colors</p>
                
                <div className="flex justify-center">
                  <div className="w-48 h-64">
                    <TowerVisualization 
                      stateDistribution={stateDistribution}
                      showHotspots={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our assessment takes you through four engaging phases to build your unique personality tower.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
              <span className="material-icons">foundation</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Foundation Stones</h3>
            <p className="text-gray-600">Select the foundation stones that resonate with your core values and personality traits.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
              <span className="material-icons">view_in_ar</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Building Blocks</h3>
            <p className="text-gray-600">Choose which building blocks best represent how you think and make decisions.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
              <span className="material-icons">palette</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Color Palette</h3>
            <p className="text-gray-600">Select color palettes and adjust mixing to show how much time you spend in different psychological states.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
              <span className="material-icons">dashboard_customize</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Detail Elements</h3>
            <p className="text-gray-600">Drag and drop detail elements to customize how your personality tower gets decorated.</p>
          </motion.div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">Discover Your True Self</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Start your journey to better self-understanding today with our interactive assessment.</p>
        </div>
        
        <div className="flex justify-center">
          <Link href="/assessment">
            <a className="px-8 py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all">
              Begin Your Assessment
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
