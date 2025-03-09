'use client';
import React from 'react';
import styles from './ActionButtons.module.css';

const ActionButtons = ({ openFloater }) => {
  return (
    <div className={styles.actionButtons}>
      <div className={styles.actionButton} onClick={() => openFloater('withdrawal')}>
        <svg className={styles.actionIcon} width="22" height="22" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17V3M12 17L6 11M12 17L18 11" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" />
          <path d="M3 21H21" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className={styles.actionLabel}>Withdrawal</div>
      </div>
      <div className={styles.actionButton} onClick={() => openFloater('help')}>
        <svg className={styles.actionIcon} width="22" height="22" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16V12" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8H12.01" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className={styles.actionLabel}>Help</div>
      </div>
    </div>
  );
};

export default ActionButtons;