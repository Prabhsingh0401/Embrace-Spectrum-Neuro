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
import OnboardingForm from './components/OnboardingForm/OnboardingForm'
import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

function App() {
  const { isCalmMode } = useCalmMode();
  const { isAudioDescriptionEnabled } = useAudioDescription();
  const { user, isLoaded } = useUser();
  const location = useLocation();
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboardingError, setOnboardingError] = useState(null);
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false);

  useEffect(() => {
    const checkOnboardingFirestore = async () => {
      if (isLoaded && user) {
        setCheckingOnboarding(true);
        setOnboardingError(null);
        try {
          const docRef = doc(db, 'onboardingData', user.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setOnboardingComplete(true);
          } else {
            setOnboardingComplete(false);
          }
        } catch (err) {
          setOnboardingError('Error checking onboarding: ' + err.message);
        }
        setCheckingOnboarding(false);
        setHasCheckedOnce(true);
      } else if (isLoaded && !user) {
        setCheckingOnboarding(false);
        setOnboardingComplete(false);
        setHasCheckedOnce(false);
      }
    };
    checkOnboardingFirestore();
  }, [isLoaded, user]);

  if (checkingOnboarding) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#6488e9', fontWeight: 'bold', fontSize: 24 }}>Loading...</span>
      </div>
    );
  }

  if (onboardingError) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
        <div>
          <h2>Onboarding Error</h2>
          <p>{onboardingError}</p>
        </div>
      </div>
    );
  }

  // Only redirect to onboarding if user is signed in, onboarding is not complete, and we have checked at least once
  if (isLoaded && user && !onboardingComplete && location.pathname !== '/onboarding' && hasCheckedOnce) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className={`${isCalmMode ? 'calm-mode' : ''} ${isAudioDescriptionEnabled ? 'audio-description-enabled' : ''}`}>
      {location.pathname !== '/onboarding' && <NavBar />}
      <Routes>
        <Route path="/onboarding" element={<OnboardingForm onComplete={async () => {
          setOnboardingComplete(true);
          return <Navigate to="/" replace />;
        }} />} />
        <Route path="/" element={<Home />} />
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
