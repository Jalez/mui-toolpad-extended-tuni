/** @format */

import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CourseRaw } from '../../../store/useCourseStore';
import { UserData } from '../../../store/useUserStore';

interface StaffTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
  courseUsers?: UserData[];
}

export default function StaffTab({ formData, setFormData }: StaffTabProps) {
  // Get staff members from enrollment data
  const staffMembers =
    formData.data?.enrollmentData?.filter((data) => data.role === 'teacher') ||
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
      <Typography variant='subtitle1'>
        Staff Members ({staffMembers.length})
      </Typography>
      <List>
        {staffMembers.map((staff) => (
          <ListItem
            key={staff.userId}
            secondaryAction={
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => handleRemoveStaff(staff.userId)}>
                <DeleteIcon />
              </IconButton>
            }>
            <Avatar sx={{ mr: 2 }}>{staff.name[0]}</Avatar>
            <ListItemText primary={staff.name} secondary={staff.email} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
