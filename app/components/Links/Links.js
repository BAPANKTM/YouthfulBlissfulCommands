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

  if (selectedLink) {
    return (
      <div className={styles.linkDetailContainer}>
        <div className={styles.backButton} onClick={handleBackClick}>
          ← Back to Links
        </div>
        <div className={styles.linkDetailHeader}>
          <div className={styles.linkTypeIconLarge}>{getContentTypeIcon(selectedLink.type)}</div>
          <h2 className={styles.linkDetailTitle}>{selectedLink.title}</h2>
        </div>
        <div className={styles.linkDetailInfo}>
          <p className={styles.linkDetailDate}>Created on {formatDate(selectedLink.date)}</p>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h4>Total Clicks</h4>
              <div className={styles.metricValueLarge}>{selectedLink.metrics.clicks}</div>
            </div>
            <div className={styles.metricCard}>
              <h4>Total Downloads</h4>
              <div className={styles.metricValueLarge}>{selectedLink.metrics.downloads}</div>
            </div>
          </div>

          <div className={styles.linkActions}>
            <button className={styles.actionButton}>Copy Link</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.linksContainer}>
      <div className={styles.linksList}>
        {links.map((link) => (
          <div 
            key={link.id} 
            className={styles.linkItem} 
            onClick={() => handleLinkClick(link)}
          >
            <div className={styles.linkItemContent}>
              <div className={styles.linkTypeIcon}>{getContentTypeIcon(link.type)}</div>
              <div className={styles.linkInfo}>
                <h3 className={styles.linkTitle}>{link.title}</h3>
                <span className={styles.linkDate}>{formatDate(link.date)}</span>
              </div>
              <div className={styles.linkMetrics}>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{link.metrics.clicks}</span>
                  <span className={styles.metricLabel}>Clicks</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{link.metrics.downloads}</span>
                  <span className={styles.metricLabel}>Downloads</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}