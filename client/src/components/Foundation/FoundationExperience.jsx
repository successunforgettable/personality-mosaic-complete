import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoneSet from './StoneSet';
import FoundationBase from './FoundationBase';
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
  // State for selected stones and animation
  const [selectedStones, setSelectedStones] = useState(initialSelections);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastSelectedStoneId, setLastSelectedStoneId] = useState(null);
  
  // Handle stone selection
  const handleStoneSelect = (stones) => {
    // Get the newly added stone (if any)
    const newStone = stones.find(stone => 
      !selectedStones.some(s => s.id === stone.id)
    );
    
    // Update state
    setSelectedStones(stones);
    
    // If there's a new stone added, trigger animation
    if (newStone) {
      setLastSelectedStoneId(newStone.id);
      setIsAnimating(true);
      
      // Reset animation flag after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Animation duration + small buffer
    }
  };
  
  // Check if selection is complete (all stone positions filled)
  const isSelectionComplete = () => {
    // For the new data structure, we need one stone from each category (0, 1, 2)
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
            selectedStones={selectedStones}
            onStoneSelect={handleStoneSelect}
            setIndex={setIndex}
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