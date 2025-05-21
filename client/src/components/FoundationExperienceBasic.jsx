import React, { useState } from 'react';

/**
 * Extremely simplified foundation stone experience
 * No dependencies, no complex animations - just the core functionality
 */
const FoundationExperienceBasic = () => {
  // Current stone set
  const [currentSet, setCurrentSet] = useState(0);
  
  // Selected stones (array of indices, one for each set)
  const [selected, setSelected] = useState(Array(9).fill(null));
  
  // All stone sets - 9 sets with 3 stones each
  const stones = [
    // Head Center
    ['Analytical', 'Observant', 'Investigative'],
    ['Thoughtful', 'Insightful', 'Perceptive'],
    ['Strategic', 'Focused', 'Detail-oriented'],
    
    // Heart Center
    ['Empathetic', 'Compassionate', 'Understanding'],
    ['Expressive', 'Passionate', 'Authentic'],
    ['Supportive', 'Caring', 'Nurturing'],
    
    // Body Center
    ['Action-oriented', 'Practical', 'Hands-on'],
    ['Grounded', 'Stable', 'Reliable'],
    ['Adaptable', 'Resilient', 'Energetic']
  ];
  
  // Get the current center type
  const getCurrentCenter = () => {
    if (currentSet < 3) return 'head';
    if (currentSet < 6) return 'heart';
    return 'body';
  };
  
  // Get center display name
  const getCenterName = () => {
    const center = getCurrentCenter();
    return center.charAt(0).toUpperCase() + center.slice(1);
  };
  
  // Get background color for stone
  const getStoneColor = (index, isSelected) => {
    const center = getCurrentCenter();
    
    if (center === 'head') {
      return isSelected ? '#3b82f6' : '#dbeafe';
    } else if (center === 'heart') {
      return isSelected ? '#ef4444' : '#fee2e2';
    } else {
      return isSelected ? '#10b981' : '#d1fae5';
    }
  };
  
  // Get text color for stone
  const getStoneTextColor = (isSelected) => {
    return isSelected ? 'white' : '#1e293b';
  };
  
  // Handle stone selection
  const selectStone = (index) => {
    const newSelected = [...selected];
    newSelected[currentSet] = index;
    setSelected(newSelected);
  };
  
  // Navigation functions
  const prevSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
    }
  };
  
  const nextSet = () => {
    if (currentSet < stones.length - 1) {
      setCurrentSet(currentSet + 1);
    }
  };
  
  // Check if all stones are selected
  const isComplete = () => {
    return selected.every(s => s !== null);
  };
  
  // Foundation visualizer - renders dots for selected stones
  const renderFoundation = () => {
    return (
      <div style={{ 
        width: '250px', 
        height: '250px', 
        borderRadius: '50%', 
        backgroundColor: '#f9fafb', 
        border: '1px solid #e5e7eb',
        position: 'relative',
        margin: '0 auto 20px'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#4b5563'
        }}>
          Foundation
        </div>
        
        {selected.map((stoneIndex, setIndex) => {
          if (stoneIndex === null) return null;
          
          // Calculate position on circle
          const angle = (setIndex / 9) * 2 * Math.PI;
          const radius = 100; // Circle radius in pixels
          const x = 125 + radius * Math.cos(angle); // 125 is center x
          const y = 125 + radius * Math.sin(angle); // 125 is center y
          
          // Determine color based on center
          let color;
          if (setIndex < 3) color = '#3b82f6'; // Head - blue
          else if (setIndex < 6) color = '#ef4444'; // Heart - red
          else color = '#10b981'; // Body - green
          
          return (
            <div 
              key={setIndex}
              style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: color,
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Personality Mosaic Assessment
      </h1>
      
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Choose Your Foundation Stones
      </h2>
      
      {/* Center and set info */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3>{getCenterName()} Center</h3>
        <p>Set {(currentSet % 3) + 1} of 3</p>
        <p>{selected.filter(s => s !== null).length} of 9 stone sets selected</p>
      </div>
      
      {/* Foundation visualization */}
      {renderFoundation()}
      
      {/* Stone selection area */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        marginBottom: '30px',
        flexWrap: 'wrap' 
      }}>
        {stones[currentSet].map((stone, index) => (
          <button
            key={index}
            onClick={() => selectStone(index)}
            style={{
              width: '150px',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: getStoneColor(index, selected[currentSet] === index),
              color: getStoneTextColor(selected[currentSet] === index),
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              margin: '10px',
              transition: 'transform 0.2s',
              transform: selected[currentSet] === index ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {stone}
          </button>
        ))}
      </div>
      
      {/* Navigation controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={prevSet}
          disabled={currentSet === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: currentSet === 0 ? '#e5e7eb' : '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: currentSet === 0 ? 'not-allowed' : 'pointer',
            color: currentSet === 0 ? '#9ca3af' : '#4b5563'
          }}
        >
          Previous Set
        </button>
        
        <button
          onClick={nextSet}
          disabled={currentSet === stones.length - 1}
          style={{
            padding: '10px 20px',
            backgroundColor: currentSet === stones.length - 1 ? '#e5e7eb' : '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: currentSet === stones.length - 1 ? 'not-allowed' : 'pointer',
            color: currentSet === stones.length - 1 ? '#9ca3af' : '#4b5563'
          }}
        >
          Next Set
        </button>
        
        {isComplete() && (
          <button
            onClick={() => alert('Selection complete! Moving to next phase...')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Complete Foundation
          </button>
        )}
      </div>
    </div>
  );
};

export default FoundationExperienceBasic;