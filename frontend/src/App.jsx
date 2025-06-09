import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import { useUser } from '@clerk/clerk-react'
import { useCalmMode } from './components/Providers/CalmModeContext'
import { useAudioDescription } from './components/AudioDescription/AudioDescriptionContext'
import NavBar from './components/NavBar/NavBar'

function App() {
  const { isCalmMode } = useCalmMode();
  const { isAudioDescriptionEnabled } = useAudioDescription();

  return (
    <div className={`${isCalmMode ? 'calm-mode' : ''} ${isAudioDescriptionEnabled ? 'audio-description-enabled' : ''}`}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
