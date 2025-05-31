/**
 * Section 7: Results Visualization and Report - Written Report Generation
 * Exact implementation from specification section 7.2
 */

/**
 * Generate complete written report following specification structure from section 7.2.1
 */
export function generateWrittenReport(personalityData) {
  const {
    primaryType,
    wingInfluence,
    moodStates,
    stateDistribution,
    subtypeDistribution,
    wheelOfLifeAnalysis
  } = personalityData;

  return {
    header: generateReportHeader(primaryType),
    typeDescription: generateTypeDescription(primaryType),
    influenceProfile: generateInfluenceProfile(primaryType, wingInfluence),
    stateAnalysis: generateStateAnalysis(stateDistribution, moodStates),
    subtypeStack: generateSubtypeStack(subtypeDistribution),
    growthPath: generateGrowthPath(personalityData)
  };
}

/**
 * Generate report header with full personality type name and short description
 */
function generateReportHeader(primaryType) {
  const typeNames = {
    1: 'The Reformer',
    2: 'The Helper', 
    3: 'The Achiever',
    4: 'The Individualist',
    5: 'The Investigator',
    6: 'The Sentinel',
    7: 'The Enthusiast',
    8: 'The Challenger',
    9: 'The Peacemaker'
  };

  const shortDescriptions = {
    1: 'Principled, purposeful, and self-controlled',
    2: 'Caring, interpersonal, and people-pleasing',
    3: 'Success-oriented, pragmatic, and driven',
    4: 'Sensitive, withdrawn, and expressive',
    5: 'Intense, cerebral, and perceptive',
    6: 'Committed, security-oriented, and engaging',
    7: 'Spontaneous, versatile, and acquisitive',
    8: 'Self-confident, decisive, and willful',
    9: 'Receptive, reassuring, and agreeable'
  };

  return {
    typeName: typeNames[primaryType.number],
    shortDescription: shortDescriptions[primaryType.number],
    confidence: primaryType.confidence
  };
}

/**
 * Generate 2-3 paragraphs about core type
 */
