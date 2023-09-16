const mongoose = require('mongoose');

const CoolData = mongoose.model(
    'CoolData',
    new mongoose.Schema({
        body: {
            type: String,
            minlength: 1,
            maxlength: 1024,
            required: true,
        },
    })
);

module.exports = CoolData;
