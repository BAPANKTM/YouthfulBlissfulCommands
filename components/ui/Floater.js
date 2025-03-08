import React, { useState, useEffect } from 'react';
import styles from '../../styles/Floater.module.css';

export default function Floater({ configs }) {
  const [active, setActive] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(null);

  useEffect(() => {
    // Listen for events that would trigger the floater
    const handleFloaterEvent = (e) => {
      if (e.detail && e.detail.type && configs[e.detail.type]) {
        setCurrentConfig(configs[e.detail.type]);
        setActive(true);
      }
    };

    window.addEventListener('showFloater', handleFloaterEvent);
    return () => window.removeEventListener('showFloater', handleFloaterEvent);
  }, [configs]);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => setCurrentConfig(null), 300);
  };

  const handleAction = (action) => {
    if (typeof action === 'function') {
      action();
    }
    handleClose();
  };

  if (!active || !currentConfig) return null;

  return (
    <div className={`${styles.floaterOverlay} ${active ? styles.active : ''}`} onClick={handleClose}>
      <div className={styles.floaterContent} onClick={(e) => e.stopPropagation()}>
        {currentConfig.title && <h3 className={styles.floaterTitle}>{currentConfig.title}</h3>}
        {currentConfig.content && <div className={styles.floaterBody}>{currentConfig.content}</div>}
        <div className={styles.floaterButtons}>
          {currentConfig.buttons && currentConfig.buttons.map((button, index) => (
            <button 
              key={index} 
              className={`${styles.floaterButton} ${button.primary ? styles.primary : styles.secondary}`}
              onClick={() => handleAction(button.action)}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}