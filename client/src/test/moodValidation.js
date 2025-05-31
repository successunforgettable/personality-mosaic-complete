/**
 * Section 3: Mood States Determination Validation
 * Tests the exact specification algorithm from section 4.6
 */

import { determineMoodPatterns } from '../lib/personalityAnalysis.js';

// Test patterns using exact specification algorithm and validated foundations from Sections 1-2
const MOOD_TEST_PATTERNS = {
  type1: {
    name: "Reformer Mood States",
    primaryType: 1,
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Wing selection (not used for mood)
      {id: "b2-right", title: "Group Focus"}, // Influence strength (not used for mood)
      {id: "b3-left", title: "Detail Focus"}, // 3rd block: left=0=strong good mood
      {id: "b4-right", title: "Dynamic Pace"}, // 4th block: right=1=moderate bad mood
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedGoodMoodType: 7, // Per spec: Type 1 → good mood = Type 7
    expectedBadMoodType: 4,  // Per spec: Type 1 → bad mood = Type 4
    expectedGoodMoodStrength: 'strong',    // 3rd block left = 0 = strong
    expectedBadMoodStrength: 'moderate'    // 4th block right = 1 = moderate
  },

  type2: {
    name: "Helper Mood States", 
    primaryType: 2,
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-right", title: "Big Picture"}, // 3rd block: right=1=moderate good mood
      {id: "b4-left", title: "Steady Pace"},  // 4th block: left=0=strong bad mood
      {id: "b5-right", title: "Practical"}
    ],
    expectedGoodMoodType: 4, // Per spec: Type 2 → good mood = Type 4
    expectedBadMoodType: 8,  // Per spec: Type 2 → bad mood = Type 8
    expectedGoodMoodStrength: 'moderate',  // 3rd block right = 1 = moderate
    expectedBadMoodStrength: 'strong'     // 4th block left = 0 = strong
  },

  type3: {
    name: "Achiever Mood States",
    primaryType: 3,
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Focus"}, // 3rd block: left=0=strong good mood
      {id: "b4-left", title: "Steady Pace"},  // 4th block: left=0=strong bad mood
      {id: "b5-right", title: "Practical"}
    ],
    expectedGoodMoodType: 6, // Per spec: Type 3 → good mood = Type 6
    expectedBadMoodType: 9,  // Per spec: Type 3 → bad mood = Type 9
    expectedGoodMoodStrength: 'strong',   // 3rd block left = 0 = strong
    expectedBadMoodStrength: 'strong'    // 4th block left = 0 = strong
  },

  type4: {
    name: "Individualist Mood States",
    primaryType: 4,
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-right", title: "Big Picture"}, // 3rd block: right=1=moderate good mood
      {id: "b4-right", title: "Dynamic Pace"}, // 4th block: right=1=moderate bad mood
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedGoodMoodType: 1, // Per spec: Type 4 → good mood = Type 1
    expectedBadMoodType: 2,  // Per spec: Type 4 → bad mood = Type 2
    expectedGoodMoodStrength: 'moderate', // 3rd block right = 1 = moderate
    expectedBadMoodStrength: 'moderate'  // 4th block right = 1 = moderate
  },

  type5: {
    name: "Investigator Mood States",
    primaryType: 5,
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Focus"}, // 3rd block: left=0=strong good mood
      {id: "b4-right", title: "Dynamic Pace"}, // 4th block: right=1=moderate bad mood
      {id: "b5-right", title: "Practical"}
    ],
    expectedGoodMoodType: 8, // Per spec: Type 5 → good mood = Type 8
    expectedBadMoodType: 7,  // Per spec: Type 5 → bad mood = Type 7
    expectedGoodMoodStrength: 'strong',   // 3rd block left = 0 = strong
    expectedBadMoodStrength: 'moderate'  // 4th block right = 1 = moderate
  },

  type6: {
    name: "Sentinel Mood States",
    primaryType: 6,
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-right", title: "Big Picture"}, // 3rd block: right=1=moderate good mood
      {id: "b4-left", title: "Steady Pace"},  // 4th block: left=0=strong bad mood
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedGoodMoodType: 9, // Per spec: Type 6 → good mood = Type 9
    expectedBadMoodType: 3,  // Per spec: Type 6 → bad mood = Type 3
    expectedGoodMoodStrength: 'moderate', // 3rd block right = 1 = moderate
    expectedBadMoodStrength: 'strong'    // 4th block left = 0 = strong
  },

  type7: {
    name: "Enthusiast Mood States",
    primaryType: 7,
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Focus"}, // 3rd block: left=0=strong good mood
      {id: "b4-left", title: "Steady Pace"},  // 4th block: left=0=strong bad mood
      {id: "b5-right", title: "Practical"}
    ],
    expectedGoodMoodType: 5, // Per spec: Type 7 → good mood = Type 5
    expectedBadMoodType: 1,  // Per spec: Type 7 → bad mood = Type 1
    expectedGoodMoodStrength: 'strong',   // 3rd block left = 0 = strong
    expectedBadMoodStrength: 'strong'    // 4th block left = 0 = strong
  },

  type8: {
    name: "Challenger Mood States",
    primaryType: 8,
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-right", title: "Big Picture"}, // 3rd block: right=1=moderate good mood
      {id: "b4-right", title: "Dynamic Pace"}, // 4th block: right=1=moderate bad mood
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedGoodMoodType: 2, // Per spec: Type 8 → good mood = Type 2
    expectedBadMoodType: 5,  // Per spec: Type 8 → bad mood = Type 5
    expectedGoodMoodStrength: 'moderate', // 3rd block right = 1 = moderate
    expectedBadMoodStrength: 'moderate'  // 4th block right = 1 = moderate
  },

  type9: {
    name: "Peacemaker Mood States",
    primaryType: 9,
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Focus"}, // 3rd block: left=0=strong good mood
      {id: "b4-right", title: "Dynamic Pace"}, // 4th block: right=1=moderate bad mood
      {id: "b5-right", title: "Practical"}
    ],
    expectedGoodMoodType: 3, // Per spec: Type 9 → good mood = Type 3
    expectedBadMoodType: 6,  // Per spec: Type 9 → bad mood = Type 6
    expectedGoodMoodStrength: 'strong',   // 3rd block left = 0 = strong
    expectedBadMoodStrength: 'moderate'  // 4th block right = 1 = moderate
  }
};

