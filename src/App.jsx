import { useState } from 'react'


function Square({value, onSquareClick}) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({xIsNext, squares, onPlay}) {

  function hancleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    }else {
      nextSquares[i] = 'O';
    }
    
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
    let status = '';
    if (winner) {
      status = 'Winner: ' + winner;
    }else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  return (
    <>
    <div className="status">{status}</div>

    <div className="board">
      <Square value={squares[0]} onSquareClick={() => hancleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => hancleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => hancleClick(2)}/>
      <Square value={squares[3]} onSquareClick={() => hancleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => hancleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => hancleClick(5)}/>
      <Square value={squares[6]} onSquareClick={() => hancleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => hancleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => hancleClick(8)}/>
    </div>
    </>

  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

export default function App() {
  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay (nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    sethistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="App">
      <div className='game'>
      <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}