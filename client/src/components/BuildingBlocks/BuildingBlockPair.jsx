import React from 'react';
import BuildingBlock from './BuildingBlock';
import { BLOCK_COLORS } from './BuildingBlockData';
import './BuildingBlockPair.css';

const BuildingBlockPair = ({ 
  pair, 
  selectedBlockId, 
  onSelectBlock,
  animationDelay = 0
}) => {
  // Function to handle block selection
  const handleBlockSelect = (blockId) => {
    if (onSelectBlock) {
      onSelectBlock(pair.blocks.find(block => block.id === blockId), pair.id);
    }
  };
  
  return (
    <div className="building-block-pair">
      <h3 className="pair-title">{pair.title}</h3>
      
      <div className="blocks-container">
        {pair.blocks.map((block, index) => {
          // Get block style based on name or use a default
          const blockStyle = BLOCK_COLORS[block.name] || { 
            background: 'linear-gradient(135deg, #94a3b8, #64748b)'
          };
          
          return (
            <div 
              className="block-wrapper"
              key={block.id}
              style={{ animationDelay: `${animationDelay + (index * 0.1)}s` }}
            >
              <BuildingBlock 
                content={
                  <div>
                    <div className="block-name">{block.name}</div>
                    <div className="block-description">{block.description}</div>
                  </div>
                }
                selected={selectedBlockId === block.id}
                onClick={() => handleBlockSelect(block.id)}
                blockIndex={block.id}
                style={blockStyle}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuildingBlockPair;