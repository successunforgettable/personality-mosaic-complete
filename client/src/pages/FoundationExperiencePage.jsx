import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FoundationExperience from '../components/Foundation/FoundationExperience.jsx';
import BuildingBlockExperience from '../components/BuildingBlocks/BuildingBlockExperience.jsx';
import ColorPaletteExperience from '../components/ColorPalette/ColorPaletteExperience.jsx';
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
  const [colorPaletteSelections, setColorPaletteSelections] = useState([]);
  
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

  // Handle completion of color palette selection
  const handleColorPaletteComplete = (data) => {
    setColorPaletteSelections(data.colorPaletteSelections);
    
    // Save to localStorage for persistence
    localStorage.setItem('personality_color_palette', JSON.stringify(data.colorPaletteSelections));
    
    // Move to results phase
    setCurrentPhase('results');
    
    // Show confirmation
    toast({
      title: "Assessment Complete",
      description: "Your personality mosaic is complete! View your results.",
    });
    
    console.log('Complete assessment data:', {
      foundation: data.foundationSelections,
      buildingBlocks: data.buildingBlockSelections,
      colors: data.colorPaletteSelections
    });
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
          <ColorPaletteExperience 
            onComplete={handleColorPaletteComplete}
            foundationSelections={foundationSelections}
            buildingBlockSelections={buildingBlockSelections}
          />
        )}
        
        {currentPhase === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
          >
            <h2 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '1.5rem' }}>
              🎉 Assessment Complete!
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
              Congratulations! You've completed your Personality Mosaic Assessment.
            </p>
            
            <div style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              padding: '2rem', 
              marginBottom: '2rem',
              textAlign: 'left' 
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Your Assessment Summary:</h3>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Foundation Stones:</strong> {foundationSelections.length} selections across 9 sets
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Building Blocks:</strong> {buildingBlockSelections.length} preference choices
              </div>
              <div>
                <strong>Color Palette:</strong> {colorPaletteSelections.length} colors selected
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap' 
            }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = '/'}
              >
                Return to Home
              </button>
              <button 
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentPhase('foundation')}
              >
                Start New Assessment
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default FoundationExperiencePage;