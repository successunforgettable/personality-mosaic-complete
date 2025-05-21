/**
 * Stone Data Module for the Foundation Phase
 * Contains stone definitions, colors, and helper functions
 */

// Stone set definitions with center-specific content for each stone
export const STONE_SETS = [
  // Set 0: Primary stone set (Head, Heart, Body)
  [
    // 0: Head center stone
    'Thinking Center•Analysis & Logic•Strategic Planning',
    // 1: Heart center stone
    'Feeling Center•Empathy & Connection•Emotional Intelligence',
    // 2: Body center stone
    'Instinctual Center•Action & Energy•Physical Awareness'
  ],
  // Set 1: Alternative stone set (can be used for different user groups)
  [
    // 0: Head center stone
    'Intellectual Center•Reasoning & Problem Solving•Mental Processing',
    // 1: Heart center stone
    'Emotional Center•Relationships & Compassion•Social Awareness',
    // 2: Body center stone
    'Physical Center•Momentum & Vitality•Gut Reactions'
  ],
  // Set 2: Advanced stone set (more nuanced descriptions)
  [
    // 0: Head center stone
    'Mind Center•Analytical Processing•Conceptual Understanding•Strategic Thinking',
    // 1: Heart center stone
    'Heart Center•Emotional Intelligence•Relational Connection•Interpersonal Harmony',
    // 2: Body center stone 
    'Body Center•Action Intelligence•Physical Awareness•Instinctive Response'
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