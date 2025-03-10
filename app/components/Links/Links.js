
'use client';
import { useState, useEffect } from 'react';
import styles from '../History/History.module.css';
import { fetchLinksHistory, formatDate } from '../../utils/linksUtils';

export default function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLinks() {
      try {
        const data = await fetchLinksHistory();
        setLinks(data);
      } catch (error) {
        console.error('Error loading links history:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  const renderTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'file':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'image':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="#9D5CFF"/>
            <path d="M21 15L16 10L5 21" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'text':
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div className={styles.history}>
      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading links...</p>
        </div>
      ) : links.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't created any links yet.</p>
        </div>
      ) : (
        <div className={styles.historyContainer}>
          {links.map((link, index) => (
            <div key={index} className={styles.historyItem}>
              <div className={styles.historyItemHeader}>
                <div className={styles.method}>
                  <span className={styles.typeIcon}>{renderTypeIcon(link.type)}</span>
                  {link.title}
                </div>
                <div className={styles.url}>{link.url.substring(0, 30)}{link.url.length > 30 ? '...' : ''}</div>
              </div>
              <div className={styles.historyItemDetails}>
                <div className={styles.date}>{formatDate(link.created_at)}</div>
              </div>
              <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Clicks:</span>
                  <span className={styles.statValue}>{link.clicks}</span>
                  {link.recent_clicks > 0 && (
                    <span className={styles.recentStat}>+{link.recent_clicks} recent</span>
                  )}
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Downloads:</span>
                  <span className={styles.statValue}>{link.downloads}</span>
                  {link.recent_downloads > 0 && (
                    <span className={styles.recentStat}>+{link.recent_downloads} recent</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
