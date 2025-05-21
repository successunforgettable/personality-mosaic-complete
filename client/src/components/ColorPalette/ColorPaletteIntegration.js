import { STATE_COLORS } from './ColorPaletteData';

/**
 * Functions to integrate color palette data with other components
 */

/**
 * Creates an updated state distribution from a selection of states and percentage
 * @param {Array} selectedStates - Array of two state keys
 * @param {Number} firstStatePercentage - Percentage for the first state (0-100)
 * @returns {Object} Complete state distribution object
 */
export const createStateDistribution = (selectedStates, firstStatePercentage) => {
  if (!selectedStates || selectedStates.length !== 2 || firstStatePercentage === undefined) {
    return null;
  }
  
  // Create complete distribution with all states at 0
  const distribution = {
    veryGood: 0,
    good: 0,
    average: 0,
    belowAverage: 0,
    destructive: 0
  };
  
  // Set values for selected states
  const [state1, state2] = selectedStates;
  distribution[state1] = firstStatePercentage;
  distribution[state2] = 100 - firstStatePercentage;
  
  return distribution;
};

/**
 * Gets CSS color values for a state distribution to use in tower visualization
 * @param {Object} stateDistribution - The distribution of states
 * @returns {Object} Object with primary, light, and dark color values
 */
export const getStateColors = (stateDistribution) => {
  if (!stateDistribution) {
    return {
      primary: '#64748b', // Default slate-500
      light: '#94a3b8',   // Default slate-400
      dark: '#334155'     // Default slate-700
    };
  }
  
  // Find the dominant state (highest percentage)
  let dominantState = null;
  let highestPercentage = 0;
  
  Object.entries(stateDistribution).forEach(([state, percentage]) => {
    if (percentage > highestPercentage) {
      dominantState = state;
      highestPercentage = percentage;
    }
  });
  
  // Return colors for the dominant state
  return dominantState ? 
    STATE_COLORS[dominantState] : 
    STATE_COLORS.average; // Default to average if no dominant state
};

/**
 * Helper to calculate blended colors for tower visualization
 * @param {Object} stateDistribution - The distribution of states
 * @returns {Object} Object with blended colors
 */
export const getBlendedStateColors = (stateDistribution) => {
  if (!stateDistribution) {
    return {
      primary: '#64748b',
      light: '#94a3b8',
      dark: '#334155'
    };
  }
  
  // Get non-zero state entries
  const activeStates = Object.entries(stateDistribution)
    .filter(([_, percentage]) => percentage > 0)
    .sort((a, b) => b[1] - a[1]); // Sort by percentage desc
  
  // If no active states, return default
  if (activeStates.length === 0) {
    return {
      primary: '#64748b',
      light: '#94a3b8',
      dark: '#334155'
    };
  }
  
  // If only one active state, return its colors
  if (activeStates.length === 1) {
    const [stateKey] = activeStates[0];
    return {
      primary: STATE_COLORS[stateKey].primary,
      light: STATE_COLORS[stateKey].light,
      dark: STATE_COLORS[stateKey].dark
    };
  }
  
  // For two or more states, calculate weighted color blends
  // This is a simplified blend that doesn't account for true color mixing physics
  const totalPercentage = activeStates.reduce((sum, [_, percentage]) => sum + percentage, 0);
  
  const blendedColors = {
    primary: blendColors(activeStates.map(([state, percentage]) => ({
      color: STATE_COLORS[state].primary,
      weight: percentage / totalPercentage
    }))),
    light: blendColors(activeStates.map(([state, percentage]) => ({
      color: STATE_COLORS[state].light,
      weight: percentage / totalPercentage
    }))),
    dark: blendColors(activeStates.map(([state, percentage]) => ({
      color: STATE_COLORS[state].dark,
      weight: percentage / totalPercentage
    })))
  };
  
  return blendedColors;
};

/**
 * Helper function to blend multiple colors with weights
 * @param {Array} colorWeights - Array of {color, weight} objects
 * @returns {String} Blended color as hex
 */
const blendColors = (colorWeights) => {
  // Convert hex colors to RGB
  const rgbColors = colorWeights.map(({ color, weight }) => ({
    rgb: hexToRgb(color),
    weight
  }));
  
  // Calculate weighted average for each RGB component
  const blended = rgbColors.reduce((acc, { rgb, weight }) => {
    return {
      r: acc.r + rgb.r * weight,
      g: acc.g + rgb.g * weight,
      b: acc.b + rgb.b * weight
    };
  }, { r: 0, g: 0, b: 0 });
  
  // Convert back to hex
  return rgbToHex(
    Math.round(blended.r), 
    Math.round(blended.g), 
    Math.round(blended.b)
  );
};

// Utility: Convert hex color to RGB
const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  let bigint = parseInt(hex, 16);
  
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

// Utility: Convert RGB to hex
const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};