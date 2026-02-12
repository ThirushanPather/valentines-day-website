# Valentine's Day Escape Room for Bianca 💝

An interactive escape room experience to celebrate 2 years together and ask "Will you be my Valentine?"

## Setup Instructions

1. **Install Node.js** (if you haven't already)
   - Download from https://nodejs.org/

2. **Open this project in VSCode**
   - Open the `valentine-escape-room` folder

3. **Install dependencies**
   - Open terminal in VSCode (Terminal > New Terminal)
   - Run: `npm install`

4. **Start the development server**
   - Run: `npm start`
   - The app will open in your browser at http://localhost:3000

## Project Structure

```
valentine-escape-room/
├── public/
│   ├── index.html
│   └── images/           # Put your photos here!
│       ├── memory1.jpg
│       ├── memory2.jpg
│       ├── memory3.jpg
│       ├── memory4.jpg
│       └── memory5.jpg
├── src/
│   ├── App.js            # Main app component with screen navigation
│   ├── App.css           # Global styles
│   ├── index.js          # Entry point
│   ├── index.css         # Base styles
│   └── components/
│       ├── WelcomeScreen.js
│       ├── InvestigationRoom.js
│       ├── MemoryScreen.js
│       ├── PuzzleRoom.js
│       ├── FinalScreen.js
│       └── KeyProgressBar.js
└── package.json
```

## Customization Guide

### Adding Your Photos
1. Place 5 photos in `public/images/` folder
2. Name them: memory1.jpg, memory2.jpg, etc.

### Updating Questions
Edit the `memoryData` object in `src/App.js`

### Changing Colors
Edit the CSS variables in `src/App.css`

## Features
- ✨ Beautiful animations with Framer Motion
- 🎨 Romantic color scheme with gradients
- 🔑 Key collection system
- 🧩 Drag-and-drop puzzle
- 💝 Interactive "No" button that runs away
- 📱 Responsive design

## Build for Production
When ready to deploy:
```
npm run build
```

This creates an optimized production build in the `build/` folder.

---

Made with ❤️ for Bianca
