import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import GameList from "../components/GameList/GameList";
import { FilterProvider } from "../contexts/FilterContext";
import { useGames } from "../hooks/useGames";
import { useLayout } from "../hooks/useLayout";
import "./DashboardPage.scss";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    filteredGames,
    providers,
    groups,
    filters,
    setFilters,
    sorting,
    setSorting,
    resetFilters,
    loading,
    error,
  } = useGames();

  const { columns, setColumns, showFilters, toggleFilters, isMobile } =
    useLayout();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="dashboard">
      <Header onLogout={handleLogout} />
      <div className="dashboard-content">
        <div className="game-content">
          <GameList games={filteredGames} columns={isMobile ? 2 : columns} />
        </div>
        <FilterProvider
          value={{
            filters,
            setFilters,
            providers,
            groups,
            resetFilters,
            gamesAmount: filteredGames.length,
            sorting,
            setSorting,
          }}
        >
          <FilterSidebar
            showFilters={showFilters}
            onToggleFilters={toggleFilters}
            columns={columns}
            onColumnChange={setColumns}
            isMobile={isMobile}
          />
        </FilterProvider>
      </div>
    </div>
  );
};

export default DashboardPage;
