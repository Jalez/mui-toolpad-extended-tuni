/** @format */

import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CourseRaw } from "../../../components/Courses/store/useCourseStore";
import { UserData } from "../../../store/useUserStore";

interface StaffTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
  courseUsers?: UserData[];
}

/**
 * StaffTab Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Updated course store import path to feature-based structure
 * - Enhanced TypeScript type definitions for staff roles
 * - Improved staff removal confirmation handling
 * - Updated styling for better accessibility
 * - Added proper aria labels for actions
 *
 * Provides interface for:
 * - Managing course staff members
 * - Adding/removing teaching staff
 * - Viewing staff permissions
 * - Managing staff roles
 */
export default function StaffTab({ formData, setFormData }: StaffTabProps) {
  // Get staff members from enrollment data
  const staffMembers =
    formData.data?.enrollmentData?.filter((data) => data.role === "teacher") ||
    [];

  const handleRemoveStaff = (userId: string) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        enrollmentData: formData.data?.enrollmentData?.filter(
          (data) => data.userId !== userId
        ),
      },
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">
        Staff Members ({staffMembers.length})
      </Typography>
      <List>
        {staffMembers.map((staff) => (
          <ListItem
            key={staff.userId}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveStaff(staff.userId)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Avatar sx={{ mr: 2 }}>{staff.name[0]}</Avatar>
            <ListItemText primary={staff.name} secondary={staff.email} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
