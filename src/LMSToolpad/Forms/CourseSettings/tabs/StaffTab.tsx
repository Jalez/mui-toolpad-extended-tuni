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

export default function StaffTab({
  formData,
  setFormData,
  courseUsers = [],
}: StaffTabProps) {
  const staffMembers = courseUsers.filter((user) => user.role === 'teacher');

  const handleRemoveStaff = (staffId: string) => {
    setFormData({
      ...formData,
      staff: formData.staff?.filter((id) => id !== staffId) || [],
    });
  };

  return (
    <Stack spacing={2}>
      {/* <Paper sx={{ flex: 1, maxHeight: 400, overflow: 'auto' }}> */}
      <Typography
        variant='subtitle1'
        sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        Staff Members ({staffMembers.length})
      </Typography>
      <List>
        {staffMembers.map((staff) => (
          <ListItem
            key={staff.id}
            secondaryAction={
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => handleRemoveStaff(staff.id)}>
                <DeleteIcon />
              </IconButton>
            }>
            <Avatar sx={{ mr: 2 }}>{staff.name[0]}</Avatar>
            <ListItemText primary={staff.name} secondary={staff.email} />
          </ListItem>
        ))}
      </List>
      {/* </Paper> */}
    </Stack>
  );
}
