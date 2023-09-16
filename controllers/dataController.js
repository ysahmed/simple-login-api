const Joi = require('joi');
const _ = require('lodash');
const Data = require('../models/coolData');
const cooker = require('../utility/jsonCooker');

const schema = Joi.object({
    body: Joi.string().min(1).max(1024).required(),
});

// get all
exports.getAll = async (req, res) => {
    const data = await Data.find();
    res.status(200).json(cooker.successArray(data));
};

// get one
exports.getById = async (req, res) => {
    const data = await Data.findById(req.params.id);
    if (!data) res.status(404).json(cooker.failure('Data not found.'));

    res.status(200).json(cooker.success(data));
};

// insert
exports.post = async (req, res) => {
    //validate body
    const { error } = validate(req.body);
    if (error) return res.status(400).json(cooker.failure(error.message));

    const data = new Data(req.body);
    data.save()
        .then((data) => {
            res.status(200).json(cooker.success(_.pick(data, ['_id', 'body'])));
        })
        .catch((_) => {
            res.status(500).json(cooker.error('Something went wrong.'));
        });
};

// update
exports.update = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json(cooker.failure(error.message));

    const data = await Data.findById(req.params.id);
    if (!data) return res.status(404).json(cooker.failure('Not found.'));
    data.body = req.body.body;

    data.save()
        .then((data) => {
            res.status(200).json(cooker.success(_.pick(data, ['_id', 'body'])));
        })
        .catch((_) => {
            res.status(500).json(cooker.error('Something went wrong.'));
        });
};

// delete
exports.delete = async (req, res) => {
    const data = await Data.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json(cooker.failure('Not found.'));
    res.status(200).json(cooker.success(data));
};

function validate(body) {
    return schema.validate(body);
}
