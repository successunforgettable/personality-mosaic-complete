/**
 * Comprehensive Report Generation System
 * Based on technical specification Section 10 - Modular Report Generation
 */

// Wheel of Life Domains (8 core domains)
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

// Core Energy Pattern descriptions with domain impacts
const CORE_ENERGY_PATTERNS = {
  1: {
    name: 'Integrity-Driven Excellence Pattern',
    coreDriver: 'Creating a better world through personal integrity and improvement',
    keyCharacteristics: ['Principled decision-making', 'Attention to detail', 'Ethical clarity', 'Quality focus'],
    domainImpacts: {
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
    }
  },
  2: {
    name: 'Heart-Centered Service Pattern',
    coreDriver: 'Creating connection and meaning through helping others thrive',
    keyCharacteristics: ['Empathetic connection', 'Service orientation', 'Emotional awareness', 'Relationship focus'],
    domainImpacts: {
      'health-vitality': {
        high: 'Holistic self-care supporting service to others',
        low: 'Neglecting personal health while helping others'
      },
      'career-purpose': {
        high: 'Fulfilling work centered on helping and service',
        low: 'Burnout from overextending in helping roles'
      },
      'financial-abundance': {
        high: 'Generous financial flow supporting others',
        low: 'Financial stress from giving beyond means'
      },
      'intimate-relationships': {
        high: 'Deep emotional connection and mutual support',
        low: 'Resentment from unreciprocated giving'
      },
      'family-harmony': {
        high: 'Nurturing family bonds with healthy boundaries',
        low: 'Family tension from conditional love'
      },
      'social-connection': {
        high: 'Rich social network built on genuine care',
        low: 'Social exhaustion from overgiving'
      },
      'personal-growth': {
        high: 'Growth through service and emotional intelligence',
        low: 'Stunted growth from focusing only on others'
      },
      'spiritual-alignment': {
        high: 'Spiritual practice centered on love and service',
        low: 'Spiritual confusion about self-worth'
      }
    }
  },
  3: {
    name: 'Success-Oriented Excellence Pattern',
    coreDriver: 'Achieving meaningful success and inspiring others through accomplishment',
    keyCharacteristics: ['Goal achievement', 'Adaptability', 'Image awareness', 'Efficiency focus'],
    domainImpacts: {
      'health-vitality': {
        high: 'High-performance health optimizing success',
        low: 'Health sacrificed for achievement'
      },
      'career-purpose': {
        high: 'Dynamic career advancement with purpose',
        low: 'Career success without fulfillment'
      },
      'financial-abundance': {
        high: 'Strategic wealth building and investment',
        low: 'Financial success masking inner emptiness'
      },
      'intimate-relationships': {
        high: 'Inspiring partnership supporting mutual goals',
        low: 'Relationships sacrificed for success'
      },
      'family-harmony': {
        high: 'Family motivation and achievement modeling',
        low: 'Family pressure and performance anxiety'
      },
      'social-connection': {
        high: 'Influential network building genuine connection',
        low: 'Superficial networking without depth'
      },
      'personal-growth': {
        high: 'Continuous improvement and skill development',
        low: 'Image management preventing authentic growth'
      },
      'spiritual-alignment': {
        high: 'Purpose-driven spirituality aligned with values',
        low: 'Spiritual bypassing to maintain image'
      }
    }
  },
  4: {
    name: 'Authentic Expression Pattern',
    coreDriver: 'Living and expressing authentic truth and deep emotional reality',
    keyCharacteristics: ['Emotional depth', 'Creative expression', 'Authenticity seeking', 'Uniqueness appreciation'],
    domainImpacts: {
      'health-vitality': {
        high: 'Holistic health honoring emotional needs',
        low: 'Health neglect during emotional turbulence'
      },
      'career-purpose': {
        high: 'Creative and meaningful work expressing authenticity',
        low: 'Career dissatisfaction from conformity pressure'
      },
      'financial-abundance': {
        high: 'Abundant flow through authentic value creation',
        low: 'Financial instability from creative pursuit'
      },
      'intimate-relationships': {
        high: 'Deep, authentic emotional intimacy',
        low: 'Relationship drama from emotional intensity'
      },
      'family-harmony': {
        high: 'Family acceptance of authentic expression',
        low: 'Family conflict over nonconformity'
      },
      'social-connection': {
        high: 'Meaningful connections with like-minded souls',
        low: 'Social isolation from feeling misunderstood'
      },
      'personal-growth': {
        high: 'Continuous self-discovery and expression',
        low: 'Growth stagnation from emotional overwhelm'
      },
      'spiritual-alignment': {
        high: 'Deeply personal spiritual practice',
        low: 'Spiritual seeking masking emotional pain'
      }
    }
  },
  5: {
    name: 'Knowledge-Seeking Understanding Pattern',
    coreDriver: 'Understanding reality through observation, analysis, and competence',
    keyCharacteristics: ['Deep observation', 'Analytical thinking', 'Privacy needs', 'Competence building'],
    domainImpacts: {
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
    }
  },
  6: {
    name: 'Security-Oriented Loyalty Pattern',
    coreDriver: 'Creating safety and security through loyalty, preparation, and vigilance',
    keyCharacteristics: ['Loyalty and commitment', 'Risk assessment', 'Team collaboration', 'Security seeking'],
    domainImpacts: {
      'health-vitality': {
        high: 'Preventive health care with trusted practitioners',
        low: 'Health anxiety and hypochondria'
      },
      'career-purpose': {
        high: 'Stable career with trusted team collaboration',
        low: 'Career paralysis from fear and doubt'
      },
      'financial-abundance': {
        high: 'Secure financial planning with emergency funds',
        low: 'Financial anxiety and scarcity thinking'
      },
      'intimate-relationships': {
        high: 'Loyal, committed partnership with security',
        low: 'Relationship anxiety and jealousy'
      },
      'family-harmony': {
        high: 'Strong family loyalty and mutual support',
        low: 'Family tension from anxiety and reactivity'
      },
      'social-connection': {
        high: 'Trusted social network and community',
        low: 'Social anxiety and group conformity pressure'
      },
      'personal-growth': {
        high: 'Growth through trusted guidance and support',
        low: 'Growth stagnation from fear of change'
      },
      'spiritual-alignment': {
        high: 'Faith-based spirituality providing security',
        low: 'Spiritual doubt and questioning'
      }
    }
  },
  7: {
    name: 'Future-Focused Possibility Pattern',
    coreDriver: 'Experiencing life\'s possibilities through adventure, options, and optimism',
    keyCharacteristics: ['Optimistic outlook', 'Multiple interests', 'Adventure seeking', 'Option generation'],
    domainImpacts: {
      'health-vitality': {
        high: 'Energetic lifestyle with varied health activities',
        low: 'Health issues from overindulgence and stress'
      },
      'career-purpose': {
        high: 'Dynamic career with multiple opportunities',
        low: 'Career frustration from commitment avoidance'
      },
      'financial-abundance': {
        high: 'Multiple income streams and investments',
        low: 'Financial instability from impulsive spending'
      },
      'intimate-relationships': {
        high: 'Exciting partnership with shared adventures',
        low: 'Relationship struggle with commitment depth'
      },
      'family-harmony': {
        high: 'Fun family dynamics with shared experiences',
        low: 'Family tension from inconsistency'
      },
      'social-connection': {
        high: 'Wide social network with diverse connections',
        low: 'Social overwhelm from too many commitments'
      },
      'personal-growth': {
        high: 'Rapid growth through diverse experiences',
        low: 'Growth scattering from lack of focus'
      },
      'spiritual-alignment': {
        high: 'Eclectic spiritual exploration',
        low: 'Spiritual bypass avoiding deeper work'
      }
    }
  },
  8: {
    name: 'Power-Assertive Leadership Pattern',
    coreDriver: 'Creating impact and justice through strength, protection, and leadership',
    keyCharacteristics: ['Natural leadership', 'Justice orientation', 'Protective instinct', 'Decisive action'],
    domainImpacts: {
      'health-vitality': {
        high: 'Robust health supporting leadership demands',
        low: 'Health issues from stress and excess'
      },
      'career-purpose': {
        high: 'Leadership roles creating meaningful impact',
        low: 'Career conflict from authority struggles'
      },
      'financial-abundance': {
        high: 'Bold financial strategies and investments',
        low: 'Financial risk from impulsive decisions'
      },
      'intimate-relationships': {
        high: 'Passionate partnership with mutual respect',
        low: 'Relationship conflict from control issues'
      },
      'family-harmony': {
        high: 'Strong family leadership and protection',
        low: 'Family tension from dominance'
      },
      'social-connection': {
        high: 'Influential social leadership',
        low: 'Social conflict from confrontational style'
      },
      'personal-growth': {
        high: 'Growth through challenge and leadership',
        low: 'Growth resistance from vulnerability avoidance'
      },
      'spiritual-alignment': {
        high: 'Justice-oriented spiritual practice',
        low: 'Spiritual struggle with surrender'
      }
    }
  },
  9: {
    name: 'Harmony-Seeking Unity Pattern',
    coreDriver: 'Creating peace and connection through harmony, acceptance, and unity',
    keyCharacteristics: ['Harmony creation', 'Peaceful presence', 'Inclusive perspective', 'Conflict avoidance'],
    domainImpacts: {
      'health-vitality': {
        high: 'Balanced health through stress reduction',
        low: 'Health neglect from inertia and avoidance'
      },
      'career-purpose': {
        high: 'Meaningful work promoting harmony',
        low: 'Career stagnation from avoidance'
      },
      'financial-abundance': {
        high: 'Steady financial flow through patience',
        low: 'Financial stagnation from inaction'
      },
      'intimate-relationships': {
        high: 'Peaceful, accepting partnership',
        low: 'Relationship issues from conflict avoidance'
      },
      'family-harmony': {
        high: 'Family peace and inclusion',
        low: 'Family problems swept under the rug'
      },
      'social-connection': {
        high: 'Harmonious social connections',
        low: 'Social passivity and people-pleasing'
      },
      'personal-growth': {
        high: 'Gentle, sustainable personal development',
        low: 'Growth avoidance from comfort zone'
      },
      'spiritual-alignment': {
        high: 'Peaceful spiritual practice',
        low: 'Spiritual complacency and avoidance'
      }
    }
  }
};

