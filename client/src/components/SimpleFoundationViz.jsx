import React from 'react';

const SimpleFoundationViz = () => {
  return (
    <svg width="300" height="320" viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg">
      {/* Circle Foundation */}
      <circle cx="150" cy="150" r="140" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* Center dot */}
      <circle cx="150" cy="150" r="5" fill="#94a3b8" />
      
      {/* Connecting lines */}
      <line x1="150" y1="150" x2="150" y2="10" stroke="#94a3b8" strokeWidth="2" />
      <line x1="150" y1="150" x2="290" y2="150" stroke="#94a3b8" strokeWidth="2" />
      <line x1="150" y1="150" x2="150" y2="290" stroke="#94a3b8" strokeWidth="2" />
      
      {/* Heart Stone (top) - Hexagon */}
      <polygon 
        points="150,10 165,17 170,32 160,45 140,45 130,32 135,17" 
        fill="#e11d48" 
      />
      
      {/* Head Stone (right) - Pentagon */}
      <polygon 
        points="290,150 275,165 260,180 245,165 260,135" 
        fill="#4f46e5" 
      />
      
      {/* Body Stone (bottom) - Octagon */}
      <polygon 
        points="140,290 160,290 175,275 175,255 160,240 140,240 125,255 125,275" 
        fill="#0ea5e9" 
      />
      
      {/* Progress text */}
      <text x="150" y="315" textAnchor="middle" fill="#64748b" fontSize="14px">3 of 9 stones selected</text>
    </svg>
  );
};

export default SimpleFoundationViz;