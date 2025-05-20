import React from 'react';
import './FoundationVisualization.css';

const FoundationVisualization = ({ selectedStones = [] }) => {
  // STATIC TEST DATA - this is just for visual demonstration
  const stonesToRender = [
    { id: 1, type: 'head', name: 'INSIGHT' },
    { id: 2, type: 'heart', name: 'HARMONY' },
    { id: 3, type: 'body', name: 'VIGILANCE' }
  ];
  
  return (
    <div className="flex flex-col items-center">
      {/* Progress information */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">Complete Your Foundation</h2>
      
      <p className="text-center mb-6 text-gray-700 max-w-lg">
        Choose the stone that resonates most with your core traits and personality. These selections
        will form the foundation of your personality tower.
      </p>
      
      <div className="text-center mb-6">
        <span className="font-semibold text-gray-700">
          {selectedStones.length} of 9 stones selected
        </span>
      </div>
      
      {/* Foundation visualization container */}
      <div className="foundation-container">
        {/* Foundation Circle */}
        <div className="foundation-circle">
          {/* Center point */}
          <div className="foundation-center"></div>
          
          {/* Stones positioned as in the screenshot */}
          <div className="stone-position top-stone">
            <div className="stone-line top-line"></div>
            <div className="stone-shape head">
              <div className="stone-label">INSIGHT</div>
              <div className="stone-traits">PERCEPTION · KNOWLEDGE<br/>WISDOM</div>
            </div>
          </div>
          
          <div className="stone-position right-stone">
            <div className="stone-line right-line"></div>
            <div className="stone-shape heart">
              <div className="stone-label">HARMONY</div>
              <div className="stone-traits">PEACE · GRACE · EQUALITY<br/>CONNECTION</div>
            </div>
          </div>
          
          <div className="stone-position left-stone">
            <div className="stone-line left-line"></div>
            <div className="stone-shape body">
              <div className="stone-label">VIGILANCE</div>
              <div className="stone-traits">CAUTION · PREPARATION<br/>LOYALTY</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mt-4 text-center">
        Choose a foundation stone to integrate into your personality tower.
      </div>
    </div>
  );
};

export default FoundationVisualization;