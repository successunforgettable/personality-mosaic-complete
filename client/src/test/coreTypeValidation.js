/**
 * Comprehensive Core Type Detection Validation
 * Tests all 9 personality types with characteristic patterns
 */

import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';

// Extract patterns directly from spec's Stone-to-Type Mapping Table
const CORE_TYPE_PATTERNS = {
  type1: {
    name: "Perfectionist", 
    foundationSelections: [2, 2, 2, 0, 0, 0, 2, 0, 2], // C (Body) | C (Anger) | C (Compliant) - HIGH confidence per spec line 2813
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    colorPaletteSelections: [
      {id: "blue", name: "Deep Blue", hex: "#2563eb", category: 0},
      {id: "navy", name: "Deep Navy", hex: "#1e40af", category: 1},
      {id: "gray", name: "Sophisticated Gray", hex: "#6b7280", category: 2}
    ],
    detailSelections: [
      {id: "sp-security", category: "sp"}, {id: "sp-stability", category: "sp"},
      {id: "sp-health", category: "sp"}, {id: "sp-routine", category: "sp"}
    ],
    expectedType: 1
  },

  type2: {
    name: "Helper",
    foundationSelections: [1, 1, 2, 1, 1, 1, 1, 1, 1], // B (Heart) | B (Shame) | C (Compliant) - MEDIUM confidence per spec line 2801
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "pink", name: "Warm Pink", hex: "#ec4899", category: 0},
      {id: "coral", name: "Living Coral", hex: "#f97316", category: 1},
      {id: "rose", name: "Soft Rose", hex: "#f43f5e", category: 2}
    ],
    detailSelections: [
      {id: "so-social", category: "so"}, {id: "so-community", category: "so"},
      {id: "so-belonging", category: "so"}, {id: "so-recognition", category: "so"}
    ],
    expectedType: 2
  },

  type3: {
    name: "Achiever",
    foundationSelections: [1, 1, 1, 2, 2, 2, 2, 2, 2], // B (Heart) | B (Shame) | B (Assertive) - HIGH confidence per spec line 2800
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "gold", name: "Bright Gold", hex: "#f59e0b", category: 0},
      {id: "amber", name: "Golden Amber", hex: "#d97706", category: 1},
      {id: "yellow", name: "Bright Yellow", hex: "#ca8a04", category: 2}
    ],
    detailSelections: [
      {id: "so-status", category: "so"}, {id: "so-recognition", category: "so"},
      {id: "so-influence", category: "so"}, {id: "sx-intensity", category: "sx"}
    ],
    expectedType: 3
  },

  type4: {
    name: "Individualist",
    foundationSelections: [1, 1, 0, 0, 1, 1, 0, 1, 0], // B (Heart) | B (Shame) | A (Withdrawn) - HIGH confidence per spec line 2799
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    colorPaletteSelections: [
      {id: "purple", name: "Deep Purple", hex: "#7c3aed", category: 0},
      {id: "indigo", name: "Rich Indigo", hex: "#4f46e5", category: 1},
      {id: "violet", name: "Soft Violet", hex: "#8b5cf6", category: 2}
    ],
    detailSelections: [
      {id: "sx-attraction", category: "sx"}, {id: "sx-intensity", category: "sx"},
      {id: "sx-connection", category: "sx"}, {id: "sp-comfort", category: "sp"}
    ],
    expectedType: 4
  },

  type5: {
    name: "Investigator",
    foundationSelections: [0, 0, 0, 0, 0, 0, 0, 0, 0], // A (Head) | A (Fear) | A (Withdrawn) - HIGH confidence per spec line 2787
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    colorPaletteSelections: [
      {id: "gray", name: "Sophisticated Gray", hex: "#6b7280", category: 0},
      {id: "slate", name: "Cool Slate", hex: "#475569", category: 1},
      {id: "charcoal", name: "Deep Charcoal", hex: "#374151", category: 2}
    ],
    detailSelections: [
      {id: "sp-security", category: "sp"}, {id: "sp-resources", category: "sp"},
      {id: "sp-stability", category: "sp"}, {id: "sp-routine", category: "sp"}
    ],
    expectedType: 5
  },

  type6: {
    name: "Loyalist", 
    foundationSelections: [0, 0, 2, 1, 0, 0, 1, 0, 1], // A (Head) | A (Fear) | C (Compliant) - HIGH confidence per spec line 2789
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "blue", name: "Deep Blue", hex: "#2563eb", category: 0},
      {id: "teal", name: "Calm Teal", hex: "#0d9488", category: 1},
      {id: "green", name: "Natural Green", hex: "#059669", category: 2}
    ],
    detailSelections: [
      {id: "so-belonging", category: "so"}, {id: "so-community", category: "so"},
      {id: "sp-security", category: "sp"}, {id: "sp-stability", category: "sp"}
    ],
    expectedType: 6
  },

  type7: {
    name: "Enthusiast",
    foundationSelections: [0, 0, 1, 2, 1, 1, 1, 1, 2], // A (Head) | A (Fear) | B (Assertive) - MEDIUM confidence per spec line 2788
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "orange", name: "Vibrant Orange", hex: "#ea580c", category: 0},
      {id: "coral", name: "Living Coral", hex: "#f97316", category: 1},
      {id: "lime", name: "Electric Lime", hex: "#84cc16", category: 2}
    ],
    detailSelections: [
      {id: "so-social", category: "so"}, {id: "so-networking", category: "so"},
      {id: "sx-intensity", category: "sx"}, {id: "so-influence", category: "so"}
    ],
    expectedType: 7
  },

  type8: {
    name: "Challenger",
    foundationSelections: [2, 2, 2, 2, 2, 2, 2, 2, 2], // Power, control, directness
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "red", name: "Bold Red", hex: "#dc2626", category: 0},
      {id: "crimson", name: "Deep Crimson", hex: "#b91c1c", category: 1},
      {id: "black", name: "Pure Black", hex: "#000000", category: 2}
    ],
    detailSelections: [
      {id: "sx-intensity", category: "sx"}, {id: "sx-attraction", category: "sx"},
      {id: "so-influence", category: "so"}, {id: "sp-energy", category: "sp"}
    ],
    expectedType: 8
  },

  type9: {
    name: "Peacemaker",
    foundationSelections: [1, 0, 2, 0, 1, 0, 0, 1, 1], // Peace and harmony focus - more distinct from helper pattern
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "green", name: "Natural Green", hex: "#059669", category: 0},
      {id: "sage", name: "Soft Sage", hex: "#84cc16", category: 1},
      {id: "beige", name: "Warm Beige", hex: "#d6d3d1", category: 2}
    ],
    detailSelections: [
      {id: "sp-comfort", category: "sp"}, {id: "sp-routine", category: "sp"},
      {id: "so-belonging", category: "so"}, {id: "so-community", category: "so"}
    ],
    expectedType: 9
  }
};

export function runCoreTypeValidation() {
  console.log("🧪 CORE TYPE DETECTION VALIDATION");
  console.log("=" .repeat(50));
  
  const results = [];
  let totalPassed = 0;
  
  for (const [typeKey, pattern] of Object.entries(CORE_TYPE_PATTERNS)) {
    console.log(`\nTesting ${pattern.name} (Type ${pattern.expectedType}):`);
    console.log(`Foundation: [${pattern.foundationSelections.join(',')}]`);
    
    try {
      const analysis = generatePersonalityAnalysis(pattern);
      const detected = analysis.primaryType.number;
      const confidence = analysis.primaryType.confidence;
      const isCorrect = detected === pattern.expectedType;
      
      if (isCorrect) {
        totalPassed++;
        console.log(`✅ PASS - Detected: Type ${detected} (${confidence}% confidence)`);
      } else {
        console.log(`❌ FAIL - Expected: Type ${pattern.expectedType}, Got: Type ${detected} (${confidence}% confidence)`);
        console.log(`   Top 3 scores: ${Object.entries(analysis.primaryType.scores)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([type, score]) => `${type}(${score})`)
          .join(', ')}`);
      }
      
      results.push({
        type: pattern.expectedType,
        name: pattern.name,
        detected,
        confidence,
        correct: isCorrect,
        scores: analysis.primaryType.scores
      });
      
    } catch (error) {
      console.log(`❌ ERROR - ${error.message}`);
      results.push({
        type: pattern.expectedType,
        name: pattern.name,
        detected: null,
        confidence: 0,
        correct: false,
        error: error.message
      });
    }
  }
  
  console.log("\n" + "=" .repeat(50));
  console.log(`📊 CORE TYPE VALIDATION SUMMARY`);
  console.log(`Success Rate: ${Math.round((totalPassed / 9) * 100)}%`);
  console.log(`Passed: ${totalPassed}/9 tests`);
  
  if (totalPassed === 9) {
    console.log("🎉 ALL CORE TYPES DETECTED CORRECTLY!");
  } else {
    console.log("\n🔧 Failed Tests:");
    results.filter(r => !r.correct).forEach(r => {
      console.log(`   Type ${r.type} (${r.name}): Expected ${r.type}, Got ${r.detected || 'ERROR'}`);
    });
  }
  
  return {
    totalTests: 9,
    passed: totalPassed,
    successRate: Math.round((totalPassed / 9) * 100),
    results,
    allPassed: totalPassed === 9
  };
}

// Export for use in other validation modules
export { CORE_TYPE_PATTERNS };