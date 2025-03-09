
# Telegram MTProto Uploader Demo

This is a demonstration of using Telegram's MTProto protocol to upload large files (up to 2GB, or 4GB with Telegram Premium) to Telegram channels.

## Features

- Direct connection to Telegram servers using MTProto
- Support for uploading large files (up to 2GB/4GB)
- Option to upload any file as a document
- Real-time upload progress with speed and time remaining
- Drag and drop file selection
- Preview for images and videos
- Mobile-responsive design

## How to Use

1. Open the `index.html` file in your browser
2. Select a file by clicking on the drop area or dragging a file in
3. Add an optional caption
4. Check "Upload as Document" if you want to preserve the original file
5. Click "Upload File" to start the upload process

## Technical Details

This demo uses a simplified simulation of the MTProto protocol to demonstrate how the upload process would work. In a real implementation, you would use a full MTProto client library to handle the connection to Telegram's servers.

The important parameters for connecting to Telegram's API:

- App api_id: 1761113
- App api_hash: 66c1f68b9e65148d78c2bddc05d34911
- MTProto server: 149.154.167.50:443 (Production DC 2)
- Channel ID: -1002459925876

## Implementation Notes

In a real implementation, you would need to:

1. Use a proper MTProto library (like tdlib, telethon, or gram.js)
2. Implement user authentication flow
3. Handle file chunking and upload according to the protocol
4. Implement proper error handling and retry logic

## Files

- `index.html` - The main HTML interface
- `styles.css` - CSS styling for the interface
- `mtproto.js` - The simulated MTProto client
- `app.js` - Main application logic

## Next Steps

After testing this demo, the implementation can be integrated into the main TeleShare application to replace the current Bot API-based uploader, allowing for larger file uploads.
