import React from 'react';
import Stone from './Stone.jsx';
import './FoundationBase.css';

/**
 * FoundationBase component - Displays the circular foundation with selected stones
 * 
 * @param {Object} props
 * @param {Array} props.selectedStones - Array of selected stones to display
 * @param {boolean} props.isAnimating - Whether to show animation for the most recently added stone
 * @param {string|number} props.lastSelectedStoneId - ID of the most recently selected stone (for animation)
 * @param {number} props.setIndex - Current stone set index
 */
const FoundationBase = ({ 
  selectedStones = [], 
  isAnimating = false, 
  lastSelectedStoneId,
  setIndex = 0
}) => {
  // Function to calculate position on the circle
  const calculatePosition = (index, total) => {
    // Always use 3 positions (for head, heart, body) regardless of actual count
    // This ensures consistent positioning
    const totalPositions = 3;
    
    // Calculate angle step - distribute stones evenly around the circle
    const angleStep = (2 * Math.PI) / totalPositions;
    
    // Calculate angle (start from top, -π/2)
    // Each stone goes to its position based on stoneIndex (0, 1, or 2)
    // Not the order they were added
    const stoneIndex = selectedStones[index]?.stoneIndex || index;
    const angle = stoneIndex * angleStep - Math.PI / 2;
    
    // Calculate x and y coordinates as percentages
    // This allows the foundation to be responsive
    const radius = 45; // % from center
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div className="foundation-base">
      {selectedStones.length === 0 ? (
        <div className="foundation-placeholder">
          <div className="foundation-label">Foundation</div>
          <div className="foundation-placeholder-text">
            Select stones from each center to build your foundation
          </div>
        </div>
      ) : (
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
                stoneIndex={stone.stoneIndex !== undefined ? stone.stoneIndex : index}
                position={calculatePosition(index, selectedStones.length)}
                isPlaced={true}
                selected={true}
                onClick={() => {}} // No action when clicking on placed stones
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FoundationBase;