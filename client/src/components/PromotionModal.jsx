import React from 'react';
import { ChessPiece } from './ChessPieces';

export default function PromotionModal({ isOpen, color, onSelect }) {
  if (!isOpen) return null;

  const options = [
    { type: 'q', label: 'Queen' },
    { type: 'r', label: 'Rook' },
    { type: 'b', label: 'Bishop' },
    { type: 'n', label: 'Knight' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Promote Pawn</h3>
        <div className="promotion-options">
          {options.map((opt) => (
            <button
              key={opt.type}
              className="promotion-btn"
              onClick={() => onSelect(opt.type)}
              title={opt.label}
            >
              <ChessPiece type={opt.type} color={color} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
