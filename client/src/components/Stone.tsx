import React from 'react';
import { motion } from 'framer-motion';

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
  const shapeClass = `${shapeVariant}-shape`;
  const contentClass = `${shapeVariant}-content`;
  
  // Define category color based on Head, Heart, or Body
  const getCategoryColor = () => {
    switch (category) {
      case 'Head': return '#4F46E5'; // indigo
      case 'Heart': return '#EC4899'; // pink
      case 'Body': return '#10B981';  // emerald
      default: return '#6B7280';      // gray
    }
  };

  return (
    <div 
      className="stone-component relative flex flex-col items-center py-4"
      role="button"
      aria-pressed={isSelected}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.div
        className="relative h-72 w-64 mx-auto"
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        <div 
          className={`absolute inset-0 ${shapeClass} border-2 border-white shadow-lg ${
            isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
            boxShadow: isSelected 
              ? '0 8px 20px rgba(0,0,0,0.3)' 
              : '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          <div className={`absolute inset-0 ${contentClass} flex flex-col items-center justify-center p-5 text-center`}>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1">
              <span 
                className="text-xs font-semibold" 
                style={{ color: getCategoryColor() }}
              >
                {category}
              </span>
            </div>
            
            <h3 className="font-semibold text-white text-lg mb-3 mt-4">{name}</h3>
            
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {content.map((trait, idx) => (
                <span 
                  key={idx} 
                  className="inline-block px-2 py-1 bg-white bg-opacity-20 rounded-md text-white text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Selection indicator */}
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-3 inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none rounded-full bg-green-100 text-green-800"
        >
          Selected
        </motion.div>
      )}
    </div>
  );
};

export default Stone;