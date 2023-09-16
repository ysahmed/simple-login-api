require('express-async-errors');
const router = require('express').Router();
const controller = require('../controllers/userController');
const errorHandler = require('../middleware/error');

router.route('/').post(controller.add);
router.use(errorHandler);

module.exports = router;
