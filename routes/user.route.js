const router = require('express').Router();

const { userController } = require('../controllers');
const {protectedMiddleware} = require('../middlewares/auth.middleware')

router.get('', protectedMiddleware, userController.getUsers);
router.post('', protectedMiddleware, userController.createUser);

module.exports = router;