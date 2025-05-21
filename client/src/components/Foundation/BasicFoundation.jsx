import React from 'react';
import './BasicFoundation.css';

/**
 * BasicFoundation - A very simple foundation visualization
 */
const BasicFoundation = ({ selectedStones = [] }) => {
  // Get total number of stones selected
  const stoneCount = selectedStones.length;
  
  return (
    <div className="basic-foundation">
      <div className="foundation-text">Foundation</div>
      <div className="stone-count-text">{stoneCount} of 9 stones selected</div>
      
      <div className="stone-dots">
        {/* Head stones (blue) */}
        <div className={`stone-dot blue ${stoneCount >= 1 ? 'visible' : ''}`}></div>
        <div className={`stone-dot blue ${stoneCount >= 2 ? 'visible' : ''}`}></div>
        <div className={`stone-dot blue ${stoneCount >= 3 ? 'visible' : ''}`}></div>
        
        {/* Heart stones (red) */}
        <div className={`stone-dot red ${stoneCount >= 4 ? 'visible' : ''}`}></div>
        <div className={`stone-dot red ${stoneCount >= 5 ? 'visible' : ''}`}></div>
        <div className={`stone-dot red ${stoneCount >= 6 ? 'visible' : ''}`}></div>
        
        {/* Body stones (green) */}
        <div className={`stone-dot green ${stoneCount >= 7 ? 'visible' : ''}`}></div>
        <div className={`stone-dot green ${stoneCount >= 8 ? 'visible' : ''}`}></div>
        <div className={`stone-dot green ${stoneCount >= 9 ? 'visible' : ''}`}></div>
      </div>
    </div>
  );
};

export default BasicFoundation;