
'use client';
import { useState, useEffect } from 'react';
import styles from './History.module.css';
import { fetchWithdrawalHistory } from '../../utils/withdrawalUtils';

export default function History() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

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
    
  return (
    <div className={styles.historyContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>Withdrawal History</div>
      </div>

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

  const filteredWithdrawals = getFilteredWithdrawals();

  return (
    <div className={styles.historyContainer}>
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
            <div key={index} className={styles.historyItem}>
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
    </div>
  );
}
