import { useState } from "react";
import { motion } from "framer-motion";
import { useAssessment } from "@/context/AssessmentContext";
import { BuildingBlock, BuildingBlockPair } from "@/types/assessment";
import { buildingBlockPairs } from "@/lib/personality";
import TowerVisualization from "./TowerVisualization";
import BuildingBlockExperience from "./BuildingBlocks/BuildingBlockExperience";

const PhaseTwo = () => {
  const { state, selectBuildingBlock, setPhase } = useAssessment();
  const { selectedBuildingBlocks } = state;
  
  const [selectedPairs, setSelectedPairs] = useState<number[]>([]);
  
  const handleBlockSelection = (block: BuildingBlock, pairId: number) => {
    if (selectedPairs.includes(pairId)) return;
    
    selectBuildingBlock(block);
    setSelectedPairs([...selectedPairs, pairId]);
    
    // If all pairs have been selected, move to the next phase
    if (selectedPairs.length + 1 === buildingBlockPairs.length) {
      setTimeout(() => {
        setPhase(3);
      }, 1000);
    }
  };
  
  // Handle completion of building blocks phase
  const handleBuildingBlocksComplete = (selectedBlocks: any[]) => {
    console.log('Building blocks selected:', selectedBlocks);
    
    // Process the selected blocks
    selectedBlocks.forEach(selection => {
      const block = selection.block;
      const pairId = selection.pairId;
      
      // Add to context
      selectBuildingBlock({
        id: block.id,
        name: block.name,
        description: block.description
      } as BuildingBlock);
    });
    
    // Move to the next phase after a short delay
    setTimeout(() => {
      setPhase(3);
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-fade-in"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Choose Your Building Blocks</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">These blocks will define the structure of your personality tower. Select which statement in each pair feels more authentic to you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="md:col-span-2">
          <BuildingBlockExperience onComplete={handleBuildingBlocksComplete} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Tower</h3>
          <p className="text-gray-600 text-sm">Watch your personality tower grow with each selection</p>
        </div>

        <TowerVisualization />
      </div>

      <div className="flex justify-between">
        <button 
          className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
          onClick={() => setPhase(1)}
        >
          Previous Phase
        </button>
        <button 
          className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all"
          onClick={() => setPhase(3)}
          disabled={selectedPairs.length < 2}
        >
          Continue to Color Palette
        </button>
      </div>
    </motion.div>
  );
};

export default PhaseTwo;
