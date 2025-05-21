import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { STATE_COLORS, getStateColor, getBlendedBackground } from './ColorPaletteData';
import './StateDistributionSlider.css';

/**
 * StateDistributionSlider Component
 * A slider that controls the distribution between two selected state palettes
 */
const StateDistributionSlider = ({ 
  selectedStates = [], 
  stateDistribution = {},
  onUpdateDistribution
}) => {
  // We need exactly 2 selected states to work with
  if (selectedStates.length !== 2) {
    return null;
  }
  
  const [state1, state2] = selectedStates;
  const state1Color = getStateColor(state1);
  const state2Color = getStateColor(state2);
  
  // Get the current percentage values or default to 50/50
  const state1Percentage = stateDistribution[state1] || 50;
  const state2Percentage = stateDistribution[state2] || 50;
  
  // Local state for slider value
  const [sliderValue, setSliderValue] = useState(state1Percentage);
  
  // Format state name for display (e.g., "veryGood" -> "Very Good")
  const formatStateName = (stateKey) => {
    if (stateKey === 'veryGood') return 'Very Good';
    if (stateKey === 'belowAverage') return 'Below Average';
    return stateKey.charAt(0).toUpperCase() + stateKey.slice(1);
  };
  
  // Handle slider changes
  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    
    // Notify parent component of the new distribution
    onUpdateDistribution({
      [state1]: newValue,
      [state2]: 100 - newValue
    });
  };
  
  // Update local slider value when props change
  useEffect(() => {
    if (stateDistribution[state1] !== undefined) {
      setSliderValue(stateDistribution[state1]);
    }
  }, [stateDistribution, state1]);
  
  return (
    <div className="state-distribution-slider">
      <h3 className="slider-title">Adjust State Distribution</h3>
      <p className="slider-description">
        Move the slider to set how much time you spend in each state
      </p>
      
      <div className="distribution-container">
        {/* State labels and percentages */}
        <div className="state-labels">
          <div className="state-label">
            <span className="state-name" style={{ color: state1Color.primary }}>
              {formatStateName(state1)}
            </span>
            <span className="state-percentage">{sliderValue}%</span>
          </div>
          
          <div className="state-label">
            <span className="state-name" style={{ color: state2Color.primary }}>
              {formatStateName(state2)}
            </span>
            <span className="state-percentage">{100 - sliderValue}%</span>
          </div>
        </div>
        
        {/* The mixing visualization */}
        <div className="mixing-visualization">
          {/* Paint mixing bowl */}
          <div 
            className="mixing-bowl"
            style={getBlendedBackground(state1, state2)}
          >
            {/* Paint drips */}
            <div className="paint-drip drip-left" style={{ backgroundColor: state1Color.primary }}></div>
            <div className="paint-drip drip-right" style={{ backgroundColor: state2Color.primary }}></div>
            
            {/* Mixing swirl/highlight */}
            <div className="mixing-swirl" style={{ 
              left: `${sliderValue}%`, 
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`
            }}></div>
          </div>
          
          {/* The actual slider control */}
          <div className="slider-control-container">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="slider-control"
            />
            
            {/* Customized slider handle */}
            <motion.div 
              className="slider-handle"
              style={{ left: `${sliderValue}%` }}
              initial={{ scale: 1 }}
              whileTap={{ scale: 1.2 }}
            ></motion.div>
            
            {/* Color gradient background for the slider track */}
            <div 
              className="slider-track"
              style={getBlendedBackground(state1, state2)}
            ></div>
          </div>
        </div>
        
        {/* State balance description */}
        <div className="state-balance-description">
          {sliderValue > 70 ? (
            <p>You spend considerably more time in the <strong>{formatStateName(state1)}</strong> state.</p>
          ) : sliderValue < 30 ? (
            <p>You spend considerably more time in the <strong>{formatStateName(state2)}</strong> state.</p>
          ) : (
            <p>You spend roughly equal time in both states.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateDistributionSlider;