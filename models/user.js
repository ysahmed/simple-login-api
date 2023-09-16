const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true,
    },
});

schema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

schema.methods.createToken = function () {
    return jwt.sign(
        { name: `${this.firstName}  ${this.lastName} }`, email: this.email },
        process.env._jwtPrivateKey,
        { expiresIn: '1h' }
    );
};

const User = mongoose.model('User', schema);

module.exports = User;
