/**
 * Complete Assessment Integration - All Seven Sections
 * Integrates the entire personality assessment flow from foundation stones to final report
 */

import { useState, useEffect } from 'react';
import PhaseOne from './PhaseOne.jsx';
import PhaseTwo from './PhaseTwo.jsx';
import PhaseThree from './PhaseThree.jsx';
import PhaseFour from './PhaseFour.jsx';
import { Section7Report } from './Section7Report.jsx';
import { analyzePersonality } from '../lib/personalityAnalysis.js';
import { generateSubtypeAnalysis } from '../lib/subtypeAnalysis.js';
import { generateWheelOfLifeAnalysis } from '../lib/wheelOfLifeAnalysis.js';

export default function CompleteAssessment({ onComplete, userId }) {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    foundationSelections: null,
    buildingBlocks: null,
    stateDistribution: null,
    subtypeDistribution: null
  });
  const [personalityResults, setPersonalityResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle phase completion and data collection
  const handlePhaseComplete = async (phaseData, phaseNumber) => {
    setIsTransitioning(true);

    // Update assessment data based on phase
    const updatedData = { ...assessmentData };
    
    switch (phaseNumber) {
      case 1:
        updatedData.foundationSelections = phaseData.selections;
        break;
      case 2:
        updatedData.buildingBlocks = phaseData.blockSelections;
        break;
      case 3:
        updatedData.stateDistribution = phaseData.stateDistribution;
        break;
      case 4:
        updatedData.subtypeDistribution = phaseData.subtypeDistribution;
        break;
    }

    setAssessmentData(updatedData);

    // If this is the final phase, generate complete personality analysis
    if (phaseNumber === 4) {
      setIsAnalyzing(true);
      try {
        const results = await generateCompletePersonalityAnalysis(updatedData);
        setPersonalityResults(results);
        setCurrentPhase(5); // Move to results phase
      } catch (error) {
        console.error('Personality analysis failed:', error);
        // Handle error appropriately
      }
      setIsAnalyzing(false);
    } else {
      // Move to next phase
      setTimeout(() => {
        setCurrentPhase(phaseNumber + 1);
        setIsTransitioning(false);
      }, 500);
    }
  };

  // Generate complete personality analysis from all phases
  const generateCompletePersonalityAnalysis = async (data) => {
    // Section 1 & 2: Core type and wing analysis
    const coreAnalysis = analyzePersonality(data.foundationSelections, data.buildingBlocks);
    
    // Section 5: Subtype analysis
    const subtypeAnalysis = generateSubtypeAnalysis({
      primaryType: coreAnalysis.primaryType,
      subtypeDistribution: data.subtypeDistribution
    });
    
    // Section 6: Wheel of Life analysis
    const wheelOfLifeAnalysis = generateWheelOfLifeAnalysis({
      primaryType: coreAnalysis.primaryType,
      heartActivation: coreAnalysis.stateDistribution,
      subtypeFocus: subtypeAnalysis
    });

    return {
      // Core personality data
      primaryType: coreAnalysis.primaryType,
      wingInfluence: coreAnalysis.wingInfluence,
      moodStates: coreAnalysis.moodStates,
      
      // State and distribution data
      stateDistribution: {
        ...coreAnalysis.stateDistribution,
        ...data.stateDistribution
      },
      
      // Subtype and priority data
      subtypeDistribution: data.subtypeDistribution,
      subtypeAnalysis: subtypeAnalysis,
      
      // Life domain analysis
      wheelOfLifeAnalysis: wheelOfLifeAnalysis,
      
      // Raw assessment data for tower visualization
      foundationSelections: data.foundationSelections,
      buildingBlocks: data.buildingBlocks,
      
      // Metadata
      completedAt: new Date().toISOString(),
      userId: userId
    };
  };

  // Handle navigation between phases
  const handleBackToPhase = (phaseNumber) => {
    if (phaseNumber < currentPhase) {
      setCurrentPhase(phaseNumber);
    }
  };

  // Save assessment results
  const handleSaveResults = async () => {
    if (personalityResults && userId) {
      try {
        const response = await fetch('/api/assessment-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            results: personalityResults
          })
        });

        if (response.ok) {
          console.log('Assessment results saved successfully');
        } else {
          console.error('Failed to save assessment results');
        }
      } catch (error) {
        console.error('Error saving assessment results:', error);
      }
    }
  };

  // Export results to PDF
  const handleExportResults = () => {
    if (personalityResults) {
      window.print();
    }
  };

  return (
    <div className="complete-assessment min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Progress Header */}
      <div className="assessment-header bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Personality Mosaic Assessment</h1>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((phase) => (
                <div
                  key={phase}
                  className={`flex items-center ${phase < 5 ? 'cursor-pointer' : ''}`}
                  onClick={() => phase < 5 && handleBackToPhase(phase)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      phase < currentPhase
                        ? 'bg-green-500 text-white'
                        : phase === currentPhase
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {phase < currentPhase ? '✓' : phase}
                  </div>
                  
                  {phase < 5 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        phase < currentPhase ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Phase Labels */}
            <div className="hidden md:flex space-x-6 text-sm text-gray-600">
              <span className={currentPhase === 1 ? 'font-medium text-blue-600' : ''}>
                Foundation Stones
              </span>
              <span className={currentPhase === 2 ? 'font-medium text-blue-600' : ''}>
                Building Blocks
              </span>
              <span className={currentPhase === 3 ? 'font-medium text-blue-600' : ''}>
                Color Palette
              </span>
              <span className={currentPhase === 4 ? 'font-medium text-blue-600' : ''}>
                Detail Elements
              </span>
              <span className={currentPhase === 5 ? 'font-medium text-blue-600' : ''}>
                Your Results
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="assessment-content">
        {isTransitioning && (
          <div className="transition-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-700">Processing your selections...</p>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="analysis-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center max-w-md">
              <div className="animate-pulse">
                <div className="h-4 bg-blue-200 rounded mb-4"></div>
                <div className="h-4 bg-blue-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-blue-200 rounded mb-4 w-1/2"></div>
              </div>
              <p className="text-gray-700 mt-4">Generating your complete personality analysis...</p>
              <p className="text-sm text-gray-500 mt-2">This includes all seven analysis dimensions</p>
            </div>
          </div>
        )}

        {/* Phase 1: Foundation Stone Experience */}
        {currentPhase === 1 && (
          <div className="phase-container">
            <PhaseOne
              onComplete={(data) => handlePhaseComplete(data, 1)}
              previousSelections={assessmentData.foundationSelections}
            />
          </div>
        )}

        {/* Phase 2: Building Block Experience */}
        {currentPhase === 2 && (
          <div className="phase-container">
            <PhaseTwo
              onComplete={(data) => handlePhaseComplete(data, 2)}
              previousSelections={assessmentData.buildingBlocks}
              foundationResults={assessmentData.foundationSelections}
            />
          </div>
        )}

        {/* Phase 3: Color Palette Experience */}
        {currentPhase === 3 && (
          <div className="phase-container">
            <PhaseThree
              onComplete={(data) => handlePhaseComplete(data, 3)}
              previousSelections={assessmentData.stateDistribution}
              buildingBlockResults={assessmentData.buildingBlocks}
            />
          </div>
        )}

        {/* Phase 4: Detail Element Experience */}
        {currentPhase === 4 && (
          <div className="phase-container">
            <PhaseFour
              onComplete={(data) => handlePhaseComplete(data, 4)}
              previousSelections={assessmentData.subtypeDistribution}
            />
          </div>
        )}

        {/* Phase 5: Complete Results */}
        {currentPhase === 5 && personalityResults && (
          <div className="results-container">
            <Section7Report
              personalityData={personalityResults}
              onSave={handleSaveResults}
              onExport={handleExportResults}
            />
            
            {/* Results Actions */}
            <div className="results-actions mt-8 text-center">
              <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Your Personality Assessment is Complete!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You've discovered your unique personality pattern through our comprehensive seven-section analysis.
                    Your results include your core type, influence patterns, state distribution, priority areas, and life domain insights.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => handleBackToPhase(1)}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Retake Assessment
                    </button>
                    
                    <button
                      onClick={handleSaveResults}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Results
                    </button>
                    
                    <button
                      onClick={() => onComplete && onComplete(personalityResults)}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Continue to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assessment Summary (always visible in sidebar) */}
      {currentPhase > 1 && currentPhase < 5 && (
        <div className="assessment-summary fixed right-4 top-24 bg-white rounded-lg shadow-lg p-4 w-64 border">
          <h4 className="font-semibold text-gray-800 mb-3">Assessment Progress</h4>
          
          <div className="space-y-2 text-sm">
            {assessmentData.foundationSelections && (
              <div className="flex justify-between">
                <span className="text-gray-600">Foundation:</span>
                <span className="text-green-600">✓ Complete</span>
              </div>
            )}
            
            {assessmentData.buildingBlocks && (
              <div className="flex justify-between">
                <span className="text-gray-600">Building Blocks:</span>
                <span className="text-green-600">✓ Complete</span>
              </div>
            )}
            
            {assessmentData.stateDistribution && (
              <div className="flex justify-between">
                <span className="text-gray-600">Color Palette:</span>
                <span className="text-green-600">✓ Complete</span>
              </div>
            )}
            
            {assessmentData.subtypeDistribution && (
              <div className="flex justify-between">
                <span className="text-gray-600">Detail Elements:</span>
                <span className="text-green-600">✓ Complete</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assessment Styles */}
      <style jsx>{`
        .phase-container {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .results-container {
          animation: slideInUp 0.7s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .transition-overlay, .analysis-overlay {
          backdrop-filter: blur(4px);
        }
        
        .assessment-summary {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </div>
  );
}