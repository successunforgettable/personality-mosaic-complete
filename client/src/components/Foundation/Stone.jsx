import React from 'react';
import { motion } from 'framer-motion';
import './Stone.css';

/**
 * Stone Component - Designed exactly to technical specs
 * Hexagonal stone with proper coloring based on center type
 */
const Stone = ({ 
  id, 
  content, 
  isSelected = false, 
  isPlaced = false, 
  position = null,
  gradientColors = { from: '#8b5cf6', to: '#6366f1' }, // Default purple gradient
  onClick = () => {},
  size = 'normal', // normal or small
  tabIndex
}) => {
  // Content should be an array of strings (words/traits)
  const contentLines = Array.isArray(content) ? content : [content];
  
  // Scale for placed stones on foundation is 0.5 (half size)
  const stoneScale = isPlaced ? 0.5 : 1;
  
  return (
    <motion.div
      className={`stone ${isSelected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
      onClick={onClick}
      tabIndex={tabIndex !== undefined ? tabIndex : 0}
      style={{
        background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
        // Stone dimensions - 160px standard, 80px when placed on foundation
        width: isPlaced ? '80px' : '160px',
        height: isPlaced ? '80px' : '160px',
      }}
      whileHover={!isPlaced ? { scale: 1.05 } : {}}
      whileTap={!isPlaced ? { scale: 0.95 } : {}}
      initial={isPlaced ? { scale: 0.1, opacity: 0 } : { scale: 1, opacity: 1 }}
      animate={isPlaced ? { scale: stoneScale, opacity: 1 } : { scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
      role="button"
      aria-pressed={isSelected}
    >
      {/* Checkmark for selected stone */}
      {isSelected && !isPlaced && (
        <div className="stone-checkmark">✓</div>
      )}
      
      {/* Stone content - words or traits */}
      <div className="stone-content">
        {contentLines.map((line, index) => (
          <div key={index} className="stone-line">
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Stone;