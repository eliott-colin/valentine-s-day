import { useState } from 'react'
import './App.css'

const enigmasDatabase = [
  // Géographie 
  { question: "Quel est le point culminant du Mont Blanc?", answer: "4808", category: "Géographie" },
  { question: "Quel pays a le plus de frontières terrestres?", answer: "russie", category: "Géographie" },
  { question: "Quel est le détroit qui sépare la France de l'Angleterre?", answer: "douvres", category: "Géographie" },
  { question: "Quel fleuve est le plus long d'Afrique?", answer: "nil", category: "Géographie" },
  { question: "Quel est le plus grand lac d'eau douce du monde?", answer: "baïkal", category: "Géographie" },
  
  // Histoire 
  { question: "En quelle année a eu lieu la Révolution Française?", answer: "1789", category: "Histoire" },
  { question: "Quel empereur a construit la Grande Muraille de Chine?", answer: "qin", category: "Histoire" },
  { question: "Qui a écrit Les Misérables?", answer: "victor hugo", category: "Littérature" },
  { question: "En quelle année l'homme a marché sur la lune?", answer: "1969", category: "Histoire" },
  { question: "Quel artiste a peint La Nuit Étoilée?", answer: "van gogh", category: "Art" },
  
  // Maths 
  { question: "Quel est le résultat de 123 + 456?", answer: "579", category: "Maths" },
  { question: "Quel est le résultat de 25 × 24?", answer: "600", category: "Maths" },
  { question: "Quel est le résultat de 1000 ÷ 8?", answer: "125", category: "Maths" },
  { question: "Quel est le carré de 15?", answer: "225", category: "Maths" },
  { question: "Quel est 10 à la puissance 3?", answer: "1000", category: "Maths" },
  
  // Sciences 
  { question: "Combien de chromosomes a un humain (jason ça compte pas) ?", answer: "46", category: "Biologie" },
  { question: "Combien de chromosomes a un humain (jason ça compte pas) ?", answer: "46", category: "Biologie" },
  { question: "Combien de chromosomes a un humain <br></br>(jason ça compte pas) ?", answer: "46", category: "Biologie" },
  { question: "Combien de chromosomes a un humain (jason ça compte pas) ?", answer: "46", category: "Biologie" },
  { question: "Combien de chromosomes a un humain (jason ça compte pas) ?", answer: "46", category: "Biologie" },
  
  // Connaissances générales 
  { question: "Quel est le plus haut bâtiment du monde?", answer: "burj khalifa", category: "Architecture" },
  { question: "Combien de pattes a une araignée?", answer: "8", category: "Zoologie" },
  { question: "Quel animal est le plus rapide terrestre?", answer: "guépard", category: "Zoologie" },
  { question: "Quel est le plus grand désert chaud du monde?", answer: "sahara", category: "Géographie" },
  { question: "En quelle année Netflix a été fondée?", answer: "1997", category: "Technologie" },
  { question: "Quel est le plus long fleuve d'Europe?", answer: "volga", category: "Géographie" },
]

const letters = ['E', 'T', 'O', 'I', 'L', 'E']

