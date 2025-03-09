
'use client';
import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Show splash for 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setVisible(false);
      
      // Completely remove from DOM after fade animation completes
      const removeTimer = setTimeout(() => {
        setRemoved(true);
      }, 600); // slightly longer than CSS transition
      
      return () => clearTimeout(removeTimer);
    }, 2500);

    return () => clearTimeout(fadeTimer);
  }, []);

  // Don't render at all if removed
  if (removed) return null;

  return (
    <div className={`${styles.splashContainer} ${!visible ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>T</div>
          <div className={styles.logoText}>TeleShare</div>
        </div>
        <div className={styles.loader}>
          <div className={styles.loaderBar}></div>
        </div>
        <div className={styles.particles}>
          {/* Generate 15 particles with varying positions */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className={styles.particle} 
              style={{
                animationDelay: `${0.2 * i}s`,
                left: `${5 + (i * 6)}%`,
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                opacity: Math.random() * 0.7
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
