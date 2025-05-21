// Color data for personality states
export const STATE_COLORS = {
  veryGood: {
    name: "Very Good State",
    description: "I feel balanced and at peace with imperfection. I channel my natural strengths into positive change.",
    primary: '#22c55e',
    light: '#4ade80',
    dark: '#166534',
    textColor: '#166534'
  },
  good: {
    name: "Good State",
    description: "I am growing in self-awareness and making progress. I recognize patterns and choose better responses.",
    primary: '#10b981',
    light: '#34d399',
    dark: '#065f46',
    textColor: '#065f46'
  },
  average: {
    name: "Average State",
    description: "I function adequately but fall back into old habits. I am aware of tendencies but not always managing them.",
    primary: '#f59e0b',
    light: '#fcd34d',
    dark: '#b45309',
    textColor: '#b45309'
  },
  belowAverage: {
    name: "Below Average State",
    description: "I struggle with negative patterns and often feel stuck. My awareness is limited and I react automatically.",
    primary: '#f97316',
    light: '#fb923c',
    dark: '#c2410c',
    textColor: '#c2410c'
  },
  destructive: {
    name: "Destructive State",
    description: "I am trapped in harmful patterns that damage myself and others. My self-awareness is minimal.",
    primary: '#ef4444',
    light: '#f87171', 
    dark: '#b91c1c',
    textColor: '#b91c1c'
  }
};

// Personality-specific state descriptions
// In a full implementation, these would contain custom descriptions for each type in each state
export const getTypeSpecificDescription = (personalityType, stateKey) => {
  const defaultDescriptions = {
    veryGood: "You're operating at your healthiest level, integrating your strengths while being aware of your challenges.",
    good: "You're consistently growing and developing positive aspects of your personality type.",
    average: "Your typical patterns are active with moderate self-awareness around them.",
    belowAverage: "You're experiencing some challenging aspects of your personality type with limited awareness.",
    destructive: "You're struggling with the most difficult patterns of your personality type with minimal awareness."
  };
  
  // Type-specific descriptions would be added here in a full implementation
  const typeDescriptions = {
    // Examples for Type 1 (Perfectionist)
    1: {
      veryGood: "You channel your high standards into positive improvement while embracing imperfection.",
      good: "You're developing flexibility while maintaining your commitment to growth and quality.",
      average: "You have high standards but sometimes judge yourself and others too harshly.",
      belowAverage: "You're overly critical and rigid, easily frustrated when things aren't perfect.",
      destructive: "You're trapped in judgmental black-and-white thinking and extreme self-criticism."
    },
    // Examples for Type 2 (Helper)
    2: {
      veryGood: "You offer genuine support without strings attached, while maintaining healthy boundaries.",
      good: "You're balancing your desire to help others with increasing self-care.",
      average: "You prioritize others' needs but sometimes neglect your own, seeking appreciation.",
      belowAverage: "You feel entitled to recognition and manipulate through giving to get what you need.",
      destructive: "You're completely focused on others to validate your worth, with intense neediness."
    },
    // Add other types as needed
  };
  
  // If we have a specific personality type and a description for that type's state
  if (personalityType && typeDescriptions[personalityType] && typeDescriptions[personalityType][stateKey]) {
    return typeDescriptions[personalityType][stateKey];
  }
  
  // Otherwise return the default description
  return defaultDescriptions[stateKey];
};