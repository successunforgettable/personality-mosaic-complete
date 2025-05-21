import React from 'react';
import Stone from './Stone';
import './StoneSet.css';

const StoneSet = ({ 
  stones, 
  onStoneSelect, 
  currentSetIndex,
  totalSets 
}) => {
  return (
    <div className="stone-set-container">
      <div className="stone-set-instructions">
        Select one stone from this set ({currentSetIndex + 1}/{totalSets})
      </div>
      <div className="stone-set">
        {stones.map((stone, index) => (
          <Stone
            key={index}
            content={stone.content}
            selected={stone.selected}
            onClick={() => onStoneSelect(index)}
            stoneIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

export default StoneSet;