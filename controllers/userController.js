const Joi = require('joi');
const _ = require('lodash');
const User = require('../models/user');
const cooker = require('../utility/jsonCooker');

// body validator
const bodySchema = Joi.object({
    firstName: Joi.string().min(5).max(255).required(),
    lastName: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
});

async function validate(body) {
    return bodySchema.validate(body);
}

// post 1
exports.add = async (req, res) => {
    // validate body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // check existance
    let user = await User.findOne({ email: req.body.email }).count();
    if (user)
        return res.status(400).send(cooker.failure('Email already exists.'));

    // insert
    user = new User(req.body);
    user.save()
        .then((user) => {
            res.status(200).send(
                cooker.success(_.pick(user, ['firstName', 'lastName', 'email']))
            );
        })
        .catch((_) => {
            return res.status(500).send(cooker.error('Something went wrong.'));
        });
};

// delete self
