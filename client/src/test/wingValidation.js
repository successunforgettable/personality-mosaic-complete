/**
 * Wing Combinations Validation
 * Tests all 18 wing combinations (each type with both possible wings)
 */

import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';

const WING_PATTERNS = {
  // Type 1 wings (1w9 and 1w2) - Using proven Type 1 foundation from Section 1
  type1w9: {
    name: "Perfectionist with Peacemaker wing",
    foundationSelections: [0, 0, 2, 0, 0, 0, 2, 0, 2], // Exact Type 1 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 9
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedType: 1,
    expectedWing: 9
  },

  type1w2: {
    name: "Perfectionist with Helper wing",
    foundationSelections: [0, 0, 2, 0, 0, 0, 2, 0, 2], // Exact Type 1 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 2
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedType: 1,
    expectedWing: 2
  },

  // Type 2 wings (2w1 and 2w3) - Using proven Type 2 foundation from Section 1
  type2w1: {
    name: "Helper with Perfectionist wing",
    foundationSelections: [1, 1, 2, 1, 1, 1, 1, 1, 1], // Exact Type 2 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 1
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 2,
    expectedWing: 1
  },

  type2w3: {
    name: "Helper with Achiever wing",
    foundationSelections: [1, 1, 2, 1, 1, 1, 1, 1, 1], // Exact Type 2 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 3
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 2,
    expectedWing: 3
  },

  // Type 3 wings (3w2 and 3w4)
  type3w2: {
    name: "Achiever with Helper wing",
    foundationSelections: [2, 1, 1, 2, 2, 2, 2, 2, 2], // Exact Type 3 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 2 per spec algorithm
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 3,
    expectedWing: 2
  },

  type3w4: {
    name: "Achiever with Individualist wing",
    foundationSelections: [2, 1, 1, 2, 2, 2, 2, 2, 2], // Exact Type 3 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 4
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 3,
    expectedWing: 4
  },

  // Type 4 wings (4w3 and 4w5) - Using proven Type 4 foundation from Section 1
  type4w3: {
    name: "Individualist with Achiever wing",
    foundationSelections: [1, 1, 0, 0, 1, 1, 0, 1, 0], // Exact Type 4 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 3 per spec algorithm
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedType: 4,
    expectedWing: 3
  },

  type4w5: {
    name: "Individualist with Investigator wing",
    foundationSelections: [1, 1, 0, 0, 1, 1, 0, 1, 0], // Exact Type 4 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 5 per spec algorithm
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedType: 4,
    expectedWing: 5
  },

  // Type 5 wings (5w4 and 5w6) - Using proven Type 5 foundation from Section 1
  type5w4: {
    name: "Investigator with Individualist wing",
    foundationSelections: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Exact Type 5 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 4 per spec algorithm
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedType: 5,
    expectedWing: 4
  },

  type5w6: {
    name: "Investigator with Loyalist wing",
    foundationSelections: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Exact Type 5 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 6 per spec algorithm
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    expectedType: 5,
    expectedWing: 6
  },

  // Type 6 wings (6w5 and 6w7)
  type6w5: {
    name: "Loyalist with Investigator wing", 
    foundationSelections: [1, 0, 2, 1, 0, 0, 1, 0, 1], // Exact Type 6 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 5 per spec algorithm
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 6,
    expectedWing: 5
  },

  type6w7: {
    name: "Loyalist with Enthusiast wing",
    foundationSelections: [1, 0, 2, 1, 0, 0, 1, 0, 1], // Exact Type 6 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 7 per spec algorithm
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 6,
    expectedWing: 7
  },

  // Type 7 wings (7w6 and 7w8) - Using proven Type 7 foundation from Section 1
  type7w6: {
    name: "Enthusiast with Loyalist wing",
    foundationSelections: [2, 1, 1, 2, 1, 1, 1, 1, 2], // Exact Type 7 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 6 per spec algorithm
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 7,
    expectedWing: 6
  },

  type7w8: {
    name: "Enthusiast with Challenger wing",
    foundationSelections: [2, 1, 1, 2, 1, 1, 1, 1, 2], // Exact Type 7 pattern from Section 1
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 8 per spec algorithm
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 7,
    expectedWing: 8
  },

  // Type 8 wings (8w7 and 8w9)
  type8w7: {
    name: "Challenger with Enthusiast wing",
    foundationSelections: [2, 2, 1, 2, 2, 1, 1, 2, 2], // Challenger with enthusiastic elements
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Wing 7 influence
      {id: "b2-right", title: "Group Focus"}, // Wing 7 influence
      {id: "b3-right", title: "Big Picture"}, // Wing 7 influence
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 8,
    expectedWing: 7
  },

  type8w9: {
    name: "Challenger with Peacemaker wing",
    foundationSelections: [2, 2, 2, 1, 2, 2, 0, 2, 1], // Challenger with peaceful elements
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-right", title: "Group Focus"}, // Wing 9 influence
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-left", title: "Steady Pace"}, // Wing 9 influence
      {id: "b5-right", title: "Practical"}
    ],
    expectedType: 8,
    expectedWing: 9
  },

  // Type 9 wings (9w8 and 9w1)
  type9w8: {
    name: "Peacemaker with Challenger wing",
    foundationSelections: [1, 0, 2, 2, 1, 0, 2, 1, 2], // Peaceful with challenger elements
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Wing 8 influence
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"}, // Wing 8 influence
      {id: "b4-right", title: "Dynamic Pace"}, // Wing 8 influence
      {id: "b5-right", title: "Practical"} // Wing 8 influence
    ],
    expectedType: 9,
    expectedWing: 8
  },

  type9w1: {
    name: "Peacemaker with Perfectionist wing",
    foundationSelections: [0, 0, 2, 0, 0, 0, 0, 0, 1], // Peaceful with systematic elements
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Wing 1 influence
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Oriented"}, // Wing 1 influence
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"} // Wing 1 influence
    ],
    expectedType: 9,
    expectedWing: 1
  }
};

