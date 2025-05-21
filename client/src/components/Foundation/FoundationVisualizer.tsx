import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';
import './FoundationVisualizer.css';

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
  const calculateStonePosition = (index: number) => {
    // Start at top (12 o'clock position)
    const angleOffset = -Math.PI / 2;
    // Calculate the angle for this stone - exactly 9 positions for the full circle
    const angleStep = (2 * Math.PI) / 9;
    const angle = angleOffset + (index * angleStep);
    
    // Calculate x and y coordinates (center of circle is at 50%, 50%)
    // Radius is 45% of the container as specified in the technical requirements
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };
  
  // Arrange selected stones by category and index
  const arrangeStonesByPosition = () => {
    const positions = Array(9).fill(null);
    
    // Sort stones by their center type to ensure consistent positioning
    selectedStones.forEach(stone => {
      // Determine position based on category and relative position within that category
      let basePosition = 0;
      if (stone.category === 'head') basePosition = 0;
      else if (stone.category === 'heart') basePosition = 3;
      else if (stone.category === 'body') basePosition = 6;
      
      // Find remaining empty position within the center's range
      for (let i = 0; i < 3; i++) {
        const posIndex = basePosition + i;
        if (positions[posIndex] === null) {
          positions[posIndex] = stone;
          break;
        }
      }
    });
    
    return positions.filter(p => p !== null) as FoundationStone[];
  };
  
  // Get arranged stones for visualization
  const arrangedStones = arrangeStonesByPosition();
  
  return (
    <div className="foundation-visualizer">
      {/* Circular foundation base */}
      <div className="foundation-base">
        <div className="foundation-circle"></div>
        
        {/* Placed stones */}
        <AnimatePresence>
          {selectedStones.map((stone, index) => {
            // Calculate stone index based on category
            let positionIndex = index;
            if (stone.category === 'heart') positionIndex = index + 3;
            else if (stone.category === 'body') positionIndex = index + 6;
            
            const { x, y } = calculateStonePosition(positionIndex % 9);
            const isAnimatingThis = animatingStoneId === stone.id;
            
            return (
              <motion.div
                key={stone.id}
                className={`foundation-stone ${stone.category} ${isAnimatingThis ? 'animating' : ''}`}
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
                <div className="stone-content">
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