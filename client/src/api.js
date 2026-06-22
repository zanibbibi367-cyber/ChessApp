const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Something went wrong');
  }
  return response.json();
};

export const fetchGameState = async () => {
  const response = await fetch('/api/game');
  return handleResponse(response);
};

export const fetchLegalMoves = async (square) => {
  const response = await fetch(`/api/game/moves?square=${square}`);
  return handleResponse(response);
};

export const sendMove = async (from, to, promotion = null) => {
  const response = await fetch('/api/game/move', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, promotion }),
  });
  return handleResponse(response);
};

export const resetGame = async () => {
  const response = await fetch('/api/game/reset', {
    method: 'POST',
  });
  return handleResponse(response);
};
