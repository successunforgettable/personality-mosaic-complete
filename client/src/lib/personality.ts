import { 
  FoundationStone, 
  FoundationStoneSet, 
  BuildingBlock, 
  BuildingBlockPair,
  PersonalityType,
  PersonalityInfluence
} from '@/types/assessment';

// Personality Types
export const personalityTypes: PersonalityType[] = [
  {
    id: 1,
    name: "Reformer",
    description: "You are a principled, purposeful person who values integrity, improvement, and ethical standards. You strive for personal growth and making the world a better place.",
    positiveTraits: [
      "Ethical and principled",
      "Organized and structured",
      "Improvement-oriented",
      "Responsible and reliable"
    ],
    negativeTraits: [
      "Overly critical of yourself and others",
      "Rigid in your thinking",
      "Perfectionist to a fault",
      "Judgmental of those with different standards"
    ]
  },
  {
    id: 2,
    name: "Helper",
    description: "You are a caring, interpersonal person who values connection, generosity, and supportive relationships. You strive to be loving and appreciate being appreciated.",
    positiveTraits: [
      "Caring and empathetic",
      "Supportive of others' needs",
      "Generous with your time",
      "Relationship-oriented"
    ],
    negativeTraits: [
      "May neglect your own needs",
      "Can become possessive",
      "Might subtly demand appreciation",
      "Difficulty receiving help from others"
    ]
  },
  {
    id: 3,
    name: "Achiever",
    description: "You are a success-oriented, pragmatic person who values accomplishment, efficiency, and image. You strive to be your best and achieve notable goals.",
    positiveTraits: [
      "Ambitious and driven",
      "Efficient and practical",
      "Image-conscious and presentable",
      "Adaptable to different situations"
    ],
    negativeTraits: [
      "Workaholic tendencies",
      "May value image over authenticity",
      "Competitive to an unhealthy degree",
      "Can neglect emotional needs"
    ]
  },
  {
    id: 4,
    name: "Individualist",
    description: "You are a sensitive, introspective person who values authenticity, self-expression, and depth. You strive to understand yourself and find meaning in your experiences.",
    positiveTraits: [
      "Emotionally deep and aware",
      "Creative and expressive",
      "Authentic to your true self",
      "Compassionate toward suffering"
    ],
    negativeTraits: [
      "Prone to melancholy or moodiness",
      "May feel misunderstood or different",
      "Can be self-absorbed in emotions",
      "Tendency toward envy or comparison"
    ]
  },
  {
    id: 5,
    name: "Investigator",
    description: "You are an insightful, perceptive person who values knowledge, understanding, and autonomy. You strive to make sense of the world through observation and analysis.",
    positiveTraits: [
      "Intellectually curious",
      "Independent thinker",
      "Observant of details",
      "Values privacy and autonomy"
    ],
    negativeTraits: [
      "May detach from emotions",
      "Can become isolated from others",
      "Might hoard knowledge or resources",
      "Difficulty with practical matters"
    ]
  },
  {
    id: 6,
    name: "Sentinel",
    description: "You are a committed, security-oriented person who values loyalty, responsibility, and preparation. You strive to create safety through vigilance and planning.",
    positiveTraits: [
      "Loyal and committed",
      "Responsible and dutiful",
      "Vigilant about potential problems",
      "Collaborative team player"
    ],
    negativeTraits: [
      "Can become anxious or suspicious",
      "May struggle with indecision",
      "Tendency to imagine worst-case scenarios",
      "Might project fears onto situations"
    ]
  },
  {
    id: 7,
    name: "Enthusiast",
    description: "You are an enthusiastic, versatile person who values experience, variety, and possibility. You strive to maintain freedom and happiness by keeping options open.",
    positiveTraits: [
      "Optimistic and enthusiastic",
      "Quick-thinking and versatile",
      "Adventure-seeking",
      "Engaging and stimulating"
    ],
    negativeTraits: [
      "May avoid difficult emotions",
      "Can scatter energy across too many interests",
      "Difficulty with commitment",
      "Tendency to avoid limitations"
    ]
  },
  {
    id: 8,
    name: "Challenger",
    description: "You are a powerful, assertive person who values strength, justice, and control. You strive to protect yourself and others through direct action and confidence.",
    positiveTraits: [
      "Protective of others",
      "Decisive and action-oriented",
      "Straightforward communicator",
      "Strong sense of justice"
    ],
    negativeTraits: [
      "Can be domineering or intimidating",
      "May be excessively confrontational",
      "Difficulty with vulnerability",
      "Tendency to see world in black/white terms"
    ]
  },
  {
    id: 9,
    name: "Peacemaker",
    description: "You are a receptive, reassuring person who values harmony, connection, and stability. You strive to create peace and comfort for yourself and others.",
    positiveTraits: [
      "Patient and steady",
      "Accepting of different perspectives",
      "Naturally calming presence",
      "Supportive without judgment"
    ],
    negativeTraits: [
      "May avoid conflict at all costs",
      "Can become stubborn or resistant",
      "Tendency to minimize own needs",
      "Difficulty with prioritization"
    ]
  }
];

