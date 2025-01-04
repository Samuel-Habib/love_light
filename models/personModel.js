const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: false,
        unique: true
    },
    gender: {
        // todo, make this an array
        // of male, female, queer
        type: String,
        required: false,
    },
    status: {
        type: Number,
        required: false,
    },
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: false,
    },
    inviteApproval: {
        type: Boolean, 
        required: false
    }
});

module.exports = mongoose.model('Person', personSchema);