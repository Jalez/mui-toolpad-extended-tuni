/** @format */
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Typography, Tooltip } from "@mui/material";
import { NavigationPageStoreItem } from "../Navigation/store/types";
import React from "react";

/**
 * Sub-sections navigation component for tool pages
 */
const SubSections: React.FC<{ children: NavigationPageStoreItem[] }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!children || children.length === 0) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h3" sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}>
        Subsections
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        {children.map((child) => {
          const IconComponent = child.iconFC;
          const isActive = location.pathname.endsWith(`/${child.segment}`);

          const button = (
            <Button
              key={child.segment}
              variant={isActive ? 'outlined' : 'text'}
              size="small"
              startIcon={IconComponent ? <IconComponent fontSize="small" /> : undefined}
              onClick={() => navigate(child.segment)}
              sx={{
                minHeight: 28,
                px: 1.5,
                py: 0.25,
                fontSize: '0.8125rem',
                borderColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.main' : 'text.secondary',
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive ? 'primary.main' + '08' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive ? 'primary.main' + '12' : 'action.hover',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                },
              }}
            >
              {child.title}
            </Button>
          );

          return child.metadata?.description ? (
            <Tooltip key={child.segment} title={child.metadata.description} placement="top">
              {button}
            </Tooltip>
          ) : (
            button
          );
        })}
      </Box>
    </Box>
  );
};

export default SubSections;
