
'use client';
import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Minimum display time of 2 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

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
          {/* Generate 8 particle elements */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={styles.particle} 
              style={{
                animationDelay: `${0.2 * i}s`,
                left: `${10 + (i * 10)}%`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
