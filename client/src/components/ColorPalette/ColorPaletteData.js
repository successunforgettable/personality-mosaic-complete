/**
 * Color palette data for the Personality Mosaic Assessment System
 * These represent the five states a person can operate in
 */

export const STATE_COLORS = {
  veryGood: {
    name: 'Very Good State',
    description: 'I feel balanced and at peace with imperfection. I channel my natural strengths into positive change.',
    primary: '#22c55e', // Green-500
    light: '#4ade80',   // Green-400
    dark: '#166534',    // Green-800
    textColor: 'text-green-600'
  },
  good: {
    name: 'Good State',
    description: 'I am growing in self-awareness and making progress. I recognize patterns and choose better responses.',
    primary: '#10b981', // Emerald-500
    light: '#34d399',   // Emerald-400
    dark: '#065f46',    // Emerald-800
    textColor: 'text-emerald-600'
  },
  average: {
    name: 'Average State',
    description: 'I function adequately but fall back into old habits. I am aware of tendencies but not always managing them.',
    primary: '#f59e0b', // Amber-500
    light: '#fcd34d',   // Amber-300
    dark: '#b45309',    // Amber-700
    textColor: 'text-amber-600'
  },
  belowAverage: {
    name: 'Below Average State',
    description: 'I struggle with negative patterns and often feel stuck. My awareness is limited and I react automatically.',
    primary: '#f97316', // Orange-500
    light: '#fb923c',   // Orange-400
    dark: '#c2410c',    // Orange-700
    textColor: 'text-orange-600'
  },
  destructive: {
    name: 'Destructive State',
    description: 'I am trapped in harmful patterns that damage myself and others. My self-awareness is minimal.',
    primary: '#ef4444', // Red-500
    light: '#f87171',   // Red-400
    dark: '#b91c1c',    // Red-700
    textColor: 'text-red-600'
  }
};

// Recommended state palette pairs by personality type
export const RECOMMENDED_STATES = {
  // Head types (5, 6, 7)
  5: ['veryGood', 'average'],
  6: ['good', 'belowAverage'],
  7: ['veryGood', 'belowAverage'],
  
  // Heart types (2, 3, 4)
  2: ['good', 'belowAverage'],
  3: ['veryGood', 'belowAverage'],
  4: ['good', 'destructive'],
  
  // Body types (8, 9, 1)
  8: ['veryGood', 'destructive'],
  9: ['good', 'average'],
  1: ['veryGood', 'belowAverage']
};

// Helper function to get state color by key
export const getStateColor = (stateKey) => {
  return STATE_COLORS[stateKey] || STATE_COLORS.average;
};

// Helper function to generate gradient background style
export const getGradientStyle = (stateKey) => {
  const color = getStateColor(stateKey);
  return {
    backgroundImage: `radial-gradient(circle at 70% 30%, ${color.light} 0%, ${color.primary} 50%, ${color.dark} 100%)`
  };
};

// Helper function to generate blend background between two states
export const getBlendedBackground = (state1, state2, ratio = 50) => {
  const color1 = getStateColor(state1);
  const color2 = getStateColor(state2);
  
  return {
    backgroundImage: `linear-gradient(to right, ${color1.primary}, ${color2.primary})`
  };
};