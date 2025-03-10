
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
      <div className={styles.actionButton} onClick={() => openFloater('history')}>
        <svg className={styles.actionIcon} width="22" height="22" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.05078 11.0002C3.27246 8.18717 4.61914 5.54688 6.82471 3.78127C9.03027 2.01566 11.8857 1.26709 14.6952 1.744C17.5048 2.22092 20.0216 3.87287 21.5801 6.27142C23.1387 8.66996 23.5905 11.5998 22.8444 14.3144C22.0984 17.0291 20.2264 19.2949 17.6949 20.5885C15.1634 21.8822 12.1956 22.0869 9.51732 21.1498C6.83908 20.2127 4.66739 18.202 3.4917 15.6089C2.31601 13.0158 2.20846 10.0511 3.19102 7.38036" 
            stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={styles.actionText}>History</span>
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
