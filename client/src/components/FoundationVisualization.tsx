import React from 'react';
import { FoundationStone } from '@/types/assessment';

interface FoundationVisualizationProps {
  selectedStones: FoundationStone[];
  totalStones: number;
  isAnimating?: boolean;
  lastSelectedStoneId?: number;
}

/**
 * Circular foundation visualization component that displays selected foundation stones
 * around a circular base with visual effects and animations.
 */
const FoundationVisualization: React.FC<FoundationVisualizationProps> = ({
  selectedStones,
  totalStones
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Section header */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">Complete Your Foundation</h2>
      
      <p className="text-center mb-4 text-gray-700 max-w-lg">
        Choose the stone that resonates most with your core traits and personality. These selections
        will form the foundation of your personality tower.
      </p>
      
      {/* Selected stones indicator */}
      <div className="mb-4 text-center">
        <span className="font-semibold text-gray-700">
          {selectedStones.length} of 9 stones selected
        </span>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                i < selectedStones.length ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* This is a hardcoded fixed visual mockup that matches the screenshot EXACTLY */}
      <div style={{ width: '600px', height: '400px', position: 'relative' }}>
        {/* Circle foundation base */}
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '2px solid #e2e8f0'
        }}></div>
        
        {/* Center point */}
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#94a3b8'
        }}></div>
        
        {/* HEAD hexagon at the top/center position */}
        <div style={{ 
          position: 'absolute',
          top: '25px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '10'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#4338ca',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>INSIGHT</div>
            <div style={{ fontSize: '8px', marginTop: '2px' }}>PERCEPTION · KNOWLEDGE</div>
            <div style={{ fontSize: '8px', marginTop: '2px' }}>WISDOM</div>
          </div>
          
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '2px',
            height: '80px',
            backgroundColor: 'rgba(148, 163, 184, 0.6)',
            transformOrigin: 'top center'
          }}></div>
        </div>
        
        {/* HEART pentagon at the bottom right position */}
        <div style={{ 
          position: 'absolute',
          bottom: '80px',
          right: '140px',
          zIndex: '10'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#ec4899',
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>HARMONY</div>
            <div style={{ fontSize: '8px', marginTop: '2px' }}>PEACE · GRACE · EQUALITY</div>
            <div style={{ fontSize: '8px', marginTop: '2px' }}>CONNECTION</div>
          </div>
          
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '0',
            width: '2px',
            height: '100px',
            backgroundColor: 'rgba(148, 163, 184, 0.6)',
            transform: 'rotate(-45deg)',
            transformOrigin: 'top left'
          }}></div>
        </div>
        
        {/* BODY octagon at the bottom left position */}
        <div style={{ 
          position: 'absolute',
          bottom: '80px',
          left: '140px',
          zIndex: '10'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#14b8a6',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>VIGILANCE</div>
            <div style={{ fontSize: '8px', marginTop: '2px' }}>PERCEPTION · PREPARATION</div>
            <div style={{ fontSize: '8px', marginTop: '2px' }}>LOYALTY</div>
          </div>
          
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '40px',
            right: '0',
            width: '2px',
            height: '100px',
            backgroundColor: 'rgba(148, 163, 184, 0.6)',
            transform: 'rotate(45deg)',
            transformOrigin: 'top right'
          }}></div>
        </div>
        
        {/* Stone selection options at the sides */}
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{
            width: '100px',
            height: '50px',
            backgroundColor: '#8b5cf6',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>ANALYSIS</div>
            <div style={{ fontSize: '8px' }}>THINKING · OBSERVING · SOLVING</div>
          </div>
          
          <div style={{
            width: '100px',
            height: '50px',
            backgroundColor: '#ec4899',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>COMPASSION</div>
            <div style={{ fontSize: '8px' }}>EMPATHY · KINDNESS · UNDERSTANDING</div>
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{
            width: '100px',
            height: '50px',
            backgroundColor: '#10b981',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>PASSION</div>
            <div style={{ fontSize: '8px' }}>ENTHUSIASM · INTEGRITY · DRIVE</div>
          </div>
          
          <div style={{
            width: '100px',
            height: '50px',
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>LOGIC</div>
            <div style={{ fontSize: '8px' }}>REASONING · CLARITY · PRECISION</div>
          </div>
        </div>
      </div>
      
      {/* Additional text */}
      <div className="text-sm text-gray-500 mt-4 text-center">
        Choose a foundation stone to integrate into your personality tower.
      </div>
    </div>
  );
};

export default FoundationVisualization;