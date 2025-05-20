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
 * around a circular base with visual effects and animations.
 * Implementation follows section 17 specifications exactly.
 */
const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({
  selectedStones,
  totalStones,
  isAnimating = false,
  lastSelectedStoneId
}) => {
  const isMobile = useIsMobile();
  const [isGrowing, setIsGrowing] = useState(false);
  const stoneRefs = useRef<(SVGGElement | null)[]>([]);
  const prevStoneCountRef = useRef(0);
  
  // SVG viewport settings
  const viewSize = isMobile ? 280 : 320;
  const centerX = viewSize / 2;
  const centerY = viewSize / 2;
  const radius = viewSize * 0.42; // Distance from center to stone position (slightly less than half)
  
  // Foundation circle settings
  const foundationRadius = viewSize * 0.44; // Slightly larger than stone radius
  const centerPointRadius = 5;
  
  // Initial animation for stones
  const initialPositionX = 100;
  const initialPositionY = 50;
  
  // Trigger foundation growth animation when new stones are added
  useEffect(() => {
    const newStoneAdded = selectedStones.length > prevStoneCountRef.current;
    prevStoneCountRef.current = selectedStones.length;
    
    if (newStoneAdded && selectedStones.length > 0) {
      setIsGrowing(true);
      
      const timer = setTimeout(() => {
        setIsGrowing(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedStones.length]);
  
  // Calculate stone position around the circle
  const calculateStonePosition = (index: number, total: number) => {
    // Calculate angle, starting from top (negative PI/2)
    const angle = (Math.PI * 2 * index / total) - Math.PI / 2;
    
    // Position on the circle perimeter
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };
  
  // Determine the shape path based on the stone category
  const getStoneShapePath = (category: string, size: number = 10) => {
    if (category === 'Heart') {
      // Pentagon for Heart
      const points = [];
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
        points.push(`${size * Math.cos(angle)},${size * Math.sin(angle)}`);
      }
      return `polygon(${points.join(' ')})`;
    } else if (category === 'Body') {
      // Octagon for Body
      const points = [];
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i / 8) - Math.PI / 2;
        points.push(`${size * Math.cos(angle)},${size * Math.sin(angle)}`);
      }
      return `polygon(${points.join(' ')})`;
    } else {
      // Hexagon for Head (default)
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
        points.push(`${size * Math.cos(angle)},${size * Math.sin(angle)}`);
      }
      return `polygon(${points.join(' ')})`;
    }
  };
  
  // Get fill color based on stone category
  const getStoneFillColor = (category: string) => {
    if (category === 'Heart') {
      return '#EC4899'; // Pink
    } else if (category === 'Body') {
      return '#10B981'; // Emerald
    } else {
      return '#4F46E5'; // Indigo (Head)
    }
  };
  
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
      <svg 
        width={viewSize} 
        height={viewSize} 
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        className="relative"
      >
        {/* Foundation circle */}
        <motion.circle 
          cx={centerX} 
          cy={centerY} 
          r={foundationRadius}
          fill="transparent"
          stroke="#e2e8f0"
          strokeWidth={2 + Math.min(2, Math.floor(selectedStones.length / 3))}
          animate={{
            stroke: isGrowing ? ['#e2e8f0', '#94a3b8', '#e2e8f0'] : '#e2e8f0',
            scale: isGrowing ? [1, 1.02, 1] : 1
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Subtle circle pattern */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={foundationRadius - 5}
          fill="transparent"
          stroke="#f8fafc"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        
        {/* Center point */}
        <motion.circle 
          cx={centerX} 
          cy={centerY} 
          r={centerPointRadius}
          fill="#94a3b8"
          animate={{
            scale: [1, 1.2, 1],
            fill: ['#94a3b8', '#64748b', '#94a3b8']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        
        {/* Stones and connecting lines */}
        <AnimatePresence>
          {selectedStones.map((stone, index) => {
            const position = calculateStonePosition(index, Math.max(totalStones, 9));
            const isLastAdded = stone.id === lastSelectedStoneId;
            
            return (
              <motion.g
                key={`stone-${stone.id}`}
                ref={el => stoneRefs.current[index] = el}
                initial={{ 
                  translateX: initialPositionX, 
                  translateY: initialPositionY, 
                  scale: 0.8,
                  opacity: 0
                }}
                animate={{ 
                  translateX: 0, 
                  translateY: 0, 
                  scale: isLastAdded ? [0.8, 1.2, 1] : 1,
                  opacity: 1
                }}
                exit={{ 
                  scale: 0.8, 
                  opacity: 0 
                }}
                transition={{ 
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                  duration: isLastAdded ? 1 : 0.6
                }}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center'
                }}
                transform={`translate(${position.x}, ${position.y})`}
              >
                {/* Connecting spoke line */}
                <motion.line
                  x1="0"
                  y1="0"
                  x2={centerX - position.x}
                  y2={centerY - position.y}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.2
                  }}
                />
                
                {/* Stone shape - using SVG elements with proper shapes */}
                <motion.g>
                  {/* Background shape */}
                  {stone.category === 'Heart' ? (
                    // Pentagon for Heart
                    <motion.path
                      d="M0,-12 L11.5,3.8 L7.1,15.5 L-7.1,15.5 L-11.5,3.8 Z"
                      fill={getStoneFillColor(stone.category)}
                      stroke="white"
                      strokeWidth="1"
                      animate={{ 
                        fill: isLastAdded ? 
                          [getStoneFillColor(stone.category), '#f8fafc', getStoneFillColor(stone.category)] : 
                          getStoneFillColor(stone.category)
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  ) : stone.category === 'Body' ? (
                    // Octagon for Body
                    <motion.path
                      d="M0,-12 L8.5,-8.5 L12,-0 L8.5,8.5 L0,12 L-8.5,8.5 L-12,0 L-8.5,-8.5 Z"
                      fill={getStoneFillColor(stone.category)}
                      stroke="white"
                      strokeWidth="1"
                      animate={{ 
                        fill: isLastAdded ? 
                          [getStoneFillColor(stone.category), '#f8fafc', getStoneFillColor(stone.category)] : 
                          getStoneFillColor(stone.category)
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  ) : (
                    // Hexagon for Head (default)
                    <motion.path
                      d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z"
                      fill={getStoneFillColor(stone.category)}
                      stroke="white"
                      strokeWidth="1"
                      animate={{ 
                        fill: isLastAdded ? 
                          [getStoneFillColor(stone.category), '#f8fafc', getStoneFillColor(stone.category)] : 
                          getStoneFillColor(stone.category)
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  
                  {/* Stone label */}
                  <text
                    fontSize="7"
                    fontWeight="500"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    y="1"
                  >
                    {stone.name}
                  </text>
                </motion.g>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default FoundationVisualization;