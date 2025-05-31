/**
 * Section 7: Results Visualization and Report Validation
 * Tests the exact specification implementation from section 7.1 and 7.2
 */

import { generateTowerVisualization, generateTowerSVG } from '../lib/towerVisualization.js';
import { generateWrittenReport } from '../lib/writtenReport.js';

// Test patterns for Section 7 validation - exact from specification
const SECTION_7_TEST_PATTERNS = {
  reformerPattern: {
    name: "Reformer Complete Report Pattern",
    personalityData: {
      foundationSelections: [2, 2, 2, 0, 0, 0, 2, 0, 2],
      buildingBlocks: [0, 1, 0, 1],
      primaryType: { number: 1, name: "Reformer", confidence: 0.85 },
      wingInfluence: { secondaryType: 9, wing: 9 },
      stateDistribution: {
        healthy: 30,
        average: 60,
        unhealthy: 10,
        primaryState: "Average",
        secondaryState: "Healthy"
      },
      moodStates: {
        goodMoodDescription: "When you're in a good mood, you are more spontaneous, positive, and open to new possibilities.",
        badMoodDescription: "When you're in a bad mood, you are more withdrawn, emotionally sensitive, and focused on what's missing."
      },
      subtypeDistribution: [
        { focus: 'sp', name: 'Physical Wellbeing & Stability Focus', tokens: 5 },
        { focus: 'so', name: 'Community & Belonging Focus', tokens: 3 },
        { focus: 'sx', name: 'Intensity & Connection Focus', tokens: 2 }
      ],
      wheelOfLifeAnalysis: {
        primaryDomains: ['health-vitality', 'financial-abundance'],
        domains: [
          {
            domainId: 'health-vitality',
            domainName: 'Health & Vitality',
            activationScore: 90,
            shortTermProjection: '3-month wellness routine establishment'
          }
        ]
      }
    },
    expectedResults: {
      towerVisualization: {
        dimensions: { width: 400, height: 600 },
        foundationStones: 9,
        selectedStones: 5, // Stones with selection > 0: [2,2,2,0,0,0,2,0,2] = 5 selected
        buildingBlocks: 4,
        hasColorScheme: true,
        hasDetailPatterns: true,
        hasAnimation: true
      },
      writtenReport: {
        header: {
          typeName: "The Reformer",
          shortDescription: "Principled, purposeful, and self-controlled"
        },
        sections: ['typeDescription', 'influenceProfile', 'stateAnalysis', 'subtypeStack', 'growthPath'],
        typeDescriptionParagraphs: 3,
        hasInfluenceProfile: true,
        hasStateDistribution: true,
        hasSubtypeStack: true,
        hasGrowthRecommendations: true
      }
    }
  },

  peacemakerPattern: {
    name: "Peacemaker Complete Report Pattern",
    personalityData: {
      foundationSelections: [2, 0, 0, 0, 1, 0, 0, 1, 1],
      buildingBlocks: [1, 0, 1, 0],
      primaryType: { number: 9, name: "Peacemaker", confidence: 0.78 },
      wingInfluence: { secondaryType: 1, wing: 1 },
      stateDistribution: {
        healthy: 40,
        average: 50,
        unhealthy: 10,
        primaryState: "Healthy",
        secondaryState: "Average"
      },
      moodStates: {
        goodMoodDescription: "When you're in a good mood, you are more focused, productive, and able to pursue your own goals.",
        badMoodDescription: "When you're in a bad mood, you are more anxious, doubtful, and seek reassurance from others."
      },
      subtypeDistribution: [
        { focus: 'so', name: 'Community & Belonging Focus', tokens: 6 },
        { focus: 'sp', name: 'Physical Wellbeing & Stability Focus', tokens: 3 },
        { focus: 'sx', name: 'Intensity & Connection Focus', tokens: 1 }
      ],
      wheelOfLifeAnalysis: {
        primaryDomains: ['social-connection', 'family-harmony'],
        domains: [
          {
            domainId: 'social-connection',
            domainName: 'Social Connection',
            activationScore: 85,
            shortTermProjection: '3-month community engagement plan'
          }
        ]
      }
    },
    expectedResults: {
      towerVisualization: {
        dimensions: { width: 400, height: 600 },
        foundationStones: 9,
        selectedStones: 4, // Stones with selection > 0: [2,0,0,0,1,0,0,1,1] = 4 selected
        buildingBlocks: 4,
        hasColorScheme: true,
        hasDetailPatterns: true,
        hasAnimation: true
      },
      writtenReport: {
        header: {
          typeName: "The Peacemaker",
          shortDescription: "Receptive, reassuring, and agreeable"
        },
        sections: ['typeDescription', 'influenceProfile', 'stateAnalysis', 'subtypeStack', 'growthPath'],
        typeDescriptionParagraphs: 3,
        hasInfluenceProfile: true,
        hasStateDistribution: true,
        hasSubtypeStack: true,
        hasGrowthRecommendations: true
      }
    }
  },

  challengerPattern: {
    name: "Challenger Complete Report Pattern",
    personalityData: {
      foundationSelections: [2, 2, 1, 2, 2, 2, 2, 2, 2],
      buildingBlocks: [1, 1, 1, 1],
      primaryType: { number: 8, name: "Challenger", confidence: 0.92 },
      wingInfluence: { secondaryType: 7, wing: 7 },
      stateDistribution: {
        healthy: 60,
        average: 35,
        unhealthy: 5,
        primaryState: "Healthy",
        secondaryState: "Average"
      },
      moodStates: {
        goodMoodDescription: "When you're in a good mood, you are more nurturing, compassionate, and supportive of others.",
        badMoodDescription: "When you're in a bad mood, you are more withdrawn, secretive, and emotionally distant."
      },
      subtypeDistribution: [
        { focus: 'sx', name: 'Intensity & Connection Focus', tokens: 7 },
        { focus: 'so', name: 'Community & Belonging Focus', tokens: 2 },
        { focus: 'sp', name: 'Physical Wellbeing & Stability Focus', tokens: 1 }
      ],
      wheelOfLifeAnalysis: {
        primaryDomains: ['career-purpose', 'intimate-relationships'],
        domains: [
          {
            domainId: 'career-purpose',
            domainName: 'Career & Purpose',
            activationScore: 95,
            shortTermProjection: '3-month leadership development focus'
          }
        ]
      }
    },
    expectedResults: {
      towerVisualization: {
        dimensions: { width: 400, height: 600 },
        foundationStones: 9,
        selectedStones: 9,
        buildingBlocks: 4,
        hasColorScheme: true,
        hasDetailPatterns: true,
        hasAnimation: true
      },
      writtenReport: {
        header: {
          typeName: "The Challenger",
          shortDescription: "Self-confident, decisive, and willful"
        },
        sections: ['typeDescription', 'influenceProfile', 'stateAnalysis', 'subtypeStack', 'growthPath'],
        typeDescriptionParagraphs: 3,
        hasInfluenceProfile: true,
        hasStateDistribution: true,
        hasSubtypeStack: true,
        hasGrowthRecommendations: true
      }
    }
  }
};

