/**
 * Assessment Types
 * Contains all type definitions for the Personality Mosaic Assessment system
 */

// Foundation Stone type
export interface FoundationStone {
  id: number;
  name: string;
  description?: string;
  category: 'head' | 'heart' | 'body';
}

// Building Block type
export interface BuildingBlock {
  id: number;
  name: string;
  description?: string;
  category: 'head' | 'heart' | 'body';
  influence: 'integration' | 'disintegration' | 'neutral';
  pairId: number;
}

// Color Palette type
export interface ColorState {
  id: number;
  name: string;
  description: string;
  color: string;
  category: 'head' | 'heart' | 'body';
}

// Detail Element type
export interface DetailElement {
  id: number;
  name: string;
  description: string;
  category: 'head' | 'heart' | 'body';
  subtype: 'self-preservation' | 'social' | 'one-to-one';
}

// Assessment Phases
export enum AssessmentPhase {
  Welcome = 0,
  Foundation = 1,
  Building = 2,
  Color = 3,
  Detail = 4,
  Results = 5
}

// Distribution of attributes by center
export interface StateDistribution {
  head: number;
  heart: number;
  body: number;
}

// Assessment result type
export interface AssessmentResult {
  id: number;
  userId: string;
  completedAt: Date;
  foundationStones: FoundationStone[];
  buildingBlocks: BuildingBlock[];
  stateColors: ColorState[];
  detailElements: DetailElement[];
  primaryType: number;
  wing: number | null;
  integration: number | null;
  disintegration: number | null;
  stateDistribution: StateDistribution;
  dominantSubtype: 'self-preservation' | 'social' | 'one-to-one';
}