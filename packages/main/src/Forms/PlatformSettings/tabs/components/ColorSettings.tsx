/** @format */
import { Box, Stack, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { AppTheme } from '../../../../store/useThemeStore';
import { SqueezableTable } from '../../../Components/SqueezableTable/SqueezableTable';
import EditableColor from '../../../Components/Editables/EditableColor';
import type { ColumnConfig } from '../../../Components/SqueezableTable/types';

interface ColorSettingsProps {
  theme: AppTheme;
  onUpdate: (theme: AppTheme) => void;
}

type StandardPalette =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

const standardPalettes: StandardPalette[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];

type ColumnKey = 'category' | 'main' | 'light' | 'dark' | 'contrast';

const columns: ColumnConfig<ColumnKey>[] = [
  {
    key: 'category',
    minWidth: 120,
    width: 100,
    squeezable: false,
    label: 'Category',
  },
  { key: 'main', minWidth: 100, width: 150, squeezable: true, label: 'Main' },
  { key: 'light', minWidth: 100, width: 150, squeezable: true, label: 'Light' },
  { key: 'dark', minWidth: 100, width: 150, squeezable: true, label: 'Dark' },
  {
    key: 'contrast',
    minWidth: 100,
    width: 150,
    squeezable: true,
    label: 'Contrast',
  },
];

type ColorMode = 'light' | 'dark';

export const ColorSettings = ({ theme, onUpdate }: ColorSettingsProps) => {
  const [mode, setMode] = useState<ColorMode>('light');

  const handleModeChange = (
    _event: React.SyntheticEvent,
    newMode: ColorMode
  ) => {
    setMode(newMode);
  };

  const getColorValue = (paths: string[]): string => {
    let current = theme as Record<string, any>;
    const pathsWithMode = paths.map((p) => (p === 'light' ? mode : p));
    for (const path of pathsWithMode) {
      if (current && typeof current === 'object' && path in current) {
        current = current[path];
      } else {
        throw new Error(`Invalid path: ${pathsWithMode.join('.')}`);
      }
    }
    if (typeof current !== 'string') {
      throw new Error(
        `Expected color value at path ${pathsWithMode.join('.')} to be a string`
      );
    }
    return current;
  };

  const handleColorUpdate = (paths: string[], value: string) => {
    const updatedTheme = { ...theme };
    const pathsWithMode = paths.map((p) => (p === 'light' ? mode : p));
    let current = updatedTheme as Record<string, any>;

    for (let i = 0; i < pathsWithMode.length - 1; i++) {
      const path = pathsWithMode[i];
      if (!(path in current)) {
        throw new Error(`Invalid path: ${pathsWithMode.join('.')}`);
      }
      current = current[path];
    }

    const lastPath = pathsWithMode[pathsWithMode.length - 1];
    if (!(lastPath in current)) {
      throw new Error(`Invalid path: ${pathsWithMode.join('.')}`);
    }

    current[lastPath] = value;
    onUpdate(updatedTheme);
  };

  const renderCell = (columnKey: ColumnKey, palette: StandardPalette) => {
    switch (columnKey) {
      case 'category':
        return (
          <Typography variant='subtitle2' sx={{ textTransform: 'capitalize' }}>
            {palette}
          </Typography>
        );
      case 'main':
      case 'light':
      case 'dark':
      case 'contrast': {
        const pathSuffix =
          columnKey === 'contrast' ? 'contrastText' : columnKey;
        const fullPath = [
          'colorSchemes',
          'light',
          'palette',
          palette,
          pathSuffix,
        ];
        return (
          <EditableColor
            value={getColorValue(fullPath)}
            onChange={(value) => handleColorUpdate(fullPath, value)}
          />
        );
      }
    }
  };

  return (
    <Stack spacing={4}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={mode} onChange={handleModeChange} aria-label='color mode'>
          <Tab label='Light Mode' value='light' />
          <Tab label='Dark Mode' value='dark' />
        </Tabs>
      </Box>

      <Box>
        <Typography variant='h6' gutterBottom>
          Standard Colors ({mode} mode)
        </Typography>
        <SqueezableTable
          columns={columns}
          data={standardPalettes}
          renderCell={renderCell}
        />
      </Box>

      <Box>
        <Typography variant='h6' gutterBottom>
          Background Colors
        </Typography>
        <Stack direction='row' spacing={2}>
          <EditableColor
            label='Default'
            value={getColorValue([
              'colorSchemes',
              'light',
              'palette',
              'background',
              'default',
            ])}
            onChange={(value) =>
              handleColorUpdate(
                ['colorSchemes', 'light', 'palette', 'background', 'default'],
                value
              )
            }
          />
          <EditableColor
            label='Paper'
            value={getColorValue([
              'colorSchemes',
              'light',
              'palette',
              'background',
              'paper',
            ])}
            onChange={(value) =>
              handleColorUpdate(
                ['colorSchemes', 'light', 'palette', 'background', 'paper'],
                value
              )
            }
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant='h6' gutterBottom>
          Text Colors
        </Typography>
        <Stack direction='row' spacing={2}>
          <EditableColor
            label='Primary'
            value={getColorValue([
              'colorSchemes',
              'light',
              'palette',
              'text',
              'primary',
            ])}
            onChange={(value) =>
              handleColorUpdate(
                ['colorSchemes', 'light', 'palette', 'text', 'primary'],
                value
              )
            }
          />
          <EditableColor
            label='Secondary'
            value={getColorValue([
              'colorSchemes',
              'light',
              'palette',
              'text',
              'secondary',
            ])}
            onChange={(value) =>
              handleColorUpdate(
                ['colorSchemes', 'light', 'palette', 'text', 'secondary'],
                value
              )
            }
          />
          <EditableColor
            label='Disabled'
            value={getColorValue([
              'colorSchemes',
              'light',
              'palette',
              'text',
              'disabled',
            ])}
            onChange={(value) =>
              handleColorUpdate(
                ['colorSchemes', 'light', 'palette', 'text', 'disabled'],
                value
              )
            }
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant='h6' gutterBottom>
          Divider
        </Typography>
        <EditableColor
          value={getColorValue(['colorSchemes', 'light', 'palette', 'divider'])}
          onChange={(value) =>
            handleColorUpdate(
              ['colorSchemes', 'light', 'palette', 'divider'],
              value
            )
          }
        />
      </Box>
    </Stack>
  );
};
