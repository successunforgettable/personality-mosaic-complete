import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { PersonalityType } from '@/types/assessment';

interface TokenProps {
  id: string;
  isPlaced?: boolean;
  personalityType?: PersonalityType;
  onDoubleClick?: () => void;
}

const Token: React.FC<TokenProps> = ({ 
  id, 
  isPlaced = false, 
  personalityType,
  onDoubleClick
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'token',
    item: { id },
    canDrag: !isPlaced,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  
  // Determine gradient based on personality type
  const getGradient = () => {
    if (!personalityType) return 'linear-gradient(135deg, #6b21a8 0%, #c084fc 100%)';
    
    // Map personality type to gradient
    const gradients: Record<string, string> = {
      '1': 'linear-gradient(135deg, #1e3a8a 0%, #60a5fa 100%)', // Type 1 blue
      '2': 'linear-gradient(135deg, #c2410c 0%, #fb923c 100%)', // Type 2 orange
      '3': 'linear-gradient(135deg, #0d9488 0%, #5eead4 100%)', // Type 3 teal
      '4': 'linear-gradient(135deg, #7e22ce 0%, #c084fc 100%)', // Type 4 purple
      '5': 'linear-gradient(135deg, #1e40af 0%, #93c5fd 100%)', // Type 5 blue
      '6': 'linear-gradient(135deg, #3f3f46 0%, #a1a1aa 100%)', // Type 6 zinc
      '7': 'linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%)', // Type 7 amber
      '8': 'linear-gradient(135deg, #b91c1c 0%, #f87171 100%)', // Type 8 red
      '9': 'linear-gradient(135deg, #065f46 0%, #6ee7b7 100%)', // Type 9 green
    };
    
    return gradients[personalityType.id.toString()] || 'linear-gradient(135deg, #6b21a8 0%, #c084fc 100%)';
  };
  
  return (
    <motion.div
      ref={drag}
      className={`w-8 h-8 rounded-full cursor-grab flex items-center justify-center
                ${isDragging ? 'opacity-50' : 'opacity-100'} 
                ${isPlaced ? 'cursor-pointer' : ''}
                border border-white shadow-md`}
      style={{ 
        background: getGradient(),
        opacity: isDragging ? 0.5 : 1
      }}
      initial={{ scale: 0.95 }}
      animate={{ 
        scale: isPlaced ? 1 : [0.95, 1.05, 0.95], 
        boxShadow: isPlaced 
          ? '0 2px 4px rgba(0,0,0,0.1)' 
          : '0 2px 4px rgba(0,0,0,0.1)'
      }}
      transition={{ 
        repeat: isPlaced ? 0 : Infinity, 
        duration: 2 
      }}
      onDoubleClick={isPlaced ? onDoubleClick : undefined}
    />
  );
};

export default Token;