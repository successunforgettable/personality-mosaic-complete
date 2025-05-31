/**
 * Personality Analysis Engine
 * Implements the algorithms from content_spec.md to analyze assessment results
 */

// Foundation Stone scoring algorithm - EXACT implementation from specification section 3.4
function calculatePersonalityScores(foundationSelections) {
  // Initialize scores for each type
  const typeScores = {
    type1: 0, type2: 0, type3: 0, type4: 0, type5: 0,
    type6: 0, type7: 0, type8: 0, type9: 0
  };

  // Weights for each selection set per specification
  const setWeights = [2.0, 2.5, 1.5, 1.0, 1.0, 1.5, 1.0, 1.0, 1.0];

  // Set 1: Decision-Making Center
  if (foundationSelections[0] === 0) { // Stone A (Head)
    typeScores.type5 += 3 * setWeights[0];
    typeScores.type6 += 2 * setWeights[0];
    typeScores.type7 += 1 * setWeights[0];
  } else if (foundationSelections[0] === 1) { // Stone B (Heart)
    typeScores.type2 += 3 * setWeights[0];
    typeScores.type3 += 2 * setWeights[0];
    typeScores.type4 += 3 * setWeights[0];
  } else if (foundationSelections[0] === 2) { // Stone C (Body)
    typeScores.type1 += 2 * setWeights[0];
    typeScores.type8 += 3 * setWeights[0];
    typeScores.type9 += 2 * setWeights[0];
  }

  // Set 2: Core Motivation
  if (foundationSelections[1] === 0) { // Stone A (Fear)
    typeScores.type5 += 2 * setWeights[1];
    typeScores.type6 += 3 * setWeights[1];
    typeScores.type7 += 1 * setWeights[1];
  } else if (foundationSelections[1] === 1) { // Stone B (Shame)
    typeScores.type2 += 2 * setWeights[1];
    typeScores.type3 += 3 * setWeights[1];
    typeScores.type4 += 3 * setWeights[1];
  } else if (foundationSelections[1] === 2) { // Stone C (Anger)
    typeScores.type1 += 3 * setWeights[1];
    typeScores.type8 += 3 * setWeights[1];
    typeScores.type9 += 2 * setWeights[1];
  }

  // Set 3: Behavioral Response
  if (foundationSelections[2] === 0) { // Stone A (Withdrawn)
    typeScores.type4 += 3 * setWeights[2];
    typeScores.type5 += 2 * setWeights[2];
    typeScores.type9 += 2 * setWeights[2];
  } else if (foundationSelections[2] === 1) { // Stone B (Assertive)
    typeScores.type3 += 3 * setWeights[2];
    typeScores.type7 += 2 * setWeights[2];
    typeScores.type8 += 2 * setWeights[2];
  } else if (foundationSelections[2] === 2) { // Stone C (Compliant)
    typeScores.type1 += 2 * setWeights[2];
    typeScores.type2 += 2 * setWeights[2];
    typeScores.type6 += 3 * setWeights[2];
  }

  // Sets 4-9: Use legacy weights for compatibility until full specification is available
  const legacyWeights = TYPE_WEIGHTS;
  for (let i = 3; i < foundationSelections.length && i < 9; i++) {
    const selection = foundationSelections[i];
    const weights = legacyWeights[i];
    if (weights && weights[selection]) {
      Object.entries(weights[selection]).forEach(([type, weight]) => {
        const typeKey = `type${type}`;
        if (typeScores[typeKey] !== undefined) {
          typeScores[typeKey] += weight;
        }
      });
    }
  }

  return typeScores;
}

