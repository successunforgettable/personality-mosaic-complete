import React from 'react';
import { motion } from 'framer-motion';
import './DirectFoundation.css';

// Center type color mapping
const CENTER_COLORS = {
  HEAD: {
    primary: '#3b82f6',  // Blue
    light: '#93c5fd',
    dark: '#1d4ed8'
  },
  HEART: {
    primary: '#ef4444',  // Red 
    light: '#fca5a5',
    dark: '#b91c1c'
  },
  BODY: {
    primary: '#10b981',  // Green
    light: '#6ee7b7',
    dark: '#047857'
  }
};

// DirectStone component - a simplified stone component that works reliably
const DirectStone = ({ content, centerType, size }) => {
  const colors = CENTER_COLORS[centerType] || CENTER_COLORS.HEAD;
  
  return (
    <div 
      className={`direct-stone ${size}`}
      style={{ 
        background: `linear-gradient(135deg, ${colors.light}, ${colors.primary}, ${colors.dark})` 
      }}
    >
      {content && content.length > 0 && (
        <div className="stone-content">
          {content.map((line, index) => (
            <div key={index} className="stone-line">{line}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main DirectFoundation component - implements a direct approach to the foundation visualization
export const DirectFoundation = ({ selectedStones = [] }) => {
  // Center mapping based on index (0-2: HEAD, 3-5: HEART, 6-8: BODY)
  const getCenterType = (index) => {
    if (index < 3) return 'HEAD';
    if (index < 6) return 'HEART';
    return 'BODY';
  };
  
  // Position calculation using exact specifications
  const getStonePosition = (index) => {
    const totalStones = 9;
    const angleStep = (2 * Math.PI) / totalStones;
    // Start from top (270 degrees or -90 degrees in radians)
    const angle = angleStep * index - Math.PI / 2;
    
    // Use the specification formula: x = 50 + 45*cos(angle), y = 50 + 45*sin(angle)
    // This positions stones in a circle at 45% distance from center
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div className="direct-foundation-container">
      <div className="direct-foundation-circle">
        {/* Foundation center */}
        <div className="direct-foundation-center">
          <span>Foundation</span>
        </div>
        
        {/* Position placed stones */}
        {selectedStones.map((stone, index) => {
          const position = getStonePosition(index);
          const centerType = getCenterType(stone.setIndex || 0);
          
          return (
            <motion.div
              key={`stone-${index}`}
              className="direct-placed-stone"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20, 
                delay: index * 0.1 
              }}
            >
              <DirectStone 
                content={stone.content || []}
                centerType={centerType}
                size="small"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DirectFoundation;