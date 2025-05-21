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

// Stone color variations - map set indices to colors
export const STONE_COLORS = {
  0: { // Set 1 - Head/Heart/Body
    0: { primary: '#60a5fa', secondary: '#3b82f6' }, // Head - Blue
    1: { primary: '#f87171', secondary: '#ef4444' }, // Heart - Red
    2: { primary: '#4ade80', secondary: '#22c55e' }  // Body - Green
  },
  1: { // Set 2 - Fear/Shame/Anger
    0: { primary: '#a78bfa', secondary: '#8b5cf6' }, // Fear - Purple
    1: { primary: '#fbbf24', secondary: '#f59e0b' }, // Shame - Yellow
    2: { primary: '#fb7185', secondary: '#e11d48' }  // Anger - Red
  },
  2: { // Set 3 - Energy Direction
    0: { primary: '#818cf8', secondary: '#6366f1' }, // Reflection - Indigo
    1: { primary: '#f472b6', secondary: '#db2777' }, // Achievement - Pink
    2: { primary: '#34d399', secondary: '#10b981' }  // Structure - Emerald
  },
  3: { // Set 4 - Social Approach
    0: { primary: '#93c5fd', secondary: '#60a5fa' }, // Objectivity - Light Blue
    1: { primary: '#fdba74', secondary: '#f97316' }, // Closeness - Orange
    2: { primary: '#a3e635', secondary: '#84cc16' }  // Independence - Lime
  },
  4: { // Set 5 - Processing Style
    0: { primary: '#38bdf8', secondary: '#0ea5e9' }, // Systems - Sky
    1: { primary: '#e879f9', secondary: '#d946ef' }, // Expression - Fuchsia
    2: { primary: '#2dd4bf', secondary: '#14b8a6' }  // Results - Teal
  },
  5: { // Set 6 - Stress Reaction 
    0: { primary: '#c4b5fd', secondary: '#a78bfa' }, // Vigilance - Lavender
    1: { primary: '#fb923c', secondary: '#ea580c' }, // Recognition - Deep Orange
    2: { primary: '#fb7185', secondary: '#e11d48' }  // Authority - Rose
  },
  6: { // Set 7 - Conflict Style
    0: { primary: '#86efac', secondary: '#4ade80' }, // Peace - Light Green
    1: { primary: '#fcd34d', secondary: '#f59e0b' }, // Support - Amber
    2: { primary: '#f43f5e', secondary: '#be123c' }  // Directness - Deep Rose
  },
  7: { // Set 8 - Success Definition
    0: { primary: '#60a5fa', secondary: '#3b82f6' }, // Accuracy - Blue
    1: { primary: '#f87171', secondary: '#ef4444' }, // Connection - Red
    2: { primary: '#4ade80', secondary: '#22c55e' }  // Mastery - Green
  },
  8: { // Set 9 - Relationship Priority
    0: { primary: '#a78bfa', secondary: '#8b5cf6' }, // Autonomy - Purple
    1: { primary: '#f472b6', secondary: '#db2777' }, // Mutuality - Pink
    2: { primary: '#38bdf8', secondary: '#0ea5e9' }  // Leadership - Sky
  }
};

// Function to get gradient for a stone based on set and selection
export const getStoneGradient = (setIndex, stoneIndex) => {
  const setColors = STONE_COLORS[setIndex] || STONE_COLORS[0]; // Fallback to Set 1 colors
  const colors = setColors[stoneIndex] || { primary: '#94a3b8', secondary: '#64748b' }; // Default gray
  
  return `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`;
};