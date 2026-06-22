import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getGameState, makeMove, resetGame, getLegalMoves } from './chessEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Game REST Endpoints
app.get('/api/game', (req, res) => {
  res.json(getGameState());
});

app.get('/api/game/moves', (req, res) => {
  const { square } = req.query;
  if (!square) {
    return res.status(400).json({ error: 'Missing "square" parameter.' });
  }
  res.json(getLegalMoves(square));
});

app.post('/api/game/move', (req, res) => {
  const { from, to, promotion } = req.body;
  if (!from || !to) {
    return res.status(400).json({ error: 'Missing "from" or "to" parameters.' });
  }

  const success = makeMove(from, to, promotion);
  if (success) {
    res.json(getGameState());
  } else {
    res.status(400).json({ error: 'Illegal move.' });
  }
});

app.post('/api/game/reset', (req, res) => {
  const state = resetGame();
  res.json(state);
});

// Serve frontend in production
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// Fallback to React index.html for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Chess Server is running on port ${PORT}`);
});
