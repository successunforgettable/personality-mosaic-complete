import React from 'react';
import Stone from './Stone';
import './Foundation.css';

const Foundation = ({ selectedStones = [] }) => {
  // Define the stone positions around the circle
  const stonePositions = [
    { x: 50, y: 10 },  // top
    { x: 90, y: 50 },  // right
    { x: 50, y: 90 }   // bottom
  ];
  
  // Sample stones for the demo
  const stones = [
    {
      id: 1,
      type: 'heart',
      content: 'COMPASSION',
      style: { 
        background: 'linear-gradient(135deg, #be123c 0%, #e11d48 100%)',
        clipPath: 'polygon(50% 0%, 86% 25%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 14% 25%)'
      }
    },
    {
      id: 2,
      type: 'head',
      content: 'ANALYSIS',
      style: { 
        background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)',
        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
      }
    },
    {
      id: 3,
      type: 'body',
      content: 'PASSION',
      style: { 
        background: 'linear-gradient(135deg, #0e7490 0%, #0ea5e9 100%)',
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
      }
    }
  ];

  return (
    <div className="foundation-container">
      <div className="foundation-circle">
        {/* Center point */}
        <div className="foundation-center"></div>
        
        {/* Connection lines */}
        {stonePositions.map((pos, index) => (
          <div 
            key={`line-${index}`}
            className="connecting-line"
            style={{
              left: '50%',
              top: '50%',
              width: `${Math.sqrt(Math.pow(pos.x - 50, 2) + Math.pow(pos.y - 50, 2))}%`,
              transform: `rotate(${Math.atan2(pos.y - 50, pos.x - 50)}rad)`,
              transformOrigin: '0 0'
            }}
          ></div>
        ))}
        
        {/* Stones placed on the circle */}
        {stones.map((stone, index) => (
          <div 
            key={`stone-${stone.id}`} 
            className="placed-stone"
            style={{
              ...stonePositions[index],
              ...stone.style,
              position: 'absolute',
              left: `${stonePositions[index].x}%`,
              top: `${stonePositions[index].y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        ))}
      </div>
      
      <div className="foundation-progress">
        3 of 9 stones selected
      </div>
    </div>
  );
};

export default Foundation;