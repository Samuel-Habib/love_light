const express = require('express');
const router = express.Router()
const personController = require('../controllers/personController');

// router.post('/submit/createPerson', personController.createPerson);
router.get('/person/getPersons', personController.getPersons);
router.get('/person/getStatus/:id', personController.getStatus);
router.get('/person/:nickname', personController.getPersonByNickname)
router.get('/person/:any', personController.getPersonByAny)
router.get('/person/id/:id', personController.getPersonByID)
router.post('/person', personController.createPerson)
router.put('/person/:nickname/gender', personController.putGenderByNickname)
router.put('/person/:nickname/partner', personController.putPartnerByNickname)
router.put('/person/:nickname/email', personController.putEmail)
router.put('/person/inviteCodeEntry', personController.putPersonWithInviteCode)
router.put('/person/status', personController.putStatusByNickname)
router.get('/person/uniqueEmail/:email', personController.uniqueEmail)
exports.router = router;

