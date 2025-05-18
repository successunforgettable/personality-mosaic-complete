import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import { DetailElement, Container } from '@/types/assessment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

// Draggable token component
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
    <div
      ref={drag}
      className={`draggable-token bg-gray-100 rounded-lg p-3 flex flex-col items-center text-center ${isDragging ? 'opacity-50' : ''}`}
    >
      <span className="material-icons text-primary-600 mb-2">{element.icon}</span>
      <span className="text-sm font-medium text-gray-800">{element.name}</span>
    </div>
  );
};

// Drop target component
const DropTarget = ({ container, title, description, children, onDrop }: {
  container: Container,
  title: string,
  description: string,
  children: React.ReactNode,
  onDrop: (containerId: Container) => void
}) => {
  const { drop, isOver } = useDragAndDrop({
    type: 'element',
    accept: 'element',
    onDrop: () => onDrop(container)
  });

  return (
    <div
      ref={drop}
      className={`drop-target bg-white rounded-xl shadow-md p-5 border-2 border-dashed ${isOver ? 'border-primary-400 bg-primary-50' : 'border-gray-200'}`}
    >
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-3 min-h-20">
        {children}
      </div>
    </div>
  );
};

const PhaseFour = () => {
  const { state, moveElement, generateResult, setPhase } = useAssessment();
  const { detailElements } = state;
  
  const handleElementMove = (element: DetailElement, source: Container, destination: Container) => {
    moveElement(element, source, destination);
  };
  
  const handleDrop = (elementId: number, sourceId: string, destinationId: string) => {
    const source = sourceId as Container;
    const destination = destinationId as Container;
    
    // Find the element in the source container
    const element = detailElements[source].find(el => el.id === elementId);
    
    if (element) {
      moveElement(element, source, destination);
    }
  };
  
  const handleComplete = () => {
    generateResult();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="animate-fade-in"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Add Detail Elements</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Drag and drop these elements into the containers that best represent how you focus your energy and attention.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-5 h-full">
              <h3 className="font-semibold text-gray-900 mb-4">Available Elements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                {detailElements.unassigned.map(element => (
                  <DraggableToken 
                    key={element.id} 
                    element={element} 
                    source="unassigned"
                    onDragEnd={handleElementMove}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              <DropTarget 
                container="selfPreservation"
                title="Self-Preservation"
                description="Focus on personal security, health, and comfort"
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
                description="Focus on close personal relationships and connections"
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
                description="Focus on group dynamics, social causes and community"
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
            className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all"
            onClick={handleComplete}
            disabled={detailElements.unassigned.length > 0}
          >
            Complete & View Results
          </button>
        </div>
      </motion.div>
    </DndProvider>
  );
};

export default PhaseFour;
