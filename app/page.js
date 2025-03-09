'use client';
import { useState, useEffect } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Greeting from './components/Greeting/Greeting';
import Balance from './components/Balance/Balance';
import ActionButtons from './components/ActionButtons/ActionButtons';
import Upload from './components/Upload/Upload';
import Stats from './components/Stats/Stats';
import Navigation from './components/Navigation/Navigation';
import Floater from './components/Floater/Floater';

// New SplashScreen component
const SplashScreen = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000); // Hide after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    showSplashScreen && (
      <div className="splash-screen">
        <div className="splash-content">
          {/* TeleShare Logo -  Replace with actual logo image */}
          <div className="logo">T</div>
          <div className="loading-indicator"></div>
        </div>
      </div>
    )
  );
};


export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [showFloater, setShowFloater] = useState(false);
  const [floaterContent, setFloaterContent] = useState({
    title: '',
    content: '',
    primaryText: '',
    secondaryText: '',
    onPrimary: () => {},
    onSecondary: () => {}
  });

  const handleUpload = () => {
    console.log("Upload clicked");
    setFloaterContent({
      title: 'Upload File',
      content: 'Select a file to upload or drag and drop it here.',
      primaryText: 'Upload',
      secondaryText: 'Cancel',
      onPrimary: () => console.log('Upload pressed'),
      onSecondary: () => console.log('Cancel pressed')
    });
    setShowFloater(true);
  };

  const handleAction = (action) => {
    console.log(`Action clicked: ${action}`);
    // Handle different actions here
    setFloaterContent({
      title: action.charAt(0).toUpperCase() + action.slice(1),
      content: `This is the ${action} content.`,
      primaryText: 'Confirm',
      secondaryText: 'Cancel',
      onPrimary: () => console.log(`${action} confirmed`),
      onSecondary: () => console.log(`${action} cancelled`)
    });
    setShowFloater(true);
  };

  return (
    <>
      <SplashScreen /> {/*Added SplashScreen */}
      <Container>
        <Header username="Alex Smith" />
        <Greeting />
        <Balance value="4,285.50" />
        <ActionButtons openFloater={handleAction} />
        <Upload onUpload={handleUpload} />
        <Stats />
      </Container>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Floater
        isOpen={showFloater}
        onClose={() => setShowFloater(false)}
        title={floaterContent.title}
        primaryText={floaterContent.primaryText}
        secondaryText={floaterContent.secondaryText}
        onPrimary={floaterContent.onPrimary}
        onSecondary={floaterContent.onSecondary}
      >
        <div>{floaterContent.content}</div>
      </Floater>
    </>
  );
}

// Add CSS for the SplashScreen (This would typically be in a separate .module.css file)
// This is placeholder CSS and needs to be adjusted to fit the user's design requirements.
// Add this CSS to your stylesheet.
/*
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #121212 0%, #0A0A0A 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.splash-content {
  text-align: center;
}

.logo {
  font-size: 4em;
  color: #9D5CFF;
  margin-bottom: 1em;
  animation: float 1.5s ease-in-out infinite alternate;
}

.loading-indicator {
  width: 100px;
  height: 10px;
  background-color: #9D5CFF;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
*/