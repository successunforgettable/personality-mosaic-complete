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

  return (
    <motion.div
      ref={drag}
      className={`w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 
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
  children, 
  elementsCount, 
  onDrop 
}: {
  container: Container,
  title: string,
  description: string,
  elementsCount: number,
  children: React.ReactNode,
  onDrop: (containerId: Container) => void
}) => {
  const { drop, isOver } = useDragAndDrop({
    type: 'element',
    accept: 'element',
    onDrop: () => onDrop(container)
  });

  // Calculate fill percentage
  const fillPercentage = (elementsCount / 10) * 100;

  return (
    <div
      ref={drop}
      className={`drop-target rounded-lg p-5 transition-all duration-300
                 ${isOver ? 'border-primary-400 bg-primary-50' : 'border-dashed border'}
                 relative overflow-hidden`}
      style={{ minHeight: '120px' }}
    >
      {/* Fill background based on number of elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-200 transition-all duration-300 ease-out"
        style={{ width: `${fillPercentage}%`, opacity: 0.3 }}
      />
      
      <div className="relative z-10">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-600 mb-3">{description}</p>
        
        <div className="flex flex-wrap gap-4 min-h-16 items-center justify-center">
          {children}
        </div>
      </div>
      
      {/* Count indicator */}
      <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
        <span className="text-xs font-medium text-primary-600">{elementsCount}</span>
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
            Drag and drop these detail elements into the containers that best represent how you focus your energy and attention.
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
              
              <div className="text-sm text-gray-600 space-y-2 mt-4">
                <p>Your subtype distribution:</p>
                <div className="flex justify-between items-center">
                  <span>Self-Preservation:</span>
                  <span className="font-medium">{subtypeDistribution.selfPreservation}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${subtypeDistribution.selfPreservation}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>One-to-One:</span>
                  <span className="font-medium">{subtypeDistribution.oneToOne}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${subtypeDistribution.oneToOne}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Social:</span>
                  <span className="font-medium">{subtypeDistribution.social}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full" style={{ width: `${subtypeDistribution.social}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Available Elements</h3>
              
              {detailElements.unassigned.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-center">
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
                <div className="text-center py-4 text-gray-500">
                  <p>All elements have been assigned! Review your distribution or continue.</p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <DropTarget 
                container="selfPreservation"
                title="Self-Preservation"
                description="Elements focused on physical security, health, domestic concerns, and material comfort"
                elementsCount={detailElements.selfPreservation.length}
                onDrop={(container) => {
                  console.log('Drop in', container);
                }}
              >
                {detailElements.selfPreservation.map(element => (
                  <DraggableToken 
                    key={element.id} 
                    element={element} 
                    source="selfPreservation"
                    onDragEnd={handleElementMove}
                  />
                ))}
              </DropTarget>

              <DropTarget 
                container="oneToOne"
                title="One-to-One"
                description="Elements focused on close personal relationships, intimacy, and individual connections"
                elementsCount={detailElements.oneToOne.length}
                onDrop={(container) => {
                  console.log('Drop in', container);
                }}
              >
                {detailElements.oneToOne.map(element => (
                  <DraggableToken 
                    key={element.id} 
                    element={element} 
                    source="oneToOne"
                    onDragEnd={handleElementMove}
                  />
                ))}
              </DropTarget>

              <DropTarget 
                container="social"
                title="Social"
                description="Elements focused on group dynamics, communities, and broader social structures"
                elementsCount={detailElements.social.length}
                onDrop={(container) => {
                  console.log('Drop in', container);
                }}
              >
                {detailElements.social.map(element => (
                  <DraggableToken 
                    key={element.id} 
                    element={element} 
                    source="social"
                    onDragEnd={handleElementMove}
                  />
                ))}
              </DropTarget>
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
            className={`px-6 py-3 ${allElementsAssigned ? 'bg-primary-500 hover:bg-primary-600' : 'bg-gray-400 cursor-not-allowed'} 
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