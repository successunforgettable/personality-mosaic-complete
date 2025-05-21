import React from 'react';
import './SpecFoundation.css';

/**
 * SpecFoundation - Implements foundation visualization precisely according to technical spec
 * - 320px circular foundation base
 * - Stones placed using exact formula: x = 50 + 45*cos(angle), y = 50 + 45*sin(angle)
 * - 80px × 80px hexagonal stones
 * - Colors based on center type (Head/Heart/Body)
 */
const SpecFoundation = ({ selectedStones = [] }) => {
  return (
    <div className="spec-foundation">
      {/* Foundation circle */}
      <div className="foundation-circle">
        {/* Fixed positioned stones */}
        <div className="stone position-1"></div>
        <div className="stone position-2"></div>
        <div className="stone position-3"></div>
        <div className="stone position-4"></div>
        <div className="stone position-5"></div>
        <div className="stone position-6"></div>
        <div className="stone position-7"></div>
        <div className="stone position-8"></div>
        <div className="stone position-9"></div>
        
        {/* Foundation center label */}
        <div className="foundation-center">
          <span>Foundation</span>
        </div>
      </div>
    </div>
  );
};

export default SpecFoundation;