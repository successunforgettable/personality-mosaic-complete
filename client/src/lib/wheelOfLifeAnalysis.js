/**
 * Section 6: Wheel of Life Domain Analysis - EXACT specification implementation from section 10.2
 */

// Wheel of Life Domains - exact from specification
const LIFE_DOMAINS = {
  'health-vitality': 'Health & Vitality',
  'career-purpose': 'Career & Purpose',
  'financial-abundance': 'Financial Abundance', 
  'intimate-relationships': 'Intimate Relationships',
  'family-harmony': 'Family Harmony',
  'social-connection': 'Social Connection',
  'personal-growth': 'Personal Growth',
  'spiritual-alignment': 'Spiritual Alignment'
};

// Domain Impact Mapping for each Core Energy Pattern - EXACT from specification section 10.2.2
const DOMAIN_IMPACT_MAPPING = {
  1: { // Integrity-Driven Excellence Pattern (Type 1)
    'health-vitality': {
      high: 'Balanced self-care with healthy boundaries',
      low: 'Rigid health regimens causing stress'
    },
    'career-purpose': {
      high: 'Ethical leadership and quality focus',
      low: 'Perfectionism limiting advancement'
    },
    'financial-abundance': {
      high: 'Responsible planning and ethical wealth',
      low: 'Excessive caution limiting opportunities'
    },
    'intimate-relationships': {
      high: 'Reliable partnership with healthy boundaries',
      low: 'Critical judgment creating distance'
    },
    'family-harmony': {
      high: 'Stable structure with clear values',
      low: 'Excessive expectations creating tension'
    },
    'social-connection': {
      high: 'Principled community contribution',
      low: 'Judgmental distance limiting connection'
    },
    'personal-growth': {
      high: 'Continuous refinement and improvement',
      low: 'Self-criticism blocking progress'
    },
    'spiritual-alignment': {
      high: 'Purpose-driven living with moral clarity',
      low: 'Rigid dogmatism limiting spiritual expansion'
    }
  },

  2: { // Relational Nurturing Pattern (Type 2)
    'health-vitality': {
      high: 'Caring for self as well as others',
      low: 'Self-neglect while caring for others'
    },
    'career-purpose': {
      high: 'Service-oriented leadership and mentoring',
      low: 'People-pleasing limiting career advancement'
    },
    'financial-abundance': {
      high: 'Generous wealth sharing and support',
      low: 'Financial sacrifice for others needs'
    },
    'intimate-relationships': {
      high: 'Deep emotional connection and support',
      low: 'Codependency and emotional manipulation'
    },
    'family-harmony': {
      high: 'Nurturing family bonds and traditions',
      low: 'Overwhelming family with excessive care'
    },
    'social-connection': {
      high: 'Natural community building and support',
      low: 'Exhaustion from over-giving to others'
    },
    'personal-growth': {
      high: 'Growth through service and relationships',
      low: 'Lost sense of self in helping others'
    },
    'spiritual-alignment': {
      high: 'Love-centered spiritual practice',
      low: 'Spiritual martyrdom and self-sacrifice'
    }
  },

  3: { // Results-Oriented Performance Pattern (Type 3)
    'health-vitality': {
      high: 'Optimal performance and energy management',
      low: 'Health sacrifice for achievement goals'
    },
    'career-purpose': {
      high: 'Goal achievement and professional success',
      low: 'Workaholic tendencies and burnout'
    },
    'financial-abundance': {
      high: 'Strategic wealth building and success',
      low: 'Money as status symbol causing stress'
    },
    'intimate-relationships': {
      high: 'Authentic connection beyond image',
      low: 'Performance in relationships lacking depth'
    },
    'family-harmony': {
      high: 'Family success and achievement support',
      low: 'Family pressure for performance'
    },
    'social-connection': {
      high: 'Inspiring others through achievement',
      low: 'Competitive relationships lacking authenticity'
    },
    'personal-growth': {
      high: 'Continuous improvement and skill development',
      low: 'Growth focused only on external validation'
    },
    'spiritual-alignment': {
      high: 'Purpose-driven achievement and service',
      low: 'Spiritual bypassing for success image'
    }
  },

  4: { // Creative Authenticity Pattern (Type 4)
    'health-vitality': {
      high: 'Emotional wellness through creative expression',
      low: 'Health affected by emotional intensity'
    },
    'career-purpose': {
      high: 'Meaningful work expressing authentic self',
      low: 'Career instability from emotional patterns'
    },
    'financial-abundance': {
      high: 'Creative abundance and unique value',
      low: 'Financial instability from mood swings'
    },
    'intimate-relationships': {
      high: 'Deep emotional intimacy and authenticity',
      low: 'Relationship drama and emotional volatility'
    },
    'family-harmony': {
      high: 'Authentic family connections and understanding',
      low: 'Family conflict from emotional intensity'
    },
    'social-connection': {
      high: 'Meaningful connections with kindred spirits',
      low: 'Social isolation from feeling misunderstood'
    },
    'personal-growth': {
      high: 'Deep self-awareness and emotional intelligence',
      low: 'Self-obsession blocking growth'
    },
    'spiritual-alignment': {
      high: 'Mystical connection and spiritual creativity',
      low: 'Spiritual melancholy and existential crisis'
    }
  },

  5: { // Analytical Wisdom Pattern (Type 5)
    'health-vitality': {
      high: 'Systematic health approach based on research',
      low: 'Health neglect from isolation and overthinking'
    },
    'career-purpose': {
      high: 'Expertise-based career with autonomy',
      low: 'Career limitation from social withdrawal'
    },
    'financial-abundance': {
      high: 'Conservative financial wisdom and planning',
      low: 'Financial scarcity from minimalist mindset'
    },
    'intimate-relationships': {
      high: 'Deep, private connection with trusted partner',
      low: 'Relationship avoidance from intimacy fears'
    },
    'family-harmony': {
      high: 'Stable family structure with clear boundaries',
      low: 'Family distance from emotional withdrawal'
    },
    'social-connection': {
      high: 'Small circle of deep, meaningful friendships',
      low: 'Social isolation and loneliness'
    },
    'personal-growth': {
      high: 'Continuous learning and skill mastery',
      low: 'Growth paralysis from analysis overthinking'
    },
    'spiritual-alignment': {
      high: 'Philosophical spiritual practice',
      low: 'Spiritual intellectualization without experience'
    }
  },

  6: { // Security-Conscious Commitment Pattern (Type 6)
    'health-vitality': {
      high: 'Consistent health routines and preventive care',
      low: 'Anxiety-related health issues and hypochondria'
    },
    'career-purpose': {
      high: 'Loyal team contribution and reliable leadership',
      low: 'Career anxiety and authority conflicts'
    },
    'financial-abundance': {
      high: 'Conservative financial security and planning',
      low: 'Financial anxiety and scarcity thinking'
    },
    'intimate-relationships': {
      high: 'Committed partnership with mutual support',
      low: 'Relationship anxiety and trust issues'
    },
    'family-harmony': {
      high: 'Family loyalty and protective care',
      low: 'Family anxiety and over-protection'
    },
    'social-connection': {
      high: 'Strong community bonds and group loyalty',
      low: 'Social anxiety and us-versus-them thinking'
    },
    'personal-growth': {
      high: 'Gradual growth through trusted guidance',
      low: 'Growth paralysis from fear and doubt'
    },
    'spiritual-alignment': {
      high: 'Faith-based community spiritual practice',
      low: 'Spiritual doubt and religious anxiety'
    }
  },

  7: { // Adventurous Possibility Pattern (Type 7)
    'health-vitality': {
      high: 'Active lifestyle with varied wellness approaches',
      low: 'Health neglect from constant activity'
    },
    'career-purpose': {
      high: 'Innovative leadership and opportunity creation',
      low: 'Career instability from commitment avoidance'
    },
    'financial-abundance': {
      high: 'Optimistic wealth creation and opportunities',
      low: 'Financial instability from impulsive spending'
    },
    'intimate-relationships': {
      high: 'Joyful partnership with shared adventures',
      low: 'Relationship avoidance and commitment fears'
    },
    'family-harmony': {
      high: 'Fun family activities and positive energy',
      low: 'Family responsibility avoidance'
    },
    'social-connection': {
      high: 'Wide social network and community enthusiasm',
      low: 'Superficial connections lacking depth'
    },
    'personal-growth': {
      high: 'Continuous learning and new experiences',
      low: 'Growth avoidance when facing pain'
    },
    'spiritual-alignment': {
      high: 'Joyful, experiential spiritual exploration',
      low: 'Spiritual bypassing and depth avoidance'
    }
  },

  8: { // Empowered Protection Pattern (Type 8)
    'health-vitality': {
      high: 'Robust health with strong energy boundaries',
      low: 'Health issues from excessive intensity'
    },
    'career-purpose': {
      high: 'Powerful leadership and system transformation',
      low: 'Career conflict from confrontational approach'
    },
    'financial-abundance': {
      high: 'Bold wealth creation and financial power',
      low: 'Financial conflict and control issues'
    },
    'intimate-relationships': {
      high: 'Passionate partnership with mutual respect',
      low: 'Relationship power struggles and control'
    },
    'family-harmony': {
      high: 'Protective family leadership and strength',
      low: 'Family conflict from authoritarian control'
    },
    'social-connection': {
      high: 'Community protection and justice advocacy',
      low: 'Social conflict from confrontational style'
    },
    'personal-growth': {
      high: 'Transformative growth through challenge',
      low: 'Growth resistance from vulnerability fears'
    },
    'spiritual-alignment': {
      high: 'Warrior spiritual path and justice focus',
      low: 'Spiritual rebellion and authority rejection'
    }
  },

  9: { // Harmonizing Integration Pattern (Type 9)
    'health-vitality': {
      high: 'Peaceful wellness and stress-free living',
      low: 'Health neglect from inertia and avoidance'
    },
    'career-purpose': {
      high: 'Harmonious work environment and mediation',
      low: 'Career stagnation from conflict avoidance'
    },
    'financial-abundance': {
      high: 'Steady financial stability and contentment',
      low: 'Financial procrastination and missed opportunities'
    },
    'intimate-relationships': {
      high: 'Harmonious partnership with deep acceptance',
      low: 'Relationship complacency and conflict avoidance'
    },
    'family-harmony': {
      high: 'Peaceful family unity and acceptance',
      low: 'Family issues from avoidance and inaction'
    },
    'social-connection': {
      high: 'Natural peacemaking and community harmony',
      low: 'Social withdrawal and isolation'
    },
    'personal-growth': {
      high: 'Gentle growth through integration and balance',
      low: 'Growth stagnation from inertia and comfort'
    },
    'spiritual-alignment': {
      high: 'Universal spiritual connection and oneness',
      low: 'Spiritual complacency and disconnection'
    }
  }
};

