
export const fetchLinkHistory = async () => {
  try {
    const response = await fetch('/data/links.json');
    if (!response.ok) {
      throw new Error('Failed to fetch link history');
    }
    const data = await response.json();
    
    // Process and sort data by date (newest first)
    const processedData = data.map(item => ({
      ...item,
      // Ensure consistent field names and formats
      id: item.link_id,
      type: item.content_type || 'text',
      title: item.title || 'Untitled',
      date: item.created_at,
      metrics: {
        clicks: item.metrics?.total_clicks || 0,
        downloads: item.metrics?.total_downloads || 0
      }
    }));
    
    return processedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching link history:', error);
    return [];
  }
};

export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

export const getContentTypeIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'text':
      return '📝';
    case 'image':
      return '🖼️';
    case 'file':
      return '📄';
    case 'video':
      return '🎬';
    default:
      return '📎';
  }
};
