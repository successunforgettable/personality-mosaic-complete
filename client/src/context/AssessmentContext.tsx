import { createContext, useContext, useReducer, ReactNode } from 'react';
import { 
  AssessmentState, 
  FoundationStone, 
  BuildingBlock, 
  StateDistribution,
  DetailElement,
  Container,
  PersonalityResult 
} from '../types/assessment';
import { determinePersonalityType, determineInfluence } from '../lib/personality';

// Initial state
const initialState: AssessmentState = {
  phase: 1,
  foundationSet: 1,
  selectedFoundationStones: [],
  selectedBuildingBlocks: [],
  stateDistribution: {
    veryGood: 20,
    good: 30, 
    average: 30,
    belowAverage: 15,
    destructive: 5
  },
  detailElements: {
    selfPreservation: [],
    oneToOne: [],
    social: [],
    unassigned: [
      { id: 1, name: 'Self-reflection', icon: 'psychology' },
      { id: 2, name: 'Community', icon: 'groups' },
      { id: 3, name: 'Relationships', icon: 'favorite' },
      { id: 4, name: 'Learning', icon: 'school' },
      { id: 5, name: 'Wellness', icon: 'spa' },
      { id: 6, name: 'Global Impact', icon: 'public' },
      { id: 7, name: 'Achievement', icon: 'emoji_events' },
      { id: 8, name: 'Creativity', icon: 'palette' },
      { id: 9, name: 'Structure', icon: 'architecture' },
      { id: 10, name: 'Adventure', icon: 'explore' }
    ]
  },
  result: null
};

// Action types
type AssessmentAction =
  | { type: 'SET_PHASE'; payload: number }
  | { type: 'NEXT_FOUNDATION_SET' }
  | { type: 'SELECT_FOUNDATION_STONE'; payload: FoundationStone }
  | { type: 'SELECT_BUILDING_BLOCK'; payload: BuildingBlock }
  | { type: 'UPDATE_STATE_DISTRIBUTION'; payload: StateDistribution }
  | { type: 'MOVE_ELEMENT'; payload: { element: DetailElement; source: Container; destination: Container } }
  | { type: 'GENERATE_RESULT' }
  | { type: 'RESET_ASSESSMENT' };

// Reducer
function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };

    case 'NEXT_FOUNDATION_SET':
      if (state.foundationSet < 3) {
        return { ...state, foundationSet: state.foundationSet + 1 };
      }
      return { ...state, phase: 2 };

    case 'SELECT_FOUNDATION_STONE':
      return {
        ...state,
        selectedFoundationStones: [...state.selectedFoundationStones, action.payload]
      };

    case 'SELECT_BUILDING_BLOCK':
      return {
        ...state,
        selectedBuildingBlocks: [...state.selectedBuildingBlocks, action.payload]
      };

    case 'UPDATE_STATE_DISTRIBUTION':
      return {
        ...state,
        stateDistribution: action.payload
      };

    case 'MOVE_ELEMENT': {
      const { element, source, destination } = action.payload;
      
      // Create a copy of the detail elements state
      const detailElements = { ...state.detailElements };
      
      // Remove the element from the source container
      detailElements[source] = detailElements[source].filter(item => item.id !== element.id);
      
      // Add the element to the destination container
      detailElements[destination] = [...detailElements[destination], element];
      
      return {
        ...state,
        detailElements
      };
    }

    case 'GENERATE_RESULT': {
      // Calculate the personality type based on selected foundation stones
      const personalityType = determinePersonalityType(state.selectedFoundationStones);
      
      // Calculate the influence based on building blocks
      const influence = determineInfluence(state.selectedBuildingBlocks);
      
      // Calculate subtype distribution
      const subtypeDistribution = {
        selfPreservation: Math.round((state.detailElements.selfPreservation.length / 10) * 100),
        oneToOne: Math.round((state.detailElements.oneToOne.length / 10) * 100),
        social: Math.round((state.detailElements.social.length / 10) * 100)
      };
      
      const result: PersonalityResult = {
        type: personalityType,
        influence,
        stateDistribution: state.stateDistribution,
        subtypeDistribution
      };
      
      return {
        ...state,
        result,
        phase: 5 // Move to results phase
      };
    }

    case 'RESET_ASSESSMENT':
      return initialState;

    default:
      return state;
  }
}

// Create context
interface AssessmentContextType {
  state: AssessmentState;
  setPhase: (phase: number) => void;
  nextFoundationSet: () => void;
  selectFoundationStone: (stone: FoundationStone) => void;
  selectBuildingBlock: (block: BuildingBlock) => void;
  updateStateDistribution: (distribution: StateDistribution) => void;
  moveElement: (element: DetailElement, source: Container, destination: Container) => void;
  generateResult: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

// Provider component
export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const setPhase = (phase: number) => {
    dispatch({ type: 'SET_PHASE', payload: phase });
  };

  const nextFoundationSet = () => {
    dispatch({ type: 'NEXT_FOUNDATION_SET' });
  };

  const selectFoundationStone = (stone: FoundationStone) => {
    dispatch({ type: 'SELECT_FOUNDATION_STONE', payload: stone });
  };

  const selectBuildingBlock = (block: BuildingBlock) => {
    dispatch({ type: 'SELECT_BUILDING_BLOCK', payload: block });
  };

  const updateStateDistribution = (distribution: StateDistribution) => {
    dispatch({ type: 'UPDATE_STATE_DISTRIBUTION', payload: distribution });
  };

  const moveElement = (element: DetailElement, source: Container, destination: Container) => {
    dispatch({ type: 'MOVE_ELEMENT', payload: { element, source, destination } });
  };

  const generateResult = () => {
    dispatch({ type: 'GENERATE_RESULT' });
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        setPhase,
        nextFoundationSet,
        selectFoundationStone,
        selectBuildingBlock,
        updateStateDistribution,
        moveElement,
        generateResult,
        resetAssessment
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

// Hook for accessing the context
export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
