import React, { useState, useEffect } from 'react';
import StoneSet from './StoneSet';
import FoundationBase from './FoundationBase';
import './FoundationExperience.css';

/**
 * FoundationExperience - Main component for the Foundation Stone phase (Phase 1)
 * Manages the complete foundation stone selection experience
 * 
 * @param {Object} props
 * @param {Function} props.onComplete - Callback when foundation selection is complete
 * @param {Array} props.initialSelections - Optional initial selections (for resuming)
 */
const FoundationExperience = ({ onComplete, initialSelections = [] }) => {
  // State for selected stones and animation
  const [selectedStones, setSelectedStones] = useState(initialSelections);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastSelectedStoneId, setLastSelectedStoneId] = useState(null);
  
  // Handle stone selection
  const handleStoneSelect = (stones) => {
    // Get the newly added stone (if any)
    const newStone = stones.find(stone => 
      !selectedStones.some(s => s.id === stone.id)
    );
    
    // Update state
    setSelectedStones(stones);
    
    // If there's a new stone added, trigger animation
    if (newStone) {
      setLastSelectedStoneId(newStone.id);
      setIsAnimating(true);
      
      // Reset animation flag after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Animation duration + small buffer
    }
  };
  
  // Check if selection is complete (one stone from each category)
  const isSelectionComplete = () => {
    const categories = ['head', 'heart', 'body'];
    return categories.every(category => 
      selectedStones.some(stone => stone.category === category)
    );
  };
  
  // Handle completion
  const handleComplete = () => {
    if (isSelectionComplete() && onComplete) {
      onComplete(selectedStones);
    }
  };
  
  return (
    <div className="foundation-experience">
      <div className="foundation-header">
        <h1 className="foundation-title">Foundation Stones</h1>
        <p className="foundation-subtitle">
          Select one stone from each center to establish the foundation of your personality profile
        </p>
      </div>
      
      <div className="foundation-layout">
        {/* Stone selection area */}
        <div className="foundation-selection-area">
          <StoneSet 
            selectedStones={selectedStones}
            onStoneSelect={handleStoneSelect}
          />
        </div>
        
        {/* Foundation visualization area */}
        <div className="foundation-visualization-area">
          <FoundationBase 
            selectedStones={selectedStones}
            isAnimating={isAnimating}
            lastSelectedStoneId={lastSelectedStoneId}
          />
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="foundation-actions">
        <button 
          className="btn btn-primary"
          disabled={!isSelectionComplete()}
          onClick={handleComplete}
        >
          Complete Foundation
        </button>
      </div>
    </div>
  );
};

export default FoundationExperience;