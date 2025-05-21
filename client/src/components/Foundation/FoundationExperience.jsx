import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stone from './Stone';
import FoundationBase from './FoundationBase';
import './FoundationExperience.css';
import { STONE_SETS, STONE_COLORS } from './stoneData';

/**
 * FoundationExperience Component
 * The main component for Phase 1 of the Personality Mosaic Assessment
 * Handles the stone selection process through all sets
 */
const FoundationExperience = ({ onComplete }) => {
  // Current set of stones being displayed (0-indexed)
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // Stones that have been placed on the foundation
  const [placedStones, setPlacedStones] = useState([]);
  
  // Array to track which stone was selected from each set
  const [stoneSelections, setStoneSelections] = useState([]);
  
  // Current stones being displayed (with selection state)
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
      // Load the new set of stones
      setCurrentStones([
        { content: STONE_SETS[currentSetIndex][0], selected: false },
        { content: STONE_SETS[currentSetIndex][1], selected: false },
        { content: STONE_SETS[currentSetIndex][2], selected: false },
      ]);
    }
  }, [currentSetIndex]);
  
  // Prepare stone data for rendering with correct colors
  const getStoneData = () => {
    // Create a flattened array of all stone data
    const data = [];
    
    STONE_SETS.forEach((set, setIndex) => {
      set.forEach((stoneContent, stoneIndex) => {
        // Get the color for this set
        const setType = Math.floor(setIndex / 3); // 0: Head, 1: Heart, 2: Body
        const colorSet = STONE_COLORS[setType];
        
        // Create gradient colors with variations based on stoneIndex
        let gradientColors;
        if (stoneIndex === 0) {
          gradientColors = { from: colorSet.light, to: colorSet.primary };
        } else if (stoneIndex === 1) {
          gradientColors = { from: colorSet.primary, to: colorSet.primary };
        } else {
          gradientColors = { from: colorSet.primary, to: colorSet.dark };
        }
        
        data.push({
          content: stoneContent,
          gradientColors,
          setIndex,
          stoneIndex
        });
      });
    });
    
    return data;
  };
  
  // Get the current set type (Head, Heart, Body)
  const getCurrentSetType = () => {
    const setType = Math.floor(currentSetIndex / 3);
    if (setType === 0) return 'Head';
    if (setType === 1) return 'Heart';
    return 'Body';
  };
  
  // Get subtitle based on current set index
  const getSetSubtitle = () => {
    const types = ['Head', 'Heart', 'Body'];
    const setType = types[Math.floor(currentSetIndex / 3)];
    const setNumber = (currentSetIndex % 3) + 1;
    
    return `${setType} Set ${setNumber} of 3`;
  };
  
  // Get progress percentage (0-100)
  const getProgress = () => {
    return (currentSetIndex / STONE_SETS.length) * 100;
  };
  
  // All stone data for the foundation base
  const allStoneData = getStoneData();
  
  return (
    <div className="foundation-experience">
      <div className="foundation-header">
        <h2 className="phase-title">Select Your Foundation Stones</h2>
        <div className="phase-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          <div className="progress-label">
            <span className="current-set">{getSetSubtitle()}</span>
            <span className="set-type" style={{ 
              color: currentSetIndex < 3 ? '#3b82f6' : // Head - blue
                     currentSetIndex < 6 ? '#ef4444' : // Heart - red
                     '#10b981'                         // Body - green
            }}>
              {getCurrentSetType()} Center
            </span>
          </div>
        </div>
      </div>
      
      <div className="foundation-content">
        <div className="stone-selection">
          <h3 className="selection-title">Choose one stone from this set:</h3>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={`stone-set-${currentSetIndex}`}
              className="stone-options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStones.map((stone, index) => {
                // Get the color for this set
                const setType = Math.floor(currentSetIndex / 3); // 0: Head, 1: Heart, 2: Body
                const colorSet = STONE_COLORS[setType];
                
                // Create gradient colors with variations based on index
                let gradientColors;
                if (index === 0) {
                  gradientColors = { from: colorSet.light, to: colorSet.primary };
                } else if (index === 1) {
                  gradientColors = { from: colorSet.primary, to: colorSet.primary };
                } else {
                  gradientColors = { from: colorSet.primary, to: colorSet.dark };
                }
                
                return (
                  <Stone 
                    key={`stone-${currentSetIndex}-${index}`}
                    id={`${currentSetIndex}-${index}`}
                    content={stone.content}
                    isSelected={stone.selected}
                    gradientColors={gradientColors}
                    onClick={() => handleStoneSelect(index)}
                    tabIndex={index + 1}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="foundation-visualization">
          <h3 className="visualization-title">Your Foundation</h3>
          <FoundationBase 
            placedStones={placedStones}
            stoneData={allStoneData}
          />
        </div>
      </div>
    </div>
  );
};

export default FoundationExperience;