**Comprehensive Technical Specification: Personality Mosaic Assessment System**

**0. Document Control**

- **Version:** v16
- **Date:** May 19, 2025
- **Purpose:** Complete technical specification for the Personality Mosaic Assessment System React application
- **Target Audience:** Replit AI / React Developers
- **CRITICAL INSTRUCTION:** Replit must refer to this specification before implementing ANY component or feature. All implementations must be verified against this document.

**1. Project Overview and Architecture**

**1.1 Project Goal**

Create an engaging, visually interactive personality assessment system that identifies Enneagram types, wings, arrows, states, and subtypes within a 5-7 minute gamified experience, using a progressive building metaphor.

**1.2 Core Concepts**

- **Building Metaphor:** Users build a personalized tower through progressive visual choices
- **Mosaic Construction:** Four distinct building phases (Foundation, Building Blocks, Colors, Details)
- **Mathematical Mapping:** Precise algorithms to determine personality types
- **Visual Feedback:** Real-time visualization of personality tower construction

**1.3 User Journey Flow**

Welcome Screen (with optional login) →
Foundation Stone Selection (selecting and placing foundation stones) →
Building Block Addition (adding structural blocks to tower) →
Color Palette Application (painting/coloring the tower) →
Detail Element Integration (adding decorative elements and details) →
Results Visualization and Report (viewing and understanding the completed tower)

**1.4 Technical Architecture Overview**

- **Frontend:** React-based SPA with client-side processing
- **State Management:** React Context API / Zustand
- **Animation Engine:** Framer Motion for animations
- **Visualization:** SVG for 2D visuals, Three.js option for 3D
- **Backend (optional):** Node.js/Express for authentication and data storage
- **Database (optional):** MongoDB for user data and results storage

**2. Foundation Stone Experience (Phase 1)**

**2.1 Interaction Design**

- User selects from 3 "Foundation Stones" presented at a time
- Each stone has unique shape, gradient, and contains 2-3 core values/traits
- User selects one stone from each set (9 total sets, shown 3 at a time)
- Each selection adds a stone to the circular foundation base of their tower
- Foundation grows visibly as stones are placed, forming the base of their personality tower

**2.2 Visual Design Specifications**

**2.2.1 Foundation Stones**

- **Size:** 160px × 160px
- **Shape:** Irregular hexagon with subtle variations
- **Background:** Gradient based on stone type (see color specifications)
- **Border:** 2px solid white with 8px border radius
- **Shadow:** 0 4px 12px rgba(0,0,0,0.2)
- **Content:** 2-3 words in white text (Inter SemiBold, 16px)
- **Hover Effect:** Scale to 1.05×, shadow increase
- **Selected State:** Glow effect, checkmark indicator

**2.2.2 Stone Set Container**

