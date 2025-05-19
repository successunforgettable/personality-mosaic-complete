import { 
  personalityTypes, 
  personalityInfluences, 
  determinePersonalityType, 
  determineInfluence,
  foundationStoneSets,
  buildingBlockPairs
} from '../lib/personality';
import { FoundationStone, BuildingBlock } from '@/types/assessment';

// This file provides validation functions to test the personality type system
// and ensure it produces valid Enneagram type + wing combinations

// Valid Enneagram wing pairs (each type can only have wings from adjacent numbers)
const validWingPairs: Record<number, number[]> = {
  1: [9, 2],   // Type 1 can have 9 or 2 wing
  2: [1, 3],   // Type 2 can have 1 or 3 wing
  3: [2, 4],   // Type 3 can have 2 or 4 wing
  4: [3, 5],   // Type 4 can have 3 or 5 wing
  5: [4, 6],   // Type 5 can have 4 or 6 wing
  6: [5, 7],   // Type 6 can have 5 or 7 wing
  7: [6, 8],   // Type 7 can have 6 or 8 wing
  8: [7, 9],   // Type 8 can have 7 or 9 wing
  9: [8, 1]    // Type 9 can have 8 or 1 wing
};

// Test the wing determination algorithm
export function testWingDetermination() {
  const results = [];
  
  // Test for all primary types (1-9)
  for (let typeId = 1; typeId <= 9; typeId++) {
    const primaryType = personalityTypes.find(type => type.id === typeId);
    if (!primaryType) continue;
    
    // Create some random building block selections
    const selectedBlocks: BuildingBlock[] = [
      buildingBlockPairs[0].blockA,
      buildingBlockPairs[1].blockB,
      buildingBlockPairs[2].blockA,
      buildingBlockPairs[3].blockB
    ];
    
    // Get the influence (wing)
    const influence = determineInfluence(selectedBlocks, primaryType);
    
    // Check if the wing is valid for this primary type
    const isValidWing = validWingPairs[typeId].includes(influence.id);
    
    results.push({
      primaryType: `Type ${typeId} (${primaryType.name})`,
      wing: `Type ${influence.id} (${influence.name})`,
      isValid: isValidWing,
      validWings: validWingPairs[typeId].map((w: number) => `Type ${w}`)
    });
  }
  
  return results;
}

// Helper function to create foundation stone selections that should result in a specific type
function createStonesForType(targetTypeId: number): FoundationStone[] {
  const stones: FoundationStone[] = [];
  
  // Find stones with high scores for this type
  foundationStoneSets.forEach(set => {
    const targetStone = set.stones.reduce((best, stone) => {
      const score = stone.typeScore[targetTypeId.toString()] || 0;
      const bestScore = best ? best.typeScore[targetTypeId.toString()] || 0 : 0;
      return score > bestScore ? stone : best;
    }, null as FoundationStone | null);
    
    if (targetStone) {
      stones.push(targetStone);
    }
  });
  
  return stones;
}

// Test the complete personality type determination process
export function testCompletePersonalitySystem() {
  const results = [];
  
  // Test for each primary type (1-9)
  for (let typeId = 1; typeId <= 9; typeId++) {
    // Create foundation stones that should result in this type
    const selectedStones = createStonesForType(typeId);
    
    // Determine the primary personality type
    const primaryType = determinePersonalityType(selectedStones);
    
    // Create some building blocks
    const selectedBlocks: BuildingBlock[] = [
      buildingBlockPairs[0].blockA,
      buildingBlockPairs[1].blockB,
      buildingBlockPairs[2].blockA,
      buildingBlockPairs[3].blockB
    ];
    
    // Get the influence (wing) with the primary type constraint
    const influence = determineInfluence(selectedBlocks, primaryType);
    
    // Check if the wing is valid for this primary type
    const isValidWing = validWingPairs[primaryType.id].includes(influence.id);
    
    results.push({
      primaryType: `Type ${primaryType.id} (${primaryType.name})`,
      wing: `Type ${influence.id} (${influence.name})`,
      isValid: isValidWing,
      validWings: validWingPairs[primaryType.id].map((w: number) => `Type ${w}`)
    });
  }
  
  return results;
}

// Calculate percentage of valid results
export function getValidationStats(results: { isValid: boolean }[]) {
  const totalTests = results.length;
  const validResults = results.filter(r => r.isValid).length;
  const validPercentage = (validResults / totalTests) * 100;
  
  return {
    totalTests,
    validResults,
    validPercentage,
    allValid: validPercentage === 100
  };
}