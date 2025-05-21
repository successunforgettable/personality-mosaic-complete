/**
 * Type declarations for BuildingBlockExperience component
 */
import { FunctionComponent } from 'react';

interface BuildingBlockExperienceProps {
  onComplete: (blockSelections: any[]) => void;
  foundationStones?: any[];
}

declare const BuildingBlockExperience: FunctionComponent<BuildingBlockExperienceProps>;

export default BuildingBlockExperience;