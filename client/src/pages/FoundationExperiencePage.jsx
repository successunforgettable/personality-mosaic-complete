import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FoundationExperience from '../components/Foundation/FoundationExperience.jsx';
import BuildingBlockExperience from '../components/BuildingBlocks/BuildingBlockExperience.jsx';
import ColorPaletteExperience from '../components/ColorPalette/ColorPaletteExperience.jsx';
import DetailExperience from '../components/PhaseFour/DetailExperience.jsx';
import { useToast } from '@/hooks/use-toast';
import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';

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
  const [detailSelections, setDetailSelections] = useState([]);
  const [personalityResults, setPersonalityResults] = useState(null);
  
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
    
    // Move to detail phase
    setCurrentPhase('details');
    
    // Show confirmation
    toast({
      title: "Color Palette Complete",
      description: "Color palette phase complete! Moving to detail selection.",
    });
    
    console.log('Color palette selections:', data.colorPaletteSelections);
  };

  // Handle completion of detail selection
  const handleDetailComplete = (data) => {
    setDetailSelections(data.detailSelections);
    
    // Save to localStorage for persistence
    localStorage.setItem('personality_details', JSON.stringify(data.detailSelections));
    
    // Generate personality analysis
    const analysisResults = generatePersonalityAnalysis({
      foundationSelections: data.foundationSelections,
      buildingBlockSelections: data.buildingBlockSelections,
      colorPaletteSelections: data.colorPaletteSelections,
      detailSelections: data.detailSelections
    });
    
    setPersonalityResults(analysisResults);
    
    // Move to results phase
    setCurrentPhase('results');
    
    // Show confirmation
    toast({
      title: "Assessment Complete",
      description: "Your personality analysis is ready! View your complete results.",
    });
    
    console.log('Complete personality analysis:', analysisResults);
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
        
        {currentPhase === 'details' && (
          <DetailExperience 
            onComplete={handleDetailComplete}
            foundationSelections={foundationSelections}
            buildingBlockSelections={buildingBlockSelections}
            colorPaletteSelections={colorPaletteSelections}
          />
        )}
        
        {currentPhase === 'results' && personalityResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ padding: '3rem', maxWidth: '1000px', margin: '0 auto' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '1rem' }}>
                Your Personality Mosaic Results
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                Discover your unique personality pattern and insights
              </p>
            </div>

            {/* Primary Type Results */}
            <div style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
              color: 'white',
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Type {personalityResults.primaryType.number}: {personalityResults.primaryType.name}
              </h3>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '1rem' }}>
                {personalityResults.primaryType.description}
              </p>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Confidence: {personalityResults.primaryType.confidence}%
              </div>
            </div>

            {/* Influence and Mood Patterns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {personalityResults.influence && (
                <div style={{ 
                  background: '#f0fdf4', 
                  border: '1px solid #10b981', 
                  borderRadius: '12px', 
                  padding: '1.5rem' 
                }}>
                  <h4 style={{ color: '#065f46', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Type Influence</h4>
                  <p style={{ color: '#047857', fontSize: '1rem', fontWeight: '600' }}>{personalityResults.influence.fullType}</p>
                  <p style={{ color: '#059669', fontSize: '0.9rem' }}>Strength: {personalityResults.influence.strength}</p>
                </div>
              )}
              
              {personalityResults.moodPatterns && (
                <div style={{ 
                  background: '#fef3c7', 
                  border: '1px solid #f59e0b', 
                  borderRadius: '12px', 
                  padding: '1.5rem' 
                }}>
                  <h4 style={{ color: '#92400e', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Mood Patterns</h4>
                  <p style={{ color: '#b45309', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Good Mood → Type {personalityResults.moodPatterns.goodMood.type} qualities
                  </p>
                  <p style={{ color: '#b45309', fontSize: '0.9rem' }}>
                    Bad Mood → Type {personalityResults.moodPatterns.badMood.type} qualities
                  </p>
                </div>
              )}
            </div>

            {/* Heart Activation and Focus Areas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {personalityResults.heartActivation && (
                <div style={{ 
                  background: '#fef7ff', 
                  border: '1px solid #c084fc', 
                  borderRadius: '12px', 
                  padding: '1.5rem' 
                }}>
                  <h4 style={{ color: '#7c2d92', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Heart Activation</h4>
                  <p style={{ color: '#8b5cf6', fontSize: '1rem', fontWeight: '600' }}>{personalityResults.heartActivation.dominantState}</p>
                  <p style={{ color: '#9333ea', fontSize: '0.9rem' }}>{personalityResults.heartActivation.activationPercentage}% activation level</p>
                </div>
              )}
              
              {personalityResults.subtypeFocus && (
                <div style={{ 
                  background: '#ecfdf5', 
                  border: '1px solid #34d399', 
                  borderRadius: '12px', 
                  padding: '1.5rem' 
                }}>
                  <h4 style={{ color: '#047857', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Focus Areas</h4>
                  <p style={{ color: '#059669', fontSize: '1rem', fontWeight: '600' }}>{personalityResults.subtypeFocus.dominantName} Primary</p>
                  <p style={{ color: '#10b981', fontSize: '0.9rem' }}>Stack: {personalityResults.subtypeFocus.focusStack}</p>
                </div>
              )}
            </div>

            {/* Type Scores */}
            <div style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              padding: '2rem', 
              marginBottom: '2rem' 
            }}>
              <h4 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.2rem' }}>Type Score Breakdown</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {personalityResults.primaryType.topThree.map((result, index) => (
                  <div key={result.type} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: index === 0 ? '#6366f1' : '#64748b' }}>
                      Type {result.type}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      Score: {result.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div style={{ 
              background: '#f1f5f9', 
              borderRadius: '12px', 
              padding: '2rem', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.2rem' }}>Assessment Summary</h4>
              <div style={{ color: '#475569', lineHeight: '1.6' }}>
                <p><strong>Your Type:</strong> {personalityResults.summary.fullType}</p>
                <p><strong>Primary Focus:</strong> {personalityResults.summary.dominantFocus}</p>
                <p><strong>Heart Activation:</strong> {personalityResults.summary.heartActivationLevel}%</p>
                <p><strong>Good Mood Qualities:</strong> Type {personalityResults.summary.goodMoodType}</p>
                <p><strong>Bad Mood Qualities:</strong> Type {personalityResults.summary.badMoodType}</p>
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
                onClick={() => {
                  setCurrentPhase('foundation');
                  setPersonalityResults(null);
                  setFoundationSelections([]);
                  setBuildingBlockSelections([]);
                  setColorPaletteSelections([]);
                  setDetailSelections([]);
                }}
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