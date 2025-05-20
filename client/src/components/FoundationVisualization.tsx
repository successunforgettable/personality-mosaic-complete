import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';
import { useIsMobile } from '@/hooks/use-mobile';

interface FoundationVisualizationProps {
  selectedStones: FoundationStone[];
  totalStones: number;
  isAnimating?: boolean;
  lastSelectedStoneId?: number;
}

/**
 * Circular foundation visualization component that displays selected foundation stones
 * around a circular base following exactly the specifications in section 17:
 * - Creates a 320px diameter circular foundation base
 * - Positions stones around the perimeter of the circle
 * - Draws connecting lines from stones to the center (spokes)
 * - Implements growth animations as stones are added
 */
const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({
  selectedStones,
  totalStones,
  isAnimating = false,
  lastSelectedStoneId
}) => {
  const isMobile = useIsMobile();
  const [isGrowing, setIsGrowing] = useState(false);
  const stoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevStoneCountRef = useRef(0);

  // Foundation base dimensions - exactly 320px as specified in section 17.1
  const baseDiameter = isMobile ? 280 : 320; // Mobile adjustment
  const baseRadius = baseDiameter / 2; // 160px radius

  // Calculate positions for stones around the circle perimeter
  const calculatePosition = (index: number, total: number) => {
    // Calculate angle, starting from top (negative PI/2)
    const angle = (Math.PI * 2 * index / total) - Math.PI / 2;
    
    // Position on the circle perimeter
    return {
      x: Math.cos(angle) * baseRadius,
      y: Math.sin(angle) * baseRadius
    };
  };

  // Trigger foundation growth animation when new stones are added
  useEffect(() => {
    const newStoneAdded = selectedStones.length > prevStoneCountRef.current;
    prevStoneCountRef.current = selectedStones.length;
    
    if (newStoneAdded && selectedStones.length > 0) {
      setIsGrowing(true);
      
      // Reset growing state after animation completes
      const timer = setTimeout(() => {
        setIsGrowing(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedStones.length]);

  return (
    <div className="flex flex-col items-center">
      {/* Progress indicator */}
      <div className="mb-4 text-center">
        <span className="font-semibold text-gray-700">
          {selectedStones.length} of {totalStones} stones selected
        </span>
        <div className="flex justify-center space-x-1 mt-1">
          {Array.from({ length: totalStones }).map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                i < selectedStones.length ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* SVG Foundation Visualization */}
      <div className="relative" style={{ width: baseDiameter, height: baseDiameter }}>
        {/* Circular foundation base - clearly visible as required */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gray-100 border border-gray-300"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          animate={{
            scale: isGrowing ? [1, 1.03, 1] : 1,
            boxShadow: isGrowing ? 
              ['0 4px 12px rgba(0, 0, 0, 0.1)', '0 8px 24px rgba(0, 0, 0, 0.15)', '0 4px 12px rgba(0, 0, 0, 0.1)'] :
              '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle texture pattern */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </motion.div>
        
        {/* Spoke lines connecting stones to center */}
        {selectedStones.map((stone, idx) => {
          const position = calculatePosition(idx, Math.max(totalStones, 9));
          const isLastAdded = stone.id === lastSelectedStoneId;
          
          // Calculate line properties
          const centerX = baseDiameter / 2;
          const centerY = baseDiameter / 2;
          const lineLength = Math.sqrt(position.x * position.x + position.y * position.y);
          const angle = Math.atan2(position.y, position.x);
          
          return (
            <motion.div 
              key={`line-${stone.id}`}
              className="absolute bg-gray-300"
              style={{
                width: 2,
                height: lineLength,
                top: centerY,
                left: centerX,
                transformOrigin: '0 0',
                transform: `rotate(${angle}rad)`,
                zIndex: 5
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ 
                opacity: 0.6, 
                scaleY: 1 
              }}
              transition={{ 
                duration: 0.4,
                delay: isLastAdded ? 0 : 0.2
              }}
            />
          );
        })}
        
        {/* Center hub */}
        <motion.div 
          className="absolute rounded-full bg-white border border-gray-200"
          style={{
            width: 24,
            height: 24,
            top: '50%',
            left: '50%',
            marginLeft: -12,
            marginTop: -12,
            zIndex: 20,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 2px 8px rgba(0, 0, 0, 0.1)',
              '0 4px 12px rgba(0, 0, 0, 0.2)',
              '0 2px 8px rgba(0, 0, 0, 0.1)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        
        {/* Stones positioned around the perimeter */}
        <AnimatePresence>
          {selectedStones.map((stone, idx) => {
            const pos = calculatePosition(idx, Math.max(totalStones, 9));
            const stoneSize = isMobile ? 55 : 65;
            const isLastAdded = stone.id === lastSelectedStoneId;
            
            // Determine shape class based on stone category
            let shapeClass = 'hexagon-shape'; // Head
            if (stone.category === 'Heart') {
              shapeClass = 'pentagon-shape';
            } else if (stone.category === 'Body') {
              shapeClass = 'octagon-shape';
            }
            
            // Get gradient colors based on category
            const gradientStart = stone.category === 'Head' 
              ? '#4F46E5' // Indigo
              : stone.category === 'Heart' 
              ? '#EC4899' // Pink
              : '#10B981'; // Emerald
            
            const gradientEnd = stone.category === 'Head' 
              ? '#7C3AED' // Violet
              : stone.category === 'Heart' 
              ? '#8B5CF6' // Purple
              : '#3B82F6'; // Blue
            
            return (
              <motion.div
                key={`stone-${stone.id}`}
                ref={el => stoneRefs.current[idx] = el}
                className="absolute"
                style={{
                  width: stoneSize,
                  height: stoneSize,
                  // Position stone so its center is on the circle perimeter
                  top: (baseDiameter / 2) + pos.y - (stoneSize / 2),
                  left: (baseDiameter / 2) + pos.x - (stoneSize / 2),
                  zIndex: 10
                }}
                initial={{ 
                  scale: 0.2,
                  opacity: 0,
                  rotate: -15
                }}
                animate={{ 
                  scale: isLastAdded ? [0.2, 1.2, 1] : 1,
                  opacity: 1,
                  rotate: 0,
                  boxShadow: isLastAdded ? 
                    ['0 0 15px rgba(255,255,255,0.8)', '0 4px 8px rgba(0,0,0,0.2)'] : 
                    '0 4px 8px rgba(0,0,0,0.2)'
                }}
                exit={{ 
                  scale: 0.2, 
                  opacity: 0 
                }}
                transition={{ 
                  type: 'spring',
                  damping: 20,
                  stiffness: 300,
                  duration: isLastAdded ? 0.8 : 0.4
                }}
              >
                {/* Stone shape with distinct styling by category */}
                <div className="relative w-full h-full">
                  {/* Shape background */}
                  <div 
                    className={`${shapeClass} absolute inset-0 border-2 border-white shadow-md z-0`}
                    style={{ 
                      background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                    }}
                  />
                  {/* Stone content */}
                  <div 
                    className={`${shapeClass}-content absolute inset-0 flex items-center justify-center text-white text-xs font-medium p-1 text-center z-10`}
                  >
                    {stone.name}
                  </div>
                </div>
                
                {/* Highlight effect for newly added stones */}
                {isLastAdded && (
                  <motion.div 
                    className={`${shapeClass} absolute inset-0 bg-white z-5`}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FoundationVisualization;