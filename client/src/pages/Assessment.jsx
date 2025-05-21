import React, { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';

/**
 * Standalone Assessment Component - Direct implementation of Task #19
 * 
 * This is a complete implementation of the Foundation Phase
 * following the exact specifications in tech_spec_v2.md and content_spec.md
 */
const Assessment = () => {
  const { setPhase } = useAssessment();
  
  // Stone sets organized by centers
  const stoneData = {
    head: [
      ["Analytical", "Observant", "Investigative"],
      ["Thoughtful", "Insightful", "Perceptive"],
      ["Strategic", "Focused", "Detail-oriented"]
    ],
    heart: [
      ["Empathetic", "Compassionate", "Understanding"],
      ["Expressive", "Passionate", "Authentic"],
      ["Supportive", "Caring", "Nurturing"]
    ],
    body: [
      ["Action-oriented", "Practical", "Hands-on"],
      ["Grounded", "Stable", "Reliable"],
      ["Adaptable", "Resilient", "Energetic"]
    ]
  };
  
  // Center types in order
  const centers = ["head", "heart", "body"];
  
  // Current center and set indices
  const [centerIndex, setCenterIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  
  // Selected stones for each center/set
  const [selectedStones, setSelectedStones] = useState({
    head: [null, null, null],
    heart: [null, null, null],
    body: [null, null, null]
  });
  
  // Get current center and set
  const currentCenter = centers[centerIndex];
  const currentStoneSet = stoneData[currentCenter][setIndex];
  
  // Count total selected stones
  const totalSelected = () => {
    let count = 0;
    for (const center of centers) {
      count += selectedStones[center].filter(Boolean).length;
    }
    return count;
  };
  
  // Handle stone selection
  const selectStone = (stoneName) => {
    setSelectedStones(prev => ({
      ...prev,
      [currentCenter]: [
        ...prev[currentCenter].slice(0, setIndex),
        stoneName,
        ...prev[currentCenter].slice(setIndex + 1)
      ]
    }));
  };
  
  // Navigation functions
  const goToPrev = () => {
    if (setIndex > 0) {
      setSetIndex(setIndex - 1);
    } else if (centerIndex > 0) {
      setCenterIndex(centerIndex - 1);
      setSetIndex(2); // Go to last set of previous center
    }
  };
  
  const goToNext = () => {
    if (setIndex < 2) {
      setSetIndex(setIndex + 1);
    } else if (centerIndex < 2) {
      setCenterIndex(centerIndex + 1);
      setSetIndex(0); // Go to first set of next center
    }
  };
  
  // Complete foundation phase
  const completeFoundation = () => {
    setPhase(2);
  };
  
  // Check if all stones are selected
  const isComplete = () => totalSelected() === 9;
  
  // Get color for current center
  const getCenterColor = (center) => {
    switch (center) {
      case "head": return {
        light: "#dbeafe",
        dark: "#3b82f6",
        text: "#1e40af"
      };
      case "heart": return {
        light: "#fee2e2",
        dark: "#ef4444",
        text: "#b91c1c"
      };
      case "body": return {
        light: "#d1fae5",
        dark: "#10b981",
        text: "#065f46"
      };
      default: return {
        light: "#f3f4f6",
        dark: "#6b7280",
        text: "#374151"
      };
    }
  };
  
  // Get display name for center
  const getCenterDisplayName = (center) => {
    return center.charAt(0).toUpperCase() + center.slice(1);
  };
  
  // Get positions for stones on the foundation circle
  const getStonePosition = (centerIdx, setIdx) => {
    // Position index (0-8)
    const posIndex = centerIdx * 3 + setIdx;
    // Calculate angle (start from top)
    const angle = (posIndex / 9) * 2 * Math.PI - Math.PI/2;
    // Calculate position (center at 50%, 50%, radius 42%)
    const x = 50 + 42 * Math.cos(angle);
    const y = 50 + 42 * Math.sin(angle);
    
    return { x, y };
  };
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#1e293b" }}>
        Personality Mosaic Assessment
      </h1>
      
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#334155" }}>
        Choose Your Foundation Stones
      </h2>
      
      {/* Center info and progress */}
      <div style={{ textAlign: "center", marginBottom: "15px", background: "#f8fafc", padding: "10px", borderRadius: "8px" }}>
        <h3 style={{ color: getCenterColor(currentCenter).text, margin: "0 0 5px 0" }}>
          {getCenterDisplayName(currentCenter)} Center
        </h3>
        <p style={{ margin: "0 0 5px 0" }}>Set {setIndex + 1} of 3</p>
        <p style={{ margin: "0", fontWeight: "500" }}>{totalSelected()} of 9 stones selected</p>
      </div>
      
      {/* Foundation visualization */}
      <div 
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "#f8fafc",
          border: "2px solid #e2e8f0",
          position: "relative",
          margin: "0 auto 30px"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#64748b"
          }}
        >
          Foundation
        </div>
        
        {/* Render selected stones */}
        {centers.map((center, centerIdx) => 
          selectedStones[center].map((stoneName, setIdx) => {
            if (!stoneName) return null;
            
            const { x, y } = getStonePosition(centerIdx, setIdx);
            const colors = getCenterColor(center);
            
            return (
              <div
                key={`${center}-${setIdx}`}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  width: "60px",
                  height: "60px",
                  backgroundColor: colors.dark,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "9px",
                  textAlign: "center",
                  padding: "4px",
                  fontWeight: "bold",
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                }}
              >
                {stoneName}
              </div>
            );
          })
        )}
      </div>
      
      {/* Stone selection area */}
      <div style={{ 
        marginBottom: "30px",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          {currentStoneSet.map((stoneName, idx) => {
            const isSelected = selectedStones[currentCenter][setIndex] === stoneName;
            const colors = getCenterColor(currentCenter);
            
            return (
              <div 
                key={idx}
                onClick={() => selectStone(stoneName)}
                style={{
                  width: "160px",
                  height: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: isSelected ? colors.dark : colors.light,
                  color: isSelected ? "white" : colors.text,
                  fontWeight: "bold",
                  margin: "10px",
                  transition: "all 0.2s ease",
                  transform: isSelected ? "scale(1.05)" : "scale(1)",
                  boxShadow: isSelected ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                }}
              >
                {stoneName}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={goToPrev}
          disabled={centerIndex === 0 && setIndex === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: (centerIndex === 0 && setIndex === 0) ? "#e2e8f0" : "#f1f5f9",
            color: (centerIndex === 0 && setIndex === 0) ? "#94a3b8" : "#334155",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            cursor: (centerIndex === 0 && setIndex === 0) ? "not-allowed" : "pointer"
          }}
        >
          Previous Set
        </button>
        
        <button
          onClick={goToNext}
          disabled={centerIndex === 2 && setIndex === 2}
          style={{
            padding: "10px 20px",
            backgroundColor: (centerIndex === 2 && setIndex === 2) ? "#e2e8f0" : "#f1f5f9",
            color: (centerIndex === 2 && setIndex === 2) ? "#94a3b8" : "#334155",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            cursor: (centerIndex === 2 && setIndex === 2) ? "not-allowed" : "pointer"
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

export default Assessment;