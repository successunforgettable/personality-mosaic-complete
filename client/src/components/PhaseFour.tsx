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

// Draggable token component (following spec section 5.2.1)
const DraggableToken = ({ element, source, onDragEnd }: { 
  element: DetailElement, 
  source: Container,
  onDragEnd: (element: DetailElement, source: Container, destination: Container) => void 
}) => {
  const { drag, isDragging } = useDragAndDrop({
    type: 'element',
    item: { id: element.id, source },
    onDrop: (destination: Container) => {
      if (destination !== source) {
        console.log(`Moving element ${element.id} from ${source} to ${destination}`);
        onDragEnd(element, source, destination);
      }
    }
  });

  return (
    <motion.div
      ref={drag}
      className={`rounded-full w-8 h-8 flex items-center justify-center cursor-grab 
                border border-white shadow-md ${isDragging ? 'opacity-50 scale-110' : 'opacity-100'} 
                ${source === 'selfPreservation' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  source === 'oneToOne' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  source === 'social' ? 'bg-gradient-to-br from-purple-400 to-purple-600' : 
                  'bg-gradient-to-br from-gray-400 to-gray-600'}`}
      whileHover={{ scale: 1.1, boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}
      animate={{ 
        scale: isDragging ? 1.1 : [1, 1.05, 1], 
        boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)' 
      }}
      transition={{ 
        scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        boxShadow: { duration: 0.2 } 
      }}
    >
      <span className="material-icons text-white text-sm">{element.icon}</span>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-medium text-gray-700">{element.name}</span>
      </div>
    </motion.div>
  );
};

// Drop target component (following spec section 5.2.2)
const DropTarget = ({ 
  container, 
  title, 
  description, 
  elements,
  onDrop 
}: {
  container: Container,
  title: string,
  description: string,
  elements: DetailElement[],
  onDrop: (containerId: Container) => void
}) => {
  const { drop, isOver } = useDragAndDrop({
    type: 'element',
    accept: 'element',
    onDrop: () => onDrop(container)
  });

  // Calculate fill percentage (0-10 elements)
  const fillPercentage = (elements.length / 10) * 100;
  
  // Background colors based on container type (spec section 5.2.2)
  const getBgColor = () => {
    if (container === 'selfPreservation') return 'bg-green-100';
    if (container === 'oneToOne') return 'bg-blue-100';
    if (container === 'social') return 'bg-purple-100';
    return 'bg-gray-100';
  };

  return (
    <div
      ref={drop}
      className={`rounded-lg p-4 ${isOver ? 'border-2 border-primary-400 bg-primary-50' : 'border border-dashed border-gray-300'}
                relative overflow-hidden`}
      style={{ minHeight: '120px' }}
    >
      {/* Fill background based on number of elements */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ease-out ${getBgColor()}`}
        style={{ width: `${fillPercentage}%`, opacity: 0.4 }}
      />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
            <span className="text-xs font-medium text-primary-600">{elements.length}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-4 min-h-20 items-center justify-center">
          {elements.map(element => (
            <DraggableToken 
              key={element.id} 
              element={element} 
              source={container}
              onDragEnd={(element, source, destination) => {
                const { moveElement } = useAssessment();
                moveElement(element, source, destination);
              }}
            />
          ))}
          
          {elements.length === 0 && (
            <div className="flex items-center justify-center h-16 w-full text-gray-400 italic text-sm bg-white bg-opacity-50 rounded border border-dashed border-gray-300">
              Drop elements here
            </div>
          )}
        </div>

        {/* Token meanings tooltip */}
        {elements.length > 0 && (
          <div className="mt-4 text-xs text-gray-500">
            <span className="font-medium">Elements:</span> {elements.map(e => e.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

const PhaseFour = () => {
  const { state, moveElement, generateResult, setPhase } = useAssessment();
  const { detailElements, stateDistribution } = state;
  
  // Calculate subtype distribution for visualization (spec section 5.4)
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
  
  // Handle element move 
  const handleElementMove = (element: DetailElement, source: Container, destination: Container) => {
    console.log(`PhaseFour - Moving element from ${source} to ${destination}`, element);
    moveElement(element, source, destination);
  };
  
  const handleComplete = () => {
    generateResult();
  };
  
  const allElementsAssigned = detailElements.unassigned.length === 0;
  
  // Get dominant subtype (per spec section 5.4)
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

  // Tooltip content for a token
  const getTokenTooltip = (element: DetailElement): string => {
    return iconMeanings[element.icon] || element.name;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">
            Decorate Your Tower
          </h2>
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
                <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-center">
                    {detailElements.unassigned.map(element => (
                      <div key={element.id} className="flex justify-center">
                        <DraggableToken 
                          element={element} 
                          source="unassigned"
                          onDragEnd={handleElementMove}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 italic border border-dashed border-gray-300 rounded-lg">
                  <p>All elements have been assigned!</p>
                </div>
              )}

              <div className="mt-2 text-xs text-gray-500">
                <p className="mb-2">
                  <strong>Tip:</strong> Drag each element to the container that best represents where you focus your energy.
                </p>
                <p>
                  <strong>Element meanings:</strong> 
                  {Object.entries(iconMeanings).map(([icon, meaning], i) => (
                    <span key={i} className="mx-1">
                      <span className="material-icons text-xs align-middle">{icon}</span> = {meaning}.
                    </span>
                  ))}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <DropTarget 
                container="selfPreservation"
                title="Self-Preservation"
                description="Elements focused on physical security, health, domestic concerns, and material comfort"
                elements={detailElements.selfPreservation}
                onDrop={(container) => {
                  console.log('DropTarget received drop', container);
                }}
              />
              
              <DropTarget 
                container="oneToOne"
                title="One-to-One"
                description="Elements focused on close personal relationships, intimacy, and individual connections"
                elements={detailElements.oneToOne}
                onDrop={(container) => {
                  console.log('DropTarget received drop', container);
                }}
              />
              
              <DropTarget 
                container="social"
                title="Social"
                description="Elements focused on group dynamics, communities, and broader social structures"
                elements={detailElements.social}
                onDrop={(container) => {
                  console.log('DropTarget received drop', container);
                }}
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