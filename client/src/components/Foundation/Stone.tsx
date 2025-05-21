import React from 'react';
import { motion } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';

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
  // Get background gradient based on stone category
  const getGradient = () => {
    switch (stone.category) {
      case 'head':
        return 'from-blue-300 to-blue-500';
      case 'heart':
        return 'from-red-300 to-red-500';
      case 'body':
        return 'from-green-300 to-green-500';
      default:
        return 'from-gray-300 to-gray-500';
    }
  };

  // Get border color based on stone category
  const getBorderColor = () => {
    switch (stone.category) {
      case 'head':
        return 'border-blue-600';
      case 'heart':
        return 'border-red-600';
      case 'body':
        return 'border-green-600';
      default:
        return 'border-gray-600';
    }
  };

  // Get text color based on selection state
  const getTextColor = () => {
    return isSelected ? 'text-white' : 'text-gray-800';
  };

  return (
    <motion.div
      className={`stone ${isSelected ? 'selected' : ''}`}
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
      <div 
        className={`
          stone-inner 
          bg-gradient-to-br ${getGradient()} 
          ${isSelected ? `ring-4 ${getBorderColor()} shadow-lg` : 'ring-1 ring-gray-200'} 
          ${getTextColor()}
        `}
      >
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