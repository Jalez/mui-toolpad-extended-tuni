/** @format */

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { parseDate } from "../../../utils/parseDate";
import { CourseRaw } from "../../../components/Courses/store/useCourseStore";

interface VisibilityTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
}

/**
 * VisibilityTab Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Standardized string literals for visibility modes
 * - Enhanced type safety for visibility settings
 * - Improved date picker integration
 * - Added helper text explanations for each visibility mode
 * - Updated styling for better visual feedback
 *
 * Provides interface for:
 * - Setting course visibility mode
 * - Configuring visibility periods
 * - Managing access control
 * - Setting visibility schedules
 */
export default function VisibilityTab({
  formData,
  setFormData,
}: VisibilityTabProps) {
  const getVisibilityExplanation = (mode: CourseRaw["visibility"]["mode"]) => {
    switch (mode) {
      case "public":
        return "Course is visible to everyone, including non-logged-in users.";
      case "enrolled":
        return "Course is only visible to users who are enrolled in the course.";
      case "private":
        return "Course is only visible to course staff.";
      default:
        return "";
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Stack spacing={2}>
        <Stack>
          <FormControl fullWidth>
            <InputLabel id="visibility-mode-label">Visibility Mode</InputLabel>
            <Select
              labelId="visibility-mode-label"
              id="visibility-mode-select"
              label="Visibility Mode"
              value={formData.visibility.mode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visibility: {
                    ...formData.visibility,
                    mode: e.target.value as CourseRaw["visibility"]["mode"],
                  },
                })
              }
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="enrolled">Enrolled Only</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, ml: 1 }}
          >
            {getVisibilityExplanation(formData.visibility.mode)}
          </Typography>
        </Stack>
        <DateTimePicker
          label="Visible From"
          value={parseDate(formData.visibility.startDate)}
          onChange={(date) =>
            setFormData({
              ...formData,
              visibility: {
                ...formData.visibility,
                startDate: date?.toISO() || null,
              },
            })
          }
        />
        <DateTimePicker
          label="Visible Until"
          value={parseDate(formData.visibility.endDate)}
          onChange={(date) =>
            setFormData({
              ...formData,
              visibility: {
                ...formData.visibility,
                endDate: date?.toISO() || null,
              },
            })
          }
        />
      </Stack>
    </LocalizationProvider>
  );
}
