import React from 'react';
import './FinalVisualization.css';

const FinalVisualization = ({ selectedStones = [] }) => {
  return (
    <div className="final-foundation-container">
      <div className="final-foundation-circle">
        {/* Center point */}
        <div className="center-point"></div>
        
        {/* Top stone - HEART (HEXAGON) */}
        <div className="stone-container top-stone">
          <div className="connecting-line"></div>
          <div className="stone heart-stone"></div>
        </div>
        
        {/* Right stone - HEAD (PENTAGON) */}
        <div className="stone-container right-stone">
          <div className="connecting-line"></div>
          <div className="stone head-stone"></div>
        </div>
        
        {/* Bottom stone - BODY (OCTAGON) */}
        <div className="stone-container bottom-stone">
          <div className="connecting-line"></div>
          <div className="stone body-stone"></div>
        </div>
      </div>
      
      <div className="foundation-counter">
        3 of 9 stones selected
      </div>
    </div>
  );
};

export default FinalVisualization;