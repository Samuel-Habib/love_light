require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const personRoutes = require('./routes/personRoutes').router;
const appRoutes = require('./routes/appRoutes').router;
const loginRoutes = require('./routes/loginRoutes')
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

connectDB();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));


app.use(personRoutes);
app.use(appRoutes);
app.use('/auth', loginRoutes)

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
