import { Link } from "wouter";
import { motion } from "framer-motion";

const Home = () => {
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
          <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden shadow-lg relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-primary-200 rounded-full"></div>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-36 h-16 rounded-lg tower-gradient"></div>
                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-32 h-16 rounded-lg tower-gradient opacity-80"></div>
                <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-lg tower-gradient opacity-60"></div>
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
            <p className="text-gray-600">Adjust sliders to show how much time you spend in healthy, average, and unhealthy states.</p>
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
            <p className="text-gray-600">Add finishing touches by arranging detail elements that reflect how you focus your energy.</p>
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
