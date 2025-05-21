import React from 'react';
import { motion } from 'framer-motion';
import Stone from './Stone';
import { getStoneColorBySetIndex, getCenterNameBySetIndex } from './stoneData';
import './StoneSet.css';

/**
 * StoneSet Component
 * Displays a set of stones for selection in the current phase
 * Updated to use horizontal layout
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
    <div className="stone-set-container">
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
      
      <div className="stone-set-instructions">
        Select one stone that resonates with you:
      </div>
      
      <div className="stone-set">
        {stones.map((stone, index) => {
          // Use the detailed stone gradient mapping from stoneData
          const gradientColors = {
            from: index === 0 ? colorSet.light : 
                  index === 1 ? colorSet.primary : 
                  colorSet.primary,
            to: index === 0 ? colorSet.primary : 
                index === 1 ? colorSet.primary : 
                colorSet.dark
          };
          
          return (
            <motion.div
              key={`stone-container-${index}`}
              className="stone-wrapper"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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