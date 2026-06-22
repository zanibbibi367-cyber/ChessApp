import React from 'react';
import { ChessPiece } from './ChessPieces';

const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const PIECE_ORDER = { q: 1, r: 2, b: 3, n: 4, p: 5 };

export default function GamePanel({
  turn,
  isCheck,
  isCheckmate,
  isDraw,
  isStalemate,
  history,
  captured,
  onReset
}) {
  // Sort captured pieces: Q -> R -> B -> N -> P
  const sortPieces = (pieces) => {
    return [...pieces].sort((a, b) => PIECE_ORDER[a.type] - PIECE_ORDER[b.type]);
  };

  const whiteCaptured = sortPieces(captured.w || []); // Black pieces captured by White
  const blackCaptured = sortPieces(captured.b || []); // White pieces captured by Black

  // Calculate material scores
  const whiteScore = whiteCaptured.reduce((sum, p) => sum + PIECE_VALUES[p.type], 0);
  const blackScore = blackCaptured.reduce((sum, p) => sum + PIECE_VALUES[p.type], 0);

  const whiteAdvantage = whiteScore - blackScore;
  const blackAdvantage = blackScore - whiteScore;

  // Format move history into pairs
  const renderHistory = () => {
    const rows = [];
    for (let i = 0; i < history.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const whiteMove = history[i];
      const blackMove = history[i + 1];

      rows.push(
        <div key={moveNum} className="move-row">
          <span className="move-number">{moveNum}.</span>
          <span className="move-notation">{whiteMove ? whiteMove.san : ''}</span>
          <span className="move-notation">{blackMove ? blackMove.san : ''}</span>
        </div>
      );
    }

    if (rows.length === 0) {
      return <div className="history-empty">No moves played yet</div>;
    }

    return rows;
  };

  // Determine game status text
  const getStatusAlert = () => {
    if (isCheckmate) {
      const winner = turn === 'w' ? 'Black' : 'White';
      return (
        <div className="status-alert info">
          👑 Checkmate! {winner} wins!
        </div>
      );
    }
    if (isStalemate) {
      return (
        <div className="status-alert">
          🤝 Draw! Stalemate.
        </div>
      );
    }
    if (isDraw) {
      return (
        <div className="status-alert">
          🤝 Draw! (Repetition/Material/50-move)
        </div>
      );
    }
    if (isCheck) {
      const inCheckPlayer = turn === 'w' ? 'White' : 'Black';
      return (
        <div className="status-alert">
          ⚠️ Check! {inCheckPlayer} is under attack.
        </div>
      );
    }
    return null;
  };

  return (
    <div className="game-panel">
      {/* Player Turn Cards */}
      <div className="players-container">
        {/* White Player */}
        <div className={`player-card white ${turn === 'w' ? 'active' : ''}`}>
          <div className="player-avatar">W</div>
          <div className="player-name">White Player</div>
          <div className="player-status">{turn === 'w' ? 'Thinking' : 'Waiting'}</div>
          
          {/* Pieces captured by White (black pieces) */}
          <div className="captured-container">
            {whiteCaptured.map((p, idx) => (
              <div key={idx} className="captured-piece">
                <ChessPiece type={p.type} color="b" />
              </div>
            ))}
            {whiteAdvantage > 0 && (
              <span className="captured-diff">+{whiteAdvantage}</span>
            )}
          </div>
        </div>

        {/* Black Player */}
        <div className={`player-card black ${turn === 'b' ? 'active' : ''}`}>
          <div className="player-avatar">B</div>
          <div className="player-name">Black Player</div>
          <div className="player-status">{turn === 'b' ? 'Thinking' : 'Waiting'}</div>

          {/* Pieces captured by Black (white pieces) */}
          <div className="captured-container">
            {blackCaptured.map((p, idx) => (
              <div key={idx} className="captured-piece">
                <ChessPiece type={p.type} color="w" />
              </div>
            ))}
            {blackAdvantage > 0 && (
              <span className="captured-diff">+{blackAdvantage}</span>
            )}
          </div>
        </div>
      </div>

      {/* Game status alerts */}
      {getStatusAlert()}

      {/* Move History Section */}
      <div className="history-section">
        <div className="history-header">Move History</div>
        <div className="history-moves">
          {renderHistory()}
        </div>
      </div>

      {/* Action Controls */}
      <div className="controls-container">
        <button className="btn" onClick={onReset}>
          Restart Game
        </button>
        <button className="btn primary" onClick={onReset}>
          New Game
        </button>
      </div>
    </div>
  );
}
