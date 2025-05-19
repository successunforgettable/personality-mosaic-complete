import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { DetailElement, Container, SubtypeDistribution } from '@/types/assessment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import TowerVisualization from './TowerVisualization';

// Centralized state for the last dragged element
let lastDraggedElement: {
  element: DetailElement | null;
  source: Container | null;
} = {
  element: null,
  source: null
};

// Draggable token component
const DraggableToken = ({ 
  element, 
  source, 
  onDragStart,
  onDragEnd 
}: { 
  element: DetailElement;
  source: Container;
  onDragStart?: (element: DetailElement, source: Container) => void;
  onDragEnd: (element: DetailElement, source: Container, destination: Container) => void;
}) => {
  const { drag, isDragging } = useDragAndDrop({
    type: 'element',
    item: { id: element.id, source },
    onDrop: (destination: Container) => {
      if (destination !== source) {
        onDragEnd(element, source, destination);
      }
    }
  });

  // Notify parent when dragging starts
  useEffect(() => {
    if (isDragging && onDragStart) {
      onDragStart(element, source);
      lastDraggedElement = { element, source };
    }
  }, [isDragging, element, source, onDragStart]);

  return (
    <div
      ref={drag}
      className={`rounded-full w-9 h-9 flex items-center justify-center shadow-md cursor-grab 
                border border-white ${isDragging ? 'opacity-30' : 'opacity-100'} 
                ${source === 'selfPreservation' ? 'bg-green-500' :
                  source === 'oneToOne' ? 'bg-blue-500' :
                  source === 'social' ? 'bg-purple-500' : 'bg-gray-400'}`}
    >
      <span className="text-white text-sm material-icons">{element.icon}</span>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-medium text-gray-700">{element.name}</span>
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
  
  const handleElementMove = (element: DetailElement, source: Container, destination: Container) => {
    moveElement(element, source, destination);
  };
  
  const handleElementDragStart = (element: DetailElement, source: Container) => {
    console.log('Started dragging:', element.name, 'from', source);
  };
  
  const handleComplete = () => {
    generateResult();
  };
  
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

  // Drop target component
  const DropTarget = ({ 
    container, 
    title, 
    description, 
    elements 
  }: {
    container: Container;
    title: string;
    description: string;
    elements: DetailElement[];
  }) => {
    const { drop, isOver } = useDragAndDrop({
      type: 'element',
      accept: 'element',
      onDrop: () => {
        if (lastDraggedElement.element && lastDraggedElement.source) {
          handleElementMove(
            lastDraggedElement.element, 
            lastDraggedElement.source, 
            container
          );
        }
      }
    });

    // Calculate fill percentage
    const fillPercentage = (elements.length / 10) * 100;
    
    return (
      <div
        ref={drop}
        className={`rounded-lg p-4 ${isOver ? 'border-2 border-blue-400 bg-blue-50' : 'border border-dashed border-gray-300'}
                   relative overflow-hidden`}
        style={{ minHeight: '120px' }}
      >
        {/* Fill background based on container type */}
        <div 
          className={`absolute inset-0 ${
            container === 'selfPreservation' ? 'bg-green-100' :
            container === 'oneToOne' ? 'bg-blue-100' :
            container === 'social' ? 'bg-purple-100' : 'bg-gray-100'
          }`}
          style={{ width: `${fillPercentage}%`, opacity: 0.4 }}
        />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
              <span className="text-xs font-medium text-blue-600">{elements.length}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-4 min-h-16 items-center justify-center">
            {elements.map(element => (
              <DraggableToken 
                key={element.id} 
                element={element} 
                source={container}
                onDragStart={handleElementDragStart}
                onDragEnd={handleElementMove}
              />
            ))}
            
            {elements.length === 0 && (
              <div className="flex items-center justify-center h-16 w-full text-gray-400 italic text-sm bg-white bg-opacity-50 rounded border border-dashed border-gray-300">
                Drop elements here
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Decorate Your Tower</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Drag and drop these detail elements into the three containers that best represent how you focus your energy and attention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-5 h-full">
              <h3 className="font-semibold text-gray-900 mb-4">Your Tower</h3>
              <div className="flex justify-center mb-4">
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

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Available Elements</h3>
              
              {detailElements.unassigned.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-center p-4 border border-dashed border-gray-300 rounded-lg">
                  {detailElements.unassigned.map(element => (
                    <DraggableToken 
                      key={element.id} 
                      element={element} 
                      source="unassigned"
                      onDragStart={handleElementDragStart}
                      onDragEnd={handleElementMove}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 italic border border-dashed border-gray-300 rounded-lg">
                  <p>All elements have been assigned!</p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <DropTarget 
                container="selfPreservation"
                title="Self-Preservation"
                description="Elements focused on physical security, health, domestic concerns, and material comfort"
                elements={detailElements.selfPreservation}
              />
              
              <DropTarget 
                container="oneToOne"
                title="One-to-One"
                description="Elements focused on close personal relationships, intimacy, and individual connections"
                elements={detailElements.oneToOne}
              />
              
              <DropTarget 
                container="social"
                title="Social"
                description="Elements focused on group dynamics, communities, and broader social structures"
                elements={detailElements.social}
              />
            </div>
          </div>
        </div>

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