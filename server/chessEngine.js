import { Chess } from 'chess.js';

let chess = new Chess();

// Helper to count pieces on the board to calculate captured pieces
function getCapturedPieces() {
  const initialCounts = {
    w: { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 },
    b: { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 }
  };

  const currentCounts = {
    w: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 }
  };

  // Scan board
  const board = chess.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece) {
        currentCounts[piece.color][piece.type]++;
      }
    }
  }

  const captured = {
    w: [], // Pieces captured by white (which means black pieces that are missing)
    b: []  // Pieces captured by black (which means white pieces that are missing)
  };

  // Calculate missing white pieces (captured by black)
  for (const [type, count] of Object.entries(initialCounts.w)) {
    const missing = count - currentCounts.w[type];
    for (let i = 0; i < missing; i++) {
      captured.b.push({ type, color: 'w' });
    }
  }

  // Calculate missing black pieces (captured by white)
  for (const [type, count] of Object.entries(initialCounts.b)) {
    const missing = count - currentCounts.b[type];
    for (let i = 0; i < missing; i++) {
      captured.w.push({ type, color: 'b' });
    }
  }

  return captured;
}

export function getGameState() {
  return {
    fen: chess.fen(),
    turn: chess.turn(), // 'w' or 'b'
    isCheck: chess.inCheck(),
    isCheckmate: chess.isCheckmate(),
    isDraw: chess.isDraw(),
    isStalemate: chess.isStalemate(),
    isThreefoldRepetition: chess.isThreefoldRepetition(),
    isInsufficientMaterial: chess.isInsufficientMaterial(),
    history: chess.history({ verbose: true }),
    captured: getCapturedPieces(),
    board: chess.board(),
  };
}

export function makeMove(from, to, promotion) {
  try {
    // If promotion is specified, format it (should be lowercase char e.g. 'q', 'r', 'b', 'n')
    const movePayload = { from, to };
    if (promotion) {
      movePayload.promotion = promotion.toLowerCase();
    }

    const move = chess.move(movePayload);
    return move !== null;
  } catch (error) {
    // console.error("Invalid move attempted:", error.message);
    return false;
  }
}

export function getLegalMoves(square) {
  try {
    return chess.moves({ square, verbose: true });
  } catch (error) {
    return [];
  }
}

export function resetGame() {
  chess = new Chess();
  return getGameState();
}

