import React from 'react';
import './Stone.css';

/**
 * Stone Component
 * A hexagonal stone component for the foundation phase
 * Follows the specifications in tech_spec_v2.md
 */
const Stone = ({ 
  content, 
  selected, 
  onClick, 
  stoneIndex,
  position,
  isPlaced = false,
  gradientColors = { from: '#93c5fd', to: '#3b82f6' }
}) => {
  // Calculate styles for stones placed around the foundation
  const placedStyle = isPlaced && position ? {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: 'translate(-50%, -50%) scale(0.5)', // Stones are 0.5x size when placed
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  } : {};

  // Extract content lines - supports both string array and dot-delimited format
  const contentLines = Array.isArray(content) 
    ? content 
    : (content ? content.split('•').filter(line => line.trim()) : []);
  
  return (
    <div 
      className={`stone ${selected ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
      onClick={() => !isPlaced && onClick(stoneIndex)}
      style={placedStyle}
      role="button"
      aria-pressed={selected}
      tabIndex={isPlaced ? -1 : 0}
    >
      <div 
        className="stone-content"
        style={{
          background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`
        }}
      >
        <div className="stone-text">
          {contentLines.map((line, index) => (
            <div key={index} className="stone-text-item">
              {typeof line === 'string' ? line.trim() : line}
            </div>
          ))}
        </div>
      </div>
      {selected && !isPlaced && <div className="stone-checkmark">✓</div>}
    </div>
  );
};

export default Stone;