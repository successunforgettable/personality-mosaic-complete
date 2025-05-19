import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAssessment } from '@/context/AssessmentContext';
import TowerVisualization from './TowerVisualization';
import { SubtypeDistribution } from '@/types/assessment';
import { motion } from 'framer-motion';

// Token Component
const Token = ({ 
  id, 
  isPlaced, 
  containerId,
  onDrag,
  onRemove
}) => {
  const [{ isDragging }, drag] = useDragItem('token');
  
  // Get color based on container
  const getColor = () => {
    switch(containerId) {
      case 'selfPreservation': return 'bg-gradient-to-br from-green-400 to-green-600';
      case 'oneToOne': return 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'social': return 'bg-gradient-to-br from-purple-400 to-purple-600';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-600';
    }
  };
  
  return (
    <motion.div
      ref={drag}
      className={`rounded-full w-8 h-8 flex items-center justify-center
                 border-2 border-white shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'} 
                 ${isPlaced ? 'cursor-pointer' : 'cursor-grab'}
                 ${getColor()}`}
      whileHover={{ scale: 1.1 }}
      animate={{ scale: isPlaced ? 1 : [0.95, 1.05, 0.95] }}
      transition={{ repeat: isPlaced ? 0 : Infinity, duration: 2 }}
      onDoubleClick={isPlaced ? onRemove : undefined}
    />
  );
};

// Helper hook for drag
function useDragItem(type) {
  const [isDragging, setIsDragging] = useState(false);
  
  const drag = React.useRef(null);
  
  React.useEffect(() => {
    const el = drag.current;
    if (!el) return;
    
    let dragCounter = 0;
    
    const handleDragStart = () => {
      setIsDragging(true);
      dragCounter++;
    };
    
    const handleDragEnd = () => {
      dragCounter--;
      if (dragCounter === 0) {
        setIsDragging(false);
      }
    };
    
    el.addEventListener('dragstart', handleDragStart);
    el.addEventListener('dragend', handleDragEnd);
    
    return () => {
      el.removeEventListener('dragstart', handleDragStart);
      el.removeEventListener('dragend', handleDragEnd);
    };
  }, []);
  
  return [{ isDragging }, drag];
}