function generateTypeDescription(primaryType) {
  const descriptions = {
    1: {
      paragraph1: "You are principled, purposeful, and self-controlled, driven by a deep desire to be good, balanced, and act with integrity. Your inner critic helps you maintain high standards but can also become overly harsh when you're not at your best.",
      paragraph2: "As a Reformer, you have a keen eye for improvement and strive to make the world better according to your well-developed sense of right and wrong. You value order, structure, and ethical behavior, often holding yourself to exceptionally high standards.",
      paragraph3: "Your greatest strengths include your integrity, reliability, and commitment to doing what's right. You bring clarity, discipline, and fairness to all situations, making you a valuable force for positive change."
    },
    2: {
      paragraph1: "You are caring, interpersonal, and people-pleasing, with a fundamental desire to feel loved and needed. You focus on the emotions and needs of others, sometimes at the expense of acknowledging your own needs.",
      paragraph2: "As a Helper, you have an intuitive understanding of what others need and a natural ability to provide support and encouragement. You create warm, nurturing environments where people feel valued and cared for.",
      paragraph3: "Your greatest strengths include your empathy, generosity, and ability to bring out the best in others. You excel at building connections and creating harmonious relationships that benefit everyone involved."
    },
    3: {
      paragraph1: "You are success-oriented, pragmatic, and driven, with a core desire to feel valuable and worthwhile through your achievements. You focus on goals, efficiency, and presenting your best self to the world.",
      paragraph2: "As an Achiever, you have exceptional ability to identify what needs to be done and the energy to make it happen. You excel at adapting your approach to achieve success in whatever environment you find yourself.",
      paragraph3: "Your greatest strengths include your optimism, efficiency, and ability to inspire others to reach their potential. You bring energy, focus, and a results-oriented mindset to everything you undertake."
    },
    4: {
      paragraph1: "You are sensitive, withdrawn, and expressive, driven by a desire to find yourself and your significance. You focus on your inner emotional world and seek to understand your unique identity and place in the world.",
      paragraph2: "As an Individualist, you have deep emotional intelligence and an ability to see beauty and meaning in life's experiences. You value authenticity and have a gift for helping others connect with their own deeper feelings.",
      paragraph3: "Your greatest strengths include your creativity, intuition, and ability to find meaning in both joy and suffering. You bring depth, authenticity, and artistic vision to your relationships and endeavors."
    },
    5: {
      paragraph1: "You are intense, cerebral, and perceptive, with a core desire to be capable and understand the world around you. You focus on gaining knowledge and maintaining your independence and privacy.",
      paragraph2: "As an Investigator, you have exceptional analytical abilities and can see patterns and connections that others miss. You prefer to observe before acting and value competence and understanding above all else.",
      paragraph3: "Your greatest strengths include your objectivity, innovation, and ability to develop expertise in areas that interest you. You bring clarity, insight, and careful consideration to complex problems."
    },
    6: {
      paragraph1: "You are committed, security-oriented, and engaging, driven by a desire for security and support. You focus on potential problems and work to create systems and relationships that provide stability and safety.",
      paragraph2: "As a Sentinel, you have excellent troubleshooting abilities and a talent for building loyalty and commitment in groups. You can see potential pitfalls and work proactively to prevent problems before they occur.",
      paragraph3: "Your greatest strengths include your loyalty, responsibility, and ability to create secure environments for yourself and others. You bring vigilance, commitment, and collaborative spirit to your endeavors."
    },
    7: {
      paragraph1: "You are spontaneous, versatile, and acquisitive, with a core desire to maintain happiness and satisfaction. You focus on exciting possibilities and work to avoid pain, boredom, and limitations.",
      paragraph2: "As an Enthusiast, you have exceptional ability to see potential and generate ideas. You bring optimism and energy to everything you do, inspiring others with your enthusiasm and vision for what's possible.",
      paragraph3: "Your greatest strengths include your optimism, versatility, and ability to find creative solutions to problems. You bring joy, innovation, and a forward-thinking perspective to your relationships and projects."
    },
    8: {
      paragraph1: "You are self-confident, decisive, and willful, driven by a desire to be in control of your own life and destiny. You focus on strength, justice, and protecting yourself and others from being controlled or harmed.",
      paragraph2: "As a Challenger, you have natural leadership abilities and the courage to stand up for what you believe is right. You can take charge in difficult situations and aren't afraid to confront problems directly.",
      paragraph3: "Your greatest strengths include your strength, directness, and ability to inspire confidence in others. You bring leadership, protection, and the energy to make things happen to every situation."
    },
    9: {
      paragraph1: "You are receptive, reassuring, and agreeable, with a deep desire for inner and outer peace. You focus on harmony and avoiding conflict, often seeing multiple perspectives and finding common ground.",
      paragraph2: "As a Peacemaker, you have remarkable ability to bring comfort and stability to others, creating environments where everyone feels heard and accepted. Your calm, steady presence helps defuse tension and facilitates genuine connection.",
      paragraph3: "Your greatest strengths include your diplomatic skills, acceptance, and ability to find common ground. You bring harmony, inclusion, and a stabilizing presence to situations that might otherwise fracture or escalate."
    }
  };

  return descriptions[primaryType.number] || descriptions[9];
}

/**
 * Generate influence profile (formerly "Wing Influence")
 */
function generateInfluenceProfile(primaryType, wingInfluence) {
  if (!wingInfluence) return null;

  const influenceDescriptions = {
    '1w9': {
      title: 'Reformer 9 (The Idealist)',
      description: 'The Reformer 9 influence brings a calming, harmonizing quality to your nature. This makes you more tolerant, patient, and able to see multiple perspectives before making judgments.',
      traits: [
        'Approach improvement with a more measured, less reactive energy',
        'Prefer to create change through peaceful, orderly means',
        'Balance your critical perfectionism with acceptance',
        'Seek not just what\'s right, but what brings harmony'
      ],
      summary: 'This influence helps soften your inner critic while maintaining your commitment to high standards and ethical principles.'
    },
    '1w2': {
      title: 'Reformer 2 (The Advocate)',
      description: 'The Reformer 2 influence brings warmth and interpersonal awareness to your principled nature. This makes you more people-focused and concerned with how your improvements affect others.',
      traits: [
        'Focus on helping others improve and reach their potential',
        'Balance high standards with compassionate understanding',
        'Are more attuned to others\' needs while maintaining your principles',
        'Use your reform energy to serve and support others'
      ],
      summary: 'This influence helps you channel your perfectionism into service while maintaining strong relationships and emotional connection.'
    }
    // Add other wing combinations as needed
  };

  const wingKey = `${primaryType.number}w${wingInfluence.secondaryType || wingInfluence.wing}`;
  return influenceDescriptions[wingKey] || null;
}

