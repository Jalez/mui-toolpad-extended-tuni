/** @format */

export interface ColumnConfig<T extends string> {
  key: T;
  minWidth: number;
  width: number;
  squeezable: boolean;
  label: string;
}

export interface SqueezableTableProps<T extends string> {
  columns: ColumnConfig<T>[];
  data: readonly any[] | any[]; // Updated to accept readonly arrays
  renderCell: (columnKey: T, row: any) => React.ReactNode;
  maxHeight?: string;
  stickyHeader?: boolean;
}

export interface TableCellProps<T extends string> {
  columnKey: T;
  config: ColumnConfig<T>;
  isSmallScreen: boolean;
  isExpanded: boolean;
  onHover: (key: T | null) => void;
  onClick: (key: T) => void;
  children: React.ReactNode;
}
