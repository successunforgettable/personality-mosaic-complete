import React from 'react';
import { motion } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';
import './Stone.css';

interface StoneProps {
  stone: FoundationStone;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Stone Component
 * 
 * Renders an individual foundation stone with proper styling based on category.
 * Includes selection states and animations.
 * 
 * Implementation based on tech_spec_v2.md - Section 3.2 and content_spec.md - Section 1.1
 */
const Stone: React.FC<StoneProps> = ({ stone, isSelected, onClick }) => {
  return (
    <motion.div
      className={`stone ${stone.category} ${isSelected ? 'selected' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={{ 
        scale: isSelected ? 1.05 : 1,
        y: isSelected ? -5 : 0
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      }}
    >
      <div className="stone-inner">
        <div className="stone-content">
          <h3 className="stone-name">{stone.name}</h3>
          {stone.description && (
            <p className="stone-description">{stone.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Stone;