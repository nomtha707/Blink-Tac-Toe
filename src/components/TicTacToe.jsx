import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundFile from "../sounds/gameover.wav";
import clickSoundFile from "../sounds/click.wav";
import CategorySelector from "./CategorySelector";

const gameOverSound = new Audio(gameOverSoundFile);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundFile);
clickSound.volume = 0.5;

//emoji categories
const emojiCategories = {
  Animals: ["🐶", "🐱", "🐵", "🐰"],
  Food: ["🍕", "🍟", "🍔", "🍩"],
  Sports: ["⚽", "🏀", "🏈", "🎾"]
};


const winningCombos = [
    //for the rows
    {combo:[0, 1, 2], strikeClass: "strike-row-1"},
    {combo:[3, 4, 5], strikeClass: "strike-row-2"},
    {combo:[6, 7, 8], strikeClass: "strike-row-3"},

    //for the columns
    {combo:[0, 3, 6], strikeClass: "strike-column-1"},
    {combo:[1, 4, 7], strikeClass: "strike-column-2"},
    {combo:[2, 5, 8], strikeClass: "strike-column-3"},

    //for the diagonals
    {combo:[0, 4, 8], strikeClass: "strike-diagonal-1"},
    {combo:[2, 4, 6], strikeClass: "strike-diagonal-2"},
];

function checkWinner(tiles, setStrikeClass, setGameState) {
    for (const {combo, strikeClass} of winningCombos) {
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            setStrikeClass(strikeClass);
            if (tileValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }
}

function TicTacToe () {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState("P1");
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [emojiHistory, setEmojiHistory] = useState({P1 : [], P2: []});
    const [players, setPlayers] = useState({P1: null, P2: null});
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = (p1Cat, p2Cat) => {
    setPlayers({ P1: emojiCategories[p1Cat], P2: emojiCategories[p2Cat] });
    setGameStarted(true);
    };

    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress) {
            return;
        }

        if(tiles[index] !== null) {
            return;
        }

        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if (playerTurn === "P1") {
            setPlayerTurn("P2");
        } else {
            setPlayerTurn("P1");
        }
    };

    const handleReset  = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn("P1");
        setStrikeClass(null);
        setEmojiHistory({ P1: [], P2: []});
        setGameStarted(false);
    };

    useEffect(() => {
        if (gameStarted) {
            checkWinner(tiles, setStrikeClass, setGameState);
        }    
    }, [tiles]);

    useEffect (() => {
        if (tiles.some((tile) => tile !== null)) {
            clickSound.play();
        }
    }, [tiles]);

    useEffect (() => {
        if(gameState !== GameState.inProgress) {
            gameOverSound.play();
        }
    }, [gameState]);

    if (!gameStarted) {
        return <CategorySelector startGame={startGame} />;
    }

    return (
        <div>
            {!gameStarted ? (
                <CategorySelector onStart={startGame} />
            ) : (
                <>
                    <h1>Blink Tac Toe</h1>
                    <Board playerTurn={playerTurn} tiles = {tiles} onTileClick={handleTileClick} strikeClass={strikeClass}/>
                    <GameOver gameState={gameState}/>
                    <Reset gameState={gameState} onReset={handleReset}/>
                </>      
            )}
        </div>
        
    );
}

export default TicTacToe;