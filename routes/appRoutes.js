const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

app.use('/', router);
app.use(express.static(path.join(__dirname, '../public'))); 

// This is for cleaner routes for the main pages

router.get('/gender', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'gender.html'));
});

router.get('/invite', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'partnerInvite.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'new.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

exports.router = router;
