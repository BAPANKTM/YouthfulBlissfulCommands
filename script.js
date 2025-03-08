
// Enhanced TeleShare JavaScript functionality

// Time-based greeting system with smoother updates
function updateGreeting() {
  const greetingText = document.getElementById('greeting-text');
  const greetingIcon = document.getElementById('greeting-icon');
  const now = new Date();
  const hour = now.getHours();
  
  let greeting;
  let icon;
  
  // Get username from storage or default to "User"
  const username = localStorage.getItem('teleshare_username') || 'User';
  
  if (hour >= 5 && hour < 12) {
    greeting = `Good morning, ${username}`;
    // Morning sun icon
    icon = `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.8)" stroke-width="2" fill="rgba(255,220,50,0.2)"/>`;
  } else if (hour >= 12 && hour < 18) {
    greeting = `Good afternoon, ${username}`;
    // Afternoon sun icon
    icon = `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.8)" stroke-width="2" fill="rgba(255,180,50,0.2)"/>`;
  } else if (hour >= 18 && hour < 22) {
    greeting = `Good evening, ${username}`;
    // Evening moon icon
    icon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="rgba(157,92,255,0.2)"/>`;
  } else {
    greeting = `Good night, ${username}`;
    // Night moon and stars icon
    icon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
            stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="rgba(100,100,200,0.2)"/>
          <path d="M5 5 L6 6 M17 3 L18 4 M8 2 L7 3" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>`;
  }
  
  if (greetingText) {
    // Apply smooth text transition
    greetingText.style.opacity = "0";
    setTimeout(() => {
      greetingText.innerText = greeting;
      greetingText.style.opacity = "1";
    }, 200);
  }
  
  if (greetingIcon) greetingIcon.innerHTML = icon;
}

