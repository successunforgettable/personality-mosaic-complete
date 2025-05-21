import React from 'react';
import Stone from './Stone';
import { getStoneGradient } from './stoneData';
import './StoneSet.css';

/**
 * StoneSet Component - Displays a set of stones for selection in the foundation phase
 * 
 * @param {Object} props
 * @param {Array} props.stones - Array of stone data to display
 * @param {Function} props.onStoneSelect - Function to call when a stone is selected
 * @param {number} props.currentSetIndex - Current set index (0-based)
 * @param {number} props.totalSets - Total number of stone sets
 */
const StoneSet = ({ 
  stones = [], 
  onStoneSelect, 
  currentSetIndex = 0, 
  totalSets = 9 
}) => {
  // Map stones to the necessary format if needed
  const mappedStones = stones.map((stone, index) => {
    // Handle if stone is already an object with content property
    if (typeof stone === 'object' && stone.content) {
      return stone;
    }
    
    // Handle if stone is a string
    return {
      id: index,
      content: stone,
      selected: stone.selected || false
    };
  });
  
  // Determine stone category based on index
  const getCategoryForIndex = (index) => {
    // Every set follows the pattern: Head (0), Heart (1), Body (2)
    if (index === 0) return 'head';
    if (index === 1) return 'heart';
    if (index === 2) return 'body';
    
    return 'head'; // Default fallback
  };
  
  // Get appropriate shape variant based on category
  const getShapeVariant = (category) => {
    switch (category.toLowerCase()) {
      case 'head': return 'pentagon';
      case 'heart': return 'hexagon';
      case 'body': return 'octagon';
      default: return 'hexagon';
    }
  };
  
  return (
    <div className="stone-set-container">
      <div className="stone-set-instructions">
        Select one stone from this set ({currentSetIndex + 1}/{totalSets})
      </div>
      
      <div className="stone-set">
        {mappedStones.map((stone, index) => {
          const category = getCategoryForIndex(index);
          const shapeVariant = getShapeVariant(category);
          
          // Get gradient colors from stoneData helper or use defaults
          const gradientColors = {
            from: '#60a5fa',
            to: '#3b82f6'
          };
          
          // If getStoneGradient is available, use it to get the appropriate gradient
          if (typeof getStoneGradient === 'function') {
            const gradient = getStoneGradient(currentSetIndex, index);
            // Parse the gradient string to extract colors
            const match = gradient.match(/linear-gradient\(.*?, (.*?) 0%, (.*?) 100%\)/);
            if (match && match.length >= 3) {
              gradientColors.to = match[1];
              gradientColors.from = match[2];
            }
          }
          
          return (
            <Stone
              key={index}
              id={index}
              content={stone.content}
              category={category}
              shapeVariant={shapeVariant}
              gradientColors={gradientColors}
              isSelected={stone.selected}
              onClick={() => onStoneSelect(index)}
              tabIndex={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StoneSet;