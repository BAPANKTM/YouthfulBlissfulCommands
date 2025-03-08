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
  upload: {
    title: 'Upload Files',
    content: 'Choose files to upload and share with your audience.',
    buttons: [
      {
        text: 'Select Files',
        action: () => console.log('Upload files action'),
        primary: true
      },
      {
        text: 'Cancel',
        action: () => console.log('Cancel upload'),
        primary: false
      }
    ]
  },
  settings: {
    title: 'Settings',
    content: 'Adjust your account settings and preferences.',
    buttons: [
      {
        text: 'Save Changes',
        action: () => console.log('Save settings'),
        primary: true
      },
      {
        text: 'Cancel',
        action: () => console.log('Cancel settings'),
        primary: false
      }
    ]
  }
};