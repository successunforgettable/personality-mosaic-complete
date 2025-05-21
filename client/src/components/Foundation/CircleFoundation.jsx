import React from 'react';
import { motion } from 'framer-motion';
import './CircleFoundation.css';

// Center type colors mapping
const CENTER_COLORS = {
  'Head': {
    primary: '#3b82f6',  // Blue
    light: '#93c5fd',
    dark: '#1d4ed8'
  },
  'Heart': {
    primary: '#ef4444',  // Red 
    light: '#fca5a5',
    dark: '#b91c1c'
  },
  'Body': {
    primary: '#10b981',  // Green
    light: '#6ee7b7',
    dark: '#047857'
  }
};

// CircleStone component - for stones on the foundation
const CircleStone = ({ stone }) => {
  const category = stone.category || 'Head';
  const colors = CENTER_COLORS[category];
  
  // Extract stone content
  let content = [];
  if (stone.baselines) {
    content = stone.baselines.split(' • ');
  } else if (stone.name) {
    content = [stone.name];
  }
  
  return (
    <div 
      className="circle-stone"
      style={{ 
        background: `linear-gradient(135deg, ${colors.light}, ${colors.primary}, ${colors.dark})` 
      }}
    >
      {content.map((text, i) => (
        <div key={i} className="stone-text">{text}</div>
      ))}
    </div>
  );
};

// Main CircleFoundation component
const CircleFoundation = ({ selectedStones = [] }) => {
  // Number of positions around the circle
  const total = 9;
  
  return (
    <div className="circle-foundation-container">
      <div className="circle-base">
        {/* Foundation center */}
        <div className="circle-center">
          <span>Foundation</span>
        </div>
        
        {/* Stone positions */}
        {Array.from({ length: total }).map((_, idx) => {
          // Get the stone for this position if available
          const stone = selectedStones[idx];
          const position = `position-${idx + 1}`;
          
          return (
            <div key={`pos-${idx}`} className={`stone-position ${position}`}>
              {stone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <CircleStone stone={stone} />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircleFoundation;