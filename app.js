const { useState, useEffect } = React;
const { Heart, X, Star, Music, Coffee } = lucide;

function ValentineApp() {
  const [message, setMessage] = useState('');
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [buttonSize, setButtonSize] = useState(1);
  const [hearts, setHearts] = useState([]);
  const [showCoffeeDate, setShowCoffeeDate] = useState(false);

  // Make the "Yes" button bigger with each "No"
  useEffect(() => {
    setButtonSize(1 + noCount * 0.1);
  }, [noCount]);

  // Generate random position for the "No" button
  const getRandomPosition = () => {
    const newTop = Math.floor(Math.random() * 80) + 10;
    const newLeft = Math.floor(Math.random() * 80) + 10;
    return { top: `${newTop}%`, left: `${newLeft}%` };
  };

  // Fun messages when clicking "No"
  const noMessages = [
    "Are you sure? 🥺",
    "Really sure? 😢",
    "Think again! 🤔",
    "Last chance! 💝",
    "Surely not! 😭",
    "You're breaking my heart! 💔",
    "I'll cry! 😪",
    "Don't be mean! 🥹",
    "Change of heart? 🫀",
    "Pretty please! 🙏"
  ];

  const handleYesClick = () => {
    setYesPressed(true);
    setMessage("Yay! You've made me the happiest! 💖");
    
    // Create floating hearts animation
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        setHearts(prev => [...prev, {
          id: Date.now() + i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 2 + 2}s`,
          scale: Math.random() * 0.5 + 0.5
        }]);
      }, i * 100);
    }

    setTimeout(() => {
      setShowCoffeeDate(true);
    }, 2000);
  };

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    setMessage(noMessages[Math.min(noCount, noMessages.length - 1)]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 p-4">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-500 animate-float"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            transform: `scale(${heart.scale})`
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 animate-pulse">
          {yesPressed ? "❤️ Thank You! ❤️" : "Will You Be My Valentine?"}
        </h1>
        
        {!yesPressed && (
          <div className="relative h-48 w-full max-w-md mb-4">
            <button
              onClick={handleYesClick}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              style={{ transform: `scale(${buttonSize})` }}
            >
              Yes <Heart className="inline ml-1" size={16} />
            </button>
            
            <button
              onClick={handleNoClick}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200 absolute"
              style={getRandomPosition()}
            >
              No <X className="inline ml-1" size={16} />
            </button>
          </div>
        )}

        {message && (
          <p className="text-xl text-pink-600 font-semibold mt-4 animate-bounce">
            {message}
          </p>
        )}

        {showCoffeeDate && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Let's make it special! <Star className="inline" size={20} />
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              How about we start with a coffee date? <Coffee className="inline" size={20} />
            </p>
            <p className="text-lg text-gray-700">
              And maybe some music? <Music className="inline" size={20} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<ValentineApp />, document.getElementById('root'));