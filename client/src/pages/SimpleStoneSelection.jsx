import React, { useState } from 'react';

/**
 * Simple Stone Selection - Minimal standalone implementation
 */
const SimpleStoneSelection = () => {
  // Stone sets for each center
  const stones = {
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
  
  // Current center and set
  const centers = ["head", "heart", "body"];
  const [currentCenter, setCurrentCenter] = useState("head");
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // Selected stones
  const [selections, setSelections] = useState({
    head: [null, null, null],
    heart: [null, null, null],
    body: [null, null, null]
  });
  
  // Get center-specific colors
  const getColors = (center) => {
    if (center === "head") return { light: "#dbeafe", dark: "#3b82f6" };
    if (center === "heart") return { light: "#fee2e2", dark: "#ef4444" };
    return { light: "#d1fae5", dark: "#10b981" };
  };
  
  // Select a stone
  const selectStone = (stone) => {
    setSelections({
      ...selections,
      [currentCenter]: [
        ...selections[currentCenter].slice(0, currentSetIndex),
        stone,
        ...selections[currentCenter].slice(currentSetIndex + 1)
      ]
    });
  };
  
  // Navigation
  const goToPrevious = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    } else if (currentCenter === "heart") {
      setCurrentCenter("head");
      setCurrentSetIndex(2);
    } else if (currentCenter === "body") {
      setCurrentCenter("heart");
      setCurrentSetIndex(2);
    }
  };
  
  const goToNext = () => {
    if (currentSetIndex < 2) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else if (currentCenter === "head") {
      setCurrentCenter("heart");
      setCurrentSetIndex(0);
    } else if (currentCenter === "heart") {
      setCurrentCenter("body");
      setCurrentSetIndex(0);
    }
  };
  
  // Count selected stones
  const getSelectionCount = () => {
    let count = 0;
    Object.values(selections).forEach(centerSelections => {
      count += centerSelections.filter(Boolean).length;
    });
    return count;
  };
  
  // Check if all stones selected
  const isComplete = () => getSelectionCount() === 9;
  
  // Stone positions in foundation
  const getStonePosition = (center, setIdx) => {
    const centerIndex = centers.indexOf(center);
    const position = centerIndex * 3 + setIdx;
    const angle = (position / 9) * 2 * Math.PI - Math.PI/2;
    const x = 120 + 90 * Math.cos(angle);
    const y = 120 + 90 * Math.sin(angle);
    return { x, y };
  };
  
  // Current set of stones
  const currentStones = stones[currentCenter][currentSetIndex];
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#111827", marginBottom: "10px" }}>Personality Mosaic Assessment</h1>
      
      <h2 style={{ textAlign: "center", color: "#374151", marginBottom: "30px" }}>
        Choose Your Foundation Stones
      </h2>
      
      {/* Header info */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3 style={{ textTransform: "capitalize", color: getColors(currentCenter).dark }}>
          {currentCenter} Center
        </h3>
        <div>Set {currentSetIndex + 1} of 3</div>
        <div style={{ fontWeight: "bold", marginTop: "10px" }}>
          {getSelectionCount()} of 9 stone sets selected
        </div>
      </div>
      
      {/* Foundation visualization */}
      <div style={{
        width: "240px",
        height: "240px",
        margin: "0 auto 30px",
        borderRadius: "50%",
        backgroundColor: "#f8fafc",
        border: "2px solid #e2e8f0",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#64748b"
        }}>
          Foundation
        </div>
        
        {/* Placed stones */}
        {Object.entries(selections).map(([center, centerSelections]) => (
          centerSelections.map((stone, idx) => {
            if (!stone) return null;
            
            const { x, y } = getStonePosition(center, idx);
            const colors = getColors(center);
            
            return (
              <div
                key={`${center}-${idx}`}
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                  width: "50px",
                  height: "50px",
                  backgroundColor: colors.dark,
                  color: "white",
                  fontSize: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                }}
              >
                {stone}
              </div>
            );
          })
        ))}
      </div>
      
      {/* Stone selection */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "30px"
      }}>
        {currentStones.map((stone, idx) => {
          const isSelected = selections[currentCenter][currentSetIndex] === stone;
          const colors = getColors(currentCenter);
          
          return (
            <div
              key={idx}
              onClick={() => selectStone(stone)}
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: isSelected ? colors.dark : colors.light,
                color: isSelected ? "white" : "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
                boxShadow: isSelected ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
              }}
            >
              {stone}
            </div>
          );
        })}
      </div>
      
      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <button
          onClick={goToPrevious}
          disabled={currentCenter === "head" && currentSetIndex === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: (currentCenter === "head" && currentSetIndex === 0) ? "#e5e7eb" : "#f3f4f6",
            color: (currentCenter === "head" && currentSetIndex === 0) ? "#9ca3af" : "#4b5563",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
            fontWeight: "500",
            cursor: (currentCenter === "head" && currentSetIndex === 0) ? "not-allowed" : "pointer"
          }}
        >
          Previous Set
        </button>
        
        <button
          onClick={goToNext}
          disabled={currentCenter === "body" && currentSetIndex === 2}
          style={{
            padding: "10px 20px",
            backgroundColor: (currentCenter === "body" && currentSetIndex === 2) ? "#e5e7eb" : "#f3f4f6",
            color: (currentCenter === "body" && currentSetIndex === 2) ? "#9ca3af" : "#4b5563",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
            fontWeight: "500",
            cursor: (currentCenter === "body" && currentSetIndex === 2) ? "not-allowed" : "pointer"
          }}
        >
          Next Set
        </button>
        
        {isComplete() && (
          <button
            onClick={() => alert("Foundation selection complete!")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Complete Foundation
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleStoneSelection;