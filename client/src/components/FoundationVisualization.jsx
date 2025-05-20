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
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#e11d48',
            clipPath: 'polygon(50% 0%, 86% 25%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 14% 25%)',
            position: 'absolute',
            zIndex: 2
          }}></div>
        </div>
        
        <div className="stone stone-2">
          <div className="stone-line"></div>
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#4f46e5',
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            position: 'absolute',
            zIndex: 2
          }}></div>
        </div>
        
        <div className="stone stone-3">
          <div className="stone-line"></div>
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#0ea5e9',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            position: 'absolute',
            zIndex: 2
          }}></div>
        </div>
      </div>
      
      <div className="foundation-progress">
        3 of 9 stones selected
      </div>
    </div>
  );
};

export default FoundationVisualization;