import GameState from "./GameState";

function GameOver( {gameState} ) {
    switch(gameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.playerOWins:
            return <div className="game-over">Player 2 wins</div>;
        case GameState.playerXWins: 
            return <div className="game-over">Player 1 wins</div>;
        default:
            return <></>;
    }
}

export default GameOver;