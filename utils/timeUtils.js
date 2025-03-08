
export function getGreeting() {
  // Get username from storage or default to "User"
  const username = typeof window !== 'undefined' ? localStorage.getItem('teleshare_username') || 'User' : 'User';
  
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 5 && hour < 12) {
    return `Good morning, ${username}`;
  } else if (hour >= 12 && hour < 18) {
    return `Good afternoon, ${username}`;
  } else if (hour >= 18 && hour < 22) {
    return `Good evening, ${username}`;
  } else {
    return `Good night, ${username}`;
  }
}

export function getGreetingIcon() {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 5 && hour < 12) {
    // Morning sun icon
    return `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.8)" stroke-width="2" fill="rgba(255,220,50,0.2)"/>`;
  } else if (hour >= 12 && hour < 18) {
    // Afternoon sun icon
    return `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.8)" stroke-width="2" fill="rgba(255,180,50,0.2)"/>`;
  } else if (hour >= 18 && hour < 22) {
    // Evening moon icon
    return `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="rgba(157,92,255,0.2)"/>`;
  } else {
    // Night moon and stars icon
    return `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="rgba(100,100,200,0.2)"/>
          <path d="M5 5 L6 6 M17 3 L18 4 M8 2 L7 3" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>`;
  }
}
