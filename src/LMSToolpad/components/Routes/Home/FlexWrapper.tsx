/** @format */

import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface FlexWrapperProps {
  children: React.ReactNode;
}

const FlexWrapper = ({ children }: FlexWrapperProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const boxRef = useRef<HTMLDivElement>(null);

  const canFitSideBySide = () => {
    if (!boxRef.current) return false;
    const containerWidth = boxRef.current.clientWidth;
    const gap = 16; // Same as gap={2} in MUI (2 * 8px)

    // Calculate total width needed for all direct children
    let totalWidth = 0;
    boxRef.current.childNodes.forEach((child) => {
      if (child instanceof HTMLElement) {
        totalWidth += child.offsetWidth + gap;
      }
    });

    return totalWidth <= containerWidth;
  };

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;

    const handleTransitionStart = () => {
      // Only allow transition if there's actually space for side-by-side layout
      if (!canFitSideBySide()) return;

      setIsTransitioning(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleTransitionEnd = () => {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    };

    element.addEventListener('transitionstart', handleTransitionStart);
    element.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      element.removeEventListener('transitionstart', handleTransitionStart);
      element.removeEventListener('transitionend', handleTransitionEnd);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      display='flex'
      flexDirection='row'
      justifyContent='center'
      width='100%'
      gap={2}
      flexWrap='wrap'
      height='100%'
      sx={{
        '& > *': {
          transition:
            isTransitioning && canFitSideBySide()
              ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
        },
        willChange: 'contents',
        minHeight: '500px',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        p: 1,
      }}>
      {children}
    </Box>
  );
};

export default FlexWrapper;
