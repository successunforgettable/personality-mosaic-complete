import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { FoundationStone } from '@/types/assessment';
import { foundationStoneSets } from '@/lib/personality';

const PhaseOne = () => {
  const { state, selectFoundationStone, nextFoundationSet } = useAssessment();
  const { foundationSet, selectedFoundationStones } = state;
  
  const [currentSet, setCurrentSet] = useState<FoundationStone[]>([]);
  
  // Get the current set of foundation stones
  useEffect(() => {
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
        <p className="text-gray-600 max-w-2xl mx-auto">Choose the stone that resonates most with your core BASELINES and personality traits. These will form the foundation of your personality tower.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {currentSet.map((stone) => (
          <motion.div
            key={stone.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="text-center py-4 transition-all cursor-pointer"
            onClick={() => handleStoneSelection(stone)}
          >
            <div className="relative h-72 w-64 mx-auto">
              <div 
                className={`absolute inset-0 hexagon-shape border-2 border-white shadow-lg ${selectedFoundationStones.some(s => s.id === stone.id) ? 'selected' : ''}`}
                style={{ 
                  background: stone.category === 'Head' 
                    ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' 
                    : stone.category === 'Heart'
                    ? 'linear-gradient(135deg, #EC4899, #8B5CF6)'
                    : 'linear-gradient(135deg, #10B981, #3B82F6)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                <div className="absolute inset-0 hexagon-content flex flex-col items-center justify-center p-5 text-center">
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1">
                    <span className="text-xs font-semibold" style={{ 
                      color: stone.category === 'Head' 
                        ? '#4F46E5' 
                        : stone.category === 'Heart' 
                        ? '#EC4899' 
                        : '#10B981' 
                    }}>{stone.category}</span>
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-3 mt-4">{stone.name}</h3>
                  <p className="text-white text-sm px-3">{stone.baselines}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-10">
        <p className="text-gray-600 mb-2">Set {foundationSet} of 3</p>
        <div className="flex justify-center space-x-2">
          <span className={`h-2.5 w-2.5 rounded-full ${foundationSet === 1 ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
          <span className={`h-2.5 w-2.5 rounded-full ${foundationSet === 2 ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
          <span className={`h-2.5 w-2.5 rounded-full ${foundationSet === 3 ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 italic text-sm mb-6">Choose a foundation stone to continue building your personality tower.</p>
      </div>
    </motion.div>
  );
};

export default PhaseOne;