import React from 'react';
import './SimpleCircle.css';

/**
 * SimpleCircle - A simplified implementation for better performance
 * Displays colored dots representing selected stones
 */
const SimpleCircle = ({ selectedStones = [] }) => {
  // Get total number of stones selected
  const stoneCount = selectedStones.length;
  
  // Calculate all stone positions around the circle
  const calculateStonePositions = () => {
    const positions = [];
    const totalStones = 9;
    const angleStep = (2 * Math.PI) / totalStones;
    
    for (let i = 0; i < totalStones; i++) {
      const angle = i * angleStep;
      // Position on a circle with radius 120px (240px diameter)
      const x = 50 + 40 * Math.cos(angle);
      const y = 50 + 40 * Math.sin(angle);
      
      // Determine the stone's center type (Head, Heart, Body)
      const centerType = Math.floor(i / 3);
      
      // Color based on center type
      let color;
      if (centerType === 0) color = 'blue'; // Head
      else if (centerType === 1) color = 'red'; // Heart
      else color = 'green'; // Body
      
      positions.push({ x, y, color });
    }
    
    return positions;
  };
  
  const stonePositions = calculateStonePositions();
  
  return (
    <div className="simple-circle-foundation">
      <div className="circle-base">
        <div className="center-circle">Foundation</div>
        
        {/* Stone circles positioned around the center */}
        {stonePositions.map((position, index) => (
          index < stoneCount && (
            <div
              key={`stone-${index}`}
              className={`stone-dot stone-${position.color}`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default SimpleCircle;