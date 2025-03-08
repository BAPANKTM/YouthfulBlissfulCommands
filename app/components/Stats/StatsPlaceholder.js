
import React from 'react';
import styles from './StatsPlaceholder.module.css';

const StatsPlaceholder = () => {
  return (
    <div className={styles.statsPlaceholder}>
      <svg className={styles.statsPlaceholderIcon} width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20V10" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20V4" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 20V14" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className={styles.statsPlaceholderText}>Your statistics will appear here as you start sharing content and gaining viewers</div>
    </div>
  );
};

export default StatsPlaceholder;
