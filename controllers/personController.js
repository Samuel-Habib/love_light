const mongoose = require('mongoose');
const personModel = require('../models/personModel');


const createPerson = async (req, res) => {
    try {
        if(!(await personModel.exists({ nickname: req.body.nickname }))){
            const person = new personModel(req.body)
            await person.save();
            res.status(201).send('Person created');

        } else{
            res.status(400).send("Person already exists")
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
} 


const putAvatar = async (req, res) => {

    
}


const getPersonByNickname = async (req, res) => {
    try{
        const person = await personModel.findOne({nickname: req.params.nickname})
        res.status(200).json(person)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(404).send('Nickname not found');
    }
}

const getNicknameByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const person = await personModel.findOne({email: email});
        if (person) {
            res.status(200).json(person.nickname);
        } else {
            res.status(404).send('Email not found');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
}

const putGenderByNickname = async (req, res) => {
    try {
        const justNickname = { nickname: req.params.nickname}
        const genderAndNick = {nickname: req.params.nickname, gender: req.body.gender}
        const person = await personModel.findOneAndUpdate(justNickname, genderAndNick)
        res.status(200).json(person)
    } catch (error) {
         console.error(`Error: ${error.message}`);
        res.status(404).send('Nickname not found');
    }
}

const getStatusByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const person = await personModel.findOne({email: email});
        if (person) {
            res.status(200).json(person.status);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
        
    }
}

const getPersonByAny = async (req, res) => {
    try {
        const { email, gender, nickname, objectID } = req.params.any;

        // Check parameters one by one and return the person if found
        if (email) {
            const person = await personModel.findOne({ email });
            if (person) {
                // console.log(person.nickname)
                return res.status(200).json(person);
            }
        }

        if (gender) {
            const person = await personModel.findOne({ gender });
            if (person) {
                return res.status(200).json(person);
            }
        }

        if (nickname) {
            const person = await personModel.findOne({ nickname });
            if (person) {
                return res.status(200).json(person);
            }
        }

        if (objectID) {
            const person = await personModel.findOne({ objectID });
            if (person) {
                return res.status(200).json(person);
            }
        }

        // If no person is found
        res.status(404).send("Person not found");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
};

const putPartnerByNickname = async (req, res) => {
    try {
        // note this put request requres nickname and gender in that order
        const justNickname = { nickname: req.params.nickname}
        const person = await personModel.findOneAndUpdate(e, genderAndNick)
        res.status(200).json(person)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(404).send('Nickname not found');
    }

}


const putEmail = async (req, res) => {
    try {
        const { nickname, email } = req.query;
        if(!nickname){
            return res.status(400).json({ message: "Nickname is required" });
        }
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        const person = await personModel.findOneAndUpdate(
            { nickname },
            { $set: { email } },
            { new: true, upsert: false }
        );

        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        return res.status(200).json(person);

    } catch (error) {
        console.error('Error updating email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const uniqueEmail = async (req, res) => {
    try {
        const person = await personModel.findOne({ email: req.params.email });
        if (person) {
            return res.status(200).json({ msg: 0 });
        } else {
            return res.status(404).json({ msg: 1 });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ msg: 0 });
    }
};

const getPersons = async (req, res) => {
    try {
        const persons = await personModel.find();
        res.json(persons);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
}

const getPersonByID = async (req, res) => {
    try {
        const person = await personModel.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ msg: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
}

const deletePerson = async (req, res) => {
    try {
        const person = await personModel.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ msg: 'Person not found' });
        }
        await person.remove();
        res.json({ msg: 'Person removed' });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
}

const getStatus = async (req, res) =>{
    try{
        // note this is find by id
        const status = await personModel.findById(req.params.id);
        if(!status){
            return res.status(404).json({msg: 'Status not found'});
        } else{ res.json(status); }
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
}


const putStatusByNickname = async (req, res) =>{ 
    try {
        console.log("Updating status for nickname:", req.body.nickname, "to:", req.body.status);
        const person = await personModel.findOneAndUpdate(
            {nickname: req.body.nickname}, 
            {status: req.body.status},
            {new: true}
        )
        if(!person){
            return res.status(404).json({msg: 'Person not found'});
        } else{ 
            return res.status(200).json({msg: 'Status updated', person}); 
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({error: 'Server Error'});
    }
}

const putApprovalByNickname = async (req, res) =>{
    try{
        // note this is find by id
        const person = await personModel.findOneAndUpdate(
            { nickname: req.params.nickname },
            { $set: { email: req.body.email } },
            { new: true, upsert: false }
        );
        if(!person){
            return res.status(404).json({msg: 'Status not found'});
        } else{ res.json(status); }
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
}

// /person/inviteCodeEntry
// body: inviteCode, nickname (self not partner)
const putPersonWithInviteCode = async (req, res) => {
    try {
        const partnerInviteCodeDoc = await personModel.findOne({ inviteCode: req.body.inviteCode });
        const self = await personModel.findOne({ nickname: req.body.nickname });
        const partner = await personModel.findOne({ _id: partnerInviteCodeDoc.partner });
        
        if (!partnerInviteCodeDoc) {
            return res.status(404).json({ message: "Invite code not found" });
        }
        if (!self) {
            return res.status(404).json({ message: "Self not found" });
        }
        try {


            console.log(partner._id, "Partner ID");
            console.log(self._id, "Self ID");
            console.log(partnerInviteCodeDoc._id, "Partner Invite Code ID");
            await partnerInviteCodeDoc.updateOne({ inviteApproval: true });
            await partnerInviteCodeDoc.updateOne({ gender: self.gender }, { new: true, upsert: false });

            await partnerInviteCodeDoc.updateOne({ email: self.email }, { new: true, upsert: false });
            const nick = self.nickname;
            console.log(self._id, "Self lasjdflkjlaskdfjkasjfdjlasdjflkjasflkjalskdfjlasjdfljasdflkjaslkdfjlaksdfjlkID");
            await partner.updateOne({ partner: partnerInviteCodeDoc._id }, { new: true, upsert: false });
            await partner.updateOne({ inviteApproval: true }, { new: true, upsert: false });
            await self.deleteOne(); 
            // create the nick to avoid duplicate nicknames because nickname is unique
            await partnerInviteCodeDoc.updateOne({ nickname: nick}, { new: true, upsert: false });


            return res.status(200).json({ message: "Updates successful" });
        } catch (error) {
            console.error(error, "Error during putPersonWithInviteCode");
            res.status(500).json({ message: "Internal server error", error });
        }

    } catch (error) {
        console.error(error, "Error during putPersonWithInviteCode");
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { 
    getPersons,
    deletePerson,
    getStatus,
    createPerson,
    getPersonByNickname, 
    putGenderByNickname,
    putPartnerByNickname,
    putEmail,
    uniqueEmail,
    getPersonByAny,
    putPersonWithInviteCode,
    putStatusByNickname,
    getPersonByID,
    getNicknameByEmail,
    getStatusByEmail
};
