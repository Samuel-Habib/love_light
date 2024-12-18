const express = require('express');
const connectDB = require('./config/db');
const personRoutes = require('./routes/personRoutes').router;
const appRoutes = require('./routes/appRoutes').router;
const Person = require('./models/personModel');
require('dotenv').config();
const path = require('path');
const app = express();

app.use(express.json());

connectDB();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));

app.use(personRoutes);

app.post('/submit/createPerson', async (req, res) => {
    try {
        const person = new Person(req.body);
        person.nickname = req.body.nickname;
        await person.save();
        res.status(201).json(person)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
});

app.use(appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
