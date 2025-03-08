
'use client';
import React from 'react';
import styles from './Upload.module.css';

const Upload = () => {
  const handleUploadClick = () => {
    console.log('Upload clicked');
  };

  return (
    <div className={styles.uploadSection} onClick={handleUploadClick}>
      <svg className={styles.uploadIcon} width="40" height="40" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
          stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 8L12 3L7 8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className={styles.uploadTitle}>Upload Content</div>
      <div className={styles.uploadSubtitle}>Tap to share files, photos, or documents</div>
    </div>
  );
};

export default Upload;
