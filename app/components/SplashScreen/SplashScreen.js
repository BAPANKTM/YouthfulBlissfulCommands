
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
          {/* Generate 15 particles with static values instead of dynamic ones */}
          <div className={styles.particle} style={{animationDelay: "0s", left: "5%", width: "4px", height: "4px", opacity: 0.3}}></div>
          <div className={styles.particle} style={{animationDelay: "0.2s", left: "11%", width: "6px", height: "6px", opacity: 0.4}}></div>
          <div className={styles.particle} style={{animationDelay: "0.4s", left: "17%", width: "5px", height: "5px", opacity: 0.5}}></div>
          <div className={styles.particle} style={{animationDelay: "0.6s", left: "23%", width: "4px", height: "4px", opacity: 0.3}}></div>
          <div className={styles.particle} style={{animationDelay: "0.8s", left: "29%", width: "6px", height: "6px", opacity: 0.4}}></div>
          <div className={styles.particle} style={{animationDelay: "1s", left: "35%", width: "5px", height: "5px", opacity: 0.5}}></div>
          <div className={styles.particle} style={{animationDelay: "1.2s", left: "41%", width: "4px", height: "4px", opacity: 0.3}}></div>
          <div className={styles.particle} style={{animationDelay: "1.4s", left: "47%", width: "6px", height: "6px", opacity: 0.4}}></div>
          <div className={styles.particle} style={{animationDelay: "1.6s", left: "53%", width: "5px", height: "5px", opacity: 0.5}}></div>
          <div className={styles.particle} style={{animationDelay: "1.8s", left: "59%", width: "4px", height: "4px", opacity: 0.3}}></div>
          <div className={styles.particle} style={{animationDelay: "2s", left: "65%", width: "6px", height: "6px", opacity: 0.4}}></div>
          <div className={styles.particle} style={{animationDelay: "2.2s", left: "71%", width: "5px", height: "5px", opacity: 0.5}}></div>
          <div className={styles.particle} style={{animationDelay: "2.4s", left: "77%", width: "4px", height: "4px", opacity: 0.3}}></div>
          <div className={styles.particle} style={{animationDelay: "2.6s", left: "83%", width: "6px", height: "6px", opacity: 0.4}}></div>
          <div className={styles.particle} style={{animationDelay: "2.8s", left: "89%", width: "5px", height: "5px", opacity: 0.5}}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
