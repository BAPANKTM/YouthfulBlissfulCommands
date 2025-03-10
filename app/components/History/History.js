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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getFilteredWithdrawals = () => {
    if (activeFilter === 'all') {
      return withdrawals;
    }
    return withdrawals.filter(withdrawal => withdrawal.status.toLowerCase() === activeFilter);
  };

  const getStatusClassName = (status) => {
    return `${styles.status} ${styles[status.toLowerCase()]}`;
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
        <div className={styles.emptyState}>Loading...</div>
      ) : filteredWithdrawals.length === 0 ? (
        <div className={styles.emptyState}>No withdrawal history found</div>
      ) : (
        <div className={styles.historyList}>
          {filteredWithdrawals.map((withdrawal, index) => (
            <div key={index} className={styles.historyItem}>
              <div className={styles.historyItemHeader}>
                <div className={styles.method}>{withdrawal.method}</div>
                <div className={styles.amount}>₹{withdrawal.amount}</div>
              </div>
              <div className={styles.historyItemDetails}>
                <div className={styles.date}>{formatDate(withdrawal.date)}</div>
                <div className={getStatusClassName(withdrawal.status)}>
                  {withdrawal.status}
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