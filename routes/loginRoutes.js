const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const personModel = require('../models/personModel');


const router = express.Router(); 
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
if (!CLIENT_ID) {
    console.error('CLIENT_ID is not defined in the environment variables.');
    process.exit(1); // exit the process if CLIENT_ID is missing
}
const client = new OAuth2Client(CLIENT_ID);


router.use(express.json()); 

router.post('/signup', async (req, res) => {
    // cors
    res.setHeader('Access-Control-Allow-Origin',  process.env.URL || 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If using cookies

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

        res.status(200).send({ message: 'Sign Up successful', user: payload });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send({ error: 'Invalid token' });
    }
});

router.post('/login', async (req, res) => {
    // cors
    res.setHeader('Access-Control-Allow-Origin', process.env.URL || 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If using cookies

    const token = req.body.token;
    const person = await personModel.find({email: req.body.email})
    console.log(person, "this is person")
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
        res.status(200).send({ message: 'Login successful', user: payload });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send({ error: 'Invalid token' });
    }

})

router.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', proccess.env.URL || 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204); // No content
});

module.exports = router; 