'use client';
import { useState, useEffect } from 'react';
import styles from './Links.module.css';

export default function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);
  const [viewMode, setViewMode] = useState('lifetime');
  const [deleteStatus, setDeleteStatus] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshIcon, setRefreshIcon] = useState(false);


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
    setViewMode('lifetime'); // Reset view mode when opening details
  };

  const handleCloseDetails = () => {
    setSelectedLink(null);
  };

  const handleRefreshStats = () => {
    console.log('Refreshing stats...');
    setRefreshIcon(true);
    // In a real app, this would fetch updated stats
    setTimeout(() => setRefreshIcon(false), 1000);
  };

  const handleCopyLink = (linkUrl) => {
    navigator.clipboard.writeText(linkUrl)
      .then(() => {
        // Show success message (would use a toast in real app)
        alert('Link copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  const handleDeleteClick = (linkId) => {
    setDeleteStatus({ show: true, id: linkId });
  };

  const cancelDelete = (e) => {
    if (e) e.preventDefault();
    setDeleteStatus({ show: false, id: null });
  };

  const confirmDelete = async () => {
    if (!deleteStatus.id) return;

    setDeleteStatus({ show: false, id: null });
    setIsDeleting(true);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Filter out the deleted link
    setLinks(prevLinks => prevLinks.filter(link => link.id !== deleteStatus.id));
    setIsDeleting(false);
    setSelectedLink(null);
  };

  if (loading) {
    return (
      <div className={styles.linksContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Links</h2>
        </div>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your links...</p>
        </div>
      </div>
    );
  }

  if (isDeleting) {
    return (
      <div className={styles.deletingContainer}>
        <div className={styles.deletingSpinner}></div>
        <h2 className={styles.deletingTitle}>Deleting Link...</h2>
        <p className={styles.deletingText}>The link is being removed from our systems.</p>
      </div>
    );
  }

  if (selectedLink) {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.stickyHeader}>
          <div className={styles.stickyHeaderContent}>
            <h2 className={styles.stickyTitle}>{selectedLink.nickname}</h2>
            <div className={styles.stickyUrl}>{selectedLink.link}</div>
          </div>
          <button className={styles.closeButton} onClick={handleCloseDetails}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.detailsContent}>
          <div className={styles.linkDetailSection}>
            <span className={styles.linkDetailLabel}>Link URL</span>
            <div className={styles.linkUrlContainer}>
              <div className={styles.linkUrl}>{selectedLink.link}</div>
              <button 
                className={styles.copyButton} 
                onClick={() => handleCopyLink(selectedLink.link)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                  <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copy
              </button>
            </div>

            <span className={styles.linkDetailLabel}>Link Name</span>
            <div className={styles.linkDetailValue}>
              <span className={styles.linkNickname}>{selectedLink.nickname}</span>
            </div>

            <span className={styles.linkDetailLabel}>Created On</span>
            <div className={styles.linkDetailValue}>
              <span className={styles.createdDate}>{formatDate(selectedLink.createdAt)}</span>
            </div>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statsHeader}>
              <h3 className={styles.statsSectionTitle}>View Statistics</h3>
              <button 
                className={`${styles.refreshButton} ${refreshIcon ? styles.spinning : ''}`} 
                onClick={handleRefreshStats}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.49 9.00001C19.9828 7.56329 19.1209 6.2789 17.9845 5.27489C16.8482 4.27089 15.4745 3.5817 14 3.27001C12.5255 2.95832 11.0037 3.04053 9.5673 3.50779C8.13087 3.97505 6.82929 4.81039 5.76999 5.93001L1 10M23 14L18.23 18.07C17.1707 19.1896 15.8691 20.0249 14.4327 20.4922C12.9963 20.9594 11.4745 21.0416 10 20.73C8.52552 20.4183 7.15181 19.7291 6.01547 18.7251C4.87913 17.7211 4.01717 16.4367 3.50999 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Refresh
              </button>
            </div>

            <div className={styles.statsCards}>
              <div className={`${styles.statCard} ${viewMode === '60minutes' ? styles.active : ''}`} onClick={() => setViewMode('60minutes')}>
                <div className={styles.statNumber}>{selectedLink.views['60minutes']}</div>
                <div className={styles.statLabel}>Last Hour</div>
              </div>
              <div className={`${styles.statCard} ${viewMode === '48hours' ? styles.active : ''}`} onClick={() => setViewMode('48hours')}>
                <div className={styles.statNumber}>{selectedLink.views['48hours']}</div>
                <div className={styles.statLabel}>Last 48h</div>
              </div>
              <div className={`${styles.statCard} ${viewMode === 'lifetime' ? styles.active : ''}`} onClick={() => setViewMode('lifetime')}>
                <div className={styles.statNumber}>{selectedLink.views['lifetime']}</div>
                <div className={styles.statLabel}>Total Views</div>
              </div>
            </div>
          </div>

          <button 
            className={styles.deleteButton}
            onClick={() => handleDeleteClick(selectedLink.id)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11V17" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11V17" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Delete Link
          </button>
        </div>

        {deleteStatus.show && (
          <div className={styles.modalOverlay}>
            <div className={styles.deleteModal}>
              <div className={styles.deleteModalIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className={styles.deleteModalTitle}>Delete Link?</h2>
              <p className={styles.deleteModalText}>
                Are you sure you want to delete this link? It will no longer be accessible to the public.
              </p>
              <p className={styles.deleteModalNote}>
                Your earnings will not be deleted.
              </p>
              <div className={styles.deleteModalActions}>
                <button 
                  className={styles.cancelButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelDelete(e);
                  }}
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
    );
  }

  if (links.length === 0) {
    return (
      <div className={styles.linksContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Links</h2>
        </div>
        <div className={styles.emptyState}>
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H16" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>You haven't created any links yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.linksContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Your Links</h2>
      </div>
      <div className={styles.linksList}>
        {links.map((link) => (
          <div key={link.id} className={styles.linkItem} onClick={() => handleViewDetails(link)}>
            <div className={styles.linkInfo}>
              <div className={styles.nickname}>{link.nickname}</div>
              <div className={styles.uploadDate}>{formatDate(link.createdAt)}</div>
            </div>
            <div className={styles.linkStats}>
              <div className={styles.viewsCount}>
                Views: <span className={styles.viewsNumber}>{link.totalViews}</span>
              </div>
              <button className={styles.viewDetailsButton}>
                View Details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}