import { useDrag, useDrop } from 'react-dnd';
import { Container } from '@/types/assessment';

interface DragItem {
  id: number;
  source: Container;
}

interface DraggableOptions {
  type: string;
  item: DragItem;
  onDrop: (destination: Container) => void;
}

interface DroppableOptions {
  type: string;
  accept: string;
  onDrop: () => void;
}

export function useDragAndDrop(options: DraggableOptions | DroppableOptions) {
  if ('item' in options) {
    // This is a draggable
    const [{ isDragging }, drag] = useDrag({
      type: options.type,
      item: options.item,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<{ containerId: Container }>();
        if (item && dropResult) {
          options.onDrop(dropResult.containerId);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    
    return { drag, isDragging };
  } else {
    // This is a droppable
    const [{ isOver }, drop] = useDrop({
      accept: options.accept,
      drop: () => {
        options.onDrop();
        return { containerId: (options as any).containerId };
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    
    return { drop, isOver };
  }
}
