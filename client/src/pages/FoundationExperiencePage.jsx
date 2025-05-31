import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FoundationExperience from '../components/Foundation/FoundationExperience.jsx';
import BuildingBlockExperience from '../components/BuildingBlocks/BuildingBlockExperience.jsx';
import { useToast } from '@/hooks/use-toast';

/**
 * FoundationExperiencePage - Page wrapper for the Foundation Experience
 * Handles navigation and data persistence
 */
const FoundationExperiencePage = () => {
  // State management
  const [currentPhase, setCurrentPhase] = useState('foundation');
  const [foundationSelections, setFoundationSelections] = useState([]);
  const [buildingBlockSelections, setBuildingBlockSelections] = useState([]);
  
  // Toast hook for notifications
  const { toast } = useToast();
  
  // Handle completion of foundation selection
  const handleFoundationComplete = (selections) => {
    // Save selected stones
    setFoundationSelections(selections);
    
    // Save to localStorage for persistence
    localStorage.setItem('personality_foundation_selections', JSON.stringify(selections));
    
    // Move to next phase
    setCurrentPhase('building');
    
    // Show confirmation
    toast({
      title: "Foundation Complete",
      description: "Foundation phase complete! Moving to the next phase.",
    });
    
    // Log for debugging
    console.log('Foundation selections:', selections);
  };

  // Handle completion of building blocks selection
  const handleBuildingBlockComplete = (data) => {
    setBuildingBlockSelections(data.buildingBlockSelections);
    
    // Save to localStorage for persistence
    localStorage.setItem('personality_building_blocks', JSON.stringify(data.buildingBlockSelections));
    
    // Move to next phase
    setCurrentPhase('colors');
    
    // Show confirmation
    toast({
      title: "Building Blocks Complete",
      description: "Building blocks phase complete! Moving to color palette.",
    });
    
    console.log('Building block selections:', data.buildingBlockSelections);
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };
  
  return (
    <motion.div
      className="app"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <header className="app-header">
        <h1>Personality Mosaic Assessment</h1>
      </header>
      
      <main className="app-content">
        {currentPhase === 'foundation' && (
          <FoundationExperience onComplete={handleFoundationComplete} />
        )}
        
        {currentPhase === 'building' && (
          <BuildingBlockExperience 
            onComplete={handleBuildingBlockComplete}
            foundationSelections={foundationSelections}
          />
        )}
        
        {currentPhase === 'colors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Color Palette Phase - Coming Soon</h2>
            <p>You've completed the Foundation and Building Blocks phases!</p>
            <div className="selections-summary">
              <h3>Your Progress:</h3>
              <ul>
                <li><strong>Foundation:</strong> {foundationSelections.length} stones selected</li>
                <li><strong>Building Blocks:</strong> {buildingBlockSelections.length} blocks selected</li>
              </ul>
            </div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default FoundationExperiencePage;