/** @format */

import {
  Typography,
  Paper,
  Button,
  IconButton,
  Menu,
  Tooltip,
  Divider,
  Box,
  TextField,
  FormGroup,
} from "@mui/material";
import UserSwitcher from "./UserSwitcher";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import BuildIcon from "@mui/icons-material/Build";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useNotificationStore } from "../Notifications/store/useNotificationsStore";
import { useState, MouseEvent } from "react";

interface MockDataConfig {
  teacherCount: number;
  studentCount: number;
  adminCount: number;
  coursesPerYear: number;
  startYear: number;
  numberOfYears: number;
}

const DevelopmentTools: React.FC = () => {
  const devMode = window.location.hostname === "localhost";
  const { addNotificationData } = useNotificationStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mockConfig, setMockConfig] = useState<MockDataConfig>({
    teacherCount: 5,
    studentCount: 50,
    adminCount: 2,
    coursesPerYear: 20,
    startYear: 2021,
    numberOfYears: 4,
  });

  if (!devMode) return null;

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReset = async () => {
    try {
      addNotificationData({
        type: "info",
        message: "Resetting store...",
      });
      const response = await fetch("/api/dev/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockConfig),
      });
      if (!response.ok) throw new Error("Reset failed");

      addNotificationData({
        type: "success",
        message: "Store reset successful. Reloading page...",
      });

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      addNotificationData({
        type: "error",
        message:
          'Failed to reset store. Make sure mock service worker is running and the route "/api/dev/reset" is available and working to reset the store.',
      });
    }
  };

  const handleConfigChange =
    (field: keyof MockDataConfig) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      //Can you unfocus the input field after changing the value?
      event.target.blur();
      const value = parseInt(event.target.value) || 0;
      setMockConfig((prev) => ({
        ...prev,
        [field]: value,
      }));
      //stop the event after this- otherwise it keeps repeating
    };

  return (
    <>
      <Tooltip title="Development Tools">
        <IconButton size="small" onClick={handleOpen}>
          <BuildIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ "& .MuiList-root": { p: 0 } }}
        data-testid="development-tools-menu"
      >
        <Paper
          sx={{ width: 350, maxHeight: "80vh", overflow: "auto" }}
          data-testid="development-tools-menu-paper"
        >
          {/* Header */}
          <Box sx={{ p: 2, bgcolor: "warning.light" }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1rem",
                fontWeight: "bold",
                color: "warning.dark",
              }}
            >
              <EngineeringIcon /> Development Tools
            </Typography>
          </Box>

          <Divider />

          {/* User Simulation Section */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              User Simulation
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 1 }}
            >
              Switch between different user roles to test UI views. Note:
              Backend requests still use the original authenticated user.
            </Typography>
            <UserSwitcher />
          </Box>

          <Divider />

          {/* Mock Data Configuration */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Mock Data Configuration
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 1 }}
            >
              Configure the number of mock users and courses to generate when
              resetting the store.
            </Typography>
            <FormGroup sx={{ gap: 1 }}>
              <TextField
                label="Teacher Count"
                type="number"
                size="small"
                value={mockConfig.teacherCount}
                onChange={handleConfigChange("teacherCount")}
                slotProps={{
                  htmlInput: { min: 1, step: 2 },
                }}
              />
              <TextField
                label="Student Count"
                type="number"
                size="small"
                value={mockConfig.studentCount}
                onChange={handleConfigChange("studentCount")}
                slotProps={{
                  input: { inputMode: "numeric" },
                  htmlInput: { min: 1, step: 1 },
                }}
              />
              <TextField
                label="Admin Count"
                type="number"
                size="small"
                value={mockConfig.adminCount}
                onChange={handleConfigChange("adminCount")}
                slotProps={{
                  input: { inputMode: "numeric" },
                  htmlInput: { min: 1, step: 1 },
                }}
              />
              <TextField
                label="Courses Per Year"
                type="number"
                size="small"
                value={mockConfig.coursesPerYear}
                onChange={handleConfigChange("coursesPerYear")}
                slotProps={{
                  input: { inputMode: "numeric" },
                  htmlInput: { min: 1, step: 1 },
                }}
              />
              <TextField
                label="Start Year"
                type="number"
                size="small"
                value={mockConfig.startYear}
                onChange={handleConfigChange("startYear")}
                slotProps={{
                  input: { inputMode: "numeric" },
                  htmlInput: { min: 2000, step: 1 },
                }}
              />
              <TextField
                label="Number of Years"
                type="number"
                size="small"
                value={mockConfig.numberOfYears}
                onChange={handleConfigChange("numberOfYears")}
                slotProps={{
                  input: { inputMode: "numeric" },
                  htmlInput: { min: 1, step: 1 },
                }}
              />
            </FormGroup>
          </Box>

          <Divider />

          {/* Data Management Section */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Data Management
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 1 }}
            >
              Reset Store: Clears all local data and resets the application
              state using the configuration above. Useful when testing gets
              stuck or data becomes inconsistent.
            </Typography>
            <Button
              startIcon={<RestartAltIcon />}
              variant="outlined"
              color="warning"
              size="small"
              onClick={handleReset}
              fullWidth
            >
              Reset Store
            </Button>
          </Box>

          <Divider />

          {/* TODO Tools Section */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Planned Features
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Future development tools to be implemented:
              <ul>
                <li>Network Request Logger</li>
                <li>Performance Metrics Monitor</li>
                <li>State Inspector</li>
                <li>Error Boundary Testing</li>
                <li>Theme Switcher</li>
                <li>Mock API Response Editor</li>
              </ul>
            </Typography>
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

export default DevelopmentTools;
