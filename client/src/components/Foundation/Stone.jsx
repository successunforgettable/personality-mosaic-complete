import React from 'react';
import { motion } from 'framer-motion';
import './Stone.css';

/**
 * Stone Component
 * Represents an individual foundation stone in the Personality Mosaic Assessment
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
  tabIndex,
  name
}) => {
  // Generate a unique ID for SVG gradient
  const gradientId = `stone-gradient-${id}`;
  
  // Content should be an array of strings (words/traits)
  const contentLines = Array.isArray(content) ? content : [content];
  
  return (
    <motion.div
      className={`stone ${isSelected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
      onClick={onClick}
      tabIndex={tabIndex !== undefined ? tabIndex : 0}
      style={{
        background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
        width: isPlaced ? '80px' : (size === 'small' ? '120px' : '160px'),
        height: isPlaced ? '80px' : (size === 'small' ? '120px' : '160px'),
      }}
      whileHover={!isPlaced ? { scale: 1.05 } : {}}
      whileTap={!isPlaced ? { scale: 0.95 } : {}}
      initial={isPlaced ? { scale: 0.1, opacity: 0 } : { scale: 1, opacity: 1 }}
      animate={isPlaced ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
      role="button"
      aria-pressed={isSelected}
      data-testid={`stone-${id}`}
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