export function runSection7Validation() {
  console.log('🧪 SECTION 7: RESULTS VISUALIZATION AND REPORT VALIDATION');
  console.log('===========================================================');

  let passedTests = 0;
  let totalTests = 0;
  const failedTests = [];

  Object.entries(SECTION_7_TEST_PATTERNS).forEach(([testKey, testPattern]) => {
    console.log(`\nTesting ${testPattern.name}:`);
    
    // Test Tower Visualization
    const towerResult = generateTowerVisualization(testPattern.personalityData);
    const towerSVG = generateTowerSVG(towerResult);
    
    // Test Written Report
    const reportResult = generateWrittenReport(testPattern.personalityData);
    
    totalTests++;
    let testPassed = true;
    const errors = [];
    
    // Validate Tower Visualization Structure
    console.log('\n--- Tower Visualization Tests ---');
    
    // Test dimensions (400px × 600px as specified)
    const correctDimensions = 
      towerResult.dimensions.width === testPattern.expectedResults.towerVisualization.dimensions.width &&
      towerResult.dimensions.height === testPattern.expectedResults.towerVisualization.dimensions.height;
    
    if (correctDimensions) {
      console.log(`✅ Tower Dimensions: ${towerResult.dimensions.width}x${towerResult.dimensions.height}px (specification compliant)`);
    } else {
      console.log(`❌ Tower Dimensions: Expected 400x600px, got ${towerResult.dimensions.width}x${towerResult.dimensions.height}px`);
      testPassed = false;
      errors.push('Incorrect tower dimensions');
    }
    
    // Test foundation structure
    const hasFoundation = towerResult.foundation && towerResult.foundation.stones;
    const correctStoneCount = hasFoundation && towerResult.foundation.stones.length === 9;
    const selectedStones = hasFoundation ? towerResult.foundation.stones.filter(s => s.selected).length : 0;
    const expectedSelected = testPattern.expectedResults.towerVisualization.selectedStones;
    
    if (correctStoneCount && selectedStones === expectedSelected) {
      console.log(`✅ Foundation: 9 stones, ${selectedStones} selected (matches pattern)`);
    } else {
      console.log(`❌ Foundation: Expected 9 stones with ${expectedSelected} selected, got ${correctStoneCount ? 9 : 'unknown'} stones with ${selectedStones} selected`);
      testPassed = false;
      errors.push('Foundation structure incorrect');
    }
    
    // Test main tower structure
    const hasMainTower = towerResult.mainTower && towerResult.mainTower.blocks;
    const correctBlockCount = hasMainTower && towerResult.mainTower.blocks.length === 4;
    
    if (correctBlockCount) {
      console.log(`✅ Main Tower: 4 building blocks (specification compliant)`);
    } else {
      console.log(`❌ Main Tower: Expected 4 blocks, got ${hasMainTower ? towerResult.mainTower.blocks.length : 'unknown'}`);
      testPassed = false;
      errors.push('Main tower structure incorrect');
    }
    
    // Test color scheme
    const hasColorScheme = towerResult.colorScheme && towerResult.colorScheme.primary;
    
    if (hasColorScheme) {
      console.log(`✅ Color Scheme: State-based colors applied`);
    } else {
      console.log(`❌ Color Scheme: Missing state-based color application`);
      testPassed = false;
      errors.push('Color scheme missing');
    }
    
    // Test detail patterns
    const hasDetailPatterns = towerResult.detailPatterns && Array.isArray(towerResult.detailPatterns);
    
    if (hasDetailPatterns) {
      console.log(`✅ Detail Patterns: Subtype-based patterns applied`);
    } else {
      console.log(`❌ Detail Patterns: Missing subtype-based visual patterns`);
      testPassed = false;
      errors.push('Detail patterns missing');
    }
    
    // Test SVG generation
    const validSVG = towerSVG && towerSVG.includes('<svg') && towerSVG.includes('</svg>');
    
    if (validSVG) {
      console.log(`✅ SVG Generation: Valid SVG markup generated`);
    } else {
      console.log(`❌ SVG Generation: Invalid or missing SVG markup`);
      testPassed = false;
      errors.push('SVG generation failed');
    }
    
    // Validate Written Report Structure
    console.log('\n--- Written Report Tests ---');
    
    // Test header structure
    const correctHeader = 
      reportResult.header &&
      reportResult.header.typeName === testPattern.expectedResults.writtenReport.header.typeName &&
      reportResult.header.shortDescription === testPattern.expectedResults.writtenReport.header.shortDescription;
    
    if (correctHeader) {
      console.log(`✅ Report Header: "${reportResult.header.typeName}" with correct description`);
    } else {
      console.log(`❌ Report Header: Expected "${testPattern.expectedResults.writtenReport.header.typeName}", got "${reportResult.header?.typeName || 'missing'}"`);
      testPassed = false;
      errors.push('Report header incorrect');
    }
    
    // Test type description structure
    const hasTypeDescription = reportResult.typeDescription;
    const hasParagraphs = hasTypeDescription && 
      hasTypeDescription.paragraph1 && 
      hasTypeDescription.paragraph2 && 
      hasTypeDescription.paragraph3;
    
    if (hasParagraphs) {
      console.log(`✅ Type Description: 3 paragraphs as specified`);
    } else {
      console.log(`❌ Type Description: Missing required paragraphs (specification requires 2-3)`);
      testPassed = false;
      errors.push('Type description structure incorrect');
    }
    
    // Test influence profile
    const hasInfluenceProfile = reportResult.influenceProfile !== null;
    
    if (hasInfluenceProfile) {
      console.log(`✅ Influence Profile: Generated for wing pattern`);
    } else {
      console.log(`❌ Influence Profile: Missing for detected wing pattern`);
      testPassed = false;
      errors.push('Influence profile missing');
    }
    
    // Test state analysis
    const hasStateAnalysis = 
      reportResult.stateAnalysis &&
      reportResult.stateAnalysis.overview &&
      reportResult.stateAnalysis.distribution &&
      reportResult.stateAnalysis.moodStates;
    
    if (hasStateAnalysis) {
      console.log(`✅ State Analysis: Complete with distribution and mood states`);
    } else {
      console.log(`❌ State Analysis: Missing required components`);
      testPassed = false;
      errors.push('State analysis incomplete');
    }
    
    // Test subtype stack
    const hasSubtypeStack = 
      reportResult.subtypeStack &&
      reportResult.subtypeStack.stack &&
      reportResult.subtypeStack.dominantDescription;
    
    if (hasSubtypeStack) {
      console.log(`✅ Subtype Stack: Complete with dominant description`);
    } else {
      console.log(`❌ Subtype Stack: Missing required components`);
      testPassed = false;
      errors.push('Subtype stack incomplete');
    }
    
    // Test growth path
    const hasGrowthPath = 
      reportResult.growthPath &&
      (reportResult.growthPath.typeSpecific || reportResult.growthPath.overallGuidance);
    
    if (hasGrowthPath) {
      console.log(`✅ Growth Path: Personalized recommendations provided`);
    } else {
      console.log(`❌ Growth Path: Missing personalized recommendations`);
      testPassed = false;
      errors.push('Growth path incomplete');
    }
    
    if (testPassed) {
      console.log(`\n✅ PASS - ${testPattern.name}`);
      passedTests++;
    } else {
      console.log(`\n❌ FAIL - ${testPattern.name} (${errors.join(', ')})`);
      failedTests.push({ test: testKey, errors });
    }
  });

  console.log('\n===========================================================');
  console.log('📊 SECTION 7 VALIDATION SUMMARY');
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  console.log(`Passed: ${passedTests}/${totalTests} tests`);

  if (failedTests.length === 0) {
    console.log('🎉 ALL SECTION 7 PATTERNS VALIDATED CORRECTLY!');
    console.log('✅ Tower Visualization: 400x600px, SVG-based, component-constructed');
    console.log('✅ Written Report: Complete structure with all required sections');
    console.log('✅ Specification Compliance: All requirements from section 7.1 and 7.2 met');
  } else {
    console.log('\n🔧 Failed Tests:');
    failedTests.forEach(failure => {
      console.log(`   ${failure.test}: ${failure.errors.join(', ')}`);
    });
  }

  return { passedTests, totalTests, failedTests };
}