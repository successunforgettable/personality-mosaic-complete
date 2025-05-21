import React from 'react';
import { FoundationStone } from './Stone';
import './FoundationBase.css';

/**
 * FoundationBase component - Displays the circular foundation with selected stones
 * 
 * @param {Object} props
 * @param {Array} props.selectedStones - Array of selected stones to display
 * @param {boolean} props.isAnimating - Whether to show animation for the most recently added stone
 * @param {number} props.lastSelectedStoneId - ID of the most recently selected stone (for animation)
 */
const FoundationBase = ({ 
  selectedStones = [], 
  isAnimating = false, 
  lastSelectedStoneId 
}) => {
  // Function to calculate position on the circle
  const calculatePosition = (index, total) => {
    // Calculate angle step based on total positions
    const angleStep = (2 * Math.PI) / Math.max(total, 3);
    
    // Calculate angle (start from top, -π/2)
    const angle = index * angleStep - Math.PI / 2;
    
    // Base radius and center coordinates
    const radius = 120; // Pixels from center
    const centerX = 160;
    const centerY = 160;
    
    // Calculate x and y coordinates
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
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
              <FoundationStone
                key={stone.id}
                id={stone.id}
                name={stone.name}
                category={stone.category}
                gradientColors={stone.gradientColors}
                position={calculatePosition(index, selectedStones.length)}
                isAnimating={isAnimating && stone.id === lastSelectedStoneId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FoundationBase;