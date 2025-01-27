require('dotenv').config();
const express = require('express');
const db = require("./config/db.js")
const path = require('path');
const app = express();
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth strategy
const passport = require('passport'); // Import passport

// require('./resend/welcome-email.js')
// require('./resend/invitation-email.js)
const cors = require('cors');
app.use(cors());
db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// google passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));


// google passport strategy
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
    };
    return done(null, user);
}));


// API ROUTES
const personRoutes = require('./routes/personRoutes').router;
const appRoutes = require('./routes/appRoutes').router;
const loginRoutes = require('./routes/loginRoutes')
const resendRoutes = require("./routes/resendRoutes")
const googleAuthRoutes = require('./routes/googleAuthRoutes');

app.use(personRoutes);
app.use(appRoutes);
app.use('/auth', loginRoutes)
app.use("/resend", resendRoutes)
app.use('/auth', googleAuthRoutes);

console.log('Available routes:', app._router.stack.map(r => r.route?.path).filter(Boolean));


app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self';"
    );
    next();
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
