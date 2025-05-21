import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoneSet from './StoneSet.jsx';
import FoundationBase from './FoundationBase.jsx';
import { STONE_SETS } from './stoneData.js';
import './FoundationExperience.css';

/**
 * FoundationExperience - Main component for the Foundation Stone phase (Phase 1)
 * Manages the complete foundation stone selection experience with animations
 * 
 * @param {Object} props
 * @param {Function} props.onComplete - Callback when foundation selection is complete
 * @param {Array} props.initialSelections - Optional initial selections (for resuming)
 * @param {number} props.setIndex - Stone set index to use (default: 0)
 */
const FoundationExperience = ({ 
  onComplete, 
  initialSelections = [],
  setIndex = 0 
}) => {
  // Set up the stones from the data
  const [stoneData, setStoneData] = useState([]);
  const [selectedStones, setSelectedStones] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastSelectedStoneId, setLastSelectedStoneId] = useState(null);
  
  // Initialize stone data from STONE_SETS
  useEffect(() => {
    // Create initial stone data structure from our sets
    if (STONE_SETS && STONE_SETS[setIndex]) {
      const stones = STONE_SETS[setIndex].map((content, index) => {
        const categoryMap = {
          0: 'head',
          1: 'heart',
          2: 'body'
        };
        
        // Parse name from the content (before first bullet)
        const name = content.split('•')[0].trim();
        
        return {
          id: `${setIndex}-${index}`,
          name,
          content,
          category: categoryMap[index] || 'unknown',
          selected: false,
          // If this stone is in initialSelections, mark it as selected
          ...(initialSelections.some(s => s.stoneIndex === index) && { selected: true })
        };
      });
      
      setStoneData(stones);
      
      // Also initialize selected stones from initialSelections if provided
      if (initialSelections && initialSelections.length > 0) {
        setSelectedStones(initialSelections);
      }
    }
  }, [setIndex, initialSelections]);
  
  // Handle stone selection
  const handleStoneSelect = (stoneIndex) => {
    // Update the stone's selected state in the stoneData array
    const updatedStoneData = stoneData.map((stone, idx) => {
      if (idx === stoneIndex) {
        return { ...stone, selected: !stone.selected };
      }
      return stone;
    });
    
    // Update stone data
    setStoneData(updatedStoneData);
    
    // Determine which stone was selected/deselected
    const selectedStone = updatedStoneData[stoneIndex];
    
    if (selectedStone.selected) {
      // Stone was selected - add it to selectedStones
      const newStone = {
        id: selectedStone.id,
        name: selectedStone.name,
        content: selectedStone.content,
        category: selectedStone.category,
        setIndex,
        stoneIndex
      };
      
      // Check if a stone for this category/position already exists
      const existingStoneIndex = selectedStones.findIndex(stone => 
        stone.stoneIndex === stoneIndex
      );
      
      if (existingStoneIndex >= 0) {
        // Replace existing stone
        const newSelectedStones = [...selectedStones];
        newSelectedStones[existingStoneIndex] = newStone;
        setSelectedStones(newSelectedStones);
      } else {
        // Add new stone
        setSelectedStones([...selectedStones, newStone]);
      }
      
      // Trigger animation
      setLastSelectedStoneId(selectedStone.id);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    } else {
      // Stone was deselected - remove it from selectedStones
      setSelectedStones(selectedStones.filter(stone => 
        stone.id !== selectedStone.id
      ));
    }
  };
  
  // Check if selection is complete (all stone positions filled)
  const isSelectionComplete = () => {
    // We need one stone from each category (0, 1, 2)
    return [0, 1, 2].every(stoneIndex => 
      selectedStones.some(stone => stone.stoneIndex === stoneIndex)
    );
  };
  
  // Handle completion
  const handleComplete = () => {
    if (isSelectionComplete() && onComplete) {
      onComplete(selectedStones);
    }
  };
  
  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <motion.div 
      className="foundation-experience"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="foundation-header" variants={itemVariants}>
        <h1 className="foundation-title">Foundation Stones</h1>
        <p className="foundation-subtitle">
          Select one stone from each center to establish the foundation of your personality profile
        </p>
      </motion.div>
      
      <div className="foundation-layout">
        {/* Stone selection area */}
        <motion.div 
          className="foundation-selection-area"
          variants={itemVariants}
        >
          <StoneSet 
            stones={stoneData}
            onStoneSelect={handleStoneSelect}
            currentSetIndex={setIndex}
            totalSets={STONE_SETS.length}
          />
        </motion.div>
        
        {/* Foundation visualization area */}
        <motion.div 
          className="foundation-visualization-area"
          variants={itemVariants}
        >
          <FoundationBase 
            selectedStones={selectedStones}
            isAnimating={isAnimating}
            lastSelectedStoneId={lastSelectedStoneId}
            setIndex={setIndex}
          />
        </motion.div>
      </div>
      
      {/* Action buttons */}
      <motion.div 
        className="foundation-actions"
        variants={itemVariants}
      >
        <AnimatePresence>
          {isSelectionComplete() && (
            <motion.button 
              className="btn btn-primary"
              onClick={handleComplete}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Complete Foundation
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default FoundationExperience;