import React, { useState, useEffect } from "react";
import "./tic.css";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null)); // create the game board
  const [isX, setIsX] = useState(true); // to decide the whose turn it is
  const [gameOver, setGameOver] = useState(false); // to decide is the game is over or not

  // to make the game move when it is computer's turn to play
  useEffect(() => {
    if (!isX && !gameOver) {
        makeGameMove();
    }
  }, [isX, gameOver]);

  const makeGameMove = () => {
    const bestMove = getBestMove(squares);
    const newSquares = squares.slice();
    newSquares[bestMove] = "O";
    setSquares(newSquares);
    setIsX(true);

    if (knowWinner(newSquares)) {
      setGameOver(true);
    }
  };

  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = "O";
        const score = miniMax(squares, 0, false);
        squares[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const miniMax = (squares, depth, isMaximizing) => {
    const winner = knowWinner(squares);

    if (winner === "X") {
      return -1;
    } else if (winner === "O") {
      return 1;
    } else if (squares.every((square) => square !== null)) {
        return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = "O";
          const score = miniMax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            squares[i] = "X";
          const score = miniMax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const handleClick = (i) => {
    if (knowWinner(squares) || squares[i] || gameOver) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isX ? "X" : "O";
    setSquares(newSquares);
    setIsX(!isX);

    const winner = knowWinner(newSquares);
    if (winner) {
      setGameOver(true);
    }
  };

  const knowWinner = (squares) => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPattern.length; i++) {
      const [a, b, c] = winningPattern[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const status =
  knowWinner(squares) ? `Winner: ${knowWinner(squares)}` :
  squares.every(square => square !== null) ? "It's a draw" :
  `Turn: ${isX ? "X" : "O"}`;


  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsX(true);
    setGameOver(false);
  };

  return (
    <>
      <div className="board">
        <div className="each">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="each">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="each">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
        <div>
          <h2>{status}</h2>
          <button onClick={handleRestart}>restart game</button>
        </div>
      </div>
    </>
  );
};

const Tic = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default Tic;
