/** @format */

import {
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Box,
  ClickAwayListener,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Search as SearchIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onExpandChange?: (expanded: boolean) => void;
}

const SearchBar = ({ onExpandChange }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (isLargeScreen) {
      setIsExpanded(true);
      setIsVisible(true);
    } else {
      // Reset states when screen becomes smaller
      setIsExpanded(false);
      setTimeout(() => setIsVisible(false), 300);
      setSearchQuery('');
    }
  }, [isLargeScreen]);

  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleExpand = () => {
    if (!isLargeScreen) {
      setIsVisible(true);
      // Delay the width expansion slightly for smooth animation
      setTimeout(() => setIsExpanded(true), 50);
    }
  };

  const handleCollapse = () => {
    if (!isLargeScreen && !searchQuery) {
      setIsExpanded(false);
      // Wait for width transition before hiding
      setTimeout(() => setIsVisible(false), 300);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleCollapse}>
      <Box
        sx={{
          position: 'relative',
          height: 40,
          display: 'flex',
          alignItems: 'center',
          minWidth: 40,
          zIndex: 1000, // Ensure container is above CollapsibleMenu
        }}
        onMouseEnter={handleExpand}
        onMouseLeave={handleCollapse}>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: isExpanded ? 250 : 40,
            opacity: isVisible ? 1 : 0,
            visibility: isVisible ? 'visible' : 'hidden',
            pointerEvents: isVisible ? 'auto' : 'none',
            zIndex: 1001, // Higher than CollapsibleMenu
            borderRadius: 1,
            overflow: 'hidden',
            transitionProperty: 'width, opacity, box-shadow',
            transitionDuration: `${theme.transitions.duration.standard}ms`,
            transitionTimingFunction: theme.transitions.easing.easeInOut,
            '& .MuiInputBase-root': {
              transition: `opacity ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
              opacity: isExpanded ? 1 : 0,
            },
          }}>
          <TextField
            size='small'
            autoFocus={!isLargeScreen}
            placeholder='Search courses...'
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='small' />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
            }}
          />
        </Box>
        <Tooltip title='Search courses'>
          <IconButton
            size='small'
            onClick={handleExpand}
            sx={{
              opacity: isExpanded ? 0 : 1,
              visibility: isExpanded ? 'hidden' : 'visible',
              transition: `opacity ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
              position: 'relative',
              zIndex: 999, // Lower than expanded search
            }}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
