
'use client';
import React from 'react';
import styles from './Greeting.module.css';
import useGreeting from '../../hooks/useGreeting';

const Greeting = () => {
  const greeting = useGreeting();

  return (
    <div className={styles.greetingBanner} id="greeting-banner">
      <div className={styles.greetingText} id="greeting-text">{greeting.text}</div>
      <div className={styles.greetingIcon}>
        <svg id="greeting-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          dangerouslySetInnerHTML={{ __html: greeting.icon }}>
        </svg>
      </div>
    </div>
  );
};

export default Greeting;
