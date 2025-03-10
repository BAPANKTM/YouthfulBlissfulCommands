'use client';
import React from 'react';
import styles from './ActionButtons.module.css';

const ActionButtons = ({ openFloater }) => {
  return (
    <div className={styles.actionButtons}>
      <button className={styles.actionButton} onClick={() => openFloater('withdrawal')}>
        <svg className={styles.actionIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"></path>
          <path d="M12 3L12 15M12 15L16 11M12 15L8 11"></path>
        </svg>
        <span>Withdraw</span>
      </button>
      <button className={styles.actionButton} onClick={() => openFloater('links')}>
        <svg className={styles.actionIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        <span>Links</span>
      </button>
    </div>
  );
};

export default ActionButtons;