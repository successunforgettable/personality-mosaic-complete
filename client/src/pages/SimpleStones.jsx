import React, { useState } from 'react';

/**
 * Super simple foundation stones implementation
 * Minimal dependencies, pure React
 */
function SimpleStones() {
  // State for current tab and selections
  const [tab, setTab] = useState('head');
  const [selections, setSelections] = useState({
    head: null,
    heart: null,
    body: null
  });

  // Stone options by center
  const stones = {
    head: ['Analytical', 'Thoughtful', 'Strategic'],
    heart: ['Empathetic', 'Passionate', 'Supportive'],
    body: ['Action-oriented', 'Grounded', 'Adaptable']
  };

  // Get color for center
  function getColor(center) {
    if (center === 'head') return '#3b82f6';
    if (center === 'heart') return '#ef4444';
    return '#10b981';
  }

  // Handle stone selection
  function handleSelect(stone) {
    setSelections({
      ...selections,
      [tab]: stone
    });
  }

  // Count total selections
  const selectionCount = Object.values(selections).filter(Boolean).length;

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
      <h1 style={{textAlign: 'center', marginBottom: '20px'}}>
        Foundation Stone Selection
      </h1>
      
      <div style={{textAlign: 'center', marginBottom: '20px'}}>
        <p>{selectionCount} of 3 stones selected</p>
      </div>
      
      {/* Tab Navigation */}
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '30px'}}>
        <button 
          onClick={() => setTab('head')}
          style={{
            padding: '10px 20px',
            background: tab === 'head' ? getColor('head') : '#f3f4f6',
            color: tab === 'head' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '8px 0 0 8px',
            cursor: 'pointer'
          }}
        >
          Head Center
        </button>
        
        <button 
          onClick={() => setTab('heart')}
          style={{
            padding: '10px 20px',
            background: tab === 'heart' ? getColor('heart') : '#f3f4f6',
            color: tab === 'heart' ? 'white' : '#1f2937',
            border: 'none',
            borderLeft: '1px solid #e5e7eb',
            borderRight: '1px solid #e5e7eb',
            cursor: 'pointer'
          }}
        >
          Heart Center
        </button>
        
        <button 
          onClick={() => setTab('body')}
          style={{
            padding: '10px 20px',
            background: tab === 'body' ? getColor('body') : '#f3f4f6',
            color: tab === 'body' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer'
          }}
        >
          Body Center
        </button>
      </div>
      
      {/* Stone Selection */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {stones[tab].map(stone => {
          const isSelected = selections[tab] === stone;
          
          return (
            <div
              key={stone}
              onClick={() => handleSelect(stone)}
              style={{
                width: '150px',
                height: '150px',
                backgroundColor: isSelected ? getColor(tab) : '#f9fafb',
                color: isSelected ? 'white' : '#1f2937',
                border: `2px solid ${isSelected ? getColor(tab) : '#e5e7eb'}`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {stone}
            </div>
          );
        })}
      </div>
      
      {/* Foundation Visualization */}
      <div style={{
        width: '300px',
        height: '300px',
        margin: '0 auto 40px',
        position: 'relative',
        borderRadius: '50%',
        backgroundColor: '#f9fafb',
        border: '2px solid #e5e7eb'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#6b7280',
          fontWeight: 'bold'
        }}>
          Foundation
        </div>
        
        {Object.entries(selections).map(([center, stone], index) => {
          if (!stone) return null;
          
          // Position stones evenly in a circle
          const angle = index * (2 * Math.PI / 3);
          const x = 150 + 100 * Math.cos(angle);
          const y = 150 + 100 * Math.sin(angle);
          
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
                backgroundColor: getColor(center),
                color: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                padding: '5px',
                textAlign: 'center'
              }}
            >
              {stone}
            </div>
          );
        })}
      </div>
      
      {/* Complete Button */}
      {selectionCount === 3 && (
        <div style={{textAlign: 'center'}}>
          <button
            onClick={() => alert('Foundation completed!')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Complete Foundation
          </button>
        </div>
      )}
    </div>
  );
}

export default SimpleStones;