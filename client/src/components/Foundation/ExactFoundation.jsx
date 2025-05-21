import React from 'react';
import { motion } from 'framer-motion';
import './ExactFoundation.css';

/**
 * ExactFoundation Component - Implements the precise specifications from the technical documentation
 * - Circular foundation base (320px diameter)
 * - Stone Placement using exact formula: x = 50 + 45*cos(angle), y = 50 + 45*sin(angle)
 * - Stone sizing exactly 80px × 80px when placed on foundation
 */

// FoundationStone - represents a single stone placed on the foundation
const FoundationStone = ({ stoneData, position }) => {
  // Determine the correct color based on the stone's center
  const getStoneColor = (category) => {
    switch(category) {
      case 'Head':
        return {
          primary: '#3b82f6', // Blue-500
          light: '#93c5fd',   // Blue-300
          dark: '#1d4ed8'     // Blue-700
        };
      case 'Heart':
        return {
          primary: '#ef4444', // Red-500
          light: '#fca5a5',   // Red-300
          dark: '#b91c1c'     // Red-700
        };
      case 'Body':
        return {
          primary: '#10b981', // Emerald-500
          light: '#6ee7b7',   // Emerald-300
          dark: '#047857'     // Emerald-700
        };
      default:
        return {
          primary: '#3b82f6',
          light: '#93c5fd',
          dark: '#1d4ed8'
        };
    }
  };

  // Get the stone's category (Head, Heart, Body)
  const category = stoneData.category;
  const colors = getStoneColor(category);
  
  // Get content for the stone
  const getStoneContent = () => {
    if (stoneData.baselines) {
      return stoneData.baselines.split(' • ');
    }
    return [stoneData.name || ''];
  };
  
  const content = getStoneContent();

  return (
    <motion.div
      className="stone-wrapper"
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20
      }}
    >
      <div 
        className="exact-stone"
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
    </motion.div>
  );
};

// Main ExactFoundation component
const ExactFoundation = ({ selectedStones = [] }) => {
  // Calculate position using the exact formula from specification
  const getStonePosition = (index) => {
    const totalStones = 9;
    const angleStep = (2 * Math.PI) / totalStones;
    // Start from top (-90 degrees = -PI/2 radians)
    const angle = angleStep * index - Math.PI / 2;
    
    // Use the exact formula: x = 50 + 45*cos(angle), y = 50 + 45*sin(angle)
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div className="exact-foundation-container">
      <div className="exact-foundation-circle">
        {/* Foundation center */}
        <div className="exact-foundation-center">
          <span>Foundation</span>
        </div>
        
        {/* Placed stones */}
        {selectedStones.map((stone, index) => {
          const position = getStonePosition(index);
          return (
            <FoundationStone 
              key={`stone-${index}`} 
              stoneData={stone} 
              position={position}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExactFoundation;