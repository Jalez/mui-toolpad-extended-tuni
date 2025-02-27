export interface Position {
  top: number;
  left: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type PanelRef = React.RefObject<HTMLDivElement | null>;
