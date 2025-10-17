/** @format */

import { Grid, Stack } from '@mui/material';
import { Platform, PlatformRole } from '../../../store/usePlatformStore';
import EditableAutoComplete from '../../Components/Editables/EditableAutoComplete';
import EditableNumber from '../../Components/Editables/EditableNumber';
import EditableSelect from '../../Components/Editables/EditableSelect';
import EditableSwitch from '../../Components/Editables/EditableSwitch';

interface CoursesTabProps {
  settings: Platform;
  onUpdate: (settings: Partial<Platform>) => void;
}

export default function CoursesTab({ settings, onUpdate }: CoursesTabProps) {
  const handleCoursesUpdate = (key: keyof Platform['courses'], value: any) => {
    onUpdate({ courses: { ...settings.courses, [key]: value } });
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }} >
          <EditableAutoComplete<PlatformRole>
            label='Course Creation Roles'
            value={settings.courses.courseCreation.requiredRoles}
            onChange={(value) =>
              handleCoursesUpdate('courseCreation', {
                ...settings.courses.courseCreation,
                requiredRoles: value,
              })
            }
            getOptionLabel={(role) =>
              role.charAt(0).toUpperCase() + role.slice(1)
            }
            helperText='Roles that are allowed to create new courses'
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} >
          <EditableSelect
            label='Default Course Visibility'
            value={settings.courses.defaultCourseVisibility}
            onChange={(value) =>
              handleCoursesUpdate('defaultCourseVisibility', value)
            }
            options={[
              { value: 'public', label: 'Public' },
              { value: 'enrolled', label: 'Enrolled Only' },
              { value: 'private', label: 'Private' },
            ]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }} >
          <EditableNumber
          label='Default Enrollment Duration (days)'
          value={settings.courses.defaultEnrollmentDuration}
          onChange={(value) =>
            handleCoursesUpdate('defaultEnrollmentDuration', value)
          }
          min={1}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }} >
          <EditableSwitch
            label='Require Course Approval'
            value={settings.courses.courseCreation.requireApproval}
            onChange={(value) =>
              handleCoursesUpdate('courseCreation', {
                ...settings.courses.courseCreation,
                requireApproval: value,
              })
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} >
          <EditableAutoComplete<string>
            label='Course Categories'
            value={settings.courses.courseCategories}
            onChange={(value) => handleCoursesUpdate('courseCategories', value)}
            helperText='Categories available for course classification'
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
