const express = require('express');
const router = express.Router()
const personController = require('../controllers/personController');

// router.post('/submit/createPerson', personController.createPerson);
router.get('/person/getPersons', personController.getPersons);
router.get('/person/getStatus/:id', personController.getStatus);
router.get('/person/:nickname', personController.getPersonByNickname )
router.post('/person', personController.createPerson)
router.put('/person/:nickname/gender', personController.putGenderByNickname)
router.put('/person/:nickname/partner', personController.putPartnerByNickname)
exports.router = router;