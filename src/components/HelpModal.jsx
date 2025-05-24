import React from 'react';

function HelpContent() {
  return (
    <div className="help-section-content">
      <h2>How to Play Blink Tac Toe</h2>
      <ul>
        <li>The game is played on a 3×3 grid.</li>
        <li>Each player selects an emoji category before starting (e.g., Animals, Food, Sports).</li>
        <li>On each turn, a player is given a random emoji from their category to place.</li>
        <li>Players can only have 3 emojis on the board at any time (oldest one vanishes).</li>
        <li>You can’t place a new emoji where your oldest one vanished.</li>
        <li>First player to align 3 of their emojis (horizontally, vertically, or diagonally) wins.</li>
      </ul>
    </div>
  );
}

function HelpModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <HelpContent /> 
      </div>
    </div>
  );
}

export default HelpModal; 