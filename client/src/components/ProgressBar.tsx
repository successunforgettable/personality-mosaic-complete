import { motion } from "framer-motion";
import { useAssessment } from "@/context/AssessmentContext";

const ProgressBar = () => {
  const { state } = useAssessment();
  const { phase } = state;
  
  const progressPercentage = (phase / 4) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="font-medium text-gray-800">Your Progress</span>
        <span className="text-gray-500">Phase {phase} of 4</span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span className={phase >= 1 ? "font-medium text-primary" : ""}>Foundation Stone</span>
        <span className={phase >= 2 ? "font-medium text-primary" : ""}>Building Blocks</span>
        <span className={phase >= 3 ? "font-medium text-primary" : ""}>Color Palette</span>
        <span className={phase >= 4 ? "font-medium text-primary" : ""}>Detail Elements</span>
      </div>
    </div>
  );
};

export default ProgressBar;
