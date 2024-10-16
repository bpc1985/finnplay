import React from "react";
import "./GameGroups.scss";

interface Group {
  id: number;
  name: string;
  games: number[];
}

interface GameGroupsProps {
  groups: Group[];
  selectedGroups: number[];
  onGroupChange: (groups: number[]) => void;
}

const GameGroups: React.FC<GameGroupsProps> = ({
  groups,
  selectedGroups,
  onGroupChange,
}) => {
  return (
    <div className="game-groups">
      <h3>Game groups</h3>
      <div className="group-list">
        {groups.map(group => (
          <button
            key={group.id}
            className={`group-button ${
              selectedGroups.includes(group.id) ? "selected" : ""
            }`}
            onClick={() => {
              const updatedGroups = selectedGroups.includes(group.id)
                ? selectedGroups.filter(g => g !== group.id)
                : [...selectedGroups, group.id];
              onGroupChange(updatedGroups);
            }}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameGroups;
