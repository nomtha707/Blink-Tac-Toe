# Blink Tac Toe

A playful and modern twist on the original Tic Tac Toe using emoji categories and vanishing logic — built with React.js for the Darban.ai Frontend Developer Challenge.

## Objective

Create a 2-player Tic Tac Toe game that:
- Uses **emojis** instead of Xs and Os.
- Enforces a **vanishing rule** (each player can only have 3 emojis on the board at once and when the fourth emoji appears, the first disappears—FIFO logic).
- Randomly selects emojis from the **player's chosen emoji category**.
- Tracks game state and indicates a winner when a line of 3 matching emojis of that particular category is formed.

---

## Live Demo

> [https://blinktact0e.netlify.app/](https://blinktact0e.netlify.app/)

---

## Emoji Categories

Each player chooses one emoji category from the following before the game starts:

- **Animals** – 🐶 🐱 🐵 🐰  
- **Food** – 🍕 🍟 🍔 🍩  
- **Sports** – ⚽ 🏀 🏈 🎾
- **Blue** - 🧿 🐬 🪼 🧶
- **Green** - 💵 🍾 🍀 🗽

Players are randomly assigned an emoji from their selected category on every turn.

---

## Tech Stack

- **React.js** (Functional Components + Hooks)
- **CSS Grid** for layout
- **Custom Audio** for click and game-over effects

---

## Vanishing Feature

- Each player can only have **3 active emojis** of their chosen category on the board at any time.
- When a player attempts to place a 4th emoji:
  - The **oldest emoji vanishes** (FIFO logic).
  - That tile becomes empty and reusable.
  - The player **cannot place a new emoji where the oldest one was removed**.


