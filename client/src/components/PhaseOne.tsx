import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAssessment } from "@/context/AssessmentContext";
import { FoundationStone } from "@/types/assessment";
import { foundationStoneSets } from "@/lib/personality";

const PhaseOne = () => {
  const { state, selectFoundationStone, nextFoundationSet } = useAssessment();
  const { foundationSet, selectedFoundationStones } = state;
  
  const [currentSet, setCurrentSet] = useState<FoundationStone[]>([]);
  
  useEffect(() => {
    // Get the current set of foundation stones based on the foundationSet number
    const set = foundationStoneSets.find(set => set.id === foundationSet);
    if (set) {
      setCurrentSet(set.stones);
    }
  }, [foundationSet]);
  
  const handleStoneSelection = (stone: FoundationStone) => {
    selectFoundationStone(stone);
    nextFoundationSet();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-fade-in"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Select Your Foundation Stones</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Choose the stone that resonates most with your core values and personality traits. These will form the foundation of your personality tower.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <AnimatePresence mode="wait">
          {currentSet.map((stone) => (
            <motion.div
              key={stone.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all cursor-pointer border-2 border-transparent hover:border-primary-300"
              onClick={() => handleStoneSelection(stone)}
            >
              <div className="h-32 overflow-hidden">
                <img src={stone.image} alt={`${stone.name} stone texture`} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{stone.name}</h3>
                <p className="text-gray-600 text-sm">{stone.values}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center mb-10">
        <p className="text-gray-600 mb-2">Set {foundationSet} of 3</p>
        <div className="flex justify-center space-x-2">
          <span className={`h-2.5 w-2.5 rounded-full ${foundationSet === 1 ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
          <span className={`h-2.5 w-2.5 rounded-full ${foundationSet === 2 ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
          <span className={`h-2.5 w-2.5 rounded-full ${foundationSet === 3 ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Foundation</h3>
          <p className="text-gray-600 text-sm">Watch your foundation take shape as you make selections</p>
        </div>

        <div className="w-64 h-64 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {selectedFoundationStones.length === 0 ? (
              <div className="w-40 h-40 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                <span className="material-icons text-6xl">foundation</span>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full bg-primary-100 border-4 border-primary-300 flex items-center justify-center relative overflow-hidden">
                {selectedFoundationStones.map((stone, index) => {
                  const angle = (index / selectedFoundationStones.length) * Math.PI * 2;
                  const x = Math.cos(angle) * 50 + 50;
                  const y = Math.sin(angle) * 50 + 50;
                  
                  return (
                    <motion.div
                      key={stone.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute w-10 h-10 rounded-md bg-primary-200 border border-primary-300 shadow-md"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.div 
        className="flex justify-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button 
          className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all"
          onClick={nextFoundationSet}
        >
          {foundationSet < 3 ? 'Continue to Next Set' : 'Continue to Building Blocks'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PhaseOne;
