import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './DetailExperience.css';

/**
 * DetailExperience - Phase 4 of the Personality Mosaic Assessment
 * Handles the subtype/detail element selection experience
 */
const DetailExperience = ({ 
  onComplete, 
  foundationSelections = [], 
  buildingBlockSelections = [], 
  colorPaletteSelections = [] 
}) => {
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);

  // Detail categories based on the three subtypes/instincts
  const detailCategories = [
    {
      title: "Self-Preservation Details",
      subtitle: "Elements that represent your focus on security and comfort",
      icon: "🏠",
      details: [
        { 
          id: 'sp-security', 
          name: 'Security Foundation', 
          description: 'Steady • Reliable • Protected',
          visual: 'A solid cornerstone element'
        },
        { 
          id: 'sp-comfort', 
          name: 'Comfort Zone', 
          description: 'Cozy • Familiar • Safe',
          visual: 'A welcoming alcove detail'
        },
        { 
          id: 'sp-resources', 
          name: 'Resource Reserve', 
          description: 'Prepared • Abundant • Sustainable',
          visual: 'A storage compartment element'
        },
        { 
          id: 'sp-health', 
          name: 'Wellness Focus', 
          description: 'Healthy • Balanced • Vital',
          visual: 'A natural garden element'
        },
        { 
          id: 'sp-routine', 
          name: 'Structured Rhythm', 
          description: 'Organized • Predictable • Efficient',
          visual: 'A clockwork mechanism detail'
        },
        { 
          id: 'sp-shelter', 
          name: 'Protective Barrier', 
          description: 'Shielded • Enclosed • Private',
          visual: 'A defensive wall element'
        }
      ]
    },
    {
      title: "Social Details", 
      subtitle: "Elements that represent your focus on relationships and community",
      icon: "👥",
      details: [
        { 
          id: 'so-connection', 
          name: 'Connection Bridge', 
          description: 'Linking • Networking • Bonding',
          visual: 'A bridge connecting element'
        },
        { 
          id: 'so-recognition', 
          name: 'Recognition Platform', 
          description: 'Visible • Acknowledged • Appreciated',
          visual: 'A prominent display element'
        },
        { 
          id: 'so-community', 
          name: 'Community Circle', 
          description: 'Inclusive • Belonging • United',
          visual: 'A gathering space element'
        },
        { 
          id: 'so-hierarchy', 
          name: 'Status Indicator', 
          description: 'Positioned • Ranked • Influential',
          visual: 'A ranking tower element'
        },
        { 
          id: 'so-collaboration', 
          name: 'Team Workspace', 
          description: 'Cooperative • Shared • Synergistic',
          visual: 'A collaborative platform element'
        },
        { 
          id: 'so-communication', 
          name: 'Communication Hub', 
          description: 'Expressive • Clear • Connected',
          visual: 'A signal transmission element'
        }
      ]
    },
    {
      title: "One-to-One Details",
      subtitle: "Elements that represent your focus on intensity and personal connection",
      icon: "💫",
      details: [
        { 
          id: 'sx-intensity', 
          name: 'Intensity Focus', 
          description: 'Passionate • Concentrated • Powerful',
          visual: 'A laser beam element'
        },
        { 
          id: 'sx-attraction', 
          name: 'Magnetic Core', 
          description: 'Attractive • Compelling • Irresistible',
          visual: 'A magnetic field element'
        },
        { 
          id: 'sx-chemistry', 
          name: 'Chemistry Lab', 
          description: 'Reactive • Experimental • Transformative',
          visual: 'An alchemical apparatus element'
        },
        { 
          id: 'sx-edge', 
          name: 'Edge Element', 
          description: 'Edgy • Boundary-pushing • Provocative',
          visual: 'A sharp blade element'
        },
        { 
          id: 'sx-fusion', 
          name: 'Fusion Chamber', 
          description: 'Merging • Unified • Intense',
          visual: 'A fusion core element'
        },
        { 
          id: 'sx-spark', 
          name: 'Spark Generator', 
          description: 'Igniting • Electric • Dynamic',
          visual: 'An electrical spark element'
        }
      ]
    }
  ];

  const currentCategoryData = detailCategories[currentCategory];
  const maxSelections = 3; // Allow up to 3 details per category
  const categorySelections = selectedDetails.filter(detail => 
    currentCategoryData.details.some(d => d.id === detail.id)
  );

  const handleDetailSelect = (detail) => {
    const isSelected = selectedDetails.some(d => d.id === detail.id);
    
    if (isSelected) {
      // Remove detail
      setSelectedDetails(selectedDetails.filter(d => d.id !== detail.id));
    } else if (categorySelections.length < maxSelections) {
      // Add detail if under limit
      setSelectedDetails([...selectedDetails, { ...detail, category: currentCategory }]);
    }
  };

  const canContinue = categorySelections.length > 0;
  const isLastCategory = currentCategory === detailCategories.length - 1;
  const isComplete = currentCategory === detailCategories.length - 1 && canContinue;

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
        colorPaletteSelections,
        detailSelections: selectedDetails
      });
    }
  };

  return (
    <motion.div 
      className="detail-experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="detail-header">
        <h2 className="phase-title">Add Finishing Details</h2>
        <p className="phase-subtitle">
          Choose details that add depth and personality to your tower
        </p>
        <div className="progress-info">
          Step {currentCategory + 1} of {detailCategories.length}
        </div>
      </div>

      <motion.div 
        className="detail-category"
        key={currentCategory}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="category-header">
          <div className="category-icon">{currentCategoryData.icon}</div>
          <h3 className="category-title">{currentCategoryData.title}</h3>
          <p className="category-subtitle">{currentCategoryData.subtitle}</p>
          <p className="selection-info">
            Select up to {maxSelections} details ({categorySelections.length}/{maxSelections})
          </p>
        </div>

        <div className="details-grid">
          {currentCategoryData.details.map((detail) => {
            const isSelected = selectedDetails.some(d => d.id === detail.id);
            const canSelect = !isSelected && categorySelections.length < maxSelections;
            
            return (
              <motion.div
                key={detail.id}
                className={`detail-option ${isSelected ? 'selected' : ''} ${!canSelect && !isSelected ? 'disabled' : ''}`}
                onClick={() => (canSelect || isSelected) && handleDetailSelect(detail)}
                whileHover={canSelect || isSelected ? { scale: 1.02, y: -4 } : {}}
                whileTap={canSelect || isSelected ? { scale: 0.98 } : {}}
              >
                <div className="detail-content">
                  <h4 className="detail-name">{detail.name}</h4>
                  <p className="detail-description">{detail.description}</p>
                  <p className="detail-visual">{detail.visual}</p>
                </div>
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

      {selectedDetails.length > 0 && (
        <motion.div 
          className="selected-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Your Selected Details:</h4>
          <div className="details-preview">
            {selectedDetails.map((detail) => (
              <div
                key={detail.id}
                className="detail-preview"
                title={detail.name}
              >
                <div className="detail-preview-name">{detail.name}</div>
                <div className="detail-preview-category">
                  {detailCategories[detail.category].icon}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DetailExperience;