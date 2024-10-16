import "./GameCard.scss";

interface Game {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.cover} alt={game.name} />
      <div className="game-name">{game.name}</div>
    </div>
  );
};

export default GameCard;
