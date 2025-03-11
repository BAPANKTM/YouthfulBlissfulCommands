'use client';
import { useState, useEffect } from 'react';
import styles from './Links.module.css';

export default function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);
  const [viewMode, setViewMode] = useState('lifetime');

  useEffect(() => {
    async function loadLinks() {
      try {
        const response = await fetch('/data/links.json');
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error('Error loading links:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };

      return date.toLocaleDateString('en-US', options);
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Invalid date';
    }
  };

  const handleViewDetails = (link) => {
    setSelectedLink(link);
  };

  const closeDetails = () => {
    setSelectedLink(null);
    setViewMode('lifetime');
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    // Here you would implement the actual delete functionality
    // For now, we'll just show a success message
    setShowDeleteConfirm(false);
    alert('Link deleted successfully. It is no longer accessible to the public. (Your earnings are preserved)');
    closeDetails();
  };
  
  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const getViewCount = (link) => {
    if (!link || !link.views) return 0;

    switch (viewMode) {
      case '60minutes':
        return link.views['60minutes'];
      case '48hours':
        return link.views['48hours'];
      case 'lifetime':
      default:
        return link.views.lifetime;
    }
  };

  const refreshStats = () => {
    // Implement refresh logic here.  This is a placeholder.
    console.log("Refreshing stats...");
    //You would typically refetch data here from your API
  };


  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}></div>
        <div>Loading links...</div>
      </div>
    );
  }

  if (selectedLink) {
    // Function to truncate URL for sticky header
    const truncateUrl = (url, maxLength = 24) => {
      if (url.length <= maxLength) return url;
      return url.substring(0, maxLength) + '...';
    };

    return (
      <div className={styles.detailsContainer}>
        <div className={styles.stickyHeader}>
          <div className={styles.stickyHeaderContent}>
            <div className={styles.stickyTitle}>{selectedLink.nickname}</div>
            <div className={styles.stickyUrl}>{truncateUrl(selectedLink.link)}</div>
          </div>

          <button className={styles.closeButton} onClick={closeDetails}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.detailsContent}>
          <div className={styles.linkDetailSection}>
            <span className={styles.linkDetailLabel}>Link URL</span>
            <div className={styles.linkUrlContainer}>
              <div className={`${styles.linkDetailValue} ${styles.url}`}>{selectedLink.link}</div>
              <button 
                className={styles.copyButton}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(selectedLink.link)
                    .then(() => {
                      // Visual feedback for copy success
                      const copyBtn = e.target.closest('button');
                      const originalText = copyBtn.innerText;
                      copyBtn.innerText = 'Copied!';
                      setTimeout(() => {
                        copyBtn.innerText = originalText;
                      }, 2000);
                    })
                    .catch(err => {
                      console.error('Failed to copy: ', err);
                      alert('Failed to copy link. Please try again.');
                    });
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}}>
                  <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copy URL
              </button>
            </div>
          </div>

          <div className={styles.linkDetailSection}>
            <span className={styles.linkDetailLabel}>Creation Date</span>
            <div className={styles.linkDetailValue}>{formatDate(selectedLink.createdAt)}</div>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statsHeader}>
              <h3 className={styles.statsSectionTitle}>View Statistics</h3>
              <button 
                className={styles.refreshButton} 
                onClick={() => {
                  const iconElement = document.getElementById('refreshIcon');
                  if (iconElement) {
                    iconElement.classList.add(styles.spinning);
                    setTimeout(() => {
                      iconElement.classList.remove(styles.spinning);
                    }, 1000);
                  }
                  refreshStats();
                }}
              >
                <svg id="refreshIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 4V10H17" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 20V14H7" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.51 9.00001C4.01717 7.56682 4.87913 6.2789 6.01547 5.27549C7.1518 4.27208 8.52547 3.58339 10.0083 3.26956C11.4911 2.95572 13.0348 3.02714 14.4761 3.47691C15.9175 3.92668 17.2137 4.73815 18.24 5.82001L23 10M1 14L5.76 18.18C6.78626 19.2619 8.08247 20.0734 9.52384 20.5231C10.9652 20.9729 12.5089 21.0443 13.9917 20.7305C15.4745 20.4166 16.8482 19.728 17.9845 18.7245C19.1209 17.7211 19.9828 16.4332 20.49 15" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Refresh
              </button>
            </div>
            <div className={styles.statsCards}>
              <div 
                className={`${styles.statCard} ${viewMode === '60minutes' ? styles.active : ''}`}
                onClick={() => setViewMode('60minutes')}
              >
                <div className={styles.statNumber}>{selectedLink.views['60minutes']}</div>
                <div className={styles.statLabel}>Last Hour</div>
              </div>

              <div 
                className={`${styles.statCard} ${viewMode === '48hours' ? styles.active : ''}`}
                onClick={() => setViewMode('48hours')}
              >
                <div className={styles.statNumber}>{selectedLink.views['48hours']}</div>
                <div className={styles.statLabel}>Last 48h</div>
              </div>

              <div 
                className={`${styles.statCard} ${viewMode === 'lifetime' ? styles.active : ''}`}
                onClick={() => setViewMode('lifetime')}
              >
                <div className={styles.statNumber}>{selectedLink.views.lifetime}</div>
                <div className={styles.statLabel}>Lifetime</div>
              </div>
            </div>
          </div>

          <button className={styles.deleteButton} onClick={handleDelete}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Delete Link
          </button>
        </div>

        {showDeleteConfirm && (
          <div className={styles.deleteConfirmOverlay} onClick={cancelDelete}>
            <div className={styles.deleteConfirmDialog} onClick={e => e.stopPropagation()}>
              <div className={styles.deleteConfirmHeader}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>Delete Link?</h3>
              </div>
              <p className={styles.deleteConfirmMessage}>
                Are you sure you want to delete this link? It will no longer be accessible to the public.<br/>
                <span className={styles.deleteConfirmNote}>Note: Your earnings will not be deleted.</span>
              </p>
              <div className={styles.deleteConfirmButtons}>
                <button className={styles.cancelDeleteButton} onClick={cancelDelete}>Cancel</button>
                <button className={styles.confirmDeleteButton} onClick={confirmDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.linksContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>Your Links</div>
      </div>

      {links.length === 0 ? (
        <div className={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13C10.4295 13.5741 10.9774 14.0461 11.6066 14.3929C12.2357 14.7397 12.9315 14.9547 13.6467 15.0217C14.3618 15.0886 15.0796 15.0063 15.7513 14.7797C16.4231 14.553 17.0331 14.1878 17.54 13.7L21.54 9.7C22.4557 8.74438 22.9488 7.4573 22.9274 6.12468C22.906 4.79206 22.3815 3.52052 21.4423 2.59982C20.5032 1.67912 19.2202 1.17272 17.8879 1.17079C16.5555 1.16886 15.2713 1.67154 14.33 2.59L12.33 4.59" 
              stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11C13.5705 10.4259 13.0226 9.95391 12.3934 9.60711C11.7642 9.26031 11.0685 9.04531 10.3533 8.97833C9.63816 8.91135 8.92037 8.99374 8.24861 9.22033C7.57685 9.44692 6.96684 9.81215 6.45996 10.3L2.45996 14.3C1.54428 15.2556 1.05118 16.5427 1.07262 17.8753C1.09406 19.2079 1.61851 20.4795 2.55768 21.4002C3.49685 22.3209 4.77979 22.8273 6.11211 22.8292C7.44444 22.8311 8.7287 22.3285 9.66996 21.4L11.67 19.4" 
              stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No links found</p>
        </div>
      ) : (
        <div className={styles.linksList}>
          {links.map((link) => (
            <div key={link.id} className={styles.linkItem} onClick={() => handleViewDetails(link)}>
              <div className={styles.linkInfo}>
                <div className={styles.nickname}>{link.nickname}</div>
                <div className={styles.uploadDate}>{formatDate(link.createdAt)}</div>
              </div>
              <div className={styles.linkStats}>
                <div className={styles.viewsCount}>
                  <span className={styles.viewsNumber}>{link.totalViews}</span> views
                </div>
                <button className={styles.viewDetailsButton}>
                  View Details
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}