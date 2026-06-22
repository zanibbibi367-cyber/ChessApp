import React, { useState, useEffect } from 'react';
import Chessboard from './components/Chessboard';
import GamePanel from './components/GamePanel';
import PromotionModal from './components/PromotionModal';
import { fetchGameState, sendMove, resetGame } from './api';

export default function App() {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingMove, setPendingMove] = useState(null);
  const [promotionOpen, setPromotionOpen] = useState(false);

  // Fetch initial game state on mount
  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const state = await fetchGameState();
      setGameState(state);
    } catch (err) {
      setError('Failed to connect to the chess server. Please ensure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveAttempt = async (from, to) => {
    if (!gameState) return;

    // Check for Pawn Promotion
    const fromFileIndex = from.charCodeAt(0) - 97;
    const fromRankIndex = 8 - parseInt(from[1]);
    const piece = gameState.board[fromRankIndex][fromFileIndex];

    if (piece && piece.type === 'p') {
      const targetRank = parseInt(to[1]);
      if ((piece.color === 'w' && targetRank === 8) || (piece.color === 'b' && targetRank === 1)) {
        // Trigger promotion dialog
        setPendingMove({ from, to });
        setPromotionOpen(true);
        return;
      }
    }

    // Normal move
    try {
      setError(null);
      const newState = await sendMove(from, to);
      setGameState(newState);
    } catch (err) {
      setError(err.message || 'Illegal move attempted.');
      // Auto clear error toast after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  const handlePromotionSelect = async (pieceType) => {
    if (!pendingMove) return;

    const { from, to } = pendingMove;
    setPromotionOpen(false);
    setPendingMove(null);

    try {
      setError(null);
      const newState = await sendMove(from, to, pieceType);
      setGameState(newState);
    } catch (err) {
      setError(err.message || 'Illegal promotion move.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleResetGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const state = await resetGame();
      setGameState(state);
    } catch (err) {
      setError('Failed to reset the game.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !gameState) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>Loading Chess Game...</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Antigravity Chess</h1>
        <p>A Premium Pass-and-Play Experience</p>
      </header>

      {/* Main Game Interface */}
      {gameState && (
        <>
          <div style={{ position: 'relative' }}>
            <Chessboard
              board={gameState.board}
              turn={gameState.turn}
              isCheck={gameState.isCheck}
              history={gameState.history}
              onMoveAttempt={handleMoveAttempt}
            />

            {/* Promotion Overlay */}
            <PromotionModal
              isOpen={promotionOpen}
              color={gameState.turn}
              onSelect={handlePromotionSelect}
            />
          </div>

          <GamePanel
            turn={gameState.turn}
            isCheck={gameState.isCheck}
            isCheckmate={gameState.isCheckmate}
            isDraw={gameState.isDraw}
            isStalemate={gameState.isStalemate}
            history={gameState.history}
            captured={gameState.captured}
            onReset={handleResetGame}
          />
        </>
      )}

      {/* Error Toast Notification */}
      {error && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'rgba(239, 68, 68, 0.95)',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            zIndex: 9999,
            fontWeight: 600,
            fontSize: '0.9rem',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
