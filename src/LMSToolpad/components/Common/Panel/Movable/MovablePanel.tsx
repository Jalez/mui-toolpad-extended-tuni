/** @format */

import { Box } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { usePanelStore } from "../../GridLayout/store/usePanelStore";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { loadPanelOrder, savePanelOrder } from "./hooks/usePersistentOrder";
import { ToolsContainerWrapper } from "../Main/tools/ToolsContainer";
import {
  MovableContextProvider,
  useMovableContext,
} from "./context/MovableContextProvider";

interface SortableItemProps {
  id: number;
  children: React.ReactNode;
  moveMode: boolean;
}

const SortableItem = ({ id, children, moveMode }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !moveMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: moveMode ? "move" : "default",
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  );
};

interface MovablePanelProps {
  id: string;
  children: React.ReactNode[];
  tools?: React.ReactNode; // Add tools prop
  gap?: number;
}

const Movable = ({ id, children, tools }: MovablePanelProps) => {
  const { moveMode } = usePanelStore();
  // Store original children reference
  const { parentRef } = useMovableContext();
  const childrenRef = useRef<React.ReactNode[]>([]);

  // Update children ref only on mount or when children array length changes
  useEffect(() => {
    if (children.length !== childrenRef.current.length) {
      childrenRef.current = children;
    }
  }, [children.length]);

  // Initialize with saved order or default order
  const [orderIndices, setOrderIndices] = useState(() => {
    const defaultOrder = Array.from({ length: children.length }, (_, i) => i);
    return loadPanelOrder(id, defaultOrder);
  });

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOrderIndices((currentOrder) => {
        const oldIndex = currentOrder.indexOf(active.id as number);
        const newIndex = currentOrder.indexOf(over.id as number);
        const newOrder = arrayMove(currentOrder, oldIndex, newIndex);

        // Save new order
        savePanelOrder(id, newOrder);
        return newOrder;
      });
    }
    setActiveId(null);
  };

  // Create items array using stable references
  const items = orderIndices.map((index) => ({
    id: index,
    content: childrenRef.current[index] || children[index],
  }));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <Box
        data-testid="movable-panel"
        ref={parentRef}
        width="100%"
        height="100%"
        // position="relative"
        data-panel-id={id}
      >
        {tools && (
          <ToolsContainerWrapper position="bottom-right">
            {tools}
          </ToolsContainerWrapper>
        )}
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          alignContent={"flex-start"}
          gap={1}
          sx={{
            position: "relative",
            // bgcolor: "black",
            width: "100%",
            height: "100%",
            //No flexgrow for children
          }}
        >
          <SortableContext
            items={orderIndices}
            strategy={horizontalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} moveMode={moveMode}>
                {item.content}
              </SortableItem>
            ))}
          </SortableContext>
        </Box>
      </Box>

      <DragOverlay>
        {activeId !== null && (
          <Box
            sx={{
              opacity: 0.8,
              transform: "scale(1.05)",
              cursor: "grabbing",
            }}
          >
            {items.find((item) => item.id === activeId)?.content}
          </Box>
        )}
      </DragOverlay>
    </DndContext>
  );
};

const Panels = (props: MovablePanelProps) => (
  <MovableContextProvider>
    <Movable {...props}>{props.children}</Movable>
  </MovableContextProvider>
);

export default Panels;
