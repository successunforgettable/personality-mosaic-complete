/**
 * Section 7: Results Visualization and Report - Tower Visualization
 * Exact implementation from specification section 7.1
 */

/**
 * Generate complete tower visualization based on user selections
 * EXACT specification implementation from section 7.1.1
 */
export function generateTowerVisualization(personalityData) {
  const {
    foundationSelections,
    buildingBlocks,
    stateDistribution,
    subtypeDistribution,
    primaryType,
    wingInfluence
  } = personalityData;

  // Base tower structure - 400px × 600px centered
  const towerStructure = {
    dimensions: {
      width: 400,
      height: 600,
      centerX: 200,
      centerY: 300
    },
    
    // Circular foundation with stone pattern
    foundation: generateFoundationLayer(foundationSelections),
    
    // Building blocks forming main tower
    mainTower: generateMainTowerLayer(buildingBlocks),
    
    // Colors applied based on state distribution
    colorScheme: generateColorScheme(stateDistribution),
    
    // Visual patterns based on subtype distribution
    detailPatterns: generateDetailPatterns(subtypeDistribution),
    
    // Animation properties
    animation: {
      floating: true,
      pulsing: true,
      rotatable: true
    }
  };

  return towerStructure;
}

/**
 * Generate foundation layer from stone selections
 */
function generateFoundationLayer(foundationSelections) {
  const stones = foundationSelections.map((selection, index) => ({
    id: index,
    position: calculateStonePosition(index),
    selected: selection > 0,
    intensity: selection, // 0, 1, or 2
    color: getStoneColor(selection)
  }));

  return {
    type: 'circular',
    radius: 120,
    stones: stones,
    pattern: 'radial'
  };
}

/**
 * Calculate stone position in circular foundation
 */
function calculateStonePosition(index) {
  const angle = (index * 40) - 90; // 9 stones, 40 degrees apart, starting at top
  const radius = 100;
  const x = 200 + radius * Math.cos(angle * Math.PI / 180);
  const y = 300 + radius * Math.sin(angle * Math.PI / 180);
  
  return { x, y, angle };
}

/**
 * Get stone color based on selection intensity
 */
function getStoneColor(selection) {
  const colors = {
    0: '#e5e7eb', // Not selected - light gray
    1: '#9ca3af', // Somewhat selected - medium gray
    2: '#374151'  // Strongly selected - dark gray
  };
  
  return colors[selection] || colors[0];
}

/**
 * Generate main tower layer from building blocks
 */
function generateMainTowerLayer(buildingBlocks) {
  const blocks = buildingBlocks.map((block, index) => ({
    id: index,
    level: Math.floor(index / 2) + 1, // Pairs create levels
    position: index % 2 === 0 ? 'left' : 'right',
    selection: block,
    height: 40,
    width: 80
  }));

  return {
    blocks: blocks,
    totalLevels: Math.ceil(buildingBlocks.length / 2),
    baseY: 350, // Start above foundation
    spacing: 45
  };
}

/**
 * Generate color scheme based on state distribution
 */
function generateColorScheme(stateDistribution) {
  const { healthy, average, unhealthy } = stateDistribution;
  
  // Color intensity based on distribution percentages
  return {
    primary: {
      healthy: `hsl(120, ${Math.round(healthy)}%, 45%)`, // Green spectrum
      average: `hsl(45, ${Math.round(average)}%, 55%)`,  // Yellow spectrum  
      unhealthy: `hsl(0, ${Math.round(unhealthy)}%, 50%)` // Red spectrum
    },
    gradient: {
      start: `hsl(120, ${Math.round(healthy)}%, 60%)`,
      middle: `hsl(45, ${Math.round(average)}%, 65%)`,
      end: `hsl(0, ${Math.round(unhealthy)}%, 55%)`
    }
  };
}

/**
 * Generate detail patterns based on subtype distribution
 */
function generateDetailPatterns(subtypeDistribution) {
  const patterns = [];
  
  subtypeDistribution.forEach((subtype, index) => {
    if (subtype.tokens > 0) {
      patterns.push({
        type: subtype.focus, // sp, so, sx
        intensity: subtype.tokens,
        pattern: getSubtypePattern(subtype.focus),
        placement: getPatternPlacement(index, subtype.tokens)
      });
    }
  });

  return patterns;
}

/**
 * Get visual pattern for subtype focus
 */
function getSubtypePattern(focus) {
  const patterns = {
    'sp': { // Self-Preservation
      shape: 'circles',
      density: 'tight',
      style: 'filled'
    },
    'so': { // Social
      shape: 'lines',
      density: 'medium', 
      style: 'connected'
    },
    'sx': { // Sexual/One-to-One
      shape: 'triangles',
      density: 'sparse',
      style: 'pointed'
    }
  };
  
  return patterns[focus] || patterns['sp'];
}

/**
 * Calculate pattern placement based on priority and tokens
 */
