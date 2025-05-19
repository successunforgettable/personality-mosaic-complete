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
      description: 'I feel balanced and at peace with imperfection. I channel my natural strengths into positive change.',
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
      description: 'I am growing in self-awareness and making progress. I recognize patterns and choose better responses.',
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
      description: 'I function adequately but fall back into old habits. I am aware of tendencies but not always managing them.',
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
      description: 'I get caught in reactive patterns and find it difficult to pause. My less healthy tendencies are pronounced.',
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
      description: 'I am caught in unhealthy patterns and blind spots. I cause harm to myself or others without recognizing it.',
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
              <motion.div 
                key={palette.key} 
                className={`flex flex-col cursor-pointer transition-all rounded-lg overflow-hidden border-2 border-white shadow-md ${
                  selectedStates.includes(palette.key) ? 'ring-2 ring-offset-2 ring-' + palette.color + '-500' : ''
                }`}
                onClick={() => toggleStateSelection(palette.key)}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                style={{ height: "120px", width: "200px", maxWidth: "100%" }}
              >
                {/* Paint palette shape with proper design */}
                <div 
                  className={`bg-gradient-to-br ${palette.gradient} p-4 flex flex-col items-center justify-center text-center relative h-full`}
                  style={{ 
                    backgroundImage: `radial-gradient(circle at 70% 30%, ${palette.lightColor} 0%, ${palette.primaryColor} 50%, ${palette.darkColor} 100%)` 
                  }}
                >
                  {/* Paint color swatches */}
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.lightColor }}></div>
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.primaryColor }}></div>
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.darkColor }}></div>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedStates.includes(palette.key) && (
                    <div className="absolute top-2 right-2">
                      <div className={`h-6 w-6 rounded-full bg-white text-${palette.color}-600 flex items-center justify-center shadow-md`}>
                        <span className="material-icons text-sm">check</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Palette thumb hole */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-white opacity-30 rounded-t-full"></div>
                  
                  {/* Content */}
                  <h3 className={`font-medium text-white text-base drop-shadow-md mb-1`}>{formatStateName(palette.key)}</h3>
                  <p className="text-white text-xs drop-shadow-md">{palette.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Color Blending Slider - only appears after 2 palettes are selected */}
          {selectedStates.length === 2 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Color Mixing Tool</h3>
              <div className="mb-2 flex justify-between">
                <span className={`${colorPalettes.find(p => p.key === selectedStates[0])?.textColor} font-medium`}>
                  {formatStateName(selectedStates[0])} {sliderValue}%
                </span>
                <span className={`${colorPalettes.find(p => p.key === selectedStates[1])?.textColor} font-medium`}>
                  {formatStateName(selectedStates[1])} {100 - sliderValue}%
                </span>
              </div>
              
              {/* Paint mixing metaphor visualization */}
              <div className="relative">
                {/* Paint mixing bowl - shows the gradual blend */}
                <div className="relative h-16 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner mb-2" 
                  style={{
                    background: `linear-gradient(to right, 
                      ${colorPalettes.find(p => p.key === selectedStates[0])?.primaryColor || '#22c55e'}, 
                      ${colorPalettes.find(p => p.key === selectedStates[1])?.primaryColor || '#3b82f6'})`
                  }}>
                  {/* Paint drip effect */}
                  <div className="absolute top-0 left-1/4 w-1 h-3 rounded-b-lg" 
                    style={{ backgroundColor: colorPalettes.find(p => p.key === selectedStates[0])?.primaryColor }}></div>
                  <div className="absolute top-0 right-1/4 w-1 h-5 rounded-b-lg" 
                    style={{ backgroundColor: colorPalettes.find(p => p.key === selectedStates[1])?.primaryColor }}></div>
                  
                  {/* Mixing swirl effect */}
                  <div className="absolute inset-0 opacity-10" 
                    style={{ 
                      backgroundImage: `radial-gradient(circle at ${sliderValue}% 50%, white, transparent 80%)`
                    }}></div>
                </div>
                
                {/* Slider control */}
                <div className="relative h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-300" 
                  style={{ 
                    backgroundImage: `linear-gradient(to right, 
                      ${colorPalettes.find(p => p.key === selectedStates[0])?.primaryColor || '#22c55e'}, 
                      ${colorPalettes.find(p => p.key === selectedStates[1])?.primaryColor || '#3b82f6'})` 
                  }}>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderValue} 
                    onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-8 w-8 bg-white rounded-full shadow-md border-2 border-gray-200 flex items-center justify-center" 
                    style={{ left: `${sliderValue}%`, marginLeft: '-16px' }}>
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-3 italic">
                Adjust the slider to blend your selected states and show how much time you spend in each one
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

        {/* Animated tower visualization */}
        <motion.div 
          className="relative"
          animate={{ scale: [0.95, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {selectedStates.length === 2 && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-xs">
              <span className="text-gray-700">Painting in progress...</span>
            </div>
          )}
          
          {/* Paint drips animation shown when adjusting slider */}
          {selectedStates.length === 2 && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-8 z-0">
              <div 
                className="absolute left-1/4 w-1 rounded-b-full" 
                style={{ 
                  height: '15px', 
                  backgroundColor: colorPalettes.find(p => p.key === selectedStates[0])?.primaryColor,
                  transition: 'height 0.3s ease-out',
                  opacity: 0.8
                }}
              ></div>
              <div 
                className="absolute left-3/4 w-1 rounded-b-full" 
                style={{ 
                  height: '10px', 
                  backgroundColor: colorPalettes.find(p => p.key === selectedStates[1])?.primaryColor,
                  transition: 'height 0.3s ease-out',
                  opacity: 0.8
                }}
              ></div>
            </div>
          )}
          
          {/* Tower with transition effect for color changes */}
          <div className="relative transition-all duration-500 ease-in-out">
            <TowerVisualization 
              stateDistribution={localDistribution} 
              showHotspots={selectedStates.length === 2}
            />
            
            {/* Overlay showing the "painting" effect */}
            {selectedStates.length === 2 && (
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ 
                  backgroundImage: `radial-gradient(circle at 50% 30%, rgba(255,255,255,0.2), transparent 70%)`,
                  animation: 'pulse 2s infinite ease-in-out'
                }}
              ></div>
            )}
          </div>
          
          {/* Painting tools shown when color palettes are selected */}
          {selectedStates.length === 2 && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 rounded-full" style={{ 
                  backgroundColor: colorPalettes.find(p => p.key === selectedStates[0])?.primaryColor 
                }}></div>
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 rounded-full" style={{ 
                  backgroundColor: colorPalettes.find(p => p.key === selectedStates[1])?.primaryColor 
                }}></div>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Visual metaphor description */}
        {selectedStates.length === 2 && (
          <p className="text-center text-sm text-gray-500 mt-12 italic max-w-md">
            As you adjust the color mix, watch your tower transform - just like how your personality
            shifts between these psychological states in your daily life.
          </p>
        )}
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