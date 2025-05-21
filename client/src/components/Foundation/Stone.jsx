import React from 'react';
import { motion } from 'framer-motion';
import './Stone.css';
import { getStoneGradient } from './stoneData';

/**
 * Stone Component - Represents a foundation stone in the personality assessment
 */
const Stone = ({ 
  content, 
  selected, 
  onClick, 
  stoneIndex,
  position,
  isPlaced = false,
  setIndex = 0  // Make sure this prop is being passed!
}) => {
  // Get the appropriate gradient for this stone based on set and stone index
  const background = getStoneGradient(setIndex, stoneIndex);
  
  return (
    <motion.div 
      className={`stone ${selected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
      onClick={() => !isPlaced && onClick(stoneIndex)}
      style={{ 
        background, // Apply the dynamic background
        ...(isPlaced ? {
          position: 'absolute',
          left: `${position?.x}%`,
          top: `${position?.y}%`,
        } : {})
      }}
      whileHover={{ 
        y: isPlaced ? 0 : -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: isPlaced ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <div className="stone-content">
        {content?.split('•').filter(line => line.trim()).map((line, index) => (
          <div key={index} className="stone-line">{line.trim()}</div>
        ))}
      </div>
      {selected && !isPlaced && <div className="stone-checkmark">✓</div>}
    </motion.div>
  );
};

export default Stone;