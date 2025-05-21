import React from 'react';
import { motion } from 'framer-motion';
import { getStoneGradient } from './stoneData';
import './Stone.css';

/**
 * Stone component - Represents an individual foundation stone
 * Uses framer-motion for animations
 * 
 * @param {Object} props
 * @param {string|number} props.id - Unique identifier for the stone
 * @param {string} props.content - String content with • separators
 * @param {boolean} props.selected - Whether this stone is currently selected
 * @param {Function} props.onClick - Click handler function
 * @param {number} props.stoneIndex - Index of the stone within its set
 * @param {Object} props.position - Position when placed on foundation {x, y}
 * @param {boolean} props.isPlaced - Whether this stone is placed on the foundation
 * @param {number} props.setIndex - Index of the stone set
 * @param {string} props.category - Category of the stone (head, heart, body)
 */
const Stone = ({
  id,
  content,
  name,
  selected,
  onClick,
  stoneIndex,
  position,
  isPlaced = false,
  setIndex = 0,
  category,
  tabIndex
}) => {
  // Get gradient for this stone
  const background = getStoneGradient(setIndex, stoneIndex);
  
  // Parse content if it's a string with separators
  const contentItems = typeof content === 'string' 
    ? content.split('•').filter(line => line.trim()).map(s => s.trim())
    : Array.isArray(content) ? content : [];
  
  return (
    <motion.div 
      className={`stone ${selected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
      onClick={() => !isPlaced && onClick(stoneIndex)}
      style={{ 
        background,
        ...(isPlaced ? {
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        } : {})
      }}
      initial={isPlaced ? { scale: 0, opacity: 0 } : { scale: 1 }}
      animate={isPlaced ? { 
        scale: 0.5, // Smaller when placed
        opacity: 1 
      } : { 
        scale: selected ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        duration: 0.6
      }}
      role="button"
      aria-pressed={selected}
      tabIndex={tabIndex || 0}
      data-id={id}
      data-category={category}
      data-set-index={setIndex}
      data-stone-index={stoneIndex}
    >
      {name && <div className="stone-name">{name}</div>}
      
      <div className="stone-content">
        {typeof content === 'string' && 
          content.split('•').map((text, i) => (
            <div key={i} className="stone-line">{text.trim()}</div>
          ))
        }
      </div>
      
      {selected && !isPlaced && <div className="stone-checkmark">✓</div>}
    </motion.div>
  );
};

/**
 * Foundation Stone component - Used when a stone is placed on the foundation
 * Implemented as a specialized version of the Stone component
 */
export const FoundationStone = ({
  id,
  name,
  content,
  category,
  setIndex = 0,
  stoneIndex = 0,
  position,
  isAnimating
}) => {
  return (
    <Stone
      id={id}
      name={name}
      content={content}
      category={category}
      setIndex={setIndex}
      stoneIndex={stoneIndex}
      position={{
        x: (position.x / 320) * 100, // Convert from px to percentage
        y: (position.y / 320) * 100
      }}
      selected={true}
      isPlaced={true}
      onClick={() => {}} // No click handler needed for placed stones
    />
  );
};

export default Stone;