import "./Search.scss";
import searchIcon from "../../assets/search.png";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button className="search-button">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </div>
  );
};

export default Search;
