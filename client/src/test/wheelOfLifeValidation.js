/**
 * Section 6: Wheel of Life Domain Analysis Validation
 * Tests the exact specification algorithm from section 10.2
 */

import { generateWheelOfLifeAnalysis } from '../lib/wheelOfLifeAnalysis.js';

// Test patterns for wheel of life analysis - exact from specification
const WHEEL_OF_LIFE_TEST_PATTERNS = {
  type1HighActivation: {
    name: "Type 1 High Activation Pattern",
    personalityData: {
      primaryType: { number: 1, name: "Reformer" },
      heartActivation: { activationPercentage: 75 },
      subtypeFocus: { dominantFocus: 'sp', dominantName: 'Physical Wellbeing & Stability Focus' }
    },
    expectedResults: {
      overallActivation: { min: 70, max: 85 },
      primaryDomains: ['health-vitality', 'financial-abundance'],
      healthVitalityScore: { min: 85, max: 100 }, // 75 + 15 (priority) + 0 (type bonus)
      careerPurposeScore: { min: 80, max: 90 },   // 75 + 10 (type bonus)
      personalGrowthScore: { min: 85, max: 100 }  // 75 + 10 (type bonus)
    }
  },

  type2LowActivation: {
    name: "Type 2 Low Activation Pattern",
    personalityData: {
      primaryType: { number: 2, name: "Helper" },
      heartActivation: { activationPercentage: 25 },
      subtypeFocus: { dominantFocus: 'sx', dominantName: 'Intensity & Connection Focus' }
    },
    expectedResults: {
      overallActivation: { min: 20, max: 35 },
      primaryDomains: ['intimate-relationships', 'personal-growth'],
      intimateRelationshipsScore: { min: 35, max: 50 }, // 25 + 15 (priority) + 10 (type bonus)
      familyHarmonyScore: { min: 30, max: 40 },         // 25 + 8 (type bonus)
      socialConnectionScore: { min: 25, max: 35 }       // 25 + 5 (type bonus)
    }
  },

  type6SocialFocus: {
    name: "Type 6 Social Focus Pattern",
    personalityData: {
      primaryType: { number: 6, name: "Sentinel" },
      heartActivation: { activationPercentage: 55 },
      subtypeFocus: { dominantFocus: 'so', dominantName: 'Community & Belonging Focus' }
    },
    expectedResults: {
      overallActivation: { min: 50, max: 65 },
      primaryDomains: ['social-connection', 'career-purpose'],
      socialConnectionScore: { min: 70, max: 85 },    // 55 + 15 (priority) + 8 (type bonus)
      careerPurposeScore: { min: 70, max: 80 },        // 55 + 15 (priority)
      familyHarmonyScore: { min: 60, max: 70 }         // 55 + 8 (type bonus)
    }
  },

  type4CreativeBalance: {
    name: "Type 4 Creative Balance Pattern",
    personalityData: {
      primaryType: { number: 4, name: "Individualist" },
      heartActivation: { activationPercentage: 45 },
      subtypeFocus: { dominantFocus: 'sx', dominantName: 'Intensity & Connection Focus' }
    },
    expectedResults: {
      overallActivation: { min: 40, max: 55 },
      primaryDomains: ['intimate-relationships', 'personal-growth'],
      intimateRelationshipsScore: { min: 60, max: 75 }, // 45 + 15 (priority) + 8 (type bonus)
      personalGrowthScore: { min: 60, max: 75 },        // 45 + 15 (priority) + 15 (type bonus)
      spiritualAlignmentScore: { min: 50, max: 60 }     // 45 + 11 (type bonus)
    }
  },

  type8PowerPattern: {
    name: "Type 8 Power Pattern",
    personalityData: {
      primaryType: { number: 8, name: "Challenger" },
      heartActivation: { activationPercentage: 80 },
      subtypeFocus: { dominantFocus: 'so', dominantName: 'Community & Belonging Focus' }
    },
    expectedResults: {
      overallActivation: { min: 75, max: 90 },
      primaryDomains: ['social-connection', 'career-purpose'],
      careerPurposeScore: { min: 95, max: 100 },        // 80 + 15 (priority) + 10 (type bonus)
      financialAbundanceScore: { min: 90, max: 100 },   // 80 + 8 (type bonus)
      socialConnectionScore: { min: 95, max: 100 }      // 80 + 15 (priority)
    }
  }
};

