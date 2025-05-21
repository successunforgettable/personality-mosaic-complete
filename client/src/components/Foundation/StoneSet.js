import React, { useState } from 'react';
import Stone from './Stone';
import { STONE_DATA } from './stoneData';
import './StoneSet.css';

/**
 * StoneSet component - Manages the selection of foundation stones
 * Displays a set of stones for each category (head, heart, body)
 * 
 * @param {Object} props
 * @param {Array} props.selectedStones - Array of currently selected stones
 * @param {Function} props.onStoneSelect - Callback when a stone is selected
 */
const StoneSet = ({ selectedStones = [], onStoneSelect }) => {
  // Current active category
  const [activeCategory, setActiveCategory] = useState('head');
  
  // All available categories
  const categories = ['head', 'heart', 'body'];
  
  // Get stones for the active category
  const stones = STONE_DATA[activeCategory] || [];
  
  // Check if a stone is selected
  const isStoneSelected = (stoneId) => {
    return selectedStones.some(stone => stone.id === stoneId);
  };
  
  // Handle stone click
  const handleStoneClick = (stone) => {
    // Check if this stone is already selected
    const isAlreadySelected = isStoneSelected(stone.id);
    
    // If already selected, deselect it
    if (isAlreadySelected) {
      onStoneSelect(selectedStones.filter(s => s.id !== stone.id));
      return;
    }
    
    // Check if another stone from the same category is already selected
    const existingStoneFromCategory = selectedStones.find(s => s.category === stone.category);
    
    if (existingStoneFromCategory) {
      // Replace the existing stone from this category
      onStoneSelect([
        ...selectedStones.filter(s => s.category !== stone.category),
        stone
      ]);
    } else {
      // Add this stone to selections
      onStoneSelect([...selectedStones, stone]);
    }
  };
  
  // Calculate selection count and total required
  const selectionCount = selectedStones.length;
  const totalRequired = 3; // One from each category
  
  return (
    <div className="stone-set">
      <div className="selection-counter">
        <span className="count">{selectionCount}</span> of {totalRequired} stones selected
      </div>
      
      {/* Category tabs */}
      <div className="stone-set-header">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${category} ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} Center
          </button>
        ))}
      </div>
      
      {/* Stone container */}
      <div className="stone-container">
        {stones.map(stone => (
          <Stone
            key={stone.id}
            id={stone.id}
            name={stone.name}
            content={stone.content}
            category={stone.category}
            gradientColors={stone.gradientColors}
            isSelected={isStoneSelected(stone.id)}
            onClick={() => handleStoneClick(stone)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoneSet;