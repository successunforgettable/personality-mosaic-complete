import React from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import SimpleFoundation from './SimpleFoundation';

/**
 * Foundation Stone Experience component - Phase 1 of the Personality Mosaic Assessment
 * This phase allows users to select foundation stones that form the base of their personality tower
 */
const PhaseOne = () => {
  const { setPhase } = useAssessment();
  
  const handleComplete = (selections: any) => {
    console.log("Foundation selections completed:", selections);
    setPhase(2);
  };
  
  return <SimpleFoundation onComplete={handleComplete} />;
};

export default PhaseOne;