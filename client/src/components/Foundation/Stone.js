import React from 'react';
import './Stone.css';

/**
 * Stone component - Represents an individual foundation stone
 * 
 * @param {Object} props
 * @param {number} props.id - Unique identifier for the stone
 * @param {string} props.name - Name of the stone
 * @param {Array<string>} props.content - Array of 2-3 words/traits related to the stone
 * @param {string} props.category - Category of the stone (head, heart, body)
 * @param {Object} props.gradientColors - Colors for the stone gradient
 * @param {boolean} props.isSelected - Whether this stone is currently selected
 * @param {Function} props.onClick - Click handler function
 * @param {number} [props.tabIndex] - Optional tabIndex for accessibility
 */
const Stone = ({
  id,
  name,
  content,
  category,
  gradientColors,
  isSelected,
  onClick,
  tabIndex
}) => {
  // Prepare styles for the stone
  const stoneStyle = {
    background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
    color: 'white'
  };
  
  // Prepare class name
  const className = `stone ${isSelected ? 'selected' : ''}`;
  
  return (
    <div
      className={className}
      style={stoneStyle}
      onClick={onClick}
      tabIndex={tabIndex || 0}
      role="button"
      aria-pressed={isSelected}
      data-id={id}
      data-category={category}
    >
      <div className="stone-name">{name}</div>
      <div className="stone-content">
        {content.map((trait, idx) => (
          <span key={idx}>{trait}</span>
        ))}
      </div>
    </div>
  );
};

/**
 * Foundation Stone component - Used when a stone is placed on the foundation
 * Has smaller dimensions and position on the circle
 */
export const FoundationStone = ({
  id,
  name,
  category,
  gradientColors,
  position,
  isAnimating
}) => {
  // Calculate position on the circle
  const style = {
    background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
    color: 'white',
    left: `${position.x}px`,
    top: `${position.y}px`
  };
  
  const className = `foundation-stone ${isAnimating ? 'animated' : ''}`;
  
  return (
    <div
      className={className}
      style={style}
      data-id={id}
      data-category={category}
    >
      <div className="stone-name">{name}</div>
    </div>
  );
};

export default Stone;