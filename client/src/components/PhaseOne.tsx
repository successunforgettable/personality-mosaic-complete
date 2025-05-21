import React, { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';

/**
 * Direct implementation of the Foundation Stone Experience
 * Phase 1 of the Personality Mosaic Assessment
 * 
 * Implementation based on tech_spec_v2.md - Section 3.2 and content_spec.md - Section 1.1
 */
const PhaseOne = () => {
  const { setPhase } = useAssessment();
  
  // Stone sets by center type
  const stoneSets = [
    // Head stones (blue)
    { name: "Analytical", category: "head" },
    { name: "Observant", category: "head" },
    { name: "Investigative", category: "head" },
    { name: "Thoughtful", category: "head" },
    { name: "Insightful", category: "head" },
    { name: "Perceptive", category: "head" },
    { name: "Strategic", category: "head" },
    { name: "Focused", category: "head" },
    { name: "Detail-oriented", category: "head" },
    
    // Heart stones (red)
    { name: "Empathetic", category: "heart" },
    { name: "Compassionate", category: "heart" },
    { name: "Understanding", category: "heart" },
    { name: "Expressive", category: "heart" },
    { name: "Passionate", category: "heart" },
    { name: "Authentic", category: "heart" },
    { name: "Supportive", category: "heart" },
    { name: "Caring", category: "heart" },
    { name: "Nurturing", category: "heart" },
    
    // Body stones (green)
    { name: "Action-oriented", category: "body" },
    { name: "Practical", category: "body" },
    { name: "Hands-on", category: "body" },
    { name: "Grounded", category: "body" },
    { name: "Stable", category: "body" },
    { name: "Reliable", category: "body" },
    { name: "Adaptable", category: "body" },
    { name: "Resilient", category: "body" },
    { name: "Energetic", category: "body" }
  ];
  
  // Current set index (0-8)
  const [currentSet, setCurrentSet] = useState(0);
  
  // Selected stones (array of indices, 0-26)
  const [selections, setSelections] = useState(Array(9).fill(-1));
  
  // Current stone set (3 stones)
  const getCurrentSet = () => {
    // Each set has 3 stones
    const startIndex = currentSet * 3;
    return [
      stoneSets[startIndex],
      stoneSets[startIndex + 1],
      stoneSets[startIndex + 2]
    ];
  };
  
  // Get current center name
  const getCurrentCenter = () => {
    if (currentSet < 3) return "Head";
    if (currentSet < 6) return "Heart";
    return "Body";
  };
  
  // Select a stone
  const selectStone = (index) => {
    const newSelections = [...selections];
    newSelections[currentSet] = currentSet * 3 + index;
    setSelections(newSelections);
  };
  
  // Navigation functions
  const prevSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
    }
  };
  
  const nextSet = () => {
    if (currentSet < 8) {
      setCurrentSet(currentSet + 1);
    }
  };
  
  // Complete foundation
  const completeFoundation = () => {
    setPhase(2);
  };
  
  // Check if all stones selected
  const isComplete = () => {
    return selections.every(s => s >= 0);
  };
  
  // Get background color for stone
  const getStoneColor = (category, isSelected) => {
    if (category === "head") {
      return isSelected ? "#3b82f6" : "#dbeafe";
    } else if (category === "heart") {
      return isSelected ? "#ef4444" : "#fee2e2";
    } else {
      return isSelected ? "#10b981" : "#d1fae5";
    }
  };
  
  // Get text color
  const getTextColor = (isSelected) => {
    return isSelected ? "white" : "#1e293b";
  };
  
  // Get selected stone count
  const getSelectedCount = () => {
    return selections.filter(s => s >= 0).length;
  };
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#1e293b" }}>
        Personality Mosaic Assessment
      </h1>
      
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#334155" }}>
        Choose Your Foundation Stones
      </h2>
      
      {/* Center info and progress */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
          {getCurrentCenter()} Center
        </h3>
        <p>Set {(currentSet % 3) + 1} of 3</p>
        <p>{getSelectedCount()} of 9 stones selected</p>
      </div>
      
      {/* Stone selection area */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px", 
        marginBottom: "30px",
        flexWrap: "wrap" 
      }}>
        {getCurrentSet().map((stone, index) => {
          const stoneIndex = currentSet * 3 + index;
          const isSelected = selections[currentSet] === stoneIndex;
          
          return (
            <div
              key={index}
              onClick={() => selectStone(index)}
              style={{
                width: "160px",
                height: "160px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: getStoneColor(stone.category, isSelected),
                color: getTextColor(isSelected),
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                margin: "10px",
                transition: "all 0.2s ease",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
              }}
            >
              {stone.name}
            </div>
          );
        })}
      </div>
      
      {/* Foundation visualization */}
      <div style={{ 
        width: "300px", 
        height: "300px", 
        borderRadius: "50%", 
        backgroundColor: "#f8fafc", 
        border: "2px solid #e2e8f0",
        position: "relative",
        margin: "0 auto 40px"
      }}>
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          fontSize: "18px",
          fontWeight: "bold",
          color: "#64748b"
        }}>
          Foundation
        </div>
        
        {selections.map((stoneIndex, setIndex) => {
          if (stoneIndex < 0) return null;
          
          const stone = stoneSets[stoneIndex];
          const angle = (setIndex / 9) * 2 * Math.PI - Math.PI/2; // Start at top
          const radius = 120;
          const x = 150 + radius * Math.cos(angle);
          const y = 150 + radius * Math.sin(angle);
          
          // Determine color based on category
          let color;
          if (stone.category === "head") color = "#3b82f6";
          else if (stone.category === "heart") color = "#ef4444";
          else color = "#10b981";
          
          return (
            <div
              key={setIndex}
              style={{
                position: "absolute",
                width: "60px",
                height: "60px",
                backgroundColor: color,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: "bold",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                borderRadius: "5px",
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
              }}
            >
              {stone.name}
            </div>
          );
        })}
      </div>
      
      {/* Navigation controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={prevSet}
          disabled={currentSet === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: currentSet === 0 ? "#e2e8f0" : "#f1f5f9",
            color: currentSet === 0 ? "#94a3b8" : "#334155",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            cursor: currentSet === 0 ? "not-allowed" : "pointer"
          }}
        >
          Previous Set
        </button>
        
        <button
          onClick={nextSet}
          disabled={currentSet === 8}
          style={{
            padding: "10px 20px",
            backgroundColor: currentSet === 8 ? "#e2e8f0" : "#f1f5f9",
            color: currentSet === 8 ? "#94a3b8" : "#334155",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            cursor: currentSet === 8 ? "not-allowed" : "pointer"
          }}
        >
          Next Set
        </button>
        
        {isComplete() && (
          <button
            onClick={completeFoundation}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Complete Foundation
          </button>
        )}
      </div>
    </div>
  );
};

export default PhaseOne;