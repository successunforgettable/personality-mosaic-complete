import React from 'react';
import Stone from './Stone';
import './FoundationBase.css';

const FoundationBase = ({ placedStones = [], stoneContents = [] }) => {
  // Calculate positions around the circle for each stone
  const calculateStonePosition = (index, totalStones) => {
    const angleStep = (2 * Math.PI) / 9; // Always 9 positions for 9 sets
    const angle = index * angleStep - Math.PI / 2; // Start from top (-90 degrees)
    
    // Circle radius is 160px (320px diameter) with position at 50%
    // The +50 shifts to center of the container
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };
  
  return (
    <div className="foundation-base">
      <div className="foundation-circle">
        {placedStones.map((stoneData, index) => {
          const position = calculateStonePosition(stoneData.position, placedStones.length);
          return (
            <Stone
              key={`placed-stone-${stoneData.position}`}
              content={stoneContents[stoneData.stoneIndex]}
              stoneIndex={stoneData.stoneIndex}
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