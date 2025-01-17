/** @format */

import {
  Tab,
  Tabs,
  Box,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import BasicInfoTab from './BasicInfoTab';
import StaffTab from './StaffTab';
import EnrollmentTab from './EnrollmentTab';
import VisibilityTab from './VisibilityTab';
import { CourseRaw } from '../../../store/useCourseStore';
import { UserData } from '../../../store/useUserStore';

type CourseSettingsProps = {
  formData: CourseRaw;
  handleUpdateFormData: (newData: CourseRaw) => void;
  courseUsers?: UserData[];
};

const CourseSettingsTabs = ({
  formData,
  handleUpdateFormData,
  courseUsers,
}: CourseSettingsProps) => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, newTab) => setTab(newTab)}
        sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {!isLargeScreen && (
          <Tooltip
            title='Set the core details of your course. Add a title, description, course image, and tags.'
            arrow
            enterDelay={500}
            enterNextDelay={100}>
            <Tab label='Basic Info' />
          </Tooltip>
        )}
        <Tooltip
          title='Control who can see your course. Set visibility to public, enrolled users only, or private.'
          arrow
          enterDelay={500}
          enterNextDelay={100}>
          <Tab label='Visibility' />
        </Tooltip>
        <Tooltip
          title='Manage how students can join your course. Set enrollment periods and limits.'
          arrow
          enterDelay={500}
          enterNextDelay={100}>
          <Tab label='Enrollment' />
        </Tooltip>
        <Tooltip
          title='Add or remove staff members who will help manage this course.'
          arrow
          enterDelay={500}
          enterNextDelay={100}>
          <Tab label='Staff' />
        </Tooltip>
      </Tabs>

      <Box sx={{ overflowY: 'auto', flex: 1, p: 1 }}>
        {/* Remove the Typography that was showing the description */}
        {!isLargeScreen && tab === 0 && (
          <BasicInfoTab
            formData={formData}
            setFormData={handleUpdateFormData}
          />
        )}
        {((!isLargeScreen && tab === 1) || (isLargeScreen && tab === 0)) && (
          <VisibilityTab
            formData={formData}
            setFormData={handleUpdateFormData}
          />
        )}
        {((!isLargeScreen && tab === 2) || (isLargeScreen && tab === 1)) && (
          <EnrollmentTab
            formData={formData}
            setFormData={handleUpdateFormData}
            courseUsers={courseUsers}
          />
        )}
        {((!isLargeScreen && tab === 3) || (isLargeScreen && tab === 2)) && (
          <StaffTab
            formData={formData}
            setFormData={handleUpdateFormData}
            courseUsers={courseUsers}
          />
        )}
      </Box>
    </>
  );
};

export default CourseSettingsTabs;
