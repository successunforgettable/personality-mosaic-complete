/**
 * Type declarations for FoundationExperience component
 */
import { FunctionComponent } from 'react';

interface FoundationExperienceProps {
  onComplete: (stoneSelections: number[]) => void;
}

declare const FoundationExperience: FunctionComponent<FoundationExperienceProps>;

export default FoundationExperience;