// Priority Area Domain Alignment - exact from specification
const PRIORITY_DOMAIN_ALIGNMENT = {
  sp: ['health-vitality', 'financial-abundance'], // Self-Preservation focus
  so: ['social-connection', 'career-purpose'],    // Social focus
  sx: ['intimate-relationships', 'personal-growth'] // Sexual/One-to-One focus
};

/**
 * Calculate domain activation score - EXACT specification implementation from section 10.2.3
 */
function calculateDomainActivationScore(domainId, personalityType, heartActivationLevel, priorityFocus) {
  // Base activation from heart activation level
  let baseScore = heartActivationLevel;
  
  // Priority area modifiers
  const isPrimaryDomain = PRIORITY_DOMAIN_ALIGNMENT[priorityFocus]?.includes(domainId);
  const priorityModifier = isPrimaryDomain ? 15 : 0; // +15 for primary domains
  
  // Type-specific domain sensitivity (some types are naturally stronger in certain domains)
  const typeSensitivity = getTypeDomainSensitivity(personalityType, domainId);
  
  // Calculate final score with bounds checking
  const finalScore = Math.min(100, Math.max(0, baseScore + priorityModifier + typeSensitivity));
  
  return Math.round(finalScore);
}

/**
 * Get type-specific domain sensitivity modifiers
 */
