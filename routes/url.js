const express = require('express');

const router = express.Router();
require('dotenv').config();

// Allows the client to see what the production URL is

router.get('/url', (req, res) => {
    const url = process.env.URL;
    if (url) {
        res.json({ url });
    } else {
        res.status(404).json({ error: 'URL not found in environment variables' });
    }
});

module.exports = router;