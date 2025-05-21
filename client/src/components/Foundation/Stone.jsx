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
  setIndex = 0
}) => {
  // Get the appropriate gradient for this stone based on set and stone index
  const background = getStoneGradient(setIndex, stoneIndex);
  
  // Scale factor for placed stones
  const scaleFactor = isPlaced ? 0.5 : 1; // Smaller when placed on foundation
  
  return (
    <motion.div 
      className={`stone ${selected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
      onClick={() => !isPlaced && onClick(stoneIndex)}
      style={{ 
        background,
        ...(isPlaced ? {
          position: 'absolute',
          left: `${position?.x}%`,
          top: `${position?.y}%`,
          transform: 'translate(-50%, -50%) scale(0.5)', // Center properly and scale down
          zIndex: 5, // Ensure it's visible over the circle
        } : {})
      }}
      initial={isPlaced ? { scale: 0, opacity: 0 } : { scale: 1 }}
      animate={isPlaced ? { 
        scale: scaleFactor, 
        opacity: 1 
      } : { 
        scale: selected ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
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