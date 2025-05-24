import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TicTacToe from './components/TicTacToe'
import Board from './components/Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TicTacToe />
    </div>
  )
}

export default App
