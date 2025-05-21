import React from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import FoundationPhase from './Foundation/FoundationPhase';

/**
 * Foundation Stone Experience component - Phase 1 of the Personality Mosaic Assessment
 * This phase allows users to select foundation stones that form the base of their personality tower
 * 
 * Implementation based on tech_spec_v2.md - Section 3.2 and content_spec.md - Section 1.1
 */
const PhaseOne = () => {
  return <FoundationPhase />;
};

export default PhaseOne;