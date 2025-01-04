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

const getPersonByNickname = async (req, res) => {
    try{
        const person = await personModel.findOne({nickname: req.params.nickname})
        res.status(200).json(person)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(404).send('Nickname not found');
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

const putPartnerByNickname = async (req, res) => {
    try {
        // note this put request requres nickname and gender in that order
        // so far this is because of the way findOneAndUpdate works, you have to 
        // give it everything, you can't just append to a document, 
        // maybe theres a better solution though

        // Note that partner is a mongodb objectId value

        const justNickname = { nickname: req.params.nickname}
        const genderAndNick = {nickname: req.params.nickname, gender: req.body.gender, partner: req.body.partner}
        const person = await personModel.findOneAndUpdate(justNickname, genderAndNick)
        res.status(200).json(person)
    } catch (error) {
         console.error(`Error: ${error.message}`);
        res.status(404).send('Nickname not found');
    }

}

const getPersons = async (req, res) => {
    try {
        const persons = await personModel.find();
        res.json(persons);
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



module.exports = { 
    getPersons,
    deletePerson,
    getStatus,
    createPerson,
    getPersonByNickname, 
    putGenderByNickname,
    putPartnerByNickname
};