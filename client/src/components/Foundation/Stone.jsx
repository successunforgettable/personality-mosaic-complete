import React from 'react';
import './Stone.css';

/**
 * Stone Component
 * A hexagonal stone component for the foundation phase
 */
const Stone = ({ 
  id, 
  content = [], 
  isSelected = false, 
  onClick, 
  gradientColors = { from: '#93c5fd', to: '#3b82f6' },
  tabIndex
}) => {
  // Determine if content is a string or array
  const contentArray = Array.isArray(content) ? content : [content];
  
  return (
    <div 
      className={`stone ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      tabIndex={tabIndex}
      role="button"
      aria-pressed={isSelected}
      data-stone-id={id}
    >
      <div 
        className="stone-content"
        style={{
          background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`
        }}
      >
        <div className="stone-text">
          {contentArray.map((text, index) => (
            <div key={`content-${index}`} className="stone-text-item">
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stone;