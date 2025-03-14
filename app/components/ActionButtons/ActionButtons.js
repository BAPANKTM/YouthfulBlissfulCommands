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
        <span className={styles.actionText}>Withdrawal</span>
      </div>
      <div className={styles.actionButton} onClick={() => openFloater('help')}>
        <svg className={styles.actionIcon} width="22" height="22" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91895 12.4272 7.03871C13.1255 7.15847 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13"
            stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 17H12.01" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.actionText}>Help</span>
      </div>
    </div>
  );
};

export default ActionButtons;