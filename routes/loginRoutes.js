const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router(); // Correctly initialize the router
const CLIENT_ID = process.env.GOOGLE_LOGIN_CLIENT_ID;
if (!CLIENT_ID) {
    console.error('CLIENT_ID is not defined in the environment variables.');
    process.exit(1); // Exit the process if CLIENT_ID is missing
}
const client = new OAuth2Client(CLIENT_ID);

// Middleware to parse JSON request bodies
router.use(express.json()); 

// Login route
router.post('/login', async (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(400).send({ error: 'Token is required' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log('User Info:', payload);

        // Respond with user information
        res.status(200).send({ message: 'Login successful', user: payload });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send({ error: 'Invalid token' });
    }
});

module.exports = router; // Export the router