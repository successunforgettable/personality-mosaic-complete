import React from 'react';
import { motion } from 'framer-motion';
import Stone from './Stone';
import './FoundationBase.css';
import { STONE_SETS } from './stoneData';

/**
 * FoundationBase Component - Implemented according to technical specs
 */
const FoundationBase = ({ 
  placedStones = [], 
  stoneData = []
}) => {
  // Calculate positions following the exact spec formula:
  // x = 50 + 45*cos(angle)
  // y = 50 + 45*sin(angle)
  const calculatePosition = (position, totalPositions) => {
    const angleStep = (2 * Math.PI) / totalPositions;
    // Start from top (subtract π/2 which is 90 degrees)
    const angle = angleStep * position - Math.PI / 2;
    
    // Calculate x and y as percentages (center is at 50%)
    const xPercent = 50 + 45 * Math.cos(angle);
    const yPercent = 50 + 45 * Math.sin(angle);
    
    return {
      left: `${xPercent}%`,
      top: `${yPercent}%`,
      transform: 'translate(-50%, -50%)' // Center the stone on the calculated point
    };
  };
  
  // Get the center type and colors for a stone
  const getStoneColors = (setIndex) => {
    const centerType = Math.floor(setIndex / 3); // 0: Head, 1: Heart, 2: Body
    
    const centerColors = {
      0: { // Head - Blue
        primary: '#3b82f6',
        light: '#93c5fd',
        dark: '#1d4ed8'
      },
      1: { // Heart - Red
        primary: '#ef4444',
        light: '#fca5a5',
        dark: '#b91c1c'
      },
      2: { // Body - Green
        primary: '#10b981',
        light: '#6ee7b7',
        dark: '#047857'
      }
    };
    
    return centerColors[centerType] || centerColors[0];
  };
  
  return (
    <div className="foundation-base">
      {/* Circular base with 320px diameter */}
      <div className="foundation-circle">
        {/* Placed stones */}
        {placedStones.map((stone, index) => {
          // Get position around the circle
          const position = calculatePosition(stone.position, 9);
          
          // Get stone content from data
          const stoneData = STONE_SETS?.[stone.setIndex]?.[stone.stoneIndex] || ['Stone'];
          
          // Get colors based on center type
          const colors = getStoneColors(stone.setIndex);
          
          // Create gradient based on stone index variation
          const gradientColors = {
            from: stone.stoneIndex === 0 ? colors.light : 
                  stone.stoneIndex === 1 ? colors.primary : colors.primary,
            to: stone.stoneIndex === 0 ? colors.primary : 
                stone.stoneIndex === 1 ? colors.primary : colors.dark
          };
          
          return (
            <motion.div
              key={`stone-${stone.position}-${index}`}
              className="positioned-stone"
              style={position}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Stone
                id={`placed-${stone.position}`}
                content={stoneData}
                isPlaced={true}
                gradientColors={gradientColors}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FoundationBase;