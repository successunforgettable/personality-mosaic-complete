import React from 'react';
import { motion } from 'framer-motion';
import { FoundationStone } from '@/types/assessment';
import Stone from './Stone';

interface StoneSetProps {
  stones: FoundationStone[];
  onStoneSelect: (stone: FoundationStone) => void;
  selectedStoneId?: number | null;
}

/**
 * Stone Set Component
 * 
 * Displays a set of three foundation stones for selection.
 * Users must choose one stone from each set.
 * 
 * Implementation based on tech_spec_v2.md - Section 3.2 and content_spec.md - Section 1.1
 */
const StoneSet: React.FC<StoneSetProps> = ({
  stones,
  onStoneSelect,
  selectedStoneId
}) => {
  if (!stones || stones.length === 0) {
    return (
      <div className="stone-set-empty">
        <p>No stones available for selection.</p>
      </div>
    );
  }

  return (
    <div className="stone-set">
      <div className="stone-set-instruction">
        Select one foundation stone that best represents you
      </div>
      
      <div className="stones-container">
        {stones.map((stone) => (
          <motion.div
            key={stone.id}
            className="stone-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.1 * (stone.id % 3)
            }}
          >
            <Stone
              stone={stone}
              isSelected={stone.id === selectedStoneId}
              onClick={() => onStoneSelect(stone)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoneSet;