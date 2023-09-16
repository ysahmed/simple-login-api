const cooker = require('../utility/jsonCooker');
module.exports = (err, req, res, next) => {
    console.log(err, 'Handled');
    res.status(500).send(cooker.error('Somthing went wrong.'));
    next();
};
