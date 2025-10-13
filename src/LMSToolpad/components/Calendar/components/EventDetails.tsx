import { Stack, Box, Typography, Chip, Button, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RepeatIcon from "@mui/icons-material/Repeat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { EventDetailsProps } from "../types";

const EventDetails = ({
  description,
  location,
  courseColor,
  maxParticipants,
  requiresRegistration,
  teachers,
  type,
  recurring,
  onAddToCalendar,
  onRegister,
  theme,
}: EventDetailsProps) => (
  <Stack spacing={2}>
    {/* Description */}
    {description && (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Description
        </Typography>
        <Typography
          variant="body2"
          sx={{
            backgroundColor: `${courseColor}08`,
            p: 1.5,
            borderRadius: 1,
            border: `1px solid ${courseColor}20`,
          }}
        >
          {description}
        </Typography>
      </Box>
    )}

    {/* Location */}
    {location && (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Location
        </Typography>
        <Box
          sx={{
            p: 1.5,
            backgroundColor: `${courseColor}08`,
            borderRadius: 1,
            border: `1px solid ${courseColor}20`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOnIcon sx={{ color: courseColor }} />
          <Typography variant="body2">{location}</Typography>
        </Box>
      </Box>
    )}

    {/* Registration Info */}
    {(maxParticipants || requiresRegistration) && (
      <Box
        sx={{
          p: 1.5,
          backgroundColor: theme.palette.warning.light + "20",
          borderRadius: 1,
          border: `1px solid ${theme.palette.warning.light}40`,
        }}
      >
        <Typography variant="subtitle2" gutterBottom color="warning.dark">
          Registration Details
        </Typography>
        <Stack spacing={1}>
          {maxParticipants && (
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <PeopleIcon fontSize="small" />
              Available spots: {maxParticipants}
            </Typography>
          )}
          {requiresRegistration && (
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: theme.palette.warning.dark,
              }}
            >
              <HowToRegIcon fontSize="small" />
              Registration required
            </Typography>
          )}
        </Stack>
      </Box>
    )}

    {/* Event Info Tags */}
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Event Details
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip
          label={type}
          size="small"
          variant="outlined"
          sx={{ borderColor: courseColor, color: courseColor }}
        />
        {recurring && (
          <Chip
            icon={<RepeatIcon />}
            label="Recurring"
            size="small"
            variant="outlined"
            sx={{ borderColor: courseColor, color: courseColor }}
          />
        )}
      </Stack>
    </Box>

    {/* Teachers */}
    {teachers && teachers.length > 0 && (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Teachers
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {teachers.map((teacher, index) => (
            <Chip
              key={index}
              label={teacher.name}
              size="small"
              variant="outlined"
              sx={{
                borderColor: `${courseColor}40`,
                "&:hover": { borderColor: courseColor },
              }}
            />
          ))}
        </Stack>
      </Box>
    )}

    <Divider />

    {/* Action Buttons */}
    <Stack direction="row" spacing={1} justifyContent="flex-end">
      <Button
        size="small"
        startIcon={<CalendarTodayIcon />}
        onClick={onAddToCalendar}
        variant="outlined"
        sx={{
          borderColor: `${courseColor}60`,
          color: courseColor,
          "&:hover": {
            borderColor: courseColor,
            backgroundColor: `${courseColor}10`,
          },
        }}
      >
        Add to Calendar
      </Button>
      {requiresRegistration && (
        <Button
          size="small"
          startIcon={<HowToRegIcon />}
          onClick={onRegister}
          variant="contained"
          sx={{
            backgroundColor: courseColor,
            "&:hover": {
              backgroundColor: `${courseColor}dd`,
            },
          }}
        >
          Register
        </Button>
      )}
    </Stack>
  </Stack>
);

export default EventDetails;
