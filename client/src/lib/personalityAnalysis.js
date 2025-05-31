/**
 * Personality Analysis Engine
 * Implements the algorithms from content_spec.md to analyze assessment results
 */

// Type mapping weights from Foundation Stones (content_spec.md Section 2.1)
const TYPE_WEIGHTS = {
  0: { // Stone Set 1: Decision-Making Center
    0: { 5: 3, 6: 3, 7: 3, 1: 2, 3: 2 }, // Thinking/Analysis/Logic
    1: { 2: 3, 3: 3, 4: 3, 6: 2, 9: 2 }, // Feeling/Emotion/Connection
    2: { 8: 3, 1: 3, 9: 3, 3: 2, 7: 2 }  // Action/Instinct/Physicality
  },
  1: { // Stone Set 2: Core Motivations
    0: { 5: 3, 6: 3, 1: 2, 9: 2 }, // Preparation/Certainty/Security
    1: { 2: 3, 3: 3, 4: 3, 7: 2, 8: 2 }, // Authenticity/Image/Recognition
    2: { 1: 3, 8: 3, 3: 2, 6: 2 }  // Justice/Control/Strength
  },
  2: { // Stone Set 3: Energy Direction
    0: { 4: 3, 5: 3, 9: 3, 1: 2, 6: 2 }, // Reflection/Depth/Privacy
    1: { 3: 3, 7: 3, 8: 3, 1: 2, 2: 2 }, // Achievement/Influence/Impact
    2: { 1: 3, 2: 3, 6: 3, 9: 3, 3: 2, 5: 2 } // Structure/Support/Harmony
  },
  3: { // Stone Set 4: Social Approach
    0: { 5: 3, 9: 3, 4: 2, 1: 2 }, // Objectivity/Perspective/Space
    1: { 2: 3, 6: 3, 4: 2, 9: 2 }, // Closeness/Intimacy/Bonding
    2: { 4: 3, 8: 3, 5: 2, 7: 2 }  // Independence/Self-reliance/Freedom
  },
  4: { // Stone Set 5: Processing Style
    0: { 5: 3, 6: 3, 1: 3, 7: 2, 3: 2 }, // Systems/Concepts/Ideas
    1: { 4: 3, 2: 3, 7: 2, 9: 2 }, // Expression/Mood/Feeling
    2: { 3: 3, 8: 3, 1: 2, 7: 2 }  // Results/Efficiency/Utility
  },
  5: { // Stone Set 6: Stress Reaction
    0: { 5: 3, 6: 3, 1: 2, 9: 2 }, // Vigilance/Analysis/Foresight
    1: { 2: 3, 3: 3, 4: 3, 7: 2, 8: 2 }, // Recognition/Identity/Uniqueness
    2: { 1: 3, 8: 3, 3: 2, 6: 2 }  // Authority/Power/Direction
  },
  6: { // Stone Set 7: Conflict Style
    0: { 9: 3, 2: 3, 4: 2, 6: 2 }, // Peace/Mediation/Compromise
    1: { 2: 3, 7: 3, 9: 2, 3: 2 }, // Support/Flexibility/Adaptation
    2: { 8: 3, 1: 3, 3: 2, 6: 2 }  // Directness/Challenge/Honesty
  },
  7: { // Stone Set 8: Success Definition
    0: { 1: 3, 5: 3, 3: 2, 6: 2 }, // Accuracy/Principles/Improvement
    1: { 2: 3, 4: 3, 7: 2, 9: 2 }, // Connection/Acknowledgment/Appreciation
    2: { 3: 3, 8: 3, 1: 2, 7: 2 }  // Mastery/Achievement/Capability
  },
  8: { // Stone Set 9: Relationship Priority
    0: { 4: 3, 5: 3, 8: 3, 1: 2, 7: 2 }, // Autonomy/Self-sufficiency/Space
    1: { 2: 3, 6: 3, 9: 3, 3: 2, 7: 2 }, // Mutuality/Sharing/Reciprocity
    2: { 1: 3, 3: 3, 8: 3, 2: 2, 6: 2 }  // Leadership/Mentorship/Direction
  }
};

