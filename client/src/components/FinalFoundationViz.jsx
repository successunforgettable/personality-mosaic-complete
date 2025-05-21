import React from 'react';

const FinalFoundationViz = ({ selectedStones = [] }) => {
  return (
    <svg width="300" height="350" viewBox="0 0 300 350" xmlns="http://www.w3.org/2000/svg">
      {/* Circle Foundation */}
      <circle cx="150" cy="150" r="140" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* Center dot */}
      <circle cx="150" cy="150" r="5" fill="#94a3b8" />
      
      {/* Connecting lines */}
      <line x1="150" y1="150" x2="150" y2="15" stroke="#94a3b8" strokeWidth="2" />
      <line x1="150" y1="150" x2="285" y2="150" stroke="#94a3b8" strokeWidth="2" />
      <line x1="150" y1="150" x2="150" y2="285" stroke="#94a3b8" strokeWidth="2" />
      
      {/* Heart Stone (top) - HEXAGON */}
      <polygon 
        points="150,15 170,25 180,45 165,65 135,65 120,45 130,25" 
        fill="#e11d48" 
      />
      
      {/* Head Stone (right) - PENTAGON */}
      <polygon 
        points="285,150 270,180 245,190 220,180 230,130" 
        fill="#4f46e5" 
      />
      
      {/* Body Stone (bottom) - OCTAGON */}
      <polygon 
        points="135,285 165,285 180,270 180,250 165,235 135,235 120,250 120,270" 
        fill="#0ea5e9" 
      />
      
      {/* Progress text */}
      <text x="150" y="330" textAnchor="middle" fill="#64748b" fontSize="14px">3 of 9 stones selected</text>
    </svg>
  );
};

export default FinalFoundationViz;