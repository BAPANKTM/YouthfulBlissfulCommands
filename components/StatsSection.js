
import React from 'react';

export default function StatsSection() {
  return (
    <>
      <div className="stats-section">
        <div className="section-header">
          <div className="section-title">Statistics</div>
          <div className="view-all">View All</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card-compact">
            <svg className="stat-icon-small" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L7 12L3 16M21 12H7" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
            <div className="stat-name-small">Total Clicks</div>
            <div className="stat-number-large">0</div>
          </div>

          <div className="stat-card-compact">
            <svg className="stat-icon-small" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 14V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H10"
                stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 3V11" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 8L17 11L20 8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
            <div className="stat-name-small">Downloads</div>
            <div className="stat-number-large">0</div>
          </div>

          <div className="stat-card-compact">
            <svg className="stat-icon-small" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 2V8H20" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 13H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 17H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 9H9H8" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="stat-name-small">Total Files</div>
            <div className="stat-number-large">0</div>
          </div>

          <div className="stat-card-compact">
            <svg className="stat-icon-small" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1V23" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="stat-name-small">Lifetime Earning</div>
            <div className="stat-number-large">$0.00</div>
          </div>
        </div>
      </div>

      <div className="stats-placeholder">
        <svg className="stats-placeholder-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 20V10" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 20V4" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 20V14" stroke="#9D5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="stats-placeholder-text">Your statistics will appear here as you start sharing content and gaining viewers</div>
      </div>
    </>
  );
}
