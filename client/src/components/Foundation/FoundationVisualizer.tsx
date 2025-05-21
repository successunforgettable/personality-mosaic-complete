import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';

interface FoundationVisualizerProps {
  selectedStones: FoundationStone[];
  isAnimating?: boolean;
  lastSelectedStoneId?: number | null;
}

/**
 * Foundation Visualizer Component
 * 
 * Visualizes the selected foundation stones in a circular arrangement
 * that forms the base of the personality tower.
 * 
 * Implementation follows tech_spec_v2.md (section 3.2) specifications
 */
const FoundationVisualizer: React.FC<FoundationVisualizerProps> = ({
  selectedStones,
  isAnimating = false,
  lastSelectedStoneId = null
}) => {
  // State to track stones that should be animated
  const [animatingStoneId, setAnimatingStoneId] = useState<number | null>(null);
  
  // Update animating stone when last selected stone changes
  useEffect(() => {
    if (lastSelectedStoneId) {
      setAnimatingStoneId(lastSelectedStoneId);
      
      // Reset animation state after animation completes
      const timer = setTimeout(() => {
        setAnimatingStoneId(null);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [lastSelectedStoneId]);
  
  // Calculate stone position based on index and total stones
  const calculateStonePosition = (index: number, totalStones: number) => {
    // Start at top (12 o'clock position)
    const angleOffset = -Math.PI / 2;
    // Calculate the angle for this stone
    const angleStep = (2 * Math.PI) / totalStones;
    const angle = angleOffset + (index * angleStep);
    
    // Calculate x and y coordinates (center of circle is at 50%, 50%)
    // Radius is 45% of the container
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };
  
  // Get color based on category
  const getStoneColor = (category: string) => {
    switch (category) {
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
  
  return (
    <div className="foundation-visualizer">
      {/* Circular foundation base */}
      <div className="foundation-base">
        <div className="foundation-circle"></div>
        
        {/* Placed stones */}
        <AnimatePresence>
          {selectedStones.map((stone, index) => {
            const { x, y } = calculateStonePosition(index, 9);
            const isAnimatingThis = animatingStoneId === stone.id;
            
            return (
              <motion.div
                key={stone.id}
                className={`foundation-stone ${stone.category}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                initial={{ 
                  scale: isAnimatingThis ? 1 : 0.5,
                  opacity: isAnimatingThis ? 0 : 1
                }}
                animate={{ 
                  scale: 0.5,
                  opacity: 1
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: isAnimatingThis ? 0.5 : 0.3,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div className={`stone-content bg-gradient-to-br ${getStoneColor(stone.category)}`}>
                  {stone.name}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Foundation label */}
      <div className="foundation-label">Foundation</div>
    </div>
  );
};

export default FoundationVisualizer;