export function runWingValidation() {
  console.log("🧪 WING COMBINATIONS VALIDATION");
  console.log("=" .repeat(50));
  
  const results = [];
  let totalPassed = 0;
  let typeCorrect = 0;
  let wingCorrect = 0;
  
  for (const [patternKey, pattern] of Object.entries(WING_PATTERNS)) {
    console.log(`\nTesting ${pattern.name}:`);
    console.log(`Expected: Type ${pattern.expectedType}w${pattern.expectedWing}`);
    
    try {
      const analysis = generatePersonalityAnalysis({
        foundationSelections: pattern.foundationSelections,
        buildingBlockSelections: pattern.buildingBlockSelections,
        colorPaletteSelections: [
          {id: "blue", name: "Deep Blue", hex: "#2563eb", category: 0},
          {id: "green", name: "Natural Green", hex: "#059669", category: 1},
          {id: "gray", name: "Sophisticated Gray", hex: "#6b7280", category: 2}
        ],
        detailSelections: [
          {id: "sp-security", category: "sp"}, {id: "sp-stability", category: "sp"}
        ]
      });
      
      const detectedType = analysis.primaryType.number;
      const detectedWing = analysis.influence.wing;
      const confidence = analysis.primaryType.confidence;
      
      const typeMatch = detectedType === pattern.expectedType;
      const wingMatch = detectedWing === pattern.expectedWing;
      const bothCorrect = typeMatch && wingMatch;
      
      if (typeMatch) typeCorrect++;
      if (wingMatch) wingCorrect++;
      if (bothCorrect) totalPassed++;
      
      const status = bothCorrect ? "✅ PASS" : 
                   typeMatch ? "⚠️ PARTIAL" : "❌ FAIL";
      
      console.log(`${status} - Detected: Type ${detectedType}w${detectedWing} (${confidence}% confidence)`);
      
      if (!bothCorrect) {
        if (!typeMatch) console.log(`   Type Error: Expected ${pattern.expectedType}, Got ${detectedType}`);
        if (!wingMatch) console.log(`   Wing Error: Expected ${pattern.expectedWing}, Got ${detectedWing}`);
      }
      
      results.push({
        pattern: patternKey,
        name: pattern.name,
        expectedType: pattern.expectedType,
        expectedWing: pattern.expectedWing,
        detectedType,
        detectedWing,
        confidence,
        typeCorrect: typeMatch,
        wingCorrect: wingMatch,
        bothCorrect
      });
      
    } catch (error) {
      console.log(`❌ ERROR - ${error.message}`);
      results.push({
        pattern: patternKey,
        name: pattern.name,
        expectedType: pattern.expectedType,
        expectedWing: pattern.expectedWing,
        detectedType: null,
        detectedWing: null,
        confidence: 0,
        typeCorrect: false,
        wingCorrect: false,
        bothCorrect: false,
        error: error.message
      });
    }
  }
  
  console.log("\n" + "=" .repeat(50));
  console.log(`📊 WING COMBINATIONS VALIDATION SUMMARY`);
  console.log(`Overall Success Rate: ${Math.round((totalPassed / 18) * 100)}%`);
  console.log(`Complete Matches: ${totalPassed}/18`);
  console.log(`Type Detection: ${typeCorrect}/18 (${Math.round((typeCorrect / 18) * 100)}%)`);
  console.log(`Wing Detection: ${wingCorrect}/18 (${Math.round((wingCorrect / 18) * 100)}%)`);
  
  if (totalPassed === 18) {
    console.log("🎉 ALL WING COMBINATIONS DETECTED CORRECTLY!");
  } else {
    console.log("\n🔧 Issues Found:");
    results.filter(r => !r.bothCorrect).forEach(r => {
      if (r.error) {
        console.log(`   ${r.pattern}: ERROR - ${r.error}`);
      } else {
        const issues = [];
        if (!r.typeCorrect) issues.push(`Type: expected ${r.expectedType}, got ${r.detectedType}`);
        if (!r.wingCorrect) issues.push(`Wing: expected ${r.expectedWing}, got ${r.detectedWing}`);
        console.log(`   ${r.pattern}: ${issues.join(', ')}`);
      }
    });
  }
  
  return {
    totalTests: 18,
    passed: totalPassed,
    typeAccuracy: Math.round((typeCorrect / 18) * 100),
    wingAccuracy: Math.round((wingCorrect / 18) * 100),
    overallSuccessRate: Math.round((totalPassed / 18) * 100),
    results,
    allPassed: totalPassed === 18
  };
}

export { WING_PATTERNS };