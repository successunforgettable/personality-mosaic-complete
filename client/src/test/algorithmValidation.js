/**
 * Comprehensive Algorithm Validation System
 * Tests each component and the full pipeline for accuracy
 */

import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';

// Known personality patterns for validation
const VALIDATION_PATTERNS = {
  type1_perfectionist: {
    name: "Type 1 Perfectionist Pattern",
    expectedType: 1,
    expectedWing: [9, 2], // 1w9 or 1w2
    expectedSubtype: "sp", // Often self-preservation focused
    foundationSelections: [0, 0, 0, 1, 0, 0, 1, 0, 1], // Structured, principled choices
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-left", title: "Individual Focus"}, 
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    colorPaletteSelections: [
      {id: "blue", category: 0}, {id: "green", category: 0},
      {id: "teal", category: 1}, {id: "navy", category: 1},
      {id: "gray", category: 2}, {id: "silver", category: 2}
    ],
    detailSelections: [
      {category: "sp"}, {category: "sp"}, {category: "so"},
      {category: "sp"}, {category: "sp"}, {category: "so"},
      {category: "sp"}, {category: "sx"}, {category: "sp"}
    ]
  },
  
  type7_enthusiast: {
    name: "Type 7 Enthusiast Pattern", 
    expectedType: 7,
    expectedWing: [6, 8],
    expectedSubtype: "so", // Often social focused
    foundationSelections: [2, 2, 2, 2, 2, 1, 2, 2, 2], // Optimistic, variety-seeking
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "orange", category: 0}, {id: "yellow", category: 0},
      {id: "coral", category: 1}, {id: "amber", category: 1},
      {id: "gold", category: 2}, {id: "bright", category: 2}
    ],
    detailSelections: [
      {category: "so"}, {category: "so"}, {category: "sx"},
      {category: "so"}, {category: "so"}, {category: "so"},
      {category: "sx"}, {category: "so"}, {category: "sp"}
    ]
  },

  type4_individualist: {
    name: "Type 4 Individualist Pattern",
    expectedType: 4,
    expectedWing: [3, 5],
    expectedSubtype: "sx", // Often sexual/one-to-one focused
    foundationSelections: [1, 2, 0, 2, 1, 2, 0, 1, 2], // Emotional, unique choices
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-left", title: "Individual Focus"},
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    colorPaletteSelections: [
      {id: "purple", category: 0}, {id: "indigo", category: 0},
      {id: "rose", category: 1}, {id: "burgundy", category: 1},
      {id: "crimson", category: 2}, {id: "deep", category: 2}
    ],
    detailSelections: [
      {category: "sx"}, {category: "sx"}, {category: "sx"},
      {category: "sx"}, {category: "so"}, {category: "sx"},
      {category: "sx"}, {category: "sx"}, {category: "sp"}
    ]
  },

  type9_peacemaker: {
    name: "Type 9 Peacemaker Pattern",
    expectedType: 9,
    expectedWing: [8, 1],
    expectedSubtype: "sp", // Often self-preservation focused
    foundationSelections: [1, 1, 1, 1, 1, 1, 1, 1, 1], // Balanced, harmony-seeking
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "green", category: 0}, {id: "blue", category: 0},
      {id: "teal", category: 1}, {id: "sage", category: 1},
      {id: "mint", category: 2}, {id: "soft", category: 2}
    ],
    detailSelections: [
      {category: "sp"}, {category: "sp"}, {category: "so"},
      {category: "sp"}, {category: "sp"}, {category: "so"},
      {category: "sp"}, {category: "so"}, {category: "sp"}
    ]
  }
};

/**
 * Validate a single test pattern
 */
function validatePattern(patternKey, pattern) {
  console.log(`\n=== Testing ${pattern.name} ===`);
  
  const result = generatePersonalityAnalysis({
    foundationSelections: pattern.foundationSelections,
    buildingBlockSelections: pattern.buildingBlockSelections,
    colorPaletteSelections: pattern.colorPaletteSelections,
    detailSelections: pattern.detailSelections
  });

  const validation = {
    patternName: pattern.name,
    passed: true,
    issues: [],
    details: {}
  };

  // Test 1: Primary Type Accuracy
  const detectedType = result.primaryType.number;
  const typeMatch = detectedType === pattern.expectedType;
  validation.details.primaryType = {
    expected: pattern.expectedType,
    detected: detectedType,
    confidence: result.primaryType.confidence,
    passed: typeMatch
  };

  if (!typeMatch) {
    validation.passed = false;
    validation.issues.push(`Primary type mismatch: expected ${pattern.expectedType}, got ${detectedType}`);
  }

  // Test 2: Wing/Influence Accuracy
  const detectedWing = result.influence?.influenceNumber;
  const wingMatch = pattern.expectedWing.includes(detectedWing);
  validation.details.wing = {
    expected: pattern.expectedWing,
    detected: detectedWing,
    strength: result.influence?.strength,
    passed: wingMatch
  };

  if (!wingMatch) {
    validation.passed = false;
    validation.issues.push(`Wing mismatch: expected one of ${pattern.expectedWing}, got ${detectedWing}`);
  }

  // Test 3: Subtype Accuracy  
  const detectedSubtype = result.subtypeFocus?.dominantFocus;
  const subtypeMatch = detectedSubtype === pattern.expectedSubtype;
  validation.details.subtype = {
    expected: pattern.expectedSubtype,
    detected: detectedSubtype,
    stack: result.subtypeFocus?.focusStack,
    passed: subtypeMatch
  };

  if (!subtypeMatch) {
    validation.passed = false;
    validation.issues.push(`Subtype mismatch: expected ${pattern.expectedSubtype}, got ${detectedSubtype}`);
  }

  // Test 4: Confidence Thresholds
  const lowConfidence = result.primaryType.confidence < 40;
  validation.details.confidence = {
    value: result.primaryType.confidence,
    acceptable: !lowConfidence,
    passed: !lowConfidence
  };

  if (lowConfidence) {
    validation.passed = false;
    validation.issues.push(`Low confidence: ${result.primaryType.confidence}% (should be >40%)`);
  }

  // Test 5: Score Distribution Sanity
  const scores = result.primaryType.scores;
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const scoreRange = maxScore - minScore;
  const reasonableRange = scoreRange >= 5 && scoreRange <= 30;
  
  validation.details.scoreDistribution = {
    range: scoreRange,
    max: maxScore,
    min: minScore,
    topThree: result.primaryType.topThree,
    passed: reasonableRange
  };

  if (!reasonableRange) {
    validation.passed = false;
    validation.issues.push(`Unusual score distribution: range ${scoreRange} (should be 5-30)`);
  }

  return validation;
}

/**
 * Run complete validation suite
 */
export function runAlgorithmValidation() {
  console.log("🔍 Starting Comprehensive Algorithm Validation");
  console.log("================================================");

  const results = {
    totalTests: Object.keys(VALIDATION_PATTERNS).length,
    passed: 0,
    failed: 0,
    details: {},
    overallIssues: []
  };

  // Test each pattern
  for (const [key, pattern] of Object.entries(VALIDATION_PATTERNS)) {
    const validation = validatePattern(key, pattern);
    results.details[key] = validation;
    
    if (validation.passed) {
      results.passed++;
      console.log(`✅ ${pattern.name} - PASSED`);
    } else {
      results.failed++;
      console.log(`❌ ${pattern.name} - FAILED`);
      validation.issues.forEach(issue => {
        console.log(`   - ${issue}`);
        results.overallIssues.push(`${pattern.name}: ${issue}`);
      });
    }
  }

  // Overall assessment
  console.log("\n📊 VALIDATION SUMMARY");
  console.log("===================");
  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Success Rate: ${Math.round((results.passed / results.totalTests) * 100)}%`);

  if (results.failed > 0) {
    console.log("\n🚨 CRITICAL ISSUES FOUND:");
    results.overallIssues.forEach(issue => console.log(`- ${issue}`));
  } else {
    console.log("\n🎉 All validation tests passed!");
  }

  return results;
}

/**
 * Quick validation check for current result
 */
export function validateCurrentResult(assessmentResult) {
  const issues = [];

  // Check primary type confidence
  if (assessmentResult.primaryType.confidence < 30) {
    issues.push(`Very low confidence: ${assessmentResult.primaryType.confidence}%`);
  }

  // Check score distribution
  const scores = Object.values(assessmentResult.primaryType.scores);
  const max = Math.max(...scores);
  const secondMax = scores.sort((a, b) => b - a)[1];
  const gap = max - secondMax;
  
  if (gap < 3) {
    issues.push(`Unclear primary type: top two scores too close (${max} vs ${secondMax})`);
  }

  // Check wing validity
  const primaryType = assessmentResult.primaryType.number;
  const wing = assessmentResult.influence?.influenceNumber;
  const validWings = [
    primaryType === 1 ? [9, 2] : null,
    primaryType === 2 ? [1, 3] : null,
    primaryType === 3 ? [2, 4] : null,
    primaryType === 4 ? [3, 5] : null,
    primaryType === 5 ? [4, 6] : null,
    primaryType === 6 ? [5, 7] : null,
    primaryType === 7 ? [6, 8] : null,
    primaryType === 8 ? [7, 9] : null,
    primaryType === 9 ? [8, 1] : null
  ][primaryType - 1];

  if (wing && validWings && !validWings.includes(wing)) {
    issues.push(`Invalid wing: Type ${primaryType} cannot have ${wing} wing`);
  }

  return {
    isValid: issues.length === 0,
    issues: issues,
    confidence: assessmentResult.primaryType.confidence
  };
}