export function runWheelOfLifeValidation() {
  console.log('🧪 WHEEL OF LIFE DOMAIN ANALYSIS VALIDATION');
  console.log('==================================================');

  let passedTests = 0;
  let totalTests = 0;
  const failedTests = [];

  Object.entries(WHEEL_OF_LIFE_TEST_PATTERNS).forEach(([testKey, testPattern]) => {
    console.log(`\nTesting ${testPattern.name}:`);
    
    const result = generateWheelOfLifeAnalysis(testPattern.personalityData);
    
    totalTests++;
    let testPassed = true;
    const errors = [];
    
    // Test overall activation range
    const overallInRange = 
      result.overallActivation >= testPattern.expectedResults.overallActivation.min &&
      result.overallActivation <= testPattern.expectedResults.overallActivation.max;
    
    if (overallInRange) {
      console.log(`✅ Overall Activation: ${result.overallActivation}% (expected: ${testPattern.expectedResults.overallActivation.min}-${testPattern.expectedResults.overallActivation.max}%)`);
    } else {
      console.log(`❌ Overall Activation: ${result.overallActivation}% (expected: ${testPattern.expectedResults.overallActivation.min}-${testPattern.expectedResults.overallActivation.max}%)`);
      testPassed = false;
      errors.push('Overall activation out of range');
    }
    
    // Test primary domains alignment
    const primaryDomainsMatch = JSON.stringify(result.primaryDomains.sort()) === JSON.stringify(testPattern.expectedResults.primaryDomains.sort());
    
    if (primaryDomainsMatch) {
      console.log(`✅ Primary Domains: ${result.primaryDomains.join(', ')}`);
    } else {
      console.log(`❌ Primary Domains: Expected ${testPattern.expectedResults.primaryDomains.join(', ')}, got ${result.primaryDomains.join(', ')}`);
      testPassed = false;
      errors.push('Primary domains mismatch');
    }
    
    // Test specific domain scores
    const domainTests = [
      { key: 'healthVitalityScore', domainId: 'health-vitality' },
      { key: 'careerPurposeScore', domainId: 'career-purpose' },
      { key: 'personalGrowthScore', domainId: 'personal-growth' },
      { key: 'intimateRelationshipsScore', domainId: 'intimate-relationships' },
      { key: 'familyHarmonyScore', domainId: 'family-harmony' },
      { key: 'socialConnectionScore', domainId: 'social-connection' },
      { key: 'financialAbundanceScore', domainId: 'financial-abundance' },
      { key: 'spiritualAlignmentScore', domainId: 'spiritual-alignment' }
    ];
    
    domainTests.forEach(({ key, domainId }) => {
      const expectedRange = testPattern.expectedResults[key];
      if (expectedRange) {
        const domain = result.domains.find(d => d.domainId === domainId);
        if (domain) {
          const scoreInRange = domain.activationScore >= expectedRange.min && domain.activationScore <= expectedRange.max;
          
          if (scoreInRange) {
            console.log(`✅ ${domain.domainName}: ${domain.activationScore}% (expected: ${expectedRange.min}-${expectedRange.max}%)`);
          } else {
            console.log(`❌ ${domain.domainName}: ${domain.activationScore}% (expected: ${expectedRange.min}-${expectedRange.max}%)`);
            testPassed = false;
            errors.push(`${domainId} score out of range`);
          }
        }
      }
    });
    
    // Test trajectory projections exist
    const hasTrajectories = result.domains.every(domain => 
      domain.shortTermProjection && 
      domain.mediumTermProjection && 
      domain.longTermProjection
    );
    
    if (hasTrajectories) {
      console.log(`✅ Trajectory Projections: All domains have 3-month, 1-year, and 3+ year projections`);
    } else {
      console.log(`❌ Trajectory Projections: Missing projections for some domains`);
      testPassed = false;
      errors.push('Missing trajectory projections');
    }
    
    // Test impact descriptions exist
    const hasImpacts = result.domains.every(domain => domain.currentImpact);
    
    if (hasImpacts) {
      console.log(`✅ Impact Descriptions: All domains have current impact analysis`);
    } else {
      console.log(`❌ Impact Descriptions: Missing impact analysis for some domains`);
      testPassed = false;
      errors.push('Missing impact descriptions');
    }
    
    if (testPassed) {
      console.log(`✅ PASS - ${testPattern.name}`);
      passedTests++;
    } else {
      console.log(`❌ FAIL - ${testPattern.name} (${errors.join(', ')})`);
      failedTests.push({ test: testKey, errors });
    }
  });

  console.log('\n==================================================');
  console.log('📊 WHEEL OF LIFE VALIDATION SUMMARY');
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  console.log(`Passed: ${passedTests}/${totalTests} tests`);

  if (failedTests.length === 0) {
    console.log('🎉 ALL WHEEL OF LIFE PATTERNS VALIDATED CORRECTLY!');
  } else {
    console.log('\n🔧 Failed Tests:');
    failedTests.forEach(failure => {
      console.log(`   ${failure.test}: ${failure.errors.join(', ')}`);
    });
  }

  return { passedTests, totalTests, failedTests };
}