const router = require('express').Router();
const controller = require('../controllers/dataController');
const auth = require('../middleware/auth');
const validateId = require('../middleware/validateId');
require('express-async-errors');

router.all('*', auth);

router.route('/').get(controller.getAll).post(controller.post);

router
    .route('/:id')
    .all(validateId)
    .get(controller.getById)
    .patch(controller.update)
    .delete(controller.delete);

module.exports = router;
