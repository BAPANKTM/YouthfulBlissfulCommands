import { useState, useRef } from 'react';
import styles from './Upload.module.css';
import fetchTelegramConfig from '../../utils/telegramConfig';

const Upload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState({ type: null, message: null });
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleMediaUpload = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setUploadStatus({ type: null, message: null });

    try {
      const config = await fetchTelegramConfig();

      const formData = new FormData();
      formData.append('chat_id', config.channel_id);

      // Determine the correct API endpoint based on file type
      let endpoint;
      const fileType = file.type.split('/')[0];

      if (fileType === 'image') {
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
      const text = document.querySelector('.captionInput').value;
      if (text.trim()) {
        formData.append('caption', text);
      }

      // Use XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
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
                setUploadStatus({ type: null, message: null });
              }, 2000);
            } else {
              throw new Error(response.description || 'Failed to upload media');
            }
          } catch (error) {
            setUploadStatus({ type: 'error', message: 'Error parsing response' });
          }
        } else {
          setUploadStatus({ type: 'error', message: `HTTP error ${xhr.status}` });
        }
        setLoading(false);
      };

      xhr.onerror = function() {
        setUploadStatus({ type: 'error', message: 'Connection error' });
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

  // Component for status notification
  const StatusNotification = () => {
    if (!uploadStatus.type) return null;

    return (
      <div className={`${styles.statusNotification} ${styles[uploadStatus.type]}`}>
        {uploadStatus.message}
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


  return (
    <div className={styles.uploadForm}>
      <div className={styles.uploadHeader}>
        <h2>Share Media</h2>
      </div>

      <StatusNotification />

      <div className={styles.mediaUploadForm}>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect}
          style={{ display: 'none' }} 
          accept=".jpg,.jpeg,.png,.gif,.mp4,.mp3,.wav,.ogg,.pdf,.zip,.rar,.doc,.docx,.xls,.xlsx,.csv,.txt,.webp,.tgs,.webm,.mov"
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
    </div>
  );
};

export default Upload;