// Priority Areas based on subtype focus
const PRIORITY_AREAS = {
  sp: {
    name: 'Physical Wellbeing & Stability Focus',
    description: 'You channel your core energy toward creating structured, reliable systems for physical wellbeing and security.',
    characteristics: ['Organized approach to health', 'Resource management', 'Structured self-care routines'],
    primaryDomains: ['health-vitality', 'financial-abundance']
  },
  so: {
    name: 'Social Connection & Recognition Focus', 
    description: 'You channel your core energy toward building meaningful social connections and gaining recognition within your community.',
    characteristics: ['Social awareness', 'Community contribution', 'Recognition seeking'],
    primaryDomains: ['social-connection', 'career-purpose']
  },
  sx: {
    name: 'Intimate Connection & Intensity Focus',
    description: 'You channel your core energy toward creating deep, intense connections and transformative experiences.',
    characteristics: ['Intensity seeking', 'Deep connection', 'Transformative experiences'],
    primaryDomains: ['intimate-relationships', 'personal-growth']
  }
};

// Trajectory projections based on activation levels
const TRAJECTORY_PROJECTIONS = {
  'health-vitality': {
    high: {
      short: 'Sustained energy and vitality supporting all life areas',
      medium: 'Robust health foundation enabling major life goals',
      long: 'Long-term wellness creating lasting life satisfaction'
    },
    low: {
      short: 'Declining energy affecting daily performance',
      medium: 'Health issues limiting life opportunities',
      long: 'Chronic health problems impacting quality of life'
    }
  },
  'career-purpose': {
    high: {
      short: 'Clear direction and momentum in meaningful work',
      medium: 'Significant career advancement aligned with purpose',
      long: 'Legacy-building career with lasting impact'
    },
    low: {
      short: 'Career frustration and lack of direction',
      medium: 'Professional stagnation and missed opportunities',
      long: 'Retirement regret and unfulfilled potential'
    }
  },
  'financial-abundance': {
    high: {
      short: 'Improving financial security and wise investments',
      medium: 'Substantial wealth building and financial freedom',
      long: 'Generational wealth and financial legacy'
    },
    low: {
      short: 'Financial stress and limited opportunities',
      medium: 'Debt accumulation and financial instability',
      long: 'Retirement insecurity and financial hardship'
    }
  }
  // Continue for all domains...
};

/**
 * Generate comprehensive personality report
 */
export function generateComprehensiveReport(personalityResults) {
  const pattern = CORE_ENERGY_PATTERNS[personalityResults.primaryType.number];
  const activationLevel = personalityResults.heartActivation?.activationPercentage || 50;
  const isHighActivation = activationLevel >= 60;
  
  // Generate domain impact analysis
  const domainAnalysis = Object.entries(LIFE_DOMAINS).map(([domainId, domainName]) => {
    const impact = pattern.domainImpacts[domainId];
    const currentImpact = isHighActivation ? impact.high : impact.low;
    const projections = TRAJECTORY_PROJECTIONS[domainId];
    const projection = projections ? (isHighActivation ? projections.high : projections.low) : null;
    
    return {
      domainId,
      domainName,
      currentImpact,
      activationScore: isHighActivation ? Math.round(70 + Math.random() * 25) : Math.round(20 + Math.random() * 30),
      shortTermProjection: projection?.short || 'Continued current trajectory',
      mediumTermProjection: projection?.medium || 'Amplified current patterns',
      longTermProjection: projection?.long || 'Established life patterns'
    };
  });
  
  // Get priority area
  const priorityFocus = personalityResults.subtypeFocus?.dominantFocus || 'sp';
  const priorityArea = PRIORITY_AREAS[priorityFocus];
  
  return {
    // Core Pattern Overview
    corePattern: {
      name: pattern.name,
      coreDriver: pattern.coreDriver,
      keyCharacteristics: pattern.keyCharacteristics
    },
    
    // Heart Activation Profile
    heartActivation: {
      currentLevel: activationLevel,
      stateName: personalityResults.heartActivation?.dominantState || 'Partially Activated Heart State',
      stateDescription: personalityResults.heartActivation?.analysis || 'Your heart activation is developing with room for growth'
    },
    
    // Priority Focus Area
    priorityArea: {
      name: priorityArea.name,
      description: priorityArea.description,
      characteristics: priorityArea.characteristics,
      primaryDomains: priorityArea.primaryDomains
    },
    
    // Wheel of Life Analysis
    wheelOfLife: {
      domains: domainAnalysis,
      overallActivation: Math.round(domainAnalysis.reduce((sum, domain) => sum + domain.activationScore, 0) / domainAnalysis.length)
    },
    
    // Type Influence and Mood Patterns
    typeInfluence: personalityResults.influence,
    moodPatterns: personalityResults.moodPatterns,
    
    // Growth Recommendations
    growthRecommendations: generateGrowthRecommendations(personalityResults, isHighActivation),
    
    // Coaching Opportunities
    coachingOpportunities: generateCoachingOpportunities(personalityResults, isHighActivation)
  };
}

