/** @format */

// components/Channels/ChannelImporter.tsx

import { useState, useEffect } from 'react';

import useDialogStore from '../../store/useDialogStore';
import useCourseStore, {
  CourseRaw,
  courseTemplate,
} from '../../store/useCourseStore';
import FormDialog from '../../components/Dialogs/FormDialog';
import BasicInfoTab from './tabs/BasicInfoTab';
import { Box, useMediaQuery, useTheme } from '@mui/system';
import CourseSettingsTabs from './CourseSettingsTabs';
import { useNotificationStore } from '../../store/useNotificationsStore';
import { useUserStore } from '../../store/useUserStore';

const CourseSettings = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { closeDialog } = useDialogStore();
  const { setCourseToUpdate, updateStateCourse, courseToUpdate } =
    useCourseStore();
  const { fetchCourseUsers, courseUsers } = useUserStore();
  const [formData, setFormData] = useState<CourseRaw>(
    courseToUpdate || courseTemplate
  );
  const { addNotificationData } = useNotificationStore();

  useEffect(() => {
    if (courseToUpdate) {
      setFormData(courseToUpdate);
      fetchCourseUsers(courseToUpdate.id);
    } else {
      setFormData(courseTemplate);
    }
  }, [courseToUpdate, fetchCourseUsers]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!courseToUpdate) return;

    const updatedCourse = {
      ...courseToUpdate,
      ...formData,
      tags: formData.tags ?? [],
      visibility: {
        ...formData.visibility,
        startDate: formData.visibility.startDate
          ? new Date(formData.visibility.startDate).toISOString()
          : null,
        endDate: formData.visibility.endDate
          ? new Date(formData.visibility.endDate).toISOString()
          : null,
      },
      enrollment: {
        ...formData.enrollment,
        startDate: formData.enrollment?.startDate
          ? new Date(formData.enrollment.startDate).toISOString()
          : null,
        endDate: formData.enrollment?.endDate
          ? new Date(formData.enrollment.endDate).toISOString()
          : null,
        status: {
          open: formData.enrollment?.status.open ?? false,
          maxStudents: formData.enrollment?.status.maxStudents,
        },
      },
    };

    await updateStateCourse(updatedCourse);

    setCourseToUpdate(null);
    addNotificationData({
      message: 'Course settings saved successfully',
      type: 'success',
    });
    closeDialog();
  };

  const handleUpdateFormData = (newData: CourseRaw) => {
    setFormData(newData);
  };

  return (
    <FormDialog
      title='Course Settings'
      submitText='Save'
      onSubmit={handleSave}
      maxWidth='lg'
      fullWidth>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0, // Important for flex child
          // overflow: 'hidden', // Prevent content overflow
        }}>
        {isLargeScreen && (
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              pb: 2,
              mb: 2,
              flex: '0 0 auto', // Don't grow, don't shrink, auto basis
              overflow: 'auto', // Allow scrolling if needed
            }}>
            <BasicInfoTab formData={formData} setFormData={setFormData} />
          </Box>
        )}

        <Box
          sx={{
            flex: 1, // Take remaining space
            minHeight: 0, // Allow shrinking
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // Contain tab content
          }}>
          <CourseSettingsTabs
            formData={formData}
            handleUpdateFormData={handleUpdateFormData}
            courseUsers={courseUsers}
          />
        </Box>
      </Box>
    </FormDialog>
  );
};

export default CourseSettings;
