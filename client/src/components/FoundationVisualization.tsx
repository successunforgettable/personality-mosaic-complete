import React from 'react';
import './FoundationVisualization.css';
import { FoundationStone } from '@/types/assessment';

interface FoundationVisualizationProps {
  selectedStones: FoundationStone[];
  totalStones: number;
  isAnimating?: boolean;
  lastSelectedStoneId?: number;
}

const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({ 
  selectedStones = [],
  totalStones = 9
}) => {
  // Map the foundation stone categories to the types needed for visualization
  const mapCategoryToType = (category: string): 'heart' | 'head' | 'body' => {
    if (category === 'Heart') return 'heart';
    if (category === 'Body') return 'body';
    return 'head'; // Default/Head
  };
  
  // Use the actual selected stones, mapped to include the visual type
  const stonesToRender = selectedStones.map(stone => ({
    id: stone.id,
    type: mapCategoryToType(stone.category),
    name: stone.name,
    traits: stone.content?.join(' • ') || ''
  }));
  
  return (
    <div className="flex flex-col items-center">
      {/* Section header */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">Complete Your Foundation</h2>
      
      <p className="text-center mb-4 text-gray-700 max-w-lg">
        Choose the stone that resonates most with your core traits and personality. These selections
        will form the foundation of your personality tower.
      </p>
      
      {/* Selected stones indicator */}
      <div className="mb-4 text-center">
        <span className="font-semibold text-gray-700">
          {selectedStones.length} of {totalStones} stones selected
        </span>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-1">
          {Array.from({ length: totalStones }).map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                i < selectedStones.length ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Foundation Visualization */}
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
                <div className={`stone-shape ${stonesToRender[0]?.type || 'head'}`}></div>
              </>
            )}
          </div>
          
          <div className="stone-position pos-1">
            {stonesToRender.length > 1 && (
              <>
                <div className="stone-line"></div>
                <div className={`stone-shape ${stonesToRender[1]?.type || 'heart'}`}></div>
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
      </div>
      
      {/* Additional text */}
      <div className="text-sm text-gray-500 mt-8 text-center">
        Choose a foundation stone to integrate into your personality tower.
      </div>
    </div>
  );
};

export default FoundationVisualization;