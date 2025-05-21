import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BuildingBlockPair from './BuildingBlockPair';
import { BUILDING_BLOCK_PAIRS } from './BuildingBlockData';
import './BuildingBlockExperience.css';

const BuildingBlockExperience = ({ onComplete }) => {
  // State for current pair index
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  
  // State for selected blocks
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  
  // Track completed status
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Handle block selection
  const handleBlockSelect = (block, pairId) => {
    // Check if we already have a selection for this pair
    const existingSelectionIndex = selectedBlocks.findIndex(
      selection => selection.pairId === pairId
    );
    
    if (existingSelectionIndex >= 0) {
      // Replace existing selection
      const updatedSelections = [...selectedBlocks];
      updatedSelections[existingSelectionIndex] = { 
        block,
        pairId
      };
      setSelectedBlocks(updatedSelections);
    } else {
      // Add new selection
      setSelectedBlocks([...selectedBlocks, { 
        block,
        pairId
      }]);
    }
    
    // Wait a moment before advancing to next pair
    setTimeout(() => {
      if (currentPairIndex < BUILDING_BLOCK_PAIRS.length - 1) {
        setCurrentPairIndex(currentPairIndex + 1);
      } else {
        // Completed all pairs
        setIsCompleted(true);
        
        // Call complete callback
        if (onComplete) {
          setTimeout(() => {
            onComplete(selectedBlocks);
          }, 1000);
        }
      }
    }, 700);
  };
  
  // Get selected block ID for current pair
  const getSelectedBlockId = (pairId) => {
    const selection = selectedBlocks.find(s => s.pairId === pairId);
    return selection ? selection.block.id : null;
  };
  
  // Render all building block pairs
  return (
    <div className="building-block-experience">
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="building-blocks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="block-pairs-container"
          >
            <div className="progress-indicator">
              Pair {currentPairIndex + 1} of {BUILDING_BLOCK_PAIRS.length}
            </div>
            
            {BUILDING_BLOCK_PAIRS.map((pair, index) => (
              <div 
                key={pair.id}
                className={`pair-slide ${index === currentPairIndex ? 'active' : 
                  index < currentPairIndex ? 'previous' : 'next'}`}
              >
                <BuildingBlockPair
                  pair={pair}
                  selectedBlockId={getSelectedBlockId(pair.id)}
                  onSelectBlock={index === currentPairIndex ? handleBlockSelect : null}
                  animationDelay={0.2}
                />
              </div>
            ))}
            
            <div className="building-progress-dots">
              {BUILDING_BLOCK_PAIRS.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index === currentPairIndex ? 'active' : 
                    index < currentPairIndex ? 'completed' : ''}`}
                ></div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completion"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="completion-message"
          >
            <h3>Building Blocks Selected!</h3>
            <p>You've selected all your building blocks. Moving to the next phase...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuildingBlockExperience;