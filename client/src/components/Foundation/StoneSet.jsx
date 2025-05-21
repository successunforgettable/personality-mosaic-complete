import React from 'react';
import Stone from './Stone';
import { getStoneGradient } from './stoneData';
import './StoneSet.css';

/**
 * StoneSet Component - Displays a set of stones for selection in the foundation phase
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
  
  return (
    <div className="stone-set-container">
      <div className="stone-set-instructions">
        Select one stone from this set ({currentSetIndex + 1}/{totalSets})
      </div>
      
      <div className="stone-set">
        {mappedStones.map((stone, index) => {
          return (
            <Stone
              key={index}
              content={stone.content}
              selected={stone.selected}
              onClick={onStoneSelect}
              stoneIndex={index}
              setIndex={currentSetIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StoneSet;