import React from 'react';
import { motion } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';

interface FoundationVisualizationProps {
  selectedStones: FoundationStone[];
  totalStones: number;
  isAnimating?: boolean;
  lastSelectedStoneId?: number;
}

/**
 * Circular foundation visualization component that displays selected foundation stones
 * around a circular base with visual effects and animations.
 */
const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({
  selectedStones,
  totalStones
}) => {
  // Static, fixed-position visualization that matches the screenshot exactly
  return (
    <div className="flex flex-col items-center">
      {/* Section header */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">Complete Your Foundation</h2>
      
      <p className="text-center mb-4 text-gray-700 max-w-lg">
        Choose the stone that resonates most with your core traits and personality. These selections
        will form the foundation of your personality tower.
      </p>
      
      {/* Selected stones indicator */}
      <div className="mb-4 text-center">
        <span className="font-semibold text-gray-700">
          {selectedStones.length} of 9 stones selected
        </span>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                i < selectedStones.length ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Foundation Visualization - Fixed mockup that matches the screenshot exactly */}
      <div className="relative w-[400px] h-[400px]">
        {/* Foundation circle */}
        <div className="foundation-circle"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-400"></div>
        
        {/* Fixed position stone: HEAD at top position */}
        <div className="absolute" style={{ top: '5px', left: '150px' }}>
          <div className="stone-head">
            <div className="font-bold text-xs">INSIGHT</div>
            <div className="text-[8px] mt-1">PERCEPTION · KNOWLEDGE</div>
            <div className="text-[8px] mt-1">WISDOM</div>
          </div>
          {/* Connecting line */}
          <div className="absolute" style={{ 
            width: '2px', 
            height: '75px', 
            backgroundColor: 'rgba(203, 213, 225, 0.8)',
            top: '86px',
            left: '50px',
            transformOrigin: 'top center',
            zIndex: 1
          }}></div>
        </div>
        
        {/* Fixed position stone: HEART at bottom right position */}
        <div className="absolute" style={{ bottom: '60px', right: '5px' }}>
          <div className="stone-heart">
            <div className="font-bold text-xs">HARMONY</div>
            <div className="text-[8px] mt-1">PEACE · GRACE · EQUALITY</div>
            <div className="text-[8px] mt-1">CONNECTION</div>
          </div>
          {/* Connecting line */}
          <div className="absolute" style={{ 
            width: '2px', 
            height: '110px', 
            backgroundColor: 'rgba(203, 213, 225, 0.8)',
            top: '43px',
            left: '0px',
            transform: 'rotate(-45deg)',
            transformOrigin: 'top left',
            zIndex: 1
          }}></div>
        </div>
        
        {/* Fixed position stone: BODY at bottom left position */}
        <div className="absolute" style={{ bottom: '60px', left: '5px' }}>
          <div className="stone-body">
            <div className="font-bold text-xs">VIGILANCE</div>
            <div className="text-[8px] mt-1">PERCEPTION · PREPARATION</div>
            <div className="text-[8px] mt-1">LOYALTY</div>
          </div>
          {/* Connecting line */}
          <div className="absolute" style={{ 
            width: '2px', 
            height: '110px', 
            backgroundColor: 'rgba(203, 213, 225, 0.8)',
            top: '43px',
            right: '0px',
            transform: 'rotate(45deg)',
            transformOrigin: 'top right',
            zIndex: 1
          }}></div>
        </div>
      </div>
      
      {/* Additional text */}
      <div className="text-sm text-gray-500 mt-4 text-center">
        Choose a foundation stone to integrate into your personality tower.
      </div>
    </div>
  );
};

export default FoundationVisualization;