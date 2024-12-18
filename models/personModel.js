const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: false,
    },
    gender: {
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
});

module.exports = mongoose.model('Person', personSchema);