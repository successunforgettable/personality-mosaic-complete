import React, { useState } from 'react';

/**
 * A standalone foundation stone selection interface
 * Implemented as a complete page component with direct render
 */
const StoneSelectionPage = () => {
  // Stone categories
  const stones = {
    head: [
      { id: 1, name: 'Analytical', description: 'Logical thinking and analysis' },
      { id: 2, name: 'Strategic', description: 'Planning and future thinking' },
      { id: 3, name: 'Thoughtful', description: 'Deep contemplation and consideration' }
    ],
    heart: [
      { id: 4, name: 'Empathetic', description: 'Understanding others\' feelings' },
      { id: 5, name: 'Passionate', description: 'Strong emotional connection' },
      { id: 6, name: 'Supportive', description: 'Offering help and care to others' }
    ],
    body: [
      { id: 7, name: 'Action-oriented', description: 'Getting things done' },
      { id: 8, name: 'Grounded', description: 'Practical and realistic approach' },
      { id: 9, name: 'Adaptable', description: 'Flexible in changing situations' }
    ]
  };

  // Current state
  const [activeCategory, setActiveCategory] = useState('head');
  const [selectedStones, setSelectedStones] = useState({
    head: null,
    heart: null,
    body: null
  });

  // Helper to get color based on category
  const getCategoryColor = (category) => {
    const colors = {
      head: '#3b82f6', // blue
      heart: '#ef4444', // red
      body: '#10b981'  // green
    };
    return colors[category] || '#6b7280';
  };

  // Toggle stone selection
  const toggleStoneSelection = (stone) => {
    setSelectedStones({
      ...selectedStones,
      [activeCategory]: selectedStones[activeCategory]?.id === stone.id ? null : stone
    });
  };

  // Count selected stones
  const selectedCount = Object.values(selectedStones).filter(Boolean).length;

  // CSS-in-JS styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      marginBottom: '20px',
    },
    progress: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tab: (category) => ({
      padding: '10px 20px',
      backgroundColor: activeCategory === category ? getCategoryColor(category) : '#f3f4f6',
      color: activeCategory === category ? 'white' : '#1f2937',
      border: 'none',
      cursor: 'pointer',
      fontWeight: activeCategory === category ? 'bold' : 'normal',
      transition: 'all 0.2s',
    }),
    stoneGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    stone: (stone, category) => {
      const isSelected = selectedStones[category]?.id === stone.id;
      return {
        padding: '20px 15px',
        backgroundColor: isSelected ? getCategoryColor(category) : '#f9fafb',
        color: isSelected ? 'white' : '#111827',
        border: `2px solid ${isSelected ? getCategoryColor(category) : '#e5e7eb'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.2s',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isSelected ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
      };
    },
    stoneName: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    stoneDescription: {
      fontSize: '14px',
      opacity: 0.9,
    },
    foundation: {
      width: '300px',
      height: '300px',
      margin: '0 auto 30px',
      borderRadius: '50%',
      border: '2px solid #e5e7eb',
      position: 'relative',
      backgroundColor: '#f9fafb',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    foundationLabel: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#6b7280',
      fontWeight: 'bold',
    },
    foundationStone: (category, index, total) => {
      // Position stones in a circle
      const angle = index * (2 * Math.PI / total) - Math.PI/2; // Start from top
      const radius = 120; // Distance from center
      const x = 150 + radius * Math.cos(angle);
      const y = 150 + radius * Math.sin(angle);
      
      return {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
        backgroundColor: getCategoryColor(category),
        color: 'white',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      };
    },
    completeButton: {
      display: 'block',
      width: '200px',
      margin: '0 auto',
      padding: '12px 20px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(59,130,246,0.3)',
      transition: 'all 0.2s',
    },
    disabledButton: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Foundation Stone Selection</h1>
        <p style={styles.subtitle}>
          Select one stone from each center to build your personality foundation
        </p>
        <div style={styles.progress}>
          {selectedCount} of 3 stones selected
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabs}>
        <button 
          onClick={() => setActiveCategory('head')}
          style={styles.tab('head')}
        >
          Head Center
        </button>
        <button 
          onClick={() => setActiveCategory('heart')}
          style={styles.tab('heart')}
        >
          Heart Center
        </button>
        <button 
          onClick={() => setActiveCategory('body')}
          style={styles.tab('body')}
        >
          Body Center
        </button>
      </div>

      {/* Stone Selection Grid */}
      <div style={styles.stoneGrid}>
        {stones[activeCategory].map(stone => (
          <div 
            key={stone.id}
            style={styles.stone(stone, activeCategory)}
            onClick={() => toggleStoneSelection(stone)}
          >
            <div style={styles.stoneName}>{stone.name}</div>
            <div style={styles.stoneDescription}>{stone.description}</div>
          </div>
        ))}
      </div>

      {/* Foundation Visualization */}
      <div style={styles.foundation}>
        <div style={styles.foundationLabel}>Foundation</div>
        
        {Object.entries(selectedStones)
          .filter(([_, stone]) => stone !== null)
          .map(([category, stone], index, array) => (
            <div 
              key={stone.id}
              style={styles.foundationStone(category, index, array.length)}
            >
              {stone.name}
            </div>
          ))}
      </div>

      {/* Complete Button */}
      <button 
        style={{
          ...styles.completeButton,
          ...(selectedCount < 3 ? styles.disabledButton : {})
        }}
        disabled={selectedCount < 3}
        onClick={() => {
          if (selectedCount === 3) {
            alert("Foundation completed! Moving to the next phase...");
          }
        }}
      >
        Complete Foundation
      </button>
    </div>
  );
};

export default StoneSelectionPage;