function getTypeDomainSensitivity(type, domainId) {
  const sensitivityMap = {
    1: { 'personal-growth': 10, 'spiritual-alignment': 5, 'career-purpose': 10 },
    2: { 'intimate-relationships': 10, 'family-harmony': 8, 'social-connection': 5 },
    3: { 'career-purpose': 15, 'financial-abundance': 10 },
    4: { 'personal-growth': 15, 'intimate-relationships': 8, 'spiritual-alignment': 11 },
    5: { 'personal-growth': 10, 'spiritual-alignment': 5 },
    6: { 'family-harmony': 8, 'financial-abundance': 5 },
    7: { 'social-connection': 8, 'personal-growth': 5 },
    8: { 'career-purpose': 10, 'financial-abundance': 10 },
    9: { 'family-harmony': 10, 'social-connection': 8 }
  };
  
  return sensitivityMap[type]?.[domainId] || 0;
}

/**
 * Calculate trajectory projections - EXACT specification implementation from section 10.2.3
 */
function calculateDomainTrajectory(domainId, energyPattern, activationLevel, timeframe) {
  // Base trajectory based on current activation
  let baseTrajectory = activationLevel < 40 ? "declining" : 
                       activationLevel < 60 ? "stable" : "improving";
  
  // Domain-specific modifiers
  const domainModifiers = getDomainModifiers(energyPattern, domainId);
  
  // Calculate rate of change
  let rateOfChange = calculateRateOfChange(
    activationLevel, 
    domainModifiers.sensitivity,
    timeframe
  );
  
  // Apply pattern-specific amplifiers
  rateOfChange *= domainModifiers.amplifier;
  
  return generateProjectionDescription(baseTrajectory, rateOfChange, timeframe, domainId);
}