// Subtype Container Component
const SubtypeContainer = ({
  id,
  title,
  description,
  tokenCount,
  onTokenPlace,
  onTokenRemove
}) => {
  const [isOver, setIsOver] = useState(false);
  
  // Ref for drop detection
  const drop = React.useRef(null);
  
  React.useEffect(() => {
    const el = drop.current;
    if (!el) return;
    
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsOver(true);
    };
    
    const handleDragLeave = () => {
      setIsOver(false);
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      setIsOver(false);
      onTokenPlace();
    };
    
    el.addEventListener('dragover', handleDragOver);
    el.addEventListener('dragleave', handleDragLeave);
    el.addEventListener('drop', handleDrop);
    
    return () => {
      el.removeEventListener('dragover', handleDragOver);
      el.removeEventListener('dragleave', handleDragLeave);
      el.removeEventListener('drop', handleDrop);
    };
  }, [onTokenPlace]);
  
  // Calculate fill percentage
  const fillPercentage = tokenCount * 10; // 10 tokens = 100%
  
  return (
    <div 
      ref={drop}
      className={`rounded-lg p-4 relative
                 ${isOver ? 'border-2 border-blue-400 bg-blue-50' : 'border border-dashed border-gray-300'}
                 overflow-hidden transition-all duration-300`}
      style={{ minHeight: '150px' }}
    >
      {/* Background fill based on token count */}
      <div 
        className={`absolute inset-0
                   ${id === 'selfPreservation' ? 'bg-green-100' :
                     id === 'oneToOne' ? 'bg-blue-100' :
                     id === 'social' ? 'bg-purple-100' : 'bg-gray-100'} 
                   transition-all duration-500 ease-out`}
        style={{ width: `${fillPercentage}%`, opacity: fillPercentage > 0 ? 0.3 : 0 }}
      />
      
      {/* Container content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
            <span className="text-xs font-medium text-blue-600">{tokenCount}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-3 justify-center min-h-[50px] py-2">
          {tokenCount === 0 && !isOver && (
            <div className="text-center text-gray-400 italic text-sm">
              Drop tokens here
            </div>
          )}
          
          {tokenCount === 0 && isOver && (
            <div className="text-center text-blue-500 font-medium text-sm animate-pulse">
              Drop here!
            </div>
          )}
          
          {Array(tokenCount).fill(null).map((_, index) => (
            <Token 
              key={`${id}-token-${index}`}
              id={`${id}-token-${index}`}
              isPlaced={true}
              containerId={id}
              onRemove={() => onTokenRemove()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Token Pool Component
const TokenPool = ({ availableTokens }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h3 className="font-medium text-gray-800 mb-3">
        Available Tokens: <span className="font-semibold text-blue-600">{availableTokens}</span>
      </h3>
      
      <div className="p-4 border border-dashed border-gray-300 rounded-lg">
        {availableTokens > 0 ? (
          <div className="flex flex-wrap gap-3 justify-center">
            {Array(availableTokens).fill(null).map((_, index) => (
              <Token 
                key={`pool-token-${index}`}
                id={`pool-token-${index}`}
                isPlaced={false}
                containerId="pool"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p className="italic">All tokens have been distributed!</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p><span className="font-medium">Tip:</span> Drag tokens to containers to show where you focus your energy.</p>
        <p className="mt-1"><span className="font-medium">Double-click</span> on placed tokens to return them to the pool.</p>
      </div>
    </div>
  );
};

// Main Phase Four Component (Token-based Subtype System)
const PhaseFour = () => {
  const { state, generateResult, setPhase } = useAssessment();
  const { stateDistribution } = state;
  
  // Token distribution state
  const [tokenCounts, setTokenCounts] = useState({
    selfPreservation: 0,
    oneToOne: 0,
    social: 0
  });
  
  // Total tokens available
  const totalTokens = 10;
  
  // Calculate tokens placed and available
  const tokensPlaced = tokenCounts.selfPreservation + tokenCounts.oneToOne + tokenCounts.social;
  const tokensAvailable = totalTokens - tokensPlaced;
  
  // Calculate subtype distribution
  const [subtypeDistribution, setSubtypeDistribution] = useState<SubtypeDistribution>({
    selfPreservation: 0,
    oneToOne: 0,
    social: 0
  });
  
  // Update distribution whenever token counts change
  useEffect(() => {
    if (tokensPlaced === 0) return;
    
    setSubtypeDistribution({
      selfPreservation: Math.round((tokenCounts.selfPreservation / tokensPlaced) * 100),
      oneToOne: Math.round((tokenCounts.oneToOne / tokensPlaced) * 100),
      social: Math.round((tokenCounts.social / tokensPlaced) * 100)
    });
  }, [tokenCounts, tokensPlaced]);
  
  // Add token to container
  const handleAddToken = (containerId) => {
    if (tokensAvailable > 0) {
      setTokenCounts(prev => ({
        ...prev,
        [containerId]: prev[containerId] + 1
      }));
    }
  };
  
  // Remove token from container
  const handleRemoveToken = (containerId) => {
    if (tokenCounts[containerId] > 0) {
      setTokenCounts(prev => ({
        ...prev,
        [containerId]: prev[containerId] - 1
      }));
    }
  };
  
  // Determine if all tokens have been placed
  const allTokensPlaced = tokensPlaced === totalTokens;
  
  // Handle continuing to results
  const handleComplete = () => {
    generateResult();
  };
  
  return (
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
              
              {/* Show stack analysis when all tokens are placed */}
              {allTokensPlaced && (
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
        
        {/* Main drag-drop area */}
        <div className="md:col-span-2 lg:col-span-3">
          {/* Token pool */}
          <TokenPool availableTokens={tokensAvailable} />
          
          {/* Subtype containers */}
          <div className="space-y-4">
            <SubtypeContainer 
              id="selfPreservation"
              title="Self-Preservation"
              description="Focus on physical security, health, domestic concerns, and material comfort"
              tokenCount={tokenCounts.selfPreservation}
              onTokenPlace={() => handleAddToken('selfPreservation')}
              onTokenRemove={() => handleRemoveToken('selfPreservation')}
            />
            
            <SubtypeContainer 
              id="oneToOne"
              title="One-to-One"
              description="Focus on close personal relationships, intimacy, and individual connections"
              tokenCount={tokenCounts.oneToOne}
              onTokenPlace={() => handleAddToken('oneToOne')}
              onTokenRemove={() => handleRemoveToken('oneToOne')}
            />
            
            <SubtypeContainer 
              id="social"
              title="Social"
              description="Focus on group dynamics, communities, and broader social structures"
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
          className={`px-6 py-3 ${allTokensPlaced ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} 
            text-white rounded-lg font-medium shadow-md transition-all flex items-center gap-2`}
          onClick={handleComplete}
          disabled={!allTokensPlaced}
        >
          {allTokensPlaced ? (
            <>
              <span className="material-icons text-sm">check_circle</span>
              Complete & View Results
            </>
          ) : (
            <>
              <span className="material-icons text-sm">info</span>
              Distribute All Tokens to Continue
              <span className="text-xs opacity-75 ml-1">
                ({tokensPlaced}/{totalTokens})
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PhaseFour;