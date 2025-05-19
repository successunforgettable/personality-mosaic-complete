import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { StateDistribution } from '@/types/assessment';
import TowerVisualization from './TowerVisualization';

const PhaseThree = () => {
  const { state, updateStateDistribution, setPhase } = useAssessment();
  const { stateDistribution } = state;
  
  const [localDistribution, setLocalDistribution] = useState<StateDistribution>(stateDistribution);
  // Track which two states are active for adjustments (per spec: only 2 sliders should be adjustable)
  const [activeStates, setActiveStates] = useState<Array<keyof StateDistribution>>(['healthy', 'average']);
  // Feedback message to display to the user
  const [feedback, setFeedback] = useState<string>('Select exactly two states to adjust. The third state will be calculated automatically.');
  
  const toggleActiveState = (stateKey: keyof StateDistribution) => {
    if (activeStates.includes(stateKey)) {
      // If trying to deselect when only 2 are selected, don't allow it
      if (activeStates.length <= 2) {
        setFeedback('You must have exactly two active states. Select a different state first to deactivate this one.');
        return;
      }
      
      // Remove from active states
      setActiveStates(activeStates.filter(s => s !== stateKey));
    } else {
      // If already have 2 active states, replace the first one
      if (activeStates.length >= 2) {
        const newActiveStates = [...activeStates.slice(1), stateKey];
        setActiveStates(newActiveStates);
        
        // Update feedback
        setFeedback(`You're now adjusting ${newActiveStates[0]} and ${newActiveStates[1]} states. ${getInactiveState(newActiveStates)} is auto-calculated.`);
      } else {
        // Add to active states
        const newActiveStates = [...activeStates, stateKey];
        setActiveStates(newActiveStates);
        
        // Update feedback
        if (newActiveStates.length === 2) {
          setFeedback(`You're now adjusting ${newActiveStates[0]} and ${newActiveStates[1]} states. ${getInactiveState(newActiveStates)} is auto-calculated.`);
        }
      }
    }
  };
  
  // Helper to get the inactive state
  const getInactiveState = (active: Array<keyof StateDistribution>): keyof StateDistribution => {
    return (['healthy', 'average', 'unhealthy'] as Array<keyof StateDistribution>).find(
      state => !active.includes(state)
    ) as keyof StateDistribution;
  };
  
  const handleSliderChange = (stateKey: keyof StateDistribution, value: number) => {
    // Only allow changes to active states
    if (!activeStates.includes(stateKey)) {
      setFeedback(`The ${stateKey} state is locked. Toggle it active first to adjust.`);
      return;
    }
    
    // Find the other active state and the inactive state
    const otherActiveState = activeStates.find(s => s !== stateKey) as keyof StateDistribution;
    const inactiveState = getInactiveState(activeStates);
    
    // Calculate the inactive state's value to ensure sum is 100%
    const newInactiveValue = 100 - value - localDistribution[otherActiveState];
    
    // Ensure we don't go negative
    if (newInactiveValue < 0) {
      // Adjust the value to maintain valid distribution
      const maxAllowedValue = 100 - localDistribution[otherActiveState];
      const newValue = Math.min(value, maxAllowedValue);
      
      const newDistribution = { 
        ...localDistribution, 
        [stateKey]: newValue,
        [inactiveState]: 0 
      };
      
      setFeedback(`Maximum value for ${stateKey} is ${maxAllowedValue}% when ${otherActiveState} is at ${localDistribution[otherActiveState]}%.`);
      setLocalDistribution(newDistribution);
      return;
    }
    
    // Update the distribution
    const newDistribution = { 
      ...localDistribution, 
      [stateKey]: value,
      [inactiveState]: newInactiveValue 
    };
    
    // Update feedback with current distribution
    setFeedback(`You spend ${newDistribution.healthy}% in Healthy, ${newDistribution.average}% in Average, and ${newDistribution.unhealthy}% in Unhealthy state.`);
    
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
        <p className="text-gray-600 max-w-2xl mx-auto">Select exactly two states to adjust. The third state will be calculated automatically.</p>
      </div>

      {/* Feedback message */}
      <div className="max-w-2xl mx-auto mb-6 bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800">
        <p>{feedback}</p>
      </div>

      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Healthy State Slider */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <label className="font-medium text-gray-800 mr-2">Healthy State</label>
                  <button 
                    onClick={() => toggleActiveState('healthy')}
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      activeStates.includes('healthy') 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    title={activeStates.includes('healthy') ? 'Active' : 'Inactive'}
                  >
                    <span className="material-icons text-sm">{activeStates.includes('healthy') ? 'check' : 'lock'}</span>
                  </button>
                </div>
                <span className="text-sm font-medium text-green-600">{localDistribution.healthy}%</span>
              </div>
              <div className={`bg-gradient-to-b from-green-100 to-green-200 p-4 rounded-lg mb-4 shadow-inner ${!activeStates.includes('healthy') ? 'opacity-50' : ''}`}>
                <div className="relative h-48">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={localDistribution.healthy} 
                    onChange={(e) => handleSliderChange('healthy', parseInt(e.target.value))}
                    className="custom-slider absolute inset-0 w-6 h-full transform -rotate-90 origin-bottom-left translate-y-full" 
                    disabled={!activeStates.includes('healthy')}
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
                <div className="flex items-center">
                  <label className="font-medium text-gray-800 mr-2">Average State</label>
                  <button 
                    onClick={() => toggleActiveState('average')}
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      activeStates.includes('average') 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    title={activeStates.includes('average') ? 'Active' : 'Inactive'}
                  >
                    <span className="material-icons text-sm">{activeStates.includes('average') ? 'check' : 'lock'}</span>
                  </button>
                </div>
                <span className="text-sm font-medium text-blue-600">{localDistribution.average}%</span>
              </div>
              <div className={`bg-gradient-to-b from-blue-100 to-blue-200 p-4 rounded-lg mb-4 shadow-inner ${!activeStates.includes('average') ? 'opacity-50' : ''}`}>
                <div className="relative h-48">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={localDistribution.average} 
                    onChange={(e) => handleSliderChange('average', parseInt(e.target.value))}
                    className="custom-slider absolute inset-0 w-6 h-full transform -rotate-90 origin-bottom-left translate-y-full" 
                    disabled={!activeStates.includes('average')}
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
                <div className="flex items-center">
                  <label className="font-medium text-gray-800 mr-2">Unhealthy State</label>
                  <button 
                    onClick={() => toggleActiveState('unhealthy')}
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      activeStates.includes('unhealthy') 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    title={activeStates.includes('unhealthy') ? 'Active' : 'Inactive'}
                  >
                    <span className="material-icons text-sm">{activeStates.includes('unhealthy') ? 'check' : 'lock'}</span>
                  </button>
                </div>
                <span className="text-sm font-medium text-red-600">{localDistribution.unhealthy}%</span>
              </div>
              <div className={`bg-gradient-to-b from-red-100 to-red-200 p-4 rounded-lg mb-4 shadow-inner ${!activeStates.includes('unhealthy') ? 'opacity-50' : ''}`}>
                <div className="relative h-48">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={localDistribution.unhealthy} 
                    onChange={(e) => handleSliderChange('unhealthy', parseInt(e.target.value))}
                    className="custom-slider absolute inset-0 w-6 h-full transform -rotate-90 origin-bottom-left translate-y-full" 
                    disabled={!activeStates.includes('unhealthy')}
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
