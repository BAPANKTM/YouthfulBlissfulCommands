'use client';
import React from 'react';
import styles from './ActionButtons.module.css';

const ActionButtons = ({ openFloater }) => {
  return (
    <div className={styles.actionButtons}>
      <button className={styles.actionButton} onClick={() => openFloater('withdrawal')}>
        <div className={styles.actionIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.actionText}>Withdrawal</div>
      </button>

      <button className={styles.actionButton} onClick={() => openFloater('history')}>
        <div className={styles.actionIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.05078 11.0002C3.27008 8.18623 4.51515 5.55068 6.53144 3.66667C8.54773 1.78266 11.1949 0.784563 13.9206 0.883553C16.6462 0.982543 19.2079 2.16985 21.0754 4.20444C22.9429 6.23902 23.9786 8.99198 23.9786 11.8552C23.9786 14.7184 22.9429 17.4714 21.0754 19.5059C19.2079 21.5405 16.6462 22.7278 13.9206 22.8268C11.1949 22.9258 8.54773 21.9277 6.53144 20.0437C4.51515 18.1597 3.27008 15.5242 3.05078 12.7102" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.actionText}>History</div>
      </button>

      <button className={styles.actionButton} onClick={() => openFloater('links')}>
        <div className={styles.actionIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13C10.87 13.879 12.124 14.122 13.236 13.659C14.348 13.197 15.197 12.088 15.464 10.804L18 3" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 3L9 4.5" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 3L19.5 9" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 13.9998C13.132 14.8805 11.877 15.1243 10.764 14.6618C9.65097 14.1993 8.80186 13.0899 8.5347 11.8048L5.99997 3.99976" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 4.5L3 3" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 4L4.5 9.99999" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 20.0002L9 16.5002C9.62803 15.8793 10.5376 15.6344 11.3922 15.8553C12.2468 16.0762 12.9371 16.738 13.193 17.5827C13.4489 18.4275 13.2433 19.3435 12.65 20.0002L10.5 22.5002C10.0371 23.0032 9.38282 23.2642 8.7 23.2199L6.7 23.0002C5.53529 22.9413 4.47452 22.2979 3.84397 21.2885C3.21341 20.2791 3.09909 19.0199 3.543 17.9102L6.95 8.97019" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.actionText}>Links</div>
      </button>

      <button className={styles.actionButton} onClick={() => openFloater('help')}>
        <div className={styles.actionIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.09 9.00002C9.3251 8.33169 9.78915 7.76813 10.4 7.40915C11.0108 7.05018 11.7289 6.91896 12.4272 7.03873C13.1255 7.15851 13.7588 7.52154 14.2151 8.06353C14.6713 8.60552 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17H12.01" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.actionText}>Help</div>
      </button>
    </div>
  );
};

export default ActionButtons;