import { useState, useCallback, useMemo } from "react";
import { useGetApi } from "./useApi";
import { Game, Group, Provider, DataResponse } from "types";

interface UseGamesReturn {
  allGames: Game[];
  filteredGames: Game[];
  providers: Provider[];
  groups: Group[];
  filters: {
    name: string;
    providers: number[];
    groups: number[];
  };
  setFilters: (filters: Partial<UseGamesReturn["filters"]>) => void;
  sorting: "A-Z" | "Z-A" | "Newest";
  setSorting: (sorting: "A-Z" | "Z-A" | "Newest") => void;
  resetFilters: () => void;
  loading: boolean;
  error: Error | null;
}

export const useGames = (): UseGamesReturn => {
  const { data, loading, error } = useGetApi<DataResponse>("games");

  const [filters, setFilters] = useState({
    name: "",
    providers: [] as number[],
    groups: [] as number[],
  });
  const [sorting, setSorting] = useState<"A-Z" | "Z-A" | "Newest">("A-Z");

  const filterAndSortGames = useCallback(() => {
    if (!data?.games) return [];

    let result = data.games;

    result = result.filter(game => {
      const nameMatch = game.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const providerMatch =
        filters.providers.length === 0 ||
        filters.providers.includes(game.provider);
      const groupMatch =
        filters.groups.length === 0 ||
        filters.groups.some(groupId =>
          data.groups.find(g => g.id === groupId)?.games.includes(game.id)
        );
      return nameMatch && providerMatch && groupMatch;
    });

    // Apply sorting
    result.sort((a, b) => {
      if (sorting === "A-Z") return a.name.localeCompare(b.name);
      if (sorting === "Z-A") return b.name.localeCompare(a.name);
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // 'Newest'
    });

    return result;
  }, [data, filters, sorting]);

  const filteredGames = useMemo(
    () => filterAndSortGames(),
    [filterAndSortGames]
  );

  const resetFilters = useCallback(() => {
    setFilters({ name: "", providers: [], groups: [] });
    setSorting("A-Z");
  }, []);

  return {
    allGames: data?.games || [],
    filteredGames,
    providers: data?.providers || [],
    groups: data?.groups || [],
    filters,
    setFilters: newFilters => setFilters(prev => ({ ...prev, ...newFilters })),
    sorting,
    setSorting,
    resetFilters,
    loading,
    error,
  };
};
