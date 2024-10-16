import { useRef, useEffect } from "react";
import "./Columns.scss";

interface ColumnsProps {
  columns: number;
  onColumnChange: (columns: number) => void;
}

const Columns: React.FC<ColumnsProps> = ({ columns, onColumnChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSlider = () => {
      if (sliderRef.current) {
        const percentage = ((columns - 2) / 2) * 100;
        sliderRef.current.style.setProperty(
          "--slider-percentage",
          `${percentage}%`
        );
      }
    };

    updateSlider();
  }, [columns]);

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      const newColumns = Math.min(
        Math.max(Math.round(percentage * 2) + 2, 2),
        4
      );
      onColumnChange(newColumns);
    }
  };

  return (
    <div className="columns filter-section">
      <h3>Columns</h3>
      <div
        className="custom-slider"
        ref={sliderRef}
        onClick={handleSliderClick}
      >
        <div className="slider-track"></div>
        <div className="slider-progress"></div>
        {[2, 3, 4].map(value => (
          <div
            key={value}
            className={`slider-nut nut-${value} ${
              columns >= value ? "active" : ""
            }`}
            style={{ left: `${((value - 2) / 2) * 100}%` }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Columns;
