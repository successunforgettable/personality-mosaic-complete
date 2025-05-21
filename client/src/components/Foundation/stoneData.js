/**
 * Stone data for the Personality Mosaic Assessment System
 */

// Stone content organized by sets
// 9 sets total (3 for each center: Head, Heart, Body)
export const STONE_SETS = [
  // Head Center - Set 1
  [
    ['Analytical', 'Observant', 'Investigative'],
    ['Thoughtful', 'Insightful', 'Perceptive'],
    ['Strategic', 'Focused', 'Detail-oriented']
  ],
  // Head Center - Set 2
  [
    ['Intellectual', 'Questioning', 'Curious'],
    ['Logical', 'Rational', 'Objective'],
    ['Contemplative', 'Reflective', 'Deep-thinking']
  ],
  // Head Center - Set 3
  [
    ['Imaginative', 'Innovative', 'Creative'],
    ['Problem-solver', 'Comprehensive', 'Methodical'],
    ['Skeptical', 'Cautious', 'Vigilant']
  ],
  
  // Heart Center - Set 1
  [
    ['Empathetic', 'Compassionate', 'Understanding'],
    ['Supportive', 'Nurturing', 'Caring'],
    ['Authentic', 'Genuine', 'Sincere']
  ],
  // Heart Center - Set 2
  [
    ['Passionate', 'Expressive', 'Emotive'],
    ['Relational', 'Connected', 'Interpersonal'],
    ['Generous', 'Giving', 'Altruistic']
  ],
  // Heart Center - Set 3
  [
    ['Harmonious', 'Diplomatic', 'Peacemaking'],
    ['Intuitive', 'Sensitive', 'Perceptive'],
    ['Loyal', 'Trustworthy', 'Devoted']
  ],
  
  // Body Center - Set 1
  [
    ['Decisive', 'Action-oriented', 'Proactive'],
    ['Grounded', 'Stable', 'Reliable'],
    ['Resilient', 'Enduring', 'Persistent']
  ],
  // Body Center - Set 2
  [
    ['Assertive', 'Confident', 'Self-assured'],
    ['Practical', 'Sensible', 'Realistic'],
    ['Protective', 'Dependable', 'Steadfast']
  ],
  // Body Center - Set 3
  [
    ['Energetic', 'Vital', 'Dynamic'],
    ['Disciplined', 'Structured', 'Organized'],
    ['Adaptable', 'Flexible', 'Responsive']
  ]
];

// Color schemes for all stone sets
export const STONE_COLORS = {
  // By center type (for original logic backward compatibility)
  0: {
    primary: '#3b82f6', // Blue-500
    light: '#93c5fd',   // Blue-300
    dark: '#1d4ed8'     // Blue-700
  },
  1: {
    primary: '#ef4444', // Red-500
    light: '#fca5a5',   // Red-300
    dark: '#b91c1c'     // Red-700
  },
  2: {
    primary: '#10b981', // Emerald-500
    light: '#6ee7b7',   // Emerald-300
    dark: '#047857'     // Emerald-700
  },
  
  // By set for more specific color mapping
  sets: {
    // Head sets (0-2)
    0: { // Set 1 - Head
      0: { primary: '#60a5fa', secondary: '#3b82f6' }, // Lighter blue
      1: { primary: '#93c5fd', secondary: '#2563eb' }, // Medium blue
      2: { primary: '#1d4ed8', secondary: '#1e40af' }  // Dark blue
    },
    1: { // Set 2 - Head
      0: { primary: '#a78bfa', secondary: '#8b5cf6' }, // Light purple
      1: { primary: '#8b5cf6', secondary: '#7c3aed' }, // Medium purple
      2: { primary: '#6d28d9', secondary: '#5b21b6' }  // Dark purple
    },
    2: { // Set 3 - Head
      0: { primary: '#38bdf8', secondary: '#0ea5e9' }, // Light sky blue
      1: { primary: '#0ea5e9', secondary: '#0284c7' }, // Medium sky blue
      2: { primary: '#0284c7', secondary: '#0369a1' }  // Dark sky blue
    },
    
    // Heart sets (3-5)
    3: { // Set 1 - Heart
      0: { primary: '#f87171', secondary: '#ef4444' }, // Light red
      1: { primary: '#ef4444', secondary: '#dc2626' }, // Medium red
      2: { primary: '#dc2626', secondary: '#b91c1c' }  // Dark red
    },
    4: { // Set 2 - Heart
      0: { primary: '#fb7185', secondary: '#e11d48' }, // Light rose
      1: { primary: '#e11d48', secondary: '#be123c' }, // Medium rose
      2: { primary: '#be123c', secondary: '#9f1239' }  // Dark rose
    },
    5: { // Set 3 - Heart
      0: { primary: '#fb923c', secondary: '#f97316' }, // Light orange
      1: { primary: '#f97316', secondary: '#ea580c' }, // Medium orange
      2: { primary: '#ea580c', secondary: '#c2410c' }  // Dark orange
    },
    
    // Body sets (6-8)
    6: { // Set 1 - Body
      0: { primary: '#4ade80', secondary: '#22c55e' }, // Light green
      1: { primary: '#22c55e', secondary: '#16a34a' }, // Medium green
      2: { primary: '#16a34a', secondary: '#15803d' }  // Dark green
    },
    7: { // Set 2 - Body
      0: { primary: '#34d399', secondary: '#10b981' }, // Light emerald
      1: { primary: '#10b981', secondary: '#059669' }, // Medium emerald
      2: { primary: '#059669', secondary: '#047857' }  // Dark emerald
    },
    8: { // Set 3 - Body
      0: { primary: '#2dd4bf', secondary: '#14b8a6' }, // Light teal
      1: { primary: '#14b8a6', secondary: '#0d9488' }, // Medium teal
      2: { primary: '#0d9488', secondary: '#0f766e' }  // Dark teal
    }
  }
};

// Helper function to get stone color based on set index
export const getStoneColorBySetIndex = (setIndex) => {
  const centerIndex = Math.floor(setIndex / 3); // 0: Head, 1: Heart, 2: Body
  return STONE_COLORS[centerIndex];
};

// Helper function to get center name from set index
export const getCenterNameBySetIndex = (setIndex) => {
  const centers = ['Head', 'Heart', 'Body'];
  return centers[Math.floor(setIndex / 3)];
};

// Get detailed color for specific stone
export const getStoneGradient = (setIndex, stoneIndex) => {
  // Convert to numbers to ensure proper lookup
  const setIdx = Number(setIndex);
  const stoneIdx = Number(stoneIndex);
  
  // Safely get colors with fallbacks
  const setColors = STONE_COLORS.sets[setIdx] || 
                   STONE_COLORS.sets[Math.floor(setIdx / 3) * 3]; // fall back to first set in same center
  
  const colors = setColors?.[stoneIdx] || 
                { primary: '#94a3b8', secondary: '#64748b' }; // slate fallback colors
  
  return {
    from: colors.secondary,
    to: colors.primary
  };
};

// Get a flat array of all stone content
export const getAllStoneContent = () => {
  const allStones = [];
  
  STONE_SETS.forEach((set, setIndex) => {
    set.forEach((stoneContent, stoneIndex) => {
      allStones.push({
        id: `${setIndex}-${stoneIndex}`,
        content: stoneContent,
        setIndex,
        stoneIndex,
        center: getCenterNameBySetIndex(setIndex)
      });
    });
  });
  
  return allStones;
};