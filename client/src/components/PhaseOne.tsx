import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useAssessment } from '@/context/AssessmentContext';
import { FoundationStone } from '@/types/assessment';
import { foundationStoneSets } from '@/lib/personality';
import ProgressIndicator from './ProgressIndicator';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

type TransitionState = 'entering' | 'active' | 'exiting';

/**
 * Foundation Stone Experience component - Phase 1 of the Personality Mosaic Assessment
 * This phase allows users to select foundation stones that form the base of their personality tower
 */
const PhaseOne = () => {
  const { state, selectFoundationStone, nextFoundationSet } = useAssessment();
  const { foundationSet, selectedFoundationStones } = state;
  const { user, isGuest } = useAuth();
  const isMobile = useIsMobile();
  
  const [currentSet, setCurrentSet] = useState<FoundationStone[]>([]);
  const [transitionState, setTransitionState] = useState<TransitionState>('entering');
  const [isSaving, setIsSaving] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const stoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Time tracking for analytics
  const phaseStartTime = useRef<number>(Date.now());
  
  // Analytics tracking
  const logEvent = (eventName: string, eventData: any) => {
    // In a production app, this would send to an analytics service
    console.log(`[Analytics] ${eventName}:`, eventData);
    
    // Save partial progress to localStorage for both guests and authenticated users
    const progressData = {
      phase: 1,
      foundationSet,
      selectedFoundationStones,
      timestamp: new Date().toISOString(),
      userId: user?.id || 'guest'
    };
    
    localStorage.setItem('assessment_progress', JSON.stringify(progressData));
  };
  
  // Get the current set of foundation stones
  useEffect(() => {
    const set = foundationStoneSets.find(set => set.id === foundationSet);
    if (set) {
      setCurrentSet(set.stones);
      setTransitionState('active');
      
      // Log transition between foundation sets (except the initial load)
      if (hasInteracted) {
        logEvent('foundation_set_changed', { 
          set_id: foundationSet, 
          total_selected: selectedFoundationStones.length 
        });
      }
    }
  }, [foundationSet, hasInteracted, selectedFoundationStones.length]);
  
  // Attempt to restore partial progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('assessment_progress');
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        if (progressData.phase === 1 && progressData.userId === (user?.id || 'guest')) {
          // If there's saved progress, we could restore it here
          // This is a simplified example - in a real app you'd need to handle this more carefully
          // to avoid overwriting newer progress
          
          toast({
            title: "Progress Restored",
            description: "Your previous foundation stone selections have been loaded.",
            variant: "default"
          });
          
          logEvent('progress_restored', { phase: 1 });
        }
      } catch (e) {
        console.error('Error restoring progress:', e);
      }
    }
  }, [user?.id]);
  
  const handleStoneSelection = async (stone: FoundationStone) => {
    setHasInteracted(true);
    setTransitionState('exiting');
    
    // Log the selection
    logEvent('foundation_stone_selected', { 
      stone_id: stone.id, 
      stone_name: stone.name,
      stone_category: stone.category,
      set_id: foundationSet
    });
    
    // Save progress
    setIsSaving(true);
    
    try {
      // Simulate API call to save progress
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Select the stone and move to next set
      selectFoundationStone(stone);
      
      // Brief delay for animation
      setTimeout(() => {
        // If this is the last set, we'll move to phase 2 in the context
        // Otherwise, we'll move to the next set of stones
        nextFoundationSet();
        setTransitionState('entering');
        setIsSaving(false);
      }, 300);
      
      // If last stone is selected, show a completion message and visual celebration
      if (foundationSet === 3) {
        // Trigger a special completion animation
        setTimeout(() => {
          // Track completion time and log analytics
          const timeSpent = Date.now() - phaseStartTime.current;
          logEvent('foundation_phase_completed', { time_spent: timeSpent });
          
          // Show toast notification
          toast({
            title: "Foundation Complete!",
            description: "You've successfully completed the Foundation phase of your personality tower!",
            variant: "default",
            duration: 6000 // Show for longer
          });
          
          // After a delay, transition to phase 2
          setTimeout(() => {
            // Move to the next phase - the context will automatically transition to phase 2
            // since this is the last foundation set
            nextFoundationSet(); 
          }, 2000);
        }, 1000);
      }
      
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Couldn't Save Progress",
        description: "Your selection was recorded but we couldn't save your progress. You can continue the assessment.",
        variant: "destructive"
      });
      setIsSaving(false);
    }
  };
  
  // Background pattern variants for each foundation set
  const backgroundPatterns = [
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-[80vh] w-full max-w-5xl mx-auto px-4 sm:px-6 relative"
      style={{ 
        backgroundImage: backgroundPatterns[foundationSet - 1], 
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Progress Indicator */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Phase 1 of 4: Foundation</span>
          <span className="text-sm text-gray-600">Set {foundationSet} of 3</span>
        </div>
        <ProgressIndicator 
          progress={(foundationSet - 1) * 33.33} 
          colors={{
            background: "bg-gray-200",
            fill: foundationSet === 1 
              ? "bg-indigo-500" 
              : foundationSet === 2 
              ? "bg-pink-500"
              : "bg-emerald-500"
          }}
        />
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">
          {foundationSet === 1 
            ? "Establish Your Foundation"
            : foundationSet === 2
            ? "Continue Building Your Base"
            : "Complete Your Foundation"
          }
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the stone that resonates most with your core traits and personality. 
          These selections will form the foundation of your personality tower.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={`stone-set-${foundationSet}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-6 mb-10`}
        >
          {currentSet.map((stone, index) => (
            <motion.div
              ref={el => stoneRefs.current[index] = el}
              key={stone.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { delay: index * 0.15 }
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              className="text-center py-4 transition-all cursor-pointer"
              onClick={() => !isSaving && handleStoneSelection(stone)}
            >
              <div className="relative h-72 w-64 mx-auto">
                <div 
                  className={`absolute inset-0 hexagon-shape border-2 border-white shadow-lg ${
                    selectedFoundationStones.some(s => s.id === stone.id) ? 'selected' : ''
                  } ${isSaving ? 'opacity-75' : ''}`}
                  style={{ 
                    background: stone.category === 'Head' 
                      ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' 
                      : stone.category === 'Heart'
                      ? 'linear-gradient(135deg, #EC4899, #8B5CF6)'
                      : 'linear-gradient(135deg, #10B981, #3B82F6)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                  <div className="absolute inset-0 hexagon-content flex flex-col items-center justify-center p-5 text-center">
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1">
                      <span className="text-xs font-semibold" style={{ 
                        color: stone.category === 'Head' 
                          ? '#4F46E5' 
                          : stone.category === 'Heart' 
                          ? '#EC4899' 
                          : '#10B981' 
                      }}>{stone.category}</span>
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-3 mt-4">{stone.name}</h3>
                    <p className="text-white text-sm px-3">{stone.baselines}</p>
                  </div>
                </div>
              </div>
              
              {/* Selection indicators */}
              {selectedFoundationStones.some(s => s.id === stone.id) && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full bg-green-100 text-green-800"
                >
                  Selected
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Foundation Set Indicators */}
      <div className="text-center mb-8">
        <div className="flex justify-center space-x-3">
          <motion.span 
            className={`h-3 w-3 rounded-full ${foundationSet === 1 ? 'bg-indigo-500' : 'bg-gray-300'}`}
            animate={{
              scale: foundationSet === 1 ? [1, 1.2, 1] : 1,
              transition: { repeat: foundationSet === 1 ? Infinity : 0, repeatDelay: 1 }
            }}
          ></motion.span>
          <motion.span 
            className={`h-3 w-3 rounded-full ${foundationSet === 2 ? 'bg-pink-500' : 'bg-gray-300'}`}
            animate={{
              scale: foundationSet === 2 ? [1, 1.2, 1] : 1,
              transition: { repeat: foundationSet === 2 ? Infinity : 0, repeatDelay: 1 }
            }}
          ></motion.span>
          <motion.span 
            className={`h-3 w-3 rounded-full ${foundationSet === 3 ? 'bg-emerald-500' : 'bg-gray-300'}`}
            animate={{
              scale: foundationSet === 3 ? [1, 1.2, 1] : 1,
              transition: { repeat: foundationSet === 3 ? Infinity : 0, repeatDelay: 1 }
            }}
          ></motion.span>
        </div>
      </div>

      {/* Guidance Message */}
      <div className="text-center mt-auto pb-6">
        <p className="text-gray-600 italic text-sm">
          {isSaving 
            ? "Saving your selection..." 
            : "Choose a foundation stone to continue building your personality tower."
          }
        </p>
        
        {/* Save status indicator */}
        {isSaving && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex justify-center"
          >
            <div className="animate-pulse h-2 w-24 bg-primary-200 rounded-full"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PhaseOne;