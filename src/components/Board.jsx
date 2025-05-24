import Tile from './Tile';
import Strike from "./Strike";

function Board({ tiles, onTileClick, playerTurn, strikeClass }) {
  return (
    <div className="board">
      {tiles.map((value, index) => (
        <Tile
          key={index}
          playerTurn={playerTurn}
          onClick={() => onTileClick(index)}
          value={value}
          className={`tile ${[0, 1, 3, 4, 6, 7].includes(index) ? 'right-border' : ''} ${index < 6 ? 'bottom-border' : ''}`}
        />
      ))}
      <Strike strikeClass={strikeClass} />
    </div>
  );
}

export default Board;