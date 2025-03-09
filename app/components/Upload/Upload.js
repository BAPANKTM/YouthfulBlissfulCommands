
'use client';
import React, { useState } from 'react';
import styles from './Upload.module.css';

const Upload = ({ onUpload }) => {
  const [step, setStep] = useState(0);
  const [textContent, setTextContent] = useState('');
  
  const handleInitialClick = () => {
    setStep(1); // Go to media type selection
  };
  
  const handleMediaTypeSelect = (type) => {
    if (type === 'media') {
      // For media files - implementation will be added later
      console.log('Media upload selected');
    } else if (type === 'text') {
      setStep(2); // Go to text entry step
    }
  };
  
  const handleTextUpload = () => {
    console.log('Text content:', textContent);
    // Implement actual upload functionality here
    setStep(0); // Reset to initial state
  };
  
  const handleBack = () => {
    setStep(1); // Go back to media type selection
  };
  
  // Render the component based on current step
  if (step === 0) {
    // Initial upload button
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
        <div className={styles.uploadDrop} onClick={handleInitialClick}>
          <div className={styles.uploadDropIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 16.5V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V16.5M12 14.5V6.5M12 6.5L9 9.5M12 6.5L15 9.5" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.uploadText}>
            <span className={styles.uploadHighlight}>Click to upload</span> files or share text
            <div className={styles.uploadFormats}>
              Support for all file types up to 1GB
            </div>
          </div>
        </div>
      </div>
    );
  } else if (step === 1) {
    // Media type selection
    return (
      <div className={styles.mediaTypeSelection}>
        <h3 className={styles.selectionTitle}>Choose upload type</h3>
        <button 
          className={styles.optionButton}
          onClick={() => handleMediaTypeSelect('media')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Upload Media
        </button>
        <button 
          className={styles.optionButton}
          onClick={() => handleMediaTypeSelect('text')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H9H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Share Text
        </button>
      </div>
    );
  } else if (step === 2) {
    // Text entry step
    return (
      <div className={styles.textEntry}>
        <textarea 
          className={styles.textArea}
          placeholder="Enter your text here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />
        <div className={styles.characterCount}>
          {textContent.length} characters
        </div>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.backButton}
            onClick={handleBack}
          >
            Back
          </button>
          <button 
            className={styles.uploadButton}
            onClick={handleTextUpload}
          >
            Upload Text
          </button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default Upload;
