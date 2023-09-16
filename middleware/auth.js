const jwt = require('jsonwebtoken');
const cooker = require('../utility/jsonCooker');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json(cooker.failure('Access denied. No token found.'));
    }

    jwt.verify(token, process.env._jwtPrivateKey, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json(cooker.failure('Access denied. Invalid token'));
        }

        req.user = user;
        next();
    });
};
