import React from 'react';
import Stone from './Stone';
import './FoundationBase.css';

const FoundationBase = ({ placedStones = [], stoneContents = [] }) => {
  // Calculate positions around the circle for each stone
  const calculateStonePosition = (index, totalStones = 9) => {
    // Always place exactly on the perimeter of the circle
    const angleStep = (2 * Math.PI) / totalStones;
    const angle = index * angleStep - Math.PI / 2; // Start from top (-90 degrees)
    
    // Position exactly on the circle edge 
    const radius = 50; // 50% of container width
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };
  
  return (
    <div className="foundation-base">
      {/* Clear visible foundation circle */}
      <div className="foundation-circle">
        <div className="foundation-inner-circle"></div>
        
        {/* Render connecting lines from center to stones */}
        <svg className="foundation-connections" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {placedStones.map((stoneData, index) => {
            const position = calculateStonePosition(stoneData.position);
            return (
              <line
                key={`line-${stoneData.position}-${index}`}
                x1="50"
                y1="50"
                x2={position.x}
                y2={position.y}
                className="foundation-connection-line"
              />
            );
          })}
        </svg>
        
        {/* Place stones precisely on the circle */}
        {placedStones.map((stoneData, index) => {
          const position = calculateStonePosition(stoneData.position);
          const stoneContent = stoneContents[(stoneData.position * 3) + stoneData.stoneIndex];
          
          return (
            <Stone
              key={`placed-stone-${stoneData.position}-${index}`}
              content={stoneContent}
              selected={true}
              onClick={() => {}} // No action for placed stones
              stoneIndex={stoneData.stoneIndex}
              setIndex={stoneData.position} // Important! Pass the set index
              position={position}
              isPlaced={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoundationBase;