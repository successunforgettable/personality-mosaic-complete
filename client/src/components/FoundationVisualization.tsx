import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';
import { useIsMobile } from '@/hooks/use-mobile';

interface FoundationVisualizationProps {
  selectedStones: FoundationStone[];
  totalStones: number;
  isAnimating?: boolean;
}

/**
 * Circular foundation visualization component that displays selected foundation stones
 * around a circular base with visual effects and animations
 */
const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({
  selectedStones,
  totalStones,
  isAnimating = false
}) => {
  const isMobile = useIsMobile();
  const [isGrowing, setIsGrowing] = useState(false);

  // Base diameter for the foundation (320px as specified)
  const baseDiameter = isMobile ? 240 : 320;
  
  // Calculate positions for stones in a circular arrangement
  const calculatePosition = (index: number, totalPositions: number) => {
    // Use Math.PI * 2 for a full circle, offset to start from the top
    const angle = (Math.PI * 2 * index / totalPositions) - Math.PI / 2;
    const radius = baseDiameter / 2 - 40; // Offset from edge
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  // Trigger growth animation when new stones are added
  useEffect(() => {
    if (selectedStones.length > 0) {
      setIsGrowing(true);
      const timer = setTimeout(() => {
        setIsGrowing(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedStones.length]);

  // Get appropriate colors based on stone category
  const getStoneColors = (category: string) => {
    switch (category) {
      case 'Head':
        return 'from-indigo-500 to-violet-500';
      case 'Heart':
        return 'from-pink-500 to-purple-500';
      case 'Body':
        return 'from-emerald-500 to-blue-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Progress indicator */}
      <div className="mb-4 text-center">
        <span className="font-semibold text-gray-700">
          {selectedStones.length} of {totalStones} stones selected
        </span>
      </div>
      
      {/* Foundation circle */}
      <motion.div 
        className="relative"
        style={{ 
          width: baseDiameter, 
          height: baseDiameter 
        }}
      >
        {/* Base foundation circle */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 shadow-lg"
          animate={{
            scale: isGrowing ? [1, 1.05, 1] : 1,
            boxShadow: isGrowing 
              ? '0 0 30px rgba(203, 213, 225, 0.7)' 
              : '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          initial={false}
        >
          {/* Idle animation pulse effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-white opacity-0"
            animate={{
              opacity: [0, 0.2, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>
        
        {/* Stones positioned around the circle */}
        <AnimatePresence>
          {selectedStones.map((stone, index) => {
            const position = calculatePosition(index, totalStones);
            const stoneSize = isMobile ? 60 : 80;
            
            // Determine shape class based on category
            let shapeClass = 'hexagon-shape';
            if (stone.category === 'Heart') {
              shapeClass = 'pentagon-shape';
            } else if (stone.category === 'Body') {
              shapeClass = 'octagon-shape';
            }
            
            // Get gradient colors
            const gradientStart = stone.category === 'Head' 
              ? '#4F46E5' 
              : stone.category === 'Heart' 
              ? '#EC4899' 
              : '#10B981';
            
            const gradientEnd = stone.category === 'Head' 
              ? '#7C3AED' 
              : stone.category === 'Heart' 
              ? '#8B5CF6' 
              : '#3B82F6';
            
            return (
              <motion.div
                key={stone.id}
                className="absolute"
                style={{
                  width: stoneSize,
                  height: stoneSize,
                  top: '50%',
                  left: '50%',
                  marginLeft: -stoneSize/2,
                  marginTop: -stoneSize/2,
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0, 
                  scale: 0.5 
                }}
                animate={{ 
                  x: position.x, 
                  y: position.y, 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 10, 0]
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  transition: { duration: 0.3 } 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div 
                  className="relative w-full h-full"
                >
                  <div 
                    className={`${shapeClass} absolute inset-0 border-2 border-white shadow-lg z-0`}
                    style={{ 
                      background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                  ></div>
                  <div className={`${shapeClass}-content absolute inset-0 flex items-center justify-center text-white text-xs md:text-sm font-semibold p-1 text-center z-10`}>
                    {stone.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Center point */}
        <motion.div 
          className="absolute rounded-full bg-white shadow-md border-2 border-slate-300"
          style={{
            width: baseDiameter / 5,
            height: baseDiameter / 5,
            top: '50%',
            left: '50%',
            marginLeft: -(baseDiameter / 10),
            marginTop: -(baseDiameter / 10),
          }}
          animate={{
            scale: isGrowing ? [1, 1.2, 1] : [1, 1.05, 1],
            rotate: isAnimating ? [0, 5, -5, 0] : 0
          }}
          transition={{
            duration: isGrowing ? 1 : 3,
            ease: "easeInOut",
            repeat: isGrowing ? 0 : Infinity,
            repeatType: "loop"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-xs font-semibold">
            Foundation
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FoundationVisualization;