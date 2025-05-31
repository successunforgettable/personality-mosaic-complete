/**
 * Section 7: Results Visualization and Report - Tower Visualization Component
 * Exact implementation from specification section 7.1
 */

import { useState, useEffect, useRef } from 'react';
import { generateTowerVisualization, generateTowerSVG, exportTowerAsImage } from '../lib/towerVisualization.js';

export default function TowerVisualization({ personalityData, interactive = true }) {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const svgRef = useRef(null);
  const [towerStructure, setTowerStructure] = useState(null);

  useEffect(() => {
    if (personalityData) {
      const structure = generateTowerVisualization(personalityData);
      setTowerStructure(structure);
    }
  }, [personalityData]);

  const handleRotateLeft = () => {
    setRotation(prev => prev - 45);
  };

  const handleRotateRight = () => {
    setRotation(prev => prev + 45);
  };

  const handleExport = () => {
    if (svgRef.current) {
      exportTowerAsImage(svgRef.current, `${personalityData.primaryType.name}-tower.png`);
    }
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  if (!towerStructure) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading tower visualization...</div>
      </div>
    );
  }

  return (
    <div className="tower-visualization-container">
      {/* Tower Display - 400px × 600px centered as specified */}
      <div 
        className="tower-display"
        style={{
          width: '400px',
          height: '600px',
          margin: '0 auto',
          position: 'relative',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease-in-out',
            width: '100%',
            height: '100%'
          }}
        >
          <div
            ref={svgRef}
            className={isAnimating ? 'tower-floating' : ''}
            dangerouslySetInnerHTML={{
              __html: generateTowerSVG(towerStructure)
            }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </div>
      </div>

      {/* Interactive Controls */}
      {interactive && (
        <div className="tower-controls mt-6 flex justify-center space-x-4">
          <button
            onClick={handleRotateLeft}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Rotate tower left"
          >
            ← Rotate Left
          </button>
          
          <button
            onClick={toggleAnimation}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAnimating 
                ? 'bg-orange-600 text-white hover:bg-orange-700' 
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
          
          <button
            onClick={handleRotateRight}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Rotate tower right"
          >
            Rotate Right →
          </button>
          
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export Image
          </button>
        </div>
      )}

      {/* Tower Legend */}
      <div className="tower-legend mt-6 bg-white rounded-lg p-4 shadow-sm border">
        <h3 className="text-lg font-semibold mb-3">Tower Components</h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-2">Foundation Stones</div>
            <div className="text-gray-600">
              Circular base representing your core personality pattern selection
            </div>
          </div>
          
          <div>
            <div className="font-medium text-gray-700 mb-2">Building Blocks</div>
            <div className="text-gray-600">
              Tower structure showing your influence patterns and growth directions
            </div>
          </div>
          
          <div>
            <div className="font-medium text-gray-700 mb-2">Color Palette</div>
            <div className="text-gray-600">
              Colors representing your state distribution: healthy, average, unhealthy
            </div>
          </div>
          
          <div>
            <div className="font-medium text-gray-700 mb-2">Detail Elements</div>
            <div className="text-gray-600">
              Visual patterns based on your priority area focus distribution
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes tower-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes tower-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .tower-floating {
          animation: tower-float 3s ease-in-out infinite;
        }
        
        .tower-floating svg {
          animation: tower-pulse 4s ease-in-out infinite;
        }
        
        .tower-display {
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.05);
        }
        
        .tower-controls button {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .tower-controls button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}