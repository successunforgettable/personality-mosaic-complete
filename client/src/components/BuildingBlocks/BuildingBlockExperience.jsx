import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './BuildingBlockExperience.css';

/**
 * BuildingBlockExperience - Phase 2 of the Personality Mosaic Assessment
 * Handles the building block selection experience
 */
const BuildingBlockExperience = ({ onComplete, foundationSelections = [] }) => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selections, setSelections] = useState([]);

  // Sample building block pairs - these would come from your specification
  const buildingBlockPairs = [
    {
      id: 'pair-1',
      left: { id: 'b1-left', title: 'Systematic Approach', description: 'Methodical • Organized • Structured' },
      right: { id: 'b1-right', title: 'Intuitive Approach', description: 'Instinctive • Spontaneous • Flow-based' }
    },
    {
      id: 'pair-2', 
      left: { id: 'b2-left', title: 'Individual Focus', description: 'Personal • Independent • Self-directed' },
      right: { id: 'b2-right', title: 'Group Focus', description: 'Collective • Collaborative • Team-oriented' }
    },
    {
      id: 'pair-3',
      left: { id: 'b3-left', title: 'Detail Oriented', description: 'Precise • Thorough • Comprehensive' },
      right: { id: 'b3-right', title: 'Big Picture', description: 'Conceptual • Strategic • Visionary' }
    },
    {
      id: 'pair-4',
      left: { id: 'b4-left', title: 'Steady Pace', description: 'Consistent • Reliable • Sustainable' },
      right: { id: 'b4-right', title: 'Dynamic Pace', description: 'Varied • Adaptive • Energetic' }
    },
    {
      id: 'pair-5',
      left: { id: 'b5-left', title: 'Theoretical', description: 'Conceptual • Abstract • Principle-based' },
      right: { id: 'b5-right', title: 'Practical', description: 'Applied • Concrete • Results-focused' }
    }
  ];

  const currentPair = buildingBlockPairs[currentPairIndex];
  const isComplete = selections.length === buildingBlockPairs.length;

  const handleBlockSelect = (block) => {
    const newSelections = [...selections];
    newSelections[currentPairIndex] = block;
    setSelections(newSelections);

    // Auto-advance to next pair after selection
    setTimeout(() => {
      if (currentPairIndex < buildingBlockPairs.length - 1) {
        setCurrentPairIndex(currentPairIndex + 1);
      }
    }, 600);
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        foundationSelections,
        buildingBlockSelections: selections
      });
    }
  };

  return (
    <motion.div 
      className="building-block-experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="building-block-header">
        <h2 className="phase-title">Choose Your Building Blocks</h2>
        <p className="phase-subtitle">
          Select the approach that best represents your natural preference in each pair
        </p>
        <div className="progress-info">
          Question {currentPairIndex + 1} of {buildingBlockPairs.length}
        </div>
      </div>

      {!isComplete ? (
        <motion.div 
          className="building-block-pair"
          key={currentPair.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="block-container">
            <motion.div 
              className="building-block left-block"
              onClick={() => handleBlockSelect(currentPair.left)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="block-title">{currentPair.left.title}</h3>
              <p className="block-description">{currentPair.left.description}</p>
            </motion.div>

            <div className="vs-divider">VS</div>

            <motion.div 
              className="building-block right-block"
              onClick={() => handleBlockSelect(currentPair.right)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="block-title">{currentPair.right.title}</h3>
              <p className="block-description">{currentPair.right.description}</p>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="completion-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Building Blocks Complete!</h3>
          <p>You've made all your building block selections.</p>
          
          <div className="selections-summary">
            <h4>Your Foundation & Building Block Choices:</h4>
            <div className="foundation-summary">
              <strong>Foundation:</strong> {foundationSelections.length} stones selected
            </div>
            <div className="blocks-summary">
              <strong>Building Blocks:</strong> {selections.length} blocks selected
            </div>
          </div>

          <motion.button 
            className="complete-button"
            onClick={handleComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Color Palette
          </motion.button>
        </motion.div>
      )}

      {currentPairIndex > 0 && !isComplete && (
        <motion.button 
          className="back-button"
          onClick={() => setCurrentPairIndex(currentPairIndex - 1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ← Previous
        </motion.button>
      )}
    </motion.div>
  );
};

export default BuildingBlockExperience;