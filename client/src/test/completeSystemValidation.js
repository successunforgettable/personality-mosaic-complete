/**
 * Complete System Integration Test - All Five Sections Working Together
 * Tests the complete personality analysis pipeline according to specification
 */

import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';

// Complete assessment data following the exact specification flow
const COMPLETE_ASSESSMENT_PATTERNS = {
  type1Pattern: {
    name: "Complete Type 1 Assessment Pattern",
    // Phase 1: Foundation Stones (Section 1)
    foundationSelections: [2, 2, 2, 0, 0, 0, 2, 0, 2], // Strong Type 1 pattern
    
    // Phase 2: Building Blocks (Section 2 & 3)
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"}, // Left = wing 9
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},   // 3rd block = good mood (Type 7)
      {id: "b4-right", title: "Dynamic Pace"},      // 4th block = bad mood (Type 4)
      {id: "b5-left", title: "Theoretical"}
    ],
    
    // Phase 3: Color Palette (Section 4)
    colorPaletteSelections: [
      {id: "green", name: "Fresh Green", category: 0}, // Healthy
      {id: "blue", name: "Clear Blue", category: 0},   // Healthy
      {id: "yellow", name: "Bright Yellow", category: 0}, // Healthy
      {id: "orange", name: "Warm Orange", category: 1}, // Average
      {id: "amber", name: "Golden Amber", category: 1}, // Average
      {id: "red", name: "Deep Red", category: 2},       // Unhealthy
    ],
    
    // Phase 4: Detail Elements (Section 5)
    detailSelections: [
      {id: "sp-security-1", category: "sp"},
      {id: "sp-stability-2", category: "sp"},
      {id: "sp-routine-3", category: "sp"},
      {id: "sp-health-4", category: "sp"},
      {id: "sp-resources-5", category: "sp"}, // 5 SP tokens (50%)
      {id: "so-community-1", category: "so"},
      {id: "so-belonging-2", category: "so"},
      {id: "so-recognition-3", category: "so"}, // 3 SO tokens (30%)
      {id: "sx-intensity-1", category: "sx"},
      {id: "sx-connection-2", category: "sx"} // 2 SX tokens (20%)
    ],
    
    expectedResults: {
      primaryType: 1,
      wing: 9,
      goodMoodType: 7,
      badMoodType: 4,
      dominantSubtype: 'sp',
      stateDistribution: { healthy: 50, average: 33, unhealthy: 17 }
    }
  },

  type6Pattern: {
    name: "Complete Type 6 Assessment Pattern", 
    // Phase 1: Foundation Stones (Section 1)
    foundationSelections: [0, 0, 2, 1, 0, 0, 1, 0, 1], // Strong Type 6 pattern
    
    // Phase 2: Building Blocks (Section 2 & 3)
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 7
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},       // 3rd block = good mood (Type 9)
      {id: "b4-left", title: "Steady Pace"},        // 4th block = bad mood (Type 3)
      {id: "b5-right", title: "Practical"}
    ],
    
    // Phase 3: Color Palette (Section 4)
    colorPaletteSelections: [
      {id: "green", name: "Fresh Green", category: 0}, // Healthy
      {id: "blue", name: "Clear Blue", category: 0},   // Healthy
      {id: "orange", name: "Warm Orange", category: 1}, // Average
      {id: "amber", name: "Golden Amber", category: 1}, // Average
      {id: "purple", name: "Deep Purple", category: 1}, // Average
      {id: "gray", name: "Cool Gray", category: 1},     // Average
      {id: "red", name: "Deep Red", category: 2},       // Unhealthy
      {id: "black", name: "Deep Black", category: 2}    // Unhealthy
    ],
    
    // Phase 4: Detail Elements (Section 5)
    detailSelections: [
      {id: "so-community-1", category: "so"},
      {id: "so-belonging-2", category: "so"},
      {id: "so-recognition-3", category: "so"},
      {id: "so-group-4", category: "so"},
      {id: "so-social-5", category: "so"},
      {id: "so-connection-6", category: "so"}, // 6 SO tokens (60%)
      {id: "sx-intensity-1", category: "sx"},
      {id: "sx-connection-2", category: "sx"}, // 2 SX tokens (20%)
      {id: "sp-security-1", category: "sp"},
      {id: "sp-stability-2", category: "sp"}   // 2 SP tokens (20%)
    ],
    
    expectedResults: {
      primaryType: 6,
      wing: 7,
      goodMoodType: 9,
      badMoodType: 3,
      dominantSubtype: 'so',
      stateDistribution: { healthy: 25, average: 50, unhealthy: 25 }
    }
  },

  type4Pattern: {
    name: "Complete Type 4 Assessment Pattern",
    // Phase 1: Foundation Stones (Section 1)
    foundationSelections: [1, 1, 0, 0, 1, 1, 0, 1, 0], // Strong Type 4 pattern
    
    // Phase 2: Building Blocks (Section 2 & 3)
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"}, // Right = wing 5
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},    // 3rd block = good mood (Type 1)
      {id: "b4-right", title: "Dynamic Pace"},       // 4th block = bad mood (Type 2)
      {id: "b5-left", title: "Theoretical"}
    ],
    
    // Phase 3: Color Palette (Section 4)
    colorPaletteSelections: [
      {id: "green", name: "Fresh Green", category: 0}, // Healthy
      {id: "orange", name: "Warm Orange", category: 1}, // Average
      {id: "amber", name: "Golden Amber", category: 1}, // Average
      {id: "purple", name: "Deep Purple", category: 1}, // Average
      {id: "red", name: "Deep Red", category: 2},       // Unhealthy
      {id: "black", name: "Deep Black", category: 2},   // Unhealthy
      {id: "gray", name: "Dark Gray", category: 2}      // Unhealthy
    ],
    
    // Phase 4: Detail Elements (Section 5)
    detailSelections: [
      {id: "sx-intensity-1", category: "sx"},
      {id: "sx-connection-2", category: "sx"},
      {id: "sx-passion-3", category: "sx"},
      {id: "sx-depth-4", category: "sx"},
      {id: "sx-intimacy-5", category: "sx"}, // 5 SX tokens (50%)
      {id: "so-community-1", category: "so"},
      {id: "so-belonging-2", category: "so"},
      {id: "so-recognition-3", category: "so"}, // 3 SO tokens (30%)
      {id: "sp-security-1", category: "sp"},
      {id: "sp-stability-2", category: "sp"}    // 2 SP tokens (20%)
    ],
    
    expectedResults: {
      primaryType: 4,
      wing: 5,
      goodMoodType: 1,
      badMoodType: 2,
      dominantSubtype: 'sx',
      stateDistribution: { healthy: 14, average: 43, unhealthy: 43 }
    }
  }
};

