import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { StateDistribution } from '@/types/assessment';
import TowerVisualization from './TowerVisualization';

const PhaseThree = () => {
  const { state, updateStateDistribution, setPhase } = useAssessment();
  const { stateDistribution } = state;
  
  const [localDistribution, setLocalDistribution] = useState<StateDistribution>(stateDistribution);
  
  const handleSliderChange = (state: keyof StateDistribution, value: number) => {
    // Calculate the other values so they sum to 100%
    const remaining = 100 - value;
    
    // Distribute the remaining percentage among the other two states proportionally
    const otherStates = Object.keys(localDistribution).filter(key => key !== state) as Array<keyof StateDistribution>;
    const currentSum = otherStates.reduce((sum, key) => sum + localDistribution[key], 0);
    
    const newDistribution = { ...localDistribution, [state]: value };
    
    if (currentSum > 0) {
      otherStates.forEach(key => {
        const proportion = localDistribution[key] / currentSum;
        newDistribution[key] = Math.round(remaining * proportion);
      });
      
      // Adjust for rounding errors
      const newSum = Object.values(newDistribution).reduce((sum, val) => sum + val, 0);
      if (newSum !== 100) {
        newDistribution[otherStates[0]] += (100 - newSum);
      }
    } else {
      // If other states are both 0, distribute evenly
      otherStates.forEach(key => {
        newDistribution[key] = Math.round(remaining / otherStates.length);
      });
    }
    
    setLocalDistribution(newDistribution);
  };
  
  const handleContinue = () => {
    updateStateDistribution(localDistribution);
    setPhase(4);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-fade-in"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Adjust Your Color Palette</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">These sliders represent your state distribution. Adjust them to indicate how much time you spend in each state.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Healthy State Slider */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-800">Healthy State</label>
                <span className="text-sm font-medium text-green-600">{localDistribution.healthy}%</span>
              </div>
              <div className="bg-gradient-to-b from-green-100 to-green-200 p-4 rounded-lg mb-4 shadow-inner">
                <div className="relative h-48">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={localDistribution.healthy} 
                    onChange={(e) => handleSliderChange('healthy', parseInt(e.target.value))}
                    className="custom-slider absolute inset-0 w-6 h-full transform -rotate-90 origin-bottom-left translate-y-full" 
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                <p>Your best and most balanced self</p>
              </div>
            </div>

            {/* Average State Slider */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-800">Average State</label>
                <span className="text-sm font-medium text-blue-600">{localDistribution.average}%</span>
              </div>
              <div className="bg-gradient-to-b from-blue-100 to-blue-200 p-4 rounded-lg mb-4 shadow-inner">
                <div className="relative h-48">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={localDistribution.average} 
                    onChange={(e) => handleSliderChange('average', parseInt(e.target.value))}
                    className="custom-slider absolute inset-0 w-6 h-full transform -rotate-90 origin-bottom-left translate-y-full" 
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                <p>Your everyday functional self</p>
              </div>
            </div>

            {/* Unhealthy State Slider */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-800">Unhealthy State</label>
                <span className="text-sm font-medium text-red-600">{localDistribution.unhealthy}%</span>
              </div>
              <div className="bg-gradient-to-b from-red-100 to-red-200 p-4 rounded-lg mb-4 shadow-inner">
                <div className="relative h-48">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={localDistribution.unhealthy} 
                    onChange={(e) => handleSliderChange('unhealthy', parseInt(e.target.value))}
                    className="custom-slider absolute inset-0 w-6 h-full transform -rotate-90 origin-bottom-left translate-y-full" 
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                <p>Your stressed or reactive self</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Distribution</span>
              <span className="text-sm font-medium text-primary-600">100%</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="flex h-full">
                <div className="bg-green-500 h-full" style={{ width: `${localDistribution.healthy}%` }}></div>
                <div className="bg-blue-500 h-full" style={{ width: `${localDistribution.average}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${localDistribution.unhealthy}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Colorful Tower</h3>
          <p className="text-gray-600 text-sm">See how your state distribution affects your tower's colors</p>
        </div>

        <TowerVisualization stateDistribution={localDistribution} />
      </div>

      <div className="flex justify-between">
        <button 
          className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
          onClick={() => setPhase(2)}
        >
          Previous Phase
        </button>
        <button 
          className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all"
          onClick={handleContinue}
        >
          Continue to Detail Elements
        </button>
      </div>
    </motion.div>
  );
};

export default PhaseThree;