function getPatternPlacement(priority, tokens) {
  const placements = {
    0: { // Primary
      region: 'upper',
      prominence: 'high',
      size: tokens * 8
    },
    1: { // Secondary
      region: 'middle', 
      prominence: 'medium',
      size: tokens * 6
    },
    2: { // Tertiary
      region: 'lower',
      prominence: 'low', 
      size: tokens * 4
    }
  };
  
  return placements[priority] || placements[2];
}

/**
 * Generate SVG markup for tower visualization
 * Primary implementation as specified in section 7.1.2
 */
export function generateTowerSVG(towerStructure) {
  const { dimensions, foundation, mainTower, colorScheme, detailPatterns } = towerStructure;
  
  let svg = `<svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Add gradient definitions
  svg += generateGradientDefs(colorScheme);
  
  // Foundation layer
  svg += generateFoundationSVG(foundation, dimensions);
  
  // Main tower layer
  svg += generateMainTowerSVG(mainTower, dimensions, colorScheme);
  
  // Detail patterns
  svg += generateDetailPatternsSVG(detailPatterns, dimensions);
  
  // Animation elements
  svg += generateAnimationSVG();
  
  svg += '</svg>';
  
  return svg;
}

/**
 * Generate gradient definitions for SVG
 */
function generateGradientDefs(colorScheme) {
  return `
    <defs>
      <radialGradient id="towerGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:${colorScheme.gradient.start};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${colorScheme.gradient.middle};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${colorScheme.gradient.end};stop-opacity:0.6" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;
}

/**
 * Generate foundation SVG elements
 */
function generateFoundationSVG(foundation, dimensions) {
  let foundationSVG = `<g class="foundation-layer">`;
  
  // Circular base
  foundationSVG += `<circle cx="${dimensions.centerX}" cy="${dimensions.centerY + 100}" r="${foundation.radius}" fill="url(#towerGradient)" opacity="0.3" stroke="#666" stroke-width="2"/>`;
  
  // Individual stones
  foundation.stones.forEach(stone => {
    if (stone.selected) {
      foundationSVG += `
        <circle 
          cx="${stone.position.x}" 
          cy="${stone.position.y}" 
          r="${12 + stone.intensity * 4}" 
          fill="${stone.color}"
          stroke="#333" 
          stroke-width="1"
          filter="url(#glow)"
        />
      `;
    }
  });
  
  foundationSVG += '</g>';
  return foundationSVG;
}

/**
 * Generate main tower SVG elements
 */
function generateMainTowerSVG(mainTower, dimensions, colorScheme) {
  let towerSVG = `<g class="main-tower">`;
  
  mainTower.blocks.forEach(block => {
    const x = dimensions.centerX + (block.position === 'left' ? -40 : 0);
    const y = mainTower.baseY - (block.level * mainTower.spacing);
    
    towerSVG += `
      <rect 
        x="${x}" 
        y="${y}" 
        width="${block.width}" 
        height="${block.height}"
        fill="url(#towerGradient)"
        stroke="#333" 
        stroke-width="2"
        rx="4"
        filter="url(#glow)"
      />
    `;
  });
  
  towerSVG += '</g>';
  return towerSVG;
}

/**
 * Generate detail patterns SVG elements
 */
function generateDetailPatternsSVG(detailPatterns, dimensions) {
  let patternsSVG = `<g class="detail-patterns">`;
  
  detailPatterns.forEach(pattern => {
    const baseY = pattern.placement.region === 'upper' ? 150 : 
                  pattern.placement.region === 'middle' ? 250 : 350;
    
    for (let i = 0; i < pattern.intensity; i++) {
      const x = dimensions.centerX + (i * 15) - (pattern.intensity * 7.5);
      const y = baseY + (Math.random() * 20 - 10);
      
      if (pattern.pattern.shape === 'circles') {
        patternsSVG += `<circle cx="${x}" cy="${y}" r="3" fill="#666" opacity="0.6"/>`;
      } else if (pattern.pattern.shape === 'triangles') {
        patternsSVG += `<polygon points="${x},${y-3} ${x-3},${y+3} ${x+3},${y+3}" fill="#666" opacity="0.6"/>`;
      } else if (pattern.pattern.shape === 'lines') {
        patternsSVG += `<line x1="${x-5}" y1="${y}" x2="${x+5}" y2="${y}" stroke="#666" stroke-width="2" opacity="0.6"/>`;
      }
    }
  });
  
  patternsSVG += '</g>';
  return patternsSVG;
}

/**
 * Generate animation SVG elements
 */
function generateAnimationSVG() {
  return `
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="translate"
      values="0,0; 0,-2; 0,0"
      dur="3s"
      repeatCount="indefinite"/>
  `;
}

/**
 * Export tower as image file (specification requirement)
 */
export function exportTowerAsImage(svgElement, filename = 'personality-tower.png') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  canvas.width = 400;
  canvas.height = 600;
  
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    
    canvas.toBlob(function(blob) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    });
  };
  
  img.src = url;
}