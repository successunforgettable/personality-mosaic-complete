import React, { useState } from 'react';

/**
 * Ultra-simplified foundation stone selection component
 * No external dependencies, using just React and inline styles
 */
const SimpleFoundation = () => {
  // Current center and selection
  const [currentTab, setCurrentTab] = useState('head');
  const [selections, setSelections] = useState({
    head: null,
    heart: null,
    body: null
  });
  
  // Stone options per center
  const stoneOptions = {
    head: [
      { name: 'Analytical', color: '#3b82f6' },
      { name: 'Thoughtful', color: '#3b82f6' },
      { name: 'Strategic', color: '#3b82f6' }
    ],
    heart: [
      { name: 'Empathetic', color: '#ef4444' },
      { name: 'Passionate', color: '#ef4444' },
      { name: 'Supportive', color: '#ef4444' }
    ],
    body: [
      { name: 'Action-oriented', color: '#10b981' },
      { name: 'Grounded', color: '#10b981' },
      { name: 'Adaptable', color: '#10b981' }
    ]
  };
  
  // Select a stone
  const handleSelectStone = (stone) => {
    setSelections({
      ...selections,
      [currentTab]: stone
    });
  };
  
  // Count selected stones
  const selectedCount = Object.values(selections).filter(Boolean).length;
  
  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif'}}>
      <h1 style={{textAlign: 'center', color: '#111827', marginBottom: '10px'}}>
        Foundation Stone Selection
      </h1>
      
      <div style={{marginBottom: '20px', textAlign: 'center'}}>
        <p style={{fontSize: '18px', marginBottom: '20px', color: '#4b5563'}}>
          Select one stone from each category to form your foundation.
        </p>
        <p>
          <strong>{selectedCount}</strong> of 3 stones selected
        </p>
      </div>
      
      {/* Tab navigation */}
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
        <button 
          onClick={() => setCurrentTab('head')}
          style={{
            padding: '8px 16px',
            backgroundColor: currentTab === 'head' ? '#3b82f6' : '#f1f5f9',
            color: currentTab === 'head' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '5px 0 0 5px',
            cursor: 'pointer',
            fontWeight: currentTab === 'head' ? 'bold' : 'normal'
          }}
        >
          Head Center
        </button>
        
        <button 
          onClick={() => setCurrentTab('heart')}
          style={{
            padding: '8px 16px',
            backgroundColor: currentTab === 'heart' ? '#ef4444' : '#f1f5f9',
            color: currentTab === 'heart' ? 'white' : '#1f2937',
            border: 'none',
            borderLeft: '1px solid #e5e7eb',
            borderRight: '1px solid #e5e7eb',
            cursor: 'pointer',
            fontWeight: currentTab === 'heart' ? 'bold' : 'normal'
          }}
        >
          Heart Center
        </button>
        
        <button 
          onClick={() => setCurrentTab('body')}
          style={{
            padding: '8px 16px',
            backgroundColor: currentTab === 'body' ? '#10b981' : '#f1f5f9',
            color: currentTab === 'body' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '0 5px 5px 0',
            cursor: 'pointer',
            fontWeight: currentTab === 'body' ? 'bold' : 'normal'
          }}
        >
          Body Center
        </button>
      </div>
      
      {/* Stone options */}
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        {stoneOptions[currentTab].map((stone, index) => {
          const isSelected = selections[currentTab]?.name === stone.name;
          
          return (
            <div
              key={index}
              onClick={() => handleSelectStone(stone)}
              style={{
                width: '130px',
                height: '130px',
                backgroundColor: isSelected ? stone.color : '#f8fafc',
                color: isSelected ? 'white' : '#334155',
                border: `2px solid ${stone.color}`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px',
                textAlign: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: isSelected ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {stone.name}
            </div>
          );
        })}
      </div>
      
      {/* Foundation visualization */}
      <div style={{
        width: '260px',
        height: '260px',
        margin: '0 auto 40px',
        borderRadius: '50%',
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        position: 'relative',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#64748b',
          fontWeight: 'bold'
        }}>
          Foundation
        </div>
        
        {/* Placed stones */}
        {Object.entries(selections).map(([center, stone], index) => {
          if (!stone) return null;
          
          // Position stones evenly around circle
          const angle = index * (2 * Math.PI / 3) - Math.PI/2;  // Start from top
          const radius = 90;  // Distance from center
          const x = 130 + radius * Math.cos(angle);
          const y = 130 + radius * Math.sin(angle);
          
          return (
            <div
              key={center}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
                backgroundColor: stone.color,
                color: 'white',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {stone.name}
            </div>
          );
        })}
      </div>
      
      {/* Complete button */}
      {selectedCount === 3 && (
        <div style={{textAlign: 'center'}}>
          <button
            onClick={() => alert('Foundation completed! Moving to next phase...')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(59,130,246,0.3)'
            }}
          >
            Complete Foundation
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleFoundation;