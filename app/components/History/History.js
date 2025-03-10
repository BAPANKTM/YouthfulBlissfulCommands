
'use client';
import { useState, useEffect } from 'react';
import { fetchWithdrawalHistory, formatDate, getStatusColor } from '../../utils/withdrawalUtils';
import styles from './History.module.css';

const History = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const getWithdrawals = async () => {
      try {
        setLoading(true);
        const data = await fetchWithdrawalHistory();
        setWithdrawals(data);
        setFilteredWithdrawals(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load withdrawal history');
        setLoading(false);
      }
    };

    getWithdrawals();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredWithdrawals(withdrawals);
    } else {
      setFilteredWithdrawals(
        withdrawals.filter(item => item.status === activeFilter)
      );
    }
  }, [activeFilter, withdrawals]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <div className={styles.loading}>Loading withdrawal history...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.historyContainer}>
      <div className={styles.filterContainer}>
        <div 
          className={`${styles.filterOption} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </div>
        <div 
          className={`${styles.filterOption} ${activeFilter === 'complete' ? styles.active : ''}`}
          onClick={() => handleFilterChange('complete')}
        >
          Complete
        </div>
        <div 
          className={`${styles.filterOption} ${activeFilter === 'processing' ? styles.active : ''}`}
          onClick={() => handleFilterChange('processing')}
        >
          Processing
        </div>
        <div 
          className={`${styles.filterOption} ${activeFilter === 'failed' ? styles.active : ''}`}
          onClick={() => handleFilterChange('failed')}
        >
          Failed
        </div>
      </div>

      {filteredWithdrawals.length === 0 ? (
        <div className={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No withdrawals found for this filter</p>
        </div>
      ) : (
        <div className={styles.historyList}>
          {filteredWithdrawals.map((withdrawal) => (
            <div key={withdrawal.withdrawal_id} className={styles.historyItem}>
              <div className={styles.historyItemHeader}>
                <div className={styles.method}>{withdrawal.withdrawal_method}</div>
                <div className={styles.amount}>${typeof withdrawal.amount === 'number' && withdrawal.amount < 1 
                  ? withdrawal.amount.toFixed(5) 
                  : withdrawal.amount.toFixed(2)}</div>
              </div>
              <div className={styles.historyItemDetails}>
                <div className={styles.date}>{formatDate(withdrawal.withdrawal_time)}</div>
                <div 
                  className={styles.status} 
                  style={{ color: getStatusColor(withdrawal.status) }}
                >
                  {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                </div>
              </div>
              {withdrawal.reason && (
                <div className={styles.reason}>
                  Reason: {withdrawal.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
