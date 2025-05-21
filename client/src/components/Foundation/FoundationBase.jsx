import React from 'react';
import { motion } from 'framer-motion';
import Stone from './Stone';
import './FoundationBase.css';

/**
 * FoundationBase Component
 * Displays the circular foundation with stones positioned around it
 */
const FoundationBase = ({ 
  placedStones = [], 
  stoneData = []
}) => {
  // Calculate positions for each stone
  const calculatePosition = (index, totalStones) => {
    const radius = 110; // Distance from center (slightly smaller than circle radius)
    const angleStep = (2 * Math.PI) / totalStones;
    const angle = angleStep * index - Math.PI / 2; // Start from top (subtract 90 degrees)
    
    // Calculate coordinates (adjusted to center the stones)
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    return {
      left: `calc(50% + ${x}px - 40px)`, // 40px is half of the stone width when placed
      top: `calc(50% + ${y}px - 40px)`,  // 40px is half of the stone height when placed
    };
  };
  
  return (
    <div className="foundation-base">
      <div className="foundation-circle">
        {/* Inner dashed circle */}
        <div className="foundation-inner-circle"></div>
        
        {/* Connection lines can be added here if needed */}
        <svg className="foundation-connections" width="100%" height="100%" viewBox="0 0 320 320">
          {/* Connections would go here */}
        </svg>
        
        {/* Placed stones */}
        {placedStones.map((stone, index) => {
          // Calculate position based on stone.position (0-indexed)
          const position = calculatePosition(stone.position, 9); // 9 positions for Enneagram
          
          // Get stone data from stoneData array
          const stoneInfo = stoneData[stone.stoneIndex];
          
          // Generate a unique key for each stone
          const stoneKey = `placed-stone-${stone.position}-${stone.stoneIndex}-${index}`;
          
          return (
            <motion.div
              key={stoneKey}
              className="positioned-stone"
              style={position}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                delay: index * 0.1
              }}
            >
              <Stone
                id={stone.stoneIndex}
                content={stoneInfo ? stoneInfo.content : ['Stone']}
                isPlaced={true}
                gradientColors={stoneInfo ? stoneInfo.gradientColors : undefined}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FoundationBase;