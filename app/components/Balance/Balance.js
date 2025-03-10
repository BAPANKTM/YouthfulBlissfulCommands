import React from 'react';
import styles from './Balance.module.css';

const Balance = ({ value }) => {
  return (
    <div className={styles.balance}>
      <div className={styles.balanceInner}>
        <div className={styles.moneyBlock}>
          <div className={styles.moneyValue}>
            <span className={styles.currencySymbol}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {value}
          </div>
        </div>
        <div className={styles.moneyTitle}>Total Balance</div>
      </div>
      <div className={styles.glowEffect}></div>
      <div className={styles.particleContainer}>
        <div className={`${styles.particle} ${styles.particle1}`}></div>
        <div className={`${styles.particle} ${styles.particle2}`}></div>
        <div className={`${styles.particle} ${styles.particle3}`}></div>
      </div>
    </div>
  );
};

export default Balance;
