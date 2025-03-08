
import React, { useState, useEffect } from 'react';

export default function GreetingBanner() {
  const [greeting, setGreeting] = useState("Good day, User");
  const [icon, setIcon] = useState("");
  
  useEffect(() => {
    updateGreeting();
    // Update greeting every minute
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);
  
  function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    // Get username from storage or default to "User"
    const username = typeof window !== 'undefined' ? 
      localStorage.getItem('teleshare_username') || 'User' : 'User';
    
    let newGreeting;
    let newIcon;
    
    if (hour >= 5 && hour < 12) {
      newGreeting = `Good morning, ${username}`;
      newIcon = `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
              stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="rgba(255,220,50,0.2)"/>`;
    } else if (hour >= 12 && hour < 18) {
      newGreeting = `Good afternoon, ${username}`;
      newIcon = `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
              stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="rgba(255,180,50,0.2)"/>`;
    } else if (hour >= 18 && hour < 22) {
      newGreeting = `Good evening, ${username}`;
      newIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
              stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(157,92,255,0.2)"/>`;
    } else {
      newGreeting = `Good night, ${username}`;
      newIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
              stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(100,100,200,0.2)"/>
            <path d="M5 5 L6 6 M17 3 L18 4 M8 2 L7 3" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>`;
    }
    
    setGreeting(newGreeting);
    setIcon(newIcon);
  }

  return (
    <div className="greeting-banner">
      <div className="greeting-text">{greeting}</div>
      <div className="greeting-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
    </div>
  );
}