- **Layout:** 3 stones side by side with equal spacing
- **Background:** Subtle light background (#f8fafc)
- **Width:** 100% of container, max-width 800px
- **Spacing:** 24px between stones
- **Instruction Text:** Above stones, Inter Regular 18px

**2.2.3 Progress Visualization**

- **Foundation Base:** Circular base (320px diameter)
- **Stone Placement:** Stones appear to be placed around the circle
- **Progress Indicator:** X of 9 sets completed
- **Animation:** Smooth transition as stones appear in foundation

**2.3 Stone Content and Mapping**

**2.3.1 Stone Set 1 (Head vs. Heart vs. Body)**

- **Stone A:** THINKING • ANALYSIS • LOGIC
- **Stone B:** FEELING • EMOTION • CONNECTION
- **Stone C:** ACTION • INSTINCT • PHYSICALITY

**2.3.2 Stone Set 2 (Fear vs. Shame vs. Anger)**

- **Stone A:** PREPARATION • CERTAINTY • SECURITY
- **Stone B:** AUTHENTICITY • IMAGE • RECOGNITION
- **Stone C:** JUSTICE • CONTROL • STRENGTH

**2.3.3 Stone Set 3 (Energy Direction)**

- **Stone A (Withdrawn):** REFLECTION • DEPTH • PRIVACY
- **Stone B (Assertive):** ACHIEVEMENT • INFLUENCE • IMPACT
- **Stone C (Compliant):** STRUCTURE • SUPPORT • HARMONY

**2.3.4 Stone Set 4 (Social Approach)**

- **Stone A (Detached):** OBJECTIVITY • PERSPECTIVE • SPACE
- **Stone B (Attachment):** CLOSENESS • INTIMACY • BONDING
- **Stone C (Autonomy):** INDEPENDENCE • SELF-RELIANCE • FREEDOM

**2.3.5 Stone Set 5 (Processing Style)**

- **Stone A (Conceptual):** SYSTEMS • CONCEPTS • IDEAS
- **Stone B (Emotional):** EXPRESSION • MOOD • FEELING
- **Stone C (Practical):** RESULTS • EFFICIENCY • UTILITY

**2.3.6 Stone Set 6 (Stress Reaction)**

- **Stone A (Overthinking):** VIGILANCE • ANALYSIS • FORESIGHT
- **Stone B (Image-focus):** RECOGNITION • IDENTITY • UNIQUENESS
- **Stone C (Control-seeking):** AUTHORITY • POWER • DIRECTION

**2.3.7 Stone Set 7 (Conflict Style)**

- **Stone A (Avoiding):** PEACE • MEDIATION • COMPROMISE
- **Stone B (Accommodating):** SUPPORT • FLEXIBILITY • ADAPTATION
- **Stone C (Confronting):** DIRECTNESS • CHALLENGE • HONESTY

**2.3.8 Stone Set 8 (Success Definition)**

- **Stone A (Correctness):** ACCURACY • PRINCIPLES • IMPROVEMENT
- **Stone B (Approval):** CONNECTION • ACKNOWLEDGMENT • APPRECIATION
- **Stone C (Autonomy):** MASTERY • ACHIEVEMENT • CAPABILITY

**2.3.9 Stone Set 9 (Relationship Priority)**

- **Stone A (Independence):** AUTONOMY • SELF-SUFFICIENCY • SPACE
- **Stone B (Interdependence):** MUTUALITY • SHARING • RECIPROCITY
- **Stone C (Guidance):** LEADERSHIP • MENTORSHIP • DIRECTION

**2.4 Implementation Requirements**

- Create reusable Stone component with props for content and appearance
- Implement selection tracking and visual feedback
- Store selections in application state
- Calculate intermediate type probabilities after each selection

**2.5 Stone-to-Type Mapping Table**

| Set 1 | Set 2 | Set 3 | Most Likely Type | Secondary Type | Confidence |
|-------|-------|-------|------------------|----------------|------------|
| A     | A     | A     | Type 5           | Type 6         | High       |
| A     | A     | B     | Type 6           | Type 5         | Medium     |
| A     | A     | C     | Type 6           | Type 1         | Medium     |
| A     | B     | A     | Type 5           | Type 4         | Medium     |
| A     | B     | B     | Type 3           | Type 4         | Medium     |
| A     | B     | C     | Type 1           | Type 3         | Medium     |
| A     | C     | A     | Type 5           | Type 8         | Low        |
| A     | C     | B     | Type 8           | Type 5         | Low        |
| A     | C     | C     | Type 1           | Type 8         | Medium     |
| B     | A     | A     | Type 6           | Type 9         | Medium     |
| B     | A     | B     | Type 6           | Type 2         | Low        |
| B     | A     | C     | Type 9           | Type 6         | Medium     |
| B     | B     | A     | Type 4           | Type 9         | Medium     |
| B     | B     | B     | Type 2           | Type 4         | High       |
| B     | B     | C     | Type 9           | Type 2         | Medium     |
| B     | C     | A     | Type 4           | Type 8         | Low        |
| B     | C     | B     | Type 2           | Type 8         | Low        |
| B     | C     | C     | Type 9           | Type 2         | Medium     |
| C     | A     | A     | Type 6           | Type 5         | Medium     |
| C     | A     | B     | Type 7           | Type 6         | Medium     |
| C     | A     | C     | Type 6           | Type 1         | Medium     |
| C     | B     | A     | Type 3           | Type 7         | Medium     |
| C     | B     | B     | Type 7           | Type 3         | Medium     |
| C     | B     | C     | Type 3           | Type 1         | Medium     |
| C     | C     | A     | Type 8           | Type 5         | Medium     |
| C     | C     | B     | Type 8           | Type 7         | High       |
| C     | C     | C     | Type 8           | Type 1         | Medium     |

**2.6 Type Determination Algorithm**

```javascript
// Stone selection mapping algorithm
function determinePersonalityType(selections) {
  // Initialize scores for each type
  const typeScores = {
    type1: 0, type2: 0, type3: 0, type4: 0, type5: 0,
    type6: 0, type7: 0, type8: 0, type9: 0
  };

  // Weights for each selection set
  const setWeights = [2.0, 2.5, 1.5, 1.0, 1.0, 1.5, 1.0, 1.0, 1.0];

  // Process selections and update scores
  // Set 1: Decision-Making Center
  if (selections[0] === 0) { // Stone A (Head)
    typeScores.type5 += 3 * setWeights[0];
    typeScores.type6 += 2 * setWeights[0];
    typeScores.type7 += 1 * setWeights[0];
  } else if (selections[0] === 1) { // Stone B (Heart)
    typeScores.type2 += 3 * setWeights[0];
    typeScores.type3 += 2 * setWeights[0];
    typeScores.type4 += 3 * setWeights[0];
  } else if (selections[0] === 2) { // Stone C (Body)
    typeScores.type1 += 2 * setWeights[0];
    typeScores.type8 += 3 * setWeights[0];
    typeScores.type9 += 2 * setWeights[0];
  }

  // Set 2: Core Motivation
  if (selections[1] === 0) { // Stone A (Fear)
    typeScores.type5 += 2 * setWeights[1];
    typeScores.type6 += 3 * setWeights[1];
    typeScores.type7 += 1 * setWeights[1];
  } else if (selections[1] === 1) { // Stone B (Shame)
    typeScores.type2 += 2 * setWeights[1];
    typeScores.type3 += 3 * setWeights[1];
    typeScores.type4 += 3 * setWeights[1];
  } else if (selections[1] === 2) { // Stone C (Anger)
    typeScores.type1 += 3 * setWeights[1];
    typeScores.type8 += 3 * setWeights[1];
    typeScores.type9 += 2 * setWeights[1];
  }

  // Continue with sets 3-9 following the same pattern
  // [Additional scoring logic for sets 3-9]

  // Calculate confidence scores
  const totalScore = Object.values(typeScores).reduce((sum, score) => sum + score, 0);
  const normalizedScores = {};
  for (const type in typeScores) {
    normalizedScores[type] = typeScores[type] / totalScore;
  }

  // Find the highest scoring type
  let highestType = 'type1';
  let highestScore = normalizedScores.type1;
  for (const type in normalizedScores) {
    if (normalizedScores[type] > highestScore) {
      highestScore = normalizedScores[type];
      highestType = type;
    }
  }

  // Calculate confidence (difference between top score and average of others)
  const otherScores = Object.values(normalizedScores).filter(score => score !== highestScore);
  const avgOtherScore = otherScores.reduce((sum, score) => sum + score, 0) / otherScores.length;
  const confidence = highestScore - avgOtherScore;

  // Find alternative types (next highest scores)
  const typeEntries = Object.entries(normalizedScores)
    .filter(([type]) => type !== highestType)
    .sort((a, b) => b[1] - a[1]);
  const alternatives = typeEntries.slice(0, 2).map(entry => entry[0]);

  return {
    primaryType: highestType.substring(4), // Remove 'type' prefix
    confidence: confidence,
    alternatives: alternatives.map(alt => alt.substring(4)),
    typeMap: normalizedScores
  };
}
```

**3. Building Block Experience (Phase 2)**

**3.1 Interaction Design**

- Based on Foundation results, user sees 4 pairs of "Building Blocks"
- Each pair represents opposing tendencies for their personality type
- User makes A/B choice for each pair of blocks
- Each selection causes a new block to fly to and integrate into their tower
- Tower visibly grows taller as blocks are added, creating the main structure

**3.2 Visual Design Specifications**

**3.2.1 Building Block Pairs**

- **Size:** 200px × 120px per block
- **Shape:** Rectangles with unique shape variations
- **Background:** Gradient based on block type
- **Border:** 2px solid white with 6px border radius
- **Shadow:** 0 4px 8px rgba(0,0,0,0.15)
- **Content:** Short phrase describing tendency (Inter Medium, 16px)
- **Hover Effect:** Scale to 1.03×, shadow increase
- **Selected State:** Glow effect, color intensification

**3.2.2 Block Pair Container**

- **Layout:** Two blocks side by side
- **Background:** None
- **Width:** 100% of container, max-width 600px
- **Spacing:** 40px between blocks, 32px between pairs
- **Question Text:** Above each pair, Inter SemiBold 18px

**3.2.3 Tower Visualization**

- **Base:** Foundation from Phase 1
- **Building:** Blocks stack visually on the foundation
- **Animation:** Each selection causes block to fly to tower position

**3.3 Block Content and Mapping**

**3.3.1 Wing Determination (Pair 1)**

- Specific block options based on core type identified in Phase 1
- Example for Type 9:
  - **Block A:** "I seek peace and avoid conflict" (Type 9w1)
  - **Block B:** "I assert myself when necessary" (Type 9w8)

**Type 1 Wing Options:**
- **Block A (Type 1w9):** "I seek peace and maintain calm while upholding standards"
- **Block B (Type 1w2):** "I help others improve and feel responsible for their growth"

**Type 2 Wing Options:**
- **Block A (Type 2w1):** "I support others through structure and principled service"
- **Block B (Type 2w3):** "I help others while maintaining a positive, successful image"

**Type 3 Wing Options:**
- **Block A (Type 3w2):** "I achieve success while being mindful of others' needs"
- **Block B (Type 3w4):** "I seek authentic achievement that expresses my uniqueness"

**Type 4 Wing Options:**
- **Block A (Type 4w3):** "I express my uniqueness in ways that others recognize and value"
- **Block B (Type 4w5):** "I explore my inner world deeply and privately"

**Type 5 Wing Options:**
- **Block A (Type 5w4):** "I analyze information while maintaining a unique perspective"
- **Block B (Type 5w6):** "I seek knowledge to create security and certainty"

**Type 6 Wing Options:**
- **Block A (Type 6w5):** "I question and analyze before committing to action"
- **Block B (Type 6w7):** "I stay positive while preparing for potential problems"

**Type 7 Wing Options:**
- **Block A (Type 7w6):** "I seek enjoyment while still considering consequences"
- **Block B (Type 7w8):** "I pursue experiences boldly and assertively"

**Type 8 Wing Options:**
- **Block A (Type 8w7):** "I lead with energy and enthusiasm"
- **Block B (Type 8w9):** "I use my strength calmly and steadily"

**Type 9 Wing Options:**
- **Block A (Type 9w1):** "I seek peace and avoid conflict while maintaining standards"
- **Block B (Type 9w8):** "I assert myself when necessary while still valuing harmony"

**3.3.2 Integration Direction (Pair 2)**

- Specific block options based on core type's growth direction
- Example for Type 4:
  - **Block A:** "I become more objective when growing" (Type 4→1)
  - **Block B:** "I become more outgoing when growing" (Alternate)

**Type 1 Arrow Options:**
- **Block A (Integration to 7):** "When growing, I become more spontaneous and open to possibilities"
- **Block B (Disintegration to 4):** "Under stress, I become more emotional and sensitive to flaws"

**Type 2 Arrow Options:**
- **Block A (Integration to 4):** "When growing, I become more authentic and in touch with my needs"
- **Block B (Disintegration to 8):** "Under stress, I become more controlling and demanding"

**Type 3 Arrow Options:**
- **Block A (Integration to 6):** "When growing, I become more loyal and committed to others"
- **Block B (Disintegration to 9):** "Under stress, I become more disengaged and apathetic"

**Type 4 Arrow Options:**
- **Block A (Integration to 1):** "When growing, I become more objective and principled"
- **Block B (Disintegration to 2):** "Under stress, I become more needy and attention-seeking"

**Type 5 Arrow Options:**
- **Block A (Integration to 8):** "When growing, I become more decisive and action-oriented"
- **Block B (Disintegration to 7):** "Under stress, I become more scattered and unfocused"

**Type 6 Arrow Options:**
- **Block A (Integration to 9):** "When growing, I become more peaceful and trusting"
- **Block B (Disintegration to 3):** "Under stress, I become more image-conscious and competitive"

**Type 7 Arrow Options:**
- **Block A (Integration to 5):** "When growing, I become more focused and contemplative"
- **Block B (Disintegration to 1):** "Under stress, I become more critical and perfectionistic"

**Type 8 Arrow Options:**
- **Block A (Integration to 2):** "When growing, I become more nurturing and compassionate"
- **Block B (Disintegration to 5):** "Under stress, I become more withdrawn and secretive"

**Type 9 Arrow Options:**
- **Block A (Integration to 3):** "When growing, I become more productive and goal-oriented"
- **Block B (Disintegration to 6):** "Under stress, I become more anxious and doubting"

**3.3.3 Growth Direction (Pair 3)**

- Options for approaches to personal development
- Specific to each type's growth patterns

**3.3.4 Defense Style (Pair 4)**

- Options for defensive reactions under stress
- Specific to each type's defense mechanisms

**3.4 Implementation Requirements**

- Create reusable BuildingBlock component
- Implement selection tracking with visual feedback
- Update application state with wing and arrow determinations
- Update tower visualization with each selection

**3.5 Wing Calculation Algorithm**

```javascript
function determineWing(primaryType, blockSelections) {
  // First block selection determines primary wing
  const primaryWingSelection = blockSelections[0];
  
  // Wing mapping based on primary type
  const wingMap = {
    '1': primaryWingSelection === 0 ? '9' : '2',
    '2': primaryWingSelection === 0 ? '1' : '3',
    '3': primaryWingSelection === 0 ? '2' : '4',
    '4': primaryWingSelection === 0 ? '3' : '5',
    '5': primaryWingSelection === 0 ? '4' : '6',
    '6': primaryWingSelection === 0 ? '5' : '7',
    '7': primaryWingSelection === 0 ? '6' : '8',
    '8': primaryWingSelection === 0 ? '7' : '9',
    '9': primaryWingSelection === 0 ? '8' : '1'
  };
  
  // Second block selection determines wing strength
  const wingStrength = blockSelections[1] === 0 ? 'strong' : 'moderate';
  
  // Calculate confidence based on consistency of selections
  const confidenceBase = blockSelections[1] === 0 ? 0.85 : 0.7;
  
  return {
    primaryWing: `${primaryType}w${wingMap[primaryType]}`,
    wingStrength: wingStrength,
    confidence: confidenceBase
  };
}
```

**3.6 Arrow Determination Algorithm**

```javascript
function determineArrows(primaryType, blockSelections) {
  // Integration and disintegration map
  const arrowMap = {
    '1': { integration: '7', disintegration: '4' },
    '2': { integration: '4', disintegration: '8' },
    '3': { integration: '6', disintegration: '9' },
    '4': { integration: '1', disintegration: '2' },
    '5': { integration: '8', disintegration: '7' },
    '6': { integration: '9', disintegration: '3' },
    '7': { integration: '5', disintegration: '1' },
    '8': { integration: '2', disintegration: '5' },
    '9': { integration: '3', disintegration: '6' }
  };
  
  // 3rd block selection confirms integration direction
  const integrationDirection = arrowMap[primaryType].integration;
  const integrationStrength = blockSelections[2] === 0 ? 'strong' : 'moderate';
  
  // 4th block selection confirms disintegration direction
  const disintegrationDirection = arrowMap[primaryType].disintegration;
  const disintegrationStrength = blockSelections[3] === 0 ? 'strong' : 'moderate';
  
  return {
    integration: integrationDirection,
    integrationStrength: integrationStrength,
    disintegration: disintegrationDirection,
    disintegrationStrength: disintegrationStrength
  };
}
```

**4. Color Palette Experience (Phase 3)**

**4.1 Interaction Design**

- User is presented with 5 distinct "Color Palettes" representing psychological operating states
- Each color palette appears as a set of paint swatches with a descriptive label for tower coloration
- User selects exactly 2 color palettes that represent their common mental/emotional states
- User then adjusts a blending slider to indicate percentage distribution between these states (totaling 100%)
- The tower visualization colors update in real-time as the user makes their selections

**4.2 Visual Design Specifications**

**4.2.1 Color Palette Selections**

- **Size:** 200px × 120px per palette selection
- **Shape:** Paint palette shaped with color swatches specific to each state
- **Background:** Gradient based on state type (see color specifications)
- **Border:** 2px solid white with 8px border radius
- **Shadow:** 0 4px 8px rgba(0,0,0,0.15)
- **Content:** State name and personalized description (Inter Medium, 16px)
- **Hover Effect:** Scale to 1.03×, shadow increase
- **Selected State:** Glow effect, checkmark indicator
- **States:** "Very Good," "Good," "Average," "Below Average," "Destructive"

**4.2.2 Palette Container**

- **Layout:** Five palettes arranged vertically like paint swatches
- **Background:** Subtle light background (#f8fafc)
- **Width:** 100% of container, max-width 500px
- **Spacing:** 16px between palettes
- **Instruction Text:** "Select the two color palettes that represent your common operating states" (Inter SemiBold 18px)

**4.2.3 Color Blending Control**

- **Type:** Horizontal color mixer with gradient background
- **Appears:** Only after 2 palettes are selected
- **Height:** 40px
- **Width:** 100% of container
- **Handles:** Single circular handle (24px diameter)
- **Track:** Gradient matching selected states (left to right)
- **Percentage Display:** Numerical percentages for both selected states
- **Default:** 50/50 distribution
- **Metaphor:** Paint mixing slider that blends the two selected colors

**4.2.4 Tower Color Visualization**

- **Real-time Updates:** Colors change as selections or distribution changes
- **Color Application:** Tower displays gradient between selected state colors
- **Proportion:** Color distribution reflects percentage allocation
- **Animation:** Smooth color transitions (0.5s)
- **Visual Metaphor:** Tower being painted/colored with selected palettes

**4.3 Color Mapping**

**4.3.1 Five State Colors**

- **Very Good:** #22c55e (Primary), #4ade80 (Light), #166534 (Dark)
- **Good:** #10b981 (Primary), #34d399 (Light), #065f46 (Dark)
- **Average:** #f59e0b (Primary), #fcd34d (Light), #b45309 (Dark)
- **Below Average:** #f97316 (Primary), #fb923c (Light), #c2410c (Dark)
- **Destructive:** #ef4444 (Primary), #f87171 (Light), #b91c1c (Dark)

**4.3.2 Color Combinations**

- Color combinations are specific to each personality type's expression in different states
- Each personality type receives a unique gradient variation within each state color theme
- Tower visualization blends the two selected state colors proportionally

**4.4 Implementation Requirements**

- Create ColorPalette component with type-specific state descriptions
- Implement selection mechanism limited to exactly 2 palettes
- Create distribution slider that appears after 2 palettes are selected
- Apply state colors to tower visualization in real-time
- Store state selections and distribution in application state
- Create algorithm to generate meaningful insights based on selected states

**4.5 State Content Specifications**

For each of the 9 personality types, 5 distinct state descriptions will be created (45 total descriptions), explaining how that personality type manifests in each operating state. These descriptions will appear on the color palettes that users select to paint their personality tower. Descriptions will be concise (25-40 words) to fit within the palette design while clearly conveying the characteristics of each state.

**4.5.1 Complete State Descriptions (First-Person Perspective)**

The descriptions below will be used directly on the palette cards for each personality type:

**Type 1 (The Reformer)**

* **Very Good:** "I feel balanced and at peace with imperfection. I channel my natural eye for improvement into positive change without becoming stressed. I can prioritize what truly matters and let go of minor issues with grace."

* **Good:** "I'm reliable, principled, and organized. I stay focused on doing the right thing and feel proud when I meet my responsibilities well. I'm firm but not rigid in my standards."

* **Average:** "I often feel there's a right way to do things—and I notice when others don't meet it. I can be judgmental or overly self-critical. I tend to fix what's wrong instead of celebrating what's right."

* **Below Average:** "I feel tense when things aren't done the 'right' way. I focus on flaws—in myself and others—and struggle to feel satisfied. I correct more than I celebrate, and it wears me out."

* **Destructive:** "I'm consumed by anger when standards aren't met. I see myself as the only one who cares about doing things correctly. My criticism pushes people away, but I justify it as necessary for maintaining integrity."

**Type 2 (The Helper)**

* **Very Good:** "I genuinely support others while honoring my own needs. I offer help freely without expectation of return. I understand my worth isn't determined by how much I'm needed by others."

* **Good:** "I'm warm, thoughtful, and attentive to others' needs. I find joy in nurturing relationships and being there for people. I recognize my own needs while supporting others."

* **Average:** "I focus on being helpful and making others happy. I'm quick to offer assistance, sometimes before it's asked for. I tend to put others' needs ahead of my own to feel appreciated."

* **Below Average:** "I give too much and resent not receiving enough gratitude. I struggle to say no, then feel taken for granted. I become intrusive in trying to help, whether people want it or not."

* **Destructive:** "I manipulate through martyrdom. I use guilt to control relationships and become angry when my sacrifices go unappreciated. I deny my own needs completely then collapse from exhaustion."

**Type 3 (The Achiever)**

* **Very Good:** "I pursue meaningful goals aligned with my authentic self. I value my accomplishments without my worth depending on them. I'm honest about limitations while celebrating genuine success."

* **Good:** "I'm productive, goal-oriented, and adaptable. I focus my energy on valuable achievements and inspire others through genuine enthusiasm. I balance success with authenticity."

* **Average:** "I work hard to be successful and impress others. I adapt to what's expected and efficient. I become restless when not accomplishing something and worry about how I'm perceived."

* **Below Average:** "I become consumed with image and status. I hide my real feelings behind a successful facade. I measure my worth against others' achievements and fear revealing any weakness."

* **Destructive:** "I deceive myself and others to maintain my image at any cost. I cut ethical corners to win. My entire identity depends on external validation, leaving me hollow despite apparent success."

**Type 4 (The Individualist)**

* **Very Good:** "I transform emotional depth into meaningful creation and connection. I honor my uniqueness without isolation. I embrace all emotions—pleasant and painful—without being overwhelmed by them."

* **Good:** "I'm sensitive, creative, and authentic. I seek depth in experiences and relationships. I express myself meaningfully and use emotional awareness to connect rather than separate."

* **Average:** "I focus on what's missing in my life. I feel different from others and sometimes misunderstood. I experience emotions intensely and can dwell on melancholy or what feels unique about me."

* **Below Average:** "I withdraw when feeling inadequate or envious. I dramatize my suffering and feel others don't understand my depth. I become moody and self-absorbed, pushing people away then feeling abandoned."

* **Destructive:** "I'm trapped in emotional torment and self-hatred. I believe no one can understand my suffering. I sabotage opportunities for happiness because pain feels more authentic than joy."

**Type 5 (The Investigator)**

* **Very Good:** "I share my knowledge and insights generously. I engage with life directly rather than just observing it. I balance intellectual curiosity with emotional connection and physical presence."

* **Good:** "I'm perceptive, analytical, and knowledgeable. I observe carefully before drawing conclusions. I value independence while maintaining meaningful connections with select people."

* **Average:** "I collect information and skills to feel prepared. I need private time to recharge and process. I prefer observing situations before engaging and can be reluctant to share my limited energy."

* **Below Average:** "I withdraw from demands and expectations. I become stingy with my time, energy, and involvement. I overthink instead of acting and use knowledge to create distance rather than connection."

* **Destructive:** "I isolate completely and become lost in disturbing scenarios. I detach from reality and physical needs. I reject help and become hostile when others try to pull me out of my mental fortress."

**Type 6 (The Loyalist)**

* **Very Good:** "I channel my awareness into constructive planning without excessive worry. I trust my own judgment while valuing trusted advice. I face challenges with steady courage rather than anxious preparation."

* **Good:** "I'm loyal, responsible, and vigilant about potential problems. I think through decisions carefully and value security without letting fear control me. My preparation creates genuine safety."

* **Average:** "I anticipate what could go wrong and prepare for it. I seek guidance from authorities or trusted allies. I question things but also want reassurance, oscillating between doubt and certainty."

* **Below Average:** "I become anxious about worst-case scenarios. I struggle with indecision and mistrust my own judgment. I either cling to authorities for safety or rebel against them out of suspicion."

* **Destructive:** "I'm consumed by paranoia and see threats everywhere. I attack perceived enemies or collapse in panic. My anxiety spirals into paralysis or reckless action based on imagined dangers."

**Type 7 (The Enthusiast)**

* **Very Good:** "I experience joy fully while staying grounded in reality. I commit to meaningful experiences rather than chasing novelty. I face difficult emotions with the same enthusiasm I give to pleasure."

* **Good:** "I'm enthusiastic, versatile, and full of ideas. I bring positive energy to projects and relationships. I plan exciting possibilities while following through on my most important commitments."

* **Average:** "I seek stimulating experiences and avoid limitations. I keep options open and dislike committing too firmly. I focus on positive futures rather than current difficulties or negative feelings."

* **Below Average:** "I scatter my energy across too many interests. I escape into planning and fantasizing when bored or uncomfortable. I avoid commitments that feel constraining and leave projects unfinished."

* **Destructive:** "I frantically pursue pleasure to escape mounting pain. I become impulsive and excessive, making destructive choices. I'm unable to tolerate any frustration and lash out when constrained."

**Type 8 (The Challenger)**

* **Very Good:** "I use my strength to protect and empower others. I show vulnerability without fear of weakness. I channel my intensity into positive leadership that creates justice rather than dominance."

* **Good:** "I'm direct, decisive, and protective of those in my care. I confront challenges head-on and stand up for what's right. I take charge when needed without overwhelming others."

* **Average:** "I assert control in situations and resist being controlled. I speak and act forcefully to get things done my way. I protect my independence and challenge what seems weak or unjust."

* **Below Average:** "I become domineering and intimidating. I view vulnerability as weakness to be eliminated. I push too hard and steamroll opposition, justifying my excessive force as necessary."

* **Destructive:** "I'm ruthless toward enemies and demand absolute loyalty. I use intimidation and vengeance to maintain control. I destroy anything that threatens my power, including close relationships."

**Type 9 (The Peacemaker)**

* **Very Good:** "I create genuine harmony by fully engaging with reality. I express my priorities clearly while respecting others. I take meaningful action aligned with my purpose rather than accommodating or avoiding."

* **Good:** "I'm patient, receptive, and naturally calming to others. I see multiple perspectives and find common ground. I maintain inner peace while still participating actively in important matters."

* **Average:** "I seek comfort and avoid conflict. I adapt to others' agendas rather than asserting my own. I focus on simple pleasures and routines that don't require confrontation or difficult decisions."

* **Below Average:** "I become passive and stubbornly resistant to change. I numb myself through routine or distraction. I procrastinate on important matters and minimize problems rather than addressing them."

* **Destructive:** "I completely disconnect from reality and my own needs. I become physically immobilized by indecision. My passive resistance turns into paralysis, and I refuse to be affected by anything around me."

**4.6 State Analysis Algorithm**

```javascript
function calculateStateImpact(stateSelections, distribution, personalityType) {
  // Map of state descriptions for each personality type
  const stateDescriptions = {
    '1': {
      veryGood: "Operating with balanced discernment. Accept imperfection while advocating for improvement.",
      good: "Striving for excellence with perspective. Maintaining principles with reasonable flexibility.",
      average: "Focused on correctness and order. Inner critic is active but manageable.",
      belowAverage: "Becoming rigid and judgmental. Increasing frustration with errors.",
      destructive: "Trapped in critical perfectionism. Intense anger at disorder and impossible standards."
    },
    // Descriptions for all 9 types
  };

  // Get the names of the selected states
  const stateNames = ['veryGood', 'good', 'average', 'belowAverage', 'destructive'];
  const primaryState = stateNames[stateSelections[0]];
  const secondaryState = stateNames[stateSelections[1]];
  
  // Get the descriptions for the selected states
  const primaryDescription = stateDescriptions[personalityType][primaryState];
  const secondaryDescription = stateDescriptions[personalityType][secondaryState];
  
  // Calculate a blended description based on the distribution
  const blendedDescription = generateBlendedDescription(
    primaryDescription, 
    secondaryDescription, 
    distribution.primaryPercentage / 100
  );
  
  // Generate insights based on the specific state combination
  const insights = generateStateInsights(
    personalityType, 
    primaryState, 
    secondaryState, 
    distribution
  );
  
  return {
    primaryState,
    secondaryState,
    distribution,
    blendedDescription,
    insights
  };
}

function generateBlendedDescription(primaryDesc, secondaryDesc, primaryWeight) {
  // Algorithm to create a weighted description based on distribution
  // [Detailed implementation]
}

function generateStateInsights(type, primaryState, secondaryState, distribution) {
  // Generate specific insights based on state combination
  // [Detailed implementation with growth recommendations]
}
```

**5. Detail Element Experience (Phase 4)**

**5.1 Interaction Design**

- User receives 10 "detail elements" representing instinctual energy
- User drags and drops these decorative elements into three containers: Self-Preservation, One-to-One, and Social
- The distribution determines how the tower is decorated and finished with distinctive patterns
- As elements are placed, corresponding details appear on the tower structure
- This completes the personality tower with customized decorative elements representing instinctual drives

**5.2 Visual Design Specifications**

**5.2.1 Token Design**

- **Size:** 32px × 32px
- **Shape:** Circular
- **Background:** Gradient based on personality type
- **Border:** 1px solid white
- **Shadow:** 0 2px 4px rgba(0,0,0,0.1)
- **Animation:** Subtle pulsing effect when not placed
- **Dragging State:** Scale to 1.1×, shadow increase

**5.2.2 Container Design**

- **Size:** 200px × 120px
- **Shape:** Rounded rectangle
- **Background:** Semi-transparent (#ffffff40)
- **Border:** 1px dashed #94a3b8
- **Labels:** "Self-Preservation," "One-to-One," "Social"
- **Token Display:** Grid arrangement of placed tokens
- **Fill Visual:** Container fills with color as tokens are added

**5.2.3 Subtype Visualization**

- **Integration:** Containers connect visually to the tower
- **Visual Indicator:** Tower gains details/patterns based on distribution
- **Dominant Subtype:** Most filled container gets prominent visual treatment

**5.3 Implementation Requirements**

- Create draggable token component
- Implement drop zones with visual feedback
- Track token distribution across containers
- Update application state with subtype distribution
- Apply visual details to tower based on distribution

**5.4 Subtype Stacking Algorithm**

```javascript
function determineSubtypeStack(distribution) {
  const { self, oneToOne, social } = distribution;
  
  // Sort subtypes by token count
  const subtypes = [
    { name: 'self', count: self },
    { name: 'oneToOne', count: oneToOne },
    { name: 'social', count: social }
  ].sort((a, b) => b.count - a.count);
  
  // Calculate dominance percentages
  const total = self + oneToOne + social;
  const dominanceScores = {
    self: (self / total) * 100,
    oneToOne: (oneToOne / total) * 100,
    social: (social / total) * 100
  };
  
  // Determine stack type (balanced vs dominant)
  const highestScore = Math.max(...Object.values(dominanceScores));
  const stackType = highestScore >= 50 ? 'dominant' : 'balanced';
  
  return {
    primary: subtypes[0].name,
    secondary: subtypes[1].name,
    tertiary: subtypes[2].name,
    dominance: dominanceScores,
    stackType: stackType
  };
}
```

**6. Results Visualization and Report**

**6.1 Tower Visualization**

**6.1.1 Complete Tower**

- **Size:** 400px × 600px centered
- **Base:** Circular foundation with arranged foundation stones from Phase 1
- **Structure:** Building blocks from Phase 2 forming the main tower body
- **Colors:** Applied color palettes based on state selections from Phase 3
- **Details:** Decorative patterns and elements based on subtype distribution from Phase 4
- **Interaction:** Rotate view (left/right arrows or drag) to see all aspects of the tower
- **Animation:** Gentle floating/pulsing of completed tower

The completed tower serves as a visual mosaic representation of the user's personality, with each component (foundation, structure, colors, and details) representing different aspects of their personality type.

**6.1.2 Technical Implementation**

- SVG-based visualization (primary)
- Option for Three.js 3D rendering (advanced)
- Component-based construction matching user selections
- Exportable as image file

**6.2 Written Report**

**6.2.1 Report Structure**

- **Header:** Full personality type name and short description
- **Type Description:** 2-3 paragraphs about core type
- **Wing Influence:** How wing affects expression of type
- **State Analysis:** Insights based on state distribution
- **Subtype Stack:** Explanation of instinctual variants
- **Growth Path:** Personalized recommendations

**6.2.2 Visual Design**

- Clean, readable layout
- Section headers with unique icons
- Callout boxes for key insights
- Pull quotes for emphasis
- Progress bar navigation between sections

**6.2.3 Technical Implementation**

- React-based report component
- Printable/exportable to PDF
- Saves to user account if authenticated

**6.3 Sample Report Content (For Type 1)**

**The Reformer**

You are principled, purposeful, and self-controlled, driven by a deep desire to be good, balanced, and act with integrity. Your inner critic helps you maintain high standards but can also become overly harsh when you're not at your best.

As a Reformer, you have a keen eye for improvement and strive to make the world better according to your well-developed sense of right and wrong. You value order, structure, and ethical behavior, often holding yourself to exceptionally high standards.

Your greatest strengths include your integrity, reliability, and commitment to doing what's right. You bring clarity, discipline, and fairness to all situations, making you a valuable force for positive change.

**Your Wing: 1w9 (The Idealist)**

The Nine wing brings a calming, harmonizing quality to your Reformer nature. This makes you more tolerant, patient, and able to see multiple perspectives before making judgments. You likely:

- Approach improvement with a more measured, less reactive energy
- Prefer to create change through peaceful, orderly means
- Balance your critical perfectionism with acceptance
- Seek not just what's right, but what brings harmony

This wing helps soften your inner critic while maintaining your commitment to high standards and ethical principles.

**Your State Distribution**

- Very Good: 30%
- Average: 70%

Your current state distribution shows that you primarily operate in the Average range of your type, with some access to your Very Good state. 

In your Average state, you tend to notice what needs improvement and can become frustrated when things aren't done the "right way." Your inner critic is active, helping you maintain standards but sometimes leading to excessive self-criticism or judgment of others.

Your access to the Very Good state allows you to sometimes find balance, accepting imperfection while still advocating for positive change. In these moments, you can let go of minor issues and focus on what truly matters.

**Your Subtype Stack**

1. Self-Preservation (5 tokens)
2. Social (3 tokens)
3. One-to-One (2 tokens)

As a Self-Preservation dominant One, your focus on improvement and correctness is primarily directed toward creating secure, well-ordered personal environments. You likely:

- Place high importance on establishing reliable routines and systems
- Focus on maintaining cleanliness, organization, and proper maintenance
- Have concerns about health, finances, and future security
- Feel anxious when your personal environment becomes disordered

With Social as your secondary subtype, you also care about social rules, procedures, and group standards, while your One-to-One instinct is less developed, potentially making intimate relationships an area for growth.

**Growth Path**

For continued growth, consider:

1. Practice distinguishing between helpful and unhelpful perfectionism
2. Experiment with "good enough" in low-stakes situations
3. Balance your critical perception with appreciation for what's going well
4. Allow yourself to experience joy and playfulness without guilt
5. Practice self-compassion when you make mistakes

**7. Technical Implementation Details**

**7.1 Component Structure**

/src
/components
/Foundation
  StoneSet.js
  Stone.js
  FoundationBase.js
/BuildingBlocks
  BlockPair.js
  BuildingBlock.js
  TowerBase.js
/ColorPalette
  StateCard.js
  PaletteSelector.js
  DistributionSlider.js
  ColorVisualizer.js
/DetailElements
  Token.js
  SubtypeContainer.js
  DetailVisualizer.js
/Visualization
  Tower.js
  RotationControls.js
  ExportControls.js
/Results
  TypeHeader.js
  ReportSection.js
  FullReport.js
/Common
  ProgressBar.js
  NavigationControls.js
  AnimatedTransition.js

**7.2 State Management**

```javascript
// Example state structure
const appState = {
  // User progress
  currentPhase: "foundation", // foundation, building, color, detail, results
  
  // Foundation phase
  foundationSelections: [0, 2, 1, 0, 2, 1, 0, 2, 1], // example selections
  typeCalculation: {
    primaryType: "9",
    confidence: 0.85,
    alternatives: ["1", "8"],
    typeMap: {
      "1": 0.25,
      "2": 0.05,
      // etc.
    }
  },
  
  // Building phase
  blockSelections: [0, 1, 0, 1], // example selections
  wingCalculation: {
    primaryWing: "9w1",
    confidence: 0.78
  },
  arrowCalculation: {
    integration: "3",
    disintegration: "6"
  },
  
  // Color phase
  stateSelections: [0, 2], // Very Good and Average selected
  stateDistribution: {
    primary: 0, // Very Good state index
    primaryPercentage: 70,
    secondary: 2, // Average state index
    secondaryPercentage: 30
  },
  
  // Detail phase
  subtypeDistribution: {
    self: 3,
    oneToOne: 5,
    social: 2
  },
  
  // Results
  completeProfile: {
    // Combined results from all phases
  }
};
```

**7.3 Animation and Transition Specifications**

**7.3.1 Phase Transitions**

- Smooth fade transition between building phases
- Previous phase elements slide out while new construction elements slide in
- Tower visualization persists and visibly grows with each phase
- Progress indicator updates with each construction phase

**7.3.2 Building Animations**

- Foundation Stone selection: Stone pulses, then floats to circular foundation
- Building Block selection: Block highlights, then flies to tower position and locks into place
- Color Palette selection: Colors flow/paint onto the tower with gradient transitions
- Detail Element dragging: Elements pick up with physics effect, snap into position on the tower
- Each animation reinforces the building metaphor, showing the tower being constructed piece by piece

**7.4 Responsive Design Requirements**

- **Mobile Layout:** Single column, vertically stacked
- **Tablet Layout:** Optimized for touch interaction
- **Desktop Layout:** Side-by-side visualization and controls
- **Breakpoints:** 640px, 768px, 1024px, 1280px
- Mobile-first approach with progressive enhancement

**7.5 Error States & Recovery**

**7.5.1 No Selection Made**
- **Trigger:** User attempts to proceed without making a selection
- **Visual Feedback:** Subtle shake animation on unselected items
- **UI Change:** Continue button remains disabled
- **Message:** "Please make a selection to continue"

**7.5.2 Low Confidence Result**
- **Trigger:** Type determination confidence below 65%
- **Handling:** Show multiple possible types with explanation
- **UI Change:** Add "Refine Your Result" option
- **Alternative Flow:** Additional differentiating questions

**7.5.3 Network Error**
- **Trigger:** Failed API call or data storage
- **Visual Feedback:** Error notification with retry option
- **Data Recovery:** Auto-save to localStorage as backup
- **Fallback:** Continue in offline mode with sync later

**7.6 Accessibility Specifications**

**7.6.1 Keyboard Navigation**
- All interactive elements must be keyboard accessible
- Tab order follows visual flow of the application
- Focus states must be clearly visible
- Keyboard shortcuts for common actions:
  - Space/Enter to select current item
  - Arrow keys to navigate between options
  - Escape to cancel current action

**7.6.2 Screen Reader Support**
- All interactive elements have proper ARIA attributes
- Custom components use appropriate ARIA roles
- State changes are announced via ARIA live regions
- All images and visualizations have meaningful alt text

**7.6.3 Color and Contrast**
- All text must have 4.5:1 contrast ratio minimum (WCAG AA)
- Interactive elements have 3:1 contrast ratio minimum
- Color is not used as the only means of conveying information
- High contrast mode option available

**8. Implementation Timeline and Milestones**

**8.1 Phase 1: Core Foundation Experience**

- Foundation Stone component creation
- Selection tracking implementation
- Basic visualization of foundation
- Primitive type calculation

**8.2 Phase 2: Building Block Experience**

- Building Block component creation
- Block pair interaction
- Tower base visualization
- Wing and arrow calculations

**8.3 Phase 3: Full Assessment Flow**

- Color palette implementation
- Detail distribution implementation
- Full tower visualization
- Complete profile calculation

**8.4 Phase 4: Results and Refinement**

- Results display implementation
- Report generation
- Final visual polish
- Performance optimization

**9. Testing Requirements**

**9.1 Functional Testing**

- Verify all interaction points work correctly
- Ensure calculations produce expected results
- Validate visualization updates appropriately
- Test all edge cases in selection patterns

**9.2 Visual Testing**

- Verify all components match design specifications
- Ensure animations perform smoothly
- Validate responsive behavior across devices
- Test accessibility features

**9.3 Type Accuracy Testing**

- Test against known Enneagram types
- Verify wing and arrow determinations
- Validate subtype stacking
- Measure confidence calculations

**9.4 Performance Benchmarks**

**Load Times**
- Initial load: < 2 seconds
- Step transitions: < 300ms
- Tower visualization: < 500ms

**Animation Performance**
- Maintain 60fps for all animations
- No jank during transitions
- Smooth performance on mid-tier mobile devices

**Memory Usage**
- Peak memory: < 100MB
- No memory leaks during extended usage
- Efficient resource cleanup between steps

**CRITICAL IMPLEMENTATION NOTES**

1. **Reference This Document Continuously:**
   - Check this specification BEFORE implementing any component
   - Verify all visual elements against the specifications
   - Confirm all algorithms match the described functionality

2. **Visual Accuracy Priority:**
   - All visual elements must match specifications exactly
   - Color values, sizes, spacing must be precise
   - Animations must follow timing and easing specifications

3. **Phased Implementation:**
   - Build and test one phase completely before moving to the next
   - Validate each phase against specifications
   - Integrate phases only after individual validation

4. **Validation Checkpoints:**
   - After implementing each major component, verify against specs
   - Request review of visualization accuracy
   - Confirm algorithm implementations

By following this technical specification, the Personality Mosaic system will be implemented with high fidelity to the design vision, creating an engaging and accurate personality assessment experience.
