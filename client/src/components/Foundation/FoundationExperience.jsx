import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stone from './Stone';
import SimpleCircle from './SimpleCircle';
import StoneSet from './StoneSet';
import './FoundationExperience.css';
import './continue-button.css';
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
  
  // Track visited sets for validation and UI purposes
  const [visitedSets, setVisitedSets] = useState([0]);
  
  // Current stones being displayed (with selection state)
  const [currentStones, setCurrentStones] = useState([
    { content: STONE_SETS[0][0], selected: false },
    { content: STONE_SETS[0][1], selected: false },
    { content: STONE_SETS[0][2], selected: false },
  ]);
  
  // Handle stone selection with improved tracking
  const handleStoneSelect = (stoneIndex) => {
    // Update current stones to show selection
    const updatedStones = currentStones.map((stone, idx) => ({
      ...stone,
      selected: idx === stoneIndex
    }));
    setCurrentStones(updatedStones);
    
    // Add to selections array (replace if already exists)
    const newSelections = [...stoneSelections];
    newSelections[currentSetIndex] = stoneIndex;
    setStoneSelections(newSelections);
    
    // Update placed stones accordingly - remove any existing stone for this position first
    const newPlacedStones = placedStones.filter(stone => 
      stone.position !== currentSetIndex
    );
    
    // Add the new stone for this position
    newPlacedStones.push({
      stoneIndex,
      position: currentSetIndex,
      setIndex: currentSetIndex // Critical for proper coloring
    });
    
    // Update the placed stones state
    setPlacedStones(newPlacedStones);
    
    // Automatically proceed to next set after a short delay
    setTimeout(() => {
      if (currentSetIndex < STONE_SETS.length - 1) {
        // Go to next set
        const nextSetIndex = currentSetIndex + 1;
        setCurrentSetIndex(nextSetIndex);
        
        // Track visited sets for validation
        if (!visitedSets.includes(nextSetIndex)) {
          setVisitedSets([...visitedSets, nextSetIndex]);
        }
      } 
      // Note: We're no longer auto-completing when reaching the last set
      // This allows users to review their choices before finalizing
    }, 800);
  };
  
  // Update current stones when set changes and check for existing selections
  useEffect(() => {
    if (currentSetIndex < STONE_SETS.length) {
      // Load the new set of stones and check if any was previously selected
      const existingSelection = stoneSelections[currentSetIndex];
      
      setCurrentStones([
        { 
          content: STONE_SETS[currentSetIndex][0], 
          selected: existingSelection === 0 
        },
        { 
          content: STONE_SETS[currentSetIndex][1], 
          selected: existingSelection === 1 
        },
        { 
          content: STONE_SETS[currentSetIndex][2], 
          selected: existingSelection === 2 
        },
      ]);
    }
  }, [currentSetIndex, stoneSelections]);
  
  // Prepare stone data for rendering with correct colors
  const getStoneData = () => {
    // Create a flattened array of all stone data
    const data = [];
    
    STONE_SETS.forEach((set, setIndex) => {
      set.forEach((stoneContent, stoneIndex) => {
        // Get the center type (Head, Heart, Body)
        const centerType = Math.floor(setIndex / 3); // 0: Head, 1: Heart, 2: Body
        
        // Define color mappings for each center
        const centerColorMap = {
          0: { // Head
            primary: '#3b82f6', // Blue-500
            light: '#93c5fd',   // Blue-300
            dark: '#1d4ed8'     // Blue-700
          },
          1: { // Heart
            primary: '#ef4444', // Red-500
            light: '#fca5a5',   // Red-300
            dark: '#b91c1c'     // Red-700
          },
          2: { // Body
            primary: '#10b981', // Emerald-500
            light: '#6ee7b7',   // Emerald-300
            dark: '#047857'     // Emerald-700
          }
        };
        
        // Get the color set for this stone's center
        const colorSet = centerColorMap[centerType] || { 
          primary: '#64748b', 
          light: '#94a3b8', 
          dark: '#475569' 
        };
        
        // Create gradient colors with variations based on stoneIndex
        const gradientColors = {
          from: stoneIndex === 0 ? colorSet.light : 
                stoneIndex === 1 ? colorSet.primary : 
                colorSet.primary,
          to: stoneIndex === 0 ? colorSet.primary : 
              stoneIndex === 1 ? colorSet.primary : 
              colorSet.dark
        };
        
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
  
  // Enhanced navigation functions
  // Function to go back to previous set
  const goToPreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };

  // Function to go forward to next set with tracking
  const goToNextSet = () => {
    if (currentSetIndex < STONE_SETS.length - 1) {
      const nextSetIndex = currentSetIndex + 1;
      setCurrentSetIndex(nextSetIndex);
      
      // Track visited sets for validation
      if (!visitedSets.includes(nextSetIndex)) {
        setVisitedSets([...visitedSets, nextSetIndex]);
      }
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
          {/* Using the exact specification from technical documentation */}
          <SpecFoundation selectedStones={placedStones} />
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
          
          {/* Navigation buttons with improved controls */}
          <div className="navigation-controls">
            <button 
              className="nav-button" 
              onClick={goToPreviousSet}
              disabled={currentSetIndex === 0}
            >
              Previous Set
            </button>
            
            <button 
              className="nav-button"
              onClick={goToNextSet}
              disabled={currentSetIndex === STONE_SETS.length - 1}
            >
              Next Set
            </button>
            
            {/* Only show complete button when all sets have selections */}
            {stoneSelections.filter(selection => selection !== undefined).length === STONE_SETS.length && (
              <button 
                className="continue-button primary-button"
                onClick={() => onComplete(stoneSelections)}
              >
                Complete Foundation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationExperience;