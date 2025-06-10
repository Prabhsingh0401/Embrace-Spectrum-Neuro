import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import { useCalmMode } from './components/Providers/CalmModeContext'
import { useAudioDescription } from './components/AudioDescription/AudioDescriptionContext'
import NavBar from './components/NavBar/NavBar'
import Chatbot from './components/Chatbot/Chatbot'
import GeminiLive from './components/GeminiLive/GeminiLive'
import SpeechCoach from './components/SpeechCoach/SpeechCoach'
import JournalBoard from './components/JournalBoard/JournalBoard'
import LifeSkillTracker from './components/LifeSkillTracker/LifeSkillTracker'
import Learnpath from './components/LearningPath/AllLearnpath'
import SentimentAnalyser from './components/FeelReader/SentimentAnalyser'
import PaintAndStory from './components/SketchTales/StoryGeneratorComponent'
import Games from './components/Games/Games'
import SenseScape from './components/Games/SenseScape'
import MoodBooster from './components/Games/MoodBooster'
import LifeSkillsQuiz from './components/Quiz/LifeSkillsQuiz'
import JobSearch from './components/JobSearch/JobSearch'
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import OnboardingForm from './components/OnboardingForm/OnboardingForm'

function App() {
  const { isCalmMode } = useCalmMode();
  const { isAudioDescriptionEnabled } = useAudioDescription();
  const { isSignedIn, user, isLoaded } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate ? useNavigate() : null;
  const location = useLocation ? useLocation() : null;

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && user) {
      const onboarded = localStorage.getItem(`onboarding-${user.id}`);
      if (!onboarded) {
        setShowOnboarding(true);
        if (location && location.pathname !== '/onboarding') {
          navigate && navigate('/onboarding');
        }
      } else {
        setShowOnboarding(false);
        if (location && location.pathname === '/onboarding') {
          navigate && navigate('/');
        }
      }
    } else {
      setShowOnboarding(false);
      if (location && location.pathname === '/onboarding') {
        navigate && navigate('/');
      }
    }
    setChecking(false);
  }, [isSignedIn, user, isLoaded, location, navigate]);

  if (checking) return null;

  return (
    <div className={`${isCalmMode ? 'calm-mode' : ''} ${isAudioDescriptionEnabled ? 'audio-description-enabled' : ''}`}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<OnboardingForm onComplete={() => { setShowOnboarding(false); navigate && navigate('/'); }} />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/geminilive" element={<GeminiLive />} />
        <Route path="/speechcoach" element={<SpeechCoach />} />
        <Route path="/journal" element={<JournalBoard />} />
        <Route path="/tracker" element={<LifeSkillTracker />} />
        <Route path="/learn" element={<Learnpath />} />
        <Route path="/feelreader" element={<SentimentAnalyser />} />
        <Route path="/sketchtales" element={<PaintAndStory />} />
        <Route path="/games" element={<Games />} />
        <Route path="/sensescape" element={<SenseScape />} />
        <Route path="/moodbooster" element={<MoodBooster />} />
        <Route path="/quiz" element={<LifeSkillsQuiz />} />
        <Route path="/jobs" element={<JobSearch />} />
      </Routes>
    </div>
  )
}

export default App
