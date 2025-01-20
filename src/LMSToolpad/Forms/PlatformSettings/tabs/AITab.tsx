/** @format */

import { Grid, Stack } from '@mui/material';
import { Platform } from '../../../store/usePlatformSettingsStore';
import EditableText from '../../Components/Editables/EditableText';
import EditableSwitch from '../../Components/Editables/EditableSwitch';
import EditableNumber from '../../Components/Editables/EditableNumber';
import { Box } from '@mui/system';

interface AITabProps {
  settings: Platform;
  onUpdate: (settings: Platform) => void;
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

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 4,
        }}>
        <EditableSwitch
          label='AI Features Enabled'
          value={settings.ai.enabled}
          onChange={(value) => handleAIUpdate(['enabled'], value)}
        />
        <Stack spacing={2}>
          <h3>OpenAI Settings</h3>
          <EditableSwitch
            label='OpenAI Enabled'
            value={settings.ai.providers.openai.enabled}
            onChange={(value) =>
              handleAIUpdate(['providers', 'openai', 'enabled'], value)
            }
          />
          <EditableText
            label='API Key'
            value={settings.ai.providers.openai.apiKey || ''}
            onChange={(value) =>
              handleAIUpdate(['providers', 'openai', 'apiKey'], value)
            }
          />
          <EditableText
            label='Model Name'
            value={settings.ai.providers.openai.modelName}
            onChange={(value) =>
              handleAIUpdate(['providers', 'openai', 'modelName'], value)
            }
          />
          <EditableNumber
            label='Max Tokens'
            value={settings.ai.providers.openai.maxTokens}
            onChange={(value) =>
              handleAIUpdate(['providers', 'openai', 'maxTokens'], value)
            }
          />
        </Stack>

        <Stack spacing={2}>
          <h3>Feature Settings</h3>
          <EditableSwitch
            label='Auto Grading'
            value={settings.ai.features.autoGrading}
            onChange={(value) =>
              handleAIUpdate(['features', 'autoGrading'], value)
            }
          />
          <EditableSwitch
            label='Plagiarism Detection'
            value={settings.ai.features.plagiarismDetection}
            onChange={(value) =>
              handleAIUpdate(['features', 'plagiarismDetection'], value)
            }
          />
          <EditableSwitch
            label='Content Generation'
            value={settings.ai.features.contentGeneration}
            onChange={(value) =>
              handleAIUpdate(['features', 'contentGeneration'], value)
            }
          />
          <EditableSwitch
            label='Student Assistant'
            value={settings.ai.features.studentAssistant}
            onChange={(value) =>
              handleAIUpdate(['features', 'studentAssistant'], value)
            }
          />
        </Stack>

        <Stack spacing={2}>
          <h3>Moderation Settings</h3>
          <EditableSwitch
            label='Content Moderation'
            value={settings.ai.moderationSettings.enabled}
            onChange={(value) =>
              handleAIUpdate(['moderationSettings', 'enabled'], value)
            }
          />
          <EditableSwitch
            label='Filter Profanity'
            value={settings.ai.moderationSettings.filterProfanity}
            onChange={(value) =>
              handleAIUpdate(['moderationSettings', 'filterProfanity'], value)
            }
          />
          <EditableNumber
            label='Max Queries Per Hour'
            value={settings.ai.moderationSettings.maxQueriesPerHour}
            onChange={(value) =>
              handleAIUpdate(['moderationSettings', 'maxQueriesPerHour'], value)
            }
          />
        </Stack>
      </Box>
    </Stack>
  );
}
