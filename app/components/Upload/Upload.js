
import { useState, useRef } from 'react';
import styles from './Upload.module.css';
import fetchTelegramConfig from '../../utils/telegramConfig';

const Upload = ({ onUpload }) => {
  const [step, setStep] = useState(0);
  const [uploadType, setUploadType] = useState(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState({ type: null, message: null });
  const fileInputRef = useRef(null);
  
  const handleTypeSelect = (type) => {
    setUploadType(type);
    setStep(1);
  };
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleBack = () => {
    setStep(0);
    setUploadType(null);
    setFile(null);
    setText('');
    setProgress(0);
    setUploadStatus({ type: null, message: null });
  };
  
  const handleTextUpload = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setUploadStatus({ type: null, message: null });
    
    try {
      const config = await fetchTelegramConfig();
      
      const formData = new FormData();
      formData.append('chat_id', config.channel_id);
      formData.append('text', text);
      
      const response = await fetch(`https://api.telegram.org/bot${config.bot_token}/sendMessage`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.ok) {
        setUploadStatus({ type: 'success', message: 'Message sent successfully!' });
        setText('');
        // Reset to initial state after 2 seconds
        setTimeout(() => {
          setStep(0);
          setUploadType(null);
          setUploadStatus({ type: null, message: null });
        }, 2000);
      } else {
        throw new Error(data.description || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error uploading text:', error);
      setUploadStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };
  
  const [forceDocument, setForceDocument] = useState(false);
  
  const handleMediaUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setProgress(0);
    setUploadStatus({ type: null, message: null });
    
    try {
      const config = await fetchTelegramConfig();
      
      const formData = new FormData();
      formData.append('chat_id', config.channel_id);
      
      // Determine the correct API endpoint based on file type and forceDocument option
      let endpoint;
      const fileType = file.type.split('/')[0];
      
      if (forceDocument) {
        endpoint = 'sendDocument';
        formData.append('document', file);
      } else if (fileType === 'image') {
        endpoint = 'sendPhoto';
        formData.append('photo', file);
      } else if (fileType === 'video') {
        endpoint = 'sendVideo';
        formData.append('video', file);
      } else if (fileType === 'audio') {
        endpoint = 'sendAudio';
        formData.append('audio', file);
      } else {
        endpoint = 'sendDocument';
        formData.append('document', file);
      }
      
      // Add caption if available
      if (text.trim()) {
        formData.append('caption', text);
      }
      
      // Use XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          // Use requestAnimationFrame to prevent UI flickering
          requestAnimationFrame(() => {
            setProgress(percent);
          });
        }
      };
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.ok) {
              setUploadStatus({ type: 'success', message: 'Media uploaded successfully!' });
              setFile(null);
              setText('');
              // Reset to initial state after 2 seconds
              setTimeout(() => {
                setStep(0);
                setUploadType(null);
                setUploadStatus({ type: null, message: null });
              }, 2000);
            } else {
              throw new Error(response.description || 'Failed to upload media');
            }
          } catch (error) {
            setUploadStatus({ type: 'error', message: 'Error parsing response' });
          }
        } else if (xhr.status === 413) {
          setUploadStatus({ type: 'error', message: 'File too large. Telegram has a 50MB file size limit.' });
        } else {
          setUploadStatus({ type: 'error', message: `HTTP error ${xhr.status}` });
        }
        setLoading(false);
      };
      
      xhr.onerror = function() {
        setUploadStatus({ type: 'error', message: 'Network error occurred. Please check your connection and try again.' });
        setLoading(false);
      };
      
      xhr.ontimeout = function() {
        setUploadStatus({ type: 'error', message: 'Upload timed out. Please try again with a smaller file or check your connection.' });
        setLoading(false);
      };
      
      xhr.open('POST', `https://api.telegram.org/bot${config.bot_token}/${endpoint}`);
      xhr.send(formData);
    } catch (error) {
      console.error('Error uploading media:', error);
      setUploadStatus({ 
        type: 'error', 
        message: 'Failed to upload media. Please try again.'
      });
      setLoading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Component for status notification
  const StatusNotification = () => {
    if (!uploadStatus.type) return null;
    
    return (
      <div className={`${styles.statusNotification} ${styles[uploadStatus.type]}`}>
        {uploadStatus.type === 'success' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76493 14.1003 1.98234 16.07 2.86" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01L9 11.01" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 9L9 15" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9L15 15" stroke="#FF5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <span>{uploadStatus.message}</span>
      </div>
    );
  };
  
  // Component for progress indicator
  const ProgressIndicator = () => {
    if (!loading || progress === 0) return null;
    
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>{progress}%</div>
      </div>
    );
  };
  
  // Render the appropriate step
  if (step === 0) {
    // Type selection
    return (
      <div className={styles.upload}>
        <div className={styles.uploadTitle}>
          <div className={styles.uploadIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 14H14V21H21V14Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14H3V21H10V14Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3H14V10H21V3Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 3H3V10H10V3Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Upload content</span>
        </div>
        <div className={styles.uploadOptions}>
          <div className={styles.uploadOption} onClick={() => handleTypeSelect('text')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H9H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Text</span>
          </div>
          <div className={styles.uploadOption} onClick={() => handleTypeSelect('media')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="#9D5CFF"/>
              <path d="M21 15L16 10L5 21" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Media</span>
          </div>
        </div>
      </div>
    );
  } else if (step === 1) {
    // Upload form based on selected type
    return (
      <div className={styles.uploadForm}>
        <div className={styles.uploadHeader}>
          <button className={styles.backButton} onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2>{uploadType === 'text' ? 'Share Text' : 'Share Media'}</h2>
        </div>
        
        <StatusNotification />
        
        {uploadType === 'text' ? (
          <div className={styles.textUploadForm}>
            <textarea 
              className={styles.textInput} 
              placeholder="Type your message here..." 
              value={text}
              onChange={handleTextChange}
              disabled={loading}
            ></textarea>
            <button 
              className={styles.uploadButton} 
              onClick={handleTextUpload}
              disabled={loading || !text.trim()}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        ) : (
          <div className={styles.mediaUploadForm}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              style={{ display: 'none' }} 
              accept=".jpg,.jpeg,.png,.gif,.mp4,.mp3,.wav,.ogg,.pdf,.zip,.rar,.doc,.docx,.xls,.xlsx,.csv,.txt,.webp,.tgs,.webm,.mov,.avi,.flv,.midi,.svg,.psd,.ai,.eps,.exe,.dll,.apk,.3gp,.m4a,.ts,.mkv"
              disabled={loading}
            />
            
            <div className={styles.mediaContainer}>
              {!file ? (
                <div className={styles.mediaDropArea} onClick={triggerFileInput}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Click to select a file or drag and drop</p>
                </div>
              ) : (
                <div className={styles.mediaPreview}>
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      className={styles.mediaPreviewImage}
                    />
                  ) : file.type.startsWith('video/') ? (
                    <video 
                      src={URL.createObjectURL(file)} 
                      controls 
                      className={styles.mediaPreviewVideo}
                    ></video>
                  ) : (
                    <div className={styles.fileInfo}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p>{file.name}</p>
                      <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  )}
                  <button 
                    className={styles.removeButton} 
                    onClick={() => setFile(null)}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            
            <ProgressIndicator />
            
            <div className={styles.uploadOptions}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={forceDocument}
                  onChange={(e) => setForceDocument(e.target.checked)}
                  disabled={loading}
                />
                <span>Upload as Document</span>
                <div className={styles.tooltip}>
                  Sends file as a document regardless of type (preserves original file)
                </div>
              </label>
            </div>
            
            <textarea 
              className={styles.captionInput} 
              placeholder="Add a caption (optional)..." 
              value={text}
              onChange={handleTextChange}
              disabled={loading || !file}
            ></textarea>
            
            <button 
              className={styles.uploadButton} 
              onClick={handleMediaUpload}
              disabled={loading || !file}
            >
              {loading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default Upload;
