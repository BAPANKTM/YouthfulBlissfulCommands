
export const fetchWithdrawalHistory = async () => {
  try {
    const response = await fetch('/data/withdrawal.json');
    if (!response.ok) {
      throw new Error('Failed to fetch withdrawal history');
    }
    const data = await response.json();
    
    // Process data to normalize status values and ensure proper field usage
    const processedData = data.map(item => ({
      ...item,
      // Map fields to ensure consistent naming
      method: item.withdrawal_method || item.method || 'Unknown',
      amount: item.amount || 0,
      date: item.withdrawal_time || item.date,
      status: normalizeStatus(item.status),
      reason: item.reason || null
    }));
    
    return processedData.sort((a, b) => new Date(b.withdrawal_time || b.date) - new Date(a.withdrawal_time || a.date));
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    return [];
  }
};

// Function to normalize status values for consistent filtering
const normalizeStatus = (status) => {
  if (!status) return 'processing';
  
  const statusLower = status.toLowerCase();
  
  if (statusLower === 'complete') return 'completed';
  if (statusLower === 'fail') return 'failed';
  
  return statusLower;
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

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'complete':
    case 'completed':
      return '#4CAF50';
    case 'fail':
    case 'failed':
      return '#F44336';
    case 'processing':
    case 'pending':
      return '#FFC107';
    default:
      return '#9D5CFF';
  }
};
