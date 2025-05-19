import React, { useState, useEffect } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import TowerVisualization from './TowerVisualization';
import { SubtypeDistribution } from '@/types/assessment';
import { motion } from 'framer-motion';

const PhaseFour: React.FC = () => {
  const { state, generateResult, setPhase } = useAssessment();
  const { stateDistribution } = state;
  
  // Token distribution state
  const [distribution, setDistribution] = useState({
    selfPreservation: 0,
    oneToOne: 0,
    social: 0
  });
  
  // Calculate subtype distribution percentages
  const [subtypeDistribution, setSubtypeDistribution] = useState<SubtypeDistribution>({
    selfPreservation: 0,
    oneToOne: 0,
    social: 0
  });
  
  // Total tokens
  const totalTokens = 10;
  
  // Get total tokens placed
  const getTotalTokens = () => {
    return distribution.selfPreservation + distribution.oneToOne + distribution.social;
  };
  
  // Check if all tokens are distributed
  const isComplete = getTotalTokens() === totalTokens;
  
  // Handle token placement
  const handleTokenPlace = (containerId: keyof typeof distribution) => {
    if (getTotalTokens() < totalTokens) {
      setDistribution(prev => ({
        ...prev,
        [containerId]: prev[containerId] + 1
      }));
    }
  };
  
  // Handle token removal
  const handleTokenRemove = (containerId: keyof typeof distribution) => {
    if (distribution[containerId] > 0) {
      setDistribution(prev => ({
        ...prev,
        [containerId]: prev[containerId] - 1
      }));
    }
  };
  
  // Update subtype distribution percentages whenever token counts change
  useEffect(() => {
    if (getTotalTokens() === 0) return;
    
    const total = getTotalTokens();
    setSubtypeDistribution({
      selfPreservation: Math.round((distribution.selfPreservation / total) * 100),
      oneToOne: Math.round((distribution.oneToOne / total) * 100),
      social: Math.round((distribution.social / total) * 100)
    });
  }, [distribution]);
  
  // Handle continuing to results
  const handleContinue = () => {
    if (isComplete) {
      generateResult();
    }
  };
  
  return (
    <div className="pb-10">
      <div className="text-center mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Discover Your Instinctual Variants
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Distribute all 10 tokens among these three containers to show how much of your attention 
          and energy naturally goes to each area in your life. Areas with more tokens represent where you focus more intensely.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Left column - Token Pool and Tower Visualization */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-xl shadow-md p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Tower</h3>
            <div className="flex justify-center mb-6">
              <TowerVisualization 
                stateDistribution={stateDistribution} 
                subtypeDistribution={subtypeDistribution}
              />
            </div>
            
            <div className="text-sm text-gray-600">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-medium mb-2">Available Tokens: <span className="text-blue-600 font-bold">{totalTokens - getTotalTokens()}</span> / {totalTokens}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Array(totalTokens - getTotalTokens()).fill(null).map((_, index) => (
                    <div 
                      key={`token-${index}`}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-white shadow-md flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  ))}
                  {getTotalTokens() === totalTokens && (
                    <p className="text-green-600 font-medium">All tokens distributed!</p>
                  )}
                </div>
              </div>
              
              <p className="font-medium text-gray-800 mb-2">Your subtype distribution:</p>
              
              <div className="space-y-3">
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
              </div>
              
              {/* Show stack analysis when all tokens are placed */}
              {isComplete && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="font-medium text-blue-800">Stack Analysis:</p>
                  <p className="text-blue-700">
                    {subtypeDistribution.selfPreservation > 50 && 'Self-Preservation dominant'}
                    {subtypeDistribution.oneToOne > 50 && 'One-to-One dominant'}
                    {subtypeDistribution.social > 50 && 'Social dominant'}
                    {subtypeDistribution.selfPreservation <= 50 && 
                     subtypeDistribution.oneToOne <= 50 && 
                     subtypeDistribution.social <= 50 && 'Balanced stack'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Subtype Containers */}
        <div className="md:col-span-8">
          <div className="space-y-6">
            {/* Self-Preservation Container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Container header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-900">Self-Preservation</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleRemoveToken('selfPreservation')} 
                      disabled={distribution.selfPreservation === 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        distribution.selfPreservation === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      <span className="text-lg font-bold">-</span>
                    </button>
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200">
                      <span className="text-xl font-semibold text-gray-800">{distribution.selfPreservation}</span>
                    </div>
                    <button 
                      onClick={() => handleTokenPlace('selfPreservation')} 
                      disabled={getTotalTokens() >= totalTokens}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        getTotalTokens() >= totalTokens ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      <span className="text-lg font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Container content */}
              <div className="relative">
                {/* Background fill based on token count */}
                <div 
                  className="absolute inset-0 bg-green-50 transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(distribution.selfPreservation / totalTokens) * 100}%`, 
                    opacity: distribution.selfPreservation > 0 ? 0.7 : 0 
                  }}
                />
                
                <div className="p-4 relative z-10">
                  <p className="text-gray-700 mb-4">
                    Focus on physical security, health, comfort, and resources. Attention to personal needs and practical concerns.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array(distribution.selfPreservation).fill(null).map((_, index) => (
                      <div 
                        key={`sp-token-${index}`}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white shadow-md flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white bg-opacity-60 p-3 rounded-lg text-sm">
                    <p className="font-medium text-gray-800 mb-1">Examples:</p>
                    <ul className="text-gray-600 list-disc pl-5 space-y-1">
                      <li>Physical health and comfort</li>
                      <li>Financial security and resources</li>
                      <li>Practical concerns about survival</li>
                      <li>Home and personal environment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* One-to-One Container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Container header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-900">One-to-One</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleRemoveToken('oneToOne')} 
                      disabled={distribution.oneToOne === 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        distribution.oneToOne === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      <span className="text-lg font-bold">-</span>
                    </button>
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200">
                      <span className="text-xl font-semibold text-gray-800">{distribution.oneToOne}</span>
                    </div>
                    <button 
                      onClick={() => handleTokenPlace('oneToOne')} 
                      disabled={getTotalTokens() >= totalTokens}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        getTotalTokens() >= totalTokens ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      <span className="text-lg font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Container content */}
              <div className="relative">
                {/* Background fill based on token count */}
                <div 
                  className="absolute inset-0 bg-blue-50 transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(distribution.oneToOne / totalTokens) * 100}%`, 
                    opacity: distribution.oneToOne > 0 ? 0.7 : 0 
                  }}
                />
                
                <div className="p-4 relative z-10">
                  <p className="text-gray-700 mb-4">
                    Focus on intense connections, chemistry, and intimate relationships. Attention to deep personal bonds.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array(distribution.oneToOne).fill(null).map((_, index) => (
                      <div 
                        key={`oto-token-${index}`}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-md flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white bg-opacity-60 p-3 rounded-lg text-sm">
                    <p className="font-medium text-gray-800 mb-1">Examples:</p>
                    <ul className="text-gray-600 list-disc pl-5 space-y-1">
                      <li>Deep friendships and romantic connections</li>
                      <li>Intimate one-on-one interactions</li>
                      <li>Chemistry and attraction dynamics</li>
                      <li>Close personal relationships</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Container header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-900">Social</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleRemoveToken('social')} 
                      disabled={distribution.social === 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        distribution.social === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      <span className="text-lg font-bold">-</span>
                    </button>
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200">
                      <span className="text-xl font-semibold text-gray-800">{distribution.social}</span>
                    </div>
                    <button 
                      onClick={() => handleTokenPlace('social')} 
                      disabled={getTotalTokens() >= totalTokens}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        getTotalTokens() >= totalTokens ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                    >
                      <span className="text-lg font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Container content */}
              <div className="relative">
                {/* Background fill based on token count */}
                <div 
                  className="absolute inset-0 bg-purple-50 transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(distribution.social / totalTokens) * 100}%`, 
                    opacity: distribution.social > 0 ? 0.7 : 0 
                  }}
                />
                
                <div className="p-4 relative z-10">
                  <p className="text-gray-700 mb-4">
                    Focus on group dynamics, community belonging, and social roles. Attention to your place within larger contexts.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array(distribution.social).fill(null).map((_, index) => (
                      <div 
                        key={`soc-token-${index}`}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white shadow-md flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white bg-opacity-60 p-3 rounded-lg text-sm">
                    <p className="font-medium text-gray-800 mb-1">Examples:</p>
                    <ul className="text-gray-600 list-disc pl-5 space-y-1">
                      <li>Community involvement and group activities</li>
                      <li>Social status and recognition</li>
                      <li>Cultural identity and belonging</li>
                      <li>Group dynamics and social structures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
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
  );
};

export default PhaseFour;