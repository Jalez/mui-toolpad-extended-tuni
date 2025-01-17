/** @format */

import { Grid, Stack } from '@mui/material';
import { PlatformSettings } from '../../../store/usePlatformSettingsStore';
import EditableAutoComplete from '../../Components/Editables/EditableAutoComplete';
import EditableNumber from '../../Components/Editables/EditableNumber';
import EditableSelect from '../../Components/Editables/EditableSelect';
import EditableSwitch from '../../Components/Editables/EditableSwitch';

interface CoursesTabProps {
  settings: PlatformSettings;
  onUpdate: (settings: Partial<PlatformSettings>) => void;
}

export default function CoursesTab({ settings, onUpdate }: CoursesTabProps) {
  const handleCoursesUpdate = (
    key: keyof PlatformSettings['courses'],
    value: any
  ) => {
    onUpdate({ courses: { ...settings.courses, [key]: value } });
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableAutoComplete
            label='Course Creation Roles'
            value={settings.courses.whoCanCreateCourses}
            onChange={(value) =>
              handleCoursesUpdate('whoCanCreateCourses', value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Max Courses Per Teacher'
            value={settings.courses.maxCoursesPerTeacher}
            onChange={(value) =>
              handleCoursesUpdate('maxCoursesPerTeacher', value)
            }
            min={1}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Require Course Approval'
            value={settings.courses.requireCourseApproval}
            onChange={(value) =>
              handleCoursesUpdate('requireCourseApproval', value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <EditableAutoComplete
            label='Course Categories'
            value={settings.courses.courseCategories}
            onChange={(value) => handleCoursesUpdate('courseCategories', value)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
