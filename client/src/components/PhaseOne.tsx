import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { FoundationStone } from '@/types/assessment';
import FoundationExperience from './Foundation/FoundationExperience';
import { STONE_SETS, STONE_COLORS } from './Foundation/stoneData';

type TransitionState = 'entering' | 'active' | 'exiting';

/**
 * Foundation Stone Experience component - Phase 1 of the Personality Mosaic Assessment
 * This phase allows users to select foundation stones that form the base of their personality tower
 */
const PhaseOne = () => {
  const { state, selectFoundationStone, setPhase } = useAssessment();
  const [transitionState, setTransitionState] = useState<TransitionState>('entering');
  
  // Handle completion of foundation stone selection
  const handleFoundationComplete = (stoneSelections: number[]) => {
    console.log("Foundation selections completed:", stoneSelections);
    
    // Save selections to assessment context - one at a time
    stoneSelections.forEach((stoneIndex, setIndex) => {
      // Get the content from stone data
      const stoneContent = STONE_SETS[setIndex][stoneIndex];
      
      // Get the appropriate color for this set
      const centerIndex = Math.floor(setIndex / 3); // 0: Head, 1: Heart, 2: Body
      const colorSet = STONE_COLORS[centerIndex];
      
      // Generate gradient colors
      const gradientColors = {
        from: stoneIndex === 0 ? colorSet.light : 
              stoneIndex === 1 ? colorSet.primary : 
              colorSet.primary,
        to: stoneIndex === 0 ? colorSet.primary : 
            stoneIndex === 1 ? colorSet.primary : 
            colorSet.dark
      };
      
      // Create a foundation stone object with the selected data
      const stone: FoundationStone = {
        id: setIndex * 3 + stoneIndex, // Generate a unique ID
        name: stoneContent[0], // Use the first trait as name
        baselines: stoneContent.join(' • '), // Join traits with bullet points
        image: '', // No image required for this implementation
        category: setIndex < 3 ? 'Head' : 
                 setIndex < 6 ? 'Heart' : 
                 'Body',
        typeScore: {}, // Empty type score
        gradientColors: gradientColors,
        shapeVariant: 'hexagon'
      };
      
      // Send to context
      selectFoundationStone(stone);
    });
    
    // Track time spent in analytics
    console.log("[Analytics] foundation_phase_completed:", {
      time_spent: Date.now() - startTime
    });
    
    // Prepare to exit
    setTransitionState('exiting');
    
    // Move to next phase after exit animation completes
    setTimeout(() => {
      setPhase(2);
    }, 500);
  };
  
  // Track time spent for analytics
  const [startTime] = useState(Date.now());
  
  // Set active state after enter animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionState('active');
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="phase-container"
    >
      <FoundationExperience onComplete={handleFoundationComplete} />
    </motion.div>
  );
};

export default PhaseOne;