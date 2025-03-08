
export const floaterConfigs = {
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
