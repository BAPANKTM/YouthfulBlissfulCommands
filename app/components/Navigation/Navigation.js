'use client';
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
      <div className={`${styles.navItem} ${activeTab === 'links' ? styles.active : ''}`} onClick={() => {onTabChange('links'); window.dispatchEvent(new CustomEvent('action', { detail: { type: 'links' } }));}}>
        <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13C10.4295 13.5741 10.9774 14.0461 11.6066 14.3929C12.2357 14.7397 12.9315 14.9547 13.6467 15.0217C14.3618 15.0886 15.0796 15.0063 15.7513 14.7797C16.4231 14.553 17.0331 14.1878 17.54 13.7L21.54 9.7C22.4557 8.74438 22.9488 7.4573 22.9274 6.12468C22.906 4.79206 22.3815 3.52052 21.4423 2.59982C20.5032 1.67912 19.2202 1.17272 17.8879 1.17079C16.5555 1.16886 15.2713 1.67154 14.33 2.59L12.33 4.59" 
            stroke={activeTab === 'links' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 11C13.5705 10.4259 13.0226 9.95391 12.3934 9.60711C11.7642 9.26031 11.0685 9.04531 10.3533 8.97833C9.63816 8.91135 8.92037 8.99374 8.24861 9.22033C7.57685 9.44692 6.96684 9.81215 6.45996 10.3L2.45996 14.3C1.54428 15.2556 1.05118 16.5427 1.07262 17.8753C1.09406 19.2079 1.61851 20.4795 2.55768 21.4002C3.49685 22.3209 4.77979 22.8273 6.11211 22.8292C7.44444 22.8311 8.7287 22.3285 9.66996 21.4L11.67 19.4" 
            stroke={activeTab === 'links' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className={styles.navLabel}>Links</div>
      </div>
      <div className={`${styles.navItem} ${activeTab === 'history' ? styles.active : ''}`} onClick={() => {onTabChange('history'); window.dispatchEvent(new CustomEvent('action', { detail: { type: 'history' } }));}}>
        <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15" stroke={activeTab === 'history' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.05078 11.0002C3.27246 8.18717 4.61914 5.54688 6.82471 3.78127C9.03027 2.01566 11.8857 1.26709 14.6952 1.744C17.5048 2.22092 20.0216 3.87287 21.5801 6.27142C23.1387 8.66996 23.5905 11.5998 22.8444 14.3144C22.0984 17.0291 20.2264 19.2949 17.6949 20.5885C15.1634 21.8822 12.1956 22.0869 9.51732 21.1498C6.83908 20.2127 4.66739 18.202 3.4917 15.6089C2.31601 13.0158 2.20846 10.0511 3.19102 7.38036" 
            stroke={activeTab === 'history' ? "#9D5CFF" : "#9D9D9D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className={styles.navLabel}>History</div>
      </div>
    </div>
  );
};

export default Navigation;