import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { FoundationStone } from '@/types/assessment';
import SimplePhaseOne from './Foundation/SimplePhaseOne';

type TransitionState = 'entering' | 'active' | 'exiting';

/**
 * Foundation Stone Experience component - Phase 1 of the Personality Mosaic Assessment
 * This phase allows users to select foundation stones that form the base of their personality tower
 */
const PhaseOne = () => {
  const { setPhase } = useAssessment();
  const [transitionState, setTransitionState] = useState<TransitionState>('entering');
  
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
      <SimplePhaseOne />
    </motion.div>
  );
};

export default PhaseOne;