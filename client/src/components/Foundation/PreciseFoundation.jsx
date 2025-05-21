import React from 'react';
import { motion } from 'framer-motion';
import './PreciseFoundation.css';

/**
 * PreciseFoundation Component - Implements the exact specifications from technical documentation
 * This component follows the precise requirements:
 * - Circular foundation base (320px diameter)
 * - Stone Placement using exact formula: x = 50 + 45*cos(angle), y = 50 + 45*sin(angle)
 * - Stone scaling to 0.5x when placed on foundation
 */

// Center type colors mapping - exact colors from spec
const CENTER_COLORS = {
  'Head': {
    primary: '#3b82f6',  // Blue-500
    light: '#93c5fd',    // Blue-300
    dark: '#1d4ed8'      // Blue-700
  },
  'Heart': {
    primary: '#ef4444',  // Red-500 
    light: '#fca5a5',    // Red-300
    dark: '#b91c1c'      // Red-700
  },
  'Body': {
    primary: '#10b981',  // Green-500
    light: '#6ee7b7',    // Emerald-300
    dark: '#047857'      // Emerald-700
  }
};

// FoundationStone component - precise implementation of stone visual
const FoundationStone = ({ stone, size = 'normal' }) => {
  // Determine stone category and color mapping
  const category = stone.category || 'Head';
  const colors = CENTER_COLORS[category];
  
  // Extract content from stone
  let content = [];
  if (stone.baselines) {
    content = stone.baselines.split(' • ');
  } else if (stone.name) {
    content = [stone.name];
  }
  
  return (
    <div 
      className={`foundation-stone ${size}`}
      style={{ 
        background: `linear-gradient(135deg, ${colors.light}, ${colors.primary}, ${colors.dark})` 
      }}
    >
      <div className="stone-content">
        {content.map((text, i) => (
          <div key={i} className="stone-text">{text}</div>
        ))}
      </div>
    </div>
  );
};

// Main PreciseFoundation component - implements the exact specs for foundation visualization
const PreciseFoundation = ({ selectedStones = [] }) => {
  // Calculate stone position using exact formula from specs:
  // x = 50 + 45*cos(angle), y = 50 + 45*sin(angle)
  const calculatePosition = (index, totalStones = 9) => {
    const angleStep = (2 * Math.PI) / totalStones;
    // Start from top (-90 degrees = -PI/2 radians)
    const angle = angleStep * index - Math.PI / 2;
    
    // Exact formula from technical specs
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };
  
  return (
    <div className="precise-foundation-container">
      <div className="precise-foundation-circle">
        {/* Foundation center */}
        <div className="precise-foundation-center">
          <span>Foundation</span>
        </div>
        
        {/* Stone positions */}
        {selectedStones.map((stone, index) => {
          // Calculate exact position for this stone
          const position = calculatePosition(index);
          
          return (
            <motion.div
              key={`stone-${index}`}
              className="precise-stone-position"
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
              <FoundationStone 
                stone={stone}
                size="small"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PreciseFoundation;