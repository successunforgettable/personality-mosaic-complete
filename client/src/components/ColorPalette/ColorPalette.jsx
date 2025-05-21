import React from 'react';
import { motion } from 'framer-motion';
import { STATE_COLORS } from './ColorPaletteData';
import './ColorPalette.css';

/**
 * ColorPalette Component - Represents an individual color palette in the personality assessment
 */
const ColorPalette = ({ 
  stateKey, 
  stateData, 
  isSelected = false, 
  onClick,
  personalityType
}) => {
  // If we don't get stateData directly, look it up in STATE_COLORS
  const paletteData = stateData || STATE_COLORS[stateKey] || {};
  
  // Extract colors from the palette data
  const { primary, light, dark, name, description, textColor } = paletteData;
  
  return (
    <motion.div
      className={`color-palette ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className="palette-background" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 70% 30%, ${light} 0%, ${primary} 50%, ${dark} 100%)`
        }}
      >
        {/* Color swatches */}
        <div className="color-swatches">
          <div className="swatch" style={{ backgroundColor: light }}></div>
          <div className="swatch" style={{ backgroundColor: primary }}></div>
          <div className="swatch" style={{ backgroundColor: dark }}></div>
        </div>
        
        {/* Palette content */}
        <div className="palette-content">
          <h3 className="palette-title" style={{ color: textColor || '#fff' }}>{name}</h3>
        </div>
        
        {/* Checkmark for selected state */}
        {isSelected && (
          <div className="palette-checkmark">✓</div>
        )}
      </div>
      
      {/* Description tooltip */}
      <div className="palette-tooltip">
        <div className="tooltip-content">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorPalette;