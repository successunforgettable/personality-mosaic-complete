import React from 'react';
import './FoundationVisualization.css';

const FoundationVisualization = ({ selectedStones = [] }) => {
  // Dummy data for static visualization - you can replace with real data later
  const dummyStones = [
    { id: 1, type: 'heart', name: 'COMPASSION', traits: 'EMPATHY • KINDNESS • UNDERSTANDING' },
    { id: 2, type: 'head', name: 'ANALYSIS', traits: 'LOGIC • THINKING • SOLVING' },
    { id: 3, type: 'body', name: 'PASSION', traits: 'ENTHUSIASM • INTENSITY • DRIVE' },
    // Add more as needed
  ];
  
  // Use either real data or dummy data
  const stonesToRender = selectedStones.length > 0 ? selectedStones : [];
  
  return (
    <div className="foundation-container">
      {/* Foundation Circle */}
      <div className="foundation-circle">
        {/* Center point */}
        <div className="foundation-center"></div>
        
        {/* Stone positions */}
        <div className="stone-position pos-0">
          {stonesToRender.length > 0 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[0]?.type || 'heart'}`}></div>
            </>
          )}
        </div>
        
        <div className="stone-position pos-1">
          {stonesToRender.length > 1 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[1]?.type || 'head'}`}></div>
            </>
          )}
        </div>
        
        <div className="stone-position pos-2">
          {stonesToRender.length > 2 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[2]?.type || 'body'}`}></div>
            </>
          )}
        </div>
        
        {/* Add positions 3-8 with the same pattern */}
      </div>
      
      <div className="foundation-progress">
        {stonesToRender.length} of 9 stones selected
      </div>
    </div>
  );
};

export default FoundationVisualization;