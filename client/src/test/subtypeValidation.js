/**
 * Section 5: Priority Areas Determination (Subtype Analysis) Validation
 * Tests the exact specification algorithm from section 6.3
 */

import { analyzeSubtypeFocus } from '../lib/personalityAnalysis.js';

// Test patterns for subtype determination - exact from specification
const SUBTYPE_TEST_PATTERNS = {
  selfPreservationDominant: {
    name: "Self-Preservation Dominant Pattern",
    tokenDistribution: { selfPreservation: 6, oneToOne: 2, social: 2 },
    expectedDominant: 'sp',
    expectedSecondary: 'so', // or 'sx' based on tie-breaking
    expectedPercentages: { sp: 60, so: 20, sx: 20 }
  },

  socialDominant: {
    name: "Social Dominant Pattern", 
    tokenDistribution: { selfPreservation: 2, oneToOne: 2, social: 6 },
    expectedDominant: 'so',
    expectedSecondary: 'sp', // or 'sx' based on tie-breaking
    expectedPercentages: { sp: 20, so: 60, sx: 20 }
  },

  sexualDominant: {
    name: "Sexual/One-to-One Dominant Pattern",
    tokenDistribution: { selfPreservation: 2, oneToOne: 6, social: 2 },
    expectedDominant: 'sx',
    expectedSecondary: 'sp', // or 'so' based on tie-breaking
    expectedPercentages: { sp: 20, so: 20, sx: 60 }
  },

  balancedPattern: {
    name: "Balanced Subtype Pattern",
    tokenDistribution: { selfPreservation: 3, oneToOne: 3, social: 4 },
    expectedDominant: 'so',
    expectedSecondary: 'sp', // or 'sx' based on tie-breaking
    expectedPercentages: { sp: 30, so: 40, sx: 30 }
  },

  type1SelfPres: {
    name: "Type 1 Self-Preservation Focus",
    tokenDistribution: { selfPreservation: 5, oneToOne: 3, social: 2 },
    expectedDominant: 'sp',
    expectedSecondary: 'sx',
    expectedPercentages: { sp: 50, so: 20, sx: 30 }
  },

  type6Social: {
    name: "Type 6 Social Focus",
    tokenDistribution: { selfPreservation: 2, oneToOne: 3, social: 5 },
    expectedDominant: 'so',
    expectedSecondary: 'sx', 
    expectedPercentages: { sp: 20, so: 50, sx: 30 }
  },

  type4Sexual: {
    name: "Type 4 Sexual/One-to-One Focus",
    tokenDistribution: { selfPreservation: 2, oneToOne: 5, social: 3 },
    expectedDominant: 'sx',
    expectedSecondary: 'so',
    expectedPercentages: { sp: 20, so: 30, sx: 50 }
  }
};

function createDetailSelectionsFromDistribution(distribution) {
  const selections = [];
  
  // Add self-preservation selections
  for (let i = 0; i < distribution.selfPreservation; i++) {
    selections.push({ id: `sp-security-${i}`, category: 'sp' });
  }
  
  // Add social selections
  for (let i = 0; i < distribution.social; i++) {
    selections.push({ id: `so-community-${i}`, category: 'so' });
  }
  
  // Add sexual/one-to-one selections
  for (let i = 0; i < distribution.oneToOne; i++) {
    selections.push({ id: `sx-intensity-${i}`, category: 'sx' });
  }
  
  return selections;
}

export function runSubtypeValidation() {
  console.log('🧪 SUBTYPE ANALYSIS / PRIORITY AREAS VALIDATION');
  console.log('==================================================');

  let passedTests = 0;
  let totalTests = 0;
  const failedTests = [];

  Object.entries(SUBTYPE_TEST_PATTERNS).forEach(([testKey, testPattern]) => {
    console.log(`\nTesting ${testPattern.name}:`);
    
    // Create detail selections from token distribution
    const detailSelections = createDetailSelectionsFromDistribution(testPattern.tokenDistribution);
    console.log(`Distribution: SP:${testPattern.expectedPercentages.sp}%, SO:${testPattern.expectedPercentages.so}%, SX:${testPattern.expectedPercentages.sx}%`);
    
    const result = analyzeSubtypeFocus(detailSelections);
    
    totalTests++;
    
    // Check if results match expectations
    const dominantMatches = result.dominantFocus === testPattern.expectedDominant;
    const percentagesMatch = 
      result.percentages.sp === testPattern.expectedPercentages.sp &&
      result.percentages.so === testPattern.expectedPercentages.so &&
      result.percentages.sx === testPattern.expectedPercentages.sx;
    
    if (dominantMatches && percentagesMatch) {
      console.log(`✅ PASS - Dominant: ${result.dominantFocus}, Secondary: ${result.orderedFocus[1].focus}`);
      passedTests++;
    } else {
      console.log(`❌ FAIL - Expected dominant: ${testPattern.expectedDominant}`);
      console.log(`   Got dominant: ${result.dominantFocus}`);
      console.log(`   Expected percentages: SP:${testPattern.expectedPercentages.sp}%, SO:${testPattern.expectedPercentages.so}%, SX:${testPattern.expectedPercentages.sx}%`);
      console.log(`   Got percentages: SP:${result.percentages.sp}%, SO:${result.percentages.so}%, SX:${result.percentages.sx}%`);
      failedTests.push(testKey);
    }
  });

  console.log('\n==================================================');
  console.log('📊 SUBTYPE ANALYSIS VALIDATION SUMMARY');
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  console.log(`Passed: ${passedTests}/${totalTests} tests`);

  if (failedTests.length === 0) {
    console.log('🎉 ALL SUBTYPE PATTERNS DETECTED CORRECTLY!');
  } else {
    console.log('\n🔧 Failed Tests:');
    failedTests.forEach(test => {
      console.log(`   ${test}: Analysis mismatch`);
    });
  }

  return { passedTests, totalTests, failedTests };
}