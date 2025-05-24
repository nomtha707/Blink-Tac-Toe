import { useState } from "react";
import "../App.css";

function CategorySelector({ startGame }) {
  const [p1Category, setP1Category] = useState("");
  const [p2Category, setP2Category] = useState("");

  const handleStart = () => {
    if (p1Category && p2Category && p1Category !== p2Category) {
      startGame(p1Category, p2Category);
    }
  };

  const categories = ["Animals", "Food", "Sports"]; 

  return (
    <div className="container"> 
      <div className="card"> 
        <h2>Select Emoji Categories</h2> 

        <div className="input-group">
          <label htmlFor="player1-category"> 
            Player 1:
          </label>
          <select
            id="player1-category" // Added id for htmlFor
            value={p1Category}
            onChange={(e) => setP1Category(e.target.value)}
          >
            <option value="">--Select--</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="player2-category"> 
            Player 2:
          </label>
          <select
            id="player2-category" 
            value={p2Category}
            onChange={(e) => setP2Category(e.target.value)}
          >
            <option value="">--Select--</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          className="start-button" 
          disabled={!p1Category || !p2Category || p1Category === p2Category}
          onClick={handleStart}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default CategorySelector;