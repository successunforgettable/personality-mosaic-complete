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

// Color schemes for the three centers
export const STONE_COLORS = [
  // Head Center (Blues)
  {
    primary: '#3b82f6', // Blue-500
    light: '#93c5fd',   // Blue-300
    dark: '#1d4ed8'     // Blue-700
  },
  // Heart Center (Reds)
  {
    primary: '#ef4444', // Red-500
    light: '#fca5a5',   // Red-300
    dark: '#b91c1c'     // Red-700
  },
  // Body Center (Greens)
  {
    primary: '#10b981', // Emerald-500
    light: '#6ee7b7',   // Emerald-300
    dark: '#047857'     // Emerald-700
  }
];

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