// Building Block Sets - Each pair contains 2 contrasting traits
export const BUILDING_BLOCK_PAIRS = [
  // Pair 1: Introversion vs. Extroversion
  {
    id: 1,
    title: "Energy Direction",
    blocks: [
      {
        id: 1,
        name: "INTROVERSION",
        description: "Gains energy from quiet reflection and solitude. Prefers deep one-on-one interactions."
      },
      {
        id: 2,
        name: "EXTROVERSION",
        description: "Gains energy from social interactions and activity. Enjoys group settings and variety."
      }
    ]
  },
  
  // Pair 2: Thinking vs. Feeling
  {
    id: 2,
    title: "Decision Making",
    blocks: [
      {
        id: 3,
        name: "THINKING",
        description: "Makes decisions based on logic, principles, and objective analysis of cause and effect."
      },
      {
        id: 4,
        name: "FEELING",
        description: "Makes decisions based on personal values, empathy, and consideration of others' feelings."
      }
    ]
  },
  
  // Pair 3: Structure vs. Flexibility
  {
    id: 3,
    title: "Lifestyle Preference",
    blocks: [
      {
        id: 5,
        name: "STRUCTURE",
        description: "Prefers organization, planning, and clear boundaries. Values preparation and order."
      },
      {
        id: 6,
        name: "FLEXIBILITY",
        description: "Prefers spontaneity, adaptability, and keeping options open. Values freedom and variety."
      }
    ]
  },
  
  // Pair 4: Task vs. People
  {
    id: 4,
    title: "Priority Focus",
    blocks: [
      {
        id: 7,
        name: "TASK-ORIENTED",
        description: "Focuses on achieving goals, completing tasks, and addressing practical challenges."
      },
      {
        id: 8,
        name: "PEOPLE-ORIENTED",
        description: "Focuses on relationships, harmony, and the needs and feelings of others."
      }
    ]
  },
  
  // Pair 5: Detail vs. Big Picture
  {
    id: 5,
    title: "Information Processing",
    blocks: [
      {
        id: 9,
        name: "DETAIL-FOCUSED",
        description: "Attends to specifics, facts, and concrete information. Prefers sequential thinking."
      },
      {
        id: 10,
        name: "BIG-PICTURE",
        description: "Attends to patterns, possibilities, and meanings. Prefers conceptual thinking."
      }
    ]
  }
];

// Block color assignments based on dimension
export const BLOCK_COLORS = {
  "INTROVERSION": { background: "linear-gradient(135deg, #93c5fd, #60a5fa)" },  // Lighter blue
  "EXTROVERSION": { background: "linear-gradient(135deg, #60a5fa, #3b82f6)" },  // Deeper blue
  
  "THINKING": { background: "linear-gradient(135deg, #c084fc, #a855f7)" },      // Purple
  "FEELING": { background: "linear-gradient(135deg, #f9a8d4, #ec4899)" },       // Pink
  
  "STRUCTURE": { background: "linear-gradient(135deg, #fcd34d, #f59e0b)" },     // Yellow/Orange
  "FLEXIBILITY": { background: "linear-gradient(135deg, #fb923c, #ea580c)" },   // Orange
  
  "TASK-ORIENTED": { background: "linear-gradient(135deg, #6ee7b7, #10b981)" }, // Green
  "PEOPLE-ORIENTED": { background: "linear-gradient(135deg, #34d399, #059669)" }, // Deeper Green
  
  "DETAIL-FOCUSED": { background: "linear-gradient(135deg, #94a3b8, #64748b)" }, // Gray
  "BIG-PICTURE": { background: "linear-gradient(135deg, #475569, #334155)" }    // Dark Gray
};