// Integration test to verify server REST endpoints
const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

async function runTests() {
  console.log('Starting backend verification tests...');

  try {
    // 1. Get initial state
    console.log('Testing GET /api/game...');
    const resState = await fetch(`${BASE_URL}/api/game`);
    if (!resState.ok) throw new Error('Failed to fetch initial state');
    const state = await resState.json();
    console.log('Initial FEN:', state.fen);
    if (state.fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      throw new Error('Unexpected starting FEN');
    }

    // 2. Play a legal move e2-e4
    console.log('Testing POST /api/game/move (e2 -> e4)...');
    const resMove = await fetch(`${BASE_URL}/api/game/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'e2', to: 'e4' })
    });
    if (!resMove.ok) {
      const err = await resMove.json();
      throw new Error(`Failed to play move: ${err.error}`);
    }
    const stateAfterMove = await resMove.json();
    console.log('FEN after move:', stateAfterMove.fen);
    if (!stateAfterMove.fen.includes('8/8/4P3/8/8/8')) { // simple check pawn moved
      // e2 -> e4 results in pawn at e4
      // board ranks: rank 8 down to 1
      // rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1
      if (!stateAfterMove.fen.includes('4P3')) {
        throw new Error('Move e2-e4 did not reflect in FEN');
      }
    }
    console.log('Move successful! Active player turn is now:', stateAfterMove.turn);

    // 3. Reset game
    console.log('Testing POST /api/game/reset...');
    const resReset = await fetch(`${BASE_URL}/api/game/reset`, { method: 'POST' });
    if (!resReset.ok) throw new Error('Failed to reset game');
    const stateAfterReset = await resReset.json();
    console.log('FEN after reset:', stateAfterReset.fen);
    if (stateAfterReset.fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      throw new Error('Reset FEN is incorrect');
    }

    console.log('✅ All backend integration tests passed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    process.exit(1);
  }
}

// Run verification after a 1.5s delay to let server start
setTimeout(runTests, 1500);
