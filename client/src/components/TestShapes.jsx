import React from 'react';
import './TestShapes.css';

const TestShapes = () => {
  return (
    <div className="test-container">
      <h2>Stone Shape Test</h2>
      <div className="shape-row">
        <div>
          <h3>Heart Stone</h3>
          <div className="test-shape heart-shape"></div>
        </div>
        <div>
          <h3>Head Stone</h3>
          <div className="test-shape head-shape"></div>
        </div>
        <div>
          <h3>Body Stone</h3>
          <div className="test-shape body-shape"></div>
        </div>
      </div>
    </div>
  );
};

export default TestShapes;