function getDomainModifiers(energyPattern, domainId) {
  // Domain sensitivity by type (how quickly this domain changes for this type)
  const sensitivityMap = {
    1: { 'health-vitality': 0.8, 'career-purpose': 0.9, 'personal-growth': 1.2 },
    2: { 'intimate-relationships': 1.3, 'family-harmony': 1.1, 'social-connection': 1.0 },
    3: { 'career-purpose': 1.4, 'financial-abundance': 1.2, 'social-connection': 0.9 },
    4: { 'intimate-relationships': 1.3, 'personal-growth': 1.4, 'spiritual-alignment': 1.1 },
    5: { 'personal-growth': 1.1, 'social-connection': 0.7, 'intimate-relationships': 0.8 },
    6: { 'family-harmony': 1.0, 'financial-abundance': 0.9, 'social-connection': 1.0 },
    7: { 'social-connection': 1.2, 'career-purpose': 0.8, 'intimate-relationships': 0.7 },
    8: { 'career-purpose': 1.3, 'financial-abundance': 1.1, 'intimate-relationships': 1.0 },
    9: { 'family-harmony': 1.2, 'intimate-relationships': 0.9, 'personal-growth': 0.8 }
  };
  
  const sensitivity = sensitivityMap[energyPattern]?.[domainId] || 1.0;
  
  return {
    sensitivity,
    amplifier: sensitivity > 1.0 ? 1.2 : 0.9 // Higher sensitivity = more dramatic changes
  };
}

function calculateRateOfChange(activationLevel, sensitivity, timeframe) {
  const baseRate = activationLevel < 40 ? -0.15 : 
                   activationLevel < 60 ? 0.05 : 0.12;
  
  const timeMultiplier = timeframe === 'short' ? 0.3 :
                        timeframe === 'medium' ? 1.0 : 2.5;
  
  return baseRate * sensitivity * timeMultiplier;
}

function generateProjectionDescription(baseTrajectory, rateOfChange, timeframe, domainId) {
  const projectionTemplates = {
    declining: {
      short: "Continued stress and challenges likely",
      medium: "Significant decline without intervention", 
      long: "Major life difficulties and dysfunction"
    },
    stable: {
      short: "Maintaining current patterns",
      medium: "Gradual improvement with focused effort",
      long: "Moderate progress with sustained commitment"
    },
    improving: {
      short: "Continued positive momentum",
      medium: "Substantial improvement and satisfaction",
      long: "Exceptional growth and fulfillment"
    }
  };
  
  return projectionTemplates[baseTrajectory][timeframe];
}

/**
 * Generate complete Wheel of Life analysis - EXACT specification implementation
 */
export function generateWheelOfLifeAnalysis(personalityData) {
  const { primaryType, heartActivation, subtypeFocus } = personalityData;
  
  const domains = Object.entries(LIFE_DOMAINS).map(([domainId, domainName]) => {
    const activationScore = calculateDomainActivationScore(
      domainId,
      primaryType.number,
      heartActivation.activationPercentage,
      subtypeFocus.dominantFocus
    );
    
    const impactData = DOMAIN_IMPACT_MAPPING[primaryType.number][domainId];
    const currentImpact = activationScore >= 60 ? impactData.high : impactData.low;
    
    return {
      domainId,
      domainName,
      activationScore,
      currentImpact,
      shortTermProjection: calculateDomainTrajectory(domainId, primaryType.number, activationScore, 'short'),
      mediumTermProjection: calculateDomainTrajectory(domainId, primaryType.number, activationScore, 'medium'),
      longTermProjection: calculateDomainTrajectory(domainId, primaryType.number, activationScore, 'long')
    };
  });
  
  // Calculate overall life activation
  const overallActivation = Math.round(
    domains.reduce((sum, domain) => sum + domain.activationScore, 0) / domains.length
  );
  
  return {
    domains,
    overallActivation,
    primaryDomains: PRIORITY_DOMAIN_ALIGNMENT[subtypeFocus.dominantFocus] || [],
    analysis: `Your overall life activation is ${overallActivation}%. Your ${subtypeFocus.dominantName} creates strongest activation in ${PRIORITY_DOMAIN_ALIGNMENT[subtypeFocus.dominantFocus]?.map(d => LIFE_DOMAINS[d]).join(' and ')}.`
  };
}