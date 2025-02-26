import { createContext, useContext, useState, ReactNode } from "react";

// ...existing code if any...

interface ExpandableContextType {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const ExpandableContext = createContext<ExpandableContextType | undefined>(
  undefined
);

export const ExpandableContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <ExpandableContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </ExpandableContext.Provider>
  );
};

export const useExpandableContext = () => {
  const context = useContext(ExpandableContext);
  if (!context) {
    throw new Error(
      "useExpandableContext must be used within an ExpandableContextProvider"
    );
  }
  return context;
};
