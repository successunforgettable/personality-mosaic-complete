import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
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
 * around a circular base with visual effects and animations
 */
const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({
  selectedStones,
  totalStones,
  isAnimating = false,
  lastSelectedStoneId
}) => {
  // Debug props received by the component
  console.log('FoundationVisualization props:', { 
    selectedStonesCount: selectedStones.length, 
    totalStones,
    isAnimating,
    lastSelectedStoneId 
  });
  const isMobile = useIsMobile();
  const [isGrowing, setIsGrowing] = useState(false);
  const [scope, animate] = useAnimate();
  const prevStoneCountRef = useRef(0);
  const stoneRefs = useRef<(HTMLElement | null)[]>([]);

  // Base diameter for the foundation (320px as specified in section 17.1)
  const baseDiameter = isMobile ? 260 : 320;
  
  // Define the foundation growth stages
  const foundationGrowthStages = [
    { scale: 1, opacity: 0.7, shadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    { scale: 1.1, opacity: 0.8, shadow: '0 6px 12px rgba(0, 0, 0, 0.15)' },
    { scale: 1.05, opacity: 0.9, shadow: '0 8px 16px rgba(0, 0, 0, 0.2)' },
    { scale: 1.02, opacity: 1, shadow: '0 10px 20px rgba(0, 0, 0, 0.25)' }
  ];
  
  // Get the current foundation growth stage based on number of stones
  const currentGrowthStage = Math.min(
    Math.floor(selectedStones.length / 3),
    foundationGrowthStages.length - 1
  );
  
  // Calculate positions for stones in a circular arrangement (section 17.2)
  const calculatePosition = (index: number, total: number) => {
    // Use Math.PI * 2 for a full circle, offset to start from the top
    const angle = (Math.PI * 2 * index / total) - Math.PI / 2;
    
    // Different radii for different categories to create layered effect
    let radiusMultiplier = 1;
    const stone = selectedStones[index];
    
    if (stone) {
      if (stone.category === 'Head') radiusMultiplier = 0.9;
      else if (stone.category === 'Heart') radiusMultiplier = 1;
      else if (stone.category === 'Body') radiusMultiplier = 1.1;
    }
    
    const radius = (baseDiameter / 2 - 45) * radiusMultiplier;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  // Trigger growth animation when new stones are added (section 17.4)
  useEffect(() => {
    const newStoneAdded = selectedStones.length > prevStoneCountRef.current;
    
    // Debug stone addition
    console.log('Stone tracking:', { 
      prevCount: prevStoneCountRef.current, 
      currentCount: selectedStones.length,
      newStoneAdded: newStoneAdded,
      stoneRefs: stoneRefs.current.length
    });
    
    prevStoneCountRef.current = selectedStones.length;
    
    // Force growth animation when the component mounts and stones are already present
    if ((newStoneAdded || selectedStones.length > 0) && prevStoneCountRef.current === 0) {
      setIsGrowing(true);
      console.log('Triggering initial growth animation with existing stones:', selectedStones.length);
      
      const timer = setTimeout(() => {
        setIsGrowing(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    if (newStoneAdded && selectedStones.length > 0) {
      // Trigger foundation growth animation
      setIsGrowing(true);
      console.log('Growth animation triggered by new stone');
      
      // Reset growing state after animation
      const timer = setTimeout(() => {
        setIsGrowing(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedStones.length]);
  
  // Highlight the last added stone when it changes
  useEffect(() => {
    if (lastSelectedStoneId && selectedStones.length > 0) {
      console.log('New stone detected, highlighting:', lastSelectedStoneId);
      
      // Find the stone by ID to highlight it
      const stoneIndex = selectedStones.findIndex(stone => stone.id === lastSelectedStoneId);
      
      if (stoneIndex !== -1 && stoneRefs.current[stoneIndex]) {
        const stoneRef = stoneRefs.current[stoneIndex];
        
        if (stoneRef) {
          console.log('Highlighting stone at index:', stoneIndex);
          animate(stoneRef, 
            { 
              boxShadow: [
                '0 0 20px rgba(255, 255, 255, 0.9)',
                '0 0 5px rgba(255, 255, 255, 0.3)'
              ],
              scale: [1.2, 1]
            }, 
            { duration: 1.5, ease: 'easeOut' }
          );
        }
      }
    }
  }, [lastSelectedStoneId, selectedStones, animate]);

  return (
    <div className="flex flex-col items-center" ref={scope}>
      {/* Progress indicator (section 17.5) */}
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
      
      {/* Foundation circle (section 17.1) */}
      <motion.div 
        className="relative"
        style={{ 
          width: baseDiameter, 
          height: baseDiameter
        }}
        animate={{
          scale: isGrowing ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Base foundation circle with growth stages (section 17.4) */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(255,255,255,1) 0%, 
              rgba(240,240,245,1) 40%, 
              rgba(220,225,235,1) 100%
            )`,
          }}
          animate={{
            scale: isGrowing ? 
              [
                foundationGrowthStages[currentGrowthStage].scale,
                foundationGrowthStages[currentGrowthStage].scale + 0.05,
                foundationGrowthStages[currentGrowthStage].scale
              ] : 
              foundationGrowthStages[currentGrowthStage].scale,
            opacity: foundationGrowthStages[currentGrowthStage].opacity,
            boxShadow: foundationGrowthStages[currentGrowthStage].shadow
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {/* Idle animation pulse effect (section 17.8) */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-white opacity-0"
            animate={{
              opacity: [0, 0.2, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Foundation texture patterns that evolve with growth */}
          <motion.div 
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              opacity: Math.min(0.1 + (selectedStones.length * 0.03), 0.4),
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>
        
        {/* Stones positioned around the circle (section 17.2) */}
        <AnimatePresence>
          {selectedStones.map((stone, index) => {
            // Calculate position based on index in the array - ensures consistent positioning
            const position = calculatePosition(index, Math.max(totalStones, 9));
            const stoneSize = isMobile ? 60 : 70;
            
            // Determine shape class based on category
            let shapeClass = 'hexagon-shape';
            if (stone.category === 'Heart') {
              shapeClass = 'pentagon-shape';
            } else if (stone.category === 'Body') {
              shapeClass = 'octagon-shape';
            }
            
            // Get gradient colors based on category
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
            
            // Check if this is the most recently added stone
            const isLastAdded = stone.id === lastSelectedStoneId;
            
            console.log(`Rendering stone ${stone.id} (${stone.name}) at position ${index}`, { isLastAdded });
            
            return (
              <motion.div
                key={`stone-${stone.id}`}
                ref={el => stoneRefs.current[index] = el}
                className="absolute"
                style={{
                  width: stoneSize,
                  height: stoneSize,
                  top: '50%',
                  left: '50%',
                  marginLeft: -stoneSize/2,
                  marginTop: -stoneSize/2,
                  zIndex: isLastAdded ? 20 : index + 1
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0, 
                  scale: 0.5,
                  rotate: 0
                }}
                animate={{ 
                  x: position.x, 
                  y: position.y, 
                  opacity: 1, 
                  scale: isLastAdded ? [0.8, 1.2, 1] : 1,
                  rotate: index % 2 === 0 ? 0 : 180, // Alternate rotation for visual interest
                  boxShadow: isLastAdded 
                    ? ['0 0 15px rgba(255,255,255,0.7)', '0 4px 8px rgba(0,0,0,0.2)'] 
                    : '0 4px 8px rgba(0,0,0,0.2)'
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  transition: { duration: 0.3 } 
                }}
                transition={{ 
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  duration: isLastAdded ? 1.2 : 0.8,
                  delay: 0.1 * index
                }}
              >
                <div className="relative w-full h-full">
                  <div 
                    className={`${shapeClass} absolute inset-0 border-2 border-white shadow-lg z-0`}
                    style={{ 
                      background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                    }}
                  ></div>
                  <div className={`${shapeClass}-content absolute inset-0 flex items-center justify-center text-white text-xs font-semibold p-1 text-center z-10`}>
                    {stone.name}
                  </div>
                </div>
                
                {/* Connection lines to foundation center */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-b from-white to-transparent"
                  style={{
                    height: Math.sqrt(position.x * position.x + position.y * position.y),
                    transformOrigin: '0 0',
                    transform: `rotate(${Math.atan2(position.y, position.x)}rad)`,
                    opacity: isLastAdded ? 0.5 : 0.3,
                    zIndex: -1
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isLastAdded ? [0, 0.8, 0.5] : 0.3, 
                    scale: 1,
                    height: Math.sqrt(position.x * position.x + position.y * position.y)
                  }}
                  transition={{ 
                    duration: isLastAdded ? 0.8 : 0.4, 
                    delay: 0.1 * index + 0.2 
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Foundation center pulse */}
        <motion.div 
          className="absolute rounded-full bg-white border border-slate-200"
          style={{
            width: baseDiameter / 6,
            height: baseDiameter / 6,
            top: '50%',
            left: '50%',
            marginLeft: -(baseDiameter / 12),
            marginTop: -(baseDiameter / 12),
            zIndex: 10,
            boxShadow: '0 0 10px rgba(255,255,255,0.5), inset 0 0 10px rgba(255,255,255,0.8)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
            boxShadow: [
              '0 0 10px rgba(255,255,255,0.5), inset 0 0 10px rgba(255,255,255,0.8)',
              '0 0 20px rgba(255,255,255,0.7), inset 0 0 20px rgba(255,255,255,1)',
              '0 0 10px rgba(255,255,255,0.5), inset 0 0 10px rgba(255,255,255,0.8)'
            ]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </motion.div>
    </div>
  );
};

export default FoundationVisualization;