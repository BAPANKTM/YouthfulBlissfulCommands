'use client';
import React from 'react';
import styles from './Upload.module.css';

const Upload = ({ onUpload }) => {
  return (
    <div className={styles.upload}>
      <div className={styles.uploadTitle}>
        <div className={styles.uploadIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        Upload Files
      </div>
      <div className={styles.uploadDrop} onClick={onUpload}>
        <div className={styles.uploadDropIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 16.5V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V16.5M12 14.5V6.5M12 6.5L9 9.5M12 6.5L15 9.5" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.uploadText}>
          <span className={styles.uploadHighlight}>Click to upload</span> or drag files here
          <div className={styles.uploadFormats}>
            Support for all file types up to 1GB
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
