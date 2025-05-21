import React from 'react';
import { motion } from 'framer-motion';
import Stone from './Stone';
import { getStoneColorBySetIndex, getCenterNameBySetIndex } from './stoneData';
import './StoneSet.css';

/**
 * StoneSet Component
 * Displays a set of stones for selection in the current phase
 */
const StoneSet = ({
  stones = [],
  onStoneSelect,
  currentSetIndex = 0,
  totalSets = 9
}) => {
  // Get the current center (Head, Heart, Body)
  const centerName = getCenterNameBySetIndex(currentSetIndex);
  
  // Get the colors for this set
  const colorSet = getStoneColorBySetIndex(currentSetIndex);
  
  // Get the set number within the current center (1, 2, or 3)
  const setNumber = (currentSetIndex % 3) + 1;
  
  return (
    <div className="stone-set">
      <div className="stone-set-header">
        <h2 className="stone-set-title">
          <span className="center-name" style={{ 
            color: centerName === 'Head' ? '#3b82f6' : 
                  centerName === 'Heart' ? '#ef4444' : 
                  '#10b981'
          }}>
            {centerName} Center
          </span>
          <span className="set-number">Set {setNumber} of 3</span>
        </h2>
        
        <div className="stone-set-progress">
          <span className="progress-text">{currentSetIndex + 1} of {totalSets}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${((currentSetIndex + 1) / totalSets) * 100}%`,
                backgroundColor: centerName === 'Head' ? '#3b82f6' : 
                               centerName === 'Heart' ? '#ef4444' : 
                               '#10b981'
              }}
            ></div>
          </div>
        </div>
      </div>
      
      <p className="selection-instruction">Select one stone that resonates with you:</p>
      
      <div className="stones-container">
        {stones.map((stone, index) => {
          // Create gradient colors with variations based on index
          let gradientColors;
          if (index === 0) {
            gradientColors = { from: colorSet.light, to: colorSet.primary };
          } else if (index === 1) {
            gradientColors = { from: colorSet.primary, to: colorSet.primary };
          } else {
            gradientColors = { from: colorSet.primary, to: colorSet.dark };
          }
          
          return (
            <motion.div
              key={`stone-container-${index}`}
              className="stone-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Stone 
                id={`${currentSetIndex}-${index}`}
                content={stone.content}
                isSelected={stone.selected}
                gradientColors={gradientColors}
                onClick={() => onStoneSelect(index)}
                tabIndex={index + 1}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StoneSet;