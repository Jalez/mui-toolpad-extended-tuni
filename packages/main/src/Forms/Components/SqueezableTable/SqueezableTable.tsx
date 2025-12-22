/** @format */

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { SqueezableTableProps, TableCellProps } from './types';

function SqueezableTableCell<T extends string>({
  columnKey,
  config,
  isSmallScreen,
  isExpanded,
  onHover,
  onClick,
  children,
}: TableCellProps<T>) {
  const cellStyles = {
    width:
      !isSmallScreen || !config.squeezable
        ? config.width
        : isExpanded
          ? config.width
          : config.minWidth,
    padding: '16px 4px',
    transition: 'all 0.2s ease-in-out',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: config.squeezable && isSmallScreen ? 'pointer' : 'default',
    flex: config.squeezable && isSmallScreen ? (isExpanded ? 1 : 0.1) : 'none',
    opacity: config.squeezable && isSmallScreen ? (isExpanded ? 1 : 0.25) : 1,
    '& > *': {
      opacity: config.squeezable && isSmallScreen ? (isExpanded ? 1 : 0) : 1,
      transition: 'opacity 0.15s ease',
    },
  };

  return (
    <TableCell
      sx={cellStyles}
      onMouseEnter={() => config.squeezable && onHover(columnKey)}
      onMouseLeave={() => config.squeezable && onHover(null)}
      onClick={() => config.squeezable && isSmallScreen && onClick(columnKey)}>
      {children}
    </TableCell>
  );
}

export function SqueezableTable<T extends string>({
  columns,
  renderCell,
  data,
  maxHeight = '400px',
  stickyHeader = true,
}: SqueezableTableProps<T>) {
  const [hoveredColumn, setHoveredColumn] = useState<T | null>(null);
  const [expandedColumn, setExpandedColumn] = useState<T | null>(null);
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleColumnClick = (columnKey: T) => {
    setExpandedColumn((current) => (current === columnKey ? null : columnKey));
  };

  const isColumnExpanded = (columnKey: T) =>
    expandedColumn === columnKey ||
    hoveredColumn === columnKey ||
    (expandedColumn === null && hoveredColumn === null);

  return (
    <Box
      sx={{
        width: '100%', // fill all available width
        height: maxHeight,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Table
          stickyHeader={stickyHeader}
          sx={{
            width: '100%', // table also stretches to full width
            tableLayout: 'fixed',
            '& .MuiTableRow-root': {
              display: 'flex',
            },
            '& .MuiTableCell-root': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiTableHead-root': {
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'background.paper',
            },
          }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <SqueezableTableCell
                  key={column.key}
                  columnKey={column.key}
                  config={column}
                  isSmallScreen={isSmallScreen}
                  isExpanded={isColumnExpanded(column.key)}
                  onHover={setHoveredColumn}
                  onClick={handleColumnClick}>
                  {column.label}
                </SqueezableTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <SqueezableTableCell
                    key={column.key}
                    columnKey={column.key}
                    config={column}
                    isSmallScreen={isSmallScreen}
                    isExpanded={isColumnExpanded(column.key)}
                    onHover={setHoveredColumn}
                    onClick={handleColumnClick}>
                    {renderCell(column.key, row)}
                  </SqueezableTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
