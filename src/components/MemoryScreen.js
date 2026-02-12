import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import './MemoryScreen.css';

const MemoryScreen = ({ memoryId, memoryData, onComplete, onBack }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [showHints, setShowHints] = useState({});
  const [errors, setErrors] = useState({});
  const containerRef = useRef(null);

  // Helper to check if a specific question is answered
  // If an image has no questionId (legacy reward), it is unlocked if ALL questions are done
  const isImageUnlocked = (image) => {
    if (image.questionId) {
      return answeredQuestions[image.questionId];
    }
    // Fallback for old 'reward' types that might not have a questionId yet
    return memoryData.questions.every(q => answeredQuestions[q.id]);
  };

  // Check if ALL questions in the entire set are answered
  const allQuestionsAnswered = memoryData.questions.every(q => answeredQuestions[q.id]);

  const fireConfetti = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#E91E63', '#BA68C8', '#F8BBD0', '#D4AF37'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#E91E63', '#BA68C8', '#F8BBD0', '#D4AF37'] });
    }, 250);
  };

  const handleSubmit = (questionId) => {
    const question = memoryData.questions.find(q => q.id === questionId);
    if (!question) return;

    const userAnswer = currentAnswers[questionId];
    if (!userAnswer) return;

    const answer = question.type === 'text' ? userAnswer.toLowerCase().trim() : userAnswer;
    const correctAnswer = question.type === 'text' ? question.answer.toLowerCase().trim() : question.answer;

    if (answer === correctAnswer) {
      setAnsweredQuestions(prev => ({ ...prev, [questionId]: true }));
      setErrors(prev => ({ ...prev, [questionId]: '' }));
      fireConfetti();
    } else {
      setErrors(prev => ({ ...prev, [questionId]: 'Not quite right... Try again! 💕' }));
      setTimeout(() => setErrors(prev => ({ ...prev, [questionId]: '' })), 3000);
    }
  };

  const handleKeyPress = (e, questionId) => {
    if (e.key === 'Enter') handleSubmit(questionId);
  };

  useEffect(() => {
    if (allQuestionsAnswered) {
      setTimeout(() => {
        fireConfetti();
        setTimeout(() => onComplete(memoryId), 2500);
      }, 1000);
    }
  }, [allQuestionsAnswered]);

  return (
    <div className="memory-screen-scroll" ref={containerRef}>
      <motion.button
        className="back-button-fixed"
        onClick={onBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ← Back
      </motion.button>

      <div className="memory-header">
        <motion.h2
          className="memory-section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {memoryData.title}
        </motion.h2>
      </div>

      <div className="memory-content-scroll">
        {memoryData.images.map((image, index) => {
          // Find the question associated with this image
          // If no questionId (legacy), try to find a question at the same index or default to null
          const question = image.questionId 
            ? memoryData.questions.find(q => q.id === image.questionId)
            : null;

          const unlocked = isImageUnlocked(image);

          return (
            <ParallaxSection
              key={index}
              index={index}
              image={image}
              folder={memoryData.folder}
              isUnlocked={unlocked}
              question={question}
              currentAnswer={currentAnswers[question?.id]}
              onAnswerChange={(value) => 
                question && setCurrentAnswers(prev => ({ ...prev, [question.id]: value }))
              }
              onSubmit={() => question && handleSubmit(question.id)}
              onKeyPress={(e) => question && handleKeyPress(e, question.id)}
              error={question && errors[question.id]}
              showHint={question && showHints[question.id]}
              onToggleHint={() => 
                question && setShowHints(prev => ({ ...prev, [question.id]: !prev[question.id] }))
              }
            />
          );
        })}

        {allQuestionsAnswered && (
          <motion.div
            className="section-complete-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2>🎉 Section Complete! 🎉</h2>
            <p>All memories unlocked! Collecting your key...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ParallaxSection = ({ 
  index, 
  image, 
  folder, 
  isUnlocked, 
  question,
  currentAnswer,
  onAnswerChange,
  onSubmit,
  onKeyPress,
  error,
  showHint,
  onToggleHint
}) => {
  const ref = useRef(null);
  
  // SMOOTHER PARALLAX: Using useSpring
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothY, [0, 1], [150, -150]);
  const opacity = useTransform(smoothY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const imagePath = `/images/${folder}/${image.file}`;

  return (
    <motion.div
      ref={ref}
      className="parallax-section"
      style={{ opacity }}
    >
      <div className="parallax-content">
        {/* IMAGE SIDE */}
        <motion.div
          className={`image-wrapper ${isUnlocked ? 'unlocked' : 'locked'}`}
          style={{ y }}
        >
          <div className="image-frame-fancy">
            <img
              src={imagePath}
              alt={`Memory ${index + 1}`}
              className="memory-image-parallax"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400/ffb6d9/ffffff?text=Photo+Loading';
              }}
            />
            
            {/* Lock Overlay */}
            {!isUnlocked && (
              <div className="blur-overlay">
                <motion.span 
                  className="lock-icon"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🔒
                </motion.span>
                <p>Answer to unlock memory</p>
              </div>
            )}

            {/* Shine effect when unlocked */}
            {isUnlocked && <div className="shine-effect"></div>}
          </div>
        </motion.div>

        {/* QUESTION SIDE */}
        <motion.div
          className="question-container fancy-border"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {isUnlocked ? (
            <div className="unlocked-message">
              <h3>✨ Memory Unlocked! ✨</h3>
              <p className="correct-answer-text">"{question?.answer}" was correct!</p>
              <div className="check-badge">✓</div>
            </div>
          ) : (
            <>
              <h3 className="question-text">{question?.question || "Unlock this memory..."}</h3>

              {question?.type === 'text' ? (
                <div className="answer-input-section">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Type your answer..."
                    value={currentAnswer || ''}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    onKeyPress={onKeyPress}
                  />
                </div>
              ) : (
                <div className="options-grid">
                  {question?.options?.map((option, idx) => (
                    <motion.button
                      key={idx}
                      className={`option-btn ${currentAnswer === option ? 'selected' : ''}`}
                      onClick={() => onAnswerChange(option)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

              {error && (
                <motion.p
                  className="error-msg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <div className="question-actions">
                <motion.button
                  className="btn btn-primary submit-btn"
                  onClick={onSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!currentAnswer}
                >
                  Unlock
                </motion.button>

                <motion.button
                  className="hint-btn"
                  onClick={onToggleHint}
                  whileHover={{ scale: 1.05 }}
                >
                  {showHint ? '🙈 Hide Hint' : '💡 Need a Hint?'}
                </motion.button>
              </div>

              {showHint && (
                <motion.p
                  className="hint-text-box"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  Hint: {question?.hint}
                </motion.p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemoryScreen;