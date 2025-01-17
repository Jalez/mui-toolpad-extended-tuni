export interface ColumnConfig<T extends string> {
  key: T;
  minWidth: number;
  width: number;
  squeezable: boolean;
  label: string;
}

export interface SqueezableTableProps<T extends string> {
  columns: ColumnConfig<T>[];
  renderCell: (columnKey: T, rowData: any) => React.ReactNode;
  data: any[];
  maxHeight?: string | number;
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
