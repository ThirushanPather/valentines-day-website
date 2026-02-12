import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import KeyProgressBar from './KeyProgressBar';
import './InvestigationRoom.css';

const InvestigationRoom = ({ unlockedKeys, onMemoryClick, onProceedToPuzzle, allKeysUnlocked }) => {
  
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
      label: 'Ballito Mmeories', 
      lottieSrc: 'https://lottie.host/241e86f8-2688-4f13-a38b-71da74b2b68e/eS4EgULEjA.lottie'
    },
    { 
      id: 'memory2', 
      label: 'Love Letters', 
      lottieSrc: 'https://lottie.host/012d816a-6f81-4a23-95c1-0d52c526e702/bzc6jkh5BK.lottie'
    },
    { 
      id: 'memory3', 
      label: 'Music Box', 
      lottieSrc: 'https://lottie.host/93f5e7f4-a4e7-4cc5-9b89-bd5f0ae36992/9AGZFabHWu.lottie'
    },
    { 
      id: 'memory4', 
      label: 'Heart Locket', 
      lottieSrc: 'https://lottie.host/e127b169-466a-4f18-983c-a5c9e3eb8aae/m3QsO5muWg.lottie'
    },
    { 
      id: 'memory5', 
      label: 'Memories Box', 
      lottieSrc: 'https://lottie.host/6ff33ed6-d563-434f-9ec4-dd2152ee433f/LbnvQUmita.lottie'
    }
  ];

  const handleSpotClick = (spotId) => {
    if (unlockedKeys[spotId]) return;
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
          Click on each object to unlock memories and collect keys
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
              {spot.lottieSrc ? (
                <dotlottie-wc 
                  src={spot.lottieSrc} 
                  autoplay 
                  loop 
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                spot.icon
              )}
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
    </motion.div>
  );
};

export default InvestigationRoom;