import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KeyProgressBar from './KeyProgressBar';
import './InvestigationRoom.css';

// --- PERSONAL MESSAGES DATA ---
const MEMORY_MESSAGES = {
  memory1: {
    title: "Why Ballito Matters 🌊",
    content: "This trip was the first time I realized how much I truly loved spending every second with you. From the pottery painting to the soi 55 dinners, it wasn't just about the activities, but about how easy and natural life felt by your side. You make every moment feel like a vacation."
  },
  memory2: {
    title: "Our Valentine's Day ❤️",
    content: "Taking you to Wood and Fire was such a highlight for me. I remember being so nervous hoping everything would be perfect. Seeing you smile that night made all the planning worth it. You looked absolutely stunning, and I wanted that night to last forever."
  },
  memory3: {
    title: "Adventures & Firsts 🎾",
    content: "That first game of Padel (and our only TikTok!) is a core memory for me. Even when we are just being silly or trying something new, we always end up laughing. It reminds me that no matter what we do, as long as we do it together, it's going to be my favorite thing."
  },
  memory4: {
    title: "Durban July & Golf ⛳",
    content: "I know I dragged you into golf, but watching you try (and arguably have a better swing than me) was the best. That brunch at Fig Tree Farm afterwards felt so peaceful. It’s these quiet, happy mornings with you that I look forward to the most."
  },
  memory5: {
    title: "Growing Together 🎨",
    content: "Looking back at our 1.5 year anniversary and all the small milestones, I'm just so proud of us. Every month with you feels like a gift. Painting, eating, traveling—it's all building this beautiful life that I wouldn't trade for anything in the world."
  }
};

const InvestigationRoom = ({ unlockedKeys, onMemoryClick, onProceedToPuzzle, allKeysUnlocked }) => {
  const [activeMessage, setActiveMessage] = useState(null);
  
  // Load the Lottie script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js';
    script.type = 'module';
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const memorySpots = [
    { 
      id: 'memory1', 
      label: 'Ballito Lifestyle Memories', 
      lottieSrc: 'https://lottie.host/241e86f8-2688-4f13-a38b-71da74b2b68e/eS4EgULEjA.lottie'
    },
    { 
      id: 'memory2', 
      label: 'Valentine Memories', 
      lottieSrc: 'https://lottie.host/012d816a-6f81-4a23-95c1-0d52c526e702/bzc6jkh5BK.lottie'
    },
    { 
      id: 'memory3', 
      label: 'Ballito Adventures', 
      lottieSrc: 'https://lottie.host/93f5e7f4-a4e7-4cc5-9b89-bd5f0ae36992/9AGZFabHWu.lottie'
    },
    { 
      id: 'memory4', 
      label: 'A Swinging Time', 
      lottieSrc: 'https://lottie.host/e127b169-466a-4f18-983c-a5c9e3eb8aae/m3QsO5muWg.lottie'
    },
    { 
      id: 'memory5', 
      label: 'Pretoria Visits', 
      lottieSrc: 'https://lottie.host/6ff33ed6-d563-434f-9ec4-dd2152ee433f/LbnvQUmita.lottie'
    }
  ];

  const handleSpotClick = (spotId) => {
    // If unlocked, show the message panel
    if (unlockedKeys[spotId]) {
      setActiveMessage(MEMORY_MESSAGES[spotId]);
      return;
    }
    // If locked, proceed to memory game
    onMemoryClick(spotId);
  };

  return (
    <motion.div
      className="screen-container investigation-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <KeyProgressBar unlockedKeys={unlockedKeys} />

      <div className="room-title-container">
        <h2 className="subtitle">The Memory Room</h2>
        <p className="room-instructions">
          Click on each object to unlock memories. <br/>
          <span style={{ fontSize: '0.9em', color: '#e91e63' }}>
            (Click completed memories again to read a secret note!)
          </span>
        </p>
      </div>

      <div className="room-container">
        {memorySpots.map((spot, index) => (
          <motion.div
            key={spot.id}
            className={`memory-spot ${unlockedKeys[spot.id] ? 'completed' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSpotClick(spot.id)}
          >
            <div className="spot-icon">
              {/* Lottie Component */}
              <dotlottie-wc 
                src={spot.lottieSrc} 
                autoplay 
                loop 
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            
            <div className="spot-label">{spot.label}</div>
            
            {unlockedKeys[spot.id] && (
              <motion.div
                className="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
            {!unlockedKeys[spot.id] && (
              <div className="locked-indicator">🔒</div>
            )}
          </motion.div>
        ))}
      </div>

      {allKeysUnlocked && (
        <motion.div
          className="proceed-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="proceed-message">
            🎉 All keys collected! Proceed to the puzzle room! 🎉
          </p>
          <motion.button
            className="btn btn-primary"
            onClick={onProceedToPuzzle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Puzzle 🧩
          </motion.button>
        </motion.div>
      )}

      {/* --- SIDE MESSAGE PANEL --- */}
      <AnimatePresence>
        {activeMessage && (
          <>
            {/* Dark Overlay */}
            <motion.div 
              className="message-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMessage(null)}
            />
            
            {/* The Panel */}
            <motion.div 
              className="message-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button className="close-btn" onClick={() => setActiveMessage(null)}>×</button>
              
              <div className="message-content">
                <h3>{activeMessage.title}</h3>
                <div className="separator-line"></div>
                <p>{activeMessage.content}</p>
                <div className="signature">With love,<br/>Thirushan x</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InvestigationRoom;