import React from 'react';
import { useDrop } from 'react-dnd';
import Token from './TokenComponent';

interface SubtypeContainerProps {
  id: string;
  title: string;
  description: string;
  tokenCount: number;
  onTokenPlace: () => void;
  onTokenRemove: () => void;
}

const SubtypeContainer: React.FC<SubtypeContainerProps> = ({
  id,
  title,
  description,
  tokenCount,
  onTokenPlace,
  onTokenRemove
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'token',
    drop: () => {
      onTokenPlace();
      return { containerId: id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  
  // Calculate fill percentage for visual feedback (10 tokens = 100%)
  const fillPercentage = Math.min(tokenCount * 10, 100);
  
  // Determine the container color based on id
  const getContainerColor = () => {
    switch(id) {
      case 'selfPreservation':
        return 'rgba(22, 163, 74, ' + (fillPercentage / 200 + 0.1) + ')'; // green
      case 'oneToOne':
        return 'rgba(37, 99, 235, ' + (fillPercentage / 200 + 0.1) + ')'; // blue
      case 'social':
        return 'rgba(139, 92, 246, ' + (fillPercentage / 200 + 0.1) + ')'; // purple
      default:
        return 'rgba(100, 116, 139, ' + (fillPercentage / 200 + 0.1) + ')'; // slate
    }
  };
  
  return (
    <div 
      className={`rounded-lg p-4 relative border ${isOver ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'}`}
      style={{ minHeight: '200px' }}
      ref={drop}
    >
      <div 
        className="absolute inset-0 rounded-lg transition-all duration-500 ease-out"
        style={{ 
          background: getContainerColor(),
          opacity: fillPercentage > 0 ? 1 : 0,
          zIndex: -1
        }}
      />
      
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap justify-center gap-2 min-h-16 mb-2">
        {tokenCount === 0 && !isOver && (
          <div className="text-center text-gray-400 italic text-sm flex items-center justify-center h-full">
            <p>Drop tokens here</p>
          </div>
        )}
        
        {tokenCount === 0 && isOver && (
          <div className="text-center text-blue-500 font-medium text-sm animate-pulse flex items-center justify-center h-full">
            <p>Drop here!</p>
          </div>
        )}
        
        {Array(tokenCount).fill(null).map((_, index) => (
          <Token 
            key={`placed-${id}-${index}`}
            id={`placed-${id}-${index}`}
            isPlaced={true}
            onDoubleClick={() => onTokenRemove()}
          />
        ))}
      </div>
      
      <div className="text-right text-xs text-gray-500 mt-2">
        {tokenCount} / 10
      </div>
    </div>
  );
};

export default SubtypeContainer;