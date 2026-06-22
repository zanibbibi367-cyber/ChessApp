# Premium Two-Player Chess Application

An elegant, modern, and professional pass-and-play Chess application designed for two players sitting at the same computer. Built with a React.js frontend, an Express.js backend, and `chess.js` to govern official chess rules.

---

## Technical Stack
* **Frontend**: React (Vite, Javascript)
* **Styling**: Modern Custom Vanilla CSS (HSL, glassmorphism, responsive transitions)
* **Backend**: Node.js, Express.js
* **Chess Rules Engine**: Chess.js (runs on Express backend)

---

## Features
* **Full Chess Rule Enforcement**: Legal move validation, castling, en passant, and pawn promotion selections (Queen, Rook, Bishop, Knight).
* **Game State Alerts**: Automatic real-time notification alerts for check warnings, checkmate conditions, stalemates, and standard draws.
* **Premium Chessboard Interface**: High-resolution embedded SVG piece vectors, active/legal-move indicators, and visual highlights for the last played move and checking vectors.
* **Interactive Play Options**: Both standard HTML5 Drag-and-Drop and click-to-move interactions (optimal for laptops and trackpads).
* **Live Advantage Statistics**: Displays lists of captured pieces and automatically calculates the material score advantage (e.g. `+3` White).
* **Move Log**: A scrollable history feed showing move indices and SAN (Standard Algebraic Notation).

---

## Project Structure
```
ChessApp/
├── package.json          # Orchestrates installation, building, and running
├── README.md             # Documentation and instructions
├── client/              # React frontend (Vite)
│   ├── index.html       # Entry html with optimized meta tags
│   ├── vite.config.js   # Vite configuration with reverse API proxy
│   ├── package.json     # Client package dependencies
│   ├── src/
│   │   ├── main.jsx     # App entry point
│   │   ├── App.jsx      # Root component and UI state orchestrator
│   │   ├── index.css    # Premium CSS design system
│   │   ├── api.js       # API network helper module
│   │   └── components/
│   │       ├── Chessboard.jsx  # Interactive 8x8 Board grid
│   │       ├── GamePanel.jsx   # Right stats panel (turns, history, captured, controls)
│   │       ├── ChessPieces.jsx # SVG vectorized chess pieces
│   │       └── PromotionModal.jsx  # Pawn promotion choice dialog
└── server/              # Express backend
    ├── package.json     # Server dependencies
    ├── server.js        # Express HTTP endpoints & static host
    ├── chessEngine.js   # State manager wrapper around chess.js
    └── verify.js        # Automated integration test script
```

---

## API Endpoints (Backend)
All chess logic resides on the server, maintaining a single source of truth:
* `GET /api/game` - Retrieves the current state (FEN, board matrix, turn, check status, checkmate status, captured list, history log).
* `POST /api/game/move` - Takes JSON payload `{ from: 'e2', to: 'e4', promotion: 'q' }`. Validates the move via chess.js, updates state, and returns the updated state. Returns `400` if the move is illegal.
* `GET /api/game/moves?square=e2` - Returns an array of legal moves available for the piece residing on the queried square.
* `POST /api/game/reset` - Clears the current session state and starts a new game.

---

## Installation & Running

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
Run the command below from the root of the project to install all required dependencies for the root, client, and server workspaces:
```bash
npm run install:all
```

### 2. Development Mode
To run both the backend server (on port 5000) and the frontend dev server (on port 5173 with proxy configuration) concurrently:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Run
To build the React application and run the production Express server which automatically hosts the compiled files:
```bash
# Build the client code
npm run build:client

# Start the Express server
npm run start
```
Open [http://localhost:5000](http://localhost:5000) in your browser.
