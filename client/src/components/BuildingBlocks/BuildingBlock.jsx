import React from 'react';
import { motion } from 'framer-motion';
import './BuildingBlock.css';

const BuildingBlock = ({ 
  content, 
  selected, 
  onClick, 
  blockIndex,
  isPlaced = false,
  position = null
}) => {
  return (
    <motion.div 
      className={`building-block ${selected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
      onClick={() => !isPlaced && onClick(blockIndex)}
      initial={isPlaced ? { y: -20, opacity: 0 } : { scale: 1 }}
      animate={isPlaced ? 
        { y: 0, opacity: 1 } : 
        { scale: selected ? 1.03 : 1 }
      }
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
      style={position ? {
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      } : {}}
    >
      <div className="block-content">
        {content}
      </div>
      {selected && !isPlaced && <div className="block-selected-indicator"></div>}
    </motion.div>
  );
};

export default BuildingBlock;