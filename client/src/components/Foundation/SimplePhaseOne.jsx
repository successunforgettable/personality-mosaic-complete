import React, { useState } from 'react';

/**
 * Very simplified Phase One component to help diagnose loading issues
 */
const SimplePhaseOne = () => {
  const [selectedStones, setSelectedStones] = useState([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  // Stone sets data (simplified)
  const stoneSets = [
    // Head
    [
      ["Analytical", "Observant", "Investigative"],
      ["Thoughtful", "Insightful", "Perceptive"],
      ["Strategic", "Focused", "Detail-oriented"]
    ],
    // Heart
    [
      ["Empathetic", "Compassionate", "Understanding"],
      ["Expressive", "Passionate", "Authentic"],
      ["Supportive", "Caring", "Nurturing"]
    ],
    // Body
    [
      ["Action-oriented", "Practical", "Hands-on"],
      ["Grounded", "Stable", "Reliable"],
      ["Adaptable", "Resilient", "Energetic"]
    ]
  ];

  // Flatten stone sets for easier access
  const flatStoneSets = stoneSets.flat();

  // Handle stone selection
  const selectStone = (stoneIndex) => {
    const newSelectedStones = [...selectedStones];
    newSelectedStones[currentSetIndex] = stoneIndex;
    setSelectedStones(newSelectedStones);
  };

  // Go to next set
  const goToNextSet = () => {
    if (currentSetIndex < flatStoneSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  // Go to previous set
  const goToPreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };

  // Get current stone set
  const currentStoneSet = flatStoneSets[currentSetIndex] || [];

  // Get center type name
  const getCenterType = () => {
    const centerIndex = Math.floor(currentSetIndex / 3);
    return ['Head', 'Heart', 'Body'][centerIndex] || 'Head';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Choose Your Foundation Stones
      </h2>
      
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {getCenterType()} Center
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Set {(currentSetIndex % 3) + 1} of 3
        </div>
        <div>
          {currentSetIndex + 1} of {flatStoneSets.length} stone sets selected
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
        {currentStoneSet.map((stoneText, index) => (
          <div 
            key={index}
            onClick={() => selectStone(index)}
            style={{
              padding: '15px',
              background: selectedStones[currentSetIndex] === index ? '#3b82f6' : '#e2e8f0',
              color: selectedStones[currentSetIndex] === index ? 'white' : 'black',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {stoneText}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button
          onClick={goToPreviousSet}
          disabled={currentSetIndex === 0}
          style={{
            padding: '10px 20px',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: currentSetIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentSetIndex === 0 ? 0.5 : 1
          }}
        >
          Previous Set
        </button>
        
        <button
          onClick={goToNextSet}
          disabled={currentSetIndex === flatStoneSets.length - 1}
          style={{
            padding: '10px 20px',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: currentSetIndex === flatStoneSets.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentSetIndex === flatStoneSets.length - 1 ? 0.5 : 1
          }}
        >
          Next Set
        </button>
        
        {selectedStones.filter(s => s !== undefined).length === flatStoneSets.length && (
          <button
            onClick={() => alert('Foundation phase completed!')}
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Complete Foundation
          </button>
        )}
      </div>
    </div>
  );
};

export default SimplePhaseOne;