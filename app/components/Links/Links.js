
'use client';
import { useState, useEffect } from 'react';
import styles from '../History/History.module.css';
import { fetchLinksHistory, formatDate, getTypeIcon } from '../../utils/linksUtils';

export default function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function loadLinks() {
      try {
        const data = await fetchLinksHistory();
        setLinks(data);
      } catch (error) {
        console.error('Error loading links:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  const getFilteredLinks = () => {
    if (activeFilter === 'all') {
      return links;
    }
    return links.filter(link => link.type.toLowerCase() === activeFilter);
  };

  const filteredLinks = getFilteredLinks();

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
          className={`${styles.filterOption} ${activeFilter === 'file' ? styles.active : ''}`}
          onClick={() => setActiveFilter('file')}
        >
          Files
        </div>
        <div 
          className={`${styles.filterOption} ${activeFilter === 'image' ? styles.active : ''}`}
          onClick={() => setActiveFilter('image')}
        >
          Images
        </div>
        <div 
          className={`${styles.filterOption} ${activeFilter === 'text' ? styles.active : ''}`}
          onClick={() => setActiveFilter('text')}
        >
          Text
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <div>Loading links...</div>
        </div>
      ) : filteredLinks.length === 0 ? (
        <div className={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12C18.6 16 15.6 18 12 18C8.4 18 5.4 16 3 12C5.4 8 8.4 6 12 6C15.6 6 18.6 8 21 12Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No {activeFilter !== 'all' ? activeFilter : ''} links found</p>
        </div>
      ) : (
        <div className={styles.historyList}>
          {filteredLinks.map((link, index) => (
            <div key={index} className={styles.historyItem}>
              <div className={styles.historyItemHeader}>
                <div className={styles.method}>
                  <span className={styles.typeIcon}>{getTypeIcon(link.type)}</span>
                  {link.title}
                </div>
                <div className={styles.amount}>${link.clicks} clicks</div>
              </div>
              <div className={styles.historyItemDetails}>
                <div className={styles.date}>{formatDate(link.created_at)}</div>
                <div className={`${styles.status} ${styles.processing}`}>
                  {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                </div>
              </div>
              <div className={styles.linkStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Downloads:</span>
                  <span className={styles.statValue}>{link.downloads}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Recent clicks:</span>
                  <span className={styles.statValue}>{link.recent_clicks}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Recent downloads:</span>
                  <span className={styles.statValue}>{link.recent_downloads}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
