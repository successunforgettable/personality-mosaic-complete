/**
 * Section 4: Heart Activation / State Distribution Validation
 * Tests the exact specification algorithm from section 5.5
 */

import { analyzeHeartActivation } from '../lib/personalityAnalysis.js';

// Test patterns using exact specification algorithm for state distribution
const HEART_ACTIVATION_TEST_PATTERNS = {
  healthyDominant: {
    name: "Healthy Dominant State Distribution",
    primaryType: 1,
    stateDistribution: { healthy: 70, average: 25, unhealthy: 5 },
    expectedPrimary: 'healthy',
    expectedSecondary: 'average',
    expectedDescription: /predominantly.*principled, accepting, and balanced/i
  },

  averageDominant: {
    name: "Average Dominant State Distribution", 
    primaryType: 2,
    stateDistribution: { healthy: 20, average: 60, unhealthy: 20 },
    expectedPrimary: 'average',
    expectedSecondary: 'healthy',
    expectedDescription: /often.*people-pleasing, approval-seeking, and prideful/i
  },

  unhealthyDominant: {
    name: "Unhealthy Dominant State Distribution",
    primaryType: 3,
    stateDistribution: { healthy: 10, average: 30, unhealthy: 60 },
    expectedPrimary: 'unhealthy',
    expectedSecondary: 'average',
    expectedDescription: /often.*deceptive, hostile, and emotionally detached/i
  },

  balanced: {
    name: "Balanced State Distribution",
    primaryType: 4,
    stateDistribution: { healthy: 35, average: 40, unhealthy: 25 },
    expectedPrimary: 'average',
    expectedSecondary: 'healthy',
    expectedDescription: /often.*melancholic, envious, and self-absorbed.*At times.*creative, emotionally honest, and self-aware/i
  },

  moderateHealthy: {
    name: "Moderate Healthy State Distribution",
    primaryType: 5,
    stateDistribution: { healthy: 55, average: 35, unhealthy: 10 },
    expectedPrimary: 'healthy',
    expectedSecondary: 'average',
    expectedDescription: /often.*insightful, engaged, and intellectually generous/i
  },

  type6Healthy: {
    name: "Type 6 Healthy State",
    primaryType: 6,
    stateDistribution: { healthy: 75, average: 20, unhealthy: 5 },
    expectedPrimary: 'healthy',
    expectedSecondary: 'average',
    expectedDescription: /predominantly.*courageous, cooperative, and committed/i
  },

  type7Average: {
    name: "Type 7 Average State",
    primaryType: 7,
    stateDistribution: { healthy: 25, average: 65, unhealthy: 10 },
    expectedPrimary: 'average',
    expectedSecondary: 'healthy',
    expectedDescription: /scattered, escapist, and commitment-avoidant.*joyful, focused, and deeply satisfied/i
  },

  type8Unhealthy: {
    name: "Type 8 Unhealthy State",
    primaryType: 8,
    stateDistribution: { healthy: 15, average: 25, unhealthy: 60 },
    expectedPrimary: 'unhealthy',
    expectedSecondary: 'average',
    expectedDescription: /often.*intimidating, destructive, and ruthless.*At times.*controlling, confrontational, and justice-obsessed/i
  },

  type9Balanced: {
    name: "Type 9 Balanced State",
    primaryType: 9,
    stateDistribution: { healthy: 30, average: 45, unhealthy: 25 },
    expectedPrimary: 'average',
    expectedSecondary: 'healthy',
    expectedDescription: /often.*conflict-avoidant, complacent, and self-forgetting/i
  }
};

