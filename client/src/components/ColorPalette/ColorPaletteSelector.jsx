import React from 'react';
import { motion } from 'framer-motion';
import { STATE_COLORS, RECOMMENDED_STATES, getGradientStyle } from './ColorPaletteData';
import './ColorPaletteSelector.css';

/**
 * ColorPaletteSelector Component
 * Displays a grid of selectable color palettes (states)
 */
const ColorPaletteSelector = ({ 
  selectedStates = [], 
  onSelectState,
  personalityType
}) => {
  // Get the recommended states for this personality type if available
  const recommendedStateKeys = personalityType && RECOMMENDED_STATES[personalityType] 
    ? RECOMMENDED_STATES[personalityType] 
    : null;
  
  return (
    <div className="color-palette-selector">
      {/* Optional recommendation message */}
      {recommendedStateKeys && (
        <div className="recommendation-message">
          <p>
            Based on your personality type, we recommend the{' '}
            <span className="state-name">{STATE_COLORS[recommendedStateKeys[0]].name}</span> and{' '}
            <span className="state-name">{STATE_COLORS[recommendedStateKeys[1]].name}</span> palettes.
          </p>
        </div>
      )}
      
      {/* Color palettes grid */}
      <div className="palettes-grid">
        {Object.entries(STATE_COLORS).map(([stateKey, stateData]) => {
          const isSelected = selectedStates.includes(stateKey);
          const isRecommended = recommendedStateKeys && recommendedStateKeys.includes(stateKey);
          
          return (
            <motion.div
              key={stateKey}
              className={`palette-card ${isSelected ? 'selected' : ''} ${isRecommended ? 'recommended' : ''}`}
              onClick={() => onSelectState(stateKey)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Color palette visualization */}
              <div 
                className="palette-visual"
                style={getGradientStyle(stateKey)}
              >
                {/* Color swatches */}
                <div className="color-swatches">
                  <div className="color-swatch" style={{ backgroundColor: stateData.light }}></div>
                  <div className="color-swatch" style={{ backgroundColor: stateData.primary }}></div>
                  <div className="color-swatch" style={{ backgroundColor: stateData.dark }}></div>
                </div>
                
                {/* Palette thumb hole */}
                <div className="palette-thumb-hole"></div>
                
                {/* Selection checkmark */}
                {isSelected && (
                  <div className="selection-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
                
                {/* Recommended badge */}
                {isRecommended && (
                  <div className="recommended-badge">
                    Recommended
                  </div>
                )}
              </div>
              
              {/* Palette info */}
              <div className="palette-info">
                <h3 className="palette-name">{stateData.name}</h3>
                <p className="palette-description">{stateData.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="selection-instructions">
        <p>
          {selectedStates.length === 0
            ? 'Select two states that represent how you typically operate.'
            : selectedStates.length === 1
            ? 'Select one more state to continue.'
            : 'Great! Now you can adjust the distribution between these states.'}
        </p>
      </div>
    </div>
  );
};

export default ColorPaletteSelector;