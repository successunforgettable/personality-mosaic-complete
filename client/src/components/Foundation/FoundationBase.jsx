import React from 'react';
import Stone from './Stone';
import './FoundationBase.css';

/**
 * FoundationBase Component - Displays the circular foundation with positioned stones
 */
const FoundationBase = ({ placedStones = [], stoneContents = [] }) => {
  // Calculate position for each stone based on its index
  const getStonePosition = (index) => {
    const totalStones = 9; // Total possible stones on the foundation
    
    // Calculate angle (in radians)
    // Start from top (-π/2) and go clockwise
    const angleStep = (2 * Math.PI) / totalStones;
    const angle = -Math.PI / 2 + (index * angleStep);
    
    // Calculate position (center of the container is 50%, 50%)
    // Radius is 45% of the container
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };
  
  return (
    <div className="foundation-base">
      <div className="foundation-circle">
        <div className="foundation-inner-circle"></div>
        
        {/* Render connecting lines from center to stones */}
        <svg className="foundation-connections" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {placedStones.map((stone, index) => {
            const position = getStonePosition(stone.position);
            return (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={position.x}
                y2={position.y}
                className="foundation-connection-line"
              />
            );
          })}
        </svg>
        
        {/* Render positioned stones */}
        {placedStones.map((stone, index) => {
          const position = getStonePosition(stone.position);
          const stoneContent = stoneContents[(stone.position * 3) + stone.stoneIndex];
          
          return (
            <div key={index}>
              <Stone
                content={stoneContent}
                selected={true}
                onClick={() => {}} // No action for placed stones
                stoneIndex={stone.stoneIndex}
                setIndex={stone.position}
                isPlaced={true}
                position={position}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoundationBase;