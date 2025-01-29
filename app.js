require('dotenv').config();
const express = require('express');
const db = require("./config/db.js")
const path = require('path');
const app = express();


// require('./resend/welcome-email.js')
// require('./resend/invitation-email.js)

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // Change this to your frontend URL in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allows cookies/session headers if applicable
}));
app.options('*', cors()); // Handles preflight requests

db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));



// API ROUTES
const personRoutes = require('./routes/personRoutes').router;
const appRoutes = require('./routes/appRoutes').router;
const loginRoutes = require('./routes/loginRoutes')
const resendRoutes = require("./routes/resendRoutes")

app.use(personRoutes);
app.use(appRoutes);
app.use("/resend", resendRoutes)
app.use("/auth", loginRoutes);


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
