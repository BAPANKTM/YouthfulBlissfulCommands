'use client';
import React from 'react';
import styles from './Navigation.module.css';

const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.navigation}>
      <div className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`} onClick={() => onTabChange('home')}>
        <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke={activeTab === 'home' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 22V12H15V22" stroke={activeTab === 'home' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" />
        </svg>
        <div className={styles.navLabel}>Home</div>
      </div>
      <div className={`${styles.navItem} ${activeTab === 'links' ? styles.active : ''}`} onClick={() => onTabChange('links')}>
        <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13C10.8626 14.3291 12.3246 15.1615 13.92 15.16C14.9388 15.1642 15.921 14.7935 16.6748 14.1224C17.4285 13.4512 17.9034 12.5243 18 11.51C18 9.29 15.87 7.56 13.12 7C10.89 6.3 8.33 6.95 7.57 9.07C6.81 11.19 7.3 13.8 9.67 14.85L15.19 17.78C15.4615 17.9255 15.6816 18.1454 15.8274 18.4095C15.9732 18.6736 16.0392 18.9711 16.0174 19.2681C15.9957 19.565 15.887 19.8487 15.7033 20.0879C15.5195 20.3271 15.2679 20.5123 14.98 20.62L7.92 23.57" 
            stroke={activeTab === 'links' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 7V3C15 2.73478 14.8946 2.48043 14.7071 2.29289C14.5196 2.10536 14.2652 2 14 2H10C9.73478 2 9.48043 2.10536 9.29289 2.29289C9.10536 2.48043 9 2.73478 9 3V7" 
            stroke={activeTab === 'links' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className={styles.navLabel}>Links</div>
      </div>
      <div className={`${styles.navItem} ${activeTab === 'history' ? styles.active : ''}`} onClick={() => onTabChange('history')}>
        <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15" stroke={activeTab === 'history' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.05 11C3.27151 9.38147 3.97341 7.86785 5.06413 6.6353C6.15486 5.40275 7.58456 4.50951 9.17268 4.06796C10.7608 3.6264 12.4389 3.65259 13.9999 4.14281C15.561 4.63303 16.9353 5.56807 17.9706 6.83862C19.0059 8.10917 19.6517 9.65843 19.8328 11.2908C20.0138 12.9232 19.7228 14.5716 18.9936 16.0549C18.2644 17.5382 17.1293 18.7898 15.7283 19.6553C14.3273 20.5209 12.7218 20.9617 11.08 20.93" 
            stroke={activeTab === 'history' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 11V5M3 11H9" stroke={activeTab === 'history' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className={styles.navLabel}>History</div>
      </div>
    </div>
  );
};

export default Navigation;