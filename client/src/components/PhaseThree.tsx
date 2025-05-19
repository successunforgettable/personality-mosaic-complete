import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { StateDistribution } from '@/types/assessment';
import TowerVisualization from './TowerVisualization';

const PhaseThree = () => {
  const { state, updateStateDistribution, setPhase } = useAssessment();
  const { stateDistribution } = state;
  
  const [localDistribution, setLocalDistribution] = useState<StateDistribution>(stateDistribution);
  // Track which two states are selected (per spec: exactly 2 color palettes)
  const [selectedStates, setSelectedStates] = useState<Array<keyof StateDistribution>>([]);
  // Tracking slider value for distribution between selected states
  const [sliderValue, setSliderValue] = useState<number>(50);
  // Feedback message to display to the user
  const [feedback, setFeedback] = useState<string>('Select exactly two color palettes that represent your common operating states.');
  
  // Add state for saving status
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Helper function to format state names for display
  const formatStateName = (state: keyof StateDistribution): string => {
    if (state === 'veryGood') return 'Very Good';
    if (state === 'belowAverage') return 'Below Average';
    return state.charAt(0).toUpperCase() + state.slice(1);
  };
  
  // Update the distribution based on the slider value
  const updateDistribution = (states: Array<keyof StateDistribution>, firstStatePercentage: number) => {
    if (states.length !== 2) return;
    
    const [state1, state2] = states;
    const state1Value = firstStatePercentage;
    const state2Value = 100 - firstStatePercentage;
    
    // Initialize a new distribution with all states at 0%
    const newDistribution: StateDistribution = {
      veryGood: 0,
      good: 0,
      average: 0,
      belowAverage: 0,
      destructive: 0
    };
    
    // Set the two selected states' values
    newDistribution[state1] = state1Value;
    newDistribution[state2] = state2Value;
    
    setLocalDistribution(newDistribution);
  };
  
  const toggleStateSelection = (stateKey: keyof StateDistribution) => {
    if (selectedStates.includes(stateKey)) {
      // Remove from selected states
      setSelectedStates(selectedStates.filter(s => s !== stateKey));
      setFeedback('Select exactly two color palettes that represent your common operating states.');
    } else {
      // If already have 2 selected states, replace the first one
      if (selectedStates.length >= 2) {
        const newSelectedStates = [selectedStates[1], stateKey];
        setSelectedStates(newSelectedStates);
        
        // Create equal distribution between the two selected states
        updateDistribution(newSelectedStates, 50);
        setSliderValue(50);
        
        setFeedback(`You've selected ${formatStateName(newSelectedStates[0])} and ${formatStateName(newSelectedStates[1])} states. Use the slider to adjust their balance.`);
      } else {
        // Add to selected states
        const newSelectedStates = [...selectedStates, stateKey];
        setSelectedStates(newSelectedStates);
        
        if (newSelectedStates.length === 2) {
          // Create equal distribution between the two selected states
          updateDistribution(newSelectedStates, 50);
          setSliderValue(50);
          
          setFeedback(`You've selected ${formatStateName(newSelectedStates[0])} and ${formatStateName(newSelectedStates[1])} states. Use the slider to adjust their balance.`);
        }
      }
    }
  };
  
  // Handle slider change
  const handleSliderChange = (value: number) => {
    if (selectedStates.length !== 2) return;
    
    setSliderValue(value);
    updateDistribution(selectedStates, value);
    
    setFeedback(
      `${formatStateName(selectedStates[0])}: ${value}%, ${formatStateName(selectedStates[1])}: ${100-value}%`
    );
  };
  
  const handleContinue = async () => {
    // Validate that two states have been selected
    if (selectedStates.length !== 2) {
      setFeedback('Please select exactly two color palettes before continuing.');
      return;
    }
    
    // Update local context state
    console.log("Saving state distribution:", localDistribution);
    updateStateDistribution(localDistribution);
    
    // Save to database
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // For demo purposes, we'll use the existing user
      const userId = 1;
      
      const response = await fetch('/api/assessment/state-distribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          stateDistribution: localDistribution
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save state distribution');
      }
      
      // Successfully saved to database
      console.log('State distribution saved to database');
      
      // Continue to next phase
      setPhase(4);
    } catch (error) {
      console.error('Error saving state distribution:', error);
      setSaveError(error instanceof Error ? error.message : 'An unexpected error occurred');
      // Continue anyway after showing error briefly
      setTimeout(() => {
        setPhase(4);
      }, 2000);
    } finally {
      setIsSaving(false);
    }
  };

  // Define color palette card information based on technical specification
  const colorPalettes = [
    {
      key: 'veryGood' as keyof StateDistribution,
      title: 'Very Good State',
      description: 'Your optimal and most integrated state',
      gradient: 'from-green-100 to-green-200',
      color: 'green',
      textColor: 'text-green-600',
      activeColor: 'bg-green-600',
      primaryColor: '#22c55e',
      lightColor: '#4ade80',
      darkColor: '#166534'
    },
    {
      key: 'good' as keyof StateDistribution,
      title: 'Good State',
      description: 'Your healthy and growth-oriented state',
      gradient: 'from-emerald-100 to-emerald-200',
      color: 'emerald',
      textColor: 'text-emerald-600',
      activeColor: 'bg-emerald-600',
      primaryColor: '#10b981',
      lightColor: '#34d399',
      darkColor: '#065f46'
    },
    {
      key: 'average' as keyof StateDistribution,
      title: 'Average State',
      description: 'Your everyday functional self',
      gradient: 'from-amber-100 to-amber-200',
      color: 'amber',
      textColor: 'text-amber-600',
      activeColor: 'bg-amber-600',
      primaryColor: '#f59e0b',
      lightColor: '#fcd34d',
      darkColor: '#b45309'
    },
    {
      key: 'belowAverage' as keyof StateDistribution,
      title: 'Below Average State',
      description: 'Your stressed or reactive self',
      gradient: 'from-orange-100 to-orange-200',
      color: 'orange',
      textColor: 'text-orange-600',
      activeColor: 'bg-orange-600',
      primaryColor: '#f97316',
      lightColor: '#fb923c',
      darkColor: '#c2410c'
    },
    {
      key: 'destructive' as keyof StateDistribution,
      title: 'Destructive State',
      description: 'Your unhealthy and harmful patterns',
      gradient: 'from-red-100 to-red-200',
      color: 'red',
      textColor: 'text-red-600',
      activeColor: 'bg-red-600',
      primaryColor: '#ef4444',
      lightColor: '#f87171',
      darkColor: '#b91c1c'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-fade-in"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Adjust Your Color Palette</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Select exactly two color palettes that represent your common operating states.</p>
      </div>

      {/* Feedback message */}
      <div className="max-w-2xl mx-auto mb-6 bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800">
        <p>{feedback}</p>
      </div>

      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          {/* Color Palette Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {colorPalettes.map(palette => (
              <div 
                key={palette.key} 
                className={`flex flex-col cursor-pointer transition-all rounded-lg overflow-hidden ${
                  selectedStates.includes(palette.key) ? 'ring-2 ring-offset-2 ring-' + palette.color + '-500' : ''
                }`}
                onClick={() => toggleStateSelection(palette.key)}
              >
                <div className={`bg-gradient-to-b ${palette.gradient} p-6 flex flex-col items-center justify-center text-center h-48`}>
                  <div className="mb-2">
                    {selectedStates.includes(palette.key) ? (
                      <div className={`h-8 w-8 rounded-full ${palette.activeColor} text-white flex items-center justify-center`}>
                        <span className="material-icons text-sm">check</span>
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-50 border-2 border-gray-300"></div>
                    )}
                  </div>
                  <h3 className={`font-semibold ${palette.textColor} text-lg mb-2`}>{palette.title}</h3>
                  <p className="text-gray-600 text-sm">{palette.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Color Blending Slider - only appears after 2 palettes are selected */}
          {selectedStates.length === 2 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Blend Your Color Palette</h3>
              <div className="mb-2 flex justify-between">
                <span className={`${colorPalettes.find(p => p.key === selectedStates[0])?.textColor} font-medium`}>
                  {formatStateName(selectedStates[0])} {sliderValue}%
                </span>
                <span className={`${colorPalettes.find(p => p.key === selectedStates[1])?.textColor} font-medium`}>
                  {formatStateName(selectedStates[1])} {100 - sliderValue}%
                </span>
              </div>
              <div className="relative h-10 rounded-lg overflow-hidden" 
                style={{
                  background: `linear-gradient(to right, 
                    ${colorPalettes.find(p => p.key === selectedStates[0])?.primaryColor || '#22c55e'}, 
                    ${colorPalettes.find(p => p.key === selectedStates[1])?.primaryColor || '#3b82f6'})`
                }}>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderValue} 
                  onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-6 w-6 bg-white rounded-full shadow-md" 
                  style={{ left: `${sliderValue}%`, marginLeft: '-12px' }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Adjust the slider to show how much time you spend in each state
              </p>
            </div>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Distribution</span>
              <span className="text-sm font-medium text-primary-600">100%</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="flex h-full">
                <div className="bg-green-500 h-full" style={{ width: `${localDistribution.veryGood}%` }}></div>
                <div className="bg-emerald-500 h-full" style={{ width: `${localDistribution.good}%` }}></div>
                <div className="bg-amber-500 h-full" style={{ width: `${localDistribution.average}%` }}></div>
                <div className="bg-orange-500 h-full" style={{ width: `${localDistribution.belowAverage}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${localDistribution.destructive}%` }}></div>
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

      {/* Error message if saving fails */}
      {saveError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <p className="flex items-center">
            <span className="material-icons mr-2 text-red-500">error</span>
            {saveError}
          </p>
        </div>
      )}
      
      <div className="flex justify-between">
        <button 
          className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
          onClick={() => setPhase(2)}
          disabled={isSaving}
        >
          Previous Phase
        </button>
        <button 
          className={`px-6 py-3 ${isSaving ? 'bg-gray-400' : selectedStates.length !== 2 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} 
            text-white rounded-lg font-medium shadow-md transition-all flex items-center`}
          onClick={handleContinue}
          disabled={isSaving || selectedStates.length !== 2}
        >
          {isSaving ? (
            <>
              <span className="material-icons animate-spin mr-2">cached</span>
              Saving...
            </>
          ) : (
            'Continue to Detail Elements'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default PhaseThree;