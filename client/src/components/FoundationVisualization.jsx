import React from 'react';

const FoundationVisualization = ({ selectedStones = [] }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: '320px', 
      height: '380px', 
      margin: '0 auto' 
    }}>
      {/* Main Foundation Circle */}
      <div style={{ 
        width: '280px', 
        height: '280px', 
        border: '2px solid #e2e8f0', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: '20px', 
        left: '20px' 
      }}>
        {/* Center point */}
        <div style={{ 
          width: '10px', 
          height: '10px', 
          backgroundColor: '#94a3b8', 
          borderRadius: '50%', 
          position: 'absolute', 
          top: '135px', 
          left: '135px', 
          zIndex: 1 
        }}></div>
        
        {/* Heart Stone (top) */}
        <div style={{ position: 'absolute', top: '20px', left: '125px' }}>
          {/* Connecting line */}
          <div style={{ 
            position: 'absolute', 
            backgroundColor: '#94a3b8', 
            height: '2px', 
            width: '115px', 
            zIndex: 0,
            transform: 'rotate(90deg)',
            transformOrigin: 'bottom left',
            top: '15px',
            left: '15px'
          }}></div>
          
          {/* Heart Stone */}
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#e11d48',
            clipPath: 'polygon(50% 0%, 86% 25%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 14% 25%)',
            position: 'absolute',
            zIndex: 2
          }}></div>
        </div>
        
        {/* Head Stone (right) */}
        <div style={{ position: 'absolute', top: '125px', right: '20px' }}>
          {/* Connecting line */}
          <div style={{ 
            position: 'absolute', 
            backgroundColor: '#94a3b8', 
            height: '2px', 
            width: '115px', 
            zIndex: 0,
            transform: 'rotate(180deg)',
            transformOrigin: 'bottom left',
            top: '15px',
            left: '-95px'
          }}></div>
          
          {/* Head Stone */}
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#4f46e5',
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            position: 'absolute',
            zIndex: 2
          }}></div>
        </div>
        
        {/* Body Stone (bottom) */}
        <div style={{ position: 'absolute', bottom: '20px', left: '125px' }}>
          {/* Connecting line */}
          <div style={{ 
            position: 'absolute', 
            backgroundColor: '#94a3b8', 
            height: '2px', 
            width: '115px', 
            zIndex: 0,
            transform: 'rotate(270deg)',
            transformOrigin: 'bottom left',
            top: '-95px',
            left: '15px'
          }}></div>
          
          {/* Body Stone */}
          <div style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#0ea5e9',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            position: 'absolute',
            zIndex: 2
          }}></div>
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '330px', 
        fontSize: '14px', 
        color: '#64748b' 
      }}>
        3 of 9 stones selected
      </div>
    </div>
  );
};

export default FoundationVisualization;