// Legacy type weights (keeping for backward compatibility)
const TYPE_WEIGHTS = {
  1: { // Stone Set 2: Core Motivations  
    0: { 6: 7, 1: 3, 5: 4 }, // Preparation/Certainty/Security -> Loyalist (security focus), Perfectionist (reduced), Investigator (preparation)
    1: { 3: 6, 7: 4, 4: 4, 2: 3 }, // Authenticity/Image/Recognition -> Achiever (image/success), Enthusiast (recognition), Individualist (authenticity), Helper (recognition)
    2: { 8: 6, 1: 4, 6: 3 }  // Justice/Control/Strength -> Challenger (control/justice), Perfectionist (justice), Loyalist (strength)
  },
  2: { // Stone Set 3: Energy Direction
    0: { 5: 6, 4: 5, 9: 4 }, // Reflection/Depth/Privacy -> Investigator, Individualist, Peacemaker
    1: { 7: 6, 3: 5, 8: 3 }, // Achievement/Influence/Impact -> Enthusiast (variety/energy), Achiever (achievement focus), Challenger
    2: { 9: 7, 1: 4, 2: 3 }  // Structure/Support/Harmony -> Peacemaker (harmony focus), Perfectionist (reduced), Helper (reduced)
  },
  3: { // Stone Set 4: Social Approach
    0: { 5: 6, 1: 4, 4: 4 }, // Objectivity/Perspective/Space -> Investigator (objectivity), Perfectionist (perspective), Individualist (space)
    1: { 6: 7, 9: 5, 2: 4 }, // Closeness/Intimacy/Bonding -> Loyalist (bonding/trust), Peacemaker (intimacy/peace), Helper (closeness)
    2: { 7: 6, 3: 5, 8: 4 }  // Independence/Self-reliance/Freedom -> Enthusiast (freedom), Achiever (independence), Challenger
  },
  4: { // Stone Set 5: Processing Style
    0: { 1: 6, 5: 5, 3: 4 }, // Systems/Concepts/Ideas -> Perfectionist (systems), Investigator (concepts), Achiever (ideas)
    1: { 7: 6, 4: 5, 2: 4 }, // Expression/Mood/Feeling -> Enthusiast (expression/optimism), Individualist (expression/mood), Helper (feeling)
    2: { 7: 6, 3: 5, 8: 3, 1: 4 }  // Results/Efficiency/Utility -> Enthusiast (results from variety), Achiever (results/efficiency), Challenger (reduced), Perfectionist (efficiency)
  },
  5: { // Stone Set 6: Stress Reaction
    0: { 1: 6, 6: 5, 5: 4 }, // Vigilance/Analysis/Foresight -> Perfectionist (vigilance), Loyalist (foresight), Investigator (analysis)
    1: { 7: 6, 4: 5, 3: 4 }, // Recognition/Identity/Uniqueness -> Enthusiast (recognition/excitement), Individualist (identity/uniqueness), Achiever (recognition)
    2: { 8: 6, 1: 4, 3: 4 }  // Authority/Power/Direction -> Challenger (power/authority), Perfectionist (direction), Achiever (authority)
  },
  6: { // Stone Set 7: Conflict Style
    0: { 9: 7, 5: 4, 2: 3 }, // Peace/Mediation/Compromise -> Peacemaker (strong peace focus), Investigator (compromise), Helper (reduced)
    1: { 2: 6, 7: 4, 3: 4 }, // Support/Flexibility/Adaptation -> Helper (support), Enthusiast (flexibility), Achiever (adaptation)
    2: { 8: 6, 1: 5, 7: 4, 6: 3 }  // Directness/Challenge/Honesty -> Challenger (directness/challenge), Perfectionist (honesty), Enthusiast, Loyalist (directness)
  },
  7: { // Stone Set 8: Success Definition
    0: { 1: 6, 5: 4, 6: 4 }, // Accuracy/Principles/Improvement -> Perfectionist (accuracy/principles/improvement), Investigator (accuracy), Loyalist (principles)
    1: { 9: 6, 2: 5, 7: 4, 4: 4 }, // Connection/Acknowledgment/Appreciation -> Peacemaker (appreciation/harmony), Helper (connection), Enthusiast (acknowledgment), Individualist (appreciation)
    2: { 3: 7, 7: 4, 8: 4 }  // Mastery/Achievement/Capability -> Achiever (achievement/mastery focus), Enthusiast (mastery through experiences), Challenger (capability)
  },
  8: { // Stone Set 9: Relationship Priority
    0: { 5: 6, 4: 5, 1: 4 }, // Autonomy/Self-sufficiency/Space -> Investigator (autonomy), Individualist (self-sufficiency), Perfectionist (space)
    1: { 9: 6, 2: 5, 6: 4 }, // Mutuality/Sharing/Reciprocity -> Peacemaker (reciprocity/harmony), Helper (mutuality/sharing), Loyalist (mutuality)
    2: { 3: 6, 8: 5, 7: 4, 1: 3 }  // Leadership/Mentorship/Direction -> Achiever (mentorship/direction), Challenger (leadership), Enthusiast, Perfectionist (direction)
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
 * Calculate personality type from foundation selections - EXACT specification implementation
 */
export function calculateTypeScore(selections) {
  // Use the exact specification algorithm
  const typeScores = calculatePersonalityScores(selections);
  
  // Convert to legacy format for compatibility
  const scores = {
    1: typeScores.type1,
    2: typeScores.type2,
    3: typeScores.type3,
    4: typeScores.type4,
    5: typeScores.type5,
    6: typeScores.type6,
    7: typeScores.type7,
    8: typeScores.type8,
    9: typeScores.type9
  };
  
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
    wing: influence,
    influenceNumber: influence,
    strength: influenceStrength,
    description: `${TYPE_DESCRIPTIONS[primaryType].name} with ${influence} influence`
  };
}

/**
 * Determine mood patterns from building block selections - EXACT specification implementation from section 4.6
 */
export function determineMoodPatterns(primaryType, blockSelections) {
  if (!blockSelections || blockSelections.length < 4) return null;
  
  // Good mood and bad mood direction map - EXACT from specification section 4.6
  const moodMap = {
    1: { goodMood: 7, badMood: 4 },
    2: { goodMood: 4, badMood: 8 },
    3: { goodMood: 6, badMood: 9 },
    4: { goodMood: 1, badMood: 2 },
    5: { goodMood: 8, badMood: 7 },
    6: { goodMood: 9, badMood: 3 },
    7: { goodMood: 5, badMood: 1 },
    8: { goodMood: 2, badMood: 5 },
    9: { goodMood: 3, badMood: 6 }
  };

  // Type names mapping for internal reference
  const typeNames = {
    1: 'Reformer',
    2: 'Helper',
    3: 'Achiever',
    4: 'Individualist',
    5: 'Investigator',
    6: 'Sentinel',
    7: 'Enthusiast',
    8: 'Challenger',
    9: 'Peacemaker'
  };

  // 3rd block selection confirms good mood traits
  const goodMoodType = moodMap[primaryType].goodMood;
  const goodMoodStrength = blockSelections[2]?.id?.includes('left') ? 'strong' : 'moderate';

  // 4th block selection confirms bad mood traits  
  const badMoodType = moodMap[primaryType].badMood;
  const badMoodStrength = blockSelections[3]?.id?.includes('left') ? 'strong' : 'moderate';

  // Good mood traits by type for constructing descriptions - EXACT from specification
  const goodMoodTraits = {
    1: 'more spontaneous, positive, and open to possibilities',
    2: 'more authentic and in touch with your own needs',
    3: 'more loyal, committed, and team-oriented',
    4: 'more disciplined, structured, and principle-focused',
    5: 'more confident, decisive, and action-oriented',
    6: 'more peaceful, trusting, and relaxed',
    7: 'more focused, thoughtful, and depth-oriented',
    8: 'more emotionally open, supportive, and nurturing',
    9: 'more motivated, productive, and goal-oriented'
  };

  // Bad mood traits by type for constructing descriptions - EXACT from specification
  const badMoodTraits = {
    1: 'more critical, rigid, and perfectionistic',
    2: 'more controlling, demanding, and confrontational',
    3: 'more disengaged, indecisive, and procrastinating',
    4: 'more dependent on approval and emotionally needy',
    5: 'more scattered, distracted, and avoidant',
    6: 'more image-conscious, competitive, and superficial',
    7: 'more critical, judgmental, and detail-fixated',
    8: 'more withdrawn, detached, and intellectualizing',
    9: 'more anxious, suspicious, and seeking reassurance'
  };

  return {
    // Technical data for internal use
    goodMood: {
      type: goodMoodType,
      strength: goodMoodStrength,
      description: `When you're in a good mood, you are ${goodMoodTraits[goodMoodType]}`
    },
    badMood: {
      type: badMoodType,
      strength: badMoodStrength,
      description: `When you're in a bad mood, you are ${badMoodTraits[badMoodType]}`
    }
  };
}

/**
 * Analyze heart activation from color selections - EXACT specification implementation from section 5.5
 */
export function analyzeHeartActivation(colorSelections, primaryType) {
  if (!colorSelections || colorSelections.length === 0) return null;
  
  // Calculate state distribution from color selections
  const stateDistribution = calculateStateDistributionFromColors(colorSelections);
  
  // Apply state impact algorithm from specification
  const stateAnalysis = calculateStateImpact(stateDistribution, primaryType);
  
  // Calculate activation percentage for legacy compatibility
  const activationPercentage = Math.round(stateDistribution.healthy + (stateDistribution.average * 0.5));
  
  return {
    stateDistribution,
    stateAnalysis,
    activationPercentage,
    stateColors: colorSelections,
    analysis: stateAnalysis.description
  };
}

// Helper function to convert color selections to state distribution
function calculateStateDistributionFromColors(colorSelections) {
  let healthy = 0, average = 0, unhealthy = 0;
  
  colorSelections.forEach(color => {
    if (color.category === 0) healthy++; // Green/vibrant colors = healthy
    else if (color.category === 1) average++; // Amber/medium colors = average  
    else if (color.category === 2) unhealthy++; // Red/dark colors = unhealthy
  });
  
  const total = colorSelections.length;
  return {
    healthy: Math.round((healthy / total) * 100),
    average: Math.round((average / total) * 100), 
    unhealthy: Math.round((unhealthy / total) * 100)
  };
}

// EXACT implementation from specification section 5.5
function calculateStateImpact(stateDistribution, personalityType) {
  // Base state descriptions for each type - EXACT from specification
  const typeStateDescriptions = {
    '1': {
      healthy: "principled, accepting, and balanced",
      average: "critical, perfectionistic, and controlled",
      unhealthy: "judgmental, rigid, and self-righteous"
    },
    '2': {
      healthy: "genuinely helpful, empathetic, and supportive",
      average: "people-pleasing, approval-seeking, and prideful",
      unhealthy: "manipulative, possessive, and self-victimizing"
    },
    '3': {
      healthy: "authentic, self-accepting, and purpose-driven",
      average: "image-focused, competitive, and validation-seeking",
      unhealthy: "deceptive, hostile, and emotionally detached"
    },
    '4': {
      healthy: "creative, emotionally honest, and self-aware",
      average: "melancholic, envious, and self-absorbed",
      unhealthy: "self-destructive, alienating, and emotionally volatile"
    },
    '5': {
      healthy: "insightful, engaged, and intellectually generous",
      average: "detached, private, and intellectually stingy",
      unhealthy: "isolated, nihilistic, and mentally scattered"
    },
    '6': {
      healthy: "courageous, cooperative, and committed",
      average: "anxious, suspicious, and authority-reactive",
      unhealthy: "paranoid, accusatory, and self-defeating"
    },
    '7': {
      healthy: "joyful, focused, and deeply satisfied",
      average: "scattered, escapist, and commitment-avoidant",
      unhealthy: "impulsive, excessive, and painfully unfulfilled"
    },
    '8': {
      healthy: "protective, empowering, and emotionally vulnerable",
      average: "controlling, confrontational, and justice-obsessed",
      unhealthy: "intimidating, destructive, and ruthless"
    },
    '9': {
      healthy: "engaged, present, and purposefully decisive",
      average: "conflict-avoidant, complacent, and self-forgetting",
      unhealthy: "disengaged, stubborn, and neglectful"
    }
  };

  // Calculate weighted description based on distribution
  const description = {
    primary: stateDistribution.healthy >= 50 ? 'healthy' :
             stateDistribution.unhealthy >= 50 ? 'unhealthy' : 'average',
    secondary: determineSecondaryState(stateDistribution),
    description: generateStateDescription(stateDistribution, typeStateDescriptions[personalityType])
  };

  return description;
}

function determineSecondaryState(distribution) {
  const { healthy, average, unhealthy } = distribution;
  
  // Create sorted array of states by percentage
  const states = [
    { name: 'healthy', value: healthy },
    { name: 'average', value: average },
    { name: 'unhealthy', value: unhealthy }
  ].sort((a, b) => b.value - a.value);
  
  // Return the second highest state
  return states[1].name;
}

function generateStateDescription(distribution, typeDescriptions) {
  const { healthy, average, unhealthy } = distribution;
  const total = healthy + average + unhealthy;
  
  // Calculate normalized weights
  const healthyWeight = healthy / total;
  const averageWeight = average / total;
  const unhealthyWeight = unhealthy / total;
  
  // Create blended description based on weights
  let description = "";
  
  // Add primary state description
  const primaryState = healthyWeight >= 0.5 ? "healthy" : 
                       unhealthyWeight >= 0.5 ? "unhealthy" : "average";
  
  const primaryThreshold = Math.max(healthyWeight, averageWeight, unhealthyWeight);
  
  // Primary state description
  if (primaryThreshold >= 0.7) {
    // Strong primary state (>70%)
    description += `You are predominantly ${typeDescriptions[primaryState]}. `;
  } else {
    // Moderate primary state
    description += `You are often ${typeDescriptions[primaryState]}. `;
  }
  
  // Add secondary state influence if significant
  const secondaryStates = [
    { name: "healthy", weight: healthyWeight },
    { name: "average", weight: averageWeight },
    { name: "unhealthy", weight: unhealthyWeight }
  ].sort((a, b) => b.weight - a.weight);
  
  // Remove primary state from consideration
  const secondaryState = secondaryStates[0].name === primaryState ? 
                         secondaryStates[1] : secondaryStates[0];
  
  // Only add secondary description if it has significant weight (>20%)
  if (secondaryState.weight >= 0.2) {
    description += `At times, you can be ${typeDescriptions[secondaryState.name]}. `;
  }
  
  // Add growth direction guidance
  if (unhealthyWeight > 0.3) {
    description += `Focus on developing greater self-awareness and support systems to move toward healthier patterns. `;
  } else if (averageWeight > 0.5) {
    description += `Greater mindfulness of your patterns can help you shift toward your healthier traits. `;
  } else if (healthyWeight > 0.6) {
    description += `Continue nurturing the practices that support your well-being and growth. `;
  }
  
  return description;
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