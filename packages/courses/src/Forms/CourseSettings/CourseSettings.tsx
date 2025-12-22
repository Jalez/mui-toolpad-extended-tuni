/** @format */

// components/Channels/ChannelImporter.tsx

import { useState, useEffect } from "react";

import { useDialogStore, FormDialog, useNotificationStore, useUserActions, userBus, type UserData } from '@mui-toolpad-extended-tuni/main';
import useCourseStore, {
  CourseRaw,
  courseTemplate,
} from "../../store/useCourseStore";
import BasicInfoTab from "./tabs/BasicInfoTab";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CourseSettingsTabs from "./CourseSettingsTabs";

/**
 * CourseSettings Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Restructured import paths to follow feature-based organization
 * - Enhanced notification handling through dedicated store
 * - Improved dialog management with better state handling
 * - Updated course store integration with new path structure
 * - Enhanced TypeScript strict mode compliance
 * - Standardized string literals for consistency
 *
 * Provides interface for:
 * - Managing course basic information
 * - Configuring course visibility
 * - Managing enrollment settings
 * - Configuring staff access
 * - Setting data processing preferences
 * - Managing course relationships
 */
const CourseSettings = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { closeDialog } = useDialogStore();
  const { setCourseToUpdate, updateStateCourse, courseToUpdate } =
    useCourseStore();
  const { fetchCourseUsers } = useUserActions();
  const [formData, setFormData] = useState<CourseRaw>(
    courseToUpdate || courseTemplate
  );
  const [courseUsers, setCourseUsers] = useState<UserData[] | undefined>(undefined);
  const { addNotificationData } = useNotificationStore();

  useEffect(() => {
    if (courseToUpdate) {
      setFormData(courseToUpdate);
      fetchCourseUsers(courseToUpdate.id).then(() => {
        setCourseUsers(userBus.getCourseUsers());
      });
    } else {
      setFormData(courseTemplate);
      setCourseUsers(undefined);
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
      message: "Course settings saved successfully",
      type: "success",
    });
    closeDialog();
  };

  const handleUpdateFormData = (newData: CourseRaw) => {
    setFormData(newData);
  };

  return (
    <FormDialog
      title="Course Settings"
      submitText="Save"
      onSubmit={handleSave}
      maxWidth="lg"
      fullWidth
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: 0, // Important for flex child
          // overflow: 'hidden', // Prevent content overflow
        }}
      >
        {isLargeScreen && (
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              pb: 2,
              mb: 2,
              flex: "0 0 auto", // Don't grow, don't shrink, auto basis
              overflow: "auto", // Allow scrolling if needed
            }}
          >
            <BasicInfoTab formData={formData} setFormData={setFormData} />
          </Box>
        )}

        <Box
          sx={{
            flex: 1, // Take remaining space
            minHeight: 0, // Allow shrinking
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Contain tab content
          }}
        >
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
