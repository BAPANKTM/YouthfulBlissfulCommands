
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
  };

  return (
    <>
      <Container>
        <Header username="Alex Smith" />
        <Greeting />
        <Balance value="4,285.50" />
        <ActionButtons onAction={handleAction} />
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