export function runMoodValidation() {
  console.log("🧪 MOOD STATES DETERMINATION VALIDATION");
  console.log("=".repeat(50));
  
  const results = [];
  let passCount = 0;

  Object.entries(MOOD_TEST_PATTERNS).forEach(([typeKey, pattern]) => {
    console.log(`\nTesting ${pattern.name}:`);
    console.log(`Blocks: [${pattern.buildingBlockSelections.slice(2, 4).map(b => b.id.includes('left') ? 'L' : 'R').join(', ')}] (3rd, 4th blocks)`);
    
    try {
      const result = determineMoodPatterns(pattern.primaryType, pattern.buildingBlockSelections);
      
      if (!result) {
        console.log(`❌ FAIL - No mood analysis returned`);
        results.push({ type: typeKey, passed: false, error: 'No result' });
        return;
      }

      const goodMoodMatch = result.goodMood?.type === pattern.expectedGoodMoodType;
      const badMoodMatch = result.badMood?.type === pattern.expectedBadMoodType;
      const goodStrengthMatch = result.goodMood?.strength === pattern.expectedGoodMoodStrength;
      const badStrengthMatch = result.badMood?.strength === pattern.expectedBadMoodStrength;

      const allMatch = goodMoodMatch && badMoodMatch && goodStrengthMatch && badStrengthMatch;

      if (allMatch) {
        console.log(`✅ PASS - Good mood: Type ${result.goodMood.type} (${result.goodMood.strength}), Bad mood: Type ${result.badMood.type} (${result.badMood.strength})`);
        passCount++;
        results.push({ type: typeKey, passed: true });
      } else {
        console.log(`❌ FAIL - Expected good: ${pattern.expectedGoodMoodType} (${pattern.expectedGoodMoodStrength}), bad: ${pattern.expectedBadMoodType} (${pattern.expectedBadMoodStrength})`);
        console.log(`   Got good: ${result.goodMood?.type} (${result.goodMood?.strength}), bad: ${result.badMood?.type} (${result.badMood?.strength})`);
        results.push({ type: typeKey, passed: false, expected: pattern, actual: result });
      }
    } catch (error) {
      console.log(`❌ FAIL - Error: ${error.message}`);
      results.push({ type: typeKey, passed: false, error: error.message });
    }
  });

  console.log("\n" + "=".repeat(50));
  console.log("📊 MOOD STATES VALIDATION SUMMARY");
  const successRate = Math.round((passCount / Object.keys(MOOD_TEST_PATTERNS).length) * 100);
  console.log(`Success Rate: ${successRate}%`);
  console.log(`Passed: ${passCount}/${Object.keys(MOOD_TEST_PATTERNS).length} tests`);

  if (passCount === Object.keys(MOOD_TEST_PATTERNS).length) {
    console.log("🎉 ALL MOOD STATES DETECTED CORRECTLY!");
  } else {
    console.log("\n🔧 Failed Tests:");
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   ${r.type}: ${r.error || 'Mapping mismatch'}`);
    });
  }

  return results;
}