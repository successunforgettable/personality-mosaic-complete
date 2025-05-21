import React from 'react';
import Stone from './Stone.jsx';
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
  const calculateStonePosition = (index, totalStones = 9) => {
    const angleStep = (2 * Math.PI) / 9; // Always 9 positions for 9 sets
    const angle = index * angleStep - Math.PI / 2; // Start from top (-90 degrees)
    
    // Circle radius is 160px (320px diameter) with position at 50%
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };

  // If placedStones is empty but selectedStones has content, use compatibility mode
  const useCompatibilityMode = placedStones.length === 0 && selectedStones.length > 0;
  
  // Function to calculate position in compatibility mode
  const calculateCompatibilityPosition = (index, total) => {
    // Always use 3 positions (for head, heart, body) regardless of actual count
    const totalPositions = 3;
    
    // Calculate angle step - distribute stones evenly around the circle
    const angleStep = (2 * Math.PI) / totalPositions;
    
    // Calculate angle (start from top, -π/2)
    // Each stone goes to its position based on stoneIndex (0, 1, or 2)
    const stoneIndex = selectedStones[index]?.stoneIndex || index;
    const angle = stoneIndex * angleStep - Math.PI / 2;
    
    // Calculate x and y coordinates as percentages
    const radius = 45; // % from center
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
      {useCompatibilityMode ? (
        // Compatibility mode when using selectedStones
        <>
          <div className="foundation-label">Foundation</div>
          <div className="foundation-stone-container">
            {selectedStones.map((stone, index) => (
              <Stone
                key={stone.id || `stone-${index}`}
                id={stone.id || `stone-${index}`}
                content={stone.content}
                name={stone.name}
                category={stone.category}
                setIndex={stone.setIndex || setIndex}
                stoneIndex={stone.stoneIndex}
                position={calculateCompatibilityPosition(index, selectedStones.length)}
                isPlaced={true}
                selected={true}
                onClick={() => {}} // No action when clicking on placed stones
              />
            ))}
          </div>
        </>
      ) : placedStones.length === 0 ? (
        // No stones placed yet
        emptyFoundation
      ) : (
        // New implementation with placedStones and stoneContents
        <>
          <div className="foundation-label">Foundation</div>
          <div className="foundation-circle">
            {placedStones.map((stoneData, index) => {
              const position = calculateStonePosition(stoneData.position);
              return (
                <Stone
                  key={`placed-stone-${stoneData.position}`}
                  content={stoneContents[stoneData.stoneIndex]}
                  stoneIndex={stoneData.stoneIndex}
                  setIndex={stoneData.setIndex}
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