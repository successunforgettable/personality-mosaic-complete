import React from 'react';
import './FoundationVisualization.css';

interface FoundationStone {
  id: number;
  category: string;
  name: string;
  [key: string]: any; // Allow other props
}

interface FoundationVisualizationProps {
  selectedStones: FoundationStone[];
  totalStones?: number;
  isAnimating?: boolean;
  lastSelectedStoneId?: number;
}

const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({ 
  selectedStones = [] 
}) => {
  // Convert FoundationStone format to visual type format
  const stonesToRender = selectedStones.map(stone => ({
    id: stone.id,
    type: stone.category === 'Heart' ? 'heart' : 
          stone.category === 'Body' ? 'body' : 'head',
    name: stone.name
  }));
  
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
        <div className="stone-position pos-3">
          {stonesToRender.length > 3 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[3]?.type || 'head'}`}></div>
            </>
          )}
        </div>
        
        <div className="stone-position pos-4">
          {stonesToRender.length > 4 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[4]?.type || 'heart'}`}></div>
            </>
          )}
        </div>
        
        <div className="stone-position pos-5">
          {stonesToRender.length > 5 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[5]?.type || 'body'}`}></div>
            </>
          )}
        </div>
        
        <div className="stone-position pos-6">
          {stonesToRender.length > 6 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[6]?.type || 'head'}`}></div>
            </>
          )}
        </div>
        
        <div className="stone-position pos-7">
          {stonesToRender.length > 7 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[7]?.type || 'heart'}`}></div>
            </>
          )}
        </div>
        
        <div className="stone-position pos-8">
          {stonesToRender.length > 8 && (
            <>
              <div className="stone-line"></div>
              <div className={`stone-shape ${stonesToRender[8]?.type || 'body'}`}></div>
            </>
          )}
        </div>
      </div>
      
      <div className="foundation-progress">
        {stonesToRender.length} of 9 stones selected
      </div>
    </div>
  );
};

export default FoundationVisualization;