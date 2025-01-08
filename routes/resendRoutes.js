const express = require('express');
const router = express.Router()
const {resend} = require("../resend/config.js")
const {welcome} = require("../resend/welcome-template.js")
const {generateInviteEmail} = require("../resend/invitation-template.js")

const crypto = require('crypto');
const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase(); // Example: "A1B2C3D4"

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
    const { data, error } = await resend.emails.send({
        from: "me@samuelhabib.com",
        to: req.body.email, 
        subject: 'Invite Code',
        html: generateInviteEmail(req.body.nickname, inviteCode),
      });
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
})

module.exports = router;