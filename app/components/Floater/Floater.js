'use client';
import { useState, useEffect } from 'react';
import styles from './Floater.module.css';

const Floater = ({ title, children, primaryText, secondaryText, onPrimary, onSecondary, isOpen, onClose }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setActive(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for animation to finish
    }
  };

  const handlePrimary = () => {
    if (onPrimary) {
      onPrimary();
    }
    handleClose();
  };

  const handleSecondary = () => {
    if (onSecondary) {
      onSecondary();
    }
    handleClose();
  };

  return (
    <div className={`${styles.floaterOverlay} ${active ? styles.active : ''}`}>
      <div className={styles.floater}>
        <div className={styles.floaterHeader}>
          <div className={styles.floaterTitle}>{title}</div>
          <div className={styles.floaterClose} onClick={handleClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className={styles.floaterContent}>
          {children}
        </div>
        <div className={styles.floaterButtons}>
          {secondaryText && (
            <button className={`${styles.floaterButton} ${styles.secondary}`} onClick={handleSecondary}>
              {secondaryText}
            </button>
          )}
          <button className={styles.floaterButton} onClick={handlePrimary}>
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Floater;