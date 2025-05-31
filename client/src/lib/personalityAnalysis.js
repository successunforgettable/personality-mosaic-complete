/**
 * Personality Analysis Engine
 * Implements the algorithms from content_spec.md to analyze assessment results
 */

// Type mapping weights from Foundation Stones (content_spec.md Section 2.1)
const TYPE_WEIGHTS = {
  0: { // Stone Set 1: Decision-Making Center
    0: { 1: 6, 5: 5, 6: 4 }, // Thinking/Analysis/Logic -> Perfectionist, Investigator, Loyalist
    1: { 2: 6, 4: 5, 9: 4 }, // Feeling/Emotion/Connection -> Helper, Individualist, Peacemaker  
    2: { 7: 6, 8: 5, 3: 4 }  // Action/Instinct/Physicality -> Enthusiast (energy), Challenger, Achiever
  },
  1: { // Stone Set 2: Core Motivations  
    0: { 1: 6, 6: 5, 5: 4 }, // Preparation/Certainty/Security -> Perfectionist (order), Loyalist (security), Investigator (preparation)
    1: { 3: 6, 4: 5, 2: 4 }, // Authenticity/Image/Recognition -> Achiever (image), Individualist (authenticity), Helper (recognition)
    2: { 8: 6, 1: 4, 6: 3 }  // Justice/Control/Strength -> Challenger (control/justice), Perfectionist (justice), Loyalist (strength)
  },
  2: { // Stone Set 3: Energy Direction
    0: { 5: 6, 4: 5, 9: 4 }, // Reflection/Depth/Privacy -> Investigator, Individualist, Peacemaker
    1: { 7: 7, 3: 5, 8: 3 }, // Achievement/Influence/Impact -> Enthusiast (strong), Achiever, Challenger (reduced)
    2: { 1: 6, 9: 5, 2: 4 }  // Structure/Support/Harmony -> Perfectionist, Peacemaker, Helper
  },
  3: { // Stone Set 4: Social Approach
    0: { 5: 6, 1: 4, 4: 4 }, // Objectivity/Perspective/Space -> Investigator (objectivity), Perfectionist (perspective), Individualist (space)
    1: { 2: 6, 6: 4, 9: 4 }, // Closeness/Intimacy/Bonding -> Helper (closeness), Loyalist (bonding), Peacemaker (intimacy)
    2: { 7: 6, 8: 5, 3: 4 }  // Independence/Self-reliance/Freedom -> Enthusiast (freedom), Challenger, Achiever
  },
  4: { // Stone Set 5: Processing Style
    0: { 1: 6, 5: 5, 3: 4 }, // Systems/Concepts/Ideas -> Perfectionist (systems), Investigator (concepts), Achiever (ideas)
    1: { 4: 6, 7: 4, 2: 4 }, // Expression/Mood/Feeling -> Individualist (expression/mood), Enthusiast (expression), Helper (feeling)
    2: { 3: 6, 8: 5, 1: 4 }  // Results/Efficiency/Utility -> Achiever (results/efficiency), Challenger (results), Perfectionist (efficiency)
  },
  5: { // Stone Set 6: Stress Reaction
    0: { 1: 6, 6: 5, 5: 4 }, // Vigilance/Analysis/Foresight -> Perfectionist (vigilance), Loyalist (foresight), Investigator (analysis)
    1: { 4: 6, 7: 4, 3: 4 }, // Recognition/Identity/Uniqueness -> Individualist (identity/uniqueness), Enthusiast (recognition), Achiever (recognition)
    2: { 8: 6, 1: 4, 3: 4 }  // Authority/Power/Direction -> Challenger (power/authority), Perfectionist (direction), Achiever (authority)
  },
  6: { // Stone Set 7: Conflict Style
    0: { 9: 6, 2: 4, 5: 4 }, // Peace/Mediation/Compromise -> Peacemaker (peace/mediation), Helper (mediation), Investigator (compromise)
    1: { 7: 6, 3: 4, 2: 4 }, // Support/Flexibility/Adaptation -> Enthusiast (flexibility), Achiever (adaptation), Helper (support)
    2: { 8: 6, 1: 5, 6: 3 }  // Directness/Challenge/Honesty -> Challenger (directness/challenge), Perfectionist (honesty), Loyalist (directness)
  },
  7: { // Stone Set 8: Success Definition
    0: { 1: 6, 5: 4, 6: 4 }, // Accuracy/Principles/Improvement -> Perfectionist (accuracy/principles/improvement), Investigator (accuracy), Loyalist (principles)
    1: { 2: 6, 7: 4, 4: 4 }, // Connection/Acknowledgment/Appreciation -> Helper (connection), Enthusiast (acknowledgment), Individualist (appreciation)
    2: { 3: 6, 8: 5, 7: 4 }  // Mastery/Achievement/Capability -> Achiever (achievement/mastery), Challenger (capability), Enthusiast (mastery)
  },
  8: { // Stone Set 9: Relationship Priority
    0: { 5: 6, 4: 5, 1: 4 }, // Autonomy/Self-sufficiency/Space -> Investigator (autonomy), Individualist (self-sufficiency), Perfectionist (space)
    1: { 2: 6, 9: 5, 6: 4 }, // Mutuality/Sharing/Reciprocity -> Helper (mutuality/sharing), Peacemaker (reciprocity), Loyalist (mutuality)
    2: { 8: 6, 3: 4, 1: 4 }  // Leadership/Mentorship/Direction -> Challenger (leadership), Achiever (mentorship), Perfectionist (direction)
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

// Type names and descriptions (using approved terminology)
const TYPE_DESCRIPTIONS = {
  1: { name: "Reformer", description: "Integrity-Driven Excellence Pattern" },
  2: { name: "Helper", description: "Heart-Centered Service Pattern" },
  3: { name: "Achiever", description: "Success-Oriented Excellence Pattern" },
  4: { name: "Individualist", description: "Authentic Expression Pattern" },
  5: { name: "Investigator", description: "Knowledge-Seeking Understanding Pattern" },
  6: { name: "Sentinel", description: "Security-Oriented Loyalty Pattern" },
  7: { name: "Enthusiast", description: "Future-Focused Possibility Pattern" },
  8: { name: "Challenger", description: "Power-Assertive Leadership Pattern" },
  9: { name: "Peacemaker", description: "Harmony-Seeking Unity Pattern" }
};

// Heart Activation State mappings (replacing traditional state names)
const HEART_ACTIVATION_STATES = {
  0: { name: 'Fully Activated Heart State', range: '80-100%', description: 'Operating with optimal heart activation and authentic expression' },
  1: { name: 'Engaged Heart State', range: '60-79%', description: 'Heart is engaged with good energy flow and connection' },
  2: { name: 'Partially Activated Heart State', range: '40-59%', description: 'Heart activation is moderate with room for growth' },
  3: { name: 'Restricted Heart State', range: '20-39%', description: 'Heart activation is limited, affecting authentic expression' },
  4: { name: 'Disconnected Heart State', range: '0-19%', description: 'Heart activation is very low, needing support and care' }
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
 * Determine influence from building block selections (using approved terminology)
 */
export function determineInfluence(primaryType, blockSelections) {
  if (!blockSelections || blockSelections.length === 0) return null;
  
  // Influence mapping based on first building block selection
  const influenceMap = {
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
  
  const influence = influenceMap[primaryType];
  const influenceStrength = blockSelections.length > 1 && blockSelections[1]?.id?.includes('left') ? 'strong' : 'moderate';
  
  return {
    fullType: `${TYPE_DESCRIPTIONS[primaryType].name} ${influence}`,
    influenceNumber: influence,
    strength: influenceStrength,
    description: `${TYPE_DESCRIPTIONS[primaryType].name} with ${influence} influence`
  };
}

/**
 * Determine mood patterns from building block selections (using approved terminology)
 */
export function determineMoodPatterns(primaryType, blockSelections) {
  if (!blockSelections || blockSelections.length < 3) return null;
  
  const arrows = ARROW_MAP[primaryType];
  if (!arrows) return null;
  
  // Good mood strength from 3rd block selection
  const goodMoodStrength = blockSelections[2]?.id?.includes('left') ? 'strong' : 'moderate';
  
  // Bad mood strength from 4th block selection (if available)
  const badMoodStrength = blockSelections.length > 3 && 
    blockSelections[3]?.id?.includes('left') ? 'strong' : 'moderate';
  
  return {
    goodMood: {
      type: arrows.integration,
      strength: goodMoodStrength,
      description: `When you're in a good mood, you tend to be more like Type ${arrows.integration}`
    },
    badMood: {
      type: arrows.disintegration,
      strength: badMoodStrength,
      description: `When you're in a bad mood, you tend to be more like Type ${arrows.disintegration}`
    }
  };
}

/**
 * Analyze heart activation from color selections (using approved terminology)
 */
export function analyzeHeartActivation(colorSelections, primaryType) {
  if (!colorSelections || colorSelections.length === 0) return null;
  
  // Map color categories to heart activation levels
  const activationMap = {
    0: { level: 1, name: 'Engaged Heart State' }, // Primary Energy Colors
    1: { level: 2, name: 'Partially Activated Heart State' }, // Secondary Mood Colors  
    2: { level: 0, name: 'Fully Activated Heart State' }   // Accent Colors
  };
  
  const activationDistribution = {};
  let totalActivation = 0;
  let colorCount = 0;
  
  colorSelections.forEach(color => {
    const activation = activationMap[color.category];
    if (!activationDistribution[activation.name]) {
      activationDistribution[activation.name] = [];
    }
    activationDistribution[activation.name].push(color);
    totalActivation += (2 - activation.level); // Higher number = better activation
    colorCount++;
  });
  
  // Calculate average activation percentage
  const activationPercentage = Math.round((totalActivation / (colorCount * 2)) * 100);
  
  // Determine dominant activation state
  const dominantState = Object.keys(activationDistribution)
    .reduce((a, b) => activationDistribution[a].length > activationDistribution[b].length ? a : b);
  
  // Get state details from mapping
  const stateDetails = Object.values(HEART_ACTIVATION_STATES).find(state => 
    state.name === dominantState
  ) || HEART_ACTIVATION_STATES[1];
  
  return {
    distribution: activationDistribution,
    dominantState,
    activationPercentage,
    stateColors: colorSelections,
    stateDetails,
    analysis: `Your heart activation level is at ${activationPercentage}% - ${stateDetails.description}`
  };
}

/**
 * Analyze subtype focus from detail selections (using proper ordering)
 */
export function analyzeSubtypeFocus(detailSelections) {
  if (!detailSelections || detailSelections.length === 0) return null;
  
  const focusCounts = { sp: 0, so: 0, sx: 0 };
  
  detailSelections.forEach(detail => {
    if (detail.id.startsWith('sp-')) focusCounts.sp++;
    else if (detail.id.startsWith('so-')) focusCounts.so++;
    else if (detail.id.startsWith('sx-')) focusCounts.sx++;
  });
  
  const total = focusCounts.sp + focusCounts.so + focusCounts.sx;
  const percentages = {
    sp: Math.round((focusCounts.sp / total) * 100),
    so: Math.round((focusCounts.so / total) * 100),
    sx: Math.round((focusCounts.sx / total) * 100)
  };
  
  // Create ordered stack from highest to lowest
  const orderedFocus = Object.entries(percentages)
    .sort(([,a], [,b]) => b - a)
    .map(([focus, percentage]) => ({ focus, percentage }));
  
  const focusNames = {
    sp: 'Self-Preservation',
    so: 'Social', 
    sx: 'One-to-One'
  };
  
  const dominantFocus = orderedFocus[0].focus;
  const focusStack = orderedFocus.map(item => item.focus.toUpperCase()).join('/');
  
  return {
    counts: focusCounts,
    percentages,
    orderedFocus,
    dominantFocus,
    dominantName: focusNames[dominantFocus],
    focusStack,
    stackDescription: `${focusNames[orderedFocus[0].focus]} primary (${orderedFocus[0].percentage}%), ${focusNames[orderedFocus[1].focus]} secondary (${orderedFocus[1].percentage}%), ${focusNames[orderedFocus[2].focus]} tertiary (${orderedFocus[2].percentage}%)`
  };
}

/**
 * Generate complete personality analysis using approved terminology
 */
export function generatePersonalityAnalysis(assessmentData) {
  const { foundationSelections, buildingBlockSelections, colorPaletteSelections, detailSelections } = assessmentData;
  
  // Calculate core type
  const typeAnalysis = calculateTypeScore(foundationSelections);
  const primaryType = typeAnalysis.primaryType;
  
  // Determine influence (replacing wing terminology)
  const influenceAnalysis = determineInfluence(primaryType, buildingBlockSelections);
  
  // Determine mood patterns (replacing arrow terminology)
  const moodAnalysis = determineMoodPatterns(primaryType, buildingBlockSelections);
  
  // Analyze heart activation (replacing state terminology)
  const heartActivation = analyzeHeartActivation(colorPaletteSelections, primaryType);
  
  // Analyze subtype focus (with proper ordering)
  const subtypeFocus = analyzeSubtypeFocus(detailSelections);
  
  return {
    primaryType: {
      number: primaryType,
      name: TYPE_DESCRIPTIONS[primaryType].name,
      description: TYPE_DESCRIPTIONS[primaryType].description,
      confidence: typeAnalysis.confidence,
      scores: typeAnalysis.scores,
      topThree: typeAnalysis.topThree
    },
    influence: influenceAnalysis,
    moodPatterns: moodAnalysis,
    heartActivation: heartActivation,
    subtypeFocus: subtypeFocus,
    summary: {
      fullType: influenceAnalysis ? influenceAnalysis.fullType : `${TYPE_DESCRIPTIONS[primaryType].name}`,
      dominantFocus: subtypeFocus?.dominantName || 'Unknown',
      heartActivationLevel: heartActivation?.activationPercentage || 'Unknown',
      goodMoodType: moodAnalysis?.goodMood.type || 'Unknown',
      badMoodType: moodAnalysis?.badMood.type || 'Unknown'
    }
  };
}