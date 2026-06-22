import React from 'react';

// Standard high-quality Chess SVGs
export const ChessPiece = ({ type, color, ...props }) => {
  const pieceKey = `${color}${type}`.toLowerCase();

  // White Piece SVGs
  if (pieceKey === 'wp') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-.83.67-1.41 1.71-1.41 2.88 0 2.21 1.79 4 4 4h3c2.21 0 4-1.79 4-4 0-1.17-.58-2.21-1.41-2.88 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'wn') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M 22,10 C 22,10 19,11 16,15 C 13,19 13,24 13,24 C 13,24 15,22 18,22 C 18,22 17,24 15,27 C 13,30 11,35 15,35 C 19,35 24,35 28,31 C 32,27 34,18 31,14 C 28,10 22,10 22,10 z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
          transform="matrix(0.861785,0.507278,-0.507278,0.861785,27.4244,-2.259)"
          fill="#000000"
        />
        <path
          d="M20 28c1.5-1 3.5-1 5 0"
          fill="none"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'wb') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M9 36c3.39 0 7.66-.69 11.5-2.33 3.84 1.64 8.11 2.33 11.5 2.33 0 0 3-1 3-3 0-4-3-12-6-16.5C26.5 13 24 10 22.5 8.5 21 10 18.5 13 16 16.5 13 21 10 29 10 33c0 2 3 3 3 3z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="22.5" cy="5.5" r="2" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
        <path d="M22.5 16v10M17.5 21h10" fill="none" stroke="#000000" strokeWidth="1.5" />
      </svg>
    );
  }

  if (pieceKey === 'wr') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M9 39h27v-3H9v3zm3-3h21v-4H12v4zm2.5-4l1.5-12h14l1.5 12h-17zm-1.5-12h20v-5H13v5zm1.5-5h17V9h-3v3h-3V9h-5v3h-3V9h-3v5z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'wq') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm10-3a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm10 0a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm10 3a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm-14 3a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm-1 6.5L9 26h27l-8-14.5-5 11-5-11z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 26c0 2 1.5 3 2.5 4h22c1 0 2.5-1 2.5-4H9zm2.5 4c2.5 2 5.5 3 10 3s7.5-1 10-3h-20z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'wk') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M22.5 11.63V6M20 8h5M22.5 25C18 21 15 15 15 15c0 0 3-1 3-3 0-3-2-5-4.5-5S9 9 9 12c0 2 3 3 3 3s-3 6-7.5 10c-1.5 1.5-.5 3.5 1.5 3.5h33c2 0 3-2 1.5-3.5z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 30C15 33 20 34 22.5 34s7.5-1 11-4h-22z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Black Piece SVGs
  if (pieceKey === 'bp') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-.83.67-1.41 1.71-1.41 2.88 0 2.21 1.79 4 4 4h3c2.21 0 4-1.79 4-4 0-1.17-.58-2.21-1.41-2.88 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'bn') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M 22,10 C 22,10 19,11 16,15 C 13,19 13,24 13,24 C 13,24 15,22 18,22 C 18,22 17,24 15,27 C 13,30 11,35 15,35 C 19,35 24,35 28,31 C 32,27 34,18 31,14 C 28,10 22,10 22,10 z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
          transform="matrix(0.861785,0.507278,-0.507278,0.861785,27.4244,-2.259)"
          fill="#ffffff"
        />
        <path
          d="M20 28c1.5-1 3.5-1 5 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'bb') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M9 36c3.39 0 7.66-.69 11.5-2.33 3.84 1.64 8.11 2.33 11.5 2.33 0 0 3-1 3-3 0-4-3-12-6-16.5C26.5 13 24 10 22.5 8.5 21 10 18.5 13 16 16.5 13 21 10 29 10 33c0 2 3 3 3 3z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="22.5" cy="5.5" r="2" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M22.5 16v10M17.5 21h10" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    );
  }

  if (pieceKey === 'br') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M9 39h27v-3H9v3zm3-3h21v-4H12v4zm2.5-4l1.5-12h14l1.5 12h-17zm-1.5-12h20v-5H13v5zm1.5-5h17V9h-3v3h-3V9h-5v3h-3V9h-3v5z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'bq') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm10-3a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm10 0a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm10 3a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm-14 3a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm-1 6.5L9 26h27l-8-14.5-5 11-5-11z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 26c0 2 1.5 3 2.5 4h22c1 0 2.5-1 2.5-4H9zm2.5 4c2.5 2 5.5 3 10 3s7.5-1 10-3h-20z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (pieceKey === 'bk') {
    return (
      <svg viewBox="0 0 45 45" width="100%" height="100%" {...props}>
        <path
          d="M22.5 11.63V6M20 8h5M22.5 25C18 21 15 15 15 15c0 0 3-1 3-3 0-3-2-5-4.5-5S9 9 9 12c0 2 3 3 3 3s-3 6-7.5 10c-1.5 1.5-.5 3.5 1.5 3.5h33c2 0 3-2 1.5-3.5z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 30C15 33 20 34 22.5 34s7.5-1 11-4h-22z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
};
