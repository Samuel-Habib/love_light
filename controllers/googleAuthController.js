const passport = require('passport');

const googleAuthRedirect = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleAuthCallback = passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/home',
});

const logoutHandler = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
};

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = {
    googleAuthRedirect,
    googleAuthCallback,
    logoutHandler,
    isAuthenticated,
};