/**
 * Generate state analysis based on state distribution
 */
function generateStateAnalysis(stateDistribution, moodStates) {
  const { healthy, average, unhealthy, primaryState, secondaryState } = stateDistribution;

  let analysis = `Your current state indicates `;
  
  if (healthy > 50) {
    analysis += `strong healthy functioning with ${healthy}% healthy capacity. `;
  } else if (average > 50) {
    analysis += `primarily average-level functioning with ${average}% operating in your type's average range. `;
  } else {
    analysis += `mixed functioning across all levels with opportunities for growth. `;
  }

  analysis += `\n\nIn your ${primaryState.toLowerCase()} state, ${primaryState === 'Healthy' ? 
    'you access your type\'s highest potentials and can express your core motivations in balanced, integrated ways.' :
    primaryState === 'Average' ?
    'you tend to operate within your type\'s typical patterns, with both strengths and limitations becoming more apparent.' :
    'you may experience increased stress and find yourself falling into less helpful patterns of your type.'
  }`;

  if (secondaryState && secondaryState !== primaryState) {
    analysis += ` Your secondary state of ${secondaryState.toLowerCase()} functioning provides ${secondaryState === 'Healthy' ? 'additional resources and balance' : 'alternative patterns you can access'}.`;
  }

  return {
    overview: analysis,
    moodStates: moodStates,
    distribution: {
      healthy: `${healthy}%`,
      average: `${average}%`, 
      unhealthy: `${unhealthy}%`
    }
  };
}

/**
 * Generate subtype stack explanation
 */
function generateSubtypeStack(subtypeDistribution) {
  const stack = subtypeDistribution
    .sort((a, b) => b.tokens - a.tokens)
    .map((subtype, index) => ({
      position: index + 1,
      focus: subtype.focus,
      name: subtype.name,
      tokens: subtype.tokens,
      description: getSubtypeDescription(subtype.focus, index === 0)
    }));

  return {
    stack: stack,
    dominantDescription: generateDominantSubtypeDescription(stack[0]),
    secondaryDescription: stack[1] ? generateSecondarySubtypeDescription(stack[1]) : null,
    growthArea: stack[2] ? generateGrowthAreaDescription(stack[2]) : null
  };
}

/**
 * Get subtype descriptions
 */
function getSubtypeDescription(focus, isDominant) {
  const descriptions = {
    'sp': isDominant ? 
      'focus on improvement and correctness is primarily directed toward creating secure, well-ordered personal environments' :
      'also value comfort, stability, and predictable routines',
    'so': isDominant ?
      'focus on harmony and peace is primarily directed toward group dynamics and community belonging' :
      'also care about social rules, procedures, and group standards',
    'sx': isDominant ?
      'focus on intensity and connection is primarily directed toward one-on-one relationships and personal chemistry' :
      'also seek meaningful personal connections and authentic interactions'
  };

  return descriptions[focus] || descriptions['sp'];
}

/**
 * Generate dominant subtype description
 */
function generateDominantSubtypeDescription(dominantSubtype) {
  const traits = {
    'sp': [
      'Place high importance on establishing reliable routines and systems',
      'Focus on maintaining cleanliness, organization, and proper maintenance', 
      'Have concerns about health, finances, and future security',
      'Feel anxious when your personal environment becomes disordered'
    ],
    'so': [
      'Are highly attuned to group needs and social dynamics',
      'Feel responsible for maintaining harmony in your communities',
      'Are more active and engaged when part of a group',
      'Seek to create inclusive environments where everyone feels valued'
    ],
    'sx': [
      'Focus intensely on one-on-one connections and relationships',
      'Seek depth and authenticity in your personal interactions',
      'Are drawn to intensity and meaningful personal chemistry',
      'May feel restless when lacking strong personal connections'
    ]
  };

  return {
    focus: dominantSubtype.focus,
    name: dominantSubtype.name,
    tokens: dominantSubtype.tokens,
    description: `As a ${dominantSubtype.name} dominant, your ${getSubtypeDescription(dominantSubtype.focus, true)}. You likely:`,
    traits: traits[dominantSubtype.focus] || traits['sp']
  };
}

/**
 * Generate secondary subtype description
 */
function generateSecondarySubtypeDescription(secondarySubtype) {
  return {
    focus: secondarySubtype.focus,
    name: secondarySubtype.name,
    tokens: secondarySubtype.tokens,
    description: `With ${secondarySubtype.name} as your secondary subtype, you ${getSubtypeDescription(secondarySubtype.focus, false)}.`
  };
}

/**
 * Generate growth area description
 */
function generateGrowthAreaDescription(tertiarySubtype) {
  return {
    focus: tertiarySubtype.focus,
    name: tertiarySubtype.name,
    tokens: tertiarySubtype.tokens,
    description: `Your ${tertiarySubtype.name} instinct is less developed, potentially making this an area for growth and development.`
  };
}

/**
 * Generate growth path recommendations
 */
function generateGrowthPath(personalityData) {
  const { primaryType, stateDistribution, wheelOfLifeAnalysis } = personalityData;
  const isHighActivation = (stateDistribution.healthy || 0) > 40;

  // Get type-specific growth recommendations
  const recommendations = getTypeGrowthRecommendations(primaryType.number, isHighActivation);
  
  // Add priority domain recommendations
  const domainRecommendations = generateDomainGrowthRecommendations(wheelOfLifeAnalysis);

  return {
    typeSpecific: recommendations,
    domainFocus: domainRecommendations,
    overallGuidance: generateOverallGuidance(primaryType, isHighActivation)
  };
}

/**
 * Get type-specific growth recommendations
 */
function getTypeGrowthRecommendations(typeNumber, isHighActivation) {
  const recommendations = {
    1: isHighActivation ? [
      'Channel your high standards into inspiring others while maintaining realistic expectations',
      'Practice self-compassion alongside your pursuit of excellence to avoid perfectionist burnout',
      'Use your moral clarity to lead positive change in your community and workplace',
      'Balance your improvement focus with acceptance of current circumstances'
    ] : [
      'Practice accepting "good enough" in non-critical areas to reduce overwhelming pressure',
      'Develop flexibility in your standards and expectations to improve relationships',
      'Focus on progress over perfection to maintain motivation and momentum',
      'Address inner critic patterns that may be limiting your happiness and success'
    ],
    // Add other types as needed
  };

  return recommendations[typeNumber] || recommendations[1];
}

/**
 * Generate domain-specific growth recommendations
 */
function generateDomainGrowthRecommendations(wheelOfLifeAnalysis) {
  if (!wheelOfLifeAnalysis || !wheelOfLifeAnalysis.domains) return [];

  return wheelOfLifeAnalysis.primaryDomains.map(domainId => {
    const domain = wheelOfLifeAnalysis.domains.find(d => d.domainId === domainId);
    if (!domain) return null;
    
    return {
      domain: domain.domainName,
      recommendation: `Focus on strengthening your ${domain.domainName.toLowerCase()} through targeted actions in your ${domain.shortTermProjection}`
    };
  }).filter(Boolean);
}

/**
 * Generate overall guidance
 */
function generateOverallGuidance(primaryType, isHighActivation) {
  return isHighActivation ?
    `Your strong healthy functioning provides a solid foundation for continued growth. Focus on maintaining this level while expanding your positive impact.` :
    `You have significant potential for growth. Focus on developing your healthy capacities while addressing patterns that may be limiting your progress.`;
}