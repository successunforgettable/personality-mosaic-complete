import React, { useState } from 'react';

/**
 * SimpleFoundation - A reliable foundation stone selection component
 * Built with minimal dependencies and basic styling for maximum reliability
 */
const SimpleFoundation = ({ onComplete }) => {
  // Stone sets for all three centers
  const STONE_DATA = {
    head: [
      ['Analytical', 'Observant', 'Investigative'],
      ['Thoughtful', 'Insightful', 'Perceptive'],
      ['Strategic', 'Focused', 'Detail-oriented']
    ],
    heart: [
      ['Empathetic', 'Compassionate', 'Understanding'],
      ['Expressive', 'Passionate', 'Authentic'],
      ['Supportive', 'Caring', 'Nurturing']
    ],
    body: [
      ['Action-oriented', 'Practical', 'Hands-on'],
      ['Grounded', 'Stable', 'Reliable'],
      ['Adaptable', 'Resilient', 'Energetic']
    ]
  };

  // Colors for each center
  const COLORS = {
    head: {
      light: '#dbeafe', // light blue
      dark: '#3b82f6',  // blue
      text: '#1e40af'   // dark blue
    },
    heart: {
      light: '#fee2e2', // light red
      dark: '#ef4444',  // red
      text: '#b91c1c'   // dark red
    },
    body: {
      light: '#d1fae5', // light green
      dark: '#10b981',  // green
      text: '#065f46'   // dark green
    }
  };

  // States
  const [currentCenter, setCurrentCenter] = useState('head');
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedStones, setSelectedStones] = useState({
    head: [null, null, null],
    heart: [null, null, null],
    body: [null, null, null]
  });

  // Get total number of selections made
  const getSelectionCount = () => {
    let count = 0;
    Object.values(selectedStones).forEach(centerSelections => {
      centerSelections.forEach(selection => {
        if (selection !== null) count++;
      });
    });
    return count;
  };

  // Get current stone set
  const getCurrentSet = () => {
    return STONE_DATA[currentCenter][currentSetIndex];
  };

  // Check if all stones are selected
  const isComplete = () => {
    return getSelectionCount() === 9;
  };

  // Handle stone selection
  const handleStoneSelect = (stoneIndex) => {
    setSelectedStones(prev => ({
      ...prev,
      [currentCenter]: [
        ...prev[currentCenter].slice(0, currentSetIndex),
        stoneIndex,
        ...prev[currentCenter].slice(currentSetIndex + 1)
      ]
    }));
  };

  // Navigation functions
  const goToPreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    } else if (currentCenter === 'heart') {
      setCurrentCenter('head');
      setCurrentSetIndex(2);
    } else if (currentCenter === 'body') {
      setCurrentCenter('heart');
      setCurrentSetIndex(2);
    }
  };

  const goToNextSet = () => {
    if (currentSetIndex < 2) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else if (currentCenter === 'head') {
      setCurrentCenter('heart');
      setCurrentSetIndex(0);
    } else if (currentCenter === 'heart') {
      setCurrentCenter('body');
      setCurrentSetIndex(0);
    }
  };

  // Handle completion
  const handleComplete = () => {
    // Flatten selections for easier processing
    const flattenedSelections = [
      ...selectedStones.head,
      ...selectedStones.heart,
      ...selectedStones.body
    ];
    
    if (onComplete) {
      onComplete(flattenedSelections);
    }
  };

  // Render foundation visualization
  const renderFoundation = () => {
    const foundationStones = [];
    
    // Collect all selected stones for visualization
    Object.entries(selectedStones).forEach(([center, selections]) => {
      selections.forEach((stoneIndex, setIndex) => {
        if (stoneIndex !== null) {
          foundationStones.push({
            center,
            setIndex,
            stoneIndex,
            stoneName: STONE_DATA[center][setIndex][stoneIndex]
          });
        }
      });
    });

    return (
      <div style={{
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        margin: '0 auto 30px',
        position: 'relative',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Foundation label */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#64748b'
        }}>
          Foundation
        </div>

        {/* Placed stones */}
        {foundationStones.map((stone, index) => {
          // Calculate position on circle (9 positions total)
          const stonePosition = 
            (stone.center === 'head' ? 0 : (stone.center === 'heart' ? 3 : 6)) + 
            stone.setIndex;
          
          const angle = (stonePosition / 9) * 2 * Math.PI - Math.PI/2; // Start at top
          const radius = 120; // Distance from center
          
          const x = 160 + radius * Math.cos(angle);
          const y = 160 + radius * Math.sin(angle);

          return (
            <div 
              key={index}
              style={{
                position: 'absolute',
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                backgroundColor: COLORS[stone.center].dark,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                padding: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {stone.stoneName}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#1e293b'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        fontSize: '28px',
        color: '#0f172a'
      }}>
        Personality Mosaic Assessment
      </h1>
      
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        fontSize: '24px',
        color: '#334155'
      }}>
        Choose Your Foundation Stones
      </h2>
      
      {/* Center info and progress */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          fontSize: '20px',
          color: COLORS[currentCenter].text,
          margin: '0 0 8px 0'
        }}>
          {currentCenter.charAt(0).toUpperCase() + currentCenter.slice(1)} Center
        </h3>
        <p style={{ margin: '0 0 5px 0', color: '#64748b' }}>
          Set {currentSetIndex + 1} of 3
        </p>
        <p style={{ fontWeight: 'bold', color: '#334155' }}>
          {getSelectionCount()} of 9 stone sets selected
        </p>
      </div>
      
      {/* Foundation visualization */}
      {renderFoundation()}
      
      {/* Stone selection area */}
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          flexWrap: 'wrap' 
        }}>
          {getCurrentSet().map((stone, index) => {
            const isSelected = selectedStones[currentCenter][currentSetIndex] === index;
            
            return (
              <button
                key={index}
                onClick={() => handleStoneSelect(index)}
                style={{
                  width: '160px',
                  height: '160px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isSelected ? COLORS[currentCenter].dark : COLORS[currentCenter].light,
                  color: isSelected ? 'white' : COLORS[currentCenter].text,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  margin: '5px',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isSelected ? '0 4px 8px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                {stone}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Navigation controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px',
        marginTop: '20px'
      }}>
        <button
          onClick={goToPreviousSet}
          disabled={currentCenter === 'head' && currentSetIndex === 0}
          style={{
            padding: '12px 24px',
            backgroundColor: (currentCenter === 'head' && currentSetIndex === 0) 
              ? '#e2e8f0' 
              : '#f1f5f9',
            color: (currentCenter === 'head' && currentSetIndex === 0) 
              ? '#94a3b8' 
              : '#334155',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            cursor: (currentCenter === 'head' && currentSetIndex === 0) 
              ? 'not-allowed' 
              : 'pointer',
            fontWeight: '500',
            fontSize: '16px'
          }}
        >
          Previous Set
        </button>
        
        <button
          onClick={goToNextSet}
          disabled={currentCenter === 'body' && currentSetIndex === 2}
          style={{
            padding: '12px 24px',
            backgroundColor: (currentCenter === 'body' && currentSetIndex === 2) 
              ? '#e2e8f0' 
              : '#f1f5f9',
            color: (currentCenter === 'body' && currentSetIndex === 2) 
              ? '#94a3b8' 
              : '#334155',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            cursor: (currentCenter === 'body' && currentSetIndex === 2) 
              ? 'not-allowed' 
              : 'pointer',
            fontWeight: '500',
            fontSize: '16px'
          }}
        >
          Next Set
        </button>
        
        {isComplete() && (
          <button
            onClick={handleComplete}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
            }}
          >
            Complete Foundation
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleFoundation;