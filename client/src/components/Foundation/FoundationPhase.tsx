import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { FoundationStone } from '@/types/assessment';
import StoneSet from './StoneSet';
import FoundationVisualizer from './FoundationVisualizer';

/**
 * Foundation Phase Component
 * 
 * This is the first phase of the Personality Mosaic Assessment where users
 * select foundation stones that represent their core traits. These stones
 * form the foundation of their personality tower.
 * 
 * Implementation based on tech_spec_v2.md - Section 3.2 and content_spec.md - Section 1.1
 */
const FoundationPhase: React.FC = () => {
  const { state, selectFoundationStone, setPhase } = useAssessment();
  
  // Stone sets organized by center (Head, Heart, Body)
  const stoneSets = {
    head: [
      // Head Center - Set 1
      [
        { id: 1, name: "Analytical", description: "Logical and methodical thinking", category: "head" },
        { id: 2, name: "Observant", description: "Attentive to details and surroundings", category: "head" },
        { id: 3, name: "Investigative", description: "Curious and inquisitive", category: "head" }
      ],
      // Head Center - Set 2
      [
        { id: 4, name: "Thoughtful", description: "Reflective and contemplative", category: "head" },
        { id: 5, name: "Insightful", description: "Penetrating understanding", category: "head" },
        { id: 6, name: "Perceptive", description: "Quick to understand and interpret", category: "head" }
      ],
      // Head Center - Set 3
      [
        { id: 7, name: "Strategic", description: "Skillful planning and directing", category: "head" },
        { id: 8, name: "Focused", description: "Concentrated attention and effort", category: "head" },
        { id: 9, name: "Detail-oriented", description: "Attentive to small particulars", category: "head" }
      ]
    ],
    heart: [
      // Heart Center - Set 1
      [
        { id: 10, name: "Empathetic", description: "Understanding and sharing feelings", category: "heart" },
        { id: 11, name: "Compassionate", description: "Showing kindness and concern", category: "heart" },
        { id: 12, name: "Understanding", description: "Sympathetic and tolerant", category: "heart" }
      ],
      // Heart Center - Set 2
      [
        { id: 13, name: "Expressive", description: "Communicative of emotions", category: "heart" },
        { id: 14, name: "Passionate", description: "Strong feelings and enthusiasm", category: "heart" },
        { id: 15, name: "Authentic", description: "Genuine and true to oneself", category: "heart" }
      ],
      // Heart Center - Set 3
      [
        { id: 16, name: "Supportive", description: "Providing encouragement", category: "heart" },
        { id: 17, name: "Caring", description: "Displaying warmth and concern", category: "heart" },
        { id: 18, name: "Nurturing", description: "Fostering growth and development", category: "heart" }
      ]
    ],
    body: [
      // Body Center - Set 1
      [
        { id: 19, name: "Action-oriented", description: "Focused on doing and achieving", category: "body" },
        { id: 20, name: "Practical", description: "Concerned with actual results", category: "body" },
        { id: 21, name: "Hands-on", description: "Directly involved in execution", category: "body" }
      ],
      // Body Center - Set 2
      [
        { id: 22, name: "Grounded", description: "Balanced and down-to-earth", category: "body" },
        { id: 23, name: "Stable", description: "Steady and consistent", category: "body" },
        { id: 24, name: "Reliable", description: "Dependable and trustworthy", category: "body" }
      ],
      // Body Center - Set 3
      [
        { id: 25, name: "Adaptable", description: "Flexible and adjustable", category: "body" },
        { id: 26, name: "Resilient", description: "Quick to recover from challenges", category: "body" },
        { id: 27, name: "Energetic", description: "Vigorous and dynamic", category: "body" }
      ]
    ]
  };

  // State for tracking which center and set the user is viewing
  const [currentCenter, setCurrentCenter] = useState<'head' | 'heart' | 'body'>('head');
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0);
  
  // State for tracking selected stones
  const [selectedStones, setSelectedStones] = useState<{
    head: (FoundationStone | null)[];
    heart: (FoundationStone | null)[];
    body: (FoundationStone | null)[];
  }>({
    head: [null, null, null],
    heart: [null, null, null],
    body: [null, null, null]
  });
  
  // Track which stone was last selected for animation purposes
  const [lastSelectedStoneId, setLastSelectedStoneId] = useState<number | null>(null);
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Handle stone selection
  const handleStoneSelect = (stone: FoundationStone) => {
    // Play selection sound
    const selectionSound = new Audio('/assets/sounds/stone-select.mp3');
    selectionSound.volume = 0.3;
    selectionSound.play().catch(err => console.log('Audio play failed:', err));
    
    // Update selected stones
    setSelectedStones(prev => ({
      ...prev,
      [currentCenter]: [
        ...prev[currentCenter].slice(0, currentSetIndex),
        stone,
        ...prev[currentCenter].slice(currentSetIndex + 1)
      ]
    }));
    
    // Trigger animation
    setLastSelectedStoneId(stone.id);
    setIsAnimating(true);
    
    // Record selection in global state
    selectFoundationStone(stone);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };
  
  // Navigation functions
  const goToPreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    } else if (currentCenter === 'heart') {
      setCurrentCenter('head');
      setCurrentSetIndex(2);
    } else if (currentCenter === 'body') {
      setCurrentCenter('heart');
      setCurrentSetIndex(2);
    }
  };
  
  const goToNextSet = () => {
    if (currentSetIndex < 2) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else if (currentCenter === 'head') {
      setCurrentCenter('heart');
      setCurrentSetIndex(0);
    } else if (currentCenter === 'heart') {
      setCurrentCenter('body');
      setCurrentSetIndex(0);
    }
  };
  
  // Check if all stones are selected
  const isComplete = () => {
    return (
      selectedStones.head.every(stone => stone !== null) &&
      selectedStones.heart.every(stone => stone !== null) &&
      selectedStones.body.every(stone => stone !== null)
    );
  };
  
  // Complete foundation phase and move to next phase
  const completeFoundationPhase = () => {
    // Play completion sound
    const completionSound = new Audio('/assets/sounds/phase-complete.mp3');
    completionSound.volume = 0.4;
    completionSound.play().catch(err => console.log('Audio play failed:', err));
    
    // Animate transition out
    setTimeout(() => {
      setPhase(2);
    }, 1000);
  };
  
  // Get all selected stones in a flat array
  const getAllSelectedStones = () => {
    const stones: FoundationStone[] = [];
    
    Object.values(selectedStones).forEach(centerStones => {
      centerStones.forEach(stone => {
        if (stone !== null) {
          stones.push(stone);
        }
      });
    });
    
    return stones;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSelected = getAllSelectedStones().length;
    return (totalSelected / 9) * 100;
  };
  
  return (
    <motion.div 
      className="foundation-phase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="phase-header">
        <h1 className="phase-title">Choose Your Foundation Stones</h1>
        <p className="phase-description">
          Select foundation stones that resonate with your core traits and values.
          These stones will form the base of your personality tower.
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {getAllSelectedStones().length} of 9 stones selected
        </div>
      </div>
      
      <div className="foundation-layout">
        {/* Foundation visualization */}
        <div className="foundation-visualizer-container">
          <FoundationVisualizer 
            selectedStones={getAllSelectedStones()}
            isAnimating={isAnimating}
            lastSelectedStoneId={lastSelectedStoneId}
          />
        </div>
        
        {/* Stone selection area */}
        <div className="stone-selection-container">
          <div className="center-header">
            <h2 className="center-title">
              {currentCenter.charAt(0).toUpperCase() + currentCenter.slice(1)} Center
            </h2>
            <p className="set-indicator">Set {currentSetIndex + 1} of 3</p>
          </div>
          
          <StoneSet 
            stones={stoneSets[currentCenter][currentSetIndex]}
            onStoneSelect={handleStoneSelect}
            selectedStoneId={selectedStones[currentCenter][currentSetIndex]?.id}
          />
          
          {/* Navigation controls */}
          <div className="navigation-controls">
            <button 
              className="nav-button prev-button"
              onClick={goToPreviousSet}
              disabled={currentCenter === 'head' && currentSetIndex === 0}
            >
              Previous Set
            </button>
            
            <button 
              className="nav-button next-button"
              onClick={goToNextSet}
              disabled={currentCenter === 'body' && currentSetIndex === 2}
            >
              Next Set
            </button>
            
            {isComplete() && (
              <button 
                className="complete-button"
                onClick={completeFoundationPhase}
              >
                Complete Foundation
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoundationPhase;