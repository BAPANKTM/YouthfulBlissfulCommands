
export const fetchWithdrawalHistory = async () => {
  try {
    const response = await fetch('/data/withdrawal.json');
    if (!response.ok) {
      throw new Error('Failed to fetch withdrawal history');
    }
    const data = await response.json();
    return data.sort((a, b) => new Date(b.withdrawal_time) - new Date(a.withdrawal_time));
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    return [];
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'complete':
      return '#4CAF50';
    case 'failed':
      return '#F44336';
    case 'processing':
      return '#FFC107';
    default:
      return '#9D5CFF';
  }
};
