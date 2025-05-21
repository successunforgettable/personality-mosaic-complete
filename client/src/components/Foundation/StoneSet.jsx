import React from 'react';
import Stone from './Stone.jsx';
import './StoneSet.css';

/**
 * StoneSet component - Displays a set of stones for selection
 * 
 * @param {Object} props
 * @param {Array} props.stones - Array of stone objects to display
 * @param {Function} props.onStoneSelect - Callback when a stone is selected
 * @param {number} props.currentSetIndex - Current set index being displayed
 * @param {number} props.totalSets - Total number of sets available
 */
const StoneSet = ({ 
  stones = [], 
  onStoneSelect,
  currentSetIndex = 0,
  totalSets = 1
}) => {
  // Handle stone click - pass the index to parent component
  const handleStoneClick = (index) => {
    if (typeof onStoneSelect === 'function') {
      onStoneSelect(index);
    }
  };
  
  return (
    <div className="stone-set-container">
      <div className="stone-set-instructions">
        Select one stone from this set ({currentSetIndex + 1}/{totalSets})
      </div>
      
      <div className="stone-set">
        {stones.map((stone, index) => (
          <Stone
            key={index}
            id={`stone-${index}`}
            content={stone.content}
            name={stone.name}
            selected={stone.selected}
            onClick={() => handleStoneClick(index)}
            stoneIndex={index}
            setIndex={currentSetIndex}
            category={stone.category}
          />
        ))}
      </div>
    </div>
  );
};

export default StoneSet;