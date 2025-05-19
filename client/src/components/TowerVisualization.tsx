import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { StateDistribution, SubtypeDistribution, PersonalityType } from '@/types/assessment';

interface TowerVisualizationProps {
  stateDistribution?: StateDistribution;
  subtypeDistribution?: SubtypeDistribution;
  personalityType?: PersonalityType;
  showHotspots?: boolean;
}

const TowerVisualization = ({ 
  stateDistribution, 
  subtypeDistribution,
  personalityType,
  showHotspots = false 
}: TowerVisualizationProps) => {
  const { state } = useAssessment();
  const { 
    selectedFoundationStones, 
    selectedBuildingBlocks, 
    stateDistribution: contextStateDistribution
  } = state;
  
  // Use provided distribution or fallback to context
  const distribution = stateDistribution || contextStateDistribution;
  
  // Calculate colors based on state distribution (using the 5 state system)
  const veryGoodColor = `rgba(34, 197, 94, ${distribution.veryGood / 100})`; // #22c55e
  const goodColor = `rgba(16, 185, 129, ${distribution.good / 100})`; // #10b981
  const averageColor = `rgba(245, 158, 11, ${distribution.average / 100})`; // #f59e0b
  const belowAverageColor = `rgba(249, 115, 22, ${distribution.belowAverage / 100})`; // #f97316
  const destructiveColor = `rgba(239, 68, 68, ${distribution.destructive / 100})`; // #ef4444
  
  // Tower style based on progression
  const renderFoundation = () => {
    if (selectedFoundationStones.length === 0) {
      return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-gray-200 rounded-full border border-gray-300"></div>
      );
    }
    
    return (
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-primary-200 rounded-full border border-primary-300 shadow-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  };
  
  const renderBlocks = () => {
    if (selectedBuildingBlocks.length === 0) return null;
    
    // Tower height calculation
    const towerHeight = 180; // Total height of tower in pixels
    
    // Tower block widths - decreasing as they go up
    const baseWidth = 36;
    const blockWidths = [baseWidth, baseWidth - 4, baseWidth - 8, baseWidth - 12];
    
    // Number of blocks to display (based on progress)
    const numBlocks = Math.min(4, selectedBuildingBlocks.length);
    
    // Calculate tower structure
    const blocks = [];
    let currentBottom = 12; // Start above foundation
    
    for (let i = 0; i < numBlocks; i++) {
      const width = blockWidths[i];
      const height = towerHeight / numBlocks;
      const opacity = 1 - (i * 0.1); // Slightly decrease opacity for higher blocks
      
      blocks.push(
        <motion.div 
          key={i}
          className="absolute left-1/2 transform -translate-x-1/2 rounded-lg shadow-md overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
          style={{
            bottom: currentBottom,
            width: `${width}%`,
            height: height,
            opacity
          }}
        >
          {/* State segments within each block */}
          <div className="flex flex-col h-full w-full">
            {/* Very Good segment (Green) */}
            {distribution.veryGood > 0 && (
              <div 
                className="bg-green-500" 
                style={{ 
                  height: `${(distribution.veryGood / 100) * 100}%`,
                  opacity: 0.9 + (0.1 * (numBlocks - i) / numBlocks) // Higher blocks slightly more transparent
                }} 
              />
            )}
            
            {/* Good segment (Emerald) */}
            {distribution.good > 0 && (
              <div 
                className="bg-emerald-500" 
                style={{ 
                  height: `${(distribution.good / 100) * 100}%`,
                  opacity: 0.85 + (0.1 * (numBlocks - i) / numBlocks)
                }} 
              />
            )}
            
            {/* Average segment (Amber) */}
            {distribution.average > 0 && (
              <div 
                className="bg-amber-500" 
                style={{ 
                  height: `${(distribution.average / 100) * 100}%`,
                  opacity: 0.85 + (0.1 * (numBlocks - i) / numBlocks)
                }} 
              />
            )}
            
            {/* Below Average segment (Orange) */}
            {distribution.belowAverage > 0 && (
              <div 
                className="bg-orange-500" 
                style={{ 
                  height: `${(distribution.belowAverage / 100) * 100}%`,
                  opacity: 0.8 + (0.1 * (numBlocks - i) / numBlocks)
                }} 
              />
            )}
            
            {/* Destructive segment (Red) */}
            {distribution.destructive > 0 && (
              <div 
                className="bg-red-500" 
                style={{ 
                  height: `${(distribution.destructive / 100) * 100}%`,
                  opacity: 0.8 + (0.1 * (numBlocks - i) / numBlocks)
                }} 
              />
            )}
          </div>
          
          {/* Add subtype decoration on the sides */}
          {subtypeDistribution && i === 0 && (
            <>
              {/* Self-Preservation indicator */}
              {subtypeDistribution.selfPreservation > 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-600" 
                  style={{ opacity: Math.min(1, subtypeDistribution.selfPreservation / 50) }}></div>
              )}
              
              {/* One-to-One indicator */}
              {subtypeDistribution.oneToOne > 0 && (
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-600" 
                  style={{ opacity: Math.min(1, subtypeDistribution.oneToOne / 50) }}></div>
              )}
              
              {/* Social indicator */}
              {subtypeDistribution.social > 0 && (
                <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-purple-600" 
                  style={{ opacity: Math.min(1, subtypeDistribution.social / 50) }}></div>
              )}
            </>
          )}
        </motion.div>
      );
      
      currentBottom += height;
    }
    
    return <>{blocks}</>;
  };
  
  const renderHotspots = () => {
    if (!showHotspots) return null;
    
    return (
      <>
        <motion.div 
          className="absolute bottom-4 left-4 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-icons text-primary-600">foundation</span>
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-4 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-icons text-secondary-600">view_in_ar</span>
        </motion.div>
        <motion.div 
          className="absolute top-4 left-1/3 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-icons text-green-600">palette</span>
        </motion.div>
      </>
    );
  };
  
  const renderFinalTower = () => {
    if (!personalityType) return null;
    
    return (
      <div className="w-full h-full rounded-lg shadow-lg overflow-hidden relative">
        <div 
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, 
              rgba(34, 197, 94, ${distribution.veryGood / 100}), 
              rgba(16, 185, 129, ${distribution.good / 100}), 
              rgba(245, 158, 11, ${distribution.average / 100}),
              rgba(249, 115, 22, ${distribution.belowAverage / 100}),
              rgba(239, 68, 68, ${distribution.destructive / 100}))`
          }}
        >
          {/* Mosaic pattern overlay */}
          <div className="absolute inset-0 opacity-30 bg-white" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Tower shadow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black opacity-20 rounded-full blur-sm"></div>
        
        {renderHotspots()}
      </div>
    );
  };

  return (
    <div className="w-64 h-64 relative">
      {personalityType ? renderFinalTower() : (
        <>
          {renderFoundation()}
          {renderBlocks()}
        </>
      )}
    </div>
  );
};

export default TowerVisualization;