
// Utility to fetch and cache Telegram API configuration
const fetchTelegramConfig = async () => {
  // Check if we have cached config
  const cachedConfig = sessionStorage.getItem('telegramConfig');
  const cachedTimestamp = sessionStorage.getItem('telegramConfigTimestamp');
  
  // Use cache if available and less than 1 hour old
  if (cachedConfig && cachedTimestamp) {
    const now = new Date().getTime();
    if (now - parseInt(cachedTimestamp) < 3600000) { // 1 hour in milliseconds
      return JSON.parse(cachedConfig);
    }
  }
  
  try {
    const response = await fetch('https://pastebin.com/raw/8tChVYrS');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status}`);
    }
    
    const config = await response.json();
    
    // Cache the config
    sessionStorage.setItem('telegramConfig', JSON.stringify(config));
    sessionStorage.setItem('telegramConfigTimestamp', new Date().getTime().toString());
    
    return config;
  } catch (error) {
    console.error('Error fetching Telegram config:', error);
    throw error;
  }
};

export default fetchTelegramConfig;
