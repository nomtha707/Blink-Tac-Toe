import { useState } from "react";

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
    <div className="category-selector">
      <h2>Select Emoji Categories</h2>
      <div>
        <label>
          Player 1:
          <select value={p1Category} onChange={(e) => setP1Category(e.target.value)}>
            <option value="">--Select--</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Player 2:
          <select value={p2Category} onChange={(e) => setP2Category(e.target.value)}>
            <option value="">--Select--</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>
      <button disabled={!p1Category || !p2Category || p1Category === p2Category} onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
}

export default CategorySelector;
