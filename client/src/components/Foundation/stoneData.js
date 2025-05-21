/**
 * Stone Data Module for the Foundation Phase
 * Contains stone definitions, colors, and helper functions
 */

export const STONE_SETS = [
  // Set 1 (Head vs. Heart vs. Body)
  [
    "THINKING • ANALYSIS • LOGIC",
    "FEELING • EMOTION • CONNECTION",
    "ACTION • INSTINCT • PHYSICALITY"
  ],
  
  // Set 2 (Fear vs. Shame vs. Anger)
  [
    "PREPARATION • CERTAINTY • SECURITY",
    "AUTHENTICITY • IMAGE • RECOGNITION",
    "JUSTICE • CONTROL • STRENGTH"
  ],
  
  // Set 3 (Energy Direction)
  [
    "REFLECTION • DEPTH • PRIVACY",
    "ACHIEVEMENT • INFLUENCE • IMPACT",
    "STRUCTURE • SUPPORT • HARMONY"
  ],
  
  // Set 4 (Social Approach)
  [
    "OBJECTIVITY • PERSPECTIVE • SPACE",
    "CLOSENESS • INTIMACY • BONDING",
    "INDEPENDENCE • SELF-RELIANCE • FREEDOM"
  ],
  
  // Set 5 (Processing Style)
  [
    "SYSTEMS • CONCEPTS • IDEAS",
    "EXPRESSION • MOOD • FEELING",
    "RESULTS • EFFICIENCY • UTILITY"
  ],
  
  // Set 6 (Stress Reaction)
  [
    "VIGILANCE • ANALYSIS • FORESIGHT",
    "RECOGNITION • IDENTITY • UNIQUENESS",
    "AUTHORITY • POWER • DIRECTION"
  ],
  
  // Set 7 (Conflict Style)
  [
    "PEACE • MEDIATION • COMPROMISE",
    "SUPPORT • FLEXIBILITY • ADAPTATION",
    "DIRECTNESS • CHALLENGE • HONESTY"
  ],
  
  // Set 8 (Success Definition)
  [
    "ACCURACY • PRINCIPLES • IMPROVEMENT",
    "CONNECTION • ACKNOWLEDGMENT • APPRECIATION",
    "MASTERY • ACHIEVEMENT • CAPABILITY"
  ],
  
  // Set 9 (Relationship Priority)
  [
    "AUTONOMY • SELF-SUFFICIENCY • SPACE",
    "MUTUALITY • SHARING • RECIPROCITY",
    "LEADERSHIP • MENTORSHIP • DIRECTION"
  ]
];

// Color definitions for the three centers with gradient variations
export const STONE_COLORS = {
  head: {
    primary: '#3b82f6',    // Blue base
    secondary: '#60a5fa',  // Lighter blue
    gradients: [
      'linear-gradient(135deg, #3b82f6, #60a5fa)',  // Standard blue gradient
      'linear-gradient(135deg, #2563eb, #3b82f6)',  // Deeper blue gradient
      'linear-gradient(135deg, #1d4ed8, #3b82f6)'   // Rich blue gradient
    ]
  },
  heart: {
    primary: '#ef4444',    // Red base
    secondary: '#f87171',  // Lighter red
    gradients: [
      'linear-gradient(135deg, #ef4444, #f87171)',  // Standard red gradient
      'linear-gradient(135deg, #dc2626, #ef4444)',  // Deeper red gradient
      'linear-gradient(135deg, #b91c1c, #ef4444)'   // Rich red gradient
    ]
  },
  body: {
    primary: '#10b981',    // Green base
    secondary: '#34d399',  // Lighter green
    gradients: [
      'linear-gradient(135deg, #10b981, #34d399)',  // Standard green gradient
      'linear-gradient(135deg, #059669, #10b981)',  // Deeper green gradient
      'linear-gradient(135deg, #047857, #10b981)'   // Rich green gradient
    ]
  }
};

/**
 * Get gradient style for a stone based on its set and position
 * @param {number} setIndex - Stone set index (0-2)
 * @param {number} stoneIndex - Stone index within the set (0-2)
 * @returns {string} CSS gradient string
 */
export const getStoneGradient = (setIndex = 0, stoneIndex = 0) => {
  // Map stone index to category
  const categoryMap = {
    0: 'head',
    1: 'heart',
    2: 'body'
  };
  
  const category = categoryMap[stoneIndex] || 'head';
  const colors = STONE_COLORS[category];
  
  // Select the gradient based on set index (with fallback)
  const gradientIndex = Math.min(setIndex, colors.gradients.length - 1);
  return colors.gradients[gradientIndex] || colors.gradients[0];
};

/**
 * Get category information including color and display name
 * @param {string} categoryId - Category identifier ('head', 'heart', 'body')
 * @returns {Object} Category information with colors and display name
 */
export const getCategoryInfo = (categoryId) => {
  const categories = {
    head: {
      id: 'head',
      name: 'Head Center',
      description: 'Thinking, analysis, and planning',
      colors: STONE_COLORS.head,
      icon: '🧠'
    },
    heart: {
      id: 'heart',
      name: 'Heart Center',
      description: 'Emotion, connection, and relationships',
      colors: STONE_COLORS.heart,
      icon: '❤️'
    },
    body: {
      id: 'body',
      name: 'Body Center',
      description: 'Action, instinct, and physical awareness',
      colors: STONE_COLORS.body,
      icon: '👤'
    }
  };
  
  return categories[categoryId] || categories.head;
};

// Center-specific trait descriptions
export const CENTER_TRAITS = {
  head: [
    'Analytical thinking',
    'Strategic planning',
    'Intellectual curiosity',
    'Rational decision-making',
    'Problem-solving ability',
    'Information processing',
    'Mental focus',
    'Conceptual understanding'
  ],
  heart: [
    'Emotional awareness',
    'Empathetic connection',
    'Interpersonal skills',
    'Authentic expression',
    'Compassionate perspective',
    'Relationship building',
    'Social intelligence',
    'Emotional resilience'
  ],
  body: [
    'Physical awareness',
    'Instinctual responses',
    'Action orientation',
    'Practical implementation',
    'Kinesthetic intelligence',
    'Energetic presence',
    'Sensory perception',
    'Rhythmic movement'
  ]
};