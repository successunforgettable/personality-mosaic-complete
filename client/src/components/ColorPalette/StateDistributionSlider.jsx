import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { STATE_COLORS } from './ColorPaletteData';
import './StateDistributionSlider.css';

/**
 * StateDistributionSlider Component - Allows users to adjust the distribution between two selected states
 */
const StateDistributionSlider = ({ 
  selectedStates = [], 
  stateDistribution = {}, 
  onUpdateDistribution,
  showHelpText = true
}) => {
  // Default to 50/50 distribution if no initial values
  const [sliderValue, setSliderValue] = useState(50);
  
  // Extract the two selected states (if available)
  const state1 = selectedStates[0];
  const state2 = selectedStates[1];
  
  // Colors for the two states
  const state1Colors = state1 ? STATE_COLORS[state1] : null;
  const state2Colors = state2 ? STATE_COLORS[state2] : null;
  
  // Calculate percentages
  const state1Percent = sliderValue;
  const state2Percent = 100 - sliderValue;
  
  // Update local slider when distribution changes externally
  useEffect(() => {
    if (state1 && state2 && stateDistribution[state1] !== undefined) {
      setSliderValue(stateDistribution[state1]);
    }
  }, [stateDistribution, state1, state2]);
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    
    // Update parent component
    if (onUpdateDistribution && state1 && state2) {
      const newDistribution = {
        [state1]: newValue,
        [state2]: 100 - newValue
      };
      
      onUpdateDistribution(newDistribution);
    }
  };
  
  // Only show slider if exactly 2 states are selected
  if (selectedStates.length !== 2) {
    return (
      <div className="distribution-placeholder">
        <p>Select two state palettes to adjust their distribution.</p>
      </div>
    );
  }
  
  return (
    <div className="state-distribution-slider">
      <div className="slider-header">
        <h3>Adjust State Distribution</h3>
        {showHelpText && (
          <p>Slide to indicate what percentage of time you spend in each state.</p>
        )}
      </div>
      
      <div className="distribution-container">
        {/* State 1 label */}
        <div className="state-label" style={{ color: state1Colors?.primary }}>
          <span className="state-dot" style={{ backgroundColor: state1Colors?.primary }}></span>
          <span className="state-name">{state1Colors?.name}</span>
          <span className="state-percentage">{state1Percent}%</span>
        </div>
        
        {/* Gradient slider track */}
        <div 
          className="slider-track" 
          style={{ 
            background: `linear-gradient(to right, ${state1Colors?.primary} 0%, ${state2Colors?.primary} 100%)`
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="distribution-slider"
          />
          
          {/* Custom slider thumb */}
          <div 
            className="slider-thumb" 
            style={{ left: `${sliderValue}%` }}
          ></div>
        </div>
        
        {/* State 2 label */}
        <div className="state-label" style={{ color: state2Colors?.primary }}>
          <span className="state-dot" style={{ backgroundColor: state2Colors?.primary }}></span>
          <span className="state-name">{state2Colors?.name}</span>
          <span className="state-percentage">{state2Percent}%</span>
        </div>
      </div>
      
      {/* Distribution visualization */}
      <div className="distribution-visualization">
        <div 
          className="distribution-bar state-1-bar" 
          style={{ 
            width: `${state1Percent}%`,
            backgroundColor: state1Colors?.primary
          }}
        ></div>
        <div 
          className="distribution-bar state-2-bar" 
          style={{ 
            width: `${state2Percent}%`,
            backgroundColor: state2Colors?.primary
          }}
        ></div>
      </div>
    </div>
  );
};

export default StateDistributionSlider;