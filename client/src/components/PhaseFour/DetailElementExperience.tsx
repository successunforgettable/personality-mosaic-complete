import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAssessment } from '@/context/AssessmentContext';
import TowerVisualization from '../TowerVisualization';
import TokenPool from './TokenPool';
import SubtypeContainer from './SubtypeContainer';
import { SubtypeDistribution } from '@/types/assessment';

const DetailElementExperience: React.FC = () => {
  const { state, setPhase, generateResult } = useAssessment();
  const { result, stateDistribution } = state;
  
  // Initialize token counts
  const [tokenCounts, setTokenCounts] = useState({
    selfPreservation: 0,
    oneToOne: 0,
    social: 0
  });
  
  // Distribute tokens across subtypes
  const [subtypeDistribution, setSubtypeDistribution] = useState<SubtypeDistribution>({
    selfPreservation: 0,
    oneToOne: 0,
    social: 0
  });
  
  // Total number of tokens available
  const totalTokens = 10;
  
  // Calculate the total tokens placed across all containers
  const getTotalTokens = () => {
    return tokenCounts.selfPreservation + tokenCounts.oneToOne + tokenCounts.social;
  };
  
  // Check if all tokens have been placed
  const isComplete = getTotalTokens() === totalTokens;
  
  // Handle adding a token to a container
  const handleAddToken = (containerId: string) => {
    if (getTotalTokens() < totalTokens) {
      setTokenCounts(prev => ({
        ...prev,
        [containerId]: prev[containerId as keyof typeof prev] + 1
      }));
    }
  };
  
  // Handle removing a token from a container
  const handleRemoveToken = (containerId: string) => {
    if (tokenCounts[containerId as keyof typeof tokenCounts] > 0) {
      setTokenCounts(prev => ({
        ...prev,
        [containerId]: prev[containerId as keyof typeof prev] - 1
      }));
    }
  };
  
  // Update subtype distribution whenever token counts change
  useEffect(() => {
    if (getTotalTokens() === 0) return;
    
    const total = getTotalTokens();
    setSubtypeDistribution({
      selfPreservation: Math.round((tokenCounts.selfPreservation / total) * 100),
      oneToOne: Math.round((tokenCounts.oneToOne / total) * 100),
      social: Math.round((tokenCounts.social / total) * 100)
    });
  }, [tokenCounts]);
  
  // Handle continuing to results
  const handleContinue = () => {
    // Update context with final distribution
    generateResult();
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pb-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">
            Decorate Your Tower
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Distribute 10 tokens among the three instinctual subtypes based on how you focus your energy and attention.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {/* Tower visualization */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-5 h-full">
              <h3 className="font-semibold text-gray-900 mb-4">Your Tower</h3>
              <div className="flex justify-center mb-6">
                <TowerVisualization 
                  stateDistribution={stateDistribution} 
                  subtypeDistribution={subtypeDistribution}
                />
              </div>
              
              <div className="text-sm text-gray-600 space-y-3 mt-6">
                <p className="font-medium text-gray-800">Your subtype distribution:</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Self-Preservation:</span>
                    <span className="font-medium">{subtypeDistribution.selfPreservation}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${subtypeDistribution.selfPreservation}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>One-to-One:</span>
                    <span className="font-medium">{subtypeDistribution.oneToOne}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${subtypeDistribution.oneToOne}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Social:</span>
                    <span className="font-medium">{subtypeDistribution.social}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${subtypeDistribution.social}%` }}></div>
                  </div>
                </div>
                
                {/* Show stack analysis only when all tokens are placed */}
                {isComplete && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-medium text-blue-800">Stack Analysis:</p>
                    <p className="text-blue-700">
                      {/* Determine dominant subtype if one has >50% */}
                      {subtypeDistribution.selfPreservation > 50 && 'Self-Preservation dominant'}
                      {subtypeDistribution.oneToOne > 50 && 'One-to-One dominant'}
                      {subtypeDistribution.social > 50 && 'Social dominant'}
                      {/* If none is over 50%, it's balanced */}
                      {subtypeDistribution.selfPreservation <= 50 && 
                       subtypeDistribution.oneToOne <= 50 && 
                       subtypeDistribution.social <= 50 && 'Balanced stack'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Main drag-drop area */}
          <div className="md:col-span-2 lg:col-span-3">
            {/* Token pool - unassigned tokens */}
            <TokenPool 
              totalTokens={totalTokens}
              placedTokens={getTotalTokens()}
              personalityType={result?.type}
            />
            
            {/* Subtype containers */}
            <div className="space-y-4">
              <SubtypeContainer 
                id="selfPreservation"
                title="Self-Preservation"
                description="Focus on physical security, health, comfort, and material resources"
                tokenCount={tokenCounts.selfPreservation}
                onTokenPlace={() => handleAddToken('selfPreservation')}
                onTokenRemove={() => handleRemoveToken('selfPreservation')}
              />
              
              <SubtypeContainer 
                id="oneToOne"
                title="One-to-One"
                description="Focus on intimate relationships, deep connections, and attraction"
                tokenCount={tokenCounts.oneToOne}
                onTokenPlace={() => handleAddToken('oneToOne')}
                onTokenRemove={() => handleRemoveToken('oneToOne')}
              />
              
              <SubtypeContainer 
                id="social"
                title="Social"
                description="Focus on group dynamics, community, belonging, and social position"
                tokenCount={tokenCounts.social}
                onTokenPlace={() => handleAddToken('social')}
                onTokenRemove={() => handleRemoveToken('social')}
              />
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button 
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
            onClick={() => setPhase(3)}
          >
            Previous Phase
          </button>
          <button 
            className={`px-6 py-3 ${isComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} 
              text-white rounded-lg font-medium shadow-md transition-all flex items-center gap-2`}
            onClick={handleContinue}
            disabled={!isComplete}
          >
            {isComplete ? (
              <>
                <span className="material-icons text-sm">check_circle</span>
                Complete & View Results
              </>
            ) : (
              <>
                <span className="material-icons text-sm">info</span>
                Distribute All Tokens to Continue
                <span className="text-xs opacity-75 ml-1">
                  ({getTotalTokens()}/{totalTokens})
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default DetailElementExperience;