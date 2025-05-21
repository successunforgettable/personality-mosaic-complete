import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stone from './Stone';
import FoundationBase from './FoundationBase';
import StoneSet from './StoneSet';
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
      // Create a copy of the selections array to modify
      const updatedSelections = [...stoneSelections];
      
      // Store this selection (replacing any previous selection for this set)
      updatedSelections[currentSetIndex] = stoneIndex;
      setStoneSelections(updatedSelections);
      
      // Update placed stones - remove any existing stone for this position first
      const updatedPlacedStones = placedStones.filter(stone => stone.position !== currentSetIndex);
      
      // Add the new stone for this position
      updatedPlacedStones.push({
        stoneIndex,
        position: currentSetIndex,
        setIndex: currentSetIndex
      });
      
      // Update the placed stones state
      setPlacedStones(updatedPlacedStones);
      
      // If not the last set, move to next set
      if (currentSetIndex < STONE_SETS.length - 1) {
        setTimeout(() => {
          setCurrentSetIndex(currentSetIndex + 1);
        }, 600); // Wait for animation to complete
      } else {
        // If last set, complete the phase
        setTimeout(() => {
          onComplete(updatedSelections);
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
  
  // Function to go back to previous set
  const handlePreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };

  // Function to go forward to next set
  const handleNextSet = () => {
    if (currentSetIndex < STONE_SETS.length - 1 && stoneSelections[currentSetIndex] !== undefined) {
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  // Function to complete the phase
  const handleComplete = () => {
    // Make sure all sets have a selection
    const hasAllSelections = stoneSelections.length === STONE_SETS.length && 
                            stoneSelections.every(selection => selection !== undefined);
    
    if (hasAllSelections) {
      onComplete(stoneSelections);
    }
  };
  
  return (
    <div className="foundation-experience">
      <h2 className="phase-title">Choose Your Foundation Stones</h2>
      
      <div className="foundation-layout">
        <div className="foundation-visualizer">
          <FoundationBase 
            placedStones={placedStones} 
            stoneData={allStoneData}
          />
          <div className="progress-indicator">
            {currentSetIndex + 1} of 9 stone sets selected
          </div>
        </div>
        
        <div className="selection-area">
          {/* Add a clear separator */}
          <div className="section-divider"></div>
          
          <StoneSet
            stones={currentStones}
            onStoneSelect={handleStoneSelect}
            currentSetIndex={currentSetIndex}
            totalSets={STONE_SETS.length}
          />
          
          {/* Navigation buttons */}
          <div className="navigation-buttons">
            <button 
              className="nav-button back-button" 
              onClick={handlePreviousSet}
              disabled={currentSetIndex === 0}
            >
              Previous Set
            </button>
            
            {currentSetIndex < STONE_SETS.length - 1 ? (
              <button 
                className="nav-button next-button" 
                onClick={handleNextSet}
                disabled={stoneSelections[currentSetIndex] === undefined}
              >
                Next Set
              </button>
            ) : (
              <button 
                className="nav-button complete-button"
                onClick={handleComplete}
                disabled={!stoneSelections.every((selection, index) => index < STONE_SETS.length ? selection !== undefined : true)}
              >
                Complete Selection
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationExperience;