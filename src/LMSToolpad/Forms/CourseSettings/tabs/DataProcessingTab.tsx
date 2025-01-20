/** @format */

import { Grid, Stack, Typography, Divider } from '@mui/material';
import { CourseRaw } from '../../../store/useCourseStore';
import EditableSwitch from '../../Components/Editables/EditableSwitch';
import EditableNumber from '../../Components/Editables/EditableNumber';
import EditableSelect from '../../Components/Editables/EditableSelect';

interface DataProcessingTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
}

export default function DataProcessingTab({
  formData,
  setFormData,
}: DataProcessingTabProps) {
  // Initialize dataProcessing if it doesn't exist
  const ensuredFormData = {
    ...formData,
    dataProcessing: formData.dataProcessing || {
      purposes: ['course_delivery', 'assessment'],
      retention: 365,
      thirdPartyProcessors: [],
      specialCategories: false,
      legalBasis: 'consent' as const,
    },
  };

  const handleDataProcessingUpdate = (key: string, value: any) => {
    setFormData({
      ...ensuredFormData,
      dataProcessing: {
        ...ensuredFormData.dataProcessing,
        [key]: value,
      },
    });
  };

  // Use ensuredFormData instead of formData
  return (
    <Stack spacing={3}>
      <Typography variant='h6'>Data Processing Details</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSelect
            label='Legal Basis'
            value={ensuredFormData.dataProcessing.legalBasis}
            onChange={(value) =>
              handleDataProcessingUpdate('legalBasis', value)
            }
            options={[
              { value: 'consent', label: 'Consent' },
              { value: 'contract', label: 'Contract' },
              { value: 'legal_obligation', label: 'Legal Obligation' },
              { value: 'legitimate_interests', label: 'Legitimate Interests' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Data Retention Period (days)'
            value={ensuredFormData.dataProcessing.retention}
            onChange={(value) => handleDataProcessingUpdate('retention', value)}
          />
        </Grid>
      </Grid>

      <Divider />

      <Typography variant='h6'>Special Categories of Personal Data</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Process Special Categories of Personal Data'
            value={ensuredFormData.dataProcessing.specialCategories}
            onChange={(value) =>
              handleDataProcessingUpdate('specialCategories', value)
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
