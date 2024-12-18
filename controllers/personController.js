const mongoose = require('mongoose');
const personModel = require('../models/personModel');


// const createPerson = async (req, res) => {
//     try {
//         const person = new personModel(req.body)
//         await person.save();
//         res.json(person);
//         res.status(201).send('Person created');
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         res.status(500).send('Server Error');
//     }
// } 

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

module.exports = { getPersons, deletePerson, getStatus};