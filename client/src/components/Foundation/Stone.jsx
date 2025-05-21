import React from 'react';
import './Stone.css';

/**
 * Stone Component - Represents a foundation stone in the personality assessment
 * 
 * @param {Object} props
 * @param {number} props.id - Unique identifier for the stone
 * @param {string} props.name - Main name/title of the stone
 * @param {string[]} props.content - Array of traits/keywords for the stone
 * @param {string} props.category - Category of the stone (Head, Heart, Body)
 * @param {string} props.shapeVariant - Shape of the stone (hexagon, pentagon, octagon)
 * @param {Object} props.gradientColors - Colors for the stone gradient
 * @param {boolean} props.isSelected - Whether the stone is currently selected
 * @param {Function} props.onClick - Click handler function
 * @param {number} props.tabIndex - Tab index for accessibility
 */
const Stone = ({
  id,
  name = '',
  content = [],
  category = 'head',
  shapeVariant = 'hexagon', // Default shape
  gradientColors = {
    from: '#60a5fa',
    to: '#3b82f6'
  },
  isSelected = false,
  onClick,
  tabIndex = 0
}) => {
  
  // Parse the content string into an array if it's a string
  let contentArray = Array.isArray(content) ? content : [content];
  
  // If content is a string with separators, split it
  if (typeof content === 'string') {
    contentArray = content.split('•').map(item => item.trim());
  }
  
  // Get the shape class based on category or explicit variant
  let shapeClass = 'stone-shape';
  
  if (shapeVariant) {
    shapeClass += ` shape-${shapeVariant}`;
  } else {
    // Default shapes based on category
    switch (category.toLowerCase()) {
      case 'head':
        shapeClass += ' shape-pentagon';
        break;
      case 'heart':
        shapeClass += ' shape-hexagon';
        break;
      case 'body':
        shapeClass += ' shape-octagon';
        break;
      default:
        shapeClass += ' shape-hexagon';
    }
  }
  
  // Create gradient style
  const gradientStyle = {
    background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
  };
  
  // Function to render content items
  const renderContent = () => {
    // If no content or empty array, don't render anything
    if (!contentArray || contentArray.length === 0) return null;
    
    // If only one content item, render it as title
    if (contentArray.length === 1) {
      return <div className="stone-title">{contentArray[0]}</div>;
    }
    
    // Get the main title (first item) and traits (remaining items)
    const title = contentArray[0];
    const traits = contentArray.slice(1);
    
    return (
      <>
        <div className="stone-title">{title}</div>
        <div className="stone-traits">
          {traits.map((trait, index) => (
            <span key={index} className="stone-trait">{trait}</span>
          ))}
        </div>
      </>
    );
  };
  
  return (
    <div 
      className={`stone ${isSelected ? 'stone-selected' : ''}`}
      onClick={onClick}
      tabIndex={tabIndex}
      role="button"
      aria-pressed={isSelected}
    >
      <div className={shapeClass} style={gradientStyle}>
        <div className="stone-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Stone;