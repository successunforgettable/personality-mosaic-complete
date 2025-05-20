// Foundation Stones
export interface FoundationStone {
  id: number;
  name: string;
  baselines: string;
  image: string;
  category: 'Head' | 'Heart' | 'Body';
  typeScore: Record<string, number>;
  shapeVariant?: 'hexagon' | 'pentagon' | 'octagon';
  gradientColors?: {
    from: string;
    to: string;
  };
}

// Building Blocks
export interface BuildingBlock {
  id: number;
  name: string;
  description: string;
  image: string;
  pairId: number;
  position: 'A' | 'B';
  influenceScore: Record<string, number>;
}

// State Distribution
export interface StateDistribution {
  veryGood: number;
  good: number;
  average: number;
  belowAverage: number;
  destructive: number;
}

// Detail Elements
export interface DetailElement {
  id: number;
  name: string;
  icon: string;
}

// Container types for detail elements
export type Container = 'selfPreservation' | 'oneToOne' | 'social' | 'unassigned';

// Subtype Distribution
export interface SubtypeDistribution {
  selfPreservation: number;
  oneToOne: number;
  social: number;
}

// Personality Types
export type PersonalityType = {
  id: number;
  name: string;
  description: string;
  positiveTraits: string[];
  negativeTraits: string[];
};

// Personality Influence
export type PersonalityInfluence = {
  id: number;
  name: string;
  description: string;
}

// Personality Result
export interface PersonalityResult {
  type: PersonalityType;
  influence: PersonalityInfluence;
  stateDistribution: StateDistribution;
  subtypeDistribution: SubtypeDistribution;
}

// Assessment State
export interface AssessmentState {
  phase: number;
  foundationSet: number;
  selectedFoundationStones: FoundationStone[];
  selectedBuildingBlocks: BuildingBlock[];
  stateDistribution: StateDistribution;
  detailElements: {
    selfPreservation: DetailElement[];
    oneToOne: DetailElement[];
    social: DetailElement[];
    unassigned: DetailElement[];
  };
  result: PersonalityResult | null;
}

// Foundation Stone Sets
export interface FoundationStoneSet {
  id: number;
  stones: FoundationStone[];
}

// Building Block Pairs
export interface BuildingBlockPair {
  id: number;
  title: string;
  blockA: BuildingBlock;
  blockB: BuildingBlock;
}
