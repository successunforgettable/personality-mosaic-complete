import React, { useState } from 'react';
import FoundationExperience from '../components/Foundation/FoundationExperience';
import { useLocation } from 'wouter';

/**
 * FoundationExperiencePage - Page wrapper for the Foundation Experience
 * Handles navigation and data persistence
 */
const FoundationExperiencePage = () => {
  const [_, setLocation] = useLocation();
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // Handle completion of foundation selection
  const handleComplete = (selectedStones) => {
    // For demo purposes, we'll save the selections to localStorage
    try {
      localStorage.setItem('foundationStones', JSON.stringify(selectedStones));
      
      // Log the completion event
      console.log('Foundation phase completed with selections:', selectedStones);
      
      // Show completion message
      alert('Foundation stones selected successfully! Ready for next phase.');
      
      // In a real implementation, we would navigate to the next phase
      // setLocation('/building-blocks');
    } catch (error) {
      console.error('Error saving selections:', error);
    }
  };
  
  // Try to get previously selected stones from localStorage
  const getInitialSelections = () => {
    try {
      const savedSelections = localStorage.getItem('foundationStones');
      return savedSelections ? JSON.parse(savedSelections) : [];
    } catch (error) {
      console.error('Error loading saved selections:', error);
      return [];
    }
  };
  
  return (
    <div className="page-container">
      <FoundationExperience
        onComplete={handleComplete}
        initialSelections={getInitialSelections()}
        setIndex={currentSetIndex}
      />
    </div>
  );
};

export default FoundationExperiencePage;