// Arrow mappings for integration and disintegration
const ARROW_MAP = {
  1: { integration: 7, disintegration: 4 },
  2: { integration: 4, disintegration: 8 },
  3: { integration: 6, disintegration: 9 },
  4: { integration: 1, disintegration: 2 },
  5: { integration: 8, disintegration: 7 },
  6: { integration: 9, disintegration: 3 },
  7: { integration: 5, disintegration: 1 },
  8: { integration: 2, disintegration: 5 },
  9: { integration: 3, disintegration: 6 }
};

// Type names and descriptions
const TYPE_DESCRIPTIONS = {
  1: { name: "Reformer", description: "Integrity-Driven Excellence Pattern" },
  2: { name: "Helper", description: "Heart-Centered Service Pattern" },
  3: { name: "Achiever", description: "Success-Oriented Excellence Pattern" },
  4: { name: "Individualist", description: "Authentic Expression Pattern" },
  5: { name: "Investigator", description: "Knowledge-Seeking Understanding Pattern" },
  6: { name: "Loyalist", description: "Security-Oriented Loyalty Pattern" },
  7: { name: "Enthusiast", description: "Future-Focused Possibility Pattern" },
  8: { name: "Challenger", description: "Power-Assertive Leadership Pattern" },
  9: { name: "Peacemaker", description: "Harmony-Seeking Unity Pattern" }
};

/**
 * Calculate personality type from foundation selections
 */
export function calculateTypeScore(selections) {
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  
  selections.forEach((selection, setIndex) => {
    const weights = TYPE_WEIGHTS[setIndex];
    if (weights && weights[selection]) {
      Object.entries(weights[selection]).forEach(([type, weight]) => {
        scores[parseInt(type)] += weight;
      });
    }
  });
  
  // Find primary type (highest score)
  const sortedTypes = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([type, score]) => ({ type: parseInt(type), score }));
  
  const primaryType = sortedTypes[0].type;
  const confidence = (sortedTypes[0].score / (sortedTypes[0].score + sortedTypes[1].score)) * 100;
  
  return {
    primaryType,
    scores,
    confidence: Math.round(confidence),
    topThree: sortedTypes.slice(0, 3)
  };
}

/**
 * Determine wing from building block selections
 */
export function determineWing(primaryType, blockSelections) {
  if (!blockSelections || blockSelections.length === 0) return null;
  
  // Wing mapping based on first building block selection
  const wingMap = {
    1: blockSelections[0]?.id?.includes('left') ? 9 : 2,
    2: blockSelections[0]?.id?.includes('left') ? 1 : 3,
    3: blockSelections[0]?.id?.includes('left') ? 2 : 4,
    4: blockSelections[0]?.id?.includes('left') ? 3 : 5,
    5: blockSelections[0]?.id?.includes('left') ? 4 : 6,
    6: blockSelections[0]?.id?.includes('left') ? 5 : 7,
    7: blockSelections[0]?.id?.includes('left') ? 6 : 8,
    8: blockSelections[0]?.id?.includes('left') ? 7 : 9,
    9: blockSelections[0]?.id?.includes('left') ? 8 : 1
  };
  
  const wing = wingMap[primaryType];
  const wingStrength = blockSelections.length > 1 && blockSelections[1]?.id?.includes('left') ? 'strong' : 'moderate';
  
  return {
    wing: `${primaryType}w${wing}`,
    wingNumber: wing,
    strength: wingStrength,
    description: `${TYPE_DESCRIPTIONS[primaryType].name} ${wing}`
  };
}

/**
 * Determine arrows from building block selections
 */
export function determineArrows(primaryType, blockSelections) {
  if (!blockSelections || blockSelections.length < 3) return null;
  
  const arrows = ARROW_MAP[primaryType];
  if (!arrows) return null;
  
  // Integration strength from 3rd block selection
  const integrationStrength = blockSelections[2]?.id?.includes('left') ? 'strong' : 'moderate';
  
  // Disintegration strength from 4th block selection (if available)
  const disintegrationStrength = blockSelections.length > 3 && 
    blockSelections[3]?.id?.includes('left') ? 'strong' : 'moderate';
  
  return {
    integration: {
      type: arrows.integration,
      strength: integrationStrength,
      description: `Moves toward ${TYPE_DESCRIPTIONS[arrows.integration].name} when growing`
    },
    disintegration: {
      type: arrows.disintegration,
      strength: disintegrationStrength,
      description: `Moves toward ${TYPE_DESCRIPTIONS[arrows.disintegration].name} under stress`
    }
  };
}

/**
 * Analyze state distribution from color selections
 */
