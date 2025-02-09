/** @format */

// CollapsingButtons.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Collapse, Tooltip } from '@mui/material';

interface CollapsingButtonsProps {
  collapseIcon: React.ReactNode;
  children: React.ReactNode;
  collapseWidth: number;
  delay?: number;
  tooltipTitle?: string;
  fullWidth?: boolean; // new prop
}

export const CollapsingButtons = ({
  collapseIcon,
  children,
  collapseWidth,
  delay = 150,
  tooltipTitle = 'More actions',
  fullWidth = false, // default false
}: CollapsingButtonsProps) => {
  const [isExpanded, setIsExpanded] = useState(fullWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<any>(null);

  // Always keep expanded if fullWidth is true
  useEffect(() => {
    setIsExpanded(fullWidth);
  }, [fullWidth]);

  const handleMouseEnter = () => {
    if (fullWidth) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsExpanded(true), delay);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fullWidth) return;
    if (
      containerRef.current &&
      e.relatedTarget &&
      containerRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsExpanded(false), delay);
  };

  return (
    <Box
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: isExpanded ? (fullWidth ? '100%' : 'auto') : collapseWidth,
        minWidth: collapseWidth,
        overflow: 'hidden',
        transition: (theme) =>
          theme.transitions.create('width', {
            duration: 300,
            easing: theme.transitions.easing.easeInOut,
          }),
      }}>
      {!isExpanded && !fullWidth && (
        <Tooltip title={tooltipTitle}>
          <IconButton size='small' sx={{ minWidth: collapseWidth }}>
            {collapseIcon}
          </IconButton>
        </Tooltip>
      )}
      <Collapse
        in={isExpanded}
        orientation='horizontal'
        timeout={300}
        sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
