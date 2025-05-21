import React from 'react';
import './SimpleCircle.css';

/**
 * SimpleCircle - A straightforward implementation following the technical spec
 * Only shows stones that have been selected
 */
const SimpleCircle = ({ selectedStones = [] }) => {
  // Get total number of stones selected
  const stoneCount = selectedStones.length;
  
  return (
    <div className="simple-circle-foundation">
      <div className="circle-base">
        <div className="center-circle">Foundation</div>
        
        {/* Only show stones that have been selected */}
        {stoneCount >= 1 && <div className="stone-dot stone-1"></div>}
        {stoneCount >= 2 && <div className="stone-dot stone-2"></div>}
        {stoneCount >= 3 && <div className="stone-dot stone-3"></div>}
        {stoneCount >= 4 && <div className="stone-dot stone-4"></div>}
        {stoneCount >= 5 && <div className="stone-dot stone-5"></div>}
        {stoneCount >= 6 && <div className="stone-dot stone-6"></div>}
        {stoneCount >= 7 && <div className="stone-dot stone-7"></div>}
        {stoneCount >= 8 && <div className="stone-dot stone-8"></div>}
        {stoneCount >= 9 && <div className="stone-dot stone-9"></div>}
      </div>
    </div>
  );
};

export default SimpleCircle;