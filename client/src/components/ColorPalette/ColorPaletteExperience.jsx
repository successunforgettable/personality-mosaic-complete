import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorPaletteSelector from './ColorPaletteSelector';
import StateDistributionSlider from './StateDistributionSlider';
import { STATE_COLORS } from './ColorPaletteData';
import './ColorPaletteExperience.css';

/**
 * ColorPaletteExperience Component - The full Phase 3 experience
 */
const ColorPaletteExperience = ({ 
  onComplete,
  personalityType 
}) => {
  // Selected state palettes
  const [selectedStates, setSelectedStates] = useState([]);
  
  // Distribution between states (percentages)
  const [stateDistribution, setStateDistribution] = useState({});
  
  // Whether the experience is completed
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Handle state palette selection/deselection
  const handleSelectState = (stateKey) => {
    let updatedStates;
    
    // If already selected, deselect it
    if (selectedStates.includes(stateKey)) {
      updatedStates = selectedStates.filter(state => state !== stateKey);
    } 
    // If not selected and we have less than 2 selections, add it
    else if (selectedStates.length < 2) {
      updatedStates = [...selectedStates, stateKey];
    } 
    // Otherwise, we already have 2 selections - replace the last one
    else {
      updatedStates = [selectedStates[0], stateKey];
    }
    
    setSelectedStates(updatedStates);
  };
  
  // Update distribution between selected states
  const handleUpdateDistribution = (newDistribution) => {
    setStateDistribution(newDistribution);
  };
  
  // Handle proceeding to the next phase
  const handleContinue = () => {
    // Only allow completion if we have 2 states selected and a valid distribution
    if (selectedStates.length === 2 && 
        stateDistribution[selectedStates[0]] !== undefined &&
        stateDistribution[selectedStates[1]] !== undefined) {
      
      setIsCompleted(true);
      
      // Notify parent component
      if (onComplete) {
        setTimeout(() => {
          onComplete({
            selectedStates,
            stateDistribution
          });
        }, 1000); // Short delay for animation
      }
    }
  };
  
  // Set initial 50/50 distribution when two states are selected
  useEffect(() => {
    if (selectedStates.length === 2) {
      if (!stateDistribution[selectedStates[0]]) {
        // Default to 50/50 distribution
        setStateDistribution({
          [selectedStates[0]]: 50,
          [selectedStates[1]]: 50
        });
      }
    } else {
      // Reset distribution if we don't have 2 states
      setStateDistribution({});
    }
  }, [selectedStates]);
  
  return (
    <div className="color-palette-experience">
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="palette-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="phase-title">Choose Your State Palettes</h2>
            <p className="phase-description">
              Select two states that represent how you typically operate. These will color your personality tower.
            </p>
            
            {/* Color palette selection */}
            <div className="palette-section">
              <ColorPaletteSelector
                selectedStates={selectedStates}
                onSelectState={handleSelectState}
                personalityType={personalityType}
              />
            </div>
            
            {/* State distribution slider - only shown when 2 states are selected */}
            {selectedStates.length === 2 && (
              <motion.div
                className="distribution-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StateDistributionSlider
                  selectedStates={selectedStates}
                  stateDistribution={stateDistribution}
                  onUpdateDistribution={handleUpdateDistribution}
                />
                
                <div className="buttons-container">
                  <button 
                    className="continue-button"
                    onClick={handleContinue}
                  >
                    Continue to Next Phase
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="completion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="completion-message"
          >
            <h3>Your Tower Has Been Painted!</h3>
            <div className="completion-colors">
              {selectedStates.map((stateKey) => {
                const stateColor = STATE_COLORS[stateKey];
                return (
                  <div key={stateKey} className="color-sample">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: stateColor.primary }}
                    ></div>
                    <div className="color-label">
                      <span className="state-name">{stateColor.name}</span>
                      <span className="state-percentage">{stateDistribution[stateKey]}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p>Moving to the next phase...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPaletteExperience;