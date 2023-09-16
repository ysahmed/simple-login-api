const mongoose = require('mongoose');
const cooker = require('../utility/jsonCooker');

module.exports = (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json(cooker.failure('Invalid id.'));
    next();
};
