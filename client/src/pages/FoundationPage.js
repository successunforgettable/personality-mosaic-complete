import React from 'react';
import FoundationExperience from '../components/Foundation/FoundationExperience';
import { useLocation } from 'wouter';

/**
 * FoundationPage - Page component that wraps the Foundation Experience
 * Handles navigation to next phase after completion
 */
function FoundationPage() {
  const [_, setLocation] = useLocation();
  
  // Handle completion of foundation phase
  const handleFoundationComplete = (selectedStones) => {
    // In a real implementation, we would save the selected stones
    // in the application state or context
    console.log('Foundation stones selected:', selectedStones);
    
    // For demo purposes, we'll save to localStorage
    localStorage.setItem(
      'foundationStones', 
      JSON.stringify(selectedStones)
    );
    
    // Navigate to the next phase (Phase 2: Building Blocks)
    // For now we'll just show an alert
    alert('Foundation phase completed! Ready for next phase.');
    
    // Example of how you would navigate to next phase
    // setLocation('/phase-two');
  };
  
  // Try to get previously selected stones from storage
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
    <div className="foundation-page">
      <FoundationExperience 
        onComplete={handleFoundationComplete}
        initialSelections={getInitialSelections()}
      />
    </div>
  );
}

export default FoundationPage;