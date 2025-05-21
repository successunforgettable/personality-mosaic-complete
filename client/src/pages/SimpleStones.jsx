import React, { useState } from 'react';

/**
 * Very simple stone selection experience with no external dependencies
 */
const SimpleStones = () => {
  // Current stone set index (0-8)
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // Selected stones for each set
  const [selections, setSelections] = useState(Array(9).fill(null));
  
  // Data for all stone sets
  const stoneSets = [
    // Head Center (Sets 0-2)
    ["Analytical", "Thoughtful", "Strategic"],
    ["Observant", "Insightful", "Focused"],
    ["Investigative", "Perceptive", "Detail-oriented"],
    
    // Heart Center (Sets 3-5)
    ["Empathetic", "Expressive", "Supportive"],
    ["Compassionate", "Passionate", "Caring"],
    ["Understanding", "Authentic", "Nurturing"],
    
    // Body Center (Sets 6-8)
    ["Action-oriented", "Grounded", "Adaptable"],
    ["Practical", "Stable", "Resilient"],
    ["Hands-on", "Reliable", "Energetic"]
  ];
  
  // Colors for each center
  const centerColors = {
    head: {
      bg: '#dbeafe', // Blue-100
      selected: '#3b82f6', // Blue-500
      text: '#1e40af' // Blue-800
    },
    heart: {
      bg: '#fee2e2', // Red-100
      selected: '#ef4444', // Red-500
      text: '#b91c1c' // Red-700
    },
    body: {
      bg: '#d1fae5', // Green-100
      selected: '#10b981', // Green-500
      text: '#065f46' // Green-800
    }
  };
  
  // Get center name based on set index
  const getCenterName = (index) => {
    if (index < 3) return 'head';
    if (index < 6) return 'heart';
    return 'body';
  };
  
  // Get display name for center
  const getCenterDisplayName = (index) => {
    if (index < 3) return 'Head';
    if (index < 6) return 'Heart';
    return 'Body';
  };
  
  // Handle stone selection
  const selectStone = (stoneIndex) => {
    const newSelections = [...selections];
    newSelections[currentSetIndex] = stoneIndex;
    setSelections(newSelections);
  };
  
  // Navigate to next set
  const goToNextSet = () => {
    if (currentSetIndex < stoneSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };
  
  // Navigate to previous set
  const goToPreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };
  
  // Complete the assessment
  const completeFoundation = () => {
    alert('Selections completed: ' + selections.join(', '));
    // Would navigate to next phase in a real implementation
  };
  
  // Current center for styling
  const currentCenter = getCenterName(currentSetIndex);
  const colors = centerColors[currentCenter];
  
  // Count completed selections
  const completedCount = selections.filter(s => s !== null).length;
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Choose Your Foundation Stones</h1>
      
      {/* Current set info */}
      <div style={{ textAlign: 'center', marginBottom: '20px', color: colors.text }}>
        <h2>{getCenterDisplayName(currentSetIndex)} Center</h2>
        <p>Set {(currentSetIndex % 3) + 1} of 3</p>
        <p>{currentSetIndex + 1} of 9 stone sets selected</p>
      </div>
      
      {/* Stones */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
        {stoneSets[currentSetIndex].map((stoneName, index) => (
          <div 
            key={index}
            onClick={() => selectStone(index)}
            style={{
              width: '150px',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: selections[currentSetIndex] === index ? colors.selected : colors.bg,
              color: selections[currentSetIndex] === index ? 'white' : colors.text,
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            {stoneName}
          </div>
        ))}
      </div>
      
      {/* Foundation visualization */}
      <div style={{ 
        width: '200px', 
        height: '200px', 
        borderRadius: '50%', 
        background: '#f8fafc',
        margin: '0 auto 30px',
        position: 'relative',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#475569'
        }}>
          Foundation
        </div>
        
        {/* Display dots for selected stones */}
        {selections.map((selection, index) => {
          if (selection === null) return null;
          
          // Calculate position on circle
          const angle = (index / 9) * 2 * Math.PI;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          
          // Get color based on center
          const centerName = getCenterName(index);
          const dotColor = centerColors[centerName].selected;
          
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: dotColor,
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </div>
      
      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={goToPreviousSet}
          disabled={currentSetIndex === 0}
          style={{
            padding: '10px 20px',
            background: currentSetIndex === 0 ? '#e2e8f0' : '#f1f5f9',
            color: currentSetIndex === 0 ? '#94a3b8' : '#475569',
            border: '1px solid #e2e8f0',
            borderRadius: '5px',
            cursor: currentSetIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous Set
        </button>
        
        <button
          onClick={goToNextSet}
          disabled={currentSetIndex === stoneSets.length - 1}
          style={{
            padding: '10px 20px',
            background: currentSetIndex === stoneSets.length - 1 ? '#e2e8f0' : '#f1f5f9',
            color: currentSetIndex === stoneSets.length - 1 ? '#94a3b8' : '#475569',
            border: '1px solid #e2e8f0',
            borderRadius: '5px',
            cursor: currentSetIndex === stoneSets.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Next Set
        </button>
        
        {/* Complete button only appears when all sets are selected */}
        {completedCount === stoneSets.length && (
          <button
            onClick={completeFoundation}
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
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

export default SimpleStones;