// Mock color palette selections that map to state distributions
function createColorSelectionsFromDistribution(distribution) {
  const { healthy, average, unhealthy } = distribution;
  const total = healthy + average + unhealthy;
  
  // Create color selections array based on distribution percentages
  const colorSelections = [];
  
  // Add healthy colors (green tones)
  const healthyCount = Math.round((healthy / total) * 10);
  for (let i = 0; i < healthyCount; i++) {
    colorSelections.push({ category: 0, color: '#22c55e', intensity: 'vibrant' });
  }
  
  // Add average colors (amber tones)  
  const averageCount = Math.round((average / total) * 10);
  for (let i = 0; i < averageCount; i++) {
    colorSelections.push({ category: 1, color: '#f59e0b', intensity: 'medium' });
  }
  
  // Add unhealthy colors (red tones)
  const unhealthyCount = 10 - healthyCount - averageCount;
  for (let i = 0; i < unhealthyCount; i++) {
    colorSelections.push({ category: 2, color: '#ef4444', intensity: 'dark' });
  }
  
  return colorSelections;
}

export function runHeartActivationValidation() {
  console.log("🧪 HEART ACTIVATION / STATE DISTRIBUTION VALIDATION");
  console.log("=".repeat(50));
  
  const results = [];
  let passCount = 0;

  Object.entries(HEART_ACTIVATION_TEST_PATTERNS).forEach(([patternKey, pattern]) => {
    console.log(`\nTesting ${pattern.name}:`);
    console.log(`Distribution: H:${pattern.stateDistribution.healthy}%, A:${pattern.stateDistribution.average}%, U:${pattern.stateDistribution.unhealthy}%`);
    
    try {
      // Create color selections from state distribution
      const colorSelections = createColorSelectionsFromDistribution(pattern.stateDistribution);
      
      const result = analyzeHeartActivation(colorSelections, pattern.primaryType);
      
      if (!result) {
        console.log(`❌ FAIL - No heart activation analysis returned`);
        results.push({ pattern: patternKey, passed: false, error: 'No result' });
        return;
      }

      // Test state analysis if implemented
      if (result.stateAnalysis) {
        const primaryMatch = result.stateAnalysis.primary === pattern.expectedPrimary;
        const secondaryMatch = result.stateAnalysis.secondary === pattern.expectedSecondary;
        const descriptionMatch = pattern.expectedDescription.test(result.stateAnalysis.description || '');

        const allMatch = primaryMatch && secondaryMatch && descriptionMatch;

        if (allMatch) {
          console.log(`✅ PASS - Primary: ${result.stateAnalysis.primary}, Secondary: ${result.stateAnalysis.secondary}`);
          passCount++;
          results.push({ pattern: patternKey, passed: true });
        } else {
          console.log(`❌ FAIL - Expected primary: ${pattern.expectedPrimary}, secondary: ${pattern.expectedSecondary}`);
          console.log(`   Got primary: ${result.stateAnalysis.primary}, secondary: ${result.stateAnalysis.secondary}`);
          console.log(`   Description match: ${descriptionMatch}`);
          results.push({ pattern: patternKey, passed: false, expected: pattern, actual: result });
        }
      } else {
        // If state analysis not implemented yet, just check basic structure
        console.log(`⚠️  PARTIAL - Heart activation detected but state analysis not implemented`);
        console.log(`   Result: ${JSON.stringify(result, null, 2)}`);
        results.push({ pattern: patternKey, passed: false, error: 'State analysis not implemented' });
      }
    } catch (error) {
      console.log(`❌ FAIL - Error: ${error.message}`);
      results.push({ pattern: patternKey, passed: false, error: error.message });
    }
  });

  console.log("\n" + "=".repeat(50));
  console.log("📊 HEART ACTIVATION VALIDATION SUMMARY");
  const successRate = Math.round((passCount / Object.keys(HEART_ACTIVATION_TEST_PATTERNS).length) * 100);
  console.log(`Success Rate: ${successRate}%`);
  console.log(`Passed: ${passCount}/${Object.keys(HEART_ACTIVATION_TEST_PATTERNS).length} tests`);

  if (passCount === Object.keys(HEART_ACTIVATION_TEST_PATTERNS).length) {
    console.log("🎉 ALL HEART ACTIVATION PATTERNS DETECTED CORRECTLY!");
  } else {
    console.log("\n🔧 Failed Tests:");
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   ${r.pattern}: ${r.error || 'Analysis mismatch'}`);
    });
  }

  return results;
}