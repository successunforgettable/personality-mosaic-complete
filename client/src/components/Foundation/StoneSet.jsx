import React from 'react';
import { motion } from 'framer-motion';
import Stone from './Stone';
import './StoneSet.css';

/**
 * StoneSet Component
 * Displays a set of three foundation stones for selection
 * Follows the specifications from the technical documentation
 */
const StoneSet = ({ stones, onStoneSelect, currentSetIndex }) => {
  // Determine center type (Head, Heart, Body) based on set index
  const centerType = Math.floor(currentSetIndex / 3);
  
  // Define color sets for the three centers
  const colorSets = [
    { // Head
      primary: '#3b82f6', // Blue-500
      light: '#93c5fd',   // Blue-300
      dark: '#1d4ed8'     // Blue-700
    },
    { // Heart
      primary: '#ef4444', // Red-500
      light: '#fca5a5',   // Red-300
      dark: '#b91c1c'     // Red-700
    },
    { // Body
      primary: '#10b981', // Emerald-500
      light: '#6ee7b7',   // Emerald-300
      dark: '#047857'     // Emerald-700
    }
  ];
  
  // Get color set for current stone set
  const colorSet = colorSets[centerType] || colorSets[0];
  
  // Determine set type name (Head, Heart, Body)
  const setTypes = ['Head', 'Heart', 'Body'];
  const setTypeName = setTypes[centerType];
  
  // Set number within its center (1-3)
  const setNumber = (currentSetIndex % 3) + 1;
  
  return (
    <div className="stone-set-container">
      <div className="stone-set-header">
        <h3 className="set-title">{setTypeName} Center</h3>
        <div className="set-subtitle">Set {setNumber} of 3</div>
      </div>
      
      <div className="stone-set-instructions">
        Select one stone that resonates with you:
      </div>
      
      <div className="stone-set">
        {stones.map((stone, index) => {
          // Use the detailed stone gradient mapping
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
                content={stone.content}
                selected={stone.selected}
                onClick={() => onStoneSelect(index)}
                stoneIndex={index}
                gradientColors={gradientColors}
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