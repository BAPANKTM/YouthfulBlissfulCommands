
'use client';
import React from 'react';
import styles from './Floater.module.css';

const floaterConfigs = {
  withdrawal: {
    title: 'Withdrawal',
    icon: `<path d="M12 17V3M12 17L6 11M12 17L18 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M3 21H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    content: `<p>Withdrawal content will be added here.</p>`,
    buttons: [
      {text: 'Cancel', class: 'secondary', action: 'close'},
      {text: 'Confirm', class: 'primary', action: 'confirm'}
    ]
  },
  help: {
    title: 'Help Center',
    icon: `<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M12 16V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M12 8H12.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    content: `<p>Help content will be added here.</p>`,
    buttons: [
      {text: 'Got it', class: 'primary', action: 'close'}
    ]
  },
  settings: {
    title: 'Settings',
    icon: `<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    content: `<p>Settings content will be added here.</p>`,
    buttons: [
      {text: 'Cancel', class: 'secondary', action: 'close'},
      {text: 'Save', class: 'primary', action: 'save'}
    ]
  }
};

const Floater = ({ isActive, type, onClose, onAction }) => {
  const config = floaterConfigs[type] || floaterConfigs.help;

  return (
    <div className={`${styles.floaterOverlay} ${isActive ? styles.floaterOverlayActive : ''}`} onClick={e => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.floater}>
        <div className={styles.floaterHeader}>
          <h3 className={styles.floaterTitle}>
            <div className={styles.floaterTitleIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: config.icon }}>
              </svg>
            </div>
            <span>{config.title}</span>
          </h3>
          <div className={styles.floaterClose} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className={styles.floaterContent} dangerouslySetInnerHTML={{ __html: config.content }}>
        </div>
        <div className={styles.floaterFooter}>
          {config.buttons.map((button, index) => (
            <button 
              key={index}
              className={`${styles.floaterButton} ${button.class === 'secondary' ? styles.secondary : ''}`}
              onClick={() => button.action === 'close' ? onClose() : onAction(button.action)}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Floater;
