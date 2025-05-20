import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  height?: number;
  colors?: {
    background: string;
    fill: string;
  }
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  showPercentage = false,
  height = 8,
  colors = {
    background: "bg-gray-200",
    fill: "bg-primary-500"
  }
}) => {
  // Ensure progress is between 0-100
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="w-full">
      <div className={`w-full ${colors.background} rounded-full overflow-hidden`} style={{ height: `${height}px` }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 20
          }}
          className={`h-full ${colors.fill} rounded-full`}
        />
      </div>
      
      {showPercentage && (
        <div className="text-right mt-1">
          <span className="text-xs font-medium text-gray-600">
            {Math.round(safeProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;