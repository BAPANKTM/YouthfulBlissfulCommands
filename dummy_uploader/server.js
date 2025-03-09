
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Increase payload size limit to handle larger file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use(express.static(__dirname));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    
    // Open browser automatically if running in Replit
    if (process.env.REPL_ID) {
        console.log(`Opening browser at http://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
    }
});
