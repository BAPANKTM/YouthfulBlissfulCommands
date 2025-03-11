
'use client';
import { useState, useEffect } from 'react';
import styles from './History.module.css';
import { fetchWithdrawalHistory } from '../../utils/withdrawalUtils';

export default function History({ onClose }) {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await fetchWithdrawalHistory();
        setWithdrawals(data);
      } catch (error) {
        console.error('Error loading withdrawal history:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
      }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Invalid date';
    }
  };

  const getFilteredWithdrawals = () => {
    if (activeFilter === 'all') {
      return withdrawals;
    }
    return withdrawals.filter(withdrawal => {
      const status = withdrawal.status.toLowerCase();
      return status === activeFilter;
    });
  };

  const getStatusClassName = (status) => {
    const statusLower = status.toLowerCase();
    // Map status to appropriate class names
    const statusMap = {
      'complete': 'completed',
      'completed': 'completed',
      'processing': 'processing',
      'failed': 'failed'
    };
    return `${styles.status} ${styles[statusMap[statusLower] || 'default']}`;
  };

  const handleDeleteClick = (e, withdrawal) => {
    e.stopPropagation();
    setSelectedWithdrawal(withdrawal);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Here you would implement the actual delete functionality
    setShowDeleteConfirm(false);
    setShowSuccessMessage(true);

    // Auto close the success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowDetails(false);
    }, 3000);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleWithdrawalClick = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedWithdrawal(null);
  };

  const filteredWithdrawals = getFilteredWithdrawals();

  return (
    <div className={styles.historyContainer}>
      {!showDetails && !showSuccessMessage ? (
        <>
          <div className={styles.filterContainer}>
            <div 
              className={`${styles.filterOption} ${activeFilter === 'all' ? styles.active : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </div>
            <div 
              className={`${styles.filterOption} ${activeFilter === 'completed' ? styles.active : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </div>
            <div 
              className={`${styles.filterOption} ${activeFilter === 'processing' ? styles.active : ''}`}
              onClick={() => setActiveFilter('processing')}
            >
              Processing
            </div>
            <div 
              className={`${styles.filterOption} ${activeFilter === 'failed' ? styles.active : ''}`}
              onClick={() => setActiveFilter('failed')}
            >
              Failed
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <div>Loading history...</div>
            </div>
          ) : filteredWithdrawals.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.05078 11.0002C3.27246 8.18717 4.61914 5.54688 6.82471 3.78127C9.03027 2.01566 11.8857 1.26709 14.6952 1.744C17.5048 2.22092 20.0216 3.87287 21.5801 6.27142C23.1387 8.66996 23.5905 11.5998 22.8444 14.3144C22.0984 17.0291 20.2264 19.2949 17.6949 20.5885C15.1634 21.8822 12.1956 22.0869 9.51732 21.1498C6.83908 20.2127 4.66739 18.202 3.4917 15.6089C2.31601 13.0158 2.20846 10.0511 3.19102 7.38036" 
                  stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>No {activeFilter !== 'all' ? activeFilter : ''} withdrawal history found</p>
            </div>
          ) : (
            <div className={styles.historyList}>
              {filteredWithdrawals.map((withdrawal, index) => (
                <div key={index} className={styles.historyItem} onClick={() => handleWithdrawalClick(withdrawal)}>
                  <div className={styles.historyItemHeader}>
                    <div className={styles.method}>{withdrawal.withdrawal_method || withdrawal.method}</div>
                    <div className={styles.amount}>${withdrawal.amount}</div>
                  </div>
                  <div className={styles.historyItemDetails}>
                    <div className={styles.date}>{formatDate(withdrawal.withdrawal_time)}</div>
                    <div className={getStatusClassName(withdrawal.status)}>
                      {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                    </div>
                  </div>
                  {withdrawal.reason && (
                    <div className={styles.reason}>{withdrawal.reason}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : showSuccessMessage ? (
        <div className={styles.modalOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successModalIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#4BB543" strokeWidth="2"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="#4BB543" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.successModalTitle}>Withdrawal Record Deleted</h2>
            <p className={styles.successModalText}>
              The withdrawal record has been permanently removed from our database.
            </p>
            <p className={styles.successModalNote}>
              This action does not affect any completed transactions or your account balance.
            </p>
            <button 
              className={styles.backToHistoryButton}
              onClick={() => {
                setShowSuccessMessage(false);
                setShowDetails(false);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to History
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>
            <button 
              className={styles.backButton}
              onClick={closeDetails}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to History
            </button>
          </div>
          
          <div className={styles.detailsContent}>
            <div className={styles.detailsSection}>
              <h3 className={styles.detailsTitle}>Withdrawal Details</h3>
              
              <div className={styles.detailsInfo}>
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>Method</span>
                  <span className={styles.detailsValue}>{selectedWithdrawal?.withdrawal_method || selectedWithdrawal?.method}</span>
                </div>
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>Amount</span>
                  <span className={styles.detailsValue}>${selectedWithdrawal?.amount}</span>
                </div>
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>Date</span>
                  <span className={styles.detailsValue}>{formatDate(selectedWithdrawal?.withdrawal_time)}</span>
                </div>
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>Status</span>
                  <span className={getStatusClassName(selectedWithdrawal?.status)}>
                    {selectedWithdrawal?.status.charAt(0).toUpperCase() + selectedWithdrawal?.status.slice(1)}
                  </span>
                </div>
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>ID</span>
                  <span className={styles.detailsValue}>{selectedWithdrawal?.withdrawal_id}</span>
                </div>
                {selectedWithdrawal?.reason && (
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Reason</span>
                    <span className={styles.detailsReason}>{selectedWithdrawal?.reason}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.detailsActions}>
              <button 
                className={styles.deleteButton}
                onClick={(e) => handleDeleteClick(e, selectedWithdrawal)}
              >
                Delete Withdrawal Record
              </button>
            </div>
          </div>
          
          {showDeleteConfirm && (
            <div className={styles.modalOverlay}>
              <div className={styles.deleteModal}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.warningIcon}>
                  <path d="M12 9V14" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17.5V17.51" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className={styles.deleteTitle}>Delete Withdrawal Record</h3>
                <p className={styles.deleteDescription}>
                  Are you sure you want to delete this withdrawal record? This action cannot be undone.
                </p>
                <p className={styles.deleteNote}>
                  Note: This only removes the record from your history and does not affect any completed transactions.
                </p>
                <div className={styles.deleteActions}>
                  <button 
                    className={styles.cancelButton} 
                    onClick={cancelDelete}
                  >
                    Cancel
                  </button>
                  <button 
                    className={styles.confirmButton} 
                    onClick={confirmDelete}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
