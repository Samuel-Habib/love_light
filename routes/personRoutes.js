const express = require('express');
const router = express.Router()
const personController = require('../controllers/personController');

// router.post('/submit/createPerson', personController.createPerson);
router.get('/getPersons', personController.getPersons);
router.get('/getStatus/:id', personController.getStatus);
exports.router = router;