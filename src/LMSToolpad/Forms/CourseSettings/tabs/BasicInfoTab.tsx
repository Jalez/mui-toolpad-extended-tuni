/** @format */

import { Stack, Box } from '@mui/material';
import { CourseRaw } from '../../../store/useCourseStore';
import EditableText from '../../Components/Editables/EditableText';
import EditableAutocomplete from '../../Components/Editables/EditableAutoComplete';
import EditableSelect from '../../Components/Editables/EditableSelect';
import EditableImage from '../../Components/Editables/EditableImage';

interface BasicInfoTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
}

const getStatusExplanation = (status: CourseRaw['status']) => {
  switch (status) {
    case 'draft':
      return 'Course is not yet published and only visible to staff.';
    case 'active':
      return 'Course is published and available according to visibility settings.';
    case 'archived':
      return 'Course is no longer active but preserved for reference.';
    default:
      return '';
  }
};

export default function BasicInfoTab({
  formData,
  setFormData,
}: BasicInfoTabProps) {
  return (
    <Box sx={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={2} sx={{ minHeight: 0 }}>
        <Stack direction='row' spacing={2} alignItems='flex-start'>
          <EditableImage
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />

          <Stack spacing={2} sx={{ flex: 1 }}>
            <EditableText
              label='Title'
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
            />

            <EditableText
              label='Description'
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
              multiline
            />
            <EditableSelect
              label='Status'
              value={formData.status}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as CourseRaw['status'],
                })
              }
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'active', label: 'Active' },
                { value: 'archived', label: 'Archived' },
              ]}
              explanation={getStatusExplanation(formData.status)}
            />

            <EditableAutocomplete
              label='Tags'
              value={formData.tags || []}
              onChange={(newTags) =>
                setFormData({ ...formData, tags: newTags })
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
