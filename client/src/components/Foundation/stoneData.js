/**
 * Stone Data Configuration
 * Contains all the foundation stone sets and color configurations
 */

// Stone sets by center (Head, Heart, Body)
export const STONE_SETS = [
  // Head Center (Sets 0-2)
  [
    ["Analytical", "Observant", "Investigative"],
    ["Thoughtful", "Insightful", "Perceptive"],
    ["Strategic", "Focused", "Detail-oriented"]
  ],
  
  // Heart Center (Sets 3-5)
  [
    ["Empathetic", "Compassionate", "Understanding"],
    ["Expressive", "Passionate", "Authentic"],
    ["Supportive", "Caring", "Nurturing"]
  ],
  
  // Body Center (Sets 6-8)
  [
    ["Action-oriented", "Practical", "Hands-on"],
    ["Grounded", "Stable", "Reliable"],
    ["Adaptable", "Resilient", "Energetic"]
  ]
];

// Color schemes for stones
export const STONE_COLORS = {
  // Head Center
  0: {
    primary: '#3b82f6', // Blue-500
    light: '#93c5fd',   // Blue-300
    dark: '#1d4ed8'     // Blue-700
  },
  // Heart Center
  1: {
    primary: '#ef4444', // Red-500
    light: '#fca5a5',   // Red-300
    dark: '#b91c1c'     // Red-700
  },
  // Body Center
  2: {
    primary: '#10b981', // Emerald-500
    light: '#6ee7b7',   // Emerald-300
    dark: '#047857'     // Emerald-700
  },
  
  // Detailed colors for specific stones
  sets: {
    0: {
      // Head Set 1
      0: { primary: '#3b82f6', secondary: '#93c5fd' },
      1: { primary: '#4f46e5', secondary: '#a5b4fc' },
      2: { primary: '#2563eb', secondary: '#93c5fd' }
    },
    1: {
      // Head Set 2
      0: { primary: '#3b82f6', secondary: '#93c5fd' },
      1: { primary: '#4f46e5', secondary: '#a5b4fc' },
      2: { primary: '#2563eb', secondary: '#93c5fd' }
    },
    2: {
      // Head Set 3
      0: { primary: '#3b82f6', secondary: '#93c5fd' },
      1: { primary: '#4f46e5', secondary: '#a5b4fc' },
      2: { primary: '#2563eb', secondary: '#93c5fd' }
    },
    3: {
      // Heart Set 1
      0: { primary: '#ef4444', secondary: '#fca5a5' },
      1: { primary: '#dc2626', secondary: '#fca5a5' },
      2: { primary: '#b91c1c', secondary: '#fca5a5' }
    },
    4: {
      // Heart Set 2
      0: { primary: '#ef4444', secondary: '#fca5a5' },
      1: { primary: '#dc2626', secondary: '#fca5a5' },
      2: { primary: '#b91c1c', secondary: '#fca5a5' }
    },
    5: {
      // Heart Set 3
      0: { primary: '#ef4444', secondary: '#fca5a5' },
      1: { primary: '#dc2626', secondary: '#fca5a5' },
      2: { primary: '#b91c1c', secondary: '#fca5a5' }
    },
    6: {
      // Body Set 1
      0: { primary: '#10b981', secondary: '#6ee7b7' },
      1: { primary: '#059669', secondary: '#6ee7b7' },
      2: { primary: '#047857', secondary: '#6ee7b7' }
    },
    7: {
      // Body Set 2
      0: { primary: '#10b981', secondary: '#6ee7b7' },
      1: { primary: '#059669', secondary: '#6ee7b7' },
      2: { primary: '#047857', secondary: '#6ee7b7' }
    },
    8: {
      // Body Set 3
      0: { primary: '#10b981', secondary: '#6ee7b7' },
      1: { primary: '#059669', secondary: '#6ee7b7' },
      2: { primary: '#047857', secondary: '#6ee7b7' }
    }
  }
};

// Helper function to get stone color based on set index
export function getStoneColorBySetIndex(setIndex) {
  const centerType = Math.floor(setIndex / 3); // 0: Head, 1: Heart, 2: Body
  return STONE_COLORS[centerType] || STONE_COLORS[0];
}

// Helper function to get center name from set index
export function getCenterNameBySetIndex(setIndex) {
  const centers = ['Head', 'Heart', 'Body'];
  return centers[Math.floor(setIndex / 3)] || 'Head';
}

// Get detailed color for specific stone
export function getStoneGradient(setIndex, stoneIndex) {
  const centerType = Math.floor(setIndex / 3);
  const centerColors = STONE_COLORS[centerType];
  
  // Create gradient colors with variations based on stoneIndex
  return {
    from: stoneIndex === 0 ? centerColors.light : 
          stoneIndex === 1 ? centerColors.primary : 
          centerColors.primary,
    to: stoneIndex === 0 ? centerColors.primary : 
        stoneIndex === 1 ? centerColors.primary : 
        centerColors.dark
  };
}

// Get a flat array of all stone content
export function getAllStoneContent() {
  const flatData = [];
  
  STONE_SETS.forEach((set, setIndex) => {
    set.forEach((stoneContent, stoneIndex) => {
      flatData.push({
        id: `${setIndex}-${stoneIndex}`,
        content: stoneContent,
        setIndex,
        stoneIndex,
        center: getCenterNameBySetIndex(setIndex)
      });
    });
  });
  
  return flatData;
}