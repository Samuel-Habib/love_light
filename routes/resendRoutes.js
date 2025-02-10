const express = require('express');
const router = express.Router()
const {resend} = require("../resend/config.js")
const {welcome} = require("../resend/welcome-template.js")
const {generateInviteEmail} = require("../resend/invitation-template.js")
const mongoose = require('mongoose');
const personModel = require('../models/personModel');

const crypto = require('crypto');

router.use(express.json())
router.post('/sendOnboarding', async (req, res) =>{
    // email should be within the request body
    console.log("hello")
    const { data, error } = await resend.emails.send({
        from: "me@samuelhabib.com",
        to: req.body.email,
        subject: 'Hello World',
        html: welcome(req.body.nickname),
      });
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
})

router.post('/sendInvite', async (req,res) =>{
    // the email should be within the request body
    const InviteCode = crypto.randomBytes(4).toString('hex').toUpperCase(); // Example: "A1B2C3D4"
    const { data, error } = await resend.emails.send({
        from: "me@samuelhabib.com",
        to: req.body.email, 
        subject: 'Invite Code',
        html: generateInviteEmail(req.body.nickname, InviteCode),
      });
    
    try {
      let inviter = await personModel.findOne({nickname: req.body.nickname});
      if (!inviter) {
        return res.status(404).send({ error: 'Inviter not found' });
      }

      if(typeof(InviteCode)){
            const invitee = new personModel({partner: inviter.id, inviteCode: InviteCode, email: req.body.email})
            await invitee.save();
          } else{
            console.log("not a string ")
            console.log(typeof(InviteCode))
          }
    } catch (err) {
        return res.status(500).send({ error: 'Database error' });
    } 

    // create a mongodb object with the invite code but also the objectid 
    // of the person who sent the invite, put a link to their docoument as well
    
    if (error) {
      return console.error({ error });
    }
})

router.post('/test', (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  res.status(200).send({ received: req.body });
});

module.exports = router;