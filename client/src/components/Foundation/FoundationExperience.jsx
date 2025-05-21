import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stone from './Stone';
import ExactFoundation from './ExactFoundation';
import StoneSet from './StoneSet';
import './FoundationExperience.css';
import './continue-button.css';

/**
 * FoundationExperience Component
 * The main component for Phase 1 of the Personality Mosaic Assessment
 * Handles the stone selection process through all sets
 */
const FoundationExperience = ({ onComplete }) => {
  // Stone sets data - directly from the specification
  const STONE_SETS = [
    // Head Center (Sets 0-2)
    [
      ["Analytical", "Observant", "Investigative"],
      ["Thoughtful", "Insightful", "Perceptive"],
      ["Strategic", "Focused", "Detail-oriented"]
    ],
    // Heart Center (Sets 3-5)
    [
      ["Empathetic", "Compassionate", "Understanding"],
      ["Expressive", "Passionate", "Authentic"],
      ["Supportive", "Caring", "Nurturing"]
    ],
    // Body Center (Sets 6-8)
    [
      ["Action-oriented", "Practical", "Hands-on"],
      ["Grounded", "Stable", "Reliable"],
      ["Adaptable", "Resilient", "Energetic"]
    ]
  ];
  
  // Flatten stone sets for easier access
  const flatStoneSets = STONE_SETS.flat();
  
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
    { content: flatStoneSets[0][0], selected: false },
    { content: flatStoneSets[0][1], selected: false },
    { content: flatStoneSets[0][2], selected: false },
  ]);
  
  // Handle stone selection
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
    
    // Update placed stones accordingly
    const newPlacedStones = placedStones.filter(stone => 
      stone.position !== currentSetIndex
    );
    
    // Add the new stone
    newPlacedStones.push({
      stoneIndex,
      position: currentSetIndex,
      content: flatStoneSets[currentSetIndex][stoneIndex]
    });
    
    // Update the placed stones state
    setPlacedStones(newPlacedStones);
    
    // User manually goes to next set - no automatic progression
  };
  
  // Update current stones when set changes and check for existing selections
  useEffect(() => {
    if (currentSetIndex < flatStoneSets.length) {
      // Load the new set of stones and check if any was previously selected
      const existingSelection = stoneSelections[currentSetIndex];
      
      setCurrentStones([
        { 
          content: flatStoneSets[currentSetIndex][0], 
          selected: existingSelection === 0 
        },
        { 
          content: flatStoneSets[currentSetIndex][1], 
          selected: existingSelection === 1 
        },
        { 
          content: flatStoneSets[currentSetIndex][2], 
          selected: existingSelection === 2 
        },
      ]);
    }
  }, [currentSetIndex, stoneSelections, flatStoneSets]);
  
  // Enhanced navigation functions
  // Function to go back to previous set
  const goToPreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };

  // Function to go forward to next set with tracking
  const goToNextSet = () => {
    if (currentSetIndex < flatStoneSets.length - 1) {
      const nextSetIndex = currentSetIndex + 1;
      setCurrentSetIndex(nextSetIndex);
      
      // Track visited sets for validation
      if (!visitedSets.includes(nextSetIndex)) {
        setVisitedSets([...visitedSets, nextSetIndex]);
      }
    }
  };
  
  // Get center type name
  const getCenterType = () => {
    const centerIndex = Math.floor(currentSetIndex / 3);
    return ['Head', 'Heart', 'Body'][centerIndex] || 'Head';
  };
  
  // Get subtitle based on current set index
  const getSetSubtitle = () => {
    const types = ['Head', 'Heart', 'Body'];
    const setType = types[Math.floor(currentSetIndex / 3)];
    const setNumber = (currentSetIndex % 3) + 1;
    
    return `${setType} Set ${setNumber} of 3`;
  };
  
  return (
    <div className="foundation-experience">
      <h2 className="phase-title">Choose Your Foundation Stones</h2>
      
      <div className="foundation-layout">
        <div className="foundation-visualizer">
          {/* Using the exact specification from technical documentation */}
          <ExactFoundation selectedStones={placedStones} />
          <div className="progress-indicator">
            {currentSetIndex + 1} of 9 stone sets selected
          </div>
        </div>
        
        <div className="selection-area">
          <div className="section-divider"></div>
          
          <StoneSet
            stones={currentStones}
            onStoneSelect={handleStoneSelect}
            currentSetIndex={currentSetIndex}
            totalSets={flatStoneSets.length}
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
              disabled={currentSetIndex === flatStoneSets.length - 1}
            >
              Next Set
            </button>
            
            {/* Only show complete button when all sets have selections */}
            {stoneSelections.filter(selection => selection !== undefined).length === flatStoneSets.length && (
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