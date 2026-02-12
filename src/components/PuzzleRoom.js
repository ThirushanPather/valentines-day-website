import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './PuzzleRoom.css';

const PuzzleRoom = ({ onComplete }) => {
  const totalPieces = 12;
  const [pieces, setPieces] = useState([]);
  const [placedPieces, setPlacedPieces] = useState(Array(totalPieces).fill(null));
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
  
  // Translation State
  const [translation, setTranslation] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const initialPieces = Array.from({ length: totalPieces }, (_, i) => ({
      id: i + 1,
      src: `/images/puzzle/Picture${i + 1}-removebg-preview.png`
    }));
    
    setPieces(initialPieces.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (placedPieces.every(p => p !== null) && !isPuzzleComplete) {
      setIsPuzzleComplete(true);
      fireConfetti();
    }
  }, [placedPieces, isPuzzleComplete]);

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E91E63', '#BA68C8', '#F8BBD0']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E91E63', '#BA68C8', '#F8BBD0']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleDragStart = (piece) => {
    setDraggedPiece(piece);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    if (draggedPiece && draggedPiece.id === slotIndex + 1) {
      const newPlaced = [...placedPieces];
      newPlaced[slotIndex] = draggedPiece;
      setPlacedPieces(newPlaced);
      setPieces(pieces.filter(p => p.id !== draggedPiece.id));
      setDraggedPiece(null);
    }
  };

  const handleSubmitTranslation = () => {
    const correctAnswer = 'will you be my valentine';
    const userAnswer = translation.toLowerCase().trim().replace(/[?!.]/g, '');

    if (userAnswer === correctAnswer) {
      fireConfetti();
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <motion.div
      className="screen-container puzzle-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="subtitle puzzle-title">The Final Puzzle 🧩</h2>
      <p className="puzzle-instructions">
        {isPuzzleComplete 
          ? "Puzzle Complete! Now translate the message..." 
          : "Drag the pieces to complete the photo!"}
      </p>

      <div className="puzzle-workspace">
        {/* LEFT: THE GRID */}
        <div className="puzzle-grid-container">
          {placedPieces.map((piece, index) => (
            <div
              key={index}
              className={`puzzle-grid-slot ${piece ? 'filled' : 'empty'}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {piece ? (
                <motion.img
                  src={piece.src}
                  alt={`Piece ${piece.id}`}
                  // ADDED: Specific class for each piece ID
                  className={`placed-image piece-${piece.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <span className="slot-number">{index + 1}</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: PIECES OR TRANSLATION */}
        <div className="right-panel-area">
          {!isPuzzleComplete ? (
            <div className="available-pieces-area">
              <h3 className="pieces-label">Pieces Remaining: {pieces.length}</h3>
              <div className="pieces-scroll-container">
                {pieces.map((piece) => (
                  <motion.img
                    key={piece.id}
                    src={piece.src}
                    alt={`Piece ${piece.id}`}
                    className="puzzle-piece-draggable"
                    draggable
                    onDragStart={() => handleDragStart(piece)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    layoutId={`piece-${piece.id}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <motion.div 
              className="translation-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3>🎉 Perfect! 🎉</h3>
              <p className="translation-prompt">
                The message is in Italian.
                <br />
                <strong>What does it mean in English?</strong>
              </p>
              
              <input
                type="text"
                className="input-field translation-input"
                placeholder="Type the translation..."
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitTranslation()}
              />

              {showError && (
                <motion.p className="error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Not quite... Hint: "Will you..."
                </motion.p>
              )}

              <button 
                className="btn btn-primary submit-translation-btn"
                onClick={handleSubmitTranslation}
              >
                Submit Answer 💌
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PuzzleRoom;