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

function checkWinner(tiles, setStrikeClass, setGameState) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //row wise wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //column wise wins
        [0, 4, 8], [2, 4, 6]             //diagonal wise wins
    ];

    const strikeMap = {
        "0,1,2" : "strike-row-1",
        "3,4,5" : "strike-row-2",
        "6,7,8" : "strike-row-3",
        "0,3,6" : "strike-column-1",
        "1,4,7" : "strike-column-2",
        "2,5,8" : "strike-column-3",
        "0,4,8" : "strike-diagonal-1",
        "2,4,6" : "strike-diagonal-2"
    };

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        const va = tiles[a];
        const vb = tiles[b];
        const vc = tiles[c];

        if (
            va && vb && vc &&
            va.player === vb.player && 
            vb.player === vc.player 
        ) {
            setStrikeClass(strikeMap[combo.join(",")]);
            setGameState(va.player === "P1" ? GameState.playerXWins : GameState.playerOWins);
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

        const emojiList = players[playerTurn];
        const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        const history = {...emojiHistory};
        const newTiles = [...tiles];

        //remove the oldest emoji if more than 3
        if (history[playerTurn].length === 3) {
            const removed = history[playerTurn].shift();
            newTiles[removed.index] = null;
        }

        newTiles[index] = { emoji: randomEmoji, player: playerTurn};
        history[playerTurn].push({ index, emoji: randomEmoji });

        setTiles(newTiles);
        setEmojiHistory(history);
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

    return (
        <div>
            {!gameStarted ? (
                <CategorySelector startGame={startGame} />
            ) : (
                <>
                    <h1>Blink Tac Toe</h1>
                    <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass}/>
                    <GameOver gameState={gameState}/>
                    <Reset gameState={gameState} onReset={handleReset}/>
                </>
            )}
        </div>
    );
}

export default TicTacToe;