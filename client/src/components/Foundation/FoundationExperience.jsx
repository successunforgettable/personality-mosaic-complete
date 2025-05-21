import React, { useState, useEffect } from 'react';
import StoneSet from './StoneSet';
import FoundationBase from './FoundationBase';
import { STONE_SETS } from './stoneData';
import './FoundationExperience.css';

const FoundationExperience = ({ onComplete }) => {
  // State for current set index (0-8)
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // State for stone selections
  const [stoneSelections, setStoneSelections] = useState([]);
  
  // State for stones placed on foundation
  const [placedStones, setPlacedStones] = useState([]);
  
  // Current stone set with selection state
  const [currentStones, setCurrentStones] = useState([
    { content: STONE_SETS[0][0], selected: false },
    { content: STONE_SETS[0][1], selected: false },
    { content: STONE_SETS[0][2], selected: false },
  ]);
  
  // Handle stone selection
  const handleStoneSelect = (stoneIndex) => {
    // Update current stones to show selection
    const updatedStones = currentStones.map((stone, idx) => ({
      ...stone,
      selected: idx === stoneIndex
    }));
    setCurrentStones(updatedStones);
    
    // Add a slight delay before animation
    setTimeout(() => {
      // Add to selections array
      setStoneSelections([...stoneSelections, stoneIndex]);
      
      // Add to placed stones (showing on foundation) - include setIndex!
      setPlacedStones([
        ...placedStones, 
        { 
          stoneIndex, 
          position: currentSetIndex,
          setIndex: currentSetIndex // Store the set index for correct coloring
        }
      ]);
      
      // If not the last set, move to next set
      if (currentSetIndex < STONE_SETS.length - 1) {
        setTimeout(() => {
          setCurrentSetIndex(currentSetIndex + 1);
        }, 600); // Wait for animation to complete
      } else {
        // If last set, complete the phase
        setTimeout(() => {
          onComplete(stoneSelections);
        }, 1000);
      }
    }, 300);
  };
  
  // Update current stones when set changes
  useEffect(() => {
    if (currentSetIndex < STONE_SETS.length) {
      setCurrentStones([
        { content: STONE_SETS[currentSetIndex][0], selected: false },
        { content: STONE_SETS[currentSetIndex][1], selected: false },
        { content: STONE_SETS[currentSetIndex][2], selected: false },
      ]);
    }
  }, [currentSetIndex]);
  
  return (
    <div className="foundation-experience">
      <h2 className="phase-title">Choose Your Foundation Stones</h2>
      
      <div className="foundation-layout">
        <div className="foundation-visualizer">
          <FoundationBase 
            placedStones={placedStones} 
            stoneContents={STONE_SETS.flat()}
          />
          <div className="progress-indicator">
            {currentSetIndex + 1} of 9 stone sets selected
          </div>
        </div>
        
        <div className="selection-area">
          <StoneSet
            stones={currentStones}
            onStoneSelect={handleStoneSelect}
            currentSetIndex={currentSetIndex}
            totalSets={STONE_SETS.length}
          />
        </div>
      </div>
    </div>
  );
};

export default FoundationExperience;