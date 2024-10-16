import GameCard from "components/GameCard/GameCard";
import "./GameList.scss";

interface Game {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: string;
}

interface GameListProps {
  games: Game[];
  columns: number;
}

const GameList: React.FC<GameListProps> = ({ games, columns }) => {
  return (
    <div className={`game-list columns-${columns}`}>
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