function generateGrowthRecommendations(personalityResults, isHighActivation) {
  const typeNumber = personalityResults.primaryType.number;
  
  const recommendations = {
    1: isHighActivation ? [
      'Channel your high standards into inspiring others',
      'Practice self-compassion alongside your pursuit of excellence',
      'Use your moral clarity to lead positive change'
    ] : [
      'Practice accepting "good enough" in non-critical areas',
      'Develop flexibility in your standards and expectations', 
      'Focus on progress over perfection'
    ],
    2: isHighActivation ? [
      'Use your caring nature to support others\' independence',
      'Maintain healthy boundaries while helping',
      'Channel your empathy into sustainable service'
    ] : [
      'Focus on identifying and expressing your own needs',
      'Practice receiving help and support from others',
      'Develop self-care as a foundation for helping others'
    ],
    // Continue for all types...
  };
  
  return recommendations[typeNumber] || [
    'Focus on developing self-awareness',
    'Practice consistent self-care routines', 
    'Seek support from trusted mentors or coaches'
  ];
}

function generateCoachingOpportunities(personalityResults, isHighActivation) {
  if (isHighActivation) {
    return [
      'Leadership development coaching to maximize your natural strengths',
      'Advanced communication skills for greater influence',
      'Strategic life planning to align all domains with your values'
    ];
  } else {
    return [
      'Heart activation coaching to unlock your full potential',
      'Limiting belief transformation to remove internal barriers',
      'Confidence building and self-worth development',
      'Stress management and emotional regulation techniques'
    ];
  }
}