import { AlignJustify } from "lucide-react";
import { useFilterContext } from "contexts/FilterContext";
import Search from "./Search";
import Providers from "./Providers";
import GameGroups from "./GameGroups";
import Sorting from "./Sorting";
import Columns from "./Columns";
import "./FilterSidebar.scss";

interface FilterSidebarProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  columns: number;
  onColumnChange: (columns: number) => void;
  isMobile: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  showFilters,
  onToggleFilters,
  columns,
  onColumnChange,
  isMobile,
}) => {
  const {
    filters,
    setFilters,
    providers,
    groups,
    resetFilters,
    gamesAmount,
    sorting,
    setSorting,
  } = useFilterContext();

  const onReset = () => {
    resetFilters();
    onColumnChange(4);
  };

  return (
    <div className={`filter-sidebar ${showFilters ? "show" : ""}`}>
      <Search value={filters.name} onChange={name => setFilters({ name })} />
      <div className={`filter-content ${showFilters ? "visible" : ""}`}>
        <Providers
          providers={providers}
          selectedProviders={filters.providers}
          onProviderChange={providers => setFilters({ providers })}
        />
        <GameGroups
          groups={groups}
          selectedGroups={filters.groups}
          onGroupChange={groups => setFilters({ groups })}
        />
        <Sorting sorting={sorting} onSortingChange={setSorting} />
        {!isMobile && (
          <Columns columns={columns} onColumnChange={onColumnChange} />
        )}
        <div className="filter-footer">
          <div>Games amount: {gamesAmount}</div>
          <button className="reset-button" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
      {isMobile && (
        <button className="toggle-filters-button" onClick={onToggleFilters}>
          <AlignJustify size={20} />
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
