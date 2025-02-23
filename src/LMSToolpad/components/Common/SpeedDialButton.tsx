/** @format */

import React, { useState } from "react";
import { useTheme } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";

interface SpeedDialAction {
  icon: React.ReactNode;
  name: string;
  value: string;
}

interface SpeedDialButtonProps {
  actions: SpeedDialAction[];
  value: string;
  direction?: "up" | "down" | "left" | "right";
  onChange: (value: string) => void;
  icons: { [key: string]: React.ReactNode };
  openIcon?: React.ReactNode;
  size?: number;
}

export const SpeedDialButton = ({
  actions,
  value,
  direction = "down",
  onChange,
  icons,
  openIcon,
  size = 40,
}: SpeedDialButtonProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      <SpeedDial
        data-testid="speed-dial"
        ariaLabel="Options"
        direction={direction}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        icon={<SpeedDialIcon icon={icons[value]} openIcon={openIcon} />}
        FabProps={{
          sx: {
            zIndex: 10,
            border: "none",
            backgroundColor: theme.palette.background.paper,
            boxShadow: "none",
            color: theme.palette.text.primary,
            width: size,
            height: size,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
        sx={{
          zIndex: 10,
          position: "absolute",
          top: 0,
          right: 0,
          boxShadow: "none",
          "& .MuiSpeedDial-actions": {
            backgroundColor: open
              ? theme.palette.background.paper
              : "transparent",
            boxShadow: "none",
            borderRadius: 1,
          },
          "& .MuiSpeedDial-fab": {
            width: size,
            height: size,
            boxShadow: "none",
            border: "none",
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              onChange(action.value);
              setOpen(false);
            }}
            FabProps={{
              sx: {
                backgroundColor: theme.palette.background.paper,
                boxShadow: "none",
                color: theme.palette.text.primary,
                width: size - 4,
                height: size - 4,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
