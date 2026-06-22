import React, { useState, useEffect } from 'react';
import { ChessPiece } from './ChessPieces';
import { fetchLegalMoves } from '../api';

export default function Chessboard({ board, turn, isCheck, history, onMoveAttempt }) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  
  // Clear selection if turn changes
  useEffect(() => {
    setSelectedSquare(null);
    setLegalMoves([]);
  }, [turn]);

  // Fetch legal moves when a square is selected
  const handleSelectSquare = async (square, piece) => {
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // If clicking on own piece, select it
    if (piece && piece.color === turn) {
      setSelectedSquare(square);
      try {
        const moves = await fetchLegalMoves(square);
        // moves is an array of objects from chess.js: { from, to, color, piece, flags, san, lan, etc. }
        // Extract target squares
        setLegalMoves(moves.map(m => m.to));
      } catch (err) {
        setLegalMoves([]);
      }
    } 
    // If clicking on a legal move destination (Click-to-Move)
    else if (selectedSquare && legalMoves.includes(square)) {
      handleMove(selectedSquare, square);
    } 
    // Clicked elsewhere
    else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const handleMove = (from, to) => {
    onMoveAttempt(from, to);
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  // Drag and Drop handlers
  const handleDragStart = async (e, square, piece) => {
    if (piece.color !== turn) {
      e.preventDefault();
      return;
    }
    
    e.dataTransfer.setData('text/plain', square);
    e.dataTransfer.effectAllowed = 'move';
    setSelectedSquare(square);

    // Fetch legal moves for visual highlights during drag
    try {
      const moves = await fetchLegalMoves(square);
      setLegalMoves(moves.map(m => m.to));
    } catch (err) {
      setLegalMoves([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toSquare) => {
    e.preventDefault();
    const fromSquare = e.dataTransfer.getData('text/plain');
    if (fromSquare && fromSquare !== toSquare && legalMoves.includes(toSquare)) {
      handleMove(fromSquare, toSquare);
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  // Find last move to highlight it
  const lastMove = history && history.length > 0 ? history[history.length - 1] : null;
  const lastMoveFrom = lastMove ? lastMove.from : null;
  const lastMoveTo = lastMove ? lastMove.to : null;

  // Find king in check
  let checkSquare = null;
  if (isCheck) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === 'k' && piece.color === turn) {
          checkSquare = String.fromCharCode(97 + c) + (8 - r);
          break;
        }
      }
      if (checkSquare) break;
    }
  }

  // Render the grid
  const squares = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const file = String.fromCharCode(97 + c);
      const rank = 8 - r;
      const squareName = `${file}${rank}`;
      const piece = board[r][c]; // { type, color } or null
      const isLight = (r + c) % 2 === 0;

      const isSelected = selectedSquare === squareName;
      const isLastMove = lastMoveFrom === squareName || lastMoveTo === squareName;
      const isCheckWarning = checkSquare === squareName;
      const isLegal = legalMoves.includes(squareName);

      squares.push(
        <div
          key={squareName}
          className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isLastMove ? 'last-move' : ''} ${isCheckWarning ? 'check-warning' : ''} ${isLegal ? 'legal-move' : ''} ${isLegal && piece ? 'has-piece' : ''}`}
          onClick={() => handleSelectSquare(squareName, piece)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, squareName)}
        >
          {piece && (
            <div
              className="piece-container"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, squareName, piece)}
            >
              <ChessPiece type={piece.type} color={piece.color} />
            </div>
          )}

          {/* Render Coordinate Labels */}
          {c === 0 && (
            <span className="coordinate rank">
              {rank}
            </span>
          )}
          {r === 7 && (
            <span className="coordinate file">
              {file}
            </span>
          )}
        </div>
      );
    }
  }

  return (
    <div className="board-container">
      <div className="board-wrapper">
        <div className="chessboard">
          {squares}
        </div>
      </div>
    </div>
  );
}
