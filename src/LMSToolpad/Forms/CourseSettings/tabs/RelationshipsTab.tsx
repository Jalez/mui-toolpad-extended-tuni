/** @format */

import { Stack, Typography, Box } from '@mui/material';
import {
  CourseRaw,
  CourseRelation,
  courseRelationType,
} from '../../../store/useCourseStore';
import EditableAutocomplete from '../../Components/Editables/EditableAutoComplete';

interface RelationshipsTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
}

const relationTypeDescriptions: Record<courseRelationType, string> = {
  prerequisite: 'Must be completed before taking this course',
  recommended: 'Should be completed before taking this course',
  parallel: 'Can/should be taken simultaneously',
  continues_from: 'Natural continuation of the other course',
  alternative_to: 'Equivalent course (cannot take both)',
  part_of: 'Part of a larger study module/specialization',
  prepares_for: 'Helps prepare for an advanced course',
};

export default function RelationshipsTab({
  formData,
  setFormData,
}: RelationshipsTabProps) {
  const updateRelationships = (
    type: 'prerequisites' | 'continuations' | 'alternatives' | 'related',
    courses: CourseRelation[]
  ) => {
    setFormData({
      ...formData,
      relationships: {
        prerequisites: formData.relationships?.prerequisites || [],
        continuations: formData.relationships?.continuations || [],
        alternatives: formData.relationships?.alternatives || [],
        related: formData.relationships?.related || [],
        [type]: courses,
      },
    });
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Prerequisites
        </Typography>
        <EditableAutocomplete<CourseRelation>
          label='Required Courses'
          value={formData.relationships?.prerequisites || []}
          onChange={(courses) => updateRelationships('prerequisites', courses)}
          helperText={relationTypeDescriptions.prerequisite}
          getOptionLabel={(option) => `${option.code} - ${option.type}`}
        />
      </Box>

      <Box>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Continuations
        </Typography>
        <EditableAutocomplete<CourseRelation>
          label='Follow-up Courses'
          value={formData.relationships?.continuations || []}
          onChange={(courses) => updateRelationships('continuations', courses)}
          helperText={relationTypeDescriptions.continues_from}
          getOptionLabel={(option) => `${option.code} - ${option.type}`}
        />
      </Box>

      <Box>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Alternatives
        </Typography>
        <EditableAutocomplete<CourseRelation>
          label='Alternative Courses'
          value={formData.relationships?.alternatives || []}
          onChange={(courses) => updateRelationships('alternatives', courses)}
          helperText={relationTypeDescriptions.alternative_to}
          getOptionLabel={(option) => `${option.code} - ${option.type}`}
        />
      </Box>

      <Box>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Related Courses
        </Typography>
        <EditableAutocomplete<CourseRelation>
          label='Related Courses'
          value={formData.relationships?.related || []}
          onChange={(courses) => updateRelationships('related', courses)}
          helperText={relationTypeDescriptions.part_of}
          getOptionLabel={(option) => `${option.code} - ${option.type}`}
        />
      </Box>
    </Stack>
  );
}
