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
  // Get stone content from the selected stone object
  const getStoneContent = (stone) => {
    // Extract content from stone data if available
    if (stone.content) return stone.content;
    
    // Try to create content from baselines if available
    if (stone.baselines) {
      return stone.baselines.split(' • ');
    }
    
    // Default to using name if content/baselines not available
    return [stone.name || ''];
  };
  
  // Center mapping based on index (0-2: HEAD, 3-5: HEART, 6-8: BODY)
  const getCenterType = (index) => {
    if (index < 3) return 'HEAD';
    if (index < 6) return 'HEART';
    return 'BODY';
  };
  
  // Position calculation using fixed positions to guarantee correct placement
  const getStonePosition = (index) => {
    // Fixed positions for the stones in a perfect circle
    const positions = [
      { x: 50, y: 5 },     // Top
      { x: 84, y: 21 },    // Top right
      { x: 89, y: 50 },    // Right
      { x: 78, y: 78 },    // Bottom right
      { x: 50, y: 90 },    // Bottom
      { x: 22, y: 78 },    // Bottom left
      { x: 11, y: 50 },    // Left
      { x: 16, y: 21 },    // Top left
      { x: 50, y: 5 }      // Top (extra position if needed)
    ];
    
    // Return the fixed position for this index
    return positions[index % positions.length];
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
          const stoneContent = getStoneContent(stone);
          
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
                content={stoneContent}
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