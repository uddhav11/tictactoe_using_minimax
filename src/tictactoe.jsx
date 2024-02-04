// import React, { useState } from "react";
// import "./App.css";

// const Square = ({ value, onClick }) => {
//   return (
//     <button className="square" onClick={onClick}>
//       {value}
//     </button>
//   );
// };

// const Board = (i) => {
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   const [isX, setisX] = useState(true);

//   const handleClick = (i) => {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
 
//     }
//     squares[i] = isX ? "X" : "O";
//     setSquares(squares);
//     setisX(!isX);
//   };
//   const calculateWinner = (squares) => {
//     const winningPattern = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < winningPattern.length; i++) {
//       const [a, b, c] = winningPattern[i];

//       if (
//         squares[a] &&
//         squares[a] === squares[b] &&
//         squares[a] === squares[c]
//       ) {
//         return squares[a];
//       }
//     }
//     return null;
//   };

//   const winner = calculateWinner(squares);
//   let status;

//   if (winner) {
//     status = `Winner ${winner}`;
//   } else {
//     status = `Next player: ${isX ? "X" : "O"}`;
//   }

//   const handleRestart = () => {
//     setisX(true);
//     setSquares(Array(9).fill(null));
//   };


// //   we can use this isatead of the complete statement in the JSX part of the return
// //   const renderSquare=(i) => {
// //     return <Square value={squares[i]} onClick={() => handleClick(i)}
// //   }


//   return (
//     <div className="board">
//       <div className="board-row">
//         <Square value={squares[0]} onClick={() => handleClick(0)} />
//         <Square value={squares[1]} onClick={() => handleClick(1)} />
//         <Square value={squares[2]} onClick={() => handleClick(2)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[3]} onClick={() => handleClick(3)} />
//         <Square value={squares[4]} onClick={() => handleClick(4)} />
//         <Square value={squares[5]} onClick={() => handleClick(5)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[6]} onClick={() => handleClick(6)} />
//         <Square value={squares[7]} onClick={() => handleClick(7)} />
//         <Square value={squares[8]} onClick={() => handleClick(8)} />
//       </div>
//       <div className="status">{status}</div>
//       <div className="restart">
//         <button onClick={handleRestart}>Restart Game</button>
//       </div>
//     </div>
//   );
// };

// const Tictactoe = () => {
//   return (
//     <div>
//       <Board />
//     </div>
//   );
// };

// export default Tictactoe;









// this is a ubeatable tic tac toe game created using minimax algorithm with comments






// Importing necessary header fies and stylling components
import React, { useState, useEffect } from "react";
import "./tic.css";

// Functional component for each square in the Tic Tac Toe board
const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

// Functional component for the Tic Tac Toe game
const Tictactoe = () => {
  // managing each state of the game
  const [squares, setSquares] = useState(Array(9).fill(null)); // Array to represent the state of the squares
  const [isX, setIsX] = useState(true); // Boolean to track who is the current player (X or O)
  const [gameOver, setGameOver] = useState(false); // Boolean to indicate if the game is over or not

  // Effect hook to trigger the computer's move when it's the computer's turn
//   to make computer move when the computer turn 
  useEffect(() => {
    if (!isX && !gameOver) {
      makeComputerMove();
    }
  }, [isX, gameOver]);

  // Function to check for a winner based on the current state of the squares
  const calculateWinner = (squares) => {
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

  // Function to make a move for the computer using the minimax algorithm
  const makeComputerMove = () => {
    const bestMove = getBestMove(squares);
    const newSquares = squares.slice();
    newSquares[bestMove] = "O";
    setSquares(newSquares);
    setIsX(true);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setGameOver(true);
    }
  };

  // Function to get the best move for the computer using minimax algorithm
  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = "O";
        const score = minimax(squares, 0, false);
        squares[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  // Minimax algorithm to calculate the best move for the computer
  const minimax = (squares, depth, isMaximizing) => {
    const winner = calculateWinner(squares);

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
          const score = minimax(squares, depth + 1, false);
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
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Function to handle the click event on a square
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || gameOver) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isX ? "X" : "O";
    setSquares(newSquares);
    setIsX(!isX);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setGameOver(true);
    }
  };

  // Determine the status of the game (winner, draw, or next player)
  const status = calculateWinner(squares)
    ? `Winner: ${calculateWinner(squares)}`
    : squares.every((square) => square !== null)
    ? "It's a draw!"
    : `Next player: ${isX ? "X" : "O"}`;

  // Function to handle the game restart
  const handleRestart = () => {
    setIsX(true);
    setSquares(Array(9).fill(null));
    setGameOver(false);
  };

  // JSX structure for rendering the Tic Tac Toe game
  return (
    <div className="block">
      <h2>First turn is always of 'X'</h2>
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
      <div className="status">{status}</div>
      <div className="restart">
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
};

export default Tictactoe;
