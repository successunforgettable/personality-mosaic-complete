/**
 * Debug validation to see exactly what's happening with scoring
 */

import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';

export function debugPerfectionistScoring() {
  const perfectionistPattern = {
    foundationSelections: [0, 0, 0, 1, 0, 0, 1, 0, 1], // All systematic/structured choices
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
    ]
  };

  console.log("PERFECTIONIST PATTERN ANALYSIS:");
  console.log("Foundation selections:", perfectionistPattern.foundationSelections);
  
  // Show what each foundation choice should score
  console.log("\nExpected scoring for each foundation choice:");
  console.log("Choice 0 (set 0): Should strongly favor Type 1 (systematic/thinking)");
  console.log("Choice 0 (set 1): Should favor Type 6 (security) - this might be the problem");
  console.log("Choice 0 (set 2): Should favor Type 5 (reflection/privacy)");
  console.log("And so on...");

  const result = generatePersonalityAnalysis(perfectionistPattern);
  
  console.log("\nACTUAL RESULTS:");
  console.log("All scores:", result.primaryType.scores);
  console.log("Detected:", result.primaryType.number, "with", result.primaryType.confidence + "%");
  
  return result;
}

export function debugEnthusiastScoring() {
  const enthusiastPattern = {
    foundationSelections: [2, 2, 2, 2, 2, 1, 2, 2, 2], // All optimistic/dynamic choices
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
    ]
  };

  console.log("\nENTHUSIAST PATTERN ANALYSIS:");
  console.log("Foundation selections:", enthusiastPattern.foundationSelections);
  
  console.log("\nExpected scoring for each foundation choice:");
  console.log("Choice 2 (set 0): Should favor Type 8 (action/instinct) - this might be wrong");
  console.log("Choice 2 (set 1): Should favor Type 8 (justice/control) - this might be wrong");
  console.log("Choice 1 (set 5): Should favor Type 7 (recognition/identity) - might be wrong");
  
  const result = generatePersonalityAnalysis(enthusiastPattern);
  
  console.log("\nACTUAL RESULTS:");
  console.log("All scores:", result.primaryType.scores);
  console.log("Detected:", result.primaryType.number, "with", result.primaryType.confidence + "%");
  
  return result;
}