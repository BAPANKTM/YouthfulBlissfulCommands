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

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = (e) => {
    e?.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    setShowDeleteConfirm(false);

    // Simulate API call with timeout
    setTimeout(() => {
      // Remove the link from the links array
      setLinks(prevLinks => prevLinks.filter(link => link.id !== selectedLink.id));
      setIsDeleting(false);
      setDeleteStatus({ show: true, id: selectedLink.id });

      // Auto-close the success message after 3 seconds
      setTimeout(() => {
        setDeleteStatus({ show: false, id: null });
        closeDetails();
      }, 3000);
    }, 800); // Simulate delete operation taking time
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
      <div className={styles.linksContainer}>
      {!selectedLink ? (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Links</h2>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading your links...</p>
            </div>
          ) : links.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10H8.01M16 10H16.01M9 16H15M7 8.89535C4.46819 9.32497 3 10.3333 3 11.5C3 12.5986 4.25 13.566 6.5 14.0325V18.25C6.5 18.3881 6.55268 18.5213 6.64645 18.6151C6.74021 18.7089 6.87357 18.7616 7.01173 18.7616C7.14989 18.7616 7.28325 18.7089 7.37701 18.6151C7.47077 18.5213 7.52345 18.3881 7.52345 18.25V14.1643C7.83158 14.1932 8.15509 14.2114 8.492 14.2184V19.25C8.492 19.3881 8.54468 19.5213 8.63844 19.6151C8.7322 19.7089 8.86556 19.7616 9.00372 19.7616C9.14189 19.7616 9.27525 19.7089 9.36901 19.6151C9.46277 19.5213 9.51545 19.3881 9.51545 19.25V14.2145C9.83288 14.2048 10.1594 14.1842 10.492 14.1524V17.25C10.492 17.3881 10.5447 17.5213 10.6384 17.6151C10.7322 17.7089 10.8656 17.7616 11.0037 17.7616C11.1419 17.7616 11.2752 17.7089 11.369 17.6151C11.4628 17.5213 11.5154 17.3881 11.5154 17.25V14.057C11.8407 14.0139 12.1648 13.96 12.484 13.895V18.25C12.484 18.3881 12.5367 18.5213 12.6305 18.6151C12.7242 18.7089 12.8576 18.7616 12.9957 18.7616C13.1339 18.7616 13.2673 18.7089 13.361 18.6151C13.4548 18.5213 13.5075 18.3881 13.5075 18.25V13.5974C13.8281 13.5126 14.1358 13.4232 14.4269 13.3297V16.25C14.4269 16.3881 14.4796 16.5213 14.5734 16.6151C14.6671 16.7089 14.8005 16.7616 14.9387 16.7616C15.0768 16.7616 15.2102 16.7089 15.304 16.6151C15.3977 16.5213 15.4504 16.3881 15.4504 16.25V12.9677C15.7264 12.8607 15.9831 12.7507 16.2175 12.6393V14.75C16.2175 14.8881 16.2702 15.0213 16.3639 15.1151C16.4577 15.2089 16.591 15.2616 16.7292 15.2616C16.8674 15.2616 17.0007 15.2089 17.0945 15.1151C17.1882 15.0213 17.2409 14.8881 17.2409 14.75V12.0058C17.7173 11.7536 18 11.4428 18 11.1111C18 9.71248 15.7884 8.56191 12.8289 8.1472M17 5.5C17 7.433 14.7614 9 12 9C9.23858 9 7 7.433 7 5.5C7 3.567 9.23858 2 12 2C14.7614 2 17 3.567 17 5.5Z" stroke="#9D5CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>You haven't created any links yet.</p>
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
        </>
      ) : deleteStatus.show && deleteStatus.id === selectedLink.id ? (
        <div className={styles.deleteSuccessContainer}>
          <div className={styles.deleteSuccessIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572" stroke="#00D26A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 4L12 14.01L9 11.01" stroke="#00D26A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className={styles.deleteSuccessTitle}>Link Deleted</h2>
          <p className={styles.deleteSuccessText}>
            The link has been successfully removed and is no longer accessible to the public.
          </p>
          <button 
            className={styles.deleteSuccessButton}
            onClick={() => {
              setDeleteStatus({ show: false, id: null });
              closeDetails();
            }}
          >
            Return to Links
          </button>
        </div>
      ) : isDeleting ? (
        <div className={styles.deletingContainer}>
          <div className={styles.deletingSpinner}></div>
          <h2 className={styles.deletingTitle}>Deleting Link...</h2>
          <p className={styles.deletingText}>
            Please wait while we remove the link from our system.
          </p>
        </div>
      ) : (
        <div className={styles.detailsContainer}>
          <div className={styles.stickyHeader}>
            <div className={styles.stickyHeaderContent}>
              <div className={styles.stickyTitle}>{selectedLink.nickname}</div>
              <div className={styles.stickyUrl}>{truncateUrl(selectedLink.link)}</div>
            </div>
            <button className={styles.closeButton} onClick={closeDetails}>
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
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copy
                </button>
              </div>
            </div>

            <div className={styles.linkDetailSection}>
              <span className={styles.linkDetailLabel}>Link Details</span>
              <div className={styles.linkDetailValue}>
                <strong>Name:</strong> {selectedLink.nickname}<br />
                <strong>Created:</strong> {formatDate(selectedLink.createdAt)}<br />
                <strong>Total Views:</strong> {selectedLink.totalViews}
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