// Fix SVG rendering issues and apply enhancements
function enhanceSvgElements() {
  const svgs = document.querySelectorAll('svg');
  svgs.forEach(svg => {
    // Ensure proper viewBox
    if (!svg.getAttribute('viewBox') && svg.getAttribute('width') && svg.getAttribute('height')) {
      const width = svg.getAttribute('width');
      const height = svg.getAttribute('height');
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
    
    // Add smooth transition
    svg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  });
}

// Add subtle animations to elements for better UI experience
function addSubtleAnimations() {
  // Add subtle hover effects to actionable elements
  const actionElements = document.querySelectorAll('.action-button, .stat-card-compact, .icon-btn');
  
  actionElements.forEach(el => {
    el.addEventListener('mouseover', () => {
      if (window.innerWidth > 768) { // Only on larger screens
        el.style.transform = 'translateY(-2px)';
      }
    });
    
    el.addEventListener('mouseout', () => {
      if (window.innerWidth > 768) {
        el.style.transform = 'translateY(0)';
      }
    });
  });
}

// Generic Floater System with enhanced transitions
function initFloaterSystem() {
  const floaterContainer = document.getElementById('floater-container');
  const floaterTitle = document.getElementById('floater-title');
  const floaterContent = document.getElementById('floater-content');
  const floaterFooter = document.getElementById('floater-footer');
  const floaterIcon = document.getElementById('floater-icon');
  const floaterClose = document.getElementById('floater-close');

  // Define floater configurations
  const floaterConfigs = {
    withdrawal: {
      title: 'Withdrawal',
      icon: `<path d="M12 17V3M12 17L6 11M12 17L18 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M3 21H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      content: `<p style="margin-bottom: 15px; line-height: 1.6;">
                  To withdraw your earnings, please specify the amount and your preferred payment method.
                </p>
                <div style="margin-bottom: 20px;">
                  <label for="amount" style="display: block; margin-bottom: 8px; font-size: 14px; color: #ADADAD;">
                    Amount to withdraw
                  </label>
                  <input type="text" id="amount" placeholder="$0.00" style="width: 100%; padding: 12px; 
                    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(157, 92, 255, 0.3); 
                    border-radius: 10px; color: white; font-size: 16px;">
                </div>
                <div>
                  <label for="method" style="display: block; margin-bottom: 8px; font-size: 14px; color: #ADADAD;">
                    Payment method
                  </label>
                  <select id="method" style="width: 100%; padding: 12px; 
                    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(157, 92, 255, 0.3);
                    border-radius: 10px; color: white; font-size: 16px;">
                    <option value="paypal">PayPal</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>`,
      buttons: [
        {text: 'Cancel', class: 'secondary', action: 'close'},
        {text: 'Withdraw', class: 'primary', action: 'confirm'}
      ]
    },
    help: {
      title: 'Help Center',
      icon: `<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M12 16V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M12 8H12.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      content: `<div style="line-height: 1.6;">
                  <h4 style="margin-bottom: 15px; color: #9D5CFF;">How to use TeleShare</h4>
                  <p style="margin-bottom: 15px;">
                    TeleShare lets you earn by sharing your files, photos, and other content.
                  </p>
                  <ol style="padding-left: 20px; margin-bottom: 15px;">
                    <li style="margin-bottom: 10px;">Upload your content using the upload button</li>
                    <li style="margin-bottom: 10px;">Share the generated link with others</li>
                    <li style="margin-bottom: 10px;">Earn whenever someone views or downloads your content</li>
                  </ol>
                  <p style="margin-top: 20px; font-size: 14px; color: #ADADAD;">
                    If you need more assistance, contact our support team at support@teleshare.example.com
                  </p>
                </div>`,
      buttons: [
        {text: 'Got it', class: 'primary', action: 'close'}
      ]
    },
    settings: {
      title: 'Settings',
      icon: `<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      content: `<div style="line-height: 1.6;">
                  <div style="margin-bottom: 20px;">
                    <label for="username" style="display: block; margin-bottom: 8px; font-size: 14px; color: #ADADAD;">
                      Your Name
                    </label>
                    <input type="text" id="username" placeholder="Enter your name" value="User" style="width: 100%; padding: 12px; 
                      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(157, 92, 255, 0.3); 
                      border-radius: 10px; color: white; font-size: 16px;">
                  </div>
                  
                  <div style="margin-bottom: 20px;">
                    <label for="theme" style="display: block; margin-bottom: 8px; font-size: 14px; color: #ADADAD;">
                      Theme
                    </label>
                    <select id="theme" style="width: 100%; padding: 12px; 
                      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(157, 92, 255, 0.3);
                      border-radius: 10px; color: white; font-size: 16px;">
                      <option value="dark">Dark (Default)</option>
                      <option value="light">Light</option>
                      <option value="system">System Preference</option>
                    </select>
                  </div>
                  
                  <div style="margin-bottom: 20px;">
                    <label for="notifications" style="margin-bottom: 8px; font-size: 14px; color: #ADADAD;">
                      Notifications
                    </label>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                      <input type="checkbox" id="notifications" checked style="width: 18px; height: 18px; accent-color: #9D5CFF;">
                      <label for="notifications" style="color: white;">Enable notifications</label>
                    </div>
                  </div>
                </div>`,
      buttons: [
        {text: 'Cancel', class: 'secondary', action: 'close'},
        {text: 'Save', class: 'primary', action: 'save-settings'}
      ]
    }
  };

  // Open floater function with enhanced animations
  function openFloater(type) {
    const config = floaterConfigs[type];
    if (!config) return;

    // Set title and icon
    floaterTitle.textContent = config.title;
    floaterIcon.innerHTML = config.icon;

    // Set content
    floaterContent.innerHTML = config.content;

    // Set footer buttons
    floaterFooter.innerHTML = '';
    config.buttons.forEach(button => {
      const btnElement = document.createElement('button');
      btnElement.classList.add('floater-button');
      if (button.class === 'secondary') {
        btnElement.classList.add('secondary');
      }
      btnElement.textContent = button.text;
      btnElement.setAttribute('data-action', button.action);
      floaterFooter.appendChild(btnElement);
    });

    // Show floater with animation
    floaterContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Attach button event listeners
    const footerButtons = floaterFooter.querySelectorAll('.floater-button');
    footerButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const action = this.getAttribute('data-action');
        
        if (action === 'close') {
          closeFloater();
        } else if (action === 'save-settings') {
          // Save settings to localStorage
          const username = document.getElementById('username').value;
          const theme = document.getElementById('theme').value;
          const notifications = document.getElementById('notifications').checked;
          
          localStorage.setItem('teleshare_username', username || 'User');
          localStorage.setItem('teleshare_theme', theme);
          localStorage.setItem('teleshare_notifications', notifications);
          
          // Update UI immediately
          updateGreeting();
          
          closeFloater();
        } else {
          console.log(`Action: ${action} for floater: ${type}`);
          closeFloater();
        }
      });
    });
  }

  // Close floater function with improved animation
  function closeFloater() {
    floaterContainer.classList.remove('active');
    setTimeout(() => {
      document.body.style.overflow = ''; // Restore scrolling after animation completes
    }, 300);
  }

  // Attach click event to action buttons
  const actionButtons = document.querySelectorAll('.action-button');
  actionButtons.forEach(button => {
    button.addEventListener('click', function () {
      const floaterType = this.getAttribute('data-floater');
      openFloater(floaterType);
    });
  });

  // Close when clicking the close button
  floaterClose.addEventListener('click', closeFloater);

  // Close when clicking outside the floater
  floaterContainer.addEventListener('click', function (e) {
    if (e.target === this) {
      closeFloater();
    }
  });
}

// Upload section enhancement
function enhanceUploadSection() {
  const uploadSection = document.querySelector('.upload-section');
  
  uploadSection.addEventListener('click', function () {
    console.log('Upload clicked');
    
    // Add a pulse effect on click
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = 'pulse 2s infinite ease-in-out, float 3s infinite ease-in-out';
    }, 10);
    
    // In a real app, we would open the file picker here
    // const filePicker = document.createElement('input');
    // filePicker.type = 'file';
    // filePicker.accept = 'image/*,video/*,audio/*,application/pdf';
    // filePicker.multiple = true;
    // filePicker.click();
  });
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', function () {
  // Load user settings
  const username = localStorage.getItem('teleshare_username') || 'User';
  const theme = localStorage.getItem('teleshare_theme') || 'dark';
  
  // Update greeting with user's name
  updateGreeting();
  
  // Fix any SVG rendering issues
  enhanceSvgElements();
  
  // Add subtle animations
  addSubtleAnimations();
  
  // Initialize floater system
  initFloaterSystem();
  
  // Enhance upload section
  enhanceUploadSection();
  
  // Update greeting every minute (in case user keeps app open during time changes)
  setInterval(updateGreeting, 60000);
  
  // Fill in settings form with saved values when opened
  const actionSettings = document.querySelector('.action-button[data-floater="settings"]');
  if (actionSettings) {
    actionSettings.addEventListener('click', function() {
      setTimeout(() => {
        const usernameInput = document.getElementById('username');
        const themeSelect = document.getElementById('theme');
        
        if (usernameInput) usernameInput.value = username;
        if (themeSelect) themeSelect.value = theme;
      }, 100);
    });
  }
});
