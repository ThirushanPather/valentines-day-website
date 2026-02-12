import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import InvestigationRoom from './components/InvestigationRoom';
import MemoryScreen from './components/MemoryScreen';
import PuzzleRoom from './components/PuzzleRoom';
import FinalScreen from './components/FinalScreen';

const musicTracks = {
  welcome: '/audio/welcome.mp3',
  investigation: '/audio/investigation.mp3',
  puzzle: '/audio/puzzle.mp3',
  final: '/audio/final.mp3',
  memory: '/audio/memory.mp3',
};

// CUSTOMIZE YOUR MEMORY DATA HERE
const memoryData = {
  // --- MEMORY 1: BALLITO ---
  memory1: {
    title: "Ballito Memories",
    folder: 'part1',
    images: [
      { file: '1.JPEG', type: 'question', questionId: 'q1' },
      { file: '2.JPEG', type: 'question', questionId: 'q2' },
      { file: '3.JPEG', type: 'question', questionId: 'q3' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'What restaurant did we eat at the most in Ballito Lifestyle?',
        type: 'text',
        answer: 'soi 55',
        hint: 'Best coconut ice cream and sugary soi sauce!'
      },
      {
        id: 'q2',
        question: 'What activity did we do in Ballito Lifestyle at the beginning of 2025?',
        type: 'text',
        answer: 'pottery painting',
        hint: 'Something creative 🎨'
      },
      {
        id: 'q3',
        question: 'What did you paint on my bowl?',
        type: 'multiple',
        answer: 'Watermelon',
        options: ['Watermelon', 'Strawberry', 'Lemon', 'Cherry'],
        hint: 'Green and red 🍉'
      }
    ]
  },

  // --- MEMORY 2: VALENTINES ---
  memory2: {
    title: "Special Moments",
    folder: 'part2',
    images: [
      { file: '1.JPEG', type: 'question', questionId: 'q1' },
      { file: '2.JPG', type: 'question', questionId: 'q2' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'What restaurant did I take you to for Valentines day last year?',
        type: 'multiple',
        answer: 'Wood and Fire',
        options: ['Famous Bunny', 'Wood and Fire', 'Beira Alta', 'KFC'],
        hint: '🔥🪵'
      },
      {
        id: 'q2',
        // NOTE: This is the one we still need to fill in!
        question: 'What was the name of the hotel we stayed in that weekend?', 
        type: 'text', 
        answer: 'menlyn maine',
        hint: 'It was in Menlyn'
      }
    ]
  },

  // --- MEMORY 3: FIRSTS & ADVENTURES ---
  memory3: {
    title: "Our Adventures",
    folder: 'part3',
    images: [
      { file: '1.JPG', type: 'question', questionId: 'q1' },
      { file: '2.JPEG', type: 'question', questionId: 'q2' },
      { file: '3.JPG', type: 'question', questionId: 'q3' },
      { file: '4.JPEG', type: 'question', questionId: 'q4' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'What was the first movie we watched together in the cinemas?',
        type: 'text',
        answer: 'lilo and stitch',
        hint: 'Think of your teddy bear 🧸'
      },
      {
        id: 'q2',
        question: 'A few days before my final demo, I flew down to see you. What fruit did we eat on the beach?',
        type: 'text',
        answer: 'litchis',
        hint: 'It wasn\'t imported from Mauritius this time!'
      },
      {
        id: 'q3',
        question: 'We decided to get into content creation at some point. What sport were we playing when we made our first (and only) TikTok?',
        type: 'multiple',
        answer: 'Padel',
        options: ['Padel', 'Tennis', 'Golf', 'Running'],
        hint: 'Not tennis, golf or running 🎾'
      },
      {
        id: 'q4',
        question: 'After that padel session, we went to get some really healthy food to build our muscles. What high protein food did we get?',
        type: 'multiple',
        answer: 'Mutton Bunny Chow',
        options: ['Chicken Salad', 'Kauai Wrap', 'Acai Fruit Bowl', 'Mutton Bunny Chow'],
        hint: 'It wasn\'t healthy... 🍞'
      }
    ]
  },

  // --- MEMORY 4: DURBAN JULY & GOLF ---
  memory4: {
    title: "Sweet Memories",
    folder: 'part4',
    images: [
      { file: '2.JPEG', type: 'question', questionId: 'q1' },
      { file: '1.JPG' , type: 'question', questionId: 'q2' },
      { file: '3.JPEG', type: 'question', questionId: 'q3' },
      { file: '4.JPEG', type: 'question', questionId: 'q4' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'The day after the Durban July, we went on a date to a really nice place. Where did we go?',
        type: 'text',
        answer: 'fig tree farm',
        hint: 'It was a farm 🌳'
      },
      {
        id: 'q2',
        question: 'Do you remember what meal I ordered?',
        type: 'multiple',
        answer: 'Eggs Benedict',
        options: ['Eggs Benedict', 'Prawn Pasta', 'Toasted Sandwich', 'Pizza'],
        hint: 'It was for breakfast 🍳'
      },
      {
        id: 'q3',
        question: 'What sport did you regrettably get me to fall in love with that day?',
        type: 'text',
        answer: 'golf',
        hint: 'Tiger Woods ⛳'
      },
      {
        id: 'q4',
        question: 'Who had the best golf swing in the whole world?',
        type: 'multiple',
        answer: 'Bianca',
        // Keeping your hilarious options exactly as requested!
        options: ['Thirushan', 'Thirushan', 'Thirushan', 'Bianca'],
        hint: 'Look within ✨'
      }
    ]
  },

  // --- MEMORY 5: ANNIVERSARIES ---
  memory5: {
    title: "Forever Us",
    folder: 'part5',
    images: [
      { file: '1.JPG', type: 'question', questionId: 'q1' },
      { file: '2.JPEG', type: 'question', questionId: 'q2' },
      { file: '3.JPEG', type: 'question', questionId: 'q3' },
      { file: '4.JPEG', type: 'question', questionId: 'q4' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'For which month anniversary did you fly up to come and visit me during the year?',
        type: 'text',
        answer: '18',
        hint: 'Not 12, not 24, somewhere in the middle'
      },
      {
        id: 'q2',
        question: 'What souvenir did we get for ourselves from the Brooklyn Market before you were late for the Gautrain?',
        type: 'multiple',
        answer: 'Painting of us',
        options: ['Painting of us', 'Keyring', 'Magnet', 'Bag'],
        hint: 'You should still have this 🎨'
      },
      {
        id: 'q3',
        question: 'What was the name of the restaurant I took you to for our 1.5 year anniversary?',
        type: 'multiple',
        answer: 'Priva',
        options: ['Priva', 'Wood and Fire', 'Fireroom', 'McDonalds'],
        hint: 'You should know this 🥂'
      },
      {
        id: 'q4',
        question: 'What animals did I take you to go and see on our date?',
        type: 'text',
        answer: 'cows',
        hint: 'Mooooo 🐮'
      }
    ]
  }
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [unlockedKeys, setUnlockedKeys] = useState({
    memory1: false,
    memory2: false,
    memory3: false,
    memory4: false,
    memory5: false
  });
  const [currentMemory, setCurrentMemory] = useState(null);

  // --- AUDIO LOGIC ---
  const audioRef = useRef(new Audio());
  const [hasInteracted, setHasInteracted] = useState(false);

  // 1. Handle Screen Changes & Track Switching
  useEffect(() => {
    const handleTrackChange = async () => {
      let nextTrack = null;

      // Determine which track to play based on screen
      if (currentScreen === 'welcome') {
        nextTrack = musicTracks.welcome;
      } else if (currentScreen === 'investigation') {
        nextTrack = musicTracks.investigation;
      } else if (currentScreen === 'puzzle') {
        nextTrack = musicTracks.puzzle;
      } else if (currentScreen === 'final') {
        nextTrack = musicTracks.final;
      } else if (currentScreen === 'memory') {
        // Use specific memory track if available, otherwise generic
        nextTrack = musicTracks[currentMemory] || musicTracks.memory;
      }

      // If we found a track and it's different from the current one
      if (nextTrack) {
        // Get absolute path to compare correctly
        const currentSrcPath = audioRef.current.src.split(window.location.origin)[1];
        
        if (currentSrcPath !== nextTrack) {
          audioRef.current.src = nextTrack;
          audioRef.current.loop = true; // Loop the background music
          audioRef.current.volume = 0.5; // Set a nice background volume (0.0 to 1.0)
          
          try {
            // Only attempt to play if user has interacted (browser policy)
            // OR if we are moving deeper into the app (which means they clicked something)
            if (hasInteracted || currentScreen !== 'welcome') {
              await audioRef.current.play();
            }
          } catch (e) {
            console.log("Audio play failed (waiting for interaction):", e);
          }
        }
      }
    };

    handleTrackChange();
  }, [currentScreen, currentMemory, hasInteracted]);

  // 2. Global Click Handler (To fix Autoplay issues)
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Try to play whatever is currently set
        if (audioRef.current.src) {
          audioRef.current.play().catch(e => console.log(e));
        }
      }
    };

    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, [hasInteracted]);
  // -------------------



  const handleStartGame = () => {
    setCurrentScreen('investigation');
  };

  const handleMemoryClick = (memoryId) => {
    setCurrentMemory(memoryId);
    setCurrentScreen('memory');
  };

  const handleMemoryComplete = (memoryId) => {
    setUnlockedKeys(prev => ({
      ...prev,
      [memoryId]: true
    }));
    setCurrentScreen('investigation');
    setCurrentMemory(null);
  };

  const handleBackToInvestigation = () => {
    setCurrentScreen('investigation');
    setCurrentMemory(null);
  };

  const handleProceedToPuzzle = () => {
    setCurrentScreen('puzzle');
  };

  const handlePuzzleComplete = () => {
    setCurrentScreen('final');
  };

  const allKeysUnlocked = Object.values(unlockedKeys).every(key => key === true);

  return (
    <div className="App">
      <ParticleBackground />
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onStart={handleStartGame} 
          onTestPuzzle={handleProceedToPuzzle} 
        />
      )}

      {currentScreen === 'investigation' && (
        <InvestigationRoom
          unlockedKeys={unlockedKeys}
          onMemoryClick={handleMemoryClick}
          onProceedToPuzzle={handleProceedToPuzzle}
          allKeysUnlocked={allKeysUnlocked}
        />
      )}

      {currentScreen === 'memory' && currentMemory && (
        <MemoryScreen
          memoryId={currentMemory}
          memoryData={memoryData[currentMemory]}
          onComplete={handleMemoryComplete}
          onBack={handleBackToInvestigation}
        />
      )}

      {currentScreen === 'puzzle' && (
        <PuzzleRoom onComplete={handlePuzzleComplete} />
      )}

      {currentScreen === 'final' && (
        <FinalScreen />
      )}
    </div>
  );
}

export default App;