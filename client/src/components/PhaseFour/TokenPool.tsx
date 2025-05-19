import React from 'react';
import Token from './TokenComponent';
import { PersonalityType } from '@/types/assessment';

interface TokenPoolProps {
  totalTokens: number;
  placedTokens: number;
  personalityType?: PersonalityType;
}

const TokenPool: React.FC<TokenPoolProps> = ({ 
  totalTokens, 
  placedTokens, 
  personalityType 
}) => {
  // Calculate remaining tokens
  const remainingTokens = Math.max(0, totalTokens - placedTokens);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h3 className="font-medium text-gray-800 mb-3">
        Available Tokens: <span className="font-semibold text-blue-600">{remainingTokens}</span>
      </h3>
      
      {remainingTokens > 0 ? (
        <div className="flex flex-wrap gap-3 justify-center p-4 border border-dashed border-gray-300 rounded-lg">
          {Array(remainingTokens).fill(null).map((_, index) => (
            <Token 
              key={`unplaced-${index}`}
              id={`unplaced-${index}`}
              isPlaced={false}
              personalityType={personalityType}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-lg">
          <p className="italic">All tokens have been placed!</p>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p><span className="font-medium">Tip:</span> Drag tokens to the subtype containers to indicate your instinctual focus.</p>
        <p className="mt-1"><span className="font-medium">Double-click</span> on placed tokens to return them to the pool.</p>
      </div>
    </div>
  );
};

export default TokenPool;