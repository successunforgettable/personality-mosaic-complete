import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import ProgressBar from '@/components/ProgressBar';
import PhaseOne from '@/components/PhaseOne';
import PhaseTwo from '@/components/PhaseTwo';
import PhaseThree from '@/components/PhaseThree';
import PhaseFour from '@/components/PhaseFour';
import Results from '@/components/Results';

const Assessment = () => {
  const { state, resetAssessment } = useAssessment();
  const { phase } = state;
  
  // Reset assessment when component mounts
  useEffect(() => {
    resetAssessment();
  }, []);
  
  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      {phase < 5 && <ProgressBar />}
      
      <AnimatePresence mode="wait">
        {phase === 1 && <PhaseOne key="phase-1" />}
        {phase === 2 && <PhaseTwo key="phase-2" />}
        {phase === 3 && <PhaseThree key="phase-3" />}
        {phase === 4 && <PhaseFour key="phase-4" />}
        {phase === 5 && <Results key="results" />}
      </AnimatePresence>
    </div>
  );
};

export default Assessment;
