import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FoundationExperience from '../components/Foundation/FoundationExperience';
import { useCustomAlert } from '../components/CustomAlert';

/**
 * FoundationExperiencePage - Page wrapper for the Foundation Experience
 * Handles navigation and data persistence
 */
const FoundationExperiencePage = () => {
  // State for selected foundation stones
  const [foundationStones, setFoundationStones] = useState([]);
  
  // State for completion status
  const [isComplete, setIsComplete] = useState(false);
  
  // Alert hook for notifications
  const { showAlert } = useCustomAlert();
  
  // Check for existing data on load
  useEffect(() => {
    const savedData = localStorage.getItem('personality_foundation_stones');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFoundationStones(parsedData);
      } catch (error) {
        console.error('Error loading saved foundation data:', error);
      }
    }
  }, []);
  
  // Handle completion of foundation selection
  const handleFoundationComplete = (selectedStones) => {
    // Save selected stones
    setFoundationStones(selectedStones);
    localStorage.setItem('personality_foundation_stones', JSON.stringify(selectedStones));
    
    // Update completion status
    setIsComplete(true);
    
    // Show confirmation
    showAlert('Foundation phase complete! Your selections have been saved.', 'success');
    
    // Here you would typically navigate to the next phase
    // For now we'll just log the completion
    console.log('Foundation phase completed with stones:', selectedStones);
  };
  
  // Handle navigation to next phase
  const handleContinue = () => {
    // In a full implementation, this would navigate to the next assessment phase
    // For example: navigate('/building-blocks');
    showAlert('Ready to proceed to the next phase!', 'info');
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
      className="foundation-page"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <FoundationExperience
        onComplete={handleFoundationComplete}
        initialSelections={foundationStones}
      />
      
      {isComplete && (
        <motion.div 
          className="next-phase-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button 
            className="btn btn-primary"
            onClick={handleContinue}
          >
            Continue to Next Phase
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FoundationExperiencePage;