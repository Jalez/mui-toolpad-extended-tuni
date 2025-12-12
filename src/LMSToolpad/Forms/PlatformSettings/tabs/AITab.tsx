/** @format */
import React, { useState } from "react";
import { Stack, Button, Typography, Chip, Box, TextField } from "@mui/material";
import { Platform } from "../../../store/usePlatformStore";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import EditableSwitch from "../../Components/Editables/EditableSwitch";
import DraggableItem from "../../../../common/components/ui/Panel/Movable/DraggableItem";

interface AITabProps {
  settings: Platform;
  onUpdate: (settings: Platform) => void;
}

// Droppable container component
function DroppableArea({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        minHeight: 80,
        p: 1,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 1,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  );
}

export default function AITab({ settings, onUpdate }: AITabProps) {
  const handleAIUpdate = (path: string[], value: any) => {
    let newAISettings = { ...settings.ai };
    let current: any = newAISettings;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onUpdate({ ...settings, ai: newAISettings });
  };

  // Add Agent Configuration with empty assigned chips
  const handleAddAgentConfig = () => {
    const newConfigs = [
      ...settings.ai.agentConfigurations,
      { agent: "openai", assigned: [] },
    ];
    handleAIUpdate(["agentConfigurations"], newConfigs);
  };

  // List of assignable feature/moderation items remains
  const assignableItems = [
    { key: "autoGrading", label: "Auto Grading" },
    { key: "plagiarismDetection", label: "Plagiarism Detection" },
    { key: "contentGeneration", label: "Content Generation" },
    { key: "studentAssistant", label: "Student Assistant" },
    { key: "teacherAssistant", label: "Teacher Assistant" },
    { key: "contentModeration", label: "Content Moderation" },
    { key: "filterProfanity", label: "Filter Profanity" },
  ];

  // Compute available items: those not assigned to any agent config.
  const assignedKeys = settings.ai.agentConfigurations.flatMap(
    (c) => c.assigned
  );
  const availableItems = assignableItems.filter(
    (item) => !assignedKeys.includes(item.key)
  );

  const [activeChip, setActiveChip] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const [activeId, setActiveId] = useState<string | null>(null);

  // onDragStart: set active chip from its id.
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeIdString = active.id.toString();
    setActiveId(activeIdString);
    // find chip label from assignableItems
    const item = assignableItems.find((i) => `chip-${i.key}` === activeIdString);
    if (item) setActiveChip({ id: activeIdString, label: item.label });
    else {
      // if chip comes from an agent droppable, its id will be "chip-{key}-agent-{index}"
      const parts = activeIdString.split("-");
      const key = parts[1];
      const label = assignableItems.find((i) => i.key === key)?.label || key;
      setActiveChip({ id: activeIdString, label });
    }
  };

  // onDragEnd: determine drop target and update assignments.
  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (!over || !activeChip || !activeId) {
      setActiveChip(null);
      setActiveId(null);
      return;
    }
    const overId = over.id.toString();
    // Check if dropped into available items container.
    if (overId === "available-items") {
      // Remove chip from any agent it belongs to.
      const newConfigs = settings.ai.agentConfigurations.map((config) => {
        if (
          config.assigned.includes(
            activeId.replace("chip-", "").split("-")[0]
          )
        ) {
          return {
            ...config,
            assigned: config.assigned.filter(
              (k) => k !== activeId.replace("chip-", "").split("-")[0]
            ),
          };
        }
        return config;
      });
      handleAIUpdate(["agentConfigurations"], newConfigs);
    } else if (overId.startsWith("agent-")) {
      const agentIndex = parseInt(overId.replace("agent-", ""), 10);
      if (isNaN(agentIndex)) return;
      // Remove chip from any agent to avoid duplicates.
      let newConfigs = settings.ai.agentConfigurations.map((config) => ({
        ...config,
        assigned: config.assigned.filter(
          (k) => k !== activeId.replace("chip-", "").split("-")[0]
        ),
      }));
      // Add chip to target agent if not already added.
      const chipKey = activeId.replace("chip-", "").split("-")[0];
      if (!newConfigs[agentIndex].assigned.includes(chipKey)) {
        newConfigs[agentIndex].assigned.push(chipKey);
      }
      handleAIUpdate(["agentConfigurations"], newConfigs);
    }
    setActiveChip(null);
    setActiveId(null);
  };

  // New agent form state
  const [newAgent, setNewAgent] = useState({
    agent: "",
    modelName: "",
    apiKey: "",
    apiUrl: "",
  });

  const handleNewAgentChange = (
    field: keyof typeof newAgent,
    value: string
  ) => {
    setNewAgent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewAgent = () => {
    if (!newAgent.agent) return;
    const newConfig = {
      agent: newAgent.agent,
      modelName: newAgent.modelName,
      apiKey: newAgent.apiKey,
      apiUrl: newAgent.apiUrl,
      assigned: [],
    };
    const newConfigs = [...settings.ai.agentConfigurations, newConfig];
    handleAIUpdate(["agentConfigurations"], newConfigs);
    setNewAgent({ agent: "", modelName: "", apiKey: "", apiUrl: "" });
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Stack spacing={3}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <EditableSwitch
            label="AI Features Enabled"
            value={settings.ai.enabled}
            onChange={(value) => handleAIUpdate(["enabled"], value)}
          />
          {/* ...existing code... */}
        </Box>

        {/* Agent Assignment Section */}
        <Stack spacing={2}>
          <Typography variant="h6">Agent Assignment</Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Unassigned Items</Typography>
            <DroppableArea id="available-items">
              {availableItems.map((item) => (
                <DraggableItem key={item.key} id={`chip-${item.key}`}>
                  <Chip label={item.label} />
                </DraggableItem>
              ))}
            </DroppableArea>
          </Box>

          {settings.ai.agentConfigurations.map((config, index) => (
            <Box key={index}>
              <Typography variant="subtitle1">Agent: {config.agent}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Assigned Items:
              </Typography>
              <DroppableArea id={`agent-${index}`}>
                {config.assigned.map((key: string) => {
                  const label =
                    assignableItems.find((item) => item.key === key)?.label ||
                    key;
                  return (
                    <DraggableItem key={key} id={`chip-${key}-agent-${index}`}>
                      <Chip label={label} />
                    </DraggableItem>
                  );
                })}
              </DroppableArea>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddAgentConfig}>
            Add Default Agent Configuration
          </Button>
          {/* New: Custom Agent Form */}
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle1">Add New Agent</Typography>
            <Stack spacing={1} direction="row">
              <TextField
                label="Agent Name"
                value={newAgent.agent}
                onChange={(e) => handleNewAgentChange("agent", e.target.value)}
                size="small"
              />
              <TextField
                label="Model Name"
                value={newAgent.modelName}
                onChange={(e) =>
                  handleNewAgentChange("modelName", e.target.value)
                }
                size="small"
              />
            </Stack>
            <Stack spacing={1} direction="row" sx={{ mt: 1 }}>
              <TextField
                label="API Key"
                value={newAgent.apiKey}
                onChange={(e) => handleNewAgentChange("apiKey", e.target.value)}
                size="small"
              />
              <TextField
                label="API URL"
                value={newAgent.apiUrl}
                onChange={(e) => handleNewAgentChange("apiUrl", e.target.value)}
                size="small"
              />
            </Stack>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSaveNewAgent}
            >
              Save New Agent
            </Button>
          </Box>
        </Stack>
      </Stack>
      <DragOverlay>
        {activeChip ? <Chip label={activeChip.label} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
