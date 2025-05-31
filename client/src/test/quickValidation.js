/**
 * Quick Algorithm Validation Test
 */

import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';

// Simple test patterns
const testPatterns = {
  perfectionist: {
    foundationSelections: [0, 0, 0, 1, 0, 0, 1, 0, 1],
    buildingBlockSelections: [
      {id: "b1-left", title: "Systematic Approach"},
      {id: "b2-left", title: "Individual Focus"}, 
      {id: "b3-left", title: "Detail Oriented"},
      {id: "b4-left", title: "Steady Pace"},
      {id: "b5-left", title: "Theoretical"}
    ],
    colorPaletteSelections: [
      {id: "blue", name: "Deep Blue", hex: "#2563eb", category: 0}, 
      {id: "green", name: "Natural Green", hex: "#059669", category: 0},
      {id: "teal", name: "Calm Teal", hex: "#0d9488", category: 1}, 
      {id: "navy", name: "Deep Navy", hex: "#1e40af", category: 1},
      {id: "gray", name: "Sophisticated Gray", hex: "#6b7280", category: 2}, 
      {id: "silver", name: "Modern Silver", hex: "#64748b", category: 2}
    ],
    detailSelections: [
      {id: "sp-security", category: "sp"}, {id: "sp-comfort", category: "sp"}, {id: "so-belonging", category: "so"},
      {id: "sp-stability", category: "sp"}, {id: "sp-resources", category: "sp"}, {id: "so-status", category: "so"},
      {id: "sp-health", category: "sp"}, {id: "sx-attraction", category: "sx"}, {id: "sp-routine", category: "sp"}
    ],
    expectedType: 1
  },

  enthusiast: {
    foundationSelections: [2, 2, 2, 2, 2, 1, 2, 2, 2],
    buildingBlockSelections: [
      {id: "b1-right", title: "Intuitive Approach"},
      {id: "b2-right", title: "Group Focus"},
      {id: "b3-right", title: "Big Picture"},
      {id: "b4-right", title: "Dynamic Pace"},
      {id: "b5-right", title: "Practical"}
    ],
    colorPaletteSelections: [
      {id: "orange", name: "Vibrant Orange", hex: "#ea580c", category: 0}, 
      {id: "yellow", name: "Bright Yellow", hex: "#ca8a04", category: 0},
      {id: "coral", name: "Living Coral", hex: "#f97316", category: 1}, 
      {id: "amber", name: "Golden Amber", hex: "#d97706", category: 1},
      {id: "gold", name: "Bright Gold", hex: "#f59e0b", category: 2}, 
      {id: "lime", name: "Electric Lime", hex: "#84cc16", category: 2}
    ],
    detailSelections: [
      {id: "so-social", category: "so"}, {id: "so-networking", category: "so"}, {id: "sx-intensity", category: "sx"},
      {id: "so-recognition", category: "so"}, {id: "so-community", category: "so"}, {id: "so-belonging", category: "so"},
      {id: "sx-connection", category: "sx"}, {id: "so-influence", category: "so"}, {id: "sp-energy", category: "sp"}
    ],
    expectedType: 7
  }
};

export function runQuickValidation() {
  console.log("Running Quick Algorithm Validation...");
  const results = [];

  for (const [name, pattern] of Object.entries(testPatterns)) {
    try {
      const result = generatePersonalityAnalysis(pattern);
      
      const analysis = {
        testName: name,
        expectedType: pattern.expectedType,
        detectedType: result.primaryType.number,
        confidence: result.primaryType.confidence,
        topThree: result.primaryType.topThree,
        wing: result.influence?.influenceNumber,
        subtype: result.subtypeFocus?.dominantFocus,
        typeMatch: result.primaryType.number === pattern.expectedType,
        scores: result.primaryType.scores
      };

      results.push(analysis);
      
      console.log(`\n${name.toUpperCase()}:`);
      console.log(`Expected: Type ${pattern.expectedType}`);
      console.log(`Detected: Type ${result.primaryType.number} (${result.primaryType.confidence}% confidence)`);
      console.log(`Match: ${analysis.typeMatch ? 'YES' : 'NO'}`);
      console.log(`Top 3: ${result.primaryType.topThree.map(t => `${t.type}(${t.score})`).join(', ')}`);
      console.log(`Wing: ${result.influence?.influenceNumber || 'None'}`);
      console.log(`Subtype: ${result.subtypeFocus?.dominantFocus || 'Unknown'}`);
      
    } catch (error) {
      console.error(`Error testing ${name}:`, error.message);
      results.push({
        testName: name,
        error: error.message,
        typeMatch: false
      });
    }
  }

  const passed = results.filter(r => r.typeMatch).length;
  const total = results.length;
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Success Rate: ${Math.round((passed/total) * 100)}%`);
  console.log(`Passed: ${passed}/${total}`);
  
  return results;
}