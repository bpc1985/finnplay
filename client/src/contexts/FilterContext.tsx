import React, { createContext, useContext } from "react";
import { Group, Provider } from "../types";

interface FilterContextType {
  filters: {
    name: string;
    providers: number[];
    groups: number[];
  };
  setFilters: (filters: Partial<FilterContextType["filters"]>) => void;
  providers: Provider[];
  groups: Group[];
  resetFilters: () => void;
  gamesAmount: number;
  sorting: "A-Z" | "Z-A" | "Newest";
  setSorting: (sorting: "A-Z" | "Z-A" | "Newest") => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<{
  value: FilterContextType;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
);
