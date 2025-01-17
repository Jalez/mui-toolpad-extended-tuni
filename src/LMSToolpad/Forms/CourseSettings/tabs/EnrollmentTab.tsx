/** @format */

import { useState } from 'react';
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
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { parseDate } from '../../../utils/parseDate';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CourseRaw } from '../../../store/useCourseStore';
import { UserData } from '../../../store/useUserStore';

interface EnrollmentTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
  courseUsers?: UserData[];
}

export default function EnrollmentTab({
  formData,
  setFormData,
  courseUsers = [],
}: EnrollmentTabProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [listView, setListView] = useState<'settings' | 'enrolled' | 'pending'>(
    'settings'
  );

  console.log('courseUsers in EnrollmentTab:', courseUsers);

  const enrolledStudents = courseUsers.filter((user) => {
    console.log('Checking user:', user);
    return (
      user.role === 'student' && user.enrollmentStatus?.status === 'enrolled'
    );
  });

  const pendingStudents = courseUsers.filter((user) => {
    console.log('Checking user for pending:', user);
    return (
      user.role === 'student' && user.enrollmentStatus?.status === 'pending'
    );
  });

  console.log('Enrolled students:', enrolledStudents);
  console.log('Pending students:', pendingStudents);

  const renderEnrollmentSettings = () => (
    // <Paper sx={{ p: 2 }}>
    <Stack
      direction={isLargeScreen ? 'row' : 'column'}
      spacing={2}
      alignItems={isLargeScreen ? 'center' : 'stretch'}>
      <FormControlLabel
        control={
          <Switch
            checked={formData.enrollmentStatus.open}
            onChange={(e) =>
              setFormData({
                ...formData,
                enrollmentStatus: {
                  ...formData.enrollmentStatus,
                  open: e.target.checked,
                },
              })
            }
          />
        }
        label='Enrollment Open'
      />
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateTimePicker
          label='Enrollment Starts'
          value={parseDate(formData.enrollmentStatus.startDate)}
          onChange={(date) =>
            setFormData({
              ...formData,
              enrollmentStatus: {
                ...formData.enrollmentStatus,
                startDate: date?.toISO() || null,
              },
            })
          }
        />
        <DateTimePicker
          label='Enrollment Ends'
          value={parseDate(formData.enrollmentStatus.endDate)}
          onChange={(date) =>
            setFormData({
              ...formData,
              enrollmentStatus: {
                ...formData.enrollmentStatus,
                endDate: date?.toISO() || null,
              },
            })
          }
        />
      </LocalizationProvider>
      <TextField
        label='Maximum Students'
        type='number'
        value={formData.enrollmentStatus.maxStudents ?? ''}
        onChange={(e) =>
          setFormData({
            ...formData,
            enrollmentStatus: {
              ...formData.enrollmentStatus,
              maxStudents: e.target.value
                ? parseInt(e.target.value)
                : undefined,
            },
          })
        }
      />
    </Stack>
    // </Paper>
  );

  const renderEnrollmentLists = () => (
    <Box sx={{ mt: 2 }}>
      {!isLargeScreen && (
        <Tabs
          value={listView === 'enrolled' ? 0 : 1}
          onChange={(_, newValue) =>
            setListView(newValue === 0 ? 'enrolled' : 'pending')
          }
          sx={{ mb: 2 }}>
          <Tab label='Enrolled' />
          <Tab label='Pending' />
        </Tabs>
      )}

      <Stack direction={isLargeScreen ? 'row' : 'column'} spacing={2}>
        {(isLargeScreen || listView === 'enrolled') && (
          <Paper sx={{ flex: 1, maxHeight: 400, overflow: 'auto' }}>
            <Typography
              variant='subtitle1'
              sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              Enrolled Students ({enrolledStudents.length})
            </Typography>
            <List>
              {enrolledStudents.map((student) => (
                <ListItem key={student.id}>
                  <Avatar sx={{ mr: 2 }}>{student.name[0]}</Avatar>
                  <ListItemText
                    primary={student.name}
                    secondary={`Enrolled: ${new Date(
                      student.enrollDate || student.enrollmentStatus?.date || ''
                    ).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {(isLargeScreen || listView === 'pending') && (
          <Paper sx={{ flex: 1, maxHeight: 400, overflow: 'auto' }}>
            <Typography
              variant='subtitle1'
              sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              Pending Requests ({pendingStudents.length})
            </Typography>
            <List>
              {pendingStudents.map((student) => (
                <ListItem
                  key={student.id}
                  secondaryAction={
                    <Stack direction='row' spacing={1}>
                      <IconButton color='success'>
                        <CheckIcon />
                      </IconButton>
                      <IconButton color='error'>
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  }>
                  <Avatar sx={{ mr: 2 }}>{student.name[0]}</Avatar>
                  <ListItemText
                    primary={student.name}
                    secondary={`Requested: ${new Date(
                      student.requestDate ||
                        student.enrollmentStatus?.date ||
                        ''
                    ).toLocaleDateString()}`}
                  />
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
        value={listView === 'settings' ? 0 : 1}
        onChange={(_, newValue) =>
          setListView(newValue === 0 ? 'settings' : 'enrolled')
        }>
        <Tab label='Settings' />
        <Tab label='Students' />
      </Tabs>
      {listView === 'settings'
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
