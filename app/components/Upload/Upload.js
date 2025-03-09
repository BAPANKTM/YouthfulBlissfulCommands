
'use client';
import React, { useState } from 'react';
import styles from './Upload.module.css';

const Upload = ({ onUpload }) => {
  const [step, setStep] = useState(0);
  const [textContent, setTextContent] = useState('');
  
  const handleInitialClick = () => {
    setStep(1); // Go to media type selection
    onUpload(); // This triggers the floater to open
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
  
  // Content for the Floater based on current step
  const getFloaterContent = () => {
    if (step === 1) {
      return (
        <div className={styles.mediaTypeSelection}>
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
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share Text
          </button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className={styles.textEntryScreen}>
          <textarea 
            placeholder="Enter your text here..."
            className={styles.textArea}
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
    } else {
      return (
        <div>Select a file to upload</div>
      );
    }
  };

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
};

export default Upload;
