import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FoundationExperience from '../components/Foundation/FoundationExperience.jsx';
import { useToast } from '@/hooks/use-toast';

/**
 * FoundationExperiencePage - Page wrapper for the Foundation Experience
 * Handles navigation and data persistence
 */
const FoundationExperiencePage = () => {
  // State management
  const [currentPhase, setCurrentPhase] = useState('foundation');
  const [foundationSelections, setFoundationSelections] = useState([]);
  
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Building Blocks Phase - Coming Soon</h2>
            <p>You've completed the Foundation phase! The next phase is in development.</p>
            <div className="selections-summary">
              <h3>Your Foundation Selections:</h3>
              <ul>
                {foundationSelections.map((selection, index) => (
                  <li key={index}>Set {index + 1}: Stone {selection + 1}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default FoundationExperiencePage;