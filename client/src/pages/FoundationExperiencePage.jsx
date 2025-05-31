import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FoundationExperience from '../components/Foundation/FoundationExperience.jsx';
import BuildingBlockExperience from '../components/BuildingBlocks/BuildingBlockExperience.jsx';
import ColorPaletteExperience from '../components/ColorPalette/ColorPaletteExperience.jsx';
import DetailExperience from '../components/PhaseFour/DetailExperience.jsx';
import { useToast } from '@/hooks/use-toast';
import { generatePersonalityAnalysis } from '../lib/personalityAnalysis.js';
import { generateComprehensiveReport } from '../lib/reportGeneration.js';

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
  const [comprehensiveReport, setComprehensiveReport] = useState(null);
  
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
    
    // Generate comprehensive report
    const fullReport = generateComprehensiveReport(analysisResults);
    
    setPersonalityResults(analysisResults);
    setComprehensiveReport(fullReport);
    
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
        
        {currentPhase === 'results' && personalityResults && comprehensiveReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '1rem' }}>
                Your Comprehensive Personality Report
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                Detailed insights into your core energy pattern and life domain impacts
              </p>
            </div>

            {/* Core Energy Pattern */}
            <div style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
              color: 'white',
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                {comprehensiveReport.corePattern.name}
              </h3>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '1rem' }}>
                {comprehensiveReport.corePattern.coreDriver}
              </p>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Confidence: {personalityResults.primaryType.confidence}%
              </div>
            </div>

            {/* Heart Activation Level */}
            <div style={{ 
              background: '#fef7ff', 
              border: '1px solid #c084fc', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#7c2d92', fontSize: '1.6rem', marginBottom: '1rem' }}>
                Heart Activation Profile
              </h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                {comprehensiveReport.heartActivation.currentLevel}%
              </div>
              <p style={{ color: '#7c2d92', fontSize: '1.1rem', marginBottom: '1rem' }}>
                {comprehensiveReport.heartActivation.stateName}
              </p>
              <p style={{ color: '#9333ea', fontSize: '0.95rem' }}>
                {comprehensiveReport.heartActivation.stateDescription}
              </p>
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

            {/* Priority Focus Area */}
            <div style={{ 
              background: '#ecfdf5', 
              border: '1px solid #34d399', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#047857', fontSize: '1.6rem', marginBottom: '1rem' }}>
                Priority Focus Area
              </h3>
              <h4 style={{ color: '#059669', fontSize: '1.3rem', marginBottom: '1rem' }}>
                {comprehensiveReport.priorityArea.name}
              </h4>
              <p style={{ color: '#047857', fontSize: '1rem', marginBottom: '1rem' }}>
                {comprehensiveReport.priorityArea.description}
              </p>
              <div style={{ color: '#10b981', fontSize: '0.9rem' }}>
                <strong>Key Characteristics:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                  {comprehensiveReport.priorityArea.characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Wheel of Life Analysis */}
            <div style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem' 
            }}>
              <h3 style={{ color: '#1e293b', fontSize: '1.6rem', marginBottom: '1rem' }}>
                Wheel of Life Domain Analysis
              </h3>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
                How your core energy pattern impacts each life domain
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {comprehensiveReport.wheelOfLife.domains.map((domain) => (
                  <div key={domain.domainId} style={{ 
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '600' }}>
                        {domain.domainName}
                      </h4>
                      <div style={{ 
                        background: domain.activationScore >= 60 ? '#10b981' : domain.activationScore >= 40 ? '#f59e0b' : '#ef4444',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {domain.activationScore}%
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <h5 style={{ color: '#374151', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Current State:
                      </h5>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                        {domain.currentState}
                      </p>
                    </div>

                    {domain.indicators && domain.indicators.length > 0 && (
                      <div style={{ marginBottom: '1rem' }}>
                        <h5 style={{ color: '#374151', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                          Key Indicators:
                        </h5>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                          {domain.indicators.map((indicator, index) => (
                            <div key={index} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              marginBottom: '0.25rem',
                              paddingLeft: '0.5rem'
                            }}>
                              <span style={{ 
                                width: '4px', 
                                height: '4px', 
                                borderRadius: '50%', 
                                background: domain.activationScore >= 60 ? '#10b981' : '#f59e0b',
                                marginRight: '0.5rem'
                              }}></span>
                              {indicator}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1rem' }}>
                      <h5 style={{ color: '#374151', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Trajectory Without Change:
                      </h5>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>3 months:</strong> {domain.shortTermProjection}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>1 year:</strong> {domain.mediumTermProjection}
                        </div>
                        <div>
                          <strong>3+ years:</strong> {domain.longTermProjection}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                textAlign: 'center', 
                marginTop: '2rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0369a1' }}>
                  Overall Life Activation: {comprehensiveReport.wheelOfLife.overallActivation}%
                </div>
              </div>
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

            {/* Growth Recommendations */}
            <div style={{ 
              background: '#fff7ed', 
              border: '1px solid #fed7aa', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#9a3412', fontSize: '1.6rem', marginBottom: '1rem' }}>
                Growth Recommendations
              </h3>
              <div style={{ color: '#c2410c' }}>
                {comprehensiveReport.growthRecommendations.map((recommendation, index) => (
                  <div key={index} style={{ 
                    background: 'white',
                    border: '1px solid #fed7aa',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderLeft: '4px solid #ea580c'
                  }}>
                    {recommendation}
                  </div>
                ))}
              </div>
            </div>

            {/* Coaching Opportunities */}
            <div style={{ 
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', 
              border: '1px solid #f87171', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#991b1b', fontSize: '1.6rem', marginBottom: '1rem' }}>
                Unlock Your Full Potential
              </h3>
              <p style={{ color: '#dc2626', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Ready to maximize your {comprehensiveReport.heartActivation.currentLevel}% heart activation and optimize all life domains?
              </p>
              <div style={{ color: '#b91c1c', marginBottom: '1.5rem' }}>
                {comprehensiveReport.coachingOpportunities.map((opportunity, index) => (
                  <div key={index} style={{ 
                    background: 'white',
                    border: '1px solid #f87171',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    {opportunity}
                  </div>
                ))}
              </div>
              <button style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(220, 38, 38, 0.25)'
              }}>
                Start Your Transformation Journey
              </button>
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