function getRandomEnigmas(count) {
  const shuffled = [...enigmasDatabase].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function App() {
  const [page, setPage] = useState('home') // 'home', 'valentine' ou 'enigmas'
  const [enigmas] = useState(() => getRandomEnigmas(6))
  const [currentEnigma, setCurrentEnigma] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [foundLetters, setFoundLetters] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [noClickMessage, setNoClickMessage] = useState('')
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  const handleNoClick = () => {
    const messages = [
      "S'il te plaît dis oui! 🥺",
      "Allez, dis oui! 💕",
      "Pourquoi tu fais ça? 😭",
      "Oui oui oui oui! 🎉",
      "Je sais que tu vas dire oui! 😊",
      "Pas le bouton non! 🙊"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setNoClickMessage(randomMessage)
    
    // Le bouton se déplace
    const randomX = (Math.random() - 0.5) * 200
    const randomY = (Math.random() - 0.5) * 200
    setNoPosition({ x: randomX, y: randomY })
    
    setTimeout(() => setNoClickMessage(''), 2000)
  }

  const handleYesClick = () => {
    setPage('youpie')
  }

  const handleSubmit = () => {
    const enigma = enigmas[currentEnigma]
    const normalizedAnswer = userAnswer.toLowerCase().trim()
    const normalizedCorrect = enigma.answer.toLowerCase()
    
    if (normalizedAnswer === normalizedCorrect) {
      setIsCorrect(true)
      setErrorMessage('')
      const newLetters = [...foundLetters, letters[currentEnigma]]
      setFoundLetters(newLetters)
      
      setTimeout(() => {
        if (currentEnigma < enigmas.length - 1) {
          setCurrentEnigma(currentEnigma + 1)
          setUserAnswer('')
          setIsCorrect(false)
        } else {
          setCompleted(true)
        }
      }, 1500)
    } else {
      setErrorMessage('❌ Mauvaise réponse, réessaye!')
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isCorrect && userAnswer.trim()) {
      handleSubmit()
    }
  }

  if (page === 'home') {
    return (
      <div className="app-container home-page">
        <div className="home-container">
          <div className="home-content">
            <div className="home-hearts">💕 ✨ 💕</div>
            <h1 className="home-title">Saint-Valentin 💞</h1>
            <p className="home-subtitle">Choisis ce que tu veux faire!</p>
            
            <div className="home-buttons">
              <button 
                onClick={() => setPage('enigmas')}
                className="home-btn enigmas-btn"
              >
                🎯 Résoudre les énigmes
              </button>
              
              <button 
                onClick={() => setPage('valentine')}
                className="home-btn valentine-btn"
              >
                💕 Demande spéciale
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (page === 'valentine') {
    return (
      <div className="app-container valentine-page">
        <div className="valentine-container">
          <div className="valentine-content">
            <div className="valentine-hearts">💕 ✨ 💕</div>
            <h1 className="valentine-title">Veux-tu être ma Valentine? 🥰</h1>
            <p className="valentine-subtitle">Dis oui pour déverrouiller une surprise!</p>
            
            <div className="valentine-buttons">
              <button 
                onClick={handleYesClick}
                className="yes-btn"
              >
                OUI ❤️
              </button>
              
              <button 
                onClick={handleNoClick}
                className="no-btn"
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  transition: 'transform 0.3s ease'
                }}
              >
                NON 💔
              </button>
            </div>
            
            {noClickMessage && (
              <p className="no-click-message">{noClickMessage}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (page === 'youpie') {
    return (
      <div className="app-container youpie-page">
        <div className="youpie-container">
          <div className="youpie-content">
            <div className="youpie-animation">❤️</div>
            <h1 className="youpie-title">YOUPIEEEEEE!</h1>
            <p className="youpie-text">💕 Tu auras le droit à pleins de surprises ! 💕</p>
            
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            
            <div className="youpie-buttons">
              <button 
                onClick={() => setPage('enigmas')}
                className="continue-btn"
              >
                Continuer vers les énigmes ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="app-container">
        <div className="completion-screen">
          <h1 className="title-final">🎉 BRAVO! 🎉</h1>
          <div className="final-message">
            <p className="message-text">Tu as trouvé le mot secret!</p>
            <p className="revealed-word">E T O I L E ✨</p>
          </div>
          <div className="gift-box">
            <div className="gift-icon">🎁</div>
            <h2>Mission Accomplie!</h2>
            <div className="gift-content">
              <p className="gift-description">Prends un screenshot de ce message et envoie-le moi !</p>
              <p className="gift-subtitle">Pour que tu recoives ton cadeau</p>
            </div>
          </div>
          <div className="love-message">
            <p>pstttt...Le mot secret c'est étoile<br></br> parce que c'est toi mon étoile</p>
          </div>
        </div>
      </div>
    )
  }

  const enigma = enigmas[currentEnigma]
  const progress = ((currentEnigma + 1) / enigmas.length) * 100

  return (
    <div className="app-container">
      <div className="enigma-container">
        <div className="header">
          <div className="hearts">💕 😎 💕</div>
          <h1 className="title">Valentine's Day <br></br>Enigmas</h1>
          <p className="subtitle">Résous les énigmes pour trouver le mot secret!</p>
        </div>
        
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">Énigme {currentEnigma + 1}/{enigmas.length}</p>
          
          <div className="letters-found">
            {letters.map((letter, idx) => (
              <div key={idx} className={`letter ${foundLetters.includes(letter) ? 'found' : ''}`}>
                {foundLetters.includes(letter) ? letter : '?'}
              </div>
            ))}
          </div>
        </div>
        
        <div className="enigma-card">
          <div className="category-badge">{enigma.category}</div>
          <h2 className="enigma-question">{enigma.question}</h2>
          
          <div className="form-center">
            <div className="input-container">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tape ta réponse..."
                className={`enigma-input ${isCorrect ? 'correct' : ''}`}
                disabled={isCorrect}
                autoFocus
              />
              {isCorrect && <span className="check-mark">✓</span>}
            </div>
            
            <div className="button-group">
              <button 
                onClick={handleSubmit}
                className="submit-btn"
                disabled={!userAnswer.trim() || isCorrect}
              >
                Valider
              </button>
            </div>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
