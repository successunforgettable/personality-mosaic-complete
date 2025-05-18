import { useState } from "react";
import { motion } from "framer-motion";
import { useAssessment } from "@/context/AssessmentContext";
import { BuildingBlock, BuildingBlockPair } from "@/types/assessment";
import { buildingBlockPairs } from "@/lib/personality";
import TowerVisualization from "./TowerVisualization";

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
  
  // Filter out pairs that have already been selected
  const remainingPairs = buildingBlockPairs.filter(pair => !selectedPairs.includes(pair.id));
  
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

      <div className="space-y-8 mb-10">
        {remainingPairs.slice(0, 2).map((pair) => (
          <motion.div
            key={pair.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">{pair.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50 transition-all"
                onClick={() => handleBlockSelection(pair.blockA, pair.id)}
              >
                <div className="flex items-start mb-3">
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">{pair.blockA.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{pair.blockA.description}</p>
                  </div>
                </div>
                <div className="ml-9">
                  <div className="h-20 w-full overflow-hidden rounded-lg">
                    <img src={pair.blockA.image} alt={`${pair.blockA.name} block`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50 transition-all"
                onClick={() => handleBlockSelection(pair.blockB, pair.id)}
              >
                <div className="flex items-start mb-3">
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">{pair.blockB.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{pair.blockB.description}</p>
                  </div>
                </div>
                <div className="ml-9">
                  <div className="h-20 w-full overflow-hidden rounded-lg">
                    <img src={pair.blockB.image} alt={`${pair.blockB.name} block`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
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
