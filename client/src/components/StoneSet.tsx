import React from 'react';
import { motion } from 'framer-motion';
import Stone, { StoneProps } from './Stone';
import { FoundationStone } from '@/types/assessment';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoneSetProps {
  stones: FoundationStone[];
  selectedStone?: FoundationStone | null;
  onSelectStone: (stone: FoundationStone) => void;
  setId: number;
  isLoading?: boolean;
}

const StoneSet: React.FC<StoneSetProps> = ({
  stones,
  selectedStone,
  onSelectStone,
  setId,
  isLoading = false
}) => {
  const isMobile = useIsMobile();
  
  // Convert FoundationStone to StoneProps format
  const convertToStoneProps = (stone: FoundationStone, index: number): StoneProps => {
    // Determine shape variant based on stone category or position
    let shapeVariant: 'hexagon' | 'pentagon' | 'octagon' = 'hexagon';
    if (stone.category === 'Heart') {
      shapeVariant = 'pentagon';
    } else if (stone.category === 'Body') {
      shapeVariant = 'octagon';
    }
    
    // Determine gradient colors based on category
    let gradientColors = { from: '#4F46E5', to: '#7C3AED' }; // Default Head colors
    if (stone.category === 'Heart') {
      gradientColors = { from: '#EC4899', to: '#8B5CF6' };
    } else if (stone.category === 'Body') {
      gradientColors = { from: '#10B981', to: '#3B82F6' };
    }
    
    // Convert stone baselines to array of content items
    const contentItems = stone.baselines.split(',').map(item => item.trim());
    
    return {
      id: stone.id,
      name: stone.name,
      content: contentItems,
      category: stone.category,
      shapeVariant,
      gradientColors,
      isSelected: selectedStone?.id === stone.id,
      onClick: () => onSelectStone(stone),
      tabIndex: index + 1
    };
  };

  return (
    <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-6 mb-4`}>
      {stones.map((stone, index) => (
        <motion.div
          key={stone.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { delay: index * 0.15 }
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={isLoading ? 'opacity-75 pointer-events-none' : ''}
        >
          <Stone {...convertToStoneProps(stone, index)} />
        </motion.div>
      ))}
    </div>
  );
};

export default StoneSet;