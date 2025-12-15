/** @format */

import { useState } from "react";
import {
  Stack,
  FormControlLabel,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { parseDate } from "../../../utils/parseDate";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CourseRaw } from "../../../components/Courses/store/useCourseStore";
import { UserData } from "../../../store/useUserStore";

interface EnrollmentTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
  courseUsers?: UserData[];
}

/**
 * EnrollmentTab Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Enhanced TypeScript string literal types
 * - Improved student list management with better state handling
 * - Updated styling for better visual hierarchy
 * - Enhanced date handling with proper typing
 * - Improved responsive design for mobile and desktop views
 * - Added proper type definitions for enrollment statuses
 *
 * Provides interface for:
 * - Managing course enrollment settings
 * - Handling student enrollment requests
 * - Setting enrollment periods
 * - Managing enrollment capacity
 * - Viewing enrolled and pending students
 */
export default function EnrollmentTab({
  formData,
  setFormData,
  courseUsers = [],
}: EnrollmentTabProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [listView, setListView] = useState<"settings" | "enrolled" | "pending">(
    "settings"
  );

  // Filter enrolled and pending students using new data structure
  const enrolledStudents =
    formData.data?.enrollmentData?.filter(
      (data) => data.role === "student" && data.status === "enrolled"
    ) || [];

  const pendingStudents =
    formData.data?.enrollmentData?.filter(
      (data) => data.role === "student" && data.status === "pending"
    ) || [];

  const renderEnrollmentSettings = () => (
    <Stack
      direction={isLargeScreen ? "row" : "column"}
      spacing={2}
      alignItems={isLargeScreen ? "center" : "stretch"}
    >
      <FormControlLabel
        control={
          <Switch
            checked={formData.enrollment?.status.open ?? false}
            onChange={(e) =>
              setFormData({
                ...formData,
                enrollment: {
                  startDate: formData.enrollment?.startDate ?? null,
                  endDate: formData.enrollment?.endDate ?? null,
                  status: {
                    open: e.target.checked,
                    maxStudents: formData.enrollment?.status.maxStudents,
                  },
                },
              })
            }
          />
        }
        label="Enrollment Open"
      />
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateTimePicker
          label="Enrollment Starts"
          value={parseDate(formData.enrollment?.startDate)}
          onChange={(date) =>
            setFormData({
              ...formData,
              enrollment: {
                startDate: date?.toISO() ?? null,
                endDate: formData.enrollment?.endDate ?? null,
                status: {
                  open: formData.enrollment?.status.open ?? false,
                  maxStudents: formData.enrollment?.status.maxStudents,
                },
              },
            })
          }
        />
        <DateTimePicker
          label="Enrollment Ends"
          value={parseDate(formData.enrollment?.endDate)}
          onChange={(date) =>
            setFormData({
              ...formData,
              enrollment: {
                startDate: formData.enrollment?.startDate ?? null,
                endDate: date?.toISO() ?? null,
                status: {
                  open: formData.enrollment?.status.open ?? false,
                  maxStudents: formData.enrollment?.status.maxStudents,
                },
              },
            })
          }
        />
      </LocalizationProvider>
      <TextField
        label="Maximum Students"
        type="number"
        value={formData.enrollment?.status.maxStudents ?? ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            enrollment: {
              startDate: formData.enrollment?.startDate ?? null,
              endDate: formData.enrollment?.endDate ?? null,
              status: {
                open: formData.enrollment?.status.open ?? false,
                maxStudents: e.target.value
                  ? parseInt(e.target.value)
                  : undefined,
              },
            },
          })
        }
      />
    </Stack>
  );

  // Update enrollment lists to use new data structure
  const renderEnrollmentLists = () => (
    <Box sx={{ mt: 2 }}>
      {!isLargeScreen && (
        <Tabs
          value={listView === "enrolled" ? 0 : 1}
          onChange={(_, newValue) =>
            setListView(newValue === 0 ? "enrolled" : "pending")
          }
          sx={{ mb: 2 }}
        >
          <Tab label="Enrolled" />
          <Tab label="Pending" />
        </Tabs>
      )}

      <Stack direction={isLargeScreen ? "row" : "column"} spacing={2}>
        {(isLargeScreen || listView === "enrolled") && (
          <Paper sx={{ flex: 1, maxHeight: 400, overflow: "auto" }}>
            <Typography
              variant="subtitle1"
              sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
            >
              Enrolled Students ({enrolledStudents.length})
            </Typography>
            <List>
              {enrolledStudents.map((enrollment) => (
                <ListItem key={enrollment.userId}>
                  <Avatar sx={{ mr: 2 }}>{enrollment.name[0]}</Avatar>
                  <ListItemText
                    primary={enrollment.name}
                    secondary={enrollment.email}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {(isLargeScreen || listView === "pending") && (
          <Paper sx={{ flex: 1, maxHeight: 400, overflow: "auto" }}>
            <Typography
              variant="subtitle1"
              sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
            >
              Pending Requests ({pendingStudents.length})
            </Typography>
            <List>
              {pendingStudents.map((student) => (
                <ListItem
                  key={student.userId}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton color="success">
                        <CheckIcon />
                      </IconButton>
                      <IconButton color="error">
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <Avatar sx={{ mr: 2 }}>{student.name[0]}</Avatar>
                  {/* <ListItemText
                    primary={student.name}
                    secondary={`Requested: ${new Date(
                      student.requestDate ||
                        student.enrollmentStatus?.date ||
                        ''
                    ).toLocaleDateString()}`}
                  /> */}
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Stack>
    </Box>
  );

  return !isLargeScreen ? (
    <Stack spacing={2}>
      <Tabs
        value={listView === "settings" ? 0 : 1}
        onChange={(_, newValue) =>
          setListView(newValue === 0 ? "settings" : "enrolled")
        }
      >
        <Tab label="Settings" />
        <Tab label="Students" />
      </Tabs>
      {listView === "settings"
        ? renderEnrollmentSettings()
        : renderEnrollmentLists()}
    </Stack>
  ) : (
    <Stack spacing={2}>
      {renderEnrollmentSettings()}
      {renderEnrollmentLists()}
    </Stack>
  );
}