export function runCompleteSystemValidation() {
  console.log('🔍 COMPLETE SYSTEM INTEGRATION VALIDATION');
  console.log('Testing all 5 sections working together in the exact specification flow');
  console.log('================================================================');

  let totalTests = 0;
  let passedTests = 0;
  const failedTests = [];

  Object.entries(COMPLETE_ASSESSMENT_PATTERNS).forEach(([testKey, pattern]) => {
    console.log(`\n🧪 Testing ${pattern.name}:`);
    console.log('================================================================');
    
    // Run complete personality analysis
    const result = generatePersonalityAnalysis({
      foundationSelections: pattern.foundationSelections,
      buildingBlockSelections: pattern.buildingBlockSelections,
      colorPaletteSelections: pattern.colorPaletteSelections,
      detailSelections: pattern.detailSelections
    });
    
    totalTests++;
    let testPassed = true;
    const errors = [];
    
    // Section 1: Core Type Detection
    console.log(`\n📍 Section 1 - Core Type Detection:`);
    if (result.primaryType.number === pattern.expectedResults.primaryType) {
      console.log(`✅ Core Type: ${result.primaryType.name} (Type ${result.primaryType.number}) - ${result.primaryType.confidence}% confidence`);
    } else {
      console.log(`❌ Core Type: Expected Type ${pattern.expectedResults.primaryType}, got Type ${result.primaryType.number}`);
      testPassed = false;
      errors.push('Core type mismatch');
    }
    
    // Section 2: Wing/Influence Detection
    console.log(`\n📍 Section 2 - Wing/Influence Detection:`);
    if (result.influence && result.influence.influenceNumber === pattern.expectedResults.wing) {
      console.log(`✅ Wing/Influence: ${result.influence.fullType} (${result.influence.strength} influence)`);
    } else {
      console.log(`❌ Wing: Expected wing ${pattern.expectedResults.wing}, got ${result.influence?.influenceNumber || 'none'}`);
      testPassed = false;
      errors.push('Wing detection mismatch');
    }
    
    // Section 3: Mood States
    console.log(`\n📍 Section 3 - Mood States Determination:`);
    const goodMoodMatch = result.moodPatterns?.goodMood.type === pattern.expectedResults.goodMoodType;
    const badMoodMatch = result.moodPatterns?.badMood.type === pattern.expectedResults.badMoodType;
    
    if (goodMoodMatch && badMoodMatch) {
      console.log(`✅ Good Mood: Type ${result.moodPatterns.goodMood.type} (${result.moodPatterns.goodMood.strength})`);
      console.log(`✅ Bad Mood: Type ${result.moodPatterns.badMood.type} (${result.moodPatterns.badMood.strength})`);
    } else {
      if (!goodMoodMatch) {
        console.log(`❌ Good Mood: Expected Type ${pattern.expectedResults.goodMoodType}, got Type ${result.moodPatterns?.goodMood.type}`);
        errors.push('Good mood type mismatch');
      }
      if (!badMoodMatch) {
        console.log(`❌ Bad Mood: Expected Type ${pattern.expectedResults.badMoodType}, got Type ${result.moodPatterns?.badMood.type}`);
        errors.push('Bad mood type mismatch');
      }
      testPassed = false;
    }
    
    // Section 4: Heart Activation/State Distribution
    console.log(`\n📍 Section 4 - Heart Activation/State Distribution:`);
    const stateMatch = 
      Math.abs(result.heartActivation.stateDistribution.healthy - pattern.expectedResults.stateDistribution.healthy) <= 2 &&
      Math.abs(result.heartActivation.stateDistribution.average - pattern.expectedResults.stateDistribution.average) <= 2 &&
      Math.abs(result.heartActivation.stateDistribution.unhealthy - pattern.expectedResults.stateDistribution.unhealthy) <= 2;
    
    if (stateMatch) {
      console.log(`✅ State Distribution: H:${result.heartActivation.stateDistribution.healthy}%, A:${result.heartActivation.stateDistribution.average}%, U:${result.heartActivation.stateDistribution.unhealthy}%`);
      console.log(`✅ Primary State: ${result.heartActivation.stateAnalysis.primary}, Secondary: ${result.heartActivation.stateAnalysis.secondary}`);
    } else {
      console.log(`❌ State Distribution: Expected H:${pattern.expectedResults.stateDistribution.healthy}%, A:${pattern.expectedResults.stateDistribution.average}%, U:${pattern.expectedResults.stateDistribution.unhealthy}%`);
      console.log(`   Got H:${result.heartActivation.stateDistribution.healthy}%, A:${result.heartActivation.stateDistribution.average}%, U:${result.heartActivation.stateDistribution.unhealthy}%`);
      testPassed = false;
      errors.push('State distribution mismatch');
    }
    
    // Section 5: Priority Areas/Subtype Analysis
    console.log(`\n📍 Section 5 - Priority Areas/Subtype Analysis:`);
    if (result.subtypeFocus?.dominantFocus === pattern.expectedResults.dominantSubtype) {
      console.log(`✅ Dominant Priority Area: ${result.subtypeFocus.dominantName}`);
      console.log(`✅ Priority Stack: ${result.subtypeFocus.focusStack}`);
      console.log(`✅ Distribution: SP:${result.subtypeFocus.percentages.sp}%, SO:${result.subtypeFocus.percentages.so}%, SX:${result.subtypeFocus.percentages.sx}%`);
    } else {
      console.log(`❌ Priority Area: Expected ${pattern.expectedResults.dominantSubtype}, got ${result.subtypeFocus?.dominantFocus}`);
      testPassed = false;
      errors.push('Subtype/priority area mismatch');
    }
    
    // Overall test result
    if (testPassed) {
      console.log(`\n🎉 OVERALL: ${pattern.name} - ALL SECTIONS PASSED`);
      passedTests++;
    } else {
      console.log(`\n❌ OVERALL: ${pattern.name} - FAILED (${errors.join(', ')})`);
      failedTests.push({ test: testKey, errors });
    }
  });

  console.log('\n================================================================');
  console.log('COMPLETE SYSTEM INTEGRATION VALIDATION SUMMARY');
  console.log('================================================================');
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  console.log(`Passed: ${passedTests}/${totalTests} complete assessments`);

  if (failedTests.length === 0) {
    console.log('\n🏆 ALL COMPLETE ASSESSMENTS PASSED');
    console.log('✅ All 5 sections working perfectly in sync according to specification');
  } else {
    console.log('\n🔧 Failed Tests:');
    failedTests.forEach(failure => {
      console.log(`   ${failure.test}: ${failure.errors.join(', ')}`);
    });
  }

  return { passedTests, totalTests, failedTests };
}