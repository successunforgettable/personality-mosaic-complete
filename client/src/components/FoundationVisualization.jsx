import React from 'react';
import './FoundationVisualization.css';

const FoundationVisualization = ({ selectedStones = [] }) => {
  // Show static stones for development
  const stoneData = [
    { type: 'heart', label: 'COMPASSION' },
    { type: 'head', label: 'ANALYSIS' },
    { type: 'body', label: 'PASSION' }
  ];
  
  return (
    <div className="foundation-container">
      {/* Main Foundation Circle */}
      <div className="foundation-circle">
        {/* Center point */}
        <div className="foundation-center"></div>
        
        {/* STATIC STONES FOR DEMO - positioned absolutely */}
        <div className="stone stone-1">
          <div className="stone-line"></div>
          <div className="stone-shape heart"></div>
        </div>
        
        <div className="stone stone-2">
          <div className="stone-line"></div>
          <div className="stone-shape head"></div>
        </div>
        
        <div className="stone stone-3">
          <div className="stone-line"></div>
          <div className="stone-shape body"></div>
        </div>
      </div>
      
      <div className="foundation-progress">
        3 of 9 stones selected
      </div>
    </div>
  );
};

export default FoundationVisualization;