import React from 'react';
import { motion } from 'framer-motion';
import './SimpleFoundation.css';

// Center types and colors
const CENTER_COLORS = {
  HEAD: {
    primary: '#3b82f6',  // Blue-500
    light: '#93c5fd',    // Blue-300
    dark: '#1d4ed8'      // Blue-700
  },
  HEART: {
    primary: '#ef4444',  // Red-500
    light: '#fca5a5',    // Red-300
    dark: '#b91c1c'      // Red-700
  },
  BODY: {
    primary: '#10b981',  // Emerald-500
    light: '#6ee7b7',    // Emerald-300
    dark: '#047857'      // Emerald-700
  }
};

// Stone data for each center type
const STONE_SETS = [
  // HEAD CENTER
  [
    ['Analytical', 'Observant', 'Investigative'],
    ['Thoughtful', 'Insightful', 'Perceptive'],
    ['Strategic', 'Focused', 'Detail-oriented']
  ],
  [
    ['Intellectual', 'Questioning', 'Curious'],
    ['Logical', 'Rational', 'Objective'],
    ['Contemplative', 'Reflective', 'Deep-thinking']
  ],
  [
    ['Imaginative', 'Innovative', 'Creative'],
    ['Problem-solver', 'Comprehensive', 'Methodical'],
    ['Skeptical', 'Cautious', 'Vigilant']
  ],
  
  // HEART CENTER
  [
    ['Passionate', 'Expressive', 'Emotive'],
    ['Relational', 'Connected', 'Interpersonal'],
    ['Generous', 'Giving', 'Altruistic']
  ],
  [
    ['Empathetic', 'Compassionate', 'Understanding'],
    ['Supportive', 'Nurturing', 'Caring'],
    ['Authentic', 'Genuine', 'Sincere']
  ],
  [
    ['Harmonious', 'Diplomatic', 'Peacemaking'],
    ['Intuitive', 'Sensitive', 'Perceptive'],
    ['Loyal', 'Trustworthy', 'Devoted']
  ],
  
  // BODY CENTER
  [
    ['Decisive', 'Action-oriented', 'Proactive'],
    ['Grounded', 'Stable', 'Reliable'],
    ['Resilient', 'Enduring', 'Persistent']
  ],
  [
    ['Assertive', 'Confident', 'Self-assured'],
    ['Practical', 'Sensible', 'Realistic'],
    ['Protective', 'Dependable', 'Steadfast']
  ],
  [
    ['Energetic', 'Vital', 'Dynamic'],
    ['Disciplined', 'Structured', 'Organized'],
    ['Adaptable', 'Flexible', 'Responsive']
  ]
];

// SimpleStone component - follows exact hexagonal specifications
const SimpleStone = ({ content, color, size }) => {
  return (
    <div 
      className={`simple-stone ${size === 'small' ? 'small' : ''}`}
      style={{ 
        background: `linear-gradient(135deg, ${color.light}, ${color.primary}, ${color.dark})` 
      }}
    >
      {content && content.length > 0 && (
        <div className="stone-content">
          {content.map((line, index) => (
            <div key={index} className="stone-line">{line}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Foundation component - implements the foundation circle with stones
export const SimpleFoundation = ({ selectedStones = [] }) => {
  // Calculate the position for stones placed around the circle
  // This uses the formula from the specifications:
  // x = 50 + 45*cos(angle)
  // y = 50 + 45*sin(angle)
  const calculatePosition = (index, totalPositions) => {
    const angleStep = (2 * Math.PI) / totalPositions;
    const angle = angleStep * index - Math.PI / 2; // Start from top
    
    // Calculate position as percentage of the circle
    const x = 50 + 45 * Math.cos(angle);
    const y = 50 + 45 * Math.sin(angle);
    
    return { x, y };
  };

  // Get the center type based on set index
  const getCenterType = (setIndex) => {
    if (setIndex < 3) return 'HEAD';
    if (setIndex < 6) return 'HEART';
    return 'BODY';
  };

  return (
    <div className="foundation-container">
      <div className="foundation-circle">
        {/* Place the selected stones around the circle */}
        {selectedStones.map((stone, index) => {
          // Calculate position around the circle
          const position = calculatePosition(index, 9);
          
          // Get content and colors for this stone
          const setIndex = stone.setIndex;
          const stoneIndex = stone.stoneIndex;
          const centerType = getCenterType(setIndex);
          const content = STONE_SETS[setIndex]?.[stoneIndex] || [];
          
          return (
            <motion.div
              key={`placed-stone-${index}`}
              className="placed-stone"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20, 
                delay: index * 0.1 
              }}
            >
              <SimpleStone 
                content={content}
                color={CENTER_COLORS[centerType]}
                size="small"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleFoundation;