
/**
 * Utility function to fetch and cache Telegram configuration
 */

let cachedConfig = null;
let cacheTimestamp = null;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// Fallback config in case of network issues
const FALLBACK_CONFIG = {
  bot_token: "7194905989:AAGYuzdr7c_10cl2bzvl6982c7U5AqiupkA",
  channel_id: "-1002459925876"
};

async function fetchTelegramConfig() {
  const currentTime = Date.now();

  // Return cached config if valid
  if (cachedConfig && cacheTimestamp && (currentTime - cacheTimestamp < CACHE_DURATION)) {
    return cachedConfig;
  }

  try {
    // Try fetching with mode: 'cors' explicitly
    const response = await fetch('https://pastebin.com/raw/8tChVYrS', { 
      mode: 'cors',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.warn(`HTTP Error: ${response.status}. Using fallback config.`);
      cachedConfig = FALLBACK_CONFIG;
      cacheTimestamp = currentTime;
      return FALLBACK_CONFIG;
    }
    
    const data = await response.json();
    
    // Validate data structure
    if (!data.bot_token || !data.channel_id) {
      console.warn('Invalid configuration data. Using fallback config.');
      cachedConfig = FALLBACK_CONFIG;
      cacheTimestamp = currentTime;
      return FALLBACK_CONFIG;
    }
    
    // Update cache
    cachedConfig = data;
    cacheTimestamp = currentTime;
    
    return data;
  } catch (error) {
    console.error('Error fetching Telegram config:', error);
    
    // Use hardcoded fallback config to ensure functionality
    console.log('Using fallback configuration');
    cachedConfig = FALLBACK_CONFIG;
    cacheTimestamp = currentTime;
    return FALLBACK_CONFIG;
  }
}

export default fetchTelegramConfig;
