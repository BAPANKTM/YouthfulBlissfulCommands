
import { useEffect, useState } from 'react';
import styles from '../../styles/GreetingBanner.module.css';
import { getGreeting, getGreetingIcon } from '../../utils/timeUtils';

export default function GreetingBanner() {
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
      setIcon(getGreetingIcon());
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.greetingBanner} id="greeting-banner">
      <div className={styles.greetingText} id="greeting-text">{greeting}</div>
      <div className={styles.greetingIcon}>
        <svg id="greeting-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
             dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
    </div>
  );
}
