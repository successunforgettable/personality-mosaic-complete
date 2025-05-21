/**
 * Stone Data Module for the Foundation Phase
 * Contains stone definitions, colors, and helper functions
 */

// Stone set definitions with center-specific content for each stone
export const STONE_SETS = [
  // Set 1 (Head vs. Heart vs. Body)
  [
    "THINKING • ANALYSIS • LOGIC",
    "FEELING • EMOTION • CONNECTION",
    "ACTION • INSTINCT • PHYSICALITY"
  ],
  // Set 2
  [
    "PLANNING • STRATEGY • FORESIGHT",
    "EMPATHY • COMPASSION • SUPPORT",
    "MOTION • PRACTICE • IMPLEMENTATION"
  ],
  // Set 3
  [
    "KNOWLEDGE • UNDERSTANDING • WISDOM",
    "EXPRESSION • CREATIVITY • SENSITIVITY",
    "STRENGTH • ENDURANCE • RESILIENCE"
  ],
  // Set 4
  [
    "REASONING • CONSIDERATION • DELIBERATION",
    "ATTUNEMENT • HARMONY • BALANCE",
    "WILLPOWER • DECISIVENESS • COURAGE"
  ],
  // Set 5
  [
    "PERCEPTION • INSIGHT • CLARITY",
    "APPRECIATION • GRATITUDE • RECOGNITION",
    "GROUNDEDNESS • STABILITY • RELIABILITY"
  ],
  // Set 6
  [
    "MINDFULNESS • AWARENESS • ATTENTION",
    "PLAYFULNESS • JOY • SPONTANEITY",
    "PERSEVERANCE • DETERMINATION • DILIGENCE"
  ],
  // Set 7
  [
    "OBJECTIVITY • DETACHMENT • NEUTRALITY",
    "AUTHENTICITY • HONESTY • SINCERITY",
    "ADAPTABILITY • FLEXIBILITY • RESPONSIVENESS"
  ],
  // Set 8
  [
    "CURIOSITY • EXPLORATION • DISCOVERY",
    "ACCEPTANCE • FORGIVENESS • RECONCILIATION",
    "ASSERTIVENESS • BOUNDARY-SETTING • PROTECTION"
  ],
  // Set 9
  [
    "DISCERNMENT • DISCRIMINATION • PRECISION",
    "COMPASSION • KINDNESS • TENDERNESS",
    "PRESENCE • CENTEREDNESS • EMBODIMENT"
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