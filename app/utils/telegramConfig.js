
/**
 * Utility function to fetch and cache Telegram configuration
 */

let cachedConfig = null;
let cacheTimestamp = null;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

async function fetchTelegramConfig() {
  const currentTime = Date.now();

  // Return cached config if valid
  if (cachedConfig && cacheTimestamp && (currentTime - cacheTimestamp < CACHE_DURATION)) {
    return cachedConfig;
  }

  try {
    const response = await fetch('https://pastebin.com/raw/8tChVYrS', { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate data structure
    if (!data.bot_token || !data.channel_id) {
      throw new Error('Invalid configuration data');
    }
    
    // Update cache
    cachedConfig = data;
    cacheTimestamp = currentTime;
    
    return data;
  } catch (error) {
    console.error('Error fetching Telegram config:', error);
    
    // If there's cached data, use it as fallback even if expired
    if (cachedConfig) {
      return cachedConfig;
    }
    
    throw error;
  }
}

export default fetchTelegramConfig;