// Foundation Stone Sets
export const foundationStoneSets: FoundationStoneSet[] = [
  {
    id: 1,
    stones: [
      {
        id: 1,
        name: "COMPASSION",
        baselines: "EMPATHY • KINDNESS • UNDERSTANDING",
        image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        category: "Heart",
        typeScore: { "2": 5, "9": 3, "4": 2 }
      },
      {
        id: 2,
        name: "ANALYSIS",
        baselines: "LOGIC • THINKING • PROBLEM-SOLVING",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        category: "Head",
        typeScore: { "5": 5, "1": 3, "6": 2 }
      },
      {
        id: 3,
        name: "PASSION",
        baselines: "ENTHUSIASM • INTENSITY • DRIVE",
        image: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        category: "Body",
        typeScore: { "8": 5, "3": 3, "7": 2 }
      }
    ]
  },
  {
    id: 2,
    stones: [
      {
        id: 4,
        name: "DILIGENCE",
        baselines: "RESPONSIBILITY • HARD WORK • DEDICATION",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        category: "Head",
        typeScore: { "1": 5, "3": 3, "6": 2 }
      },
      {
        id: 5,
        name: "CREATIVITY",
        baselines: "INNOVATION • EXPRESSION • IMAGINATION",
        image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        category: "Heart",
        typeScore: { "4": 5, "7": 3, "9": 2 }
      },
      {
        id: 6,
        name: "ASSURANCE",
        baselines: "CONFIDENCE • STRENGTH • PROTECTION",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        category: "Body",
        typeScore: { "8": 5, "2": 3, "6": 2 }
      }
    ]
  },
  {
    id: 3,
    stones: [
      {
        id: 7,
        name: "INSIGHT",
        values: "PERCEPTION • KNOWLEDGE • WISDOM",
        image: "https://images.unsplash.com/photo-1506901437675-cde80ff9c746?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        typeScore: { "5": 5, "1": 3, "4": 2 }
      },
      {
        id: 8,
        name: "HARMONY",
        values: "PEACE • BALANCE • CONNECTION",
        image: "https://images.unsplash.com/photo-1506056820413-f8fa4f246a75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        typeScore: { "9": 5, "2": 3, "7": 2 }
      },
      {
        id: 9,
        name: "VIGILANCE",
        values: "CAUTION • PREPARATION • LOYALTY",
        image: "https://images.unsplash.com/photo-1568607689150-2a2a0e4f479d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=250",
        typeScore: { "6": 5, "1": 3, "8": 2 }
      }
    ]
  }
];

// Building Block Pairs
export const buildingBlockPairs: BuildingBlockPair[] = [
  {
    id: 1,
    title: "Pair 1: How You Process Information",
    blockA: {
      id: 1,
      name: "Objective Analysis",
      description: "I tend to approach situations with logical analysis and objective reasoning.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 1,
      position: "A",
      influenceScore: { "5": 3, "1": 2, "3": 1 }
    },
    blockB: {
      id: 2,
      name: "Intuitive Understanding",
      description: "I rely on intuition and emotional understanding when approaching situations.",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 1,
      position: "B",
      influenceScore: { "4": 3, "2": 2, "9": 1 }
    }
  },
  {
    id: 2,
    title: "Pair 2: How You Make Decisions",
    blockA: {
      id: 3,
      name: "Planned & Structured",
      description: "I prefer organization, planning, and clear structure in my life and decisions.",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 2,
      position: "A",
      influenceScore: { "1": 3, "6": 2, "3": 1 }
    },
    blockB: {
      id: 4,
      name: "Flexible & Adaptive",
      description: "I prefer to stay flexible, adaptable, and open to new possibilities.",
      image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 2,
      position: "B",
      influenceScore: { "7": 3, "9": 2, "2": 1 }
    }
  },
  {
    id: 3,
    title: "Pair 3: How You Relate to Others",
    blockA: {
      id: 5,
      name: "Supportive & Harmonious",
      description: "I focus on maintaining harmony and supporting others in relationships.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 3,
      position: "A",
      influenceScore: { "2": 3, "9": 2, "1": 1 }
    },
    blockB: {
      id: 6,
      name: "Independent & Direct",
      description: "I value independence and direct communication in relationships.",
      image: "https://images.unsplash.com/photo-1542282811-943ef1a977c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 3,
      position: "B",
      influenceScore: { "8": 3, "5": 2, "3": 1 }
    }
  },
  {
    id: 4,
    title: "Pair 4: How You Handle Challenges",
    blockA: {
      id: 7,
      name: "Cautious & Thorough",
      description: "I carefully think through all possibilities and prepare for what might go wrong.",
      image: "https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 4,
      position: "A",
      influenceScore: { "6": 3, "1": 2, "5": 1 }
    },
    blockB: {
      id: 8,
      name: "Optimistic & Adventurous",
      description: "I focus on opportunities and approach challenges with optimism and creativity.",
      image: "https://images.unsplash.com/photo-1542332213-31f87c6a6db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200",
      pairId: 4,
      position: "B",
      influenceScore: { "7": 3, "3": 2, "4": 1 }
    }
  }
];

