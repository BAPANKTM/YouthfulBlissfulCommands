
'use client';
import { useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Greeting from './components/Greeting/Greeting';
import Balance from './components/Balance/Balance';
import ActionButtons from './components/ActionButtons/ActionButtons';
import Upload from './components/Upload/Upload';
import Stats from './components/Stats/Stats';
import Navigation from './components/Navigation/Navigation';
import Floater from './components/Floater/Floater';
import './globals.css';

export default function Home() {
  const [floaterState, setFloaterState] = useState({
    isActive: false,
    type: null
  });

  const openFloater = (type) => {
    setFloaterState({
      isActive: true,
      type
    });
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeFloater = () => {
    setFloaterState({
      ...floaterState,
      isActive: false
    });
    document.body.style.overflow = ''; // Restore scrolling
  };

  const handleFloaterAction = (action) => {
    console.log(`Action: ${action} for floater: ${floaterState.type}`);
    // Here you can add specific actions for different buttons
    closeFloater();
  };

  return (
    <main>
      <Container>
        <Header />
        <Greeting />
        <Balance />
        <ActionButtons openFloater={openFloater} />
        <Upload />
        <Stats />
      </Container>
      
      <Navigation />
      
      <Floater 
        isActive={floaterState.isActive}
        type={floaterState.type}
        onClose={closeFloater}
        onAction={handleFloaterAction}
      />
    </main>
  );
}
