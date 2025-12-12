/** @format */

import { useDraggable } from '@dnd-kit/core';

// Draggable chip component using dnd-kit hook
function DraggableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  // Updated style to explicitly type as React.CSSProperties
  const style: React.CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: 'pointer',
    userSelect: 'none', // valid in React.CSSProperties
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default DraggableItem;
