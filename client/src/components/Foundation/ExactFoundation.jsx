import React from 'react';
import './ExactFoundation.css';

/**
 * ExactFoundation - A precise implementation following technical specifications
 * Stone visualization on a foundation base
 */
const ExactFoundation = ({ selectedStones = [] }) => {
  // Calculate stone positions with precise math from spec
  const calculateStonePositions = () => {
    const positions = [];
    const totalStones = 9;
    const angleStep = (2 * Math.PI) / totalStones;
    
    for (let i = 0; i < totalStones; i++) {
      const angle = i * angleStep;
      // Position on a circle with radius precisely as per spec
      const x = 50 + 45 * Math.cos(angle);
      const y = 50 + 45 * Math.sin(angle);
      
      // Determine the stone's center type (Head, Heart, Body)
      const centerType = Math.floor(i / 3);
      
      positions.push({ x, y, centerType });
    }
    
    return positions;
  };
  
  // All possible stone positions
  const stonePositions = calculateStonePositions();
  
  return (
    <div className="foundation-container">
      <div className="foundation-circle">
        <div className="foundation-center">Foundation</div>
        
        {/* Only render stones that have been selected */}
        {selectedStones.map((stone, index) => {
          if (index >= stonePositions.length) return null;
          
          const position = stonePositions[index];
          const centerClass = 
            position.centerType === 0 ? 'head-stone' : 
            position.centerType === 1 ? 'heart-stone' : 
            'body-stone';
          
          return (
            <div
              key={`foundation-stone-${index}`}
              className={`foundation-stone ${centerClass}`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ExactFoundation;