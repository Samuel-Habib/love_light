const express = require('express');
const router = express.Router();
const {
    googleAuthRedirect,
    googleAuthCallback,
    logoutHandler,
    isAuthenticated,
} = require('../controllers/googleAuthController.js');

// Google authentication routes
router.get('/google', googleAuthRedirect);
router.get('/google/callback', googleAuthCallback);
router.get('/logout', logoutHandler);

// Example of a protected route
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome, ${req.user.displayName}!`);
});

module.exports = router;