// Function to determine the primary personality type
export function determinePersonalityType(selectedStones: FoundationStone[]): PersonalityType {
  if (selectedStones.length === 0) {
    // Default to Type 9 if no stones selected (shouldn't happen in real use)
    return personalityTypes[8]; // Index 8 is Type 9
  }
  
  // Tally up the scores for each personality type
  const scores: Record<string, number> = {};
  
  selectedStones.forEach(stone => {
    for (const [typeId, score] of Object.entries(stone.typeScore)) {
      if (!scores[typeId]) {
        scores[typeId] = 0;
      }
      scores[typeId] += score;
    }
  });
  
  // Find the type with the highest score
  let highestScore = 0;
  let highestTypeId = "9"; // Default to Type 9
  
  for (const [typeId, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      highestTypeId = typeId;
    }
  }
  
  // Get the personality type with the matching ID
  const matchedType = personalityTypes.find(type => type.id === parseInt(highestTypeId));
  
  return matchedType || personalityTypes[8]; // Fallback to Type 9 if not found
}

// Personality Influences
export const personalityInfluences: PersonalityInfluence[] = [
  { id: 1, name: "Reformer", description: "With the Reformer influence, you have a strong sense of right and wrong and value improvement." },
  { id: 2, name: "Helper", description: "With the Helper influence, you are more empathetic and relationship-oriented." },
  { id: 3, name: "Achiever", description: "With the Achiever influence, you have a strong focus on goals and success." },
  { id: 4, name: "Individualist", description: "With the Individualist influence, you value authenticity and emotional depth." },
  { id: 5, name: "Investigator", description: "With the Investigator influence, you have a more analytical and observant approach." },
  { id: 6, name: "Sentinel", description: "With the Sentinel influence, you tend to be more cautious and security-oriented." },
  { id: 7, name: "Enthusiast", description: "With the Enthusiast influence, you bring more optimism and versatility." },
  { id: 8, name: "Challenger", description: "With the Challenger influence, you approach life with more assertiveness and directness." },
  { id: 9, name: "Peacemaker", description: "With the Peacemaker influence, you bring more harmony and receptivity." }
];

// Function to determine the personality influence (wing)
export function determineInfluence(selectedBlocks: BuildingBlock[]): PersonalityInfluence {
  if (selectedBlocks.length === 0) {
    // Default to Type 9 influence if no blocks selected (shouldn't happen in real use)
    return personalityInfluences[8]; // Index 8 is Type 9
  }
  
  // Tally up the scores for each influence
  const scores: Record<string, number> = {};
  
  selectedBlocks.forEach(block => {
    for (const [typeId, score] of Object.entries(block.influenceScore)) {
      if (!scores[typeId]) {
        scores[typeId] = 0;
      }
      scores[typeId] += score;
    }
  });
  
  // Find the influence with the highest score
  let highestScore = 0;
  let highestTypeId = "9"; // Default to Type 9
  
  for (const [typeId, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      highestTypeId = typeId;
    }
  }
  
  // Get the personality influence with the matching ID
  const matchedInfluence = personalityInfluences.find(influence => influence.id === parseInt(highestTypeId));
  
  return matchedInfluence || personalityInfluences[8]; // Fallback to Type 9 if not found
}
