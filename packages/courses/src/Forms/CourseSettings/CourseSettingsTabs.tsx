/** @format */

import {
  Tab,
  Tabs,
  Box,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import BasicInfoTab from "./tabs/BasicInfoTab";
import StaffTab from "./tabs/StaffTab";
import EnrollmentTab from "./tabs/EnrollmentTab";
import VisibilityTab from "./tabs/VisibilityTab";
import { CourseRaw } from "../../store/useCourseStore";
import type { UserData } from '@mui-toolpad-extended-tuni/main';
import DataProcessingTab from "./tabs/DataProcessingTab";
import RelationshipsTab from "./tabs/RelationshipsTab";

type CourseSettingsProps = {
  formData: CourseRaw;
  handleUpdateFormData: (newData: CourseRaw) => void;
  courseUsers?: UserData[];
};

export default function CourseSettingsTabs({
  formData,
  handleUpdateFormData,
  courseUsers,
}: CourseSettingsProps) {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  // Ensure dataProcessing is initialized when the form is first loaded
  useEffect(() => {
    if (!formData.dataProcessing) {
      handleUpdateFormData({
        ...formData,
        dataProcessing: {
          purposes: ["course_delivery", "assessment"],
          retention: 365,
          thirdPartyProcessors: [],
          specialCategories: false,
          legalBasis: "consent",
        },
      });
    }
  }, [formData, handleUpdateFormData]);

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, newTab) => setTab(newTab)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {!isLargeScreen && (
          <Tooltip
            title="Set the core details of your course. Add a title, description, course image, and tags."
            arrow
            enterDelay={500}
            enterNextDelay={100}
          >
            <Tab label="Basic Info" />
          </Tooltip>
        )}
        <Tooltip
          title="Control who can see your course. Set visibility to public, enrolled users only, or private."
          arrow
          enterDelay={500}
          enterNextDelay={100}
        >
          <Tab label="Visibility" />
        </Tooltip>
        <Tooltip
          title="Manage how students can join your course. Set enrollment periods and limits."
          arrow
          enterDelay={500}
          enterNextDelay={100}
        >
          <Tab label="Enrollment" />
        </Tooltip>
        <Tooltip
          title="Add or remove staff members who will help manage this course."
          arrow
          enterDelay={500}
          enterNextDelay={100}
        >
          <Tab label="Staff" />
        </Tooltip>
        <Tooltip
          title="Set data processing details. Define purposes, retention period, and legal basis."
          arrow
          enterDelay={500}
          enterNextDelay={100}
        >
          <Tab label="Data Processing" />
        </Tooltip>
        <Tooltip
          title="Manage course relationships, prerequisites, and related courses"
          arrow
          enterDelay={500}
          enterNextDelay={100}
        >
          <Tab label="Relationships" />
        </Tooltip>
      </Tabs>

      <Box sx={{ overflowY: "auto", flex: 1, p: 1 }}>
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
        {((!isLargeScreen && tab === 4) || (isLargeScreen && tab === 3)) && (
          <DataProcessingTab
            formData={formData}
            setFormData={handleUpdateFormData}
          />
        )}
        {((!isLargeScreen && tab === 5) || (isLargeScreen && tab === 4)) && (
          <RelationshipsTab
            formData={formData}
            setFormData={handleUpdateFormData}
          />
        )}
      </Box>
    </>
  );
}
