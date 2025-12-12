import React, { createContext, useContext, ReactNode } from "react";
import { PanelRef } from "../../types";

interface MovableContextType {
  parentRef: PanelRef;
}

const MovableContext = createContext<MovableContextType | undefined>(undefined);

export const MovableContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  return (
    <MovableContext.Provider value={{ parentRef }}>
      {children}
    </MovableContext.Provider>
  );
};

export const useMovableContext = () => {
  const context = useContext(MovableContext);
  if (!context) {
    throw new Error("Panel must be used inside Panels");
  }
  return context;
};
