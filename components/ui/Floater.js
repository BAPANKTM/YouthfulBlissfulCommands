
import { useState, useEffect } from 'react';
import styles from '../../styles/Floater.module.css';

export default function Floater({ configs }) {
  const [active, setActive] = useState(false);
  const [currentType, setCurrentType] = useState(null);

  useEffect(() => {
    // Attach click event to action buttons
    const actionButtons = document.querySelectorAll('[data-floater]');
    actionButtons.forEach(button => {
      button.addEventListener('click', function () {
        const floaterType = this.getAttribute('data-floater');
        openFloater(floaterType);
      });
    });

    // Clean up event listeners
    return () => {
      const actionButtons = document.querySelectorAll('[data-floater]');
      actionButtons.forEach(button => {
        button.removeEventListener('click', function() {});
      });
    };
  }, []);

  // Open floater function
  const openFloater = (type) => {
    if (!configs || !configs[type]) return;
    
    setCurrentType(type);
    setActive(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  // Close floater function
  const closeFloater = () => {
    setActive(false);
    setTimeout(() => {
      document.body.style.overflow = ''; // Restore scrolling after animation completes
    }, 300);
  };

  // Handle action button clicks
  const handleAction = (action) => {
    if (action === 'close') {
      closeFloater();
    } else if (action === 'save-settings') {
      // Save settings to localStorage
      const username = document.getElementById('username')?.value;
      const theme = document.getElementById('theme')?.value;
      const notifications = document.getElementById('notifications')?.checked;
      
      if (username) localStorage.setItem('teleshare_username', username || 'User');
      if (theme) localStorage.setItem('teleshare_theme', theme);
      if (notifications !== undefined) localStorage.setItem('teleshare_notifications', notifications);
      
      closeFloater();
    } else {
      console.log(`Action: ${action} for floater: ${currentType}`);
      closeFloater();
    }
  };

  // If no current type or not active, don't render
  if (!currentType || !active) {
    return (
      <div className={styles.floaterOverlay} id="floater-container">
        <div className={styles.floater}></div>
      </div>
    );
  }

  const config = configs[currentType];

  return (
    <div className={`${styles.floaterOverlay} ${active ? styles.active : ''}`} id="floater-container" onClick={(e) => e.target === e.currentTarget && closeFloater()}>
      <div className={styles.floater}>
        <div className={styles.floaterHeader}>
          <h3 className={styles.floaterTitle}>
            <div className={styles.floaterTitleIcon}>
              <svg id="floater-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: config.icon }} />
            </div>
            <span id="floater-title">{config.title}</span>
          </h3>
          <div className={styles.floaterClose} id="floater-close" onClick={closeFloater}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className={styles.floaterContent} id="floater-content" dangerouslySetInnerHTML={{ __html: config.content }} />
        <div className={styles.floaterFooter} id="floater-footer">
          {config.buttons.map((button, index) => (
            <button 
              key={index}
              className={`${styles.floaterButton} ${button.class === 'secondary' ? styles.secondary : ''}`}
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
