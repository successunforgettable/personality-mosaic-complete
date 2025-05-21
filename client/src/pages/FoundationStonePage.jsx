import React, { useState } from 'react';

/**
 * Standalone foundation stone selection page with complete UI
 * 
 * This is an independent component implementing the first phase 
 * of the Personality Mosaic assessment (Foundation Stones)
 */
const FoundationStonePage = () => {
  // Current tab and selections state
  const [activeTab, setActiveTab] = useState('head');
  const [selections, setSelections] = useState({
    head: null,
    heart: null,
    body: null
  });
  
  // Stone data for each center
  const stoneOptions = {
    head: [
      { id: 1, name: 'Analytical', color: '#3b82f6' },
      { id: 2, name: 'Thoughtful', color: '#3b82f6' },
      { id: 3, name: 'Strategic', color: '#3b82f6' }
    ],
    heart: [
      { id: 4, name: 'Empathetic', color: '#ef4444' },
      { id: 5, name: 'Passionate', color: '#ef4444' },
      { id: 6, name: 'Supportive', color: '#ef4444' }
    ],
    body: [
      { id: 7, name: 'Action-oriented', color: '#10b981' },
      { id: 8, name: 'Grounded', color: '#10b981' },
      { id: 9, name: 'Adaptable', color: '#10b981' }
    ]
  };
  
  // Handle stone selection
  const selectStone = (stone) => {
    setSelections({
      ...selections,
      [activeTab]: stone
    });
  };
  
  // Count selected stones
  const selectedCount = Object.values(selections).filter(Boolean).length;
  
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '8px'
      }}>
        Foundation Stone Selection
      </h1>
      
      <p style={{
        textAlign: 'center',
        fontSize: '16px',
        color: '#6b7280',
        marginBottom: '24px'
      }}>
        Select one stone from each center to build your personality foundation
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '50px',
          display: 'flex'
        }}>
          <button
            onClick={() => setActiveTab('head')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'head' ? '#3b82f6' : 'transparent',
              color: activeTab === 'head' ? 'white' : '#4b5563',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: activeTab === 'head' ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            Head Center
          </button>
          
          <button
            onClick={() => setActiveTab('heart')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'heart' ? '#ef4444' : 'transparent',
              color: activeTab === 'heart' ? 'white' : '#4b5563',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: activeTab === 'heart' ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            Heart Center
          </button>
          
          <button
            onClick={() => setActiveTab('body')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'body' ? '#10b981' : 'transparent',
              color: activeTab === 'body' ? 'white' : '#4b5563',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: activeTab === 'body' ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            Body Center
          </button>
        </div>
      </div>
      
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        color: '#6b7280',
        fontWeight: 'bold'
      }}>
        <span style={{color: '#111827'}}>{selectedCount}</span> of 3 stones selected
      </div>
      
      {/* Stone selection grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {stoneOptions[activeTab].map(stone => {
          const isSelected = selections[activeTab]?.id === stone.id;
          
          return (
            <div
              key={stone.id}
              onClick={() => selectStone(stone)}
              style={{
                backgroundColor: isSelected ? stone.color : '#f9fafb',
                color: isSelected ? 'white' : '#374151',
                border: `2px solid ${isSelected ? stone.color : '#e5e7eb'}`,
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isSelected ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '8px'
              }}>
                {stone.name}
              </div>
              <div style={{fontSize: '14px'}}>
                {activeTab === 'head' ? 'Thinking and analysis' : 
                 activeTab === 'heart' ? 'Feeling and connection' : 
                 'Action and instinct'}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Foundation visualization */}
      <div style={{
        width: '300px',
        height: '300px',
        margin: '0 auto 40px',
        borderRadius: '50%',
        backgroundColor: '#f9fafb',
        border: '2px solid #e5e7eb',
        position: 'relative',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          color: '#9ca3af'
        }}>
          Foundation
        </div>
        
        {/* Placed stones */}
        {Object.entries(selections).map(([center, stone], index, array) => {
          if (!stone) return null;
          
          // Calculate position in a circle
          const angle = (index / array.filter(([_, s]) => s).length) * 2 * Math.PI - Math.PI/6;
          const radius = 100;
          const x = 150 + radius * Math.cos(angle);
          const y = 150 + radius * Math.sin(angle);
          
          return (
            <div
              key={stone.id}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
                backgroundColor: stone.color,
                color: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px',
                fontSize: '14px',
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
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <button
          onClick={() => {
            if (selectedCount === 3) {
              alert('Foundation completed! Ready for next phase.');
            }
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: selectedCount === 3 ? '#3b82f6' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: selectedCount === 3 ? 'pointer' : 'not-allowed',
            opacity: selectedCount === 3 ? '1' : '0.7',
            boxShadow: selectedCount === 3 ? '0 2px 4px rgba(59,130,246,0.3)' : 'none'
          }}
          disabled={selectedCount < 3}
        >
          Complete Foundation
        </button>
      </div>
    </div>
  );
};

export default FoundationStonePage;