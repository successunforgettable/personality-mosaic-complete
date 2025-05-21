import React, { useState } from 'react';
import Stone from './Stone';
import { STONE_SETS } from './stoneData';
import './StoneSet.css';

/**
 * StoneSet component - Manages the selection of foundation stones
 * Displays a set of stones for each category (head, heart, body)
 * 
 * @param {Object} props
 * @param {Array} props.selectedStones - Array of currently selected stones
 * @param {Function} props.onStoneSelect - Callback when a stone is selected
 * @param {number} props.setIndex - Index of the stone set to display (default: 0 for head/heart/body)
 */
const StoneSet = ({ 
  selectedStones = [], 
  onStoneSelect,
  setIndex = 0 
}) => {
  // Current active category index (0 = head, 1 = heart, 2 = body)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  
  // Category names/centers
  const categories = [
    { index: 0, name: 'head', label: 'Head Center' },
    { index: 1, name: 'heart', label: 'Heart Center' },
    { index: 2, name: 'body', label: 'Body Center' }
  ];
  
  // Check if a stone is selected
  const isStoneSelected = (setIdx, stoneIdx) => {
    return selectedStones.some(stone => 
      stone.setIndex === setIdx && stone.stoneIndex === stoneIdx
    );
  };
  
  // Handle stone click
  const handleStoneClick = (stoneIdx) => {
    // Create stone object with content from STONE_SETS
    const stoneContent = STONE_SETS[setIndex]?.[stoneIdx];
    if (!stoneContent) return;
    
    const newStone = {
      id: `${setIndex}-${stoneIdx}`,
      setIndex: setIndex,
      stoneIndex: stoneIdx,
      name: stoneContent.split('•')[0].trim(),
      content: stoneContent,
      category: categories.find(c => c.index === stoneIdx)?.name || 'unknown'
    };
    
    // Check if this stone is already selected
    const isAlreadySelected = isStoneSelected(setIndex, stoneIdx);
    
    if (isAlreadySelected) {
      // Deselect the stone
      onStoneSelect(selectedStones.filter(stone => 
        !(stone.setIndex === setIndex && stone.stoneIndex === stoneIdx)
      ));
      return;
    }
    
    // Check if another stone from the same position is already selected
    const existingStoneAtSamePosition = selectedStones.find(stone => 
      stone.stoneIndex === stoneIdx
    );
    
    if (existingStoneAtSamePosition) {
      // Replace the existing stone in this position
      onStoneSelect([
        ...selectedStones.filter(stone => stone.stoneIndex !== stoneIdx),
        newStone
      ]);
    } else {
      // Add this stone to selections
      onStoneSelect([...selectedStones, newStone]);
    }
  };
  
  // Calculate selection count and total required
  const selectionCount = selectedStones.length;
  const totalRequired = 3; // One stone for each center
  
  return (
    <div className="stone-set">
      <div className="selection-counter">
        <span className="count">{selectionCount}</span> of {totalRequired} stones selected
      </div>
      
      {/* Category tabs */}
      <div className="stone-set-header">
        {categories.map(category => (
          <button
            key={category.index}
            className={`category-tab ${category.name} ${activeCategoryIndex === category.index ? 'active' : ''}`}
            onClick={() => setActiveCategoryIndex(category.index)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Stone container */}
      <div className="stone-container">
        {STONE_SETS[setIndex] && STONE_SETS[setIndex][activeCategoryIndex] && (
          <Stone
            key={`${setIndex}-${activeCategoryIndex}`}
            id={`${setIndex}-${activeCategoryIndex}`}
            content={STONE_SETS[setIndex][activeCategoryIndex]}
            name={STONE_SETS[setIndex][activeCategoryIndex].split('•')[0].trim()}
            category={categories.find(c => c.index === activeCategoryIndex)?.name}
            stoneIndex={activeCategoryIndex}
            setIndex={setIndex}
            selected={isStoneSelected(setIndex, activeCategoryIndex)}
            onClick={() => handleStoneClick(activeCategoryIndex)}
          />
        )}
      </div>
    </div>
  );
};

export default StoneSet;