
'use client';
import { useState, useEffect } from 'react';
import styles from './Links.module.css';
import { fetchLinkHistory, formatDate, getContentTypeIcon } from '../../utils/linksUtils';

export default function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    async function loadLinks() {
      try {
        const data = await fetchLinkHistory();
        setLinks(data);
      } catch (error) {
        console.error('Error loading links history:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const handleBackClick = () => {
    setSelectedLink(null);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading links...</p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔗</div>
        <h3>No Links Yet</h3>
        <p>Your shared links will appear here</p>
      </div>
    );
  }

  // Display link details if a link is selected
  if (selectedLink) {
    return (
      <div className={styles.linkDetailView}>
        <div className={styles.backButton} onClick={handleBackClick}>
          ← Back to Links
        </div>
        <div className={styles.detailHeader}>
          <span className={styles.typeIcon}>{getContentTypeIcon(selectedLink.type)}</span>
          <h3 className={styles.detailTitle}>{selectedLink.title}</h3>
        </div>
        <div className={styles.detailInfo}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Type:</span>
            <span className={styles.detailValue}>{selectedLink.type}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Created:</span>
            <span className={styles.detailValue}>{formatDate(selectedLink.date)}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Link ID:</span>
            <span className={styles.detailValue}>{selectedLink.id}</span>
          </div>
        </div>
        <div className={styles.metricsSection}>
          <h4>Link Performance</h4>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{selectedLink.metrics.clicks}</div>
              <div className={styles.metricLabel}>Total Clicks</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{selectedLink.metrics.downloads}</div>
              <div className={styles.metricLabel}>Downloads</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display the list of links
  return (
    <div className={styles.linksContainer}>
      {links.map((link) => (
        <div 
          key={link.id} 
          className={styles.linkItem}
          onClick={() => handleLinkClick(link)}
        >
          <div className={styles.linkHeader}>
            <span className={styles.typeIcon}>{getContentTypeIcon(link.type)}</span>
            <span className={styles.linkTitle}>{link.title}</span>
          </div>
          <div className={styles.linkDate}>{formatDate(link.date)}</div>
          <div className={styles.linkStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Clicks:</span>
              <span className={styles.statValue}>{link.metrics.clicks}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Downloads:</span>
              <span className={styles.statValue}>{link.metrics.downloads}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
