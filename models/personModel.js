const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: false,
        unique: true
    },
    gender: {
        // male, female, queer
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
    },
    email: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Person', personSchema);