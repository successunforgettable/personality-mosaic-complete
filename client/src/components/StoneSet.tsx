import React, { useEffect, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import Stone, { StoneProps } from './Stone';
import { FoundationStone } from '@/types/assessment';

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
  const stoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set focus to the container when it mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  // Handle keyboard navigation between stones
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!stoneRefs.current.length) return;
    
    // Find the currently focused stone
    const focusedIndex = stoneRefs.current.findIndex(ref => 
      ref === document.activeElement || ref?.contains(document.activeElement)
    );
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = focusedIndex < stones.length - 1 ? focusedIndex + 1 : 0;
        stoneRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : stones.length - 1;
        stoneRefs.current[prevIndex]?.focus();
        break;
    }
  };

  // Helper to convert FoundationStone to StoneProps
  const convertToStoneProps = (stone: FoundationStone, index: number): StoneProps => {
    const gradientsByCategory = {
      'Head': { from: '#4F46E5', to: '#7C3AED' },
      'Heart': { from: '#EC4899', to: '#8B5CF6' },
      'Body': { from: '#10B981', to: '#3B82F6' }
    };
    
    // Ensure the category exists in our gradient map or default to first one
    const gradientColors = gradientsByCategory[stone.category as keyof typeof gradientsByCategory] || 
                          gradientsByCategory['Head'];
    
    // Create a shapeVariant based on the stone's category
    const shapeVariant = 
      stone.category === 'Head' ? 'hexagon' : 
      stone.category === 'Heart' ? 'pentagon' : 
      'octagon';
      
    // Split the baselines into an array for content
    const content = Array.isArray(stone.baselines) 
      ? stone.baselines 
      : stone.baselines.split('. ');
      
    return {
      id: stone.id,
      name: stone.name,
      content,
      category: stone.category,
      shapeVariant,
      gradientColors,
      isSelected: selectedStone?.id === stone.id,
      onClick: () => onSelectStone(stone),
      tabIndex: index + 1
    };
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      className="stone-set-container bg-slate-50 rounded-xl p-6 sm:p-8 max-w-5xl mx-auto"
      aria-label={`Stone Set ${setId}`}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {setId === 1 ? "Select Your First Foundation Stone" :
           setId === 2 ? "Choose Your Second Foundation Stone" :
                        "Complete Your Foundation With a Final Stone"}
        </h3>
        <p className="text-gray-600 max-w-md mx-auto text-sm">
          Choose the stone that most resonates with your personality traits. 
          This will form part of your personality foundation.
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {stones.map((stone, index) => (
          <motion.div
            key={stone.id}
            ref={el => stoneRefs.current[index] = el}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="stone-container"
          >
            <Stone
              {...convertToStoneProps(stone, index)}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="animate-pulse flex items-center space-x-2">
            <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
            <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
            <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoneSet;