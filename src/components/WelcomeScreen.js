import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './WelcomeScreen.css';

// Added onTestPuzzle to props 👇
const WelcomeScreen = ({ onStart, onTestPuzzle }) => {
  useEffect(() => {
    // Load Lottie web component
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

  return (
    <motion.div
      className="screen-container welcome-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="lottie-decoration lottie-left">
        <dotlottie-wc 
          src="https://lottie.host/60c54e2e-5ce9-45aa-9dd5-97f781138e9c/J0jkDAyhsr.lottie" 
          style={{ width: '200px', height: '200px' }}
          autoplay 
          loop
        />
      </div>

      <motion.h1
        className="title welcome-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Happy 2 Year Anniversary
      </motion.h1>

      <motion.h2
        className="subtitle welcome-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        To my bubby
      </motion.h2>

      <motion.p
        className="welcome-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        These two years with you have been the most magical journey of my life.
        <br />
        Every moment, every memory, every laugh - they all mean the world to me. You are the most beautiful person in the entire world and I can't wait to continue making these amazing memories with you for the rest of our life. 
        <br />
        <br />
        I've created a special escape room filled with our precious memories.
        <br />
        Solve the puzzles to unlock a very important question... 
        Click continue for a quick trip down memory lane
      </motion.p>

      <motion.button
        className="btn btn-primary start-button"
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Begin Our Journey
      </motion.button>

      {/* 👇 TEMPORARY DEV BUTTON 👇 */}
      <button
        onClick={onTestPuzzle}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          padding: '8px 12px',
          background: 'rgba(0, 0, 0, 0.3)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}
        title="Skip to Puzzle Room"
      >
        🛠️ Dev: Jump to Puzzle
      </button>

      <div className="lottie-decoration lottie-right">
        <dotlottie-wc 
          src="https://lottie.host/ade5298d-a970-451e-8738-bab54196b00e/pvYSWIehbt.lottie" 
          style={{ width: '200px', height: '200px' }}
          autoplay 
          loop
        />
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;


///
// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import './WelcomeScreen.css';

// const WelcomeScreen = ({ onStart }) => {
//   useEffect(() => {
//     // Load Lottie web component
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js';
//     script.type = 'module';
//     document.head.appendChild(script);

//     return () => {
//       if (script.parentNode) {
//         script.parentNode.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <motion.div
//       className="screen-container welcome-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <div className="lottie-decoration lottie-left">
//         <dotlottie-wc 
//           src="https://lottie.host/60c54e2e-5ce9-45aa-9dd5-97f781138e9c/J0jkDAyhsr.lottie" 
//           style={{ width: '200px', height: '200px' }}
//           autoplay 
//           loop
//         />
//       </div>

//       <motion.h1
//         className="title welcome-title"
//         initial={{ y: -30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.8 }}
//       >
//         Happy 2 Year Anniversary
//       </motion.h1>

//       <motion.h2
//         className="subtitle welcome-subtitle"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.8 }}
//       >
//         Dear Bianca
//       </motion.h2>

//       <motion.p
//         className="welcome-message"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.7, duration: 0.8 }}
//       >
//         These two years with you have been the most magical journey of my life.
//         <br />
//         Every moment, every memory, every laugh - they all mean the world to me.
//         <br />
//         <br />
//         I've created a special escape room filled with our precious memories.
//         <br />
//         Solve the puzzles to unlock a very important question...
//       </motion.p>

//       <motion.button
//         className="btn btn-primary start-button"
//         onClick={onStart}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.9, duration: 0.6 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         Begin Our Journey
//       </motion.button>

//       <div className="lottie-decoration lottie-right">
//         <dotlottie-wc 
//           src="https://lottie.host/ade5298d-a970-451e-8738-bab54196b00e/pvYSWIehbt.lottie" 
//           style={{ width: '200px', height: '200px' }}
//           autoplay 
//           loop
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default WelcomeScreen;
///