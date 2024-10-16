import "./Sorting.scss";

type SortingOption = "A-Z" | "Z-A" | "Newest";

interface SortingProps {
  sorting: SortingOption;
  onSortingChange: (sorting: SortingOption) => void;
}

const Sorting: React.FC<SortingProps> = ({ sorting, onSortingChange }) => {
  return (
    <div className="sorting">
      <h3>Sorting</h3>
      <div className="sorting-buttons">
        {(["A-Z", "Z-A", "Newest"] as SortingOption[]).map(option => (
          <button
            key={option}
            onClick={() => onSortingChange(option)}
            className={`sorting-button ${sorting === option ? "selected" : ""}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sorting;
