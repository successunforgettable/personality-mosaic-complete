import React from 'react';
import './SimpleCircle.css';

/**
 * SimpleCircle - A straightforward implementation following the technical spec
 */
const SimpleCircle = () => {
  return (
    <div className="simple-circle-foundation">
      <div className="circle-base">
        <div className="center-circle">Foundation</div>
        <div className="stone-dot stone-1"></div>
        <div className="stone-dot stone-2"></div>
        <div className="stone-dot stone-3"></div>
        <div className="stone-dot stone-4"></div>
        <div className="stone-dot stone-5"></div>
        <div className="stone-dot stone-6"></div>
        <div className="stone-dot stone-7"></div>
        <div className="stone-dot stone-8"></div>
        <div className="stone-dot stone-9"></div>
      </div>
    </div>
  );
};

export default SimpleCircle;