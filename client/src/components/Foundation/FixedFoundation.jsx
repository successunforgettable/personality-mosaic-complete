import React from 'react';
import './FixedFoundation.css';

/**
 * FixedFoundation - Simple and direct implementation of the foundation visualization
 * that guarantees correct stone positioning according to specifications
 */
const FixedFoundation = ({ selectedStones = [] }) => {
  // Get color for a stone based on its category
  const getStoneColor = (category) => {
    switch (category) {
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

  // Get content for a stone as an array of strings
  const getStoneText = (stone) => {
    if (stone.baselines) {
      return stone.baselines.split(' • ');
    }
    return [stone.name || ''];
  };

  return (
    <div className="fixed-foundation">
      {/* Foundation circle */}
      <div className="fixed-foundation-circle">
        {/* Center of foundation */}
        <div className="fixed-foundation-center">Foundation</div>
        
        {/* Positioned stones */}
        {selectedStones.map((stone, index) => {
          const category = stone.category || 'Head';
          const colors = getStoneColor(category);
          const content = getStoneText(stone);
          
          return (
            <div 
              key={`stone-${index}`} 
              className={`fixed-stone-position position-${index + 1}`}
            >
              <div 
                className="fixed-stone"
                style={{
                  background: `linear-gradient(135deg, ${colors.light}, ${colors.primary}, ${colors.dark})`
                }}
              >
                <div className="fixed-stone-content">
                  {content.map((text, i) => (
                    <div key={i} className="fixed-stone-text">{text}</div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FixedFoundation;