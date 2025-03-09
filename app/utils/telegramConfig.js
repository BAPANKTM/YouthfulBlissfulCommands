
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
    // Fix the CORS issue by using a proxy or direct API call
    const response = await fetch('https://pastebin.com/raw/8tChVYrS', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status}`);
    }
    
    const responseText = await response.text();
    let config;
    
    try {
      config = JSON.parse(responseText);
    } catch (e) {
      // If JSON parsing fails, use hardcoded values from the requirements
      config = {
        "bot_token": "7194905989:AAGYuzdr7c_10cl2bzvl6982c7U5AqiupkA",
        "channel_id": "-1002459925876"
      };
    }
    
    // Cache the config
    sessionStorage.setItem('telegramConfig', JSON.stringify(config));
    sessionStorage.setItem('telegramConfigTimestamp', new Date().getTime().toString());
    
    return config;
  } catch (error) {
    console.error('Error fetching Telegram config:', error);
    // Fallback to hardcoded values if fetch fails
    const fallbackConfig = {
      "bot_token": "7194905989:AAGYuzdr7c_10cl2bzvl6982c7U5AqiupkA",
      "channel_id": "-1002459925876"
    };
    
    // Cache the fallback config
    sessionStorage.setItem('telegramConfig', JSON.stringify(fallbackConfig));
    sessionStorage.setItem('telegramConfigTimestamp', new Date().getTime().toString());
    
    return fallbackConfig;
  }
};

export default fetchTelegramConfig;
