import React from 'react';

const SimpleVisualization = ({ selectedStones = [] }) => {
  // Static visualization for now - will be replaced with dynamic version
  return (
    <svg width="320" height="320" viewBox="0 0 320 320">
      {/* Main Circle */}
      <circle cx="160" cy="160" r="140" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* Inner dashed circle */}
      <circle cx="160" cy="160" r="100" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,5" />
      
      {/* Center point */}
      <circle cx="160" cy="160" r="5" fill="#94a3b8" />
      
      {/* Connecting lines */}
      <line x1="160" y1="160" x2="160" y2="20" stroke="#94a3b8" strokeWidth="2" />
      <line x1="160" y1="160" x2="300" y2="160" stroke="#94a3b8" strokeWidth="2" />
      <line x1="160" y1="160" x2="160" y2="300" stroke="#94a3b8" strokeWidth="2" />
      
      {/* Top stone - Heart (Hexagon) */}
      <polygon 
        points="160,20 175,27 185,42 175,57 145,57 135,42 145,27" 
        fill="#e11d48" 
      />
      
      {/* Right stone - Head (Pentagon) */}
      <polygon 
        points="300,160 285,180 265,190 245,180 255,140" 
        fill="#4f46e5" 
      />
      
      {/* Bottom stone - Body (Octagon) */}
      <polygon 
        points="145,300 175,300 190,285 190,265 175,250 145,250 130,265 130,285" 
        fill="#0ea5e9" 
      />
      
      {/* Counter text */}
      <text x="160" y="320" textAnchor="middle" fill="#64748b" fontSize="14px">
        3 of 9 stones selected
      </text>
    </svg>
  );
};

export default SimpleVisualization;