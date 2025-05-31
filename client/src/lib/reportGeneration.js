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

// Comprehensive trajectory projections for all life domains
const TRAJECTORY_PROJECTIONS = {
  'health-vitality': {
    high: {
      current: 'You maintain consistent energy levels and prioritize physical wellbeing as a foundation for all other life activities',
      shortTerm: 'Sustained energy and vitality supporting all life areas over the next 3 months',
      mediumTerm: 'Robust health foundation enabling major life goals within 1 year',
      longTerm: 'Long-term wellness creating lasting life satisfaction and longevity over 3+ years',
      indicators: ['Daily energy levels 7-9/10', 'Consistent exercise routine', 'Balanced nutrition', 'Quality sleep patterns']
    },
    low: {
      current: 'You experience fluctuating energy levels and health challenges that impact your daily effectiveness and life satisfaction',
      shortTerm: 'Declining energy affecting daily performance and mood over the next 3 months',
      mediumTerm: 'Health issues limiting life opportunities and career advancement within 1 year',
      longTerm: 'Chronic health problems significantly impacting quality of life over 3+ years',
      indicators: ['Daily energy levels 3-5/10', 'Irregular or no exercise', 'Poor nutritional choices', 'Sleep disruption']
    }
  },
  'career-purpose': {
    high: {
      current: 'You feel aligned with your work purpose and see clear pathways for meaningful professional growth and contribution',
      shortTerm: 'Clear direction and momentum in meaningful work over the next 3 months',
      mediumTerm: 'Significant career advancement aligned with purpose within 1 year',
      longTerm: 'Legacy-building career with lasting impact over 3+ years',
      indicators: ['High job satisfaction', 'Clear career vision', 'Skill development progress', 'Recognition and advancement']
    },
    low: {
      current: 'You feel disconnected from your work purpose and uncertain about your professional direction and growth potential',
      shortTerm: 'Career frustration and lack of direction over the next 3 months',
      mediumTerm: 'Professional stagnation and missed opportunities within 1 year',
      longTerm: 'Retirement regret and unfulfilled potential over 3+ years',
      indicators: ['Low job satisfaction', 'Unclear career direction', 'Skill stagnation', 'Limited advancement']
    }
  },
  'financial-abundance': {
    high: {
      current: 'You maintain healthy financial habits and feel confident about your financial security and wealth-building strategy',
      shortTerm: 'Improving financial security and wise investments over the next 3 months',
      mediumTerm: 'Substantial wealth building and financial freedom within 1 year',
      longTerm: 'Generational wealth and financial legacy over 3+ years',
      indicators: ['Emergency fund 6+ months', 'Regular savings/investments', 'Debt management', 'Financial planning']
    },
    low: {
      current: 'You experience financial stress and uncertainty that affects your decisions and limits your life choices',
      shortTerm: 'Financial stress and limited opportunities over the next 3 months',
      mediumTerm: 'Debt accumulation and financial instability within 1 year',
      longTerm: 'Retirement insecurity and financial hardship over 3+ years',
      indicators: ['Living paycheck to paycheck', 'No emergency fund', 'Increasing debt', 'No retirement planning']
    }
  },
  'intimate-relationships': {
    high: {
      current: 'You experience deep emotional connection and mutual support in your closest relationships',
      shortTerm: 'Strengthening intimate bonds and communication over the next 3 months',
      mediumTerm: 'Deepening relationship satisfaction and partnership within 1 year',
      longTerm: 'Lasting intimate connections providing lifelong support over 3+ years',
      indicators: ['Open communication', 'Emotional intimacy', 'Mutual support', 'Conflict resolution skills']
    },
    low: {
      current: 'You struggle with emotional distance and communication challenges in your closest relationships',
      shortTerm: 'Increasing relationship tension and misunderstandings over the next 3 months',
      mediumTerm: 'Relationship breakdown or emotional disconnection within 1 year',
      longTerm: 'Chronic loneliness and failed partnerships over 3+ years',
      indicators: ['Poor communication', 'Emotional distance', 'Frequent conflicts', 'Relationship avoidance']
    }
  },
  'family-harmony': {
    high: {
      current: 'You enjoy supportive family relationships with healthy boundaries and mutual respect',
      shortTerm: 'Continued family stability and connection over the next 3 months',
      mediumTerm: 'Stronger family bonds and traditions within 1 year',
      longTerm: 'Multigenerational family legacy and support system over 3+ years',
      indicators: ['Regular family contact', 'Healthy boundaries', 'Mutual support', 'Shared values']
    },
    low: {
      current: 'You experience family tension, misunderstandings, or emotional distance that creates ongoing stress',
      shortTerm: 'Escalating family conflicts and emotional strain over the next 3 months',
      mediumTerm: 'Family estrangement or broken relationships within 1 year',
      longTerm: 'Generational trauma and family dysfunction over 3+ years',
      indicators: ['Infrequent family contact', 'Ongoing conflicts', 'Emotional wounds', 'Value misalignment']
    }
  },
  'social-connection': {
    high: {
      current: 'You maintain meaningful friendships and feel connected to your community with a strong social support network',
      shortTerm: 'Expanding social network and community involvement over the next 3 months',
      mediumTerm: 'Leadership roles and meaningful community impact within 1 year',
      longTerm: 'Lasting social legacy and community influence over 3+ years',
      indicators: ['Close friendships', 'Community involvement', 'Social activities', 'Network support']
    },
    low: {
      current: 'You feel socially isolated or struggle to maintain meaningful connections with others',
      shortTerm: 'Increasing social withdrawal and loneliness over the next 3 months',
      mediumTerm: 'Social isolation and community disconnection within 1 year',
      longTerm: 'Chronic loneliness and social marginalization over 3+ years',
      indicators: ['Few close friends', 'Social anxiety', 'Isolation tendencies', 'Limited social activities']
    }
  },
  'personal-growth': {
    high: {
      current: 'You actively pursue self-improvement and feel motivated to develop your potential across multiple areas',
      shortTerm: 'Accelerated personal development and skill acquisition over the next 3 months',
      mediumTerm: 'Significant personal transformation and mastery within 1 year',
      longTerm: 'Wisdom development and self-actualization over 3+ years',
      indicators: ['Learning new skills', 'Self-reflection practice', 'Goal achievement', 'Personal challenges']
    },
    low: {
      current: 'You feel stuck in personal development and struggle to motivate yourself toward meaningful growth',
      shortTerm: 'Continued stagnation and missed growth opportunities over the next 3 months',
      mediumTerm: 'Personal regression and skill atrophy within 1 year',
      longTerm: 'Unfulfilled potential and life regrets over 3+ years',
      indicators: ['Comfort zone adherence', 'Learning avoidance', 'Goal abandonment', 'Self-limiting beliefs']
    }
  },
  'spiritual-alignment': {
    high: {
      current: 'You feel connected to a sense of purpose and meaning that transcends daily concerns and guides your decisions',
      shortTerm: 'Deepening spiritual practice and purpose clarity over the next 3 months',
      mediumTerm: 'Spiritual wisdom integration and meaningful service within 1 year',
      longTerm: 'Transcendent purpose fulfillment and spiritual legacy over 3+ years',
      indicators: ['Regular spiritual practice', 'Purpose clarity', 'Value alignment', 'Service orientation']
    },
    low: {
      current: 'You struggle with questions of meaning and purpose, feeling disconnected from deeper spiritual fulfillment',
      shortTerm: 'Continued existential questioning and spiritual confusion over the next 3 months',
      mediumTerm: 'Spiritual crisis and meaning vacuum within 1 year',
      longTerm: 'Existential despair and purposeless living over 3+ years',
      indicators: ['Spiritual confusion', 'Purpose uncertainty', 'Value conflicts', 'Meaning seeking']
    }
  }
};

