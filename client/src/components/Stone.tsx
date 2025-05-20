import React, { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';

export interface StoneProps {
  id: number;
  name: string;
  content: string[]; // Array of 2-3 words/traits
  category: string;
  shapeVariant?: 'hexagon' | 'pentagon' | 'octagon';
  gradientColors: {
    from: string;
    to: string;
  };
  isSelected: boolean;
  onClick: () => void;
  tabIndex?: number;
}

export const Stone: React.FC<StoneProps> = ({
  name,
  content,
  category,
  shapeVariant = 'hexagon',
  gradientColors,
  isSelected,
  onClick,
  tabIndex = 0
}) => {
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  // Define shape classes based on variant
  const shapeClass = 
    shapeVariant === 'pentagon' ? 'pentagon-shape' :
    shapeVariant === 'octagon' ? 'octagon-shape' :
    'hexagon-shape'; // default

  return (
    <motion.div
      className="stone-component relative"
      tabIndex={tabIndex}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${name}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative h-72 w-64 mx-auto">
        <div 
          className={`absolute inset-0 ${shapeClass} border-2 border-white shadow-lg ${
            isSelected ? 'selected' : ''
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
            boxShadow: isSelected 
              ? `0 0 20px ${gradientColors.from}80, 0 6px 16px rgba(0,0,0,0.2)` 
              : '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
            {/* Category badge */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1">
              <span 
                className="text-xs font-semibold" 
                style={{ color: gradientColors.from }}
              >
                {category}
              </span>
            </div>
            
            {/* Stone name */}
            <h3 className="font-semibold text-white text-lg mb-3 mt-4">{name}</h3>
            
            {/* Stone content/traits */}
            <div className="text-white text-sm space-y-1">
              {content.map((trait, index) => (
                <p key={index} className="leading-tight">{trait}</p>
              ))}
            </div>
            
            {/* Selection indicator */}
            {isSelected && (
              <motion.div 
                className="absolute bottom-3 right-3 bg-white rounded-full p-1" 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <CheckIcon className="h-4 w-4" style={{ color: gradientColors.from }} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stone;