import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ColorPaletteExperience.css';

/**
 * ColorPaletteExperience - Phase 3 of the Personality Mosaic Assessment
 * Handles the color palette selection experience
 */
const ColorPaletteExperience = ({ onComplete, foundationSelections = [], buildingBlockSelections = [] }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);

  // Color categories and options
  const colorCategories = [
    {
      title: "Primary Energy Colors",
      subtitle: "Choose colors that represent your core energy",
      colors: [
        { id: 'red', name: 'Passion Red', hex: '#dc2626', description: 'Dynamic • Powerful • Action-oriented' },
        { id: 'blue', name: 'Deep Blue', hex: '#2563eb', description: 'Thoughtful • Stable • Analytical' },
        { id: 'green', name: 'Natural Green', hex: '#059669', description: 'Balanced • Growing • Harmonious' },
        { id: 'purple', name: 'Creative Purple', hex: '#7c3aed', description: 'Intuitive • Imaginative • Transformative' },
        { id: 'orange', name: 'Vibrant Orange', hex: '#ea580c', description: 'Enthusiastic • Social • Energetic' },
        { id: 'yellow', name: 'Bright Yellow', hex: '#ca8a04', description: 'Optimistic • Joyful • Inspiring' }
      ]
    },
    {
      title: "Secondary Mood Colors",
      subtitle: "Choose colors that reflect your emotional landscape",
      colors: [
        { id: 'teal', name: 'Calm Teal', hex: '#0d9488', description: 'Peaceful • Refreshing • Clear' },
        { id: 'rose', name: 'Warm Rose', hex: '#e11d48', description: 'Nurturing • Compassionate • Gentle' },
        { id: 'indigo', name: 'Deep Indigo', hex: '#4338ca', description: 'Mystical • Wise • Introspective' },
        { id: 'amber', name: 'Golden Amber', hex: '#d97706', description: 'Warm • Confident • Radiant' },
        { id: 'emerald', name: 'Rich Emerald', hex: '#047857', description: 'Abundant • Luxurious • Grounded' },
        { id: 'slate', name: 'Sophisticated Slate', hex: '#475569', description: 'Elegant • Timeless • Refined' }
      ]
    },
    {
      title: "Accent Colors",
      subtitle: "Choose colors that add personality to your palette",
      colors: [
        { id: 'coral', name: 'Living Coral', hex: '#f97316', description: 'Playful • Lively • Expressive' },
        { id: 'lavender', name: 'Soft Lavender', hex: '#8b5cf6', description: 'Dreamy • Gentle • Romantic' },
        { id: 'mint', name: 'Fresh Mint', hex: '#10b981', description: 'Clean • Fresh • Rejuvenating' },
        { id: 'gold', name: 'Bright Gold', hex: '#f59e0b', description: 'Luxurious • Successful • Bold' },
        { id: 'silver', name: 'Modern Silver', hex: '#64748b', description: 'Sleek • Contemporary • Sophisticated' },
        { id: 'crimson', name: 'Deep Crimson', hex: '#b91c1c', description: 'Intense • Passionate • Strong' }
      ]
    }
  ];

  const currentCategoryData = colorCategories[currentCategory];
  const maxSelections = 2; // Allow 2 colors per category
  const categorySelections = selectedColors.filter(color => 
    currentCategoryData.colors.some(c => c.id === color.id)
  );

  const handleColorSelect = (color) => {
    const isSelected = selectedColors.some(c => c.id === color.id);
    
    if (isSelected) {
      // Remove color
      setSelectedColors(selectedColors.filter(c => c.id !== color.id));
    } else if (categorySelections.length < maxSelections) {
      // Add color if under limit
      setSelectedColors([...selectedColors, { ...color, category: currentCategory }]);
    }
  };

  const canContinue = categorySelections.length > 0;
  const isLastCategory = currentCategory === colorCategories.length - 1;
  const isComplete = currentCategory === colorCategories.length - 1 && canContinue;

  const handleNext = () => {
    if (isComplete) {
      handleComplete();
    } else if (canContinue) {
      setCurrentCategory(currentCategory + 1);
    }
  };

  const handleBack = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        foundationSelections,
        buildingBlockSelections,
        colorPaletteSelections: selectedColors
      });
    }
  };

  return (
    <motion.div 
      className="color-palette-experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-palette-header">
        <h2 className="phase-title">Create Your Color Palette</h2>
        <p className="phase-subtitle">
          Select colors that resonate with your personality and energy
        </p>
        <div className="progress-info">
          Step {currentCategory + 1} of {colorCategories.length}
        </div>
      </div>

      <motion.div 
        className="color-category"
        key={currentCategory}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="category-header">
          <h3 className="category-title">{currentCategoryData.title}</h3>
          <p className="category-subtitle">{currentCategoryData.subtitle}</p>
          <p className="selection-info">
            Select up to {maxSelections} colors ({categorySelections.length}/{maxSelections})
          </p>
        </div>

        <div className="color-grid">
          {currentCategoryData.colors.map((color) => {
            const isSelected = selectedColors.some(c => c.id === color.id);
            const canSelect = !isSelected && categorySelections.length < maxSelections;
            
            return (
              <motion.div
                key={color.id}
                className={`color-option ${isSelected ? 'selected' : ''} ${!canSelect && !isSelected ? 'disabled' : ''}`}
                onClick={() => (canSelect || isSelected) && handleColorSelect(color)}
                whileHover={canSelect || isSelected ? { scale: 1.05 } : {}}
                whileTap={canSelect || isSelected ? { scale: 0.95 } : {}}
              >
                <div 
                  className="color-circle"
                  style={{ backgroundColor: color.hex }}
                />
                <h4 className="color-name">{color.name}</h4>
                <p className="color-description">{color.description}</p>
                {isSelected && <div className="selection-check">✓</div>}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="navigation-controls">
        {currentCategory > 0 && (
          <motion.button 
            className="back-button"
            onClick={handleBack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ← Back
          </motion.button>
        )}
        
        <motion.button 
          className={`continue-button ${!canContinue ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!canContinue}
          whileHover={canContinue ? { scale: 1.05 } : {}}
          whileTap={canContinue ? { scale: 0.95 } : {}}
        >
          {isComplete ? 'Complete Assessment' : 'Continue'}
        </motion.button>
      </div>

      {selectedColors.length > 0 && (
        <motion.div 
          className="selected-palette"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Your Selected Colors:</h4>
          <div className="palette-preview">
            {selectedColors.map((color) => (
              <div
                key={color.id}
                className="palette-color"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ColorPaletteExperience;