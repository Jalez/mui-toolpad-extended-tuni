/** @format */

import { Box, Typography as MuiTypography } from '@mui/material';
import EditableText from '../../../Components/Editables/EditableText';
import EditableNumber from '../../../Components/Editables/EditableNumber';
import {
  AppTheme,
  ThemeTypography,
  TypographyVariantStyle,
} from '../../../../store/useThemeStore';
import { SqueezableTable } from '../../../Components/SqueezableTable/SqueezableTable';
import type { ColumnConfig } from '../../../Components/SqueezableTable/types';

interface TypographySettingsProps {
  theme: AppTheme;
  onUpdate: (theme: AppTheme) => void;
}

// Exclude 'fontFamily' from typography variants as it's a special case
type TypographyVariant = Exclude<keyof ThemeTypography, 'fontFamily'>;
type TypographyProperty = keyof TypographyVariantStyle;

const typographyVariants: TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
];

const variantDisplayNames: Record<TypographyVariant, string> = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  subtitle1: 'Subtitle 1',
  subtitle2: 'Subtitle 2',
  body1: 'Body 1',
  body2: 'Body 2',
  button: 'Button',
  caption: 'Caption',
  overline: 'Overline',
};

const commonControls = [
  {
    property: 'fontSize' as const,
    label: 'Size',
    step: 0.125,
    min: 0.5,
    max: 4,
    suffix: 'rem',
  },
  {
    property: 'fontWeight' as const,
    label: 'Weight',
    step: 100,
    min: 100,
    max: 900,
  },
  {
    property: 'lineHeight' as const,
    label: 'Height',
    step: 0.1,
    min: 1,
    max: 2,
  },
];

// Add column configuration

type ColumnKey =
  | 'variant'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'preview';

const columns: ColumnConfig<ColumnKey>[] = [
  {
    key: 'variant',
    minWidth: 0,
    width: 150,
    squeezable: true,
    label: 'Variant',
  },
  { key: 'fontSize', minWidth: 0, width: 120, squeezable: true, label: 'Size' },
  {
    key: 'fontWeight',
    minWidth: 0,
    width: 120,
    squeezable: true,
    label: 'Weight',
  },
  {
    key: 'lineHeight',
    minWidth: 0,
    width: 120,
    squeezable: true,
    label: 'Height',
  },
  {
    key: 'preview',
    minWidth: 200,
    width: 200,
    squeezable: false,
    label: 'Preview',
  },
];

export const TypographySettings = ({
  theme,
  onUpdate,
}: TypographySettingsProps) => {
  function getTypographyValue(
    variant: TypographyVariant,
    property: TypographyProperty
  ): number {
    const variantStyles = theme.typography[variant] as TypographyVariantStyle;
    if (property === 'fontSize') {
      return parseFloat(variantStyles.fontSize as string) || 1;
    }
    return (variantStyles[property] as number) || 1;
  }

  function handleTypographyUpdate(
    variant: TypographyVariant,
    property: TypographyProperty,
    value: string | number
  ) {
    const variantStyles = theme.typography[variant] as TypographyVariantStyle;
    const updatedTheme: AppTheme = {
      ...theme,
      typography: {
        ...theme.typography,
        [variant]: {
          ...variantStyles,
          [property]: value,
        },
      },
    };
    onUpdate(updatedTheme);
  }

  const renderCell = (columnKey: ColumnKey, variant: TypographyVariant) => {
    const variantStyle = theme.typography[variant] as TypographyVariantStyle;

    switch (columnKey) {
      case 'variant':
        return (
          <MuiTypography variant='subtitle2'>
            {variantDisplayNames[variant]}
          </MuiTypography>
        );
      case 'fontSize':
      case 'fontWeight':
      case 'lineHeight':
        const control = commonControls.find((c) => c.property === columnKey);
        return (
          <EditableNumber
            value={getTypographyValue(variant, columnKey)}
            onChange={(value) =>
              handleTypographyUpdate(
                variant,
                columnKey,
                control?.suffix ? `${value}${control.suffix}` : value
              )
            }
            step={control?.step}
            min={control?.min}
            max={control?.max}
          />
        );
      case 'preview':
        return (
          <Box sx={{ bgcolor: 'background.paper' }}>
            <MuiTypography
              variant={variant as any}
              sx={{
                fontSize: variantStyle.fontSize,
                fontWeight: variantStyle.fontWeight,
                lineHeight: variantStyle.lineHeight,
              }}>
              {variantDisplayNames[variant]}
            </MuiTypography>
          </Box>
        );
    }
  };

  return (
    <Box>
      <MuiTypography variant='h6' gutterBottom>
        Typography Settings
      </MuiTypography>

      <Box sx={{ mb: 3 }}>
        <EditableText
          label='Font Family'
          value={theme.typography.fontFamily}
          onChange={(value) =>
            onUpdate({
              ...theme,
              typography: { ...theme.typography, fontFamily: value },
            })
          }
        />
      </Box>

      <SqueezableTable
        columns={columns}
        data={typographyVariants}
        renderCell={renderCell}
      />
    </Box>
  );
};
