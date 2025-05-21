import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { FoundationStone } from '@/types/assessment';
import FoundationExperience from './Foundation/FoundationExperience';

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
    
    // Move to next phase after exit animation completes
    setTransitionState('exiting');
    
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