import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { DetailElement, Container, SubtypeDistribution } from '@/types/assessment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import TowerVisualization from './TowerVisualization';

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
        onDragEnd(element, source, destination);
      }
    }
  });

  // Element colors based on category
  const colors = {
    'selfPreservation': 'from-green-400 to-green-600',
    'oneToOne': 'from-blue-400 to-blue-600',
    'social': 'from-purple-400 to-purple-600',
    'unassigned': 'from-gray-300 to-gray-500'
  };

  return (
    <motion.div
      ref={drag}
      className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[source]}
                text-white flex items-center justify-center cursor-grab shadow-md 
                border border-white ${isDragging ? 'opacity-30 scale-90' : ''}`}
      whileHover={{ scale: 1.1, boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}
      animate={{ 
        scale: isDragging ? 0.9 : [1, 1.05, 1], 
        opacity: isDragging ? 0.5 : 1 
      }}
      transition={{ 
        scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        opacity: { duration: 0.2 } 
      }}
    >
      <span className="material-icons text-xs">{element.icon}</span>
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

  // Calculate fill percentage
  const fillPercentage = (elements.length / 10) * 100;
  
  // Background colors based on container type
  const colors = {
    'selfPreservation': 'bg-green-100',
    'oneToOne': 'bg-blue-100',
    'social': 'bg-purple-100',
  };

  return (
    <div
      ref={drop}
      className={`drop-target rounded-lg p-4 transition-all duration-300
                 ${isOver ? 'border-2 border-primary-400 bg-primary-50' : 'border border-dashed border-gray-300'}
                 relative overflow-hidden`}
      style={{ minHeight: '120px' }}
    >
      {/* Fill background based on number of elements */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ease-out ${colors[container as keyof typeof colors] || 'bg-gray-100'}`}
        style={{ width: `${fillPercentage}%`, opacity: 0.5 }}
      />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
            <span className="text-xs font-medium text-primary-600">{elements.length}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-4">{description}</p>
        
        {elements.length > 0 ? (
          <div className="flex flex-wrap gap-4 min-h-16 items-center justify-center">
            {elements.map(element => (
              <DraggableToken 
                key={element.id} 
                element={element} 
                source={container}
                onDragEnd={(element, source, destination) => {
                  console.log('Moving', element.name, 'from', source, 'to', destination);
                  onDrop(destination);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-16 text-gray-400 italic text-sm border border-dashed border-gray-300 rounded bg-white bg-opacity-50">
            Drop elements here
          </div>
        )}
      </div>
    </div>
  );
};

const PhaseFour = () => {
  const { state, moveElement, generateResult, setPhase } = useAssessment();
  const { detailElements, stateDistribution } = state;
  
  // Calculate subtype distribution for visualization
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
  
  const handleComplete = () => {
    generateResult();
  };
  
  const allElementsAssigned = detailElements.unassigned.length === 0;
  
  // Get dominant subtype for UI styling
  const getDominantSubtype = (): Container => {
    if (subtypeDistribution.selfPreservation >= subtypeDistribution.oneToOne && 
        subtypeDistribution.selfPreservation >= subtypeDistribution.social) {
      return 'selfPreservation';
    } else if (subtypeDistribution.oneToOne >= subtypeDistribution.selfPreservation && 
               subtypeDistribution.oneToOne >= subtypeDistribution.social) {
      return 'oneToOne';
    } else {
      return 'social';
    }
  };
  
  // Get Stack Type (dominant vs balanced) based on algorithm in spec
  const getStackType = (): string => {
    const highestScore = Math.max(
      subtypeDistribution.selfPreservation, 
      subtypeDistribution.oneToOne, 
      subtypeDistribution.social
    );
    return highestScore >= 50 ? 'dominant' : 'balanced';
  };
  
  // Subtype for UI
  const subtypes = [
    {
      id: 'selfPreservation',
      name: 'Self-Preservation',
      description: 'Elements focused on physical security, health, domestic concerns, and material comfort',
      elements: detailElements.selfPreservation,
      color: 'green',
      percentage: subtypeDistribution.selfPreservation
    },
    {
      id: 'oneToOne',
      name: 'One-to-One',
      description: 'Elements focused on close personal relationships, intimacy, and individual connections',
      elements: detailElements.oneToOne,
      color: 'blue',
      percentage: subtypeDistribution.oneToOne
    },
    {
      id: 'social',
      name: 'Social',
      description: 'Elements focused on group dynamics, communities, and broader social structures',
      elements: detailElements.social,
      color: 'purple',
      percentage: subtypeDistribution.social
    }
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="animate-fade-in"
      >
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
                
                {subtypes.map(subtype => (
                  <div key={subtype.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span>{subtype.name}:</span>
                      <span className="font-medium">{subtype.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`bg-${subtype.color}-500 h-full`} style={{ width: `${subtype.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
                
                {allElementsAssigned && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-medium text-blue-800">Stack Analysis:</p>
                    <p className="text-blue-700">
                      {getStackType() === 'dominant' ? 
                        `${getDominantSubtype() === 'selfPreservation' ? 'Self-Preservation' : 
                          getDominantSubtype() === 'oneToOne' ? 'One-to-One' : 'Social'} dominant` : 
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
              {subtypes.map(subtype => (
                <DropTarget 
                  key={subtype.id}
                  container={subtype.id as Container}
                  title={subtype.name}
                  description={subtype.description}
                  elements={detailElements[subtype.id as Container]}
                  onDrop={(container) => {
                    console.log('Drop in', container);
                  }}
                />
              ))}
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
      </motion.div>
    </DndProvider>
  );
};

export default PhaseFour;