export function analyzeStates(colorSelections, primaryType) {
  if (!colorSelections || colorSelections.length === 0) return null;
  
  // Map color categories to states
  const stateMap = {
    0: 'Engaged', // Primary Energy Colors
    1: 'Balanced', // Secondary Mood Colors  
    2: 'Focused'   // Accent Colors
  };
  
  const stateDistribution = {};
  colorSelections.forEach(color => {
    const state = stateMap[color.category];
    if (!stateDistribution[state]) {
      stateDistribution[state] = [];
    }
    stateDistribution[state].push(color);
  });
  
  // Find dominant state
  const dominantState = Object.keys(stateDistribution)
    .reduce((a, b) => stateDistribution[a].length > stateDistribution[b].length ? a : b);
  
  return {
    distribution: stateDistribution,
    dominantState,
    stateColors: colorSelections,
    analysis: `Your color palette suggests you operate primarily in a ${dominantState.toLowerCase()} state`
  };
}

/**
 * Analyze subtype distribution from detail selections
 */
export function analyzeSubtypes(detailSelections) {
  if (!detailSelections || detailSelections.length === 0) return null;
  
  const subtypeCounts = { sp: 0, so: 0, sx: 0 };
  
  detailSelections.forEach(detail => {
    if (detail.id.startsWith('sp-')) subtypeCounts.sp++;
    else if (detail.id.startsWith('so-')) subtypeCounts.so++;
    else if (detail.id.startsWith('sx-')) subtypeCounts.sx++;
  });
  
  const total = subtypeCounts.sp + subtypeCounts.so + subtypeCounts.sx;
  const percentages = {
    sp: Math.round((subtypeCounts.sp / total) * 100),
    so: Math.round((subtypeCounts.so / total) * 100),
    sx: Math.round((subtypeCounts.sx / total) * 100)
  };
  
  // Find dominant subtype
  const dominantSubtype = Object.keys(subtypeCounts)
    .reduce((a, b) => subtypeCounts[a] > subtypeCounts[b] ? a : b);
  
  const subtypeNames = {
    sp: 'Self-Preservation',
    so: 'Social',
    sx: 'One-to-One (Sexual)'
  };
  
  return {
    counts: subtypeCounts,
    percentages,
    dominantSubtype,
    dominantName: subtypeNames[dominantSubtype],
    stack: `${dominantSubtype}/${Object.keys(percentages).filter(k => k !== dominantSubtype).sort((a,b) => percentages[b] - percentages[a])[0]}/${Object.keys(percentages).filter(k => k !== dominantSubtype).sort((a,b) => percentages[a] - percentages[b])[0]}`
  };
}

/**
 * Generate complete personality analysis
 */
export function generatePersonalityAnalysis(assessmentData) {
  const { foundationSelections, buildingBlockSelections, colorPaletteSelections, detailSelections } = assessmentData;
  
  // Calculate core type
  const typeAnalysis = calculateTypeScore(foundationSelections);
  const primaryType = typeAnalysis.primaryType;
  
  // Determine wing
  const wingAnalysis = determineWing(primaryType, buildingBlockSelections);
  
  // Determine arrows
  const arrowAnalysis = determineArrows(primaryType, buildingBlockSelections);
  
  // Analyze states
  const stateAnalysis = analyzeStates(colorPaletteSelections, primaryType);
  
  // Analyze subtypes
  const subtypeAnalysis = analyzeSubtypes(detailSelections);
  
  return {
    primaryType: {
      number: primaryType,
      name: TYPE_DESCRIPTIONS[primaryType].name,
      description: TYPE_DESCRIPTIONS[primaryType].description,
      confidence: typeAnalysis.confidence,
      scores: typeAnalysis.scores,
      topThree: typeAnalysis.topThree
    },
    wing: wingAnalysis,
    arrows: arrowAnalysis,
    states: stateAnalysis,
    subtypes: subtypeAnalysis,
    summary: {
      fullType: wingAnalysis ? `${wingAnalysis.wing}` : `Type ${primaryType}`,
      dominantSubtype: subtypeAnalysis?.dominantName || 'Unknown',
      dominantState: stateAnalysis?.dominantState || 'Unknown',
      integrationDirection: arrowAnalysis?.integration.type || 'Unknown',
      stressDirection: arrowAnalysis?.disintegration.type || 'Unknown'
    }
  };
}