import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorPalette from './ColorPalette';
import { STATE_COLORS, getTypeSpecificDescription } from './ColorPaletteData';
import './ColorPaletteSelector.css';

/**
 * ColorPaletteSelector Component - Manages the selection of color palettes
 */
const ColorPaletteSelector = ({ 
  selectedStates = [], 
  onSelectState,
  personalityType,
  maxSelections = 2
}) => {
  // Local state to track which palettes have tooltip open
  const [hoveredState, setHoveredState] = useState(null);
  
  // Handle selection of a color palette
  const handleSelectPalette = (stateKey) => {
    if (onSelectState) {
      onSelectState(stateKey);
    }
  };
  
  // Toggle hover state for tooltip
  const handleHover = (stateKey) => {
    setHoveredState(stateKey);
  };
  
  return (
    <div className="color-palette-selector">
      <div className="palettes-container">
        {Object.entries(STATE_COLORS).map(([stateKey, stateData]) => {
          // Check if this palette is already selected
          const isSelected = selectedStates.includes(stateKey);
          
          // If we have a personality type, get specific description
          const typeSpecificDescription = getTypeSpecificDescription(personalityType, stateKey);
          if (typeSpecificDescription) {
            stateData = { ...stateData, description: typeSpecificDescription };
          }
          
          // Determine if selection is allowed
          const selectionDisabled = !isSelected && selectedStates.length >= maxSelections;
          
          return (
            <div 
              key={stateKey}
              className={`palette-wrapper ${selectionDisabled ? 'disabled' : ''}`}
              onMouseEnter={() => handleHover(stateKey)}
              onMouseLeave={() => handleHover(null)}
            >
              <ColorPalette
                stateKey={stateKey}
                stateData={stateData}
                isSelected={isSelected}
                onClick={() => !selectionDisabled && handleSelectPalette(stateKey)}
                personalityType={personalityType}
              />
              {selectedStates.length >= maxSelections && !isSelected && (
                <div className="selection-limit-overlay">
                  <div className="limit-message">Limit: {maxSelections}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Selection counter */}
      <div className="selection-counter">
        <span>{selectedStates.length} of {maxSelections} states selected</span>
      </div>
      
      {/* Selection instructions */}
      {selectedStates.length === 0 && (
        <div className="selection-instructions">
          <p>Select two color palettes that represent your typical states of being.</p>
        </div>
      )}
      
      {selectedStates.length === 1 && (
        <div className="selection-instructions">
          <p>Now select one more palette to complete your selection.</p>
        </div>
      )}
      
      {selectedStates.length >= 2 && (
        <div className="selection-instructions">
          <p>Great! You've selected your typical states. Adjust the distribution below.</p>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteSelector;