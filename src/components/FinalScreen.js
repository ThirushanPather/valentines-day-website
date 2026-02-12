import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './FinalScreen.css';

const FinalScreen = () => {
  const [isYesHovered, setIsYesHovered] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [funnyMessage, setFunnyMessage] = useState("");
  
  const noBtnRef = useRef(null);

  const funnyPhrases = [
    "Nice try!",
    "You can't catch me!",
    "Wrong button!",
    "Are you sure?",
    "Think again...",
    "Too slow!",
    "Seriously?",
    "Nope, over here!",
    "Missed me!",
    "Only one option..."
  ];

  // Exact logic from working HTML with RESTRICTED bounds
  const moveNoButton = () => {
    const button = noBtnRef.current;
    if (!button) return;

    // VERY RESTRICTED bounds to stay in visible area
    // X: 200 to 800, Y: 150 to 500
    const minX = 200;
    const maxX = 800;
    const minY = 150;
    const maxY = 500;
    
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    button.style.position = "absolute";
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
    button.style.transition = "left 0.3s ease, top 0.3s ease";

    // Show random funny message
    const randomPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
    setFunnyMessage(randomPhrase);
  };

  const handleYesClick = () => {
    setAccepted(true);
    
    // Fire confetti from left and right sides
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Confetti from the LEFT side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0, y: 0.6 },
        angle: 60
      });
      
      // Confetti from the RIGHT side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 1, y: 0.6 },
        angle: 120
      });
    }, 250);
  };

  return (
    <>
      <div className="final-screen">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              className="final-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="final-question">
                Will you be my Valentine?
              </h1>

              <p className="sweet-message">
                I hope you enjoyed this trip down memory lane. I put alot of effort into this to make it as special as possible for you. You mean the world to me. There is nobody else I can imagine a future with other than you. We may have our ups and downs but I would choose healing and growing with you a million times over than anything else. I hope that convinced you to select the correct option below!
              </p>

              <div className="message-container">
                <AnimatePresence mode="wait">
                  {funnyMessage && (
                    <motion.p
                      key={funnyMessage}
                      className="funny-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {funnyMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="buttons-row">
                <motion.button
                  className="btn-final btn-yes"
                  onClick={handleYesClick}
                  onMouseEnter={() => setIsYesHovered(true)}
                  onMouseLeave={() => setIsYesHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isYesHovered ? "YES!" : "Yes"}
                </motion.button>

                <button
                  ref={noBtnRef}
                  className="btn-final btn-no"
                  onMouseOver={moveNoButton}
                >
                  No
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="success-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="success-card"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              >
                <motion.div
                  className="success-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  💕
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  I knew you would say yes!
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  I love you bubs. Can't wait to see you soon.
                </motion.p>
              </motion.div>
              
              <div className="lottie-animations">
                  <div className="lottie-item lottie-top-left">
                    <dotlottie-wc
                      src="https://lottie.host/3bb795fc-983e-479f-8c5d-cc96513bed65/Ikb1CvaXXh.lottie"
                      autoplay
                      loop
                      style={{ width: '200px', height: '200px' }}
                    />
                  </div>
                  
                  <div className="lottie-item lottie-top-right">
                    <dotlottie-wc
                      src="https://lottie.host/93f5e7f4-a4e7-4cc5-9b89-bd5f0ae36992/9AGZFabHWu.lottie"
                      autoplay
                      loop
                      style={{ width: '200px', height: '200px' }}
                    />
                  </div>
                  
                  <div className="lottie-item lottie-bottom-left">
                    <dotlottie-wc
                      src="https://lottie.host/012d816a-6f81-4a23-95c1-0d52c526e702/bzc6jkh5BK.lottie"
                      autoplay
                      loop
                      style={{ width: '180px', height: '180px' }}
                    />
                  </div>
                  
                  <div className="lottie-item lottie-bottom-right">
                    <dotlottie-wc
                      src="https://lottie.host/3bb795fc-983e-479f-8c5d-cc96513bed65/Ikb1CvaXXh.lottie"
                      autoplay
                      loop
                      style={{ width: '180px', height: '180px' }}
                    />
                  </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FinalScreen;
