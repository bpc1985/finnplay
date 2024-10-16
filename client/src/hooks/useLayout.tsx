import { useState, useEffect, useCallback } from "react";

interface UseLayoutReturn {
  columns: number;
  setColumns: (columns: number) => void;
  showFilters: boolean;
  toggleFilters: () => void;
  isMobile: boolean;
}

export const useLayout = (): UseLayoutReturn => {
  const [columns, setColumns] = useState(4);
  const [showFilters, setShowFilters] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setColumns(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  return {
    columns,
    setColumns,
    showFilters,
    toggleFilters,
    isMobile,
  };
};
