import React from 'react';
import { motion } from 'framer-motion';
import './KeyProgressBar.css';

const KeyProgressBar = ({ unlockedKeys }) => {
  const keys = ['memory1', 'memory2', 'memory3', 'memory4', 'memory5'];
  
  return (
    <div className="key-progress-bar">
      <h3 className="progress-title">Keys Collected</h3>
      <div className="keys-container">
        {keys.map((keyId, index) => (
          <motion.div
            key={keyId}
            className={`key-item ${unlockedKeys[keyId] ? 'unlocked' : 'locked'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {unlockedKeys[keyId] ? (
              <motion.span
                className="key-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                🔑
              </motion.span>
            ) : (
              <span className="key-icon-locked">🔒</span>
            )}
            <span className="key-label">Key {index + 1}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KeyProgressBar;
