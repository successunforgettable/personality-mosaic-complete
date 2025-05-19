import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { DetailElement, Container, SubtypeDistribution } from '@/types/assessment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import TowerVisualization from './TowerVisualization';

// Map icons to more descriptive labels
const iconMeanings: Record<string, string> = {
  'favorite': 'Emotional Connection',
  'school': 'Learning & Growth',
  'home': 'Safe Haven & Comfort',
  'groups': 'Community & Belonging',
  'person': 'Individual Identity',
  'psychology': 'Self-reflection',
  'favorite_border': 'Relationships',
  'spa': 'Wellness',
  'work': 'Achievement',
  'public': 'Social Influence'
};

// Draggable token component
const DraggableElement = ({ 
  element, 
  sourceContainer,
  onElementMoved
}: { 
  element: DetailElement;
  sourceContainer: Container;
  onElementMoved: (element: DetailElement, source: Container, destination: Container) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const { drag, isDragging: dragState } = useDragAndDrop({
    type: 'element',
    item: { id: element.id, source: sourceContainer },
    onDrop: (destination: Container) => {
      if (destination && destination !== sourceContainer) {
        onElementMoved(element, sourceContainer, destination);
      }
    }
  });
  
  // Update local dragging state when dragState changes
  useEffect(() => {
    setIsDragging(dragState);
  }, [dragState]);

  return (
    <motion.div
      ref={drag}
      className={`
        rounded-full w-10 h-10 
        flex items-center justify-center 
        cursor-grab
        border-2 border-white 
        shadow-md 
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${sourceContainer === 'selfPreservation' ? 'bg-green-500' : 
          sourceContainer === 'oneToOne' ? 'bg-blue-500' : 
          sourceContainer === 'social' ? 'bg-purple-500' : 'bg-gray-400'}
      `}
      whileHover={{ scale: 1.1, boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}
      animate={{ 
        scale: isDragging ? 1.1 : 1, 
      }}
      transition={{ 
        duration: 0.2 
      }}
    >
      <span className="material-icons text-white">{element.icon}</span>
      {!isDragging && (
        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-center w-24">
          <div className="text-xs font-medium text-gray-700">{element.name}</div>
          <div className="text-xs text-gray-500">{iconMeanings[element.icon]}</div>
        </div>
      )}
    </motion.div>
  );
};

// Drop container component
const DropContainer = ({ 
  containerId, 
  title, 
  description, 
  elements 
}: {
  containerId: Container;
  title: string;
  description: string;
  elements: DetailElement[];
}) => {
  const { isOver, drop } = useDragAndDrop({
    type: 'droppable',
    accept: 'element',
    containerId,
    onDrop: () => {
      // The actual movement happens in the draggable component
      console.log('Drop detected in container:', containerId);
    }
  });

  // Calculate fill percentage
  const fillPercentage = elements.length * 10; // 10 elements = 100%

  return (
    <div 
      ref={drop}
      className={`
        rounded-lg p-4 relative 
        ${isOver ? 'border-2 border-blue-400 bg-blue-50' : 'border border-dashed border-gray-300'}
        overflow-hidden transition-all duration-300
      `}
      style={{ minHeight: '150px' }}
    >
      {/* Background fill based on how many elements */}
      <div 
        className={`
          absolute inset-0
          ${containerId === 'selfPreservation' ? 'bg-green-100' :
            containerId === 'oneToOne' ? 'bg-blue-100' :
            containerId === 'social' ? 'bg-purple-100' : 'bg-gray-100'} 
          transition-all duration-500 ease-out
        `}
        style={{ 
          width: `${fillPercentage}%`, 
          opacity: fillPercentage > 0 ? 0.3 : 0 
        }}
      />
      
      {/* Container content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
            <span className="text-xs font-medium text-blue-600">{elements.length}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-6 justify-center items-center min-h-20 py-2">
          {elements.length === 0 && !isOver && (
            <div className="text-center text-gray-400 italic text-sm">
              Drop elements here
            </div>
          )}
          
          {elements.length === 0 && isOver && (
            <div className="text-center text-blue-500 font-medium text-sm animate-pulse">
              Drop here!
            </div>
          )}
          
          {elements.map(element => (
            <div key={element.id} className="pt-4 pb-8">
              <DraggableElement
                element={element}
                sourceContainer={containerId}
                onElementMoved={(element, source, destination) => {
                  // Using the AssessmentContext moveElement function
                  const { moveElement } = useAssessment();
                  moveElement(element, source, destination);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PhaseFour = () => {
  const { state, moveElement, generateResult, setPhase } = useAssessment();
  const { detailElements, stateDistribution } = state;
  
  // Calculate subtype distribution
  const [subtypeDistribution, setSubtypeDistribution] = useState<SubtypeDistribution>({
    selfPreservation: 0,
    oneToOne: 0,
    social: 0
  });
  
  // Update distribution whenever elements change
  useEffect(() => {
    const total = 10; // Total detail elements
    const newDistribution = {
      selfPreservation: Math.round((detailElements.selfPreservation.length / total) * 100),
      oneToOne: Math.round((detailElements.oneToOne.length / total) * 100),
      social: Math.round((detailElements.social.length / total) * 100)
    };
    setSubtypeDistribution(newDistribution);
  }, [detailElements]);
  
  const allElementsAssigned = detailElements.unassigned.length === 0;
  
  // Get dominant subtype
  const getDominantSubtype = (): string => {
    if (subtypeDistribution.selfPreservation >= subtypeDistribution.oneToOne && 
        subtypeDistribution.selfPreservation >= subtypeDistribution.social) {
      return 'Self-Preservation';
    } else if (subtypeDistribution.oneToOne >= subtypeDistribution.selfPreservation && 
               subtypeDistribution.oneToOne >= subtypeDistribution.social) {
      return 'One-to-One';
    } else {
      return 'Social';
    }
  };
  
  // Get Stack Type (dominant vs balanced)
  const getStackType = (): string => {
    const highestScore = Math.max(
      subtypeDistribution.selfPreservation, 
      subtypeDistribution.oneToOne, 
      subtypeDistribution.social
    );
    return highestScore >= 50 ? 'dominant' : 'balanced';
  };
  
  // Handle completing this phase
  const handleComplete = () => {
    generateResult();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pb-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">
            Decorate Your Tower
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Drag and drop these detail elements into the three containers that best represent how you focus your energy and attention.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {/* Tower visualization */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-5 h-full">
              <h3 className="font-semibold text-gray-900 mb-4">Your Tower</h3>
              <div className="flex justify-center mb-6">
                <TowerVisualization 
                  stateDistribution={stateDistribution} 
                  subtypeDistribution={subtypeDistribution}
                />
              </div>
              
              <div className="text-sm text-gray-600 space-y-3 mt-6">
                <p className="font-medium text-gray-800">Your subtype distribution:</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Self-Preservation:</span>
                    <span className="font-medium">{subtypeDistribution.selfPreservation}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${subtypeDistribution.selfPreservation}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>One-to-One:</span>
                    <span className="font-medium">{subtypeDistribution.oneToOne}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${subtypeDistribution.oneToOne}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Social:</span>
                    <span className="font-medium">{subtypeDistribution.social}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${subtypeDistribution.social}%` }}></div>
                  </div>
                </div>
                
                {/* Show stack analysis only when all elements are assigned */}
                {allElementsAssigned && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-medium text-blue-800">Stack Analysis:</p>
                    <p className="text-blue-700">
                      {getStackType() === 'dominant' ? 
                        `${getDominantSubtype()} dominant` : 
                        'Balanced stack'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Main drag-drop area */}
          <div className="md:col-span-2 lg:col-span-3">
            {/* Unassigned elements section */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Available Elements</h3>
              
              <div className="p-4 border border-dashed border-gray-300 rounded-lg min-h-20">
                {detailElements.unassigned.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-10 justify-items-center">
                    {detailElements.unassigned.map(element => (
                      <DraggableElement 
                        key={element.id}
                        element={element}
                        sourceContainer="unassigned"
                        onElementMoved={moveElement}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p className="italic">All elements have been assigned!</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <p><span className="font-medium">Tip:</span> Drag each element to the container that best represents where you focus your energy.</p>
                <p className="mt-1"><span className="font-medium">Icons represent:</span> Emotional Connection, Learning, Home, Community, Identity, Self-reflection, etc.</p>
              </div>
            </div>
            
            {/* Subtype containers */}
            <div className="space-y-6">
              <DropContainer 
                containerId="selfPreservation" 
                title="Self-Preservation"
                description="Elements focused on physical security, health, domestic concerns, and material comfort"
                elements={detailElements.selfPreservation}
              />
              
              <DropContainer 
                containerId="oneToOne"
                title="One-to-One" 
                description="Elements focused on close personal relationships, intimacy, and individual connections"
                elements={detailElements.oneToOne}
              />
              
              <DropContainer 
                containerId="social"
                title="Social" 
                description="Elements focused on group dynamics, communities, and broader social structures"
                elements={detailElements.social}
              />
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button 
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
            onClick={() => setPhase(3)}
          >
            Previous Phase
          </button>
          <button 
            className={`px-6 py-3 ${allElementsAssigned ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} 
              text-white rounded-lg font-medium shadow-md transition-all flex items-center gap-2`}
            onClick={handleComplete}
            disabled={!allElementsAssigned}
          >
            {allElementsAssigned ? (
              <>
                <span className="material-icons text-sm">check_circle</span>
                Complete & View Results
              </>
            ) : (
              <>
                <span className="material-icons text-sm">info</span>
                Assign All Elements to Continue
              </>
            )}
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default PhaseFour;