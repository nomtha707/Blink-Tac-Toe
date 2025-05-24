import React from "react";

// Header with reset and player info
function GameStart({ players, resetGame }) {
  return (
    <div className="game-info">
      <h3>Player 1: {players.P1.join(" ")} | Player 2: {players.P2.join(" ")}</h3>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
}

export default GameStart;