/**
 * Generate comprehensive personality report
 */
export function generateComprehensiveReport(personalityResults) {
  const pattern = CORE_ENERGY_PATTERNS[personalityResults.primaryType.number];
  const activationLevel = personalityResults.heartActivation?.activationPercentage || 50;
  const isHighActivation = activationLevel >= 60;
  
  // Generate comprehensive domain impact analysis
  const domainAnalysis = Object.entries(LIFE_DOMAINS).map(([domainId, domainName]) => {
    const impact = pattern.domainImpacts[domainId];
    const currentImpact = isHighActivation ? impact.high : impact.low;
    const projections = TRAJECTORY_PROJECTIONS[domainId];
    const projection = projections ? (isHighActivation ? projections.high : projections.low) : null;
    
    return {
      domainId,
      domainName,
      currentState: projection?.current || currentImpact,
      currentImpact,
      activationScore: isHighActivation ? Math.round(70 + Math.random() * 25) : Math.round(20 + Math.random() * 30),
      indicators: projection?.indicators || [],
      shortTermProjection: projection?.shortTerm || 'Continued current trajectory',
      mediumTermProjection: projection?.mediumTerm || 'Amplified current patterns',
      longTermProjection: projection?.longTerm || 'Established life patterns'
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
  const patternNumber = personalityResults.primaryType.number;
  
  const recommendations = {
    1: isHighActivation ? [
      'Channel your high standards into inspiring others while maintaining realistic expectations',
      'Practice self-compassion alongside your pursuit of excellence to avoid perfectionist burnout',
      'Use your moral clarity to lead positive change in your community and workplace',
      'Balance your improvement focus with acceptance of current circumstances',
      'Develop delegation skills to multiply your positive impact through others'
    ] : [
      'Practice accepting "good enough" in non-critical areas to reduce overwhelming pressure',
      'Develop flexibility in your standards and expectations to improve relationships', 
      'Focus on progress over perfection to maintain motivation and momentum',
      'Address inner critic patterns that may be limiting your happiness and success',
      'Cultivate patience with yourself and others during improvement processes'
    ],
    2: isHighActivation ? [
      'Use your caring nature to support others\' independence rather than creating dependency',
      'Maintain healthy boundaries while helping to sustain your energy and effectiveness',
      'Channel your empathy into sustainable service that honors both your needs and others\' needs',
      'Develop leadership skills that empower others to grow and succeed',
      'Create systems for self-care that support your continued service to others'
    ] : [
      'Focus on identifying and expressing your own needs clearly and directly',
      'Practice receiving help and support from others to balance your giving nature',
      'Develop self-care as a foundation for helping others sustainably',
      'Address patterns of resentment by setting clearer boundaries and expectations',
      'Cultivate self-worth independent of how much you help or please others'
    ],
    3: isHighActivation ? [
      'Align your success drive with authentic personal values and deeper purpose',
      'Use your achievement orientation to inspire and mentor others toward their goals',
      'Balance external success with internal fulfillment and genuine self-expression',
      'Develop authentic leadership that values people as well as results',
      'Create legacy goals that extend beyond personal recognition or achievement'
    ] : [
      'Reconnect with authentic personal values beneath image and success concerns',
      'Develop emotional intelligence and vulnerability to deepen relationships',
      'Practice being valued for who you are rather than what you accomplish',
      'Address workaholic tendencies by creating boundaries between work and personal life',
      'Cultivate internal validation rather than relying solely on external recognition'
    ],
    4: isHighActivation ? [
      'Channel your emotional depth and creativity into meaningful work and relationships',
      'Use your authenticity to inspire others to embrace their own uniqueness',
      'Balance emotional intensity with practical action and follow-through',
      'Develop your unique gifts into valuable contributions to your community',
      'Practice gratitude for what you have while honoring your desire for depth and meaning'
    ] : [
      'Focus on practical action steps rather than getting lost in emotional overwhelm',
      'Develop emotional regulation skills to manage intensity and mood swings',
      'Practice appreciating what you have instead of focusing on what\'s missing',
      'Address envy and comparison patterns that may be limiting your happiness',
      'Cultivate stable routines and structures to support your creative expression'
    ],
    5: isHighActivation ? [
      'Share your knowledge and insights more openly with others who can benefit',
      'Use your analytical skills to solve meaningful problems in your community',
      'Balance your need for privacy with healthy social connection and collaboration',
      'Develop teaching or mentoring abilities to multiply your knowledge impact',
      'Practice engaging with life experientially rather than just intellectually'
    ] : [
      'Practice engaging more actively with life rather than withdrawing into observation',
      'Develop social skills and emotional intelligence to improve relationships',
      'Address fears of incompetence by taking action despite feeling unprepared',
      'Cultivate physical vitality and presence rather than living primarily in your mind',
      'Build practical life skills and engage with the material world more fully'
    ],
    6: isHighActivation ? [
      'Use your loyalty and commitment to build strong, lasting relationships and communities',
      'Channel your protective instincts into leadership roles that support others\' security',
      'Balance seeking security with taking calculated risks for growth and opportunity',
      'Develop your natural troubleshooting abilities into valuable problem-solving skills',
      'Practice trusting your own judgment while maintaining openness to guidance'
    ] : [
      'Address anxiety and fear patterns that may be limiting your life choices and happiness',
      'Develop self-confidence and trust in your own abilities and judgment',
      'Practice taking action despite uncertainty rather than seeking endless reassurance',
      'Build internal security rather than relying solely on external authorities or systems',
      'Cultivate optimism and focus on positive possibilities rather than potential problems'
    ],
    7: isHighActivation ? [
      'Focus your enthusiasm and energy on fewer, more meaningful pursuits for deeper impact',
      'Use your optimism and vision to inspire others toward positive possibilities',
      'Balance your need for stimulation with commitment and follow-through',
      'Develop your natural planning abilities into strategic thinking and leadership',
      'Practice gratitude and presence to fully enjoy your experiences rather than always seeking the next thing'
    ] : [
      'Address restlessness and commitment issues by developing patience and persistence',
      'Practice dealing with difficult emotions rather than avoiding them through distraction',
      'Develop focus and discipline to complete important projects and goals',
      'Cultivate depth in relationships rather than maintaining only surface-level connections',
      'Address impulsivity by developing better decision-making and planning skills'
    ],
    8: isHighActivation ? [
      'Channel your natural leadership into creating positive change and protecting the vulnerable',
      'Use your strength and decisiveness to empower others rather than controlling them',
      'Balance your intensity with compassion and emotional sensitivity',
      'Develop collaborative leadership that values others\' input and contributions',
      'Practice vulnerability and emotional openness to deepen relationships'
    ] : [
      'Address anger and control issues that may be damaging your relationships',
      'Develop emotional intelligence and sensitivity to others\' needs and feelings',
      'Practice collaboration and compromise rather than always needing to be in charge',
      'Cultivate patience and gentleness, especially with those who are different or weaker',
      'Address tendencies toward excess or addiction by developing healthy coping mechanisms'
    ],
    9: isHighActivation ? [
      'Use your natural peacemaking abilities to facilitate harmony and collaboration',
      'Channel your inclusive perspective into leadership roles that unite diverse groups',
      'Balance your easygoing nature with assertiveness when important values are at stake',
      'Develop your natural counseling abilities to help others resolve conflicts',
      'Practice taking initiative and making decisions rather than always going with the flow'
    ] : [
      'Address procrastination and inertia by developing motivation and action-taking skills',
      'Practice asserting your needs and opinions rather than always accommodating others',
      'Develop anger awareness and healthy expression rather than suppressing conflicts',
      'Cultivate personal initiative and leadership rather than always following others',
      'Address avoidance patterns by facing difficult conversations and decisions directly'
    ]
  };
  
  return recommendations[patternNumber] || [
    'Focus on developing self-awareness through reflection and feedback',
    'Practice consistent self-care routines that support your physical and emotional wellbeing', 
    'Seek support from trusted mentors, coaches, or therapists for personalized growth guidance',
    'Set clear goals and create accountability systems to support positive change',
    'Cultivate mindfulness and presence to better understand your patterns and choices'
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