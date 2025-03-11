
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
  
  if (statusLower === 'complete' || statusLower === 'completed') return 'completed';
  if (statusLower === 'fail' || statusLower === 'failed') return 'failed';
  if (statusLower === 'pending' || statusLower === 'processing') return 'processing';
  
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
export const fetchUserData = async () => {
  try {
    const response = await fetch('/data/user.json');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Return default fallback data
    return { 
      userId: '12345',
      amount: 0,
      upiId: '',
      cryptoAddress: ''
    };
  }
};

export const saveUserSettings = async (settings) => {
  // In a real app, this would make an API call to save the settings
  // For now, we'll just log it to console
  console.log('Saving user settings:', settings);
  return { success: true };
};

export const processWithdrawal = async (withdrawalData) => {
  // In a real app, this would make an API call to process the withdrawal
  // For now, we'll just log it to console
  console.log('Processing withdrawal:', withdrawalData);
  return { 
    success: true,
    transactionId: 'TX' + Math.floor(Math.random() * 1000000)
  };
};
