import React from 'react';
import Stone from './Stone.jsx';
import { getStoneGradient } from './stoneData.js';
import './FoundationBase.css';

/**
 * FoundationBase component - Displays the circular foundation with selected stones
 * 
 * @param {Object} props
 * @param {Array} props.placedStones - Array of stones placed on the foundation
 * @param {Array} props.stoneContents - Array of stone content strings
 */
const FoundationBase = ({ 
  placedStones = [], 
  stoneContents = [],
  selectedStones = [], // For backward compatibility
  isAnimating = false,
  lastSelectedStoneId,
  setIndex = 0
}) => {
  // Calculate positions around the circle for each stone
  const calculatePosition = (index) => {
    const angle = (index / 9) * 2 * Math.PI - Math.PI/2; // Start from top
    const radius = 45; // % of container
    
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };

  // Content to display when no stones are placed
  const emptyFoundation = (
    <div className="foundation-placeholder">
      <div className="foundation-label">Foundation</div>
      <div className="foundation-placeholder-text">
        Select stones from each center to build your foundation
      </div>
    </div>
  );

  return (
    <div className="foundation-base">
      {placedStones.length === 0 ? (
        // No stones placed yet
        emptyFoundation
      ) : (
        // Show circular foundation with placed stones
        <>
          <div className="foundation-label">Foundation</div>
          <div className="foundation-circle">
            {/* Base circle */}
            {placedStones.map((stone, index) => {
              const position = calculatePosition(stone.position);
              const stoneContent = stoneContents[stone.setIndex * 3 + stone.stoneIndex];
              
              return (
                <Stone
                  key={`placed-stone-${stone.position}`}
                  content={stoneContent}
                  stoneIndex={stone.stoneIndex}
                  setIndex={stone.setIndex}
                  position={position}
                  isPlaced={true}
                  selected={true}
                  onClick={() => {}} // No action when clicking on placed stones
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FoundationBase;