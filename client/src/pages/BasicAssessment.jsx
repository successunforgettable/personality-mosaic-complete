import React, { useState } from 'react';

const STONE_SETS = [
  // Head Center (Sets 0-2)
  [
    ["Analytical", "Observant", "Investigative"],
    ["Thoughtful", "Insightful", "Perceptive"],
    ["Strategic", "Focused", "Detail-oriented"]
  ],
  
  // Heart Center (Sets 3-5)
  [
    ["Empathetic", "Compassionate", "Understanding"],
    ["Expressive", "Passionate", "Authentic"],
    ["Supportive", "Caring", "Nurturing"]
  ],
  
  // Body Center (Sets 6-8)
  [
    ["Action-oriented", "Practical", "Hands-on"],
    ["Grounded", "Stable", "Reliable"],
    ["Adaptable", "Resilient", "Energetic"]
  ]
];

const BasicAssessment = () => {
  // Flatten the stone sets for easier access
  const flatStoneSets = STONE_SETS.flat();
  
  // Current set index
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // Selected stones
  const [selectedStones, setSelectedStones] = useState(Array(flatStoneSets.length).fill(null));
  
  // Current set of stones
  const currentStoneSet = flatStoneSets[currentSetIndex] || [];
  
  // Handle stone selection
  const handleSelectStone = (stoneIndex) => {
    const newSelectedStones = [...selectedStones];
    newSelectedStones[currentSetIndex] = stoneIndex;
    setSelectedStones(newSelectedStones);
  };
  
  // Go to next set
  const handleNextSet = () => {
    if (currentSetIndex < flatStoneSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };
  
  // Go to previous set
  const handlePreviousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };
  
  // Complete the foundation phase
  const handleComplete = () => {
    alert('Foundation phase completed! Selected stones: ' + 
          selectedStones.map((stoneIndex, setIndex) => 
            flatStoneSets[setIndex][stoneIndex]).join(', '));
  };
  
  // Get center type and set number
  const getCenterType = () => {
    const centerIndex = Math.floor(currentSetIndex / 3);
    return ['Head', 'Heart', 'Body'][centerIndex];
  };
  
  const getSetNumber = () => {
    return (currentSetIndex % 3) + 1;
  };
  
  // Count selected stones
  const selectedCount = selectedStones.filter(stone => stone !== null).length;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Personality Mosaic Assessment</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Choose Your Foundation Stones</h2>
        
        <div className="text-center mb-6">
          <div className="text-xl font-medium">{getCenterType()} Center</div>
          <div className="text-sm text-gray-500">Set {getSetNumber()} of 3</div>
          <div className="mt-2">{selectedCount} of {flatStoneSets.length} stone sets selected</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {currentStoneSet.map((traits, index) => (
            <div 
              key={index}
              onClick={() => handleSelectStone(index)}
              className={`p-4 rounded-lg cursor-pointer text-center transition-all ${
                selectedStones[currentSetIndex] === index 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium mb-1">{traits[0]}</div>
              <div className="text-sm">{traits.slice(1).join(', ')}</div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePreviousSet}
            disabled={currentSetIndex === 0}
            className={`px-4 py-2 rounded ${
              currentSetIndex === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Previous Set
          </button>
          
          <button
            onClick={handleNextSet}
            disabled={currentSetIndex === flatStoneSets.length - 1}
            className={`px-4 py-2 rounded ${
              currentSetIndex === flatStoneSets.length - 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Next Set
          </button>
          
          {selectedCount === flatStoneSets.length && (
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Complete Foundation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicAssessment;