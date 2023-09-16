const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const cooker = require('../utility/jsonCooker');

// post
exports.login = async (req, res) => {
    // validate body
    const error = await validate(req.body);
    if (error) return res.ststus(400).send();

    // validate email
    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res
            .status(400)
            .send(cooker.failure('Invalid email or password.'));

    //validate password
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res
            .status(400)
            .send(cooker.failure('Invalid email or password.'));
    // send jwt
    const token = user.createToken();
    res.setHeader('Authorization', `Bearer ${token}`);
    res.send(cooker.success('Login successful'));
};

async function validate(body) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(1024).required(),
    });

    try {
        await schema.validate(body);
    } catch